import axios from "axios";
import mapGoogleBook from "../utils/mapGoogleBook.js";
import AppError from "../utils/appError.js";

import Book from "../models/Book.js";
import UserBook from "../models/UserBook.js";

import { BOOK_STATUS } from "../constants/bookStatus.js";
import { HTTP_STATUS } from "../constants/httpStatus.js";

export const searchBooks = async (query) => {
    try {
        const response = await axios.get(
            `${process.env.GOOGLE_BOOKS_API_URL}/volumes`,
            {
                params: {
                    q: `intitle:${query}`,
                    maxResults: 3,
                    langRestrict:"en",
                    key: process.env.GOOGLE_BOOKS_API_KEY,
                },
            }
        );

        //const books = response.data.items || [];
        const books = (response.data.items || []).filter((book) => book.volumeInfo.language === "en");  //only english for now
        return books.map(mapGoogleBook);
        // return books.map((book) => ({
        //     googleBookId: book.id,
        //     publishedDate: book.volumeInfo.publishedDate || "",
        // }));
    } catch (error) {
        console.error(error.response?.data || error.message);
        throw new AppError("Failed to search books",HTTP_STATUS.BAD_GATEWAY);
    }
};

export const getBookByGoogleId = async (googleBookId) => {
    try{
    const response = await axios.get(
        `${process.env.GOOGLE_BOOKS_API_URL}/volumes/${googleBookId}`,
            {
                params: {
                    key: process.env.GOOGLE_BOOKS_API_KEY,
                },
            }
    );
    const book = response.data;
    return mapGoogleBook(response.data);
    } catch (error) {
        if (error.response?.status === 404) {
            throw new AppError("Book not found", HTTP_STATUS.NOT_FOUND);
        }
        throw new AppError("Failed to fetch book from Google Books",HTTP_STATUS.BAD_GATEWAY);
    }
};

export const addBookToLibrary = async (googleBookId, userId) => {
    //CHECK if book already in our DB
    let book = await Book.findOne({ googleBookId });
     if (!book) {
        const googleBook = await getBookByGoogleId(googleBookId);  //get book details from external API
        //book = await Book.create(googleBook);       // create in db
        try {
            book = await Book.create(googleBook);
        } catch (error) {
            if (error.code === 11000) {
                book = await Book.findOne({ googleBookId });
            } else {
                throw error;
            }
        }
    }
    // Check if this user already has the book
    const existingUserBook = await UserBook.findOne({
        user: userId,
        book: book._id,
    });

    if (existingUserBook) {
        throw new AppError("Book already exists in your library",HTTP_STATUS.CONFLICT);
    }

    const userBook = await UserBook.create({
        user: userId,
        book: book._id,
    });
    return await userBook.populate("book");
};

export const getUserLibrary = async (userId, status) => {
    const filter = {
        user: userId,
    };

    if (status) {
        if (!Object.values(BOOK_STATUS).includes(status)) {
            throw new AppError("Invalid book status", HTTP_STATUS.BAD_REQUEST);
        }

        filter.status = status;
        // filter.status = status;
    }

    return await UserBook.find(filter)
        .populate(
            "book",
            "title authors coverImage pageCount"
        )
        .sort({ createdAt: -1 });

};

export const updateUserBook = async (userBookId, userId, updates) => {

    const userBook = await UserBook.findOne({  //user update their own books.
        _id: userBookId,
        user: userId,
    }).populate("book");

    if (!userBook) {
        throw new AppError("Book not found in your library",HTTP_STATUS.NOT_FOUND);
    }

    const { status, currentPage, rating } = updates;

    // Update Progress
    if (currentPage !== undefined) {
        if (currentPage < 0) {
            throw new AppError("Current page cannot be negative",HTTP_STATUS.BAD_REQUEST);
        }

        if (currentPage > userBook.book.pageCount) {
            throw new AppError("Current page cannot exceed total pages",HTTP_STATUS.BAD_REQUEST );
        }
        userBook.currentPage = currentPage;
        userBook.lastReadOn = new Date();
    }

    // Update Rating
    if (rating !== undefined) {
        userBook.rating = rating;
    }

    // Update Status
    if (status) {
        if (!Object.values(BOOK_STATUS).includes(status)) {
            throw new AppError("Invalid book status",HTTP_STATUS.BAD_REQUEST);
        }

        userBook.status = status;
        if (status === BOOK_STATUS.READING && !userBook.startedOn) {
            userBook.startedOn = new Date();
        }
        if (status === BOOK_STATUS.COMPLETED) { // && !userBook.completedOn
            userBook.completedOn = new Date();
            userBook.currentPage = userBook.book.pageCount;
        }
    }
    await userBook.save();
    return await userBook.populate(
        "book",
        "title authors coverImage pageCount"
    );
};