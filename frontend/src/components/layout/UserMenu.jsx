import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
    ChevronDown,
    CircleUserRound,
    LogOut,
    User,
} from "lucide-react";

import { ROUTES } from "../../constants/routes";
import { useAuth } from "../../context/AuthContext";

function UserMenu() {
    const { user, logout } = useAuth();

    const [isOpen, setIsOpen] = useState(false);

    const menuRef = useRef(null);

    useEffect(() => {
        function handleClickOutside(event) {
            if (
                menuRef.current &&
                !menuRef.current.contains(event.target)
            ) {
                setIsOpen(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener(
                "mousedown",
                handleClickOutside
            );
        };
    }, []);

    const handleLogout = () => {
        logout();
        setIsOpen(false);
    };

    return (
        <div
            ref={menuRef}
            className="relative"
        >
            <button
                type="button"
                onClick={() => setIsOpen((prev) => !prev)}
                className="flex items-center gap-2 rounded-lg border px-3 py-2 transition-colors hover:bg-gray-100"
            >
                <CircleUserRound
                    size={22}
                    className="text-gray-600"
                />

                <span className="text-sm font-medium text-gray-700">
                    {user?.name}
                </span>

                <ChevronDown
                    size={18}
                    className={`transition-transform ${
                        isOpen ? "rotate-180" : ""
                    }`}
                />
            </button>

            {isOpen && (
                <div className="absolute right-0 mt-2 w-64 overflow-hidden rounded-xl border bg-white shadow-lg">
                    <div className="border-b p-4">
                        <p className="font-semibold text-gray-900">
                            {user?.name}
                        </p>

                        <p className="mt-1 text-sm text-gray-500 break-all">
                            {user?.email}
                        </p>
                    </div>

                    <div className="py-2">
                        <Link
                            to={ROUTES.PROFILE}
                            onClick={() => setIsOpen(false)}
                            className="flex items-center gap-3 px-4 py-3 text-sm text-gray-700 transition-colors hover:bg-gray-100"
                        >
                            <User size={18} />

                            Profile
                        </Link>
                    </div>

                    <div className="border-t py-2">
                        <button
                            type="button"
                            onClick={handleLogout}
                            className="flex w-full items-center gap-3 px-4 py-3 text-left text-sm text-red-600 transition-colors hover:bg-red-50"
                        >
                            <LogOut size={18} />

                            Logout
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default UserMenu;