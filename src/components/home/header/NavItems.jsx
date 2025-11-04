import { NavLink } from "react-router-dom";

export default function NavItems({ showCategory }) {
    return (
        <div
            className={
                showCategory
                    ? "max-sm:hidden h-full flex items-center"
                    : "max-sm:hidden h-full hidden items-center"
            }
        >
            <NavLink
                className={({ isActive }) =>
                    isActive
                        ? "h-full flex items-center px-3 border-b-4 border-[#dca848] transition duration-300 ease-in-out rounded-sm"
                        : "px-3 h-full flex items-center"
                }
                to={"/"}
            >
                <b>Home</b>
            </NavLink>

            <NavLink
                className={({ isActive }) =>
                    isActive
                        ? "h-full flex items-center px-3 border-b-4 border-[#c59438] transition duration-300 ease-in-out rounded-sm"
                        : "px-3 h-full flex items-center"
                }
                to={"/shop"}
            >
                <b>Shop</b>
            </NavLink>

            <NavLink
                className={({ isActive }) =>
                    isActive
                        ? "h-full flex items-center px-3 border-b-4 border-[#c59438] transition duration-300 ease-in-out rounded-sm"
                        : "px-3 h-full flex items-center"
                }
                to={"/contacts"}
            >
                <b>Contact Us</b>
            </NavLink>
        </div>
    );
}
