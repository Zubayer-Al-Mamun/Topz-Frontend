import cartIcon from "../../../assets/cart.svg";
import bg_sm from "../../../assets/navbar_bg_sm.png";

export default function BottomNavbar() {
    return (
        <div className="fixed bottom-0 sm:hidden w-full h-[60px] pb-2 flex justify-evenly">
            <img
                className="object-cover absolute -z-10 w-full h-[60px]"
                src={bg_sm}
                alt=""
            />

            <button> 🏠</button>
            <button>💗</button>
            <button className=" bg-[#f75605] w-[60px] pr-1 h-[60px] -mt-5 flex justify-center items-center rounded-full shadow-lg">
                <img className="h-[30px]" src={cartIcon} alt="" />
            </button>
            <button>🔔</button>
            <button>👤</button>
        </div>
    );
}
