import { useLoaderData } from "react-router-dom";
import Product from "../Product";

export default function Shop() {
    const products = useLoaderData();
    console.log(products);
    return (
        <div className=" w-full flex flex-wrap justify-center max-sm:gap-1 sm:gap-2 lg:mt-2">
            {products.map((product, idx) => (
                <Product key={idx} product={product}/>
            ))}

        </div>
    );
}
