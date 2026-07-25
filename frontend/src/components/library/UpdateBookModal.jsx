import { useEffect, useState } from "react";

import Button from "../common/Button";
import Modal from "../common/Modal";

import RatingStars from "./RatingStars";

function UpdateBookModal({
    isOpen,
    onClose,
    book,
    onSave,
    saving,
}) {
    const [status, setStatus] = useState("");
    const [currentPage, setCurrentPage] = useState(0);
    const [rating, setRating] = useState("");

    useEffect(() => {
        if (!book) return;

        setStatus(book.status);
        setCurrentPage(book.currentPage);
        setRating(book.rating ?? "");
    }, [book]);

    useEffect(() => {
        if (!book) return;

        const totalPages = book.book.pageCount;

        switch (status) {
            case "Want to Read":
                setCurrentPage(0);
                setRating("");
                break;

            case "Completed":
                setCurrentPage(totalPages);
                break;

            default:
                break;
        }
    }, [status, book]);

    if (!book) {
        return null;
    }

    const totalPages = book.book.pageCount;

    const handleSubmit = async (event) => {
        event.preventDefault();

        const page = Number(currentPage);

        if (page < 0) {
            return;
        }

        if (page > totalPages) {
            return;
        }

        if (status === "Reading" && page === 0) {
            return;
        }

        const payload = {
            status,
            currentPage: page,
        };

        if (status === "Completed" && rating !== "") {
            payload.rating = Number(rating);
        }

        await onSave(payload);
    };

    return (
        <Modal
            title="Update Reading Progress"
            isOpen={isOpen}
            onClose={onClose}
        >
            <form
                onSubmit={handleSubmit}
                className="space-y-6"
            >
                <div>
                    <label className="mb-2 block text-sm font-medium">
                        Reading Status
                    </label>

                    <select
                        disabled={saving}
                        value={status}
                        onChange={(e) =>
                            setStatus(e.target.value)
                        }
                        className="w-full rounded-lg border p-3"
                    >
                        <option value="Want to Read">
                            Want to Read
                        </option>

                        <option value="Reading">
                            Reading
                        </option>

                        <option value="Completed">
                            Completed
                        </option>
                    </select>
                </div>

                <div>
                    <label className="mb-2 block text-sm font-medium">
                        Current Page
                    </label>

                    <input
                        type="number"
                        min={0}
                        max={totalPages}
                        value={currentPage}
                        disabled={
                            saving ||
                            status === "Want to Read" ||
                            status === "Completed"
                        }
                        onChange={(e) =>
                            setCurrentPage(e.target.value)
                        }
                        className="w-full rounded-lg border p-3 disabled:bg-gray-100 disabled:text-gray-500"
                    />

                    <p className="mt-2 text-xs text-gray-500">
                        Total pages: {totalPages}
                    </p>
                </div>

                <div>
                    <label className="mb-3 block text-sm font-medium">
                        Rating
                    </label>

                    <RatingStars
                        rating={Number(rating) || 0}
                        onChange={
                            status === "Completed"
                                ? (value) => setRating(value)
                                : undefined
                        }
                        size={28}
                    />

                    {status !== "Completed" && (
                        <p className="mt-2 text-xs text-gray-500">
                            Ratings can be added after completing the book.
                        </p>
                    )}
                </div>

                <div className="flex justify-end gap-3">
                    <Button
                        disabled={saving}
                        type="button"
                        variant="secondary"
                        onClick={onClose}
                    >
                        Cancel
                    </Button>

                    <Button 
                        disabled={saving}
                        type="submit">
                        {saving ? "Saving..." : "Save Changes"}
                    </Button>
                </div>
            </form>
        </Modal>
    );
}

export default UpdateBookModal;