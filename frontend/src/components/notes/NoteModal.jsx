import { useEffect, useState } from "react";

import Modal from "../common/Modal";
import Button from "../common/Button";

import TagInput from "./TagInput";

function NoteModal({
    isOpen,
    onClose,
    mode,
    note,
    onSave,
}) {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [page, setPage] = useState("");
    const [chapter, setChapter] = useState("");
    const [tags, setTags] = useState([]);

    useEffect(() => {
        if (mode === "edit" && note) {
            setTitle(note.title);
            setContent(note.content);
            setPage(note.page || "");
            setChapter(note.chapter || "");
            setTags(note.tags || []);
        } else {
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
                    ? "Add Note"
                    : "Edit Note"
            }
            isOpen={isOpen}
            onClose={onClose}
        >
            <form
                onSubmit={handleSubmit}
                className="space-y-5"
            >
                <div>
                    <label className="mb-2 block text-sm font-medium">
                        Title
                    </label>

                    <input
                        value={title}
                        onChange={(e) =>
                            setTitle(e.target.value)
                        }
                        className="w-full rounded-lg border p-3"
                        required
                    />
                </div>

                <div>
                    <label className="mb-2 block text-sm font-medium">
                        Content
                    </label>

                    <textarea
                        rows={6}
                        value={content}
                        onChange={(e) =>
                            setContent(e.target.value)
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

                <div className="flex justify-end gap-3">
                    <Button
                        type="button"
                        variant="secondary"
                        onClick={onClose}
                    >
                        Cancel
                    </Button>

                    <Button type="submit">
                        {mode === "create"
                            ? "Save Note"
                            : "Update Note"}
                    </Button>
                </div>
            </form>
        </Modal>
    );
}

export default NoteModal;