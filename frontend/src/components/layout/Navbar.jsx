import { BookOpen, CircleUserRound } from "lucide-react";

function Navbar() {
    return (
        <header className="sticky top-0 z-50 flex h-16 items-center justify-between border-b bg-white px-6">
            {/* Brand */}
            <div className="flex items-center gap-3">
                <BookOpen className="text-amber-600" size={28} />

                <div>
                    <h1 className="text-lg font-bold text-gray-900">
                        BookJourney
                    </h1>

                    <p className="text-xs text-gray-500">
                        Remember what you read
                    </p>
                </div>
            </div>

            {/* User Placeholder */}
            <button
                className="flex items-center gap-2 rounded-lg border px-3 py-2 transition-colors hover:bg-gray-50"
                type="button"
            >
                <CircleUserRound size={22} />

                <span className="text-sm font-medium">
                    Guest
                </span>
            </button>
        </header>
    );
}

export default Navbar;