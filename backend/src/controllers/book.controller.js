import asyncHandler from "../utils/asyncHandler.js";
import { searchBooks, addBookToLibrary, updateUserBook } from "../services/book.service.js";
import { getUserLibrary } from "../services/book.service.js";
import { HTTP_STATUS } from "../constants/httpStatus.js";

export const searchBooksController = asyncHandler(async (req, res) => {

    //Express creates
    // req.query = {
    //     q: "atomic habits"
    // }
    
    const { q } = req.query;
    const books = await searchBooks(q);
    res.status(HTTP_STATUS.OK).json({
        success: true,
        data: books,
    });
});

export const addBookToLibraryController = asyncHandler(async (req, res) => {
    const { googleBookId } = req.body;
    const userBook = await addBookToLibrary(
        googleBookId,
        req.user.id
    );
    res.status(HTTP_STATUS.CREATED).json({
        success: true,
        message: "Book added to library successfully",
        data: userBook,
    });

});

export const getUserLibraryController = asyncHandler(async (req, res) => {
    const { status } = req.query;
    const books = await getUserLibrary(
        req.user.id,
        status
    );

    res.status(HTTP_STATUS.OK).json({
        success: true,
        data: books,
    });

});

export const updateUserBookController = asyncHandler(async (req, res) => {
    const updatedBook = await updateUserBook(
        req.params.userBookId,
        req.user.id,
        req.body
    );

    res.status(HTTP_STATUS.OK).json({
        success: true,
        message: "Book updated successfully",
        data: updatedBook,
    });

});