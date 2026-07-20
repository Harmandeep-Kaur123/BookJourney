import { Routes, Route } from "react-router-dom";
import AppLayout from "../layouts/AppLayout.jsx";

import Dashboard from "../pages/dashboard/Dashboard";
import Login from "../pages/auth/Login.jsx";
import Register from "../pages/auth/Register.jsx";
import NotFound from "../pages/NotFound";

import { ROUTES } from "../constants/routes.js";

import ProtectedRoute from "./ProtectedRoute.jsx";
import PublicRoute from "./PublicRoute.jsx";

function AppRoutes() {
    return (
        <Routes>
            
            {/* Public Routes */}
            <Route element={<PublicRoute />}>
                <Route
                    path={ROUTES.LOGIN}
                    element={<Login />}
                />

                <Route
                    path={ROUTES.REGISTER}
                    element={<Register />}
                />
            </Route>

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