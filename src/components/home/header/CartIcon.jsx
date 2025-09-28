import { NavLink } from "react-router-dom";
import cartIcon from "../../../assets/cart.svg"
export default function CartIcon(){

    function handleClick(){
        console.log("cart Clicked");
    }
    return (
        <NavLink onClick={handleClick} to="/cart" className="sm:ml-[40px] h-full cursor-pointer">
            <div className="h-full px-[6px] flex items-center max-md:flex-row-reverse cursor-pointer"> 
                <p className="max-md:hidden mr-2 cursor-pointer"><b>8000 &#2547;</b></p>
                <img className="h-[50%] cursor-pointer" src={cartIcon} alt="" />
            </div>
        </NavLink>    
    );
}
