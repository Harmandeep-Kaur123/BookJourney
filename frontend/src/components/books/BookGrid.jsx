import { SearchX } from "lucide-react";

import EmptyState from "../common/EmptyState";
import BookCard from "./BookCard";

function BookGrid({
    books,
    onAddToLibrary,
}) {
    if (!books.length) {
        return (
            <EmptyState
                icon={SearchX}
                title="No books found"
                description="Try another title, author, or keyword."
            />
        );
    }

    return (
        <div className="space-y-6">
            {books.map((book) => (
                <BookCard
                    key={book.googleBookId}
                    book={book}
                    onAddToLibrary={onAddToLibrary}
                />
            ))}
        </div>
    );
}

export default BookGrid;