import { useRef, useState } from "react";
import { Outlet, useNavigation } from "react-router-dom";
import Header from "./home/header/Header";
import SideNavbar from "./home/SideNavbar";
import Loading from "./Loading";
// import bg from "../assets/leather_black.png"

export default function Page() {
    const navigation = useNavigation();
    const [showSideNavbar, setShowSideNavbar] = useState(false);
    const [showCategory, setShowCategory] = useState(true);
    const scrollRef = useRef(0);

    return (
        <>
            <div
                className="bg-[#ECEEDF] w-[100%] relative flex flex-col items-center "
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
                
                <div className="h-[100vh] absolute flex justify-baseline w-full">
                    {navigation.state === "loading" && <Loading />}
                </div>


                <Header
                    setShowSideNavbar={setShowSideNavbar}
                    showCategory={showCategory}
                />
                {showSideNavbar && (
                    <SideNavbar setShowSideNavbar={setShowSideNavbar} />
                )}

                <div className="w-full mt-[60px] max-sm:mt-[110px] h-[100%] ">
                    {/* 
                    {navigation.state === "loading" && <Loading />} */}

                    <div className=" h-full w-full flex flex-col items-center relative">
                       <Outlet />
                    </div>
                </div>
            </div>
        </>
    );
}
