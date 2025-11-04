import { NavLink } from "react-router-dom";
import cartIcon from "../../../assets/cart.svg"
export default function CartIcon(){

    function handleClick(){
        console.log("cart Clicked");
    }
    return (
        <NavLink onClick={handleClick} to="/cart" className="sm:ml-[40px] mr-1 h-full cursor-pointer">
            <div className="h-full px-[6px] flex items-center max-md:flex-row-reverse cursor-pointer"> 
                <p className="max-md:hidden mr-1 cursor-pointer"><b>&#2547; 8000</b></p>
                <img className="h-[45%] cursor-pointer" src={cartIcon} alt="" />
            </div>
        </NavLink>    
    );
}
