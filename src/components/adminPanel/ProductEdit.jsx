import { useState } from "react";
import { useLoaderData } from "react-router-dom";

export default function ProductEdit() {
    const product = useLoaderData();
    console.log(product.vars);
    // const [moreColor, setMoreColor] = useState(false);
    // const product = {
    //     color: {
    //         code: "#6f4e37",
    //         name: "Coffee Brown",
    //     },
    //     imageUrl: "https://example.com/product-coffee-brown.jpg",
    //     sizes: [
    //         {
    //             size: "M",
    //             stock: 30,
    //         },
    //         {
    //             size: "L",
    //             stock: 30,
    //         },
    //         {
    //             size: "XL",
    //             stock: 30,
    //         },
    //     ],
    // };

    return (
        <div className="min-h-screen w-full bg-gray-100 p-4 sm:p-6 overflow-y-scroll">
            <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow p-6 flex flex-col lg:flex-row gap-6">
                {/* Left Section */}
                <div className="flex-1 space-y-6">
                    {/* General Information */}
                    <div className="p-5 border rounded-xl">
                        <h2 className="text-lg font-semibold mb-4">
                            General Information
                        </h2>
                        <div className="space-y-4">
                            {/* Title */}
                            <div>
                                <label className="block text-sm font-medium">
                                    Product Title
                                </label>
                                <input
                                    type="text"
                                    value={product.title}
                                    className="w-full mt-1 p-2 border rounded-lg"
                                />
                            </div>
                            {/* Description */}
                            <div>
                                <label className="block text-sm font-medium">
                                    Description
                                </label>
                                <textarea
                                    rows="4"
                                    value={product.description}
                                    className="w-full mt-1 p-2 border rounded-lg"
                                />
                            </div>
                            {/* Category / Subcategory */}
                            <div className="flex flex-col sm:flex-row gap-4">
                                <div className="flex-1">
                                    <label className="block text-sm font-medium">
                                        Category
                                    </label>
                                    <input
                                        type="text"
                                        value={product.category}
                                        className="w-full mt-1 p-2 border rounded-lg"
                                    />
                                </div>
                                <div className="flex-1">
                                    <label className="block text-sm font-medium">
                                        Subcategory
                                    </label>
                                    <input
                                        type="text"
                                        value={product.subcategory}
                                        className="w-full mt-1 p-2 border rounded-lg"
                                    />
                                </div>
                            </div>
                            {/* For (Gender) */}
                            <div>
                                <label className="block text-sm font-medium">
                                    For
                                </label>
                                <select
                                    className="w-full mt-1 p-2 border rounded-lg"
                                    defaultValue="male"
                                >
                                    <option value="male">Male</option>
                                    <option value="female">Female</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    {/* Pricing & Stock */}
                    <div className="p-5 border rounded-xl">
                        <h2 className="text-lg font-semibold mb-4">
                            Pricing & Stock
                        </h2>
                        <div className="flex flex-col sm:flex-row gap-4">
                            <div className="flex-1">
                                <label className="block text-sm font-medium">
                                    Base Price
                                </label>
                                <input
                                    type="number"
                                    value={product.pricing}
                                    className="w-full mt-1 p-2 border rounded-lg"
                                />
                            </div>
                            <div className="flex-1">
                                <label className="block text-sm font-medium">
                                    Discount Price
                                </label>
                                <input
                                    type="number"
                                    value={product.discountsPrice}
                                    className="w-full mt-1 p-2 border rounded-lg"
                                />
                            </div>
                        </div>
                        <div className="flex flex-col sm:flex-row gap-4 mt-4">
                            <div className="flex-1">
                                <label className="block text-sm font-medium">
                                    Discount %
                                </label>
                                <input
                                    type="number"
                                    value={product.discountsPercentage}
                                    className="w-full mt-1 p-2 border rounded-lg"
                                />
                            </div>
                            <div className="flex-1">
                                <label className="block text-sm font-medium">
                                    Total Stock
                                </label>
                                <input
                                    type="number"
                                    value={product.stock}
                                    className="w-full mt-1 p-2 border rounded-lg"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Sizes & Colors */}
                    <div className="p-5 border rounded-xl">
                        <div className="text-lg font-semibold mb-2">
                            Sizes & Colors
                        </div>

                        <div className="space-y-4">
                            {product.vars.map((color, idx) => (
                                <div className="flex flex-col gap-3 p-1 rounded-md mb-2">
                                    <hr />
                                    <h1 className="text-center font-semibold">
                                        Color {idx + 1}
                                    </h1>
                                    {/* Color Input */}
                                    <div className="flex flex-col sm:flex-row gap-4">
                                        <div className="flex-1">
                                            <label className="block text-sm font-medium">
                                                Color Code
                                            </label>
                                            <input
                                                type="color"
                                                value={color.colorCode}
                                                className="w-full h-10 mt-1 p-1 border rounded-lg"
                                            />
                                        </div>

                                        <div className="flex-1">
                                            <label className="block text-sm font-medium">
                                                Color Name
                                            </label>
                                            <input
                                                type="text"
                                                value={color.color}
                                                className="w-full mt-1 p-2 border rounded-lg"
                                            />
                                        </div>
                                    </div>

                                    {/* Image URL */}
                                    <div className="flex justify-between md:justify-evenly px-1">
                                        <div className="flex items-center">
                                            <div className="">
                                                <label className="block text-sm font-medium">
                                                    Image (Font)
                                                </label>
                                                <input
                                                    type="file"
                                                    accept="image/*"
                                                    className=" w-[72px] text-sm border rounded-lg m-2"
                                                />
                                            </div>
                                            <div className="flex justify-center ml-2 rounded-lg overflow-hidden">
                                                <img
                                                    className="h-[100px]"
                                                    src={color.imageUrl[0]}
                                                    alt=""
                                                />
                                            </div>
                                        </div>
                                        <div className="flex items-center">
                                            <div className="">
                                                <label className="block text-sm font-medium">
                                                    Image (Back)
                                                </label>
                                                <input
                                                    type="file"
                                                    accept="image/*"
                                                    className=" w-[72px] text-sm border rounded-lg m-2"
                                                />
                                            </div>
                                            <div className="flex justify-center ml-2 rounded-lg overflow-hidden">
                                                <img
                                                    className="h-[100px]"
                                                    src={color.imageUrl[1]}
                                                    alt=""
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Sizes */}
                                    <div>
                                        <label className="block text-sm font-medium">
                                            Sizes & Stock
                                        </label>
                                        <div className="flex flex-col sm:flex-row gap-4 mt-2">
                                            <div className="flex-1">
                                                <input
                                                    type="text"
                                                    defaultValue="M"
                                                    className="w-full p-2 border rounded-lg"
                                                />
                                                <input
                                                    type="number"
                                                    defaultValue="30"
                                                    className="w-full mt-1 p-2 border rounded-lg"
                                                />
                                            </div>

                                            <div className="flex-1">
                                                <input
                                                    type="text"
                                                    defaultValue="L"
                                                    className="w-full p-2 border rounded-lg"
                                                />
                                                <input
                                                    type="number"
                                                    defaultValue="30"
                                                    className="w-full mt-1 p-2 border rounded-lg"
                                                />
                                            </div>

                                            <div className="flex-1">
                                                <input
                                                    type="text"
                                                    defaultValue="XL"
                                                    className="w-full p-2 border rounded-lg"
                                                />
                                                <input
                                                    type="number"
                                                    defaultValue="30"
                                                    className="w-full mt-1 p-2 border rounded-lg"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Reviews */}
                    <div className="p-5 border rounded-xl">
                        <h2 className="text-lg font-semibold mb-4">Reviews</h2>
                        <div className="space-y-6">
                            {[1, 2].map((_, i) => (
                                <div
                                    key={i}
                                    className="p-4 border rounded-lg space-y-3"
                                >
                                    <div>
                                        <label className="block text-sm font-medium">
                                            Reviewer Name
                                        </label>
                                        <input
                                            type="text"
                                            placeholder="John Doe"
                                            className="w-full mt-1 p-2 border rounded-lg"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium">
                                            Comment
                                        </label>
                                        <textarea
                                            rows="2"
                                            placeholder="Great product!"
                                            className="w-full mt-1 p-2 border rounded-lg"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium">
                                            Rating
                                        </label>
                                        <input
                                            type="number"
                                            min="1"
                                            max="5"
                                            defaultValue={4}
                                            className="w-full mt-1 p-2 border rounded-lg"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium">
                                            Review Images
                                        </label>
                                        <div className="flex gap-2 mt-2 flex-wrap">
                                            {[...Array(3)].map((_, idx) => (
                                                <div
                                                    key={idx}
                                                    className="w-16 h-16 border rounded-lg flex items-center justify-center text-gray-400 text-sm"
                                                >
                                                    +
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Right Section */}
                <div className="w-full lg:w-[350px] flex-shrink-0 space-y-6">
                    {/* Upload Images */}
                    <div className="p-5 border rounded-xl">
                        <h2 className="text-lg font-semibold mb-4">
                            Upload Images
                        </h2>
                        <div className="flex flex-wrap gap-3">
                            {product.vars.map((color) => (
                                color.imageUrl.map((img, idx) => (
                                    <img
                                        key={idx}
                                        src={img}
                                        alt="product"
                                        className="w-20 h-20 object-cover border rounded-lg"
                                    />
                                ))
                            ))}
                        </div>
                    </div>

                    {/* Vendor */}
                    <div className="p-5 border rounded-xl">
                        <h2 className="text-lg font-semibold mb-4">Vendor</h2>
                        <input
                            type="text"
                            defaultValue="BrandA"
                            className="w-full p-2 border rounded-lg"
                        />
                    </div>
                </div>
            </div>

            {/* Bottom Buttons */}
            <div className="max-w-6xl mx-auto mt-6 flex flex-col sm:flex-row justify-end gap-3">
                <button className="w-full sm:w-auto px-4 py-2 border rounded-lg hover:bg-gray-100">
                    Save Draft
                </button>
                <button className="w-full sm:w-auto px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600">
                    Add Product
                </button>
            </div>
        </div>
    );
}
