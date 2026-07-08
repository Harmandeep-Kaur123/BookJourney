import mongoose from "mongoose";

const bookSchema = new mongoose.Schema(
    {
        googleBookId: {
            type: String,
            required: true,
            unique: true,
            trim: true,
        },

        title: {
            type: String,
            required: true,
            trim: true,
        },

        authors: [
            {
                type: String,
                trim: true,
            },
        ],

        description: {
            type: String,
            default: "",
        },

        coverImage: {
            type: String,
            default: "",
        },

        pageCount: {
            type: Number,
            default: 0,
        },

        categories: [
            {
                type: String,
                trim: true,
            },
        ],

        publisher: {
            type: String,
            default: "",
        },

        publishedDate: {
            type: String,
            default: "",
        },
    },
    {
        timestamps: true,
    }
);
bookSchema.index({ title: 1 });   //index on title
export default mongoose.model("Book", bookSchema);