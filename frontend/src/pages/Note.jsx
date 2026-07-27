import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Plus } from "lucide-react";
import toast from "react-hot-toast";

import Button from "../components/common/Button";
import LoadingSpinner from "../components/common/LoadingSpinner";
import PageContainer from "../components/layout/PageContainer";
import PageHeader from "../components/layout/PageHeader";

import EmptyNotes from "../components/notes/EmptyNote";
import NoteModal from "../components/notes/NoteModal";
import NotesList from "../components/notes/NotesList";
import DeleteNoteDialog from "../components/notes/DeleteNoteDialog";
import NoteFilters from "../components/notes/NoteFilters";

import useNotes from "../hooks/useNotes";

import { getErrorMessage } from "../utils/getErrorMessage";

function Notes() {
    const { userBookId } = useParams();
    const isBookNotes = Boolean(userBookId);

    const navigate = useNavigate();
    const [filter, setFilter] = useState("all");

    const {
        notes,
        loading,
        fetchNotes,
        createNote,
        updateNote,
        deleteNote,
    } = useNotes();
   
    const [selectedNote, setSelectedNote] = useState(null);
    const [mode, setMode] = useState("create");
    const [isModalOpen, setIsModalOpen] = useState(false);

    const [deleteLoading, setDeleteLoading] = useState(false);
    const [isDeleteOpen, setIsDeleteOpen] =useState(false);
    const [noteToDelete, setNoteToDelete] =useState(null);

    const filteredNotes =
    filter === "all"
        ? notes
        : notes.filter(
              (note) => note.type === filter
          );

    useEffect(() => {
        fetchNotes(userBookId);
    }, [fetchNotes, userBookId]);

    const handleCreateNote = async (noteData) => {
        try {
            await createNote({
                ...noteData,
                userBookId,
            });

            setIsModalOpen(false);
        } catch (error) {
            toast.error(getErrorMessage(error));
        }
    };

    const handleEdit = (note) => {
        setMode("edit");
        setSelectedNote(note);
        setIsModalOpen(true);
    };

    const handleUpdateNote = async (data) => {
        try {
            await updateNote(selectedNote._id, data);

            setIsModalOpen(false);
            setSelectedNote(null);
        } catch (error) {
            toast.error(getErrorMessage(error));
        }
    };

    const handleDeleteClick = (note) => {
        setNoteToDelete(note);
        setIsDeleteOpen(true);
    };

    const handleDeleteConfirm = async () => {
        try {
            setDeleteLoading(true);

            await deleteNote(noteToDelete._id);

            setIsDeleteOpen(false);
            setNoteToDelete(null);
        } catch (error) {
            toast.error(getErrorMessage(error));
        } finally {
            setDeleteLoading(false);
        }
    };

    return (
        <>
            <PageContainer>
                <PageHeader
                    title="Notes"
                    description="Capture your learnings from this book."
                    actions={
                        <div className="flex gap-3">
                            <Button
                                variant="secondary"
                                onClick={() => navigate(-1)}
                            >
                                <ArrowLeft size={18} />
                                Back
                            </Button>

                            {/* {isBookNotes && (
                                <Button onClick={() => setIsModalOpen(true)}>
                                    <Plus size={18} />
                                    Add Note
                                </Button>
                            )} */}

                            {isBookNotes && (
                                <Button
                                    onClick={() => {
                                        setMode("create");
                                        setSelectedNote(null);
                                        setIsModalOpen(true);
                                    }}
                                >
                                    <Plus size={18} />
                                    Add Note
                                </Button>
                            )}
                        </div>
                    }
                />

                <NoteFilters
                    filter={filter}
                    setFilter={setFilter}
                />

                {loading ? (
                    <LoadingSpinner message="Loading notes..." />
                ) :filteredNotes.length === 0? (
                    <EmptyNotes
                        title={
                            filter === "quote"
                                ? "No Quotes Yet"
                                : filter === "note"
                                ? "No Notes Yet"
                                : "No Notes Yet"
                        }
                        description={
                            filter === "quote"
                                ? "You haven't saved any quotes yet."
                                : filter === "note"
                                ? "You haven't created any notes yet."
                                : "Start capturing ideas while reading."
                        }
                    />
                ) : (
                    <NotesList 
                        notes={filteredNotes}
                        onEdit={handleEdit}
                        onDelete={handleDeleteClick}
                    />
                )}
            </PageContainer>

            <NoteModal
                isOpen={isModalOpen}
                mode={mode}
                note={selectedNote}
                onClose={() => {
                    setSelectedNote(null);
                    setIsModalOpen(false);
                }}
                onSave={
                    mode === "create"
                        ? handleCreateNote
                        : handleUpdateNote
                }
            />

            <DeleteNoteDialog
                isOpen={isDeleteOpen}
                onClose={() => {
                    setIsDeleteOpen(false);
                    setNoteToDelete(null);
                }}
                onConfirm={handleDeleteConfirm}
                loading={deleteLoading}
            />
        </>
    );
}

export default Notes;
