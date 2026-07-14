import User from "../models/User.js";
import UserBook from "../models/UserBook.js";
import Note from "../models/Note.js";

import { BOOK_STATUS } from "../constants/bookStatus.js";

// getReadingStats()
// getReadingGoal()
// getFavoriteGenres()
// getContinueReading()
// getRecentNotes()
// getDashboard()

const getReadingStats = async (userId) => {
    const userBooks = await UserBook.find({
        user: userId,
    });

    const stats = {
        wantToRead: 0,
        reading: 0,
        completed: 0,
        pagesRead: 0,
        averageRating: 0,
    };

    let ratingSum = 0;
    let ratedBooks = 0;

    userBooks.forEach((book) => {
        switch (book.status) {
            case BOOK_STATUS.WANT_TO_READ:
                stats.wantToRead++;
                break;

            case BOOK_STATUS.READING:
                stats.reading++;
                break;

            case BOOK_STATUS.COMPLETED:
                stats.completed++;
                break;
        }
        stats.pagesRead += book.currentPage;

        if (book.rating) {
            ratingSum += book.rating;
            ratedBooks++;
        }
    });

    stats.averageRating =ratedBooks > 0? Number((ratingSum / ratedBooks).toFixed(1)): 0;
    return stats;
};

const getReadingGoal = async (userId) => {
    const user = await User.findById(userId);

    const completedBooks =
        await UserBook.countDocuments({
            user: userId,
            status: BOOK_STATUS.COMPLETED,
        });

    return {
        target: user.readingGoal,
        completed: completedBooks,
        progress:
            user.readingGoal === 0? 0: Math.round((completedBooks / user.readingGoal) * 100),
    };
};

const getFavoriteGenres = async (userId) => {

    const genres = await UserBook.aggregate([
        {
            $match: {user: userId,},
        },
        {
            $lookup: {
                from: "books",
                localField: "book",
                foreignField: "_id",
                as: "book",
            },
        },
        {
            $unwind: "$book",
        },
        {
            $unwind: "$book.categories",
        },
        {
            $group: {
                _id: "$book.categories",
                count: {
                    $sum: 1,
                },
            },
        },
        {
            $sort: {
                count: -1,
            },
        },
        {
            $limit: 5,
        },
    ]);

    return genres.map((genre) => ({
        genre: genre._id,
        count: genre.count,
    }));
};

const getContinueReading = async (userId) => {

    return await UserBook.find({
        user: userId,
        status: BOOK_STATUS.READING,

    })
    .populate("book","title authors coverImage pageCount")
    .sort({lastReadOn: -1,})
    .limit(5);
};

const getRecentNotes = async (userId) => {

    return await Note.find({
        user: userId,
    })
    .populate("book","title coverImage")
    .sort({ createdAt: -1,})
    .limit(5);
};

export const getDashboard = async (userId) => {

    const [
        stats,
        readingGoal,
        favoriteGenres,
        continueReading,
        recentNotes,
    ] = await Promise.all([
        getReadingStats(userId),
        getReadingGoal(userId),
        getFavoriteGenres(userId),
        getContinueReading(userId),
        getRecentNotes(userId),
    ]);

    return {
        stats,
        readingGoal,
        favoriteGenres,
        continueReading,
        recentNotes,
    };

};