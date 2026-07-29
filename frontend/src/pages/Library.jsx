import { useEffect, useState, useMemo } from "react";
import toast from "react-hot-toast";
import { LibraryBig } from "lucide-react";

import PageContainer from "../components/layout/PageContainer";
import PageHeader from "../components/layout/PageHeader";
import EmptyState from "../components/common/EmptyState";
import LoadingSpinner from "../components/common/LoadingSpinner";
import UpdateBookModal from "../components/library/UpdateBookModal";
import LibraryGrid from "../components/library/LibraryGrid";
import LibraryFilters from "../components/library/LibraryFilters";

import bookService from "../services/book.service";
import { getErrorMessage } from "../utils/getErrorMessage";

function Library() {
    const [books, setBooks] = useState([]);
    const [selectedFilter, setSelectedFilter] = useState("all");
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [selectedBook, setSelectedBook] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    useEffect(() => {
        fetchLibrary();
    }, []);

    const fetchLibrary = async () => {
        try {
            setLoading(true);

            const response = await bookService.getLibrary();

            setBooks(response.data);
        } catch (error) {
            toast.error(getErrorMessage(error));
        } finally {
            setLoading(false);
        }
    };

    const handleOpenModal = (book) => {
        setSelectedBook(book);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setSelectedBook(null);
        setIsModalOpen(false);
    };

    const handleSave = async (data) => {
        try {
            setSaving(true);

            const response = await bookService.updateLibraryBook(
                selectedBook._id,
                data
            );

            setBooks((previousBooks) =>
                previousBooks.map((book) =>
                    book._id === selectedBook._id
                        ? response.data
                        : book
                )
            );

            toast.success(response.message);

            handleCloseModal();
        } catch (error) {
            toast.error(getErrorMessage(error));
        } finally {
            setSaving(false);
        }
    };

    const filteredBooks = useMemo(() => {
        if (selectedFilter === "all") {
            return books;
        }

        return books.filter(
            (book) => book.status === selectedFilter
        );
    }, [books, selectedFilter]);

    return (
        <PageContainer>
            <PageHeader
                title="My Library"
                description="Manage your personal reading collection."
            />

            {loading ? (
                <LoadingSpinner message="Loading your library..." />
            ) : books.length === 0 ? (
                <EmptyState
                    icon={LibraryBig}
                    title="Your library is empty"
                    description="Search for a book and add it to your library."
                />
            ) : (
                <>
                    <LibraryFilters
                        books={books}
                        selectedFilter={selectedFilter}
                        onFilterChange={setSelectedFilter}
                    />

                    {filteredBooks.length === 0 ? (
                        <EmptyState
                            icon={LibraryBig}
                            title="No books found"
                            description="No books match the selected filter."
                        />
                    ) : (
                        <LibraryGrid
                            books={filteredBooks}
                            onUpdate={handleOpenModal}
                        />
                    )}
                </>
            )}

            <UpdateBookModal
                isOpen={isModalOpen}
                book={selectedBook}
                onClose={handleCloseModal}
                onSave={handleSave}
                saving={saving}
            />
        </PageContainer>
    );
}

export default Library;