import { Outlet } from "react-router-dom";

import Navbar from "../components/layout/Navbar";
import Sidebar from "../components/layout/Sidebar";

function DashboardLayout() {
    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />
            <div className="flex">
                <Sidebar />
                <main className="flex-1 p-6">
                    <Outlet />
                </main>
            </div>
        </div>
    );
}

export default DashboardLayout;

// import { Outlet } from "react-router-dom";

// function DashboardLayout() {
//     return (
//         <>
//             <h1>Dashboard Layout</h1>
//             <Outlet />
//         </>
//     );
// }

// export default DashboardLayout;