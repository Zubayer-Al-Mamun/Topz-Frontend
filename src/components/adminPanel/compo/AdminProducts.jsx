import { Link, useLoaderData } from "react-router-dom";

export default function AdminProducts() {
    const products = useLoaderData();
    return (
        // <div>this is products page</div>
        <div className="overflow-y-scroll">
            <div className="m-2 border-b p-2 flex items-center">
                <Link to="/admin/newproduct" className="p-2 bg-[#51a2ff] rounded-md hover:bg-indigo-100 ">Add Product</Link>
                <div className="text-[14px]">
                    <button className="m-2">DropShoulder</button>
                    <button className="m-2">T-Shirt</button>
                    <button className="m-2">Shirt</button>
                    <button className="m-2">hoddie</button>
                </div>
            </div>
            {products.map((product, idx) => (
                <div
                    key={idx}
                    className=" rounded-l-lg overflow-hidden h-[100px] m-2 shadow-md flex justify-between hover:bg-indigo-100 "
                >
                    <div className="h-full flex">
                        <img
                            className="h-full w-[100px] object-cover "
                            src={product.vars[0].imageUrl[0]}
                            alt=""
                        />
                        <div className="m-2">
                            <p className="line-clamp-1 font-bold">{product.title}</p>
                            <p className="font-semibold text-[11px]">Total Sale : {product.totalSale}</p>
                            <p className="font-semibold text-[11px]">Total Sale : {product.totalView}</p>
                        </div>
                    </div>

                    <div className=" h-full flex items-center">
                        <Link
                            to={`/admin/products/${product.productId}`}
                            className="p-1 m-1 border rounded-lg bg-gray-300"
                        >
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
