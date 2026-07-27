import { X } from "lucide-react";
import { useState } from "react";

function TagInput({
    tags,
    setTags,
}) {
    const [input, setInput] = useState("");

    const addTag = () => {
        const value = input.trim().toLowerCase();

        if (!value) return;

        if (tags.includes(value)) {
            setInput("");
            return;
        }

        setTags([...tags, value]);
        setInput("");
    };

    const removeTag = (tag) => {
        setTags(tags.filter((t) => t !== tag));
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
            addTag();
        }
    };

    return (
        <div>
            <input
                type="text"
                value={input}
                placeholder="Type a tag and press Enter"
                onChange={(e) =>
                    setInput(e.target.value)
                }
                onKeyDown={handleKeyDown}
                className="w-full rounded-lg border p-3"
            />

            {tags.length > 0 && (
                <div className="mt-3 flex flex-wrap gap-2">
                    {tags.map((tag) => (
                        <span
                            key={tag}
                            className="flex items-center gap-1 rounded-full bg-amber-100 px-3 py-1 text-sm text-amber-700"
                        >
                            #{tag}

                            <button
                                type="button"
                                onClick={() =>
                                    removeTag(tag)
                                }
                            >
                                <X size={14} />
                            </button>
                        </span>
                    ))}
                </div>
            )}
        </div>
    );
}

export default TagInput;