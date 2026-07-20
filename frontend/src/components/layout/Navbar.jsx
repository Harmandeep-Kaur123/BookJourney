import { BookOpen, CircleUserRound, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";

import { ROUTES } from "../../constants/routes";
import { useAuth } from "../../context/AuthContext";

function Navbar() {
    const navigate = useNavigate();

    const { user, logout } = useAuth();

    function handleLogout() {
        logout();

        navigate(ROUTES.LOGIN, {
            replace: true,
        });
    }

    return (
        <header className="sticky top-0 z-50 flex h-16 items-center justify-between border-b bg-white px-6">
            {/* Brand */}
            <div className="flex items-center gap-3">
                <BookOpen
                    className="text-amber-600"
                    size={28}
                />

                <div>
                    <h1 className="text-lg font-bold text-gray-900">
                        BookJourney
                    </h1>

                    <p className="text-xs text-gray-500">
                        Remember what you read
                    </p>
                </div>
            </div>

            {/* User */}
            <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 rounded-lg border px-3 py-2">
                    <CircleUserRound
                        size={22}
                        className="text-gray-600"
                    />

                    <span className="text-sm font-medium text-gray-700">
                        {user?.name || "Guest"}
                    </span>
                </div>

                <button
                    type="button"
                    onClick={handleLogout}
                    className="flex items-center gap-2 rounded-lg border px-3 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-100"
                >
                    <LogOut size={18} />
                    Logout
                </button>
            </div>
        </header>
    );
}

export default Navbar;