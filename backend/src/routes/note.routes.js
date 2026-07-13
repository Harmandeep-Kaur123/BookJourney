import express from "express";
import authMiddleware from "../middlewares/auth.middleware.js";
import validate from "../middlewares/validate.middleware.js";
import {createNoteController,getUserNotesController,updateNoteController,deleteNoteController} from "../controllers/note.controller.js";
import {createNoteValidation,updateNoteValidation,} from "../validators/note.validator.js";

const router = express.Router();

router.post("/",authMiddleware,createNoteValidation,validate,createNoteController);
router.get("/",authMiddleware,getUserNotesController);
router.patch("/:noteId",authMiddleware,updateNoteValidation,validate,updateNoteController);
router.delete("/:noteId",authMiddleware,deleteNoteController);

export default router;