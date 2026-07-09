import { query, body } from "express-validator";

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

