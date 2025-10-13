// import { useState } from "react";
import { useLoaderData } from "react-router-dom";

export default function SingleProduct({propsValue}) {
    const loaderData = useLoaderData();

    const product =
        propsValue !== undefined && propsValue !== null
            ? propsValue
            : loaderData;

    // const product = useLoaderData();
    // const [selectedImage, setSelectedImage] = useState(0);

    return (
        <div className="max-w-7xl mx-auto p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Left - Images */}
                <div>
                    <div className="rounded-xl overflow-hidden shadow-lg">
                        <img
                            src={product.vars[0].imageUrl[0] || "https://aitken-sci.com/wp-content/uploads/2024/04/business.jpg"}
                            alt="Product"
                            className="w-full h-[400px] object-cover"
                        />
                    </div>
                    <div className="flex space-x-3 mt-4">
                        {/* {images.map((img, index) => (
                            <img
                                key={index}
                                src={img}
                                alt={`Thumbnail ${index}`}
                                onClick={() => setSelectedImage(index)}
                                className={`w-20 h-20 rounded-lg cursor-pointer border ${
                                    selectedImage === index
                                        ? "border-pink-500"
                                        : "border-gray-200"
                                }`}
                            />
                        ))} */}
                    </div>
                </div>

                {/* Right - Details */}
                <div>
                    <h2 className="text-3xl font-bold">{product.title}</h2>
                    {/* <p className="text-gray-500">New Arrival</p> */}

                    {/* Rating */}
                    <div className="flex items-center sm:mt-3 space-x-2">
                        <div className="flex text-yellow-400 text-lg">
                            <span>★</span>
                            <span>★</span>
                            <span>★</span>
                            <span>★</span>
                            <span className="text-gray-300">☆</span>
                        </div>
                        <span className="text-sm text-gray-600">
                            {/* {product.reviews.length} Reviews */}
                        </span>
                    </div>

                    {/* Size */}
                    <div className="mt-4">
                        <p className="font-medium">Size</p>
                        <div className="flex space-x-3 mt-2">
                            {/* {["M", "L", "XL"].map((size) => (
                                <button
                                    key={size}
                                    className="px-4 py-2 border rounded-lg hover:bg-gray-100"
                                >
                                    {size}
                                </button>
                            ))} */}
                        </div>
                    </div>

                    {/* Colors */}
                    <div className="mt-4">
                        <p className="font-medium">Colour</p>
                        <div className="flex space-x-3 mt-2">
                            <span className="w-6 h-6 rounded-full bg-pink-400 border cursor-pointer"></span>
                            <span className="w-6 h-6 rounded-full bg-purple-400 border cursor-pointer"></span>
                            <span className="w-6 h-6 rounded-full bg-gray-400 border cursor-pointer"></span>
                        </div>
                    </div>

                    {/* Price */}
                    <div className="mt-6 flex items-center justify-between">
                        <button className="bg-pink-500 text-white px-6 py-3 rounded-xl shadow-lg hover:bg-pink-600">
                            Buy Now
                        </button>
                        <p className="text-xl font-semibold">$65.00</p>
                    </div>

                    {/* Description */}
                    <div className="mt-6">
                        <h3 className="font-semibold">About Product</h3>
                        <p className="text-gray-600 text-sm mt-2">
                            {/* {product.description} */}
                        </p>
                    </div>
                </div>
            </div>

            {/* Tabs Section */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
                {/* Reviews */}
                <div>
                    <h3 className="font-bold text-lg">All reviews</h3>

                    {/* {product.reviews.map((review,idx) => (
                        <div key={idx} className="mt-3 border p-4 rounded-lg shadow-sm">
                            <p className="font-semibold">Zeynel ★★★★★</p>
                            <p className="text-gray-600 text-sm mt-1">
                                {review}
                            </p>
                        </div>
                    ))} */}
                </div>

                {/* Images */}
                <div>
                    <h3 className="font-bold text-lg">Image</h3>
                    <div className="mt-3 flex space-x-2">
                        <img
                            src="https://aitken-sci.com/wp-content/uploads/2024/04/business.jpg"
                            className="w-20 h-20 rounded-lg object-cover"
                            alt="User1"
                        />
                        <img
                            src="https://aitken-sci.com/wp-content/uploads/2024/04/business.jpg"
                            className="w-20 h-20 rounded-lg object-cover"
                            alt="User2"
                        />
                    </div>
                </div>

                {/* Additional Details */}
                <div>
                    <h3 className="font-bold text-lg">Additional Details</h3>
                    <ul className="mt-3 text-sm text-gray-600 space-y-2">
                        <li>Description</li>
                        <li>Size & Fit</li>
                        <li>About Store</li>
                        <li>Matching Style</li>
                    </ul>
                </div>
            </div>
        </div>
    );
}
