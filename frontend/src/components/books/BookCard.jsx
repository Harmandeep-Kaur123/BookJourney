import { useState } from "react";

import Button from "../common/Button";
import Card from "../common/Card";
import BookMeta from "./BookMeta";

const PLACEHOLDER_IMAGE =
    "https://placehold.co/128x192?text=No+Cover";

function BookCard({
    book,
    onAddToLibrary,
}) {
    const [adding, setAdding] = useState(false);

    const [image, setImage] = useState(
        book.coverImage || PLACEHOLDER_IMAGE
    );

    const handleClick = async () => {
        try {
            setAdding(true);

            await onAddToLibrary(book.googleBookId);
        } finally {
            setAdding(false);
        }
    };

    return (
        <Card className="flex gap-6">
            <img
                src={image}
                alt={book.title}
                onError={() =>
                    setImage(PLACEHOLDER_IMAGE)
                }
                className="h-48 w-32 rounded-lg border object-cover"
            />

            <div className="flex flex-1 flex-col justify-between">
                <BookMeta
                    title={book.title}
                    authors={book.authors}
                    description={book.description}
                    pageCount={book.pageCount}
                    categories={book.categories}
                    publishedDate={book.publishedDate}
                />

                <Button
                    disabled={adding}
                    onClick={handleClick}
                    className="mt-6 self-start"
                >
                    {adding
                        ? "Adding..."
                        : "Add to Library"}
                </Button>
            </div>
        </Card>
    );
}

export default BookCard;