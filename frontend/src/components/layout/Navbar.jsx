import { Search, Menu } from "lucide-react";
import { useEffect, useState } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";

import UserMenu from "./UserMenu";

function Navbar({
    onMenuClick,
}) {
    const navigate = useNavigate();
    const location = useLocation();

    const [search, setSearch] = useState("");

    useEffect(() => {
        const params = new URLSearchParams(location.search);

        setSearch(params.get("q") || "");
    }, [location.search]);

    const handleSubmit = (event) => {
        event.preventDefault();

        const query = search.trim();

        // Empty search
        if (!query) {
            if (
                location.pathname !== "/search" ||
                location.search !== ""
            ) {
                navigate("/search");
            }

            return;
        }

        const nextUrl = `/search?q=${encodeURIComponent(query)}`;

        if (
            location.pathname + location.search !== nextUrl
        ) {
            navigate(nextUrl);
        }
    };

    return (
        <header className="sticky top-0 z-20 border-b bg-white">
            <div className="flex h-16 items-center justify-between gap-4 px-4 sm:px-6">
                <div className="flex items-center gap-3">
                    <button
                        onClick={onMenuClick}
                        className="rounded-lg p-2 hover:bg-gray-100 lg:hidden"
                    >
                        <Menu size={22} />
                    </button>

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
                </div>

                
                    <form
                        onSubmit={handleSubmit}
                        className="hidden max-w-xl flex-1 md:block"
                    >
                        <div className="relative">
                            <Search
                                size={18}
                                className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-400"
                            />

                            <input
                                type="text"
                                value={search}
                                placeholder="Search books..."
                                onChange={(e) =>
                                    setSearch(e.target.value)
                                }
                                className="w-full rounded-xl border border-gray-300 py-2 pr-4 pl-10 focus:border-amber-500 focus:ring-2 focus:ring-amber-100 focus:outline-none"
                            />
                        </div>
                    </form>
                

                <UserMenu />
            </div>
        </header>
    );
}

export default Navbar;