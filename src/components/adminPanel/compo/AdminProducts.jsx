import { Link, useLoaderData } from "react-router-dom";

export default function AdminProducts() {
    const products = useLoaderData();
    return (
        <div className="overflow-scroll">
            {products.map((product, idx) => (
                <div key={idx} className="h-[100px] my-1 shadow-md flex justify-between">
                    <div className="h-full flex">
                        <img
                            className="h-full w-[100px] object-cover"
                            src={product.imageUrl[1]}
                            alt=""
                        />
                        <div className="m-2">
                            <p>{product.title}</p>
                            <p>Total Sale : {product.totalSale}</p>
                        </div>
                    </div>
                    <div className=" h-full flex items-center">
                        <Link to={`/admin/products/${product.productId}`} className="p-1 m-1 border rounded-lg bg-gray-300">
                            {" "}
                            Edit Product
                        </Link>
                        <Link className="p-1 m-1 border rounded-lg bg-gray-300">
                            Delete Product
                        </Link>
                    </div>
                </div>
            ))}
        </div>
    );
}
