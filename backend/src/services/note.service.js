import Note from "../models/Note.js";
import UserBook from "../models/UserBook.js";
import AppError from "../utils/AppError.js";
import { HTTP_STATUS } from "../constants/httpStatus.js"

//CREATE NOTE
export const createNote = async (userId, noteData) => {
    const {
        userBookId,
        title,
        content,
        page,
        chapter,
        tags,
    } = noteData;

    // Verify that the book belongs to the user's library
    const userBook = await UserBook.findOne({
        _id: userBookId,
        user: userId,
    }).populate("book");

    if (!userBook) {
        throw new AppError("Book not found in your library",HTTP_STATUS.NOT_FOUND);
    }

    // Validate page number
    if (page && page > userBook.book.pageCount) {
        throw new AppError("Page number exceeds total pages", HTTP_STATUS.BAD_REQUEST);
    }

    const note = await Note.create({
        user: userId,
        book: userBook.book._id,
        title,
        type,
        content,
        page,
        chapter,
        tags,
    });

    return await note.populate(
        "book",
        "title authors coverImage"
    );
};

//GET NOTE 
export const getUserNotes = async (userId,bookId) => {
    const filter = {
        user: userId,
    };

    if (bookId) {
        filter.book = bookId;
    }

    return await Note.find(filter)
        .populate(
            "book",
            "title authors coverImage"
        )
        .sort({
            createdAt: -1,
        });
};

//UPDATE NOTE 
export const updateNote = async (noteId,userId,updates) => {

    const note = await Note.findOne({
        _id: noteId,
        user: userId,
    }).populate("book");

    if (!note) {
        throw new AppError("Note not found",HTTP_STATUS.NOT_FOUND);
    }

    const {
        title,
        content,
        page,
        chapter,
        tags,
    } = updates;

    if ( page && page > note.book.pageCount) {
        throw new AppError("Page number exceeds total pages", HTTP_STATUS.BAD_REQUEST );
    }

    if (title !== undefined) {
        note.title = title;
    }

    if (content !== undefined) {
        note.content = content;
    }

    if (page !== undefined) {
        note.page = page;
    }

    if (chapter !== undefined) {
        note.chapter = chapter;
    }

    if (tags !== undefined) {
        note.tags = tags;
    }

    await note.save();

    return await note.populate(
        "book",
        "title authors coverImage"
    );
};

//DELETE NODE 

export const deleteNote = async (noteId,userId) => {

    const note = await Note.findOneAndDelete({
        _id: noteId,
        user: userId,
    });

    if (!note) {
        throw new AppError("Note not found",HTTP_STATUS.NOT_FOUND);
    }

    return;
};