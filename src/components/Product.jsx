// import starYellow from "../assets/starYellow.svg"
import { NavLink } from "react-router-dom";
import CartImg from "../assets/cart.svg"

export default function Product({product}) {
    return (
        <NavLink className="max-sm:w-[48%] sm:w-[200px] mb-2 bg-white rounded-xl shadow-lg overflow-hidden"
        to={`/products/${product.productId}`}>
                    {/* Main Image */}
                    <div className=" w-full flex justify-center">
                        <img
                            src={product.vars[0].imageUrl[0]}
                            alt="Nike Air Max 270"
                            className="w-full object-cover"
                        />
                    </div>

                    {/* Product Info */}
                    <div className="mt-1 p-1">
                        {/* <p className="text-sm text-gray-500 uppercase">
                            Women Shoes
                        </p> */}
                        <h3 className=" font-semibold text-gray-900">
                            {product.title}
                        </h3>
                        <p className="font-bold text-gray-900">
                            ৳{product.pricing}{" "}
                            <span className="text-sm text-red-500 line-through">
                                {product.discountsPrice}
                            </span>
                        </p>
                    </div>

                    {/* Buttons */}
                    <div className="flex justify-between items-center">
                        <button className=" py-2 px-3 mr-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="black"
                                viewBox="0 0 24 24"
                                width="24"
                                height="24"
                            >
                                <path d="M7 4h-2l-1 2h2l3.6 7.59-1.35 2.45c-.16.29-.25.63-.25.96 0 1.1.9 2 2 2h12v-2h-12l1.1-2h7.45c.75 0 1.41-.41 1.75-1.03l3.58-6.49c.08-.14.12-.3.12-.48 0-.55-.45-1-1-1h-14zm-1 16c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm12 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" />
                            </svg>
                        </button>
                        <button className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition">
                            Buy now
                        </button>
                    </div>
                </NavLink>
    );
}
