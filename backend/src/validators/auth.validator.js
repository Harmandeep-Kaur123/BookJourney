import { body } from "express-validator";

export const registerValidation = [
    body("name")
        .notEmpty()
        .withMessage("Name is required"),

    body("email")
        .isEmail()
        .withMessage("Valid email is required"),

    body("password")
        .isLength({ min: 8 })
        .withMessage("Password must be at least 8 characters")

];

export const loginValidation = [

    body("email")
        .isEmail()
        .withMessage("Valid email is required"),

    body("password")
        .notEmpty()
        .withMessage("Password is required")

];

export const updateProfileValidation = [
    body("name")
            .optional()
            .trim()
            .notEmpty()
            .withMessage("Name cannot be empty"),

    body("readingGoal")
        .optional()
        .isInt({ min: 1 })
        .withMessage("Reading goal must be at least 1"),
];

export const changePasswordValidation = [
    body("currentPassword")
        .notEmpty()
        .withMessage("Current password is required"),

    body("newPassword")
        .isLength({ min: 8 })
        .withMessage("New password must be at least 8 characters"),
];