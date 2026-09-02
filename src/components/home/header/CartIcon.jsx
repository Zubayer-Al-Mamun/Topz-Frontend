import { NavLink } from "react-router-dom";
import cartIcon from "../../../assets/cart.svg"
import { useContext } from "react";
import { CartContext } from "../../../context/CartContext";
export default function CartIcon(){

    const {cartItems} = useContext(CartContext) || [];

    const totalPrice = cartItems.reduce((total, item) => {
        const price = Number(item.pricing) || 0;
        const qty = Number(item.qty) || 1; // যদি qty না থাকে, তবে ডিফল্ট ১ ধরবে
        
        return total + (price * qty);
    }, 0);

    function handleClick(){
        console.log("cart Clicked");
    }
    return (
        <NavLink onClick={handleClick} to="/cart" className=" sm:ml-[40px] mr-1 h-full ">
            <div className="h-full px-[6px] flex items-center max-md:flex-row-reverse"> 
                <p className="max-md:hidden mr-1"><b>&#2547; {totalPrice}</b></p>
                <img className="h-[45%]" src={cartIcon} alt="" />
            </div>
        </NavLink>    
    );
}



