import { NotebookPen } from "lucide-react";

import EmptyState from "../common/EmptyState";

function EmptyNotes() {
    return (
        <EmptyState
            icon={NotebookPen}
            title="No notes yet"
            description="Capture your favorite ideas, quotes and learnings from this book."
        />
    );
}

export default EmptyNotes;