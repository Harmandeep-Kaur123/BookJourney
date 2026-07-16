import { ROUTES } from "../../constants/routes.js"

const navigation = [
    {
        label: "Dashboard",
        path: ROUTES.DASHBOARD,
    },
    {
        label: "My Library",
        path: ROUTES.LIBRARY,
    },
    {
        label: "Search Books",
        path: ROUTES.SEARCH,
    },
    {
        label: "Notes",
        path: ROUTES.NOTES,
    },
    {
        label: "Profile",
        path: ROUTES.PROFILE,
    },
];

function Sidebar() {
    return (
        <aside className="w-64 border-r bg-white p-6">
            Sidebar
        </aside>
    );
}

export default Sidebar;