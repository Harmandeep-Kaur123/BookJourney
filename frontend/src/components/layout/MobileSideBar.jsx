import { X } from "lucide-react";
import { NavLink, Link} from "react-router-dom";

import { navigation } from "../../constants/navigation";
import { ROUTES } from "../../constants/routes";

function MobileSidebar({
    open,
    onClose,
}) {
    return (
        <>
            {/* Backdrop */}
            {open && (
                <div
                    onClick={onClose}
                    className="fixed inset-0 z-40 bg-black/40 lg:hidden"
                />
            )}

            <aside
                className={`fixed top-0 left-0 z-50 flex h-screen w-72 flex-col bg-white shadow-xl transition-transform duration-300 lg:hidden ${
                    open
                        ? "translate-x-0"
                        : "-translate-x-full"
                }`}
            >
                <div className="flex items-center justify-between border-b p-5">
                    <Link
                        to="/"
                        className="shrink-0 rounded-lg transition-opacity hover:opacity-80"
                    >
                        <h1 className="text-lg font-bold text-amber-600 sm:text-xl">
                            BookJourney
                        </h1>

                        <p className="hidden text-xs text-gray-500 sm:block">
                            Remember what you read
                        </p>
                    </Link>

                    <button
                        onClick={onClose}
                        className="rounded-lg p-2 hover:bg-gray-100"
                    >
                        <X size={22} />
                    </button>
                </div>

                <nav className="flex-1 space-y-2 p-4">
                    {navigation.map((item) => {
                        const Icon = item.icon;

                        return (
                            <NavLink
                                key={item.path}
                                to={item.path}
                                end={
                                    item.path ===
                                    ROUTES.DASHBOARD
                                }
                                onClick={onClose}
                                className={({ isActive }) =>
                                    `flex items-center gap-3 rounded-xl px-4 py-3 font-medium transition ${
                                        isActive
                                            ? "bg-amber-100 text-amber-700"
                                            : "hover:bg-gray-100"
                                    }`
                                }
                            >
                                <Icon size={20} />

                                {item.label}
                            </NavLink>
                        );
                    })}
                </nav>
            </aside>
        </>
    );
}

export default MobileSidebar;