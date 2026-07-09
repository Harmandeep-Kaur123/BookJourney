import axios from "axios";
import mapGoogleBook from "../utils/mapGoogleBook.js";
import AppError from "../utils/appError.js";

import Book from "../models/Book.js";
import UserBook from "../models/UserBook.js";

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
        console.log("Status:", error.response?.status);
        console.log("Data:", error.response?.data);
        throw error;
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
            throw new AppError("Book not found", 404);
        }
        throw new AppError("Failed to fetch book from Google Books",502);
    }
};

export const addBookToLibrary = async (googleBookId, userId) => {
    //CHECK if book already in our DB
    let book = await Book.findOne({ googleBookId });
     if (!book) {
        const googleBook = await getBookByGoogleId(googleBookId);  //get book details from external API
        book = await Book.create(googleBook);       // create in db
    }
    // Check if this user already has the book
    const existingUserBook = await UserBook.findOne({
        user: userId,
        book: book._id,
    });

    if (existingUserBook) {
        throw new AppError("Book already exists in your library",409);
    }

    const userBook = await UserBook.create({
        user: userId,
        book: book._id,
    });
    return await userBook.populate("book");
};