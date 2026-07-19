import { Link } from "react-router-dom";
import { CircleAlert } from "lucide-react";

import { ROUTES } from "../constants/routes";

function NotFound() {
    return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 px-6 text-center">
            <CircleAlert
                size={56}
                className="mb-6 text-amber-600"
            />

            <h1 className="text-6xl font-bold text-gray-900">
                404
            </h1>

            <h2 className="mt-4 text-2xl font-semibold text-gray-800">
                Page Not Found
            </h2>

            <p className="mt-3 max-w-md text-gray-500">
                The page you're looking for doesn't exist or may have been moved.
            </p>

            <Link
                to={ROUTES.DASHBOARD}
                className="mt-8 rounded-lg bg-amber-600 px-6 py-3 font-medium text-white transition-colors hover:bg-amber-700"
            >
                Back to Dashboard
            </Link>
        </div>
    );
}

export default NotFound;    