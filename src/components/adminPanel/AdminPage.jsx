import { Outlet } from "react-router-dom";
import DashboardSidebar from "./DashboardSidebar";

export default function AdminPage() {
    return (
        <>
            <div className="flex h-screen bg-gray-100">
                {/* Sidebar */}

                <DashboardSidebar />

                {/* Main Content */}
                <div className="flex-1 flex flex-col">
                    <header className="h-16 bg-white flex items-center justify-between px-6 shadow-sm">
                        <input
                            type="text"
                            placeholder="Search..."
                            className="border rounded-lg px-3 py-1 w-72"
                        />
                        <div className="flex items-center gap-4">
                            <span className="w-8 h-8 bg-gray-200 rounded-full"></span>
                            <span className="font-medium">John Doe</span>
                        </div>
                    </header>


                    <Outlet/>

                    
                </div>
            </div>
            {/* <Outlet/> */}
        </>
    );
}
