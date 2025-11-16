import { createContext, useEffect, useState } from "react";


const CartContext = createContext(null);


export default function CartProvider({children}){
    const [cart , setCart] = useState([]);

    useEffect(()=>{
        const saveCart = localStorage.getItem("cart");
        if(saveCart){
            setCart(JSON.parse(saveCart));
        }
    },[])

    useEffect(()=>{
        localStorage.setItem("cart", JSON.stringify(cart));
    },[cart])


    const addToCart = (product) => {
        setCart((prev)=>{
            const exists = prev.find((p)=> p._id === product._id);

            if(exists){
                return prev.map((p) => 
                    p._id === product._id ? {...p, qty : p.qty + 1} : p
                )
            }
            
            return [...prev, {...product, qty : 1}]
        })
    }

    const removeFromCart = (id) => {
        setCart((prev)=> prev.filter((p)=> p._id !== id))
    };

    const clearCart = () => setCart([]);



    return (
        <CartContext.Provider value={{cart, addToCart, removeFromCart, clearCart}} >
            {children}
        </CartContext.Provider>
    );
}