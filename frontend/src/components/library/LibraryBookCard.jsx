import Card from "../common/Card";
import Button from "../common/Button";

import { ROUTES } from "../../constants/routes" 

import ProgressBar from "./ProgressBar";
import RatingStars from "./RatingStars";
import StatusBadge from "./StatusBadge";

import {useNavigate} from "react-router-dom";

const PLACEHOLDER_IMAGE =
    "https://placehold.co/128x192?text=No+Cover";

function LibraryBookCard({
    book,
    onUpdate,
}) {
    const { status, currentPage, rating } = book;
    const bookDetails = book.book;
    const navigate = useNavigate();
    return (
        <Card className="flex flex-col gap-5 md:flex-row">
    
            <div className="flex justify-center md:block">
                <img
                    src={
                        bookDetails.coverImage ||
                        PLACEHOLDER_IMAGE
                    }
                    alt={`${bookDetails.title} cover`}
                    className="h-48 w-32 rounded-lg border object-cover"
                />
            </div>

            <div className="flex flex-1 flex-col justify-between">
                <div>
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                        <div>
                            <h3 className="text-xl font-semibold text-gray-900">
                                {bookDetails.title}
                            </h3>

                            <p className="mt-1 text-gray-600">
                                {bookDetails.authors?.join(", ")}
                            </p>
                        </div>

                        <StatusBadge status={status} />
                    </div>

                    <div className="mt-6">
                        <ProgressBar
                            currentPage={currentPage}
                            pageCount={bookDetails.pageCount}
                        />
                    </div>

                    <div className="mt-6">
                        <RatingStars
                            rating={rating}
                        />
                    </div>
                </div>

                <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                    <Button
                        variant="secondary"
                        className="w-full sm:w-40"
                        onClick={() => navigate(ROUTES.BOOK_NOTES.replace(":userBookId", book._id))}
                    >
                        View Notes
                    </Button>

                    <Button
                        className="w-full sm:w-40"
                        onClick={() => onUpdate(book)}
                    >
                        Update Book
                    </Button>
                </div>
            </div>
        </Card>
    );
}

export default LibraryBookCard;