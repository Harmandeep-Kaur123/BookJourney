import LibraryBookCard from "./LibraryBookCard";

function LibraryGrid({
    books,
    onUpdate,
}) {
    return (
        <div className="space-y-6">
            {books.map((book) => (
                <LibraryBookCard
                    key={book._id}
                    book={book}
                    onUpdate={onUpdate}
                />
            ))}
        </div>
    );
}

export default LibraryGrid;