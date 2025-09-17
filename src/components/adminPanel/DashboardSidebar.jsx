import { NavLink } from "react-router-dom";
import shariGiftLogo from "../../assets/ShariGiftLogo.png";


export default function DashboardSidebar() {
    return (
        <aside className="w-64 bg-white shadow-md flex flex-col">
            <div className="p-4 flex items-center gap-2 border-b">
                <div className="h-[32px]">
                    <img className="h-full" src={shariGiftLogo} alt="" />
                </div>
            </div>
            <nav className="flex-1 p-4">
                <ul className="space-y-2 flex flex-col">
                    <NavLink
                        to={`/admin`}
                        className={({ isActive }) =>
                            isActive
                                ? "px-3 py-2 rounded-lg bg-blue-400 hover:bg-indigo-100 cursor-pointer"
                                : "px-3 py-2 rounded-lg hover:bg-indigo-100 cursor-pointer"
                        }
                    >
                        {" "}
                        Dashboard
                    </NavLink>
                    {[
                        "Products",
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
                                    ? "px-3 py-2 rounded-lg bg-blue-400 hover:bg-indigo-100 cursor-pointer"
                                    : "px-3 py-2 rounded-lg hover:bg-indigo-100 cursor-pointer"
                            }
                        >
                            {item}
                        </NavLink>
                    ))}
                </ul>
            </nav>
        </aside>
    );
}
