import { ArrowRight } from "lucide-react";
import Card from "../common/Card";
import Button from "../common/Button";

function ContinueReadingCard({ book }) {
    const progress =
        book.pageCount > 0
            ? Math.round((book.currentPage / book.pageCount) * 100)
            : 0;

    return (
        <Card className="flex flex-col justify-between">
            <div>
                <h3 className="text-lg font-semibold text-gray-900">
                    {book.title}
                </h3>

                <p className="mt-1 text-sm text-gray-500">
                    {book.author}
                </p>

                <p className="mt-4 text-sm font-medium text-gray-700">
                    {book.currentPage} / {book.pageCount} pages
                </p>

                <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-gray-200">
                    <div
                        className="h-full rounded-full bg-amber-600"
                        style={{
                            width: `${progress}%`,
                        }}
                    />
                </div>
            </div>

            <Button
                variant="ghost"
                className="mt-6 w-fit"
            >
                Continue Reading

                <ArrowRight
                    size={18}
                    className="ml-2"
                />
            </Button>
            {/* <Link
                to={`/books/${book.id}`}
                className="mt-6 inline-flex items-center text-sm font-medium text-amber-600 hover:text-amber-700"
            >
                Continue Reading
                <ArrowRight size={18} className="ml-2" />
            </Link> */}
        </Card>
    );
}

export default ContinueReadingCard;