import NoteCard from "./NoteCard";

function NotesList({
    notes,
    onEdit,
    onDelete,
}) {
    return (
        <div className="space-y-4">
            {notes.map((note) => (
                <NoteCard
                    key={note._id}
                    note={note}
                    onEdit={onEdit}
                    onDelete={onDelete}
                />
            ))}
        </div>
    );
}

export default NotesList;