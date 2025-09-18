import { NavLink } from "react-router-dom";
import Logo from "../home/header/Logo";


export default function DashboardSidebar() {
    return (
        <aside className="max-sm:hidden w-45 bg-[#ECEEDF] shadow-md flex flex-col">
            <div className="bg-[#d9c4b0] h-[60px] pl-2 flex items-center border-b">
                {/* <div className="h-[32px]">
                    <img className="h-full" src={shariGiftLogo} alt="" />
                </div> */}
                <Logo/>
            </div>
            <nav className="bg-[#d9c4b0] flex-1 p-4">
                <ul className="space-y-2 flex flex-col">
                    {[
                        "Products",
                        "ProductAdd",
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
        </aside>
    );
}
