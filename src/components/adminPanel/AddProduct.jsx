import { useState } from "react";

export default function AddProduct() {
    const submit = useSubmit();
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        productId: "1e2d3c4b-5f6a-7b8c-9d0e-1f2a3b4c5d6e",
        title: "Classic Hoodie",
        description: "Soft and cozy material.",
        category: "hoodie",
        subcategory: "casual",
        pricing: 28900,
        discountsPrice: 23120,
        discountsPercentage: 20,
        for: "male",
        stock: 42,
        rating : 4,
        vars: [
            {
                color: "blue",
                colorCode: "#0000FF",
                m: 33,
                l: 45,
                xl: 27,
                imageUrl: [
                    "https://picsum.photos/id/101/500/500",
                    "https://picsum.photos/id/202/500/500",
                ],
            },
            {
                color: "red",
                colorCode: "#FF0000",
                m: 22,
                l: 36,
                xl: 48,
                imageUrl: [
                    "https://picsum.photos/id/303/500/500",
                    "https://picsum.photos/id/404/500/500",
                ],
            },
        ],
        vendor: "BrandB",
        createdAt: "2024-05-11T09:45:00Z",
        updatedAt: "2025-06-02T13:15:00Z",
        reviews: [
            {
                name: "Alice",
                comment: "Great product!",
                salerComment : "",
                date: "2025-06-02T13:15:00Z",
                rating: 5,
                imageUrl: [
                    "https://picsum.photos/id/505/500/500",
                    "https://picsum.photos/id/606/500/500",
                ],
            },
        ],
        totalView: 256,
        totalSale: 49,
    });

    const handleSubmit = (e) => {
        e.preventDefault();

        const fd = new FormData();
        Object.entries(formData).forEach(([key, value]) => {
            // value যদি array/object হয়, stringify করে দিতে হবে
            if (typeof value === "object") {
                fd.append(key, JSON.stringify(value));
            } else {
                fd.append(key, value);
            }
        });
        submit(fd, { method: "post"});
    };

    return (
        <div className="max-ms:p-0 p-4 overflow-x-hidden">
            {step === 1 && (
                <GeneralInfoForm
                    formData={formData}
                    setFormData={setFormData}
                />
            )}
            {step === 2 && (
                <Pricing formData={formData} setFormData={setFormData} />
            )}
            {step === 3 && (
                <SizeAndColor formData={formData} setFormData={setFormData} />
            )}
            {step === 4 && (
                <SingleProduct
                    propsValue={formData}
                    formData={formData}
                    setFormData={setFormData}
                />
            )}

            <div className="flex justify-between mt-6 px-6">
                {step > 1 && (
                    <button
                        onClick={() => setStep(step - 1)}
                        className="px-4 py-2 border rounded"
                    >
                        Back
                    </button>
                )}
                {step < 4 ? (
                    <button
                        onClick={() => setStep(step + 1)}
                        className="px-4 py-2 bg-green-500 text-white rounded"
                    >
                        Next
                    </button>
                ) : (
                    <button
                        onClick={handleSubmit}
                        className=" px-4 py-2 bg-blue-500 text-white rounded"
                    >
                        Submit
                    </button>
                )}
            </div>
        </div>
    );
}

import { useSubmit } from "react-router-dom";
import SingleProduct from "../SingleProduct";
import ProductColorInpu from "./compo/ProductColorInpu";
import GeneralInfoForm from "./compo/addProductComponents/GeneralInfoForm";
import Pricing from "./compo/addProductComponents/Pricing";
import SizeAndColor from "./compo/addProductComponents/SizeAndColor";

function AddP() {
    const [moreColor, setMoreColor] = useState(false);

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
                                    defaultValue="Classic White Tee"
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
                                    defaultValue="Soft cotton crew neck t-shirt, everyday wear."
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
                                        defaultValue="hoodie"
                                        className="w-full mt-1 p-2 border rounded-lg"
                                    />
                                </div>
                                <div className="flex-1">
                                    <label className="block text-sm font-medium">
                                        Subcategory
                                    </label>
                                    <input
                                        type="text"
                                        defaultValue="casual"
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
                                    <option value="unisex">Unisex</option>
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
                                    defaultValue={400}
                                    className="w-full mt-1 p-2 border rounded-lg"
                                />
                            </div>
                            <div className="flex-1">
                                <label className="block text-sm font-medium">
                                    Discount Price
                                </label>
                                <input
                                    type="number"
                                    defaultValue={350}
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
                                    defaultValue={30}
                                    className="w-full mt-1 p-2 border rounded-lg"
                                />
                            </div>
                            <div className="flex-1">
                                <label className="block text-sm font-medium">
                                    Total Stock
                                </label>
                                <input
                                    type="number"
                                    defaultValue={50}
                                    className="w-full mt-1 p-2 border rounded-lg"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Sizes & Colors */}
                    <div className="p-5 border rounded-xl">
                        {/* <div className="flex justify-between items-center mb-4">
                            <div className="text-lg font-semibold">
                                Sizes & Colors
                            </div>
                            <div className="w-[50%] flex">
                                <span className="font-semibold p-2">
                                    মোট কয়টি :
                                </span>
                                <input
                                    className="border-2 border-red-500 rounded-lg p-2  w-[60px]"
                                    type="number"
                                    value={colorNumber}
                                    name=""
                                    onChange={(e) =>
                                        setColorNumber(e.target.value)
                                    }
                                />
                            </div>
                        </div> */}

                        <div className="text-lg font-semibold mb-2">
                            Sizes & Colors
                        </div>
                        <div className="space-y-4">
                            <ProductColorInpu
                                setMoreColor={setMoreColor}
                                moreColor={moreColor}
                                name={["1", "2", "3"]}
                            />

                            {moreColor && (
                                <ProductColorInpu
                                    setMoreColor={setMoreColor}
                                    moreColor={moreColor}
                                    name={["4", "5", "6"]}
                                />
                            )}

                            {/* 
                            {["s", "m", "l", "xl", "xxl"].map((size) => (
                                <div className="flex flex-col sm:flex-row gap-4 items-start">
                                    <div className="flex-1">
                                        <label className="block text-sm font-medium">
                                            Size ({size.toUpperCase()})
                                        </label>
                                        <input
                                            type="number"
                                            className="w-full mt-1 p-2 border rounded-lg"
                                        />
                                    </div>
                                    <div className="flex-1">
                                        <label className="block text-sm font-medium">
                                            Colors
                                        </label>
                                        <input
                                            type="text"
                                            defaultValue="red, green, yellow, coffee"
                                            className="w-full mt-1 p-2 border rounded-lg"
                                        />
                                    </div>
                                </div>
                            ))} */}
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
                            {[
                                "https://images.unsplash.com/photo-1637264486270-3238d60aa71a?q=80&w=1470",
                                "https://images.pexels.com/photos/6311657/pexels-photo-6311657.jpeg",
                                "https://images.pexels.com/photos/6311670/pexels-photo-6311670.jpeg",
                            ].map((img, i) => (
                                <img
                                    key={i}
                                    src={img}
                                    alt="product"
                                    className="w-20 h-20 object-cover border rounded-lg"
                                />
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
