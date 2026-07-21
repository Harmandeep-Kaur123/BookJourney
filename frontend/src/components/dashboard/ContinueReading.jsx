import Card from "../common/Card";
import ContinueReadingCard from "./ContinueReadingCard";
import EmptyState from "../common/EmptyState";
import { BookOpen } from "lucide-react";

function ContinueReading({ books }) {
    return (
        <Card
            title="Continue Reading"
            className="mt-8"
        >
            {books.length === 0 ? (
                <EmptyState
                    icon={BookOpen}
                    title="Nothing in progress"
                    description="Start reading a book to continue it here."
                />
            ) : (
                <div className="grid gap-6 md:grid-cols-2">
                    {books.map((book) => (
                        <ContinueReadingCard
                            key={book.id}
                            book={book}
                        />
                    ))}
                </div>
            )}
        </Card>
    );
}

export default ContinueReading;