import NoteCard from "./NoteCard";

function NotesList({
    notes,
}) {
    return (
        <div className="space-y-4">
            {notes.map((note) => (
                <NoteCard
                    key={note._id}
                    note={note}
                />
            ))}
        </div>
    );
}

export default NotesList;