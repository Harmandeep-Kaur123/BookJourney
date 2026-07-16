import {
    LayoutDashboard,
    Library,
    Search,
    NotebookPen,
    User,
} from "lucide-react";

import { ROUTES } from "./routes.js";

export const navigation = [
    {
        label: "Dashboard",
        path: ROUTES.DASHBOARD,
        icon: LayoutDashboard,
    },
    {
        label: "My Library",
        path: ROUTES.LIBRARY,
        icon: Library,
    },
    {
        label: "Search Books",
        path: ROUTES.SEARCH,
        icon: Search,
    },
    {
        label: "Notes",
        path: ROUTES.NOTES,
        icon: NotebookPen,
    },
    {
        label: "Profile",
        path: ROUTES.PROFILE,
        icon: User,
    },
];