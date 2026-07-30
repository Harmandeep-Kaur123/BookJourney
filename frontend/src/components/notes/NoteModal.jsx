import { useEffect, useState } from "react";

import Button from "../common/Button";
import Modal from "../common/Modal";

import TagInput from "./TagInput";

function NoteModal({
    isOpen,
    onClose,
    mode,
    note,
    onSave,
}) {
    const [type, setType] = useState("note");
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [page, setPage] = useState("");
    const [chapter, setChapter] = useState("");
    const [tags, setTags] = useState([]);

    useEffect(() => {
        if (mode === "edit" && note) {
            setType(note.type || "note");
            setTitle(note.title || "");
            setContent(note.content || "");
            setPage(note.page || "");
            setChapter(note.chapter || "");
            setTags(note.tags || []);
        } else {
            setType("note");
            setTitle("");
            setContent("");
            setPage("");
            setChapter("");
            setTags([]);
        }
    }, [mode, note, isOpen]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const payload = {
            type,
            title: title.trim(),
            content: content.trim(),
            page: page ? Number(page) : undefined,
            chapter: chapter.trim(),
            tags,
        };

        await onSave(payload);
    };

    return (
        <Modal
            title={
                mode === "create"
                    ? `Add ${type === "note" ? "Note" : "Quote"}`
                    : `Edit ${type === "note" ? "Note" : "Quote"}`
            }
            isOpen={isOpen}
            onClose={onClose}
        >
            <form
                onSubmit={handleSubmit}
                className="space-y-5"
            >
                {/* Type */}

                <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700">
                        Type
                    </label>

                    {mode === "create" ? (
                        <div className="flex w-full rounded-lg border bg-gray-100 p-1">
                            <button
                                type="button"
                                onClick={() => setType("note")}
                                className={`flex-1 rounded-md px-4 py-2 text-sm font-medium transition ${
                                    type === "note"
                                        ? "bg-white text-amber-600 shadow"
                                        : "text-gray-600 hover:text-gray-900"
                                }`}
                            >
                                📝 Note
                            </button>

                            <button
                                type="button"
                                onClick={() => setType("quote")}
                                className={`flex-1 rounded-md px-4 py-2 text-sm font-medium transition ${
                                    type === "quote"
                                        ? "bg-white text-amber-600 shadow"
                                        : "text-gray-600 hover:text-gray-900"
                                }`}
                            >
                                ❝ Quote
                            </button>
                        </div>
                    ) : (
                        <span
                            className={`inline-flex items-center rounded-full px-3 py-1 text-sm font-medium ${
                                type === "quote"
                                    ? "bg-amber-100 text-amber-700"
                                    : "bg-blue-100 text-blue-700"
                            }`}
                        >
                            {type === "quote" ? "❝ Quote" : "📝 Note"}
                        </span>
                    )}
                </div>

                <div>
                    <label className="mb-2 block text-sm font-medium">
                        Title
                    </label>

                    <input
                        value={title}
                        onChange={(e) =>
                            setTitle(e.target.value)
                        }
                        placeholder={
                            type === "note"
                                ? "Enter note title"
                                : "Enter quote title"
                        }
                        className="w-full rounded-lg border p-3"
                        required
                    />
                </div>

                <div>
                    <label className="mb-2 block text-sm font-medium">
                        {type === "note" ? "Content": "Quote"}
                    </label>

                    <textarea
                        rows={5}
                        value={content}
                        onChange={(e) =>
                            setContent(e.target.value)
                        }
                        placeholder={
                            type === "note"
                                ? "Write your thoughts..."
                                : "Write the quote..."
                        }
                        className="w-full rounded-lg border p-3"
                        required
                    />
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                    <div>
                        <label className="mb-2 block text-sm font-medium">
                            Page
                        </label>

                        <input
                            type="number"
                            min="1"
                            value={page}
                            onChange={(e) =>
                                setPage(e.target.value)
                            }
                            className="w-full rounded-lg border p-3"
                        />
                    </div>

                    <div>
                        <label className="mb-2 block text-sm font-medium">
                            Chapter
                        </label>

                        <input
                            value={chapter}
                            onChange={(e) =>
                                setChapter(e.target.value)
                            }
                            placeholder="Optional"
                            className="w-full rounded-lg border p-3"
                        />
                    </div>
                </div>

                <div>
                    <label className="mb-2 block text-sm font-medium">
                        Tags
                    </label>

                    <TagInput
                        tags={tags}
                        setTags={setTags}
                    />
                </div>

                {/* Footer */}

                <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
                    <Button
                        type="button"
                        variant="secondary"
                        onClick={onClose}
                    >
                        Cancel
                    </Button>

                    <Button type="submit">
                        {mode === "create"
                            ? `Save ${type === "note" ? "Note" : "Quote"}`
                            : `Update ${type === "note" ? "Note" : "Quote"}`}
                    </Button>
                </div>
            </form>
        </Modal>
    );
}

export default NoteModal;