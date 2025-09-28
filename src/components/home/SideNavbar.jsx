import { NavLink } from "react-router-dom";
import Logo from "./header/Logo";

export default function SideNavbar({ setShowSideNavbar }) {
    return (
        <div
            className="sm:hidden h-[100vh] w-[220px] bg-[#BBDCE5] fixed left-0 z-11 flex flex-col"
            onClick={() => {
                setShowSideNavbar(false);
            }}
        >
            <div className="flex items-center justify-between px-1 bg-[#d9c4b0] h-[60px]">
                <Logo />
                <button className="text-2xl px-3 py-1">X</button>
            </div>
            <div className="h-full bg-[#ECEEDF] flex flex-col">
                <NavLink
                    className={({ isActive }) =>
                        isActive ? "bg-gray-400 p-2" : "p-2"
                    }
                    to={"/"}
                >
                    <b>Home</b>
                </NavLink>

                <NavLink
                    className={({ isActive }) =>
                        isActive ? "bg-gray-400 p-2" : "p-2"
                    }
                    to={"/shop"}
                >
                    <b>Shop</b>
                </NavLink>

                <NavLink
                    className={({ isActive }) =>
                        isActive ? "bg-gray-400 p-2" : "p-2"
                    }
                    to={"/contacts"}
                >
                    <b>Contacts Us</b>
                </NavLink>
            </div>
        </div>
    );
}
