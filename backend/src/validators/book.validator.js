import { query } from "express-validator";

export const searchBooksValidation = [
    query("q")
        .trim()
        .notEmpty()
        .withMessage("Search query is required"),
];

