function BookMeta({
    title,
    authors,
    description,
    pageCount,
    categories,
    publishedDate,
}) {
    const year = publishedDate
        ? publishedDate.substring(0, 4)
        : null;

    return (
        <div className="flex flex-1 flex-col">
            <h3 className="line-clamp-2 text-lg font-semibold text-gray-900">
                {title}
            </h3>

            <p className="mt-1 text-sm text-gray-600">
                {authors?.length
                    ? authors.join(", ")
                    : "Unknown Author"}
            </p>

            <p className="mt-3 line-clamp-3 text-sm leading-6 text-gray-500">
                {description ||
                    "No description available for this book."}
            </p>

            <div className="mt-4 flex flex-wrap items-center gap-3 text-sm text-gray-500">
                {pageCount > 0 && (
                    <span>{pageCount} pages</span>
                )}

                {year && (
                    <span>{year}</span>
                )}

                {categories?.length > 0 && (
                    <span className="rounded-full bg-gray-100 px-3 py-1 text-xs">
                        {categories[0]}
                    </span>
                )}
            </div>
        </div>
    );
}

export default BookMeta;