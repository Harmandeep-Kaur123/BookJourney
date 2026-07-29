import {
    BookOpen,
    MessageSquareText,
    Pencil,
    Quote,
    Trash2,
} from "lucide-react";

import Button from "../common/Button";

function NoteCard({
    note,
    onEdit,
    onDelete,
}) {
    const isQuote = note.type === "quote";

    return (
        <div className="rounded-xl border bg-white p-5 shadow-sm transition-shadow hover:shadow-md">
            <div className="mb-4 flex items-start justify-between gap-4">
                <div className="flex items-center gap-3">
                    <div
                        className={`rounded-lg p-2 ${
                            isQuote
                                ? "bg-amber-100 text-amber-600"
                                : "bg-blue-100 text-blue-600"
                        }`}
                    >
                        {isQuote ? (
                            <Quote size={20} />
                        ) : (
                            <MessageSquareText size={20} />
                        )}
                    </div>

                    <div>
                        <h3 className="font-semibold text-gray-900">
                            {note.title}
                        </h3>

                        <span
                            className={`mt-1 inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${
                                isQuote
                                    ? "bg-amber-100 text-amber-700"
                                    : "bg-blue-100 text-blue-700"
                            }`}
                        >
                            {isQuote ? "Quote" : "Note"}
                        </span>
                    </div>
                </div>

                <div className="flex gap-2">
                    <Button
                        size="sm"
                        variant="secondary"
                        onClick={() => onEdit(note)}
                        aria-label="Edit note"
                    >
                        <Pencil size={16} />
                    </Button>

                    <Button
                        size="sm"
                        variant="danger"
                        aria-label="Delete note"
                        onClick={() => onDelete(note)}
                    >
                        <Trash2 size={16} />
                    </Button>
                </div>
            </div>

            {isQuote ? (
                <blockquote className="border-l-4 border-amber-400 pl-4 italic leading-7 text-gray-700">
                    "{note.content}"
                </blockquote>
            ) : (
                <p className="whitespace-pre-wrap leading-7 text-gray-700">
                    {note.content}
                </p>
            )}

            <div className="mt-5 flex flex-wrap items-center gap-4 text-sm text-gray-500">
                {note.page && (
                    <span className="flex items-center gap-1">
                        <BookOpen size={16} />
                        Page {note.page}
                    </span>
                )}

                {note.chapter && (
                    <span>{note.chapter}</span>
                )}
            </div>

            {note.tags?.length > 0 && (
                <div className="mt-4 flex flex-wrap gap-2">
                    {note.tags.map((tag) => (
                        <span
                            key={tag}
                            className="rounded-full bg-gray-100 px-3 py-1 text-xs text-gray-600"
                        >
                            #{tag}
                        </span>
                    ))}
                </div>
            )}
        </div>
    );
}

export default NoteCard;