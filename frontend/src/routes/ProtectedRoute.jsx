import { Navigate, Outlet } from "react-router-dom";
import LoadingSpinner from "../components/common/LoadingSpinner";
import { ROUTES } from "../constants/routes";
import { useAuth } from "../context/AuthContext";

function ProtectedRoute() {
    const { loading, isAuthenticated } = useAuth();

    if (loading) {
        return (
            <LoadingSpinner message="Loading your account..." />
        );
    }

    if (!isAuthenticated) {
        return <Navigate to={ROUTES.LOGIN} replace />;
    }
    
    return <Outlet />;
}

export default ProtectedRoute;