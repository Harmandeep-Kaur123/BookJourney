function ProgressBar({
    currentPage,
    pageCount,
}) {
    const progress =
        pageCount > 0
            ? Math.min(
                  Math.round((currentPage / pageCount) * 100),
                  100
              )
            : 0;

    return (
        <div className="w-full">
            <div className="mb-2 flex items-center justify-between text-sm text-gray-600">
                <span>
                     {currentPage} of {pageCount} pages
                </span>

                <span>{progress}%</span>
            </div>

            <div className="h-2 overflow-hidden rounded-full bg-gray-200">
                <div
                    className="h-full rounded-full bg-amber-500 transition-all"
                    style={{
                        width: `${progress}%`,
                    }}
                />
            </div>
        </div>
    );
}

export default ProgressBar;