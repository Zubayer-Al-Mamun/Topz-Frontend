import { NavLink } from "react-router-dom";
import Logo from "../home/header/Logo";

export default function DashboardSidebar({setShowDashboardSidebar}) {
    function handleSidebar(){
        console.log("sidebar active..");
        setShowDashboardSidebar(false);
    }
    return (
        <div className=" bg-[#ECEEDF] h-full shadow-md flex flex-col">
            <div className="bg-[#d9c4b0] h-[60px] pl-2 gap-2 flex items-center justify-between border-b">
                <div className="w-[50px] h-full flex items-center overflow-hidden">
                    <Logo />
                </div>
                <div className="sm:hidden h-[30px] w-[30px]" 
                onClick={handleSidebar}>X</div>
            </div>
            <nav className="bg-[#d9c4b0] flex-1 p-4">
                <ul className="space-y-2 flex flex-col">
                    {[
                        "Products",
                        "NewProduct",
                        "CRM",
                        "eCommerce",
                        "Academy",
                        "Logistics",
                        "Analytics",
                        "Invoice",
                        "Projects",
                        "User",
                    ].map((item, idx) => (
                        <NavLink
                            to={`/admin/${item.toLowerCase()}`}
                            key={idx}
                            className={({ isActive }) =>
                                isActive
                                    ? "px-3 py-2 rounded-lg bg-blue-400 cursor-pointer"
                                    : "px-3 py-2 rounded-lg hover:bg-indigo-100 cursor-pointer"
                            }
                        >
                            {item}
                        </NavLink>
                    ))}
                </ul>
            </nav>
        </div>
    );
}
