
import Cart from "./CartIcon";
import Logo from "./Logo";
import Menu from "./Menu";
import Bar from "../../category/Bar";
import NavItems from "./NavItems";
// import bg from "../../../assets/leather_black.png"

export default function Header({showCategory, setShowSideNavbar}) {
    // const scrollValue = false;

    

    return (
        <div className="w-full h-[100px] flex flex-col justify-center items-center sm:h-[60px] fixed z-10">

            <div className="h-[60px] w-full bg-[#d9c4b0]">
                <div className="z-10 shadow-lg text-white h-full flex justify-between items-center px-[10px] ">
                    <Menu setShowSideNavbar={setShowSideNavbar} />
                    <Logo />

                    <NavItems showCategory={showCategory}/>

                    {/* <div className=  { showCategory ? "max-sm:hidden h-full flex items-center" : "max-sm:hidden h-full hidden items-center"}>
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
                            to={"/shari"}
                        >
                            <b>Shop</b>
                        </NavLink>


                        <NavLink
                            className={({ isActive }) =>
                                isActive
                                    ? "h-full flex items-center px-2 border-b-3 border-[#f54952] transition duration-300 ease-in-out rounded-sm"
                                    : "px-2 "
                            }
                            to={"/premium_comb"}
                        >
                            <b>Contacts</b>
                        </NavLink>
                    </div> */}

                    <div className={showCategory ? "max-sm:hidden h-[45px] hidden justify-center items-center" : "max-sm:hidden h-[45px] flex justify-center items-center"} >
                    <Bar/>
                    </div>



                    <Cart />
                </div>
            </div>

            <div className=" w-[60%] sm:hidden h-[45px] flex justify-center">
                <Bar/>
            </div>
        </div>
    );
}

//  <div className="w-full bg-[#BBDCE5] shadow-lg h-[100px] flex justify-center fixed z-10">

//             <div className="z-10 text-white max-w-[1080px] w-[1080px] h-full flex justify-between items-center px-[10px] ">
//                 <Menu />
//                 <Logo />
//                 <div className="max-sm:hidden h-full flex items-center">
//                     <NavLink
//                         className={({ isActive }) =>
//                             isActive
//                                 ? "h-full flex items-center px-2 border-b-3 border-[#f54952] transition duration-300 ease-in-out rounded-sm"
//                                 : "px-2 "
//                         }
//                         to={"/"}
//                     >
//                         <b>হোম</b>
//                     </NavLink>

//                     <NavLink
//                         className={({ isActive }) =>
//                             isActive
//                                 ? "h-full flex items-center px-2 border-b-3 border-[#f54952] transition duration-300 ease-in-out rounded-sm"
//                                 : "px-2 "
//                         }
//                         to={"/shari"}
//                     >
//                         <b>শাড়িঘর</b>
//                     </NavLink>

//                     <NavLink
//                         className={({ isActive }) =>
//                             isActive
//                                 ? "h-full flex items-center px-2 border-b-3 border-[#f54952] transition duration-300 ease-in-out rounded-sm"
//                                 : "px-2 "
//                         }
//                         to={"/student_comb"}
//                     >
//                         <b>বেকার বাজেট কম্বো</b>
//                     </NavLink>

//                     <NavLink
//                         className={({ isActive }) =>
//                             isActive
//                                 ? "h-full flex items-center px-2 border-b-3 border-[#f54952] transition duration-300 ease-in-out rounded-sm"
//                                 : "px-2 "
//                         }
//                         to={"/premium_comb"}
//                     >
//                         <b>প্রিমিয়াম বাজেট কম্বো</b>
//                     </NavLink>
//                 </div>
//                 <Cart />
//             </div>
//         </div>
