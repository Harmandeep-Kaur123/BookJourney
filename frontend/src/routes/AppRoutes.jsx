import { Routes, Route } from "react-router-dom";
import AppLayout from "../layouts/AppLayout.jsx";
import Dashboard from "../pages/dashboard/Dashboard";
import Login from "../pages/auth/Login.jsx";
import Register from "../pages/auth/Register.jsx";
import { ROUTES } from "../constants/routes.js";
import NotFound from "../pages/NotFound";
import ProtectedRoute from "./ProtectedRoute.jsx";

function AppRoutes() {
    return (
        <Routes>
            
            {/* Public Routes */}
            <Route
                path={ROUTES.LOGIN}
                element={<Login />}
            />

            <Route
                path={ROUTES.REGISTER}
                element={<Register />}
            />

            {/* Protected Routes */}
            <Route element={<ProtectedRoute />}>
                <Route element={<AppLayout />}>
                    <Route
                        path={ROUTES.DASHBOARD}
                        element={<Dashboard />}
                    />

                    {/* <Route
                        path={ROUTES.LIBRARY}
                        element={<Library />}
                    />

                    <Route
                        path={ROUTES.SEARCH}
                        element={<Search />}
                    />

                    <Route
                        path={ROUTES.NOTES}
                        element={<Notes />}
                    />

                    <Route
                        path={ROUTES.PROFILE}
                        element={<Profile />}
                    /> */}
                </Route>
            </Route>

            <Route 
                path="*" 
                element={<NotFound />}
            />

        </Routes>
    );
}

export default AppRoutes;