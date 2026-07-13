import mongoose from "mongoose";

const noteSchema = new mongoose.Schema(
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

        title: {
            type: String,
            trim: true,
        },

        content: {
            type: String,
            required: true,
            trim: true,
        },

        page: {
            type: Number,
            min: 1,
        },

        chapter: {
            type: String,
            trim: true,
        },

        tags: {
            type: [
                {
                type: String,
                trim: true,
                lowercase: true,
                },
            ],
            default: [],
        }
    },
    {
        timestamps: true,
    }
);

export default mongoose.model("Note", noteSchema);