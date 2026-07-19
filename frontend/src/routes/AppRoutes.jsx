import { Routes, Route } from "react-router-dom";
import AppLayout from "../layouts/AppLayout.jsx";
import Dashboard from "../pages/dashboard/Dashboard";
import { ROUTES } from "../constants/routes.js";
import NotFound from "../pages/NotFound";

function AppRoutes() {
    return (
        <Routes>
            <Route element={<AppLayout />}>
                <Route path={ROUTES.DASHBOARD} element={<Dashboard />} />
            </Route>
            <Route path="*" element={<NotFound />}/>
        </Routes>
    );
}

export default AppRoutes;