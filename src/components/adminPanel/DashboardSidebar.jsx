import { NavLink } from "react-router-dom";

export default function DashboardSidebar({setShowDashboardSidebar}) {
    function handleSidebar(){
        console.log("sidebar active..");
        setShowDashboardSidebar(false);
    }
    return (
        <div className=" bg-[#ECEEDF] h-full shadow-md flex flex-col z-20"
            onClick={handleSidebar}>
            <nav className="bg-[#d9c4b0] flex-1 p-4 mt-[60px]">
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
