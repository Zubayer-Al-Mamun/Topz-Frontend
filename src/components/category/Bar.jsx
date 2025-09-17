import { NavLink } from "react-router-dom";
import dropshoulder from "./assets/dropshoulder.png";
import Hoodie from "./assets/hoodie.png";
import Shirt from "./assets/shirt.png";

export default function Bar() {
    return (
        <div className=" max-sm:bg-[#D9C4B0] max-sm:shadow-lg w-full h-[45px] flex justify-evenly rounded-b-lg items-center gap-5">
            <NavLink
                className={({ isActive }) =>
                    isActive
                        ? " max-sm:hidden h-full flex items-center px-2 border-b-3 border-[#f54952] transition duration-300 ease-in-out rounded-sm"
                        : "px-2 max-sm:hidden"
                }
                to={"/"}
            >
                <b>Home</b>
            </NavLink>
            <NavLink>
                <img className="h-[40px]" src={dropshoulder} alt="" />{" "}
            </NavLink>
            <NavLink>
                <img className="h-[40px]" src={Shirt} alt="" />{" "}
            </NavLink>
            <NavLink>
                <img className="h-[40px]" src={Hoodie} alt="" />{" "}
            </NavLink>
            <NavLink>
                <img className="h-[40px]" src={Hoodie} alt="" />{" "}
            </NavLink>
        </div>
    );
}
