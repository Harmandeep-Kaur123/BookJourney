import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Plus } from "lucide-react";

import Button from "../components/common/Button";
import LoadingSpinner from "../components/common/LoadingSpinner";
import PageContainer from "../components/layout/PageContainer";
import PageHeader from "../components/layout/PageHeader";

import EmptyNotes from "../components/notes/EmptyNote";
import NotesList from "../components/notes/NotesList";

import useNotes from "../hooks/useNotes";

function Notes() {
    const { userBookId } = useParams();
    console.log("USERBOOKID "+ userBookId );
    const navigate = useNavigate();

    const {
        notes,
        loading,
        fetchNotes,
    } = useNotes();

    useEffect(() => {
        //  if (!userBookId) return;
        fetchNotes(userBookId);
    }, [fetchNotes, userBookId]);

    return (
        <PageContainer>
            <PageHeader
                title="Notes"
                description="Capture your important learnings from this book."
                actions={
                    <div className="flex gap-3">
                        <Button
                            variant="secondary"
                            onClick={() => navigate(-1)}
                        >
                            <ArrowLeft size={18} />
                            Back
                        </Button>

                        <Button>
                            <Plus size={18} />
                            Add Note
                        </Button>
                    </div>
                }
            />

            {loading ? (
                <LoadingSpinner message="Loading notes..." />
            ) : notes.length === 0 ? (
                <EmptyNotes />
            ) : (
                <NotesList notes={notes} />
            )}
        </PageContainer>
    );
}

export default Notes;