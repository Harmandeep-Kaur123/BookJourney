export default mongoose.model("Book", bookSchema);

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
            enum: ["Want to Read", "Reading", "Completed"],  //enum: restricted choices
            default: "Want to Read",
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
        },

        startedOn: {
            type: Date,
        },

        completedOn: {
            type: Date,
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