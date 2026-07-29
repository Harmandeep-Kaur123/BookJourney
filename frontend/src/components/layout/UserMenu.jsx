import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
    ChevronDown,
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
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-amber-100 font-semibold text-amber-700">
                    {user?.name?.charAt(0).toUpperCase()}
                </div>

                {/* <span className="text-sm font-medium text-gray-700">
                    {user?.name}
                </span> */}

                <ChevronDown
                    size={18}
                    className={`transition-transform ${
                        isOpen ? "rotate-180" : ""
                    }`}
                />
            </button>

            {isOpen && (
                <div className="absolute right-0 mt-2 w-64 overflow-hidden rounded-xl border bg-white shadow-lg">
                    <div className="flex items-center gap-3 border-b p-4">
                        <div className="flex h-11 w-11 items-center justify-center rounded-full bg-amber-100 text-lg font-bold text-amber-700">
                            {user?.name?.charAt(0).toUpperCase()}
                        </div>

                        <div className="min-w-0">
                            <p className="truncate font-semibold text-gray-900">
                                {user?.name}
                            </p>

                            <p className="truncate text-sm text-gray-500">
                                {user?.email}
                            </p>
                        </div>
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