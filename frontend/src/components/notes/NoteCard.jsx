import { Pencil, Trash2} from "lucide-react";

import Button from "../common/Button";
import Card from "../common/Card";

function NoteCard({
    note,
    onEdit,
    onDelete,
}) {
    return (
        <Card className="space-y-4">
            <div className="flex items-start justify-between gap-4">
                <div>
                    <h3 className="text-lg font-semibold text-gray-900">
                        {note.title}
                    </h3>

                    {(note.chapter || note.page) && (
                        <p className="mt-1 text-sm text-gray-500">
                            {note.chapter && `Chapter: ${note.chapter}`}

                            {note.chapter && note.page && " • "}

                            {note.page && `Page ${note.page}`}
                        </p>
                    )}
                </div>

                <div className="flex gap-2">
                    <Button
                        size="sm"
                        variant="secondary"
                        onClick={() => onEdit(note)}
                    >
                        <Pencil size={16} />
                        Edit
                    </Button>

                    <Button
                        size="sm"
                        variant="danger"
                        onClick={() => onDelete(note)}
                    >
                        <Trash2 size={16} />
                        Delete
                    </Button>
                </div>
            </div>

            <p className="whitespace-pre-wrap text-gray-700">
                {note.content}
            </p>

            {note.tags?.length > 0 && (
                <div className="flex flex-wrap gap-2">
                    {note.tags.map((tag) => (
                        <span
                            key={tag}
                            className="rounded-full bg-amber-100 px-3 py-1 text-xs font-medium text-amber-700"
                        >
                            #{tag}
                        </span>
                    ))}
                </div>
            )}

            <div className="border-t pt-3 text-xs text-gray-400">
                Created{" "}
                {new Date(note.createdAt).toLocaleDateString()}
                {/* Updated{" "}
                {new Date(note.updatedAt).toLocaleDateString()} */}
            </div>
        </Card>
    );
}

export default NoteCard;

