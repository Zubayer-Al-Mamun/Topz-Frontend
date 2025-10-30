import { NavLink } from "react-router-dom";
import Logo from "./header/Logo";
import bg_sm from "../../assets/navbar_bg_sm.png";

export default function SideNavbar({ setShowSideNavbar }) {
    return (
        <div
            className="sm:hidden h-[100vh] w-[220px] bg-[#BBDCE5] fixed left-0 z-11 flex flex-col"
            onClick={() => {
                setShowSideNavbar(false);
            }}
        >
            <div className="flex items-center justify-between px-1 h-[60px] relative">
                <img className="object-cover absolute -z-10 sm:hidden" src={bg_sm} alt="" />
                <Logo />
                <p className="text-2xl font-bold text-white px-3 py-1">X</p>
            </div>
            <div className="h-full bg-[#F8F8F0] flex flex-col">
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
