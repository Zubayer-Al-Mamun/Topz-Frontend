import { useState } from "react";
import { useLoaderData } from "react-router-dom";
import Product from "../Product";

export default function Shop() {
    const products = useLoaderData();
    console.log(products);
    const [cat, setCat] = useState("all");
    const categories = ["All", "Sharee", "Shirt", "T-Shirt", "Hoodie"];

    return (
        <>
            <div className="flex m-[10px] px-2 gap-[10px] overflow-y-hidden categorie">
                {categories.map((cate) => (
                    <button
                        onClick={() => setCat(cate.toLowerCase())}
                        key={cate}
                        className={
                            cate.toLowerCase() === cat
                                ? "flex-shrink-0 px-4 py-2 rounded-xl shadow text-sm md:text-base font-medium hover:bg-blue-100 bg-blue-400"
                                : "flex-shrink-0 bg-white px-4 py-2 rounded-xl shadow text-sm md:text-base font-medium hover:bg-blue-100"
                        }
                    >
                        {cate}
                    </button>
                ))}
            </div>

            <div className="product-cont w-[100%] pb-[60px] flex flex-wrap justify-center max-sm:gap-1 sm:gap-2 mt-2">
                {/* <div>
                                <p className="bangla-text" > আসসালামু আলাইকুম </p>
                            </div> */}
                {cat === "all" &&
                    products.map((product, idx) => (
                        <Product key={idx} product={product} idx={idx} />
                    ))}

                {cat != "all" &&
                    products
                        .filter((item) => item.category === cat.toLowerCase())
                        .map((product, idx) => (
                            <Product key={idx} product={product} idx={idx} />
                        ))}
            </div>
        </>
    );
}
