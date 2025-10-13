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
                        ? "h-full flex items-center px-2 border-b-3 border-[#f54952] transition duration-300 ease-in-out rounded-sm"
                        : "px-2 "
                }
                to={"/"}
            >
                <b>Home</b>
            </NavLink>

            <NavLink
                className={({ isActive }) =>
                    isActive
                        ? "h-full flex items-center px-2 border-b-3 border-[#f54952] transition duration-300 ease-in-out rounded-sm"
                        : "px-2 "
                }
                to={"/shop"}
            >
                <b>Shop</b>
            </NavLink>

            <NavLink
                className={({ isActive }) =>
                    isActive
                        ? "h-full flex items-center px-2 border-b-3 border-[#f54952] transition duration-300 ease-in-out rounded-sm"
                        : "px-2 "
                }
                to={"/contacts"}
            >
                <b>Contact Us</b>
            </NavLink>
        </div>
    );
}
