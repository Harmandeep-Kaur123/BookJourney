import asyncHandler from "../utils/asyncHandler.js";
import {createNote,getUserNotes,updateNote,deleteNote} from "../services/note.service.js";
import { HTTP_STATUS } from "../constants/httpStatus.js";

export const createNoteController = asyncHandler(async (req, res) => {
    const note = await createNote(
        req.user.id,
        req.body
    );

    res.status(HTTP_STATUS.CREATED).json({
        success: true,
        message: "Note created successfully",
        data: note,
    });
});

export const getUserNotesController = asyncHandler(async (req, res) => {

    const notes = await getUserNotes(
        req.user.id,
        req.query.bookId
    );

    res.status(HTTP_STATUS.OK).json({
        success: true,
        data: notes,
    });

});

export const updateNoteController = asyncHandler(async (req, res) => {

    const note = await updateNote(
        req.params.noteId,
        req.user.id,
        req.body
    );

    res.status(HTTP_STATUS.OK).json({
        success: true,
        message: "Note updated successfully",
        data: note,
    });
});

export const deleteNoteController = asyncHandler(async (req, res) => {

    await deleteNote(
        req.params.noteId,
        req.user.id
    );

    res.status(HTTP_STATUS.OK).json({
        success: true,
        message: "Note deleted successfully",
    });

});
