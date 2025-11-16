import { useRef, useState } from "react";
import { Outlet } from "react-router-dom";
import CartProvider from "../context/cartContext";
import Header from "./home/header/Header";
import SideNavbar from "./home/SideNavbar";

export default function Page() {
    const [showSideNavbar, setShowSideNavbar] = useState(false);
    const [showCategory, setShowCategory] = useState(true);
    const scrollRef = useRef(0);

    //     useEffect(() => {
    //     // Page load এর পর একটু scroll করানো হয়
    //     const timer = setTimeout(() => {
    //       window.scrollTo(0, 200); // Chrome header hide করে
    //     }, 300);

    //     return () => clearTimeout(timer);
    //   }, []);

    return (
        <>
            <CartProvider>
                <div
                    className="bg-[#09090915] w-[100%] relative flex flex-col items-center "
                    onWheel={(e) => {
                        if (scrollRef.current < e.pageY) {
                            scrollRef.current = e.pageY;
                            setShowCategory(false);
                        } else if (scrollRef.current > e.pageY) {
                            scrollRef.current = e.pageY;
                            setShowCategory(true);
                        }
                    }}
                >
                    {/* {blur && (
                    <div className="fixed h-full w-full backdrop-blur-sm top-0 bottom-0 left-0 right-0 z-20"></div>
                )} */}

                    <Header
                        setShowSideNavbar={setShowSideNavbar}
                        showCategory={showCategory}
                    />
                    {showSideNavbar && (
                        <SideNavbar setShowSideNavbar={setShowSideNavbar} />
                    )}

                    <div className="w-full mt-[60px] h-[100%] ">
                        {/* 
                    {navigation.state === "loading" && <Loading />} */}

                        <div className=" h-full w-full flex flex-col items-center relative bg-[#F8F8F0]">
                            <Outlet />
                        </div>
                    </div>
                </div>
            </CartProvider>
        </>
    );
}
