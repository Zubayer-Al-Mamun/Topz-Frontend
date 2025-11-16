import { NavLink } from "react-router-dom";
import crossIcon from "../../assets/cross_black.svg";
import bg_sm from "../../assets/navbar_bg_sm.png";
import Logo from "./header/Logo";

export default function SideNavbar({ setShowSideNavbar }) {

    return (
        <div className=" sm:hidden fixed h-full w-full backdrop-blur-sm top-0 bottom-0 left-0 right-0 z-20">
            <div
                className="h-[100vh] w-[220px] bg-[#BBDCE5] fixed left-0 z-20 flex flex-col"
                onClick={() => {
                    setShowSideNavbar(false);
                }}
            >
                <div className="flex items-center justify-between h-[60px] relative">
                    <img
                        className="object-cover absolute -z-10 sm:hidden"
                        src={bg_sm}
                        alt=""
                    />
                    <Logo />
                    <img src={crossIcon} className="h-[30px]" alt="" />
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
        </div>
    );
}
