import asyncHandler from "../utils/asyncHandler.js";
import { searchBooks, addBookToLibrary } from "../services/book.service.js";

export const searchBooksController = asyncHandler(async (req, res) => {

    //Express creates
    // req.query = {
    //     q: "atomic habits"
    // }
    
    const { q } = req.query;
    const books = await searchBooks(q);
    res.status(200).json({
        success: true,
        data: books,
    });
});

export const addBookToLibraryController = asyncHandler(async (req, res) => {
    console.log(req.body);
    const { googleBookId } = req.body;
    const userBook = await addBookToLibrary(
        googleBookId,
        req.user.id
    );
    res.status(201).json({
        success: true,
        message: "Book added to library successfully",
        data: userBook,
    });

});