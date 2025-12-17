import bg_lg from "../../../assets/navbar_bg_lg.png";
import bg_sm from "../../../assets/navbar_bg_sm.png";
import Bar from "../../category/Bar";
import Cart from "./CartIcon";
import Logo from "./Logo";
import Menu from "./Menu";
import NavItems from "./NavItems";

export default function Header({ setShowSideNavbar }) {
    // const scrollValue = false;

    return (
        <div className="w-full flex flex-col justify-center items-center h-[60px] fixed z-10 text-white text-[18px]">
            <div className="h-[60px] w-full relative overflow-hidden">

                <img className="object-cover absolute -z-10 max-sm:hidden" src={bg_lg} alt="" />
                <img className="object-cover absolute -z-10 sm:hidden" src={bg_sm} alt="" />

                <div className="z-10 shadow-lg h-full flex justify-between items-center px-[10px]">
                    <Menu setShowSideNavbar={setShowSideNavbar} />
                    <Logo />

                    <NavItems />

                    <Cart />
                </div>
            </div>

            {/* 
            <div className=" w-[60%] sm:hidden h-[45px] flex justify-center">
                <Bar/>
            </div> */}
        </div>
    );
}
