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
        <Card className="flex gap-6">
            <img
                src={
                    bookDetails.coverImage ||
                    PLACEHOLDER_IMAGE
                }
                alt={bookDetails.title}
                className="h-48 w-32 rounded-lg border object-cover"
            />

            <div className="flex flex-1 flex-col justify-between">
                <div>
                    <div className="flex items-start justify-between gap-4">
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

                <div className="mt-6 flex gap-3">
                    <Button
                        variant="secondary"
                        className="w-40"
                        onClick={() => navigate(ROUTES.BOOK_NOTES.replace(":userBookId", book._id))}
                    >
                        View Notes
                    </Button>

                    <Button
                        className="w-40"
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