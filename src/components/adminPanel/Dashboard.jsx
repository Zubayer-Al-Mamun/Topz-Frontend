import { Outlet, useNavigation } from "react-router-dom";
import DashboardSidebar from "./DashboardSidebar";
import Loading from "../Loading";

export default function Dashboard() {
    const navigation = useNavigation();

    // const [showDashboardSidebar, setShowDashboardSidebar] = useState(false);
    return (
        <>
            <div className="flex h-screen bg-[#ECEEDF] overflow-hidden">
                {/* Sidebar */}

                <DashboardSidebar />

                {/* Main Content */}
                <div className="flex-1 flex flex-col relative">
                    <header className="bg-[#d9c4b0] h-[60px] flex items-center justify-between px-6 shadow-sm">
                        {/* <div onClick={()=> setShowDashboardSidebar(true)} className="sm:hidden flex items-center p-3">
                            <img src={MenuIcon} className="h-[30px]" alt="" />
                        </div> */}

                        <input
                            type="text"
                            placeholder="Search..."
                            className="border rounded-lg px-3 py-1 w-72 m-4"
                        />
                        <div className="flex items-center gap-4">
                            <span className="w-8 h-8 bg-gray-200 rounded-full"></span>
                            <span className="font-medium">John Doe</span>
                        </div>
                    </header>

                    {navigation.state === "loading" && (
                        <Loading/>
                    )}
                    <Outlet />
                </div>
            </div>
            {/* <Outlet/> */}
        </>
    );
}
