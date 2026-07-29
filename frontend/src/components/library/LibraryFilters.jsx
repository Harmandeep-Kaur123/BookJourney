const FILTERS = [
    {
        label: "All",
        value: "all",
    },
    {
        label: "Want to Read",
        value: "Want to Read",
    },
    {
        label: "Reading",
        value: "Reading",
    },
    {
        label: "Completed",
        value: "Completed",
    },
];

function LibraryFilters({
    selectedFilter,
    onFilterChange,
    books,
}) {
    const getCount = (filter) => {
        if (filter === "all") {
            return books.length;
        }

        return books.filter(
            (book) => book.status === filter
        ).length;
    };

    return (
        <div className="mb-6 flex flex-wrap gap-3">
            {FILTERS.map((filter) => {
                const active =
                    selectedFilter === filter.value;

                return (
                    <button
                        key={filter.value}
                        type="button"
                        onClick={() =>
                            onFilterChange(filter.value)
                        }
                        className={`flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-all ${
                            active
                                ? "bg-amber-500 text-white shadow-sm"
                                : "border bg-white text-gray-700 hover:border-amber-300 hover:bg-amber-50"
                        }`}
                    >
                        <span>{filter.label}</span>

                        <span
                            className={`rounded-full px-2 py-0.5 text-xs ${
                                active
                                    ? "bg-white/20"
                                    : "bg-gray-100 text-gray-600"
                            }`}
                        >
                            {getCount(filter.value)}
                        </span>
                    </button>
                );
            })}
        </div>
    );
}

export default LibraryFilters;