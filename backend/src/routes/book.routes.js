import express from "express";
import { searchBooksController, addBookToLibraryController } from "../controllers/book.controller.js";

import authMiddleware from "../middlewares/auth.middleware.js";
import validate from "../middlewares/validate.middleware.js";
import { searchBooksValidation, addBookValidation } from "../validators/book.validator.js";

const router = express.Router();

router.get("/search",authMiddleware,searchBooksValidation,validate,searchBooksController);  //protected : authmiddleware
router.post("/",authMiddleware,addBookValidation,validate,addBookToLibraryController);

export default router;