import asyncHandler from "../utils/asyncHandler.js";
import { searchBooks } from "../services/book.service.js";

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