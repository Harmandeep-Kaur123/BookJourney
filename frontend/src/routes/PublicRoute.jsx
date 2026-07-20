import { Navigate, Outlet } from "react-router-dom";

import LoadingSpinner from "../components/common/LoadingSpinner";
import { ROUTES } from "../constants/routes";
import { useAuth } from "../context/AuthContext";

function PublicRoute() {
    const { loading, isAuthenticated } = useAuth();

    if (loading) {
        return (
            <LoadingSpinner
                fullScreen
                message="Loading..."
            />
        );
    }

    if (isAuthenticated) {
        return (
            <Navigate
                to={ROUTES.DASHBOARD}
                replace
            />
        );
    }

    return <Outlet />;
}

export default PublicRoute;