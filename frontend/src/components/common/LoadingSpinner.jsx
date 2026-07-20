import { LoaderCircle } from "lucide-react";

function LoadingSpinner({
    size = 32,
    message,
    fullScreen = false,
}) {
    return (
        <div
            className={
                fullScreen
                    ? "flex min-h-screen flex-col items-center justify-center gap-4 bg-gray-50"
                    : "flex flex-col items-center justify-center gap-4 py-16"
            }
        >
            <LoaderCircle
                size={size}
                className="animate-spin text-amber-600"
            />

            {message && (
                <p className="text-sm text-gray-500">
                    {message}
                </p>
            )}
        </div>
    );
}

export default LoadingSpinner;