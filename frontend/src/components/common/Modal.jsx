import { X } from "lucide-react";
import { useEffect } from "react";

function Modal({
    title,
    isOpen,
    onClose,
    children,
}) {
    useEffect(() => {
        if (!isOpen) return;

        const handleEscape = (event) => {
            if (event.key === "Escape") {
                onClose();
            }
        };

        document.addEventListener("keydown", handleEscape);

        document.body.style.overflow = "hidden";

        return () => {
            document.removeEventListener(
                "keydown",
                handleEscape
            );

            document.body.style.overflow = "auto";
        };
    }, [isOpen, onClose]);

    if (!isOpen) {
        return null;
    }

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
            onClick={onClose}
        >
            <div
                className="flex max-h-[90vh] w-full max-w-lg flex-col overflow-hidden rounded-xl bg-white shadow-xl"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="flex items-center justify-between border-b p-5">
                    <h2 className="text-lg font-semibold sm:text-xl">
                        {title}
                    </h2>

                    <button
                        type="button"
                        aria-label="Close modal"
                        onClick={onClose}
                        className="rounded-md p-2 transition-colors hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-amber-300"
                    >
                        <X size={20} />
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto p-6">
                    {children}
                </div>
            </div>
        </div>
    );
}

export default Modal;