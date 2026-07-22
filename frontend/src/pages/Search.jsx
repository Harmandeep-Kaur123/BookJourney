import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import toast from "react-hot-toast";
import PageContainer from "../components/layout/PageContainer";
import PageHeader from "../components/layout/PageHeader";
import EmptyState from "../components/common/EmptyState";
import LoadingSpinner from "../components/common/LoadingSpinner";

import BookGrid from "../components/books/BookGrid";

import bookService from "../services/book.service";
import { getErrorMessage } from "../utils/getErrorMessage";

import { Search as SearchIcon } from "lucide-react";

function Search() {
    const [searchParams] = useSearchParams();

    const query = searchParams.get("q")?.trim() || "";

    const [books, setBooks] = useState([]);

    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!query) {
            setBooks([]);
            return;
        }

        fetchBooks();
    }, [query]);

    const fetchBooks = async () => {
        try {
            setLoading(true);
            const response = await bookService.searchBooks(query);
            setBooks(response.data);
        } catch (error) {
            setBooks([]);
            toast.error(getErrorMessage(error));
        } finally {
            setLoading(false);
        }
    };

    const handleAddToLibrary = async (googleBookId) => {
        try {
            const response = await bookService.addToLibrary(
                googleBookId
            );

            toast.success(response.message);
        } catch (error) {
            toast.error(getErrorMessage(error));
        }
    };

    return (
        <PageContainer>
            <PageHeader
                title="Search Books"
                description="Find books and add them to your personal library."
            />

            {!query && (
                <EmptyState
                    icon={SearchIcon}
                    title="Start searching"
                    description="Use the search bar in the navigation to discover books."
                />
            )}

            {query && loading && (
                <LoadingSpinner
                    message="Searching books..."
                />
            )}

            {query && !loading && (
                <BookGrid
                    books={books}
                    onAddToLibrary={handleAddToLibrary}
                />
            )}
        </PageContainer>
    );
}

export default Search;