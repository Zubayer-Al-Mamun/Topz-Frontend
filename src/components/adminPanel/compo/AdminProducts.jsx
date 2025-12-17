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
                            className="h-[100px] w-[100px] object-cover shrink-0 "
                            src={product.images[0]}
                            alt=""
                        />
                        <div className="m-2">
                            <p className="line-clamp-1 font-bold">{product.title}</p>
                            <p className="font-semibold text-[11px]">Sale : {product.totalSale}</p>
                            <p className="font-semibold text-[11px]">View : {product.totalView}</p>
                        </div>
                    </div>

                    <div className=" h-full flex items-center text-[11px]">
                        <Link
                            to={`/admin/products/seecolor/${product._id}`}
                            className="p-1 py-2 m-1 border rounded-lg bg-gray-300"
                        >
                            {" "}
                            See Color
                        </Link>
                        <Link
                            to={`/admin/products/addcolor/${product._id}`}
                            className="p-1 py-2 m-1 border rounded-lg bg-gray-300"
                        >
                            {" "}
                            Add Color
                        </Link>
                        <Link
                            to={`/admin/products/${product._id}`}
                            className="p-1 py-2 m-1 border rounded-lg bg-gray-300">
                            Edit
                        </Link>
                    </div>
                </div>
            ))}
        </div>
    );
}
