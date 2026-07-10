import { query, body } from "express-validator";
import { BOOK_STATUS } from "../constants/bookStatus.js";

export const searchBooksValidation = [
    query("q")
        .trim()
        .notEmpty()
        .withMessage("Search query is required"),
];

export const addBookValidation = [
    body("googleBookId")
        .trim()
        .notEmpty()
        .withMessage("Google Book ID is required"),
];

export const updateBookValidation = [

    body("status")
        .optional()
        .isIn(Object.values(BOOK_STATUS))
        .withMessage("Invalid status"),

    body("currentPage")
        .optional()
        .isInt({ min: 0 })
        .withMessage("Current page must be a positive integer"),

    body("rating")
        .optional()
        .isInt({ min: 1, max: 5 })
        .withMessage("Rating must be between 1 and 5"),

];
