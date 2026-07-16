import { Routes, Route } from "react-router-dom";
import DashboardLayout from "../layouts/DashboardLayout";
import Dashboard from "../pages/dashboard/Dashboard";
import { ROUTES } from "../constants/routes.js";

function AppRoutes() {
    return (
        <Routes>
            <Route element={<DashboardLayout />}>
                <Route path={ROUTES.DASHBOARD} element={<Dashboard />} />
            </Route>
        </Routes>
    );
}

export default AppRoutes;