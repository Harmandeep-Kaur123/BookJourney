import mongoose from "mongoose";
import { BOOK_STATUS } from "../constants/bookStatus.js";

const userBookSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },

        book: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Book",
            required: true,
        },

        status: {
            type: String,
            enum: Object.values(BOOK_STATUS), //enum: restricted choices
            default: BOOK_STATUS.WANT_TO_READ
        },

        currentPage: {
            type: Number,
            default: 0,
            min: 0,
        },

        rating: {
            type: Number,
            min: 1,
            max: 5,
            default: null,
        },

        startedOn: {
            type: Date,
            default: null,
        },
        lastReadOn: {
            type: Date,
            default: null,
        },
        completedOn: {
            type: Date,
            default: null,
        },
    },
    {
        timestamps: true,
    }
); 
//A particular user can have a particular book only once.
userBookSchema.index(
    { user: 1, book: 1 },
    { unique: true }
);
export default mongoose.model("UserBook", userBookSchema);