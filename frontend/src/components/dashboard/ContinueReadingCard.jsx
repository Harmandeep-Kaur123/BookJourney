import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../constants/routes.js";

import Card from "../common/Card";
import Button from "../common/Button";


function ContinueReadingCard({ book }) {
    const navigate = useNavigate();

    const progress =
    book.book.pageCount > 0 ? Math.round((book.currentPage /book.book.pageCount) * 100) : 0;

    return (
        <Card className="flex flex-col justify-between">
            <div>
                <h3 className="text-lg font-semibold text-gray-900">
                    {book.book.title}
                </h3>

                <p className="mt-1 text-sm text-gray-500">
                    {book.book.authors?.join(", ")}
                </p>

                <p className="mt-4 text-sm font-medium text-gray-700">
                    {book.currentPage} / {book.book.pageCount} pages
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

            <Button variant="ghost" className="mt-6 w-fit" onClick={() => navigate(ROUTES.LIBRARY)}>
                Continue Reading
                <ArrowRight size={18} className="ml-2"/>
            </Button>
        </Card>
    );
}

export default ContinueReadingCard;