import { body } from "express-validator";

export const createNoteValidation = [

    body("userBookId")
        .trim()
        .notEmpty()
        .withMessage("User Book ID is required"),

    body("title")
        .optional()
        .trim()
        .isLength({ max: 100 })
        .withMessage("Title cannot exceed 100 characters"),

    body("content")
        .trim()
        .notEmpty()
        .withMessage("Content is required"),

    body("page")
        .optional()
        .isInt({ min: 1 })
        .withMessage("Page must be a positive integer"),

    body("chapter")
        .optional()
        .trim(),

    body("tags")
        .optional()
        .isArray()
        .withMessage("Tags must be an array"),

];

export const updateNoteValidation = [

    body("title")
        .optional()
        .trim()
        .isLength({ max: 100 })
        .withMessage("Title cannot exceed 100 characters"),

    body("content")
        .optional()
        .trim()
        .notEmpty()
        .withMessage("Content cannot be empty"),

    body("page")
        .optional()
        .isInt({ min: 1 })
        .withMessage("Page must be a positive integer"),

    body("chapter")
        .optional()
        .trim(),

    body("tags")
        .optional()
        .isArray()
        .withMessage("Tags must be an array"),

];