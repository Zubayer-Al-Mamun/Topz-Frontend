import { useState } from "react";
import { Outlet, useNavigation } from "react-router-dom";
import MenuIcon from "../../assets/menu.svg";
import Loading from "../Loading";
import DashboardSidebar from "./DashboardSidebar";

export default function Dashboard() {
    const navigation = useNavigation();
    const [showDashboardSidebar, setShowDashboardSidebar] = useState(false);

    return (
        <div className="flex h-screen bg-[#ECEEDF] overflow-hidden">
            {/* Sidebar */}
            {showDashboardSidebar ? (
                <div className="sm:hidden">
                    <DashboardSidebar
                        setShowDashboardSidebar={setShowDashboardSidebar}
                    />
                </div>
            ) : null}

            <div className="max-sm:hidden">
                <DashboardSidebar
                    setShowDashboardSidebar={setShowDashboardSidebar}
                />
            </div>

            {/* Main Content */}
            <div className="flex-1 flex flex-col relative overflow-y-auto overflow-x-hidden">
                <header className="bg-[#d9c4b0] h-[60px] flex items-center justify-between px-4 sm:px-6 shadow-sm">
                    {showDashboardSidebar ? null : (
                        <div
                            onClick={() => setShowDashboardSidebar(true)}
                            className="sm:hidden flex items-center p-2"
                        >
                            <img src={MenuIcon} className="h-[30px]" alt="" />
                        </div>
                    )}

                    <input
                        type="text"
                        placeholder="Search..."
                        className="border rounded-lg px-3 py-1 w-48 sm:w-72 mx-2"
                    />
                    <div className="flex items-center gap-4">
                        <span className="w-8 h-8 bg-gray-200 rounded-full"></span>
                        <span className="font-medium">John Doe</span>
                    </div>
                </header>

                {navigation.state === "loading" && <Loading />}

                {/* Content Area */}
                <div className="p-4 max-sm:p-2 w-full">
                    <Outlet />
                </div>
            </div>
        </div>
    );
}


















// import { useState } from "react";
// import { Outlet, useNavigation } from "react-router-dom";
// import MenuIcon from "../../assets/menu.svg";
// import Loading from "../Loading";
// import DashboardSidebar from "./DashboardSidebar";

// export default function Dashboard() {
//     const navigation = useNavigation();
//     const [showDashboardSidebar, setShowDashboardSidebar] = useState(false);

//     // const [showDashboardSidebar, setShowDashboardSidebar] = useState(false);
//     return (
//         <>
//             <div className="flex h-screen bg-[#ECEEDF] overflow-hidden">
//                 {/* Sidebar */}

//                 {showDashboardSidebar ? (
//                     <div className="sm:hidden">
//                         <DashboardSidebar
//                             setShowDashboardSidebar={setShowDashboardSidebar}
//                         />
//                     </div>
//                 ) : (
//                     ""
//                 )}

//                 <div className="max-sm:hidden">
//                     <DashboardSidebar
//                         setShowDashboardSidebar={setShowDashboardSidebar}
//                     />
//                 </div>

//                 {/* Main Content */}
//                 <div className="flex-1 flex flex-col relative">
//                     <header className="bg-[#d9c4b0] h-[60px] flex items-center justify-between px-6 shadow-sm">
//                         {showDashboardSidebar ? (
//                             ""
//                         ) : (
//                             <div
//                                 onClick={() => setShowDashboardSidebar(true)}
//                                 className="sm:hidden flex items-center p-3"
//                             >
//                                 <img
//                                     src={MenuIcon}
//                                     className="h-[30px]"
//                                     alt=""
//                                 />
//                             </div>
//                         )}

//                         <input
//                             type="text"
//                             placeholder="Search..."
//                             className="border rounded-lg px-3 py-1 w-72 m-4"
//                         />
//                         <div className="flex items-center gap-4">
//                             <span className="w-8 h-8 bg-gray-200 rounded-full"></span>
//                             <span className="font-medium">John Doe</span>
//                         </div>
//                     </header>

//                     {navigation.state === "loading" && <Loading />}
//                     <Outlet />
//                 </div>
//             </div>
//             {/* <Outlet/> */}
//         </>
//     );
// }
