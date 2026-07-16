import { ROUTES } from "../../constants/routes.js"
import { NavLink } from "react-router-dom";

import { navigation } from "../../constants/navigation";

function Sidebar() {
    return (
    <aside className="sticky top-16 h-[calc(100vh-4rem)] w-64 border-r bg-white p-4">
       
        <nav className="flex-1 space-y-2 p-4">
            {navigation.map((item) => {
            const Icon = item.icon; 
            return (
                <NavLink
                    key={item.path}
                    to={item.path}
                    end={item.path === ROUTES.DASHBOARD}
                    className={({ isActive }) =>
                        `flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition-colors ${
                            isActive
                                ? "bg-amber-100 text-amber-700"
                                : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                        }`
                    }
                >
                    <Icon size={20} />
                    <span>{item.label}</span>
                </NavLink>
            );
            })}
        </nav>

        <div className="border-t p-4">
            <p className="text-xs text-gray-400">
                BookJourney v1.0
            </p>
        </div>
    </aside>
    );
}

export default Sidebar;