// import { useState } from "react";
// import { useLoaderData } from "react-router-dom";

// export default function ProductEdit() {
//     const product = useLoaderData();
//     console.log(product.vars);
//     // const [moreColor, setMoreColor] = useState(false);
//     // const product = {
//     //     color: {
//     //         code: "#6f4e37",
//     //         name: "Coffee Brown",
//     //     },
//     //     imageUrl: "https://example.com/product-coffee-brown.jpg",
//     //     sizes: [
//     //         {
//     //             size: "M",
//     //             stock: 30,
//     //         },
//     //         {
//     //             size: "L",
//     //             stock: 30,
//     //         },
//     //         {
//     //             size: "XL",
//     //             stock: 30,
//     //         },
//     //     ],
//     // };

//     return (
//         <div className="min-h-screen w-full bg-gray-100 p-4 sm:p-6 overflow-y-scroll">
//             <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow p-6 flex flex-col lg:flex-row gap-6">
//                 {/* Left Section */}
//                 <div className="flex-1 space-y-6">
//                     {/* General Information */}
//                     <div className="p-5 border rounded-xl">
//                         <h2 className="text-lg font-semibold mb-4">
//                             General Information
//                         </h2>
//                         <div className="space-y-4">
//                             {/* Title */}
//                             <div>
//                                 <label className="block text-sm font-medium">
//                                     Product Title
//                                 </label>
//                                 <input
//                                     type="text"
//                                     value={product.title}
//                                     className="w-full mt-1 p-2 border rounded-lg"
//                                 />
//                             </div>
//                             {/* Description */}
//                             <div>
//                                 <label className="block text-sm font-medium">
//                                     Description
//                                 </label>
//                                 <textarea
//                                     rows="4"
//                                     value={product.description}
//                                     className="w-full mt-1 p-2 border rounded-lg"
//                                 />
//                             </div>
//                             {/* Category / Subcategory */}
//                             <div className="flex flex-col sm:flex-row gap-4">
//                                 <div className="flex-1">
//                                     <label className="block text-sm font-medium">
//                                         Category
//                                     </label>
//                                     <input
//                                         type="text"
//                                         value={product.category}
//                                         className="w-full mt-1 p-2 border rounded-lg"
//                                     />
//                                 </div>
//                                 <div className="flex-1">
//                                     <label className="block text-sm font-medium">
//                                         Subcategory
//                                     </label>
//                                     <input
//                                         type="text"
//                                         value={product.subcategory}
//                                         className="w-full mt-1 p-2 border rounded-lg"
//                                     />
//                                 </div>
//                             </div>
//                             {/* For (Gender) */}
//                             <div>
//                                 <label className="block text-sm font-medium">
//                                     For
//                                 </label>
//                                 <select
//                                     className="w-full mt-1 p-2 border rounded-lg"
//                                     defaultValue="male"
//                                 >
//                                     <option value="male">Male</option>
//                                     <option value="female">Female</option>
//                                 </select>
//                             </div>
//                         </div>
//                     </div>

//                     {/* Pricing & Stock */}
//                     <div className="p-5 border rounded-xl">
//                         <h2 className="text-lg font-semibold mb-4">
//                             Pricing & Stock
//                         </h2>
//                         <div className="flex flex-col sm:flex-row gap-4">
//                             <div className="flex-1">
//                                 <label className="block text-sm font-medium">
//                                     Base Price
//                                 </label>
//                                 <input
//                                     type="number"
//                                     value={product.pricing}
//                                     className="w-full mt-1 p-2 border rounded-lg"
//                                 />
//                             </div>
//                             <div className="flex-1">
//                                 <label className="block text-sm font-medium">
//                                     Discount Price
//                                 </label>
//                                 <input
//                                     type="number"
//                                     value={product.discountsPrice}
//                                     className="w-full mt-1 p-2 border rounded-lg"
//                                 />
//                             </div>
//                         </div>
//                         <div className="flex flex-col sm:flex-row gap-4 mt-4">
//                             <div className="flex-1">
//                                 <label className="block text-sm font-medium">
//                                     Discount %
//                                 </label>
//                                 <input
//                                     type="number"
//                                     value={product.discountsPercentage}
//                                     className="w-full mt-1 p-2 border rounded-lg"
//                                 />
//                             </div>
//                             <div className="flex-1">
//                                 <label className="block text-sm font-medium">
//                                     Total Stock
//                                 </label>
//                                 <input
//                                     type="number"
//                                     value={product.stock}
//                                     className="w-full mt-1 p-2 border rounded-lg"
//                                 />
//                             </div>
//                         </div>
//                     </div>

//                     {/* Sizes & Colors */}
//                     <div className="p-5 border rounded-xl">
//                         <div className="text-lg font-semibold mb-2">
//                             Sizes & Colors
//                         </div>

//                         <div className="space-y-4">
//                             {product.vars.map((color, idx) => (
//                                 <div className="flex flex-col gap-3 p-1 rounded-md mb-2">
//                                     <hr />
//                                     <h1 className="text-center font-semibold">
//                                         Color {idx + 1}
//                                     </h1>
//                                     {/* Color Input */}
//                                     <div className="flex flex-col sm:flex-row gap-4">
//                                         <div className="flex-1">
//                                             <label className="block text-sm font-medium">
//                                                 Color Code
//                                             </label>
//                                             <input
//                                                 type="color"
//                                                 value={color.colorCode}
//                                                 className="w-full h-10 mt-1 p-1 border rounded-lg"
//                                             />
//                                         </div>

//                                         <div className="flex-1">
//                                             <label className="block text-sm font-medium">
//                                                 Color Name
//                                             </label>
//                                             <input
//                                                 type="text"
//                                                 value={color.color}
//                                                 className="w-full mt-1 p-2 border rounded-lg"
//                                             />
//                                         </div>
//                                     </div>

//                                     {/* Image URL */}
//                                     <div className="flex justify-between md:justify-evenly px-1">
//                                         <div className="flex items-center">
//                                             <div className="">
//                                                 <label className="block text-sm font-medium">
//                                                     Image (Font)
//                                                 </label>
//                                                 <input
//                                                     type="file"
//                                                     accept="image/*"
//                                                     className=" w-[72px] text-sm border rounded-lg m-2"
//                                                 />
//                                             </div>
//                                             <div className="flex justify-center ml-2 rounded-lg overflow-hidden">
//                                                 <img
//                                                     className="h-[100px]"
//                                                     src={color.imageUrl[0]}
//                                                     alt=""
//                                                 />
//                                             </div>
//                                         </div>
//                                         <div className="flex items-center">
//                                             <div className="">
//                                                 <label className="block text-sm font-medium">
//                                                     Image (Back)
//                                                 </label>
//                                                 <input
//                                                     type="file"
//                                                     accept="image/*"
//                                                     className=" w-[72px] text-sm border rounded-lg m-2"
//                                                 />
//                                             </div>
//                                             <div className="flex justify-center ml-2 rounded-lg overflow-hidden">
//                                                 <img
//                                                     className="h-[100px]"
//                                                     src={color.imageUrl[1]}
//                                                     alt=""
//                                                 />
//                                             </div>
//                                         </div>
//                                     </div>

//                                     {/* Sizes */}
//                                     <div>
//                                         <label className="block text-sm font-medium">
//                                             Sizes & Stock
//                                         </label>
//                                         <div className="flex flex-col sm:flex-row gap-4 mt-2">
//                                             <div className="flex-1">
//                                                 <input
//                                                     type="text"
//                                                     defaultValue="M"
//                                                     className="w-full p-2 border rounded-lg"
//                                                 />
//                                                 <input
//                                                     type="number"
//                                                     defaultValue="30"
//                                                     className="w-full mt-1 p-2 border rounded-lg"
//                                                 />
//                                             </div>

//                                             <div className="flex-1">
//                                                 <input
//                                                     type="text"
//                                                     defaultValue="L"
//                                                     className="w-full p-2 border rounded-lg"
//                                                 />
//                                                 <input
//                                                     type="number"
//                                                     defaultValue="30"
//                                                     className="w-full mt-1 p-2 border rounded-lg"
//                                                 />
//                                             </div>

//                                             <div className="flex-1">
//                                                 <input
//                                                     type="text"
//                                                     defaultValue="XL"
//                                                     className="w-full p-2 border rounded-lg"
//                                                 />
//                                                 <input
//                                                     type="number"
//                                                     defaultValue="30"
//                                                     className="w-full mt-1 p-2 border rounded-lg"
//                                                 />
//                                             </div>
//                                         </div>
//                                     </div>
//                                 </div>
//                             ))}
//                         </div>
//                     </div>

//                     {/* Reviews */}
//                     <div className="p-5 border rounded-xl">
//                         <h2 className="text-lg font-semibold mb-4">Reviews</h2>
//                         <div className="space-y-6">
//                             {[1, 2].map((_, i) => (
//                                 <div
//                                     key={i}
//                                     className="p-4 border rounded-lg space-y-3"
//                                 >
//                                     <div>
//                                         <label className="block text-sm font-medium">
//                                             Reviewer Name
//                                         </label>
//                                         <input
//                                             type="text"
//                                             placeholder="John Doe"
//                                             className="w-full mt-1 p-2 border rounded-lg"
//                                         />
//                                     </div>
//                                     <div>
//                                         <label className="block text-sm font-medium">
//                                             Comment
//                                         </label>
//                                         <textarea
//                                             rows="2"
//                                             placeholder="Great product!"
//                                             className="w-full mt-1 p-2 border rounded-lg"
//                                         />
//                                     </div>
//                                     <div>
//                                         <label className="block text-sm font-medium">
//                                             Rating
//                                         </label>
//                                         <input
//                                             type="number"
//                                             min="1"
//                                             max="5"
//                                             defaultValue={4}
//                                             className="w-full mt-1 p-2 border rounded-lg"
//                                         />
//                                     </div>
//                                     <div>
//                                         <label className="block text-sm font-medium">
//                                             Review Images
//                                         </label>
//                                         <div className="flex gap-2 mt-2 flex-wrap">
//                                             {[...Array(3)].map((_, idx) => (
//                                                 <div
//                                                     key={idx}
//                                                     className="w-16 h-16 border rounded-lg flex items-center justify-center text-gray-400 text-sm"
//                                                 >
//                                                     +
//                                                 </div>
//                                             ))}
//                                         </div>
//                                     </div>
//                                 </div>
//                             ))}
//                         </div>
//                     </div>
//                 </div>

//                 {/* Right Section */}
//                 <div className="w-full lg:w-[350px] flex-shrink-0 space-y-6">
//                     {/* Upload Images */}
//                     <div className="p-5 border rounded-xl">
//                         <h2 className="text-lg font-semibold mb-4">
//                             Upload Images
//                         </h2>
//                         <div className="flex flex-wrap gap-3">
//                             {product.vars.map((color) => (
//                                 color.imageUrl.map((img, idx) => (
//                                     <img
//                                         key={idx}
//                                         src={img}
//                                         alt="product"
//                                         className="w-20 h-20 object-cover border rounded-lg"
//                                     />
//                                 ))
//                             ))}
//                         </div>
//                     </div>

//                     {/* Vendor */}
//                     <div className="p-5 border rounded-xl">
//                         <h2 className="text-lg font-semibold mb-4">Vendor</h2>
//                         <input
//                             type="text"
//                             defaultValue="BrandA"
//                             className="w-full p-2 border rounded-lg"
//                         />
//                     </div>
//                 </div>
//             </div>

//             {/* Bottom Buttons */}
//             <div className="max-w-6xl mx-auto mt-6 flex flex-col sm:flex-row justify-end gap-3">
//                 <button className="w-full sm:w-auto px-4 py-2 border rounded-lg hover:bg-gray-100">
//                     Save Draft
//                 </button>
//                 <button className="w-full sm:w-auto px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600">
//                     Add Product
//                 </button>
//             </div>
//         </div>
//     );
// }
















import { useState } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";

export default function ProductEdit() {
    const product = useLoaderData();
    const navigate = useNavigate();
    

    const [isSubmitting, setIsSubmitting] = useState(false);

    const [formData, setFormData] = useState({
        title: product.title || "",
        description: product.description || "",
        category: product.category || "",
        subcategory: product.subcategory || "",
        for: product.for || "male",
        stock: product.stock || "",
        rating: product.rating || "",
        vendor: product.vendor || "",
    });

    const [variants, setVariants] = useState(
        product.vars?.map((v) => ({
            ...v,
            // Sizes are stored as flat properties on the variant object
            s: v.s || 0,
            m: v.m || 0,
            l: v.l || 0,
            xl: v.xl || 0,
            xxl: v.xxl || 0,
        })) || []
    );
    


    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleVariantChange = (idx, field, value) => {
        setVariants((prev) =>
            prev.map((v, i) => (i === idx ? { ...v, [field]: value } : v))
        );
    };

    const handleSizeChange = (idx, size, value) => {
        setVariants((prev) =>
            prev.map((v, i) =>
                i === idx
                    ? { ...v, [size]: Number(value) || 0 }
                    : v
            )
        );
    };

    const getTotalStock = () => {
        return variants.reduce((total, v) => {
            const sizeTotal = (Number(v.s) || 0) + (Number(v.m) || 0) + (Number(v.l) || 0) + (Number(v.xl) || 0) + (Number(v.xxl) || 0);
            return total + sizeTotal;
        }, 0);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (isSubmitting) return;
        setIsSubmitting(true);

        try {
            const res = await fetch(
                `${import.meta.env.VITE_API_URL}/products/${product._id}`,
                {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        ...formData,
                        vars: variants,
                        stock: getTotalStock(),
                    }),
                }
            );

            if (res.ok) {
                navigate("/admin/products");
            } else {
                console.error("Update failed:", res.status);
            }
        } catch (error) {
            console.error("Error updating product:", error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 p-4 sm:p-6 lg:p-8 overflow-y-auto">
            <div className="max-w-5xl mx-auto">
                {/* Header */}
                <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                        <button
                            onClick={() => navigate("/admin/products")}
                            className="flex items-center gap-2 text-slate-500 hover:text-slate-700 mb-2 transition-colors"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                            </svg>
                            Back to Products
                        </button>
                        <h1 className="text-2xl sm:text-3xl font-bold text-slate-800">
                            Edit Product
                        </h1>
                        <p className="text-slate-500 mt-1">
                            Update product information and variants
                        </p>
                    </div>
                    <div className="flex items-center gap-3">
                        <span className="px-3 py-1.5 bg-amber-100 text-amber-700 text-sm font-medium rounded-lg">
                            ID: {product._id?.slice(-8)}
                        </span>
                    </div>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        {/* Left Column - Main Info */}
                        <div className="lg:col-span-2 space-y-6">
                            {/* General Information */}
                            <div className="bg-white rounded-2xl border border-slate-200 p-6">
                                <h2 className="text-lg font-semibold text-slate-800 mb-5 flex items-center gap-2">
                                    <svg className="w-5 h-5 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    General Information
                                </h2>

                                <div className="space-y-5">
                                    {/* Title */}
                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 mb-2">
                                            Product Title <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            name="title"
                                            value={formData.title}
                                            onChange={handleInputChange}
                                            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
                                            required
                                        />
                                    </div>

                                    {/* Description */}
                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 mb-2">
                                            Description
                                        </label>
                                        <textarea
                                            name="description"
                                            rows="4"
                                            value={formData.description}
                                            onChange={handleInputChange}
                                            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all resize-none"
                                        />
                                    </div>

                                    {/* Category & Subcategory */}
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-slate-700 mb-2">
                                                Category
                                            </label>
                                            <div className="relative">
                                                <select
                                                    name="category"
                                                    value={formData.category}
                                                    onChange={handleInputChange}
                                                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent appearance-none cursor-pointer"
                                                >
                                                    <option value="">Select Category</option>
                                                    <option value="hoodie">Hoodie</option>
                                                    <option value="t-shirt">T-Shirt</option>
                                                    <option value="shirt">Shirt</option>
                                                    <option value="drop-shoulder">Drop Shoulder</option>
                                                    <option value="sharee">Sharee</option>
                                                </select>
                                                <svg className="w-5 h-5 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                                </svg>
                                            </div>
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-slate-700 mb-2">
                                                Subcategory
                                            </label>
                                            <input
                                                type="text"
                                                name="subcategory"
                                                value={formData.subcategory}
                                                onChange={handleInputChange}
                                                placeholder="Casual, Elegant, Cozy..."
                                                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
                                            />
                                        </div>
                                    </div>

                                    {/* Target Audience */}
                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 mb-2">
                                            Target Audience
                                        </label>
                                        <div className="flex flex-wrap gap-3">
                                            {["male", "female", "kids"].map((option) => (
                                                <button
                                                    key={option}
                                                    type="button"
                                                    onClick={() =>
                                                        setFormData({ ...formData, for: option })
                                                    }
                                                    className={`px-5 py-2.5 rounded-xl font-medium transition-all ${
                                                        formData.for === option
                                                            ? "bg-amber-500 text-white shadow-lg shadow-amber-500/30"
                                                            : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                                                    }`}
                                                >
                                                    {option.charAt(0).toUpperCase() + option.slice(1)}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Variants Section */}
                            <div className="bg-white rounded-2xl border border-slate-200 p-6">
                                <h2 className="text-lg font-semibold text-slate-800 mb-5 flex items-center gap-2">
                                    <svg className="w-5 h-5 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                                    </svg>
                                    Color Variants
                                    <span className="ml-auto text-sm font-normal text-slate-500">
                                        {variants.length} variant{variants.length !== 1 ? "s" : ""}
                                    </span>
                                </h2>

                                {variants.length === 0 ? (
                                    <div className="text-center py-8 text-slate-500">
                                        <svg className="w-12 h-12 mx-auto mb-3 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                                        </svg>
                                        <p>No variants added yet</p>
                                        <button
                                            type="button"
                                            onClick={() => navigate(`/admin/products/addcolor/${product._id}`)}
                                            className="mt-3 text-amber-600 hover:text-amber-700 font-medium"
                                        >
                                            + Add first variant
                                        </button>
                                    </div>
                                ) : (
                                    <div className="space-y-4">
                                        {variants.map((variant, idx) => (
                                            <div
                                                key={idx}
                                                className="border border-slate-200 rounded-xl p-4 bg-slate-50/50"
                                            >
                                                {/* Variant Header */}
                                                <div className="flex items-center gap-3 mb-4">
                                                    <div
                                                        className="w-10 h-10 rounded-lg border-2 border-white shadow-md flex-shrink-0"
                                                        style={{ backgroundColor: variant.colorCode || "#ccc" }}
                                                    />
                                                    <div className="flex-1">
                                                        <input
                                                            type="text"
                                                            value={variant.color || ""}
                                                            onChange={(e) =>
                                                                handleVariantChange(idx, "color", e.target.value)
                                                            }
                                                            className="font-medium text-slate-800 bg-transparent border-b border-transparent hover:border-slate-300 focus:border-amber-500 focus:outline-none transition-colors w-full"
                                                            placeholder="Color name"
                                                        />
                                                    </div>
                                                    <input
                                                        type="color"
                                                        value={variant.colorCode || "#cccccc"}
                                                        onChange={(e) =>
                                                            handleVariantChange(idx, "colorCode", e.target.value)
                                                        }
                                                        className="w-10 h-10 rounded-lg cursor-pointer border-0"
                                                    />
                                                </div>

                                                {/* Images Preview */}
                                                {variant.imageUrl && variant.imageUrl.length > 0 && (
                                                    <div className="flex gap-2 mb-4 overflow-x-auto pb-2">
                                                        {variant.imageUrl.map((img, imgIdx) => (
                                                            <img
                                                                key={imgIdx}
                                                                src={img}
                                                                alt={`${variant.color} ${imgIdx + 1}`}
                                                                className="w-16 h-16 object-cover rounded-lg border border-slate-200 flex-shrink-0"
                                                            />
                                                        ))}
                                                    </div>
                                                )}

                                                {/* Sizes Grid */}
                                                <div>
                                                    <label className="block text-sm font-medium text-slate-600 mb-2">
                                                        Stock by Size
                                                    </label>
                                                    <div className="grid grid-cols-5 gap-2">
                                                        {["s", "m", "l", "xl", "xxl"].map((size) => (
                                                            <div key={size} className="text-center">
                                                                <span className="block text-xs font-medium text-slate-500 uppercase mb-1">
                                                                    {size}
                                                                </span>
                                                                <input
                                                                    type="number"
                                                                    min="0"
                                                                    value={variant[size] || 0}
                                                                    onChange={(e) =>
                                                                        handleSizeChange(idx, size, e.target.value)
                                                                    }
                                                                    className="w-full px-2 py-2 text-center bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 text-sm"
                                                                />
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>
                                        ))}

                                        <button
                                            type="button"
                                            onClick={() => navigate(`/admin/products/addcolor/${product._id}`)}
                                            className="w-full py-3 border-2 border-dashed border-slate-300 rounded-xl text-slate-500 hover:border-amber-400 hover:text-amber-600 transition-colors flex items-center justify-center gap-2"
                                        >
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                            </svg>
                                            Add New Variant
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Right Column - Sidebar */}
                        <div className="space-y-6">
                            {/* Product Images */}
                            <div className="bg-white rounded-2xl border border-slate-200 p-6">
                                <h2 className="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
                                    <svg className="w-5 h-5 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                    </svg>
                                    Product Images
                                </h2>
                                <div className="grid grid-cols-3 gap-2">
                                    {variants.flatMap((v) =>
                                        (v.imageUrl || []).map((img, idx) => (
                                            <img
                                                key={`${v.color}-${idx}`}
                                                src={img}
                                                alt="product"
                                                className="w-full aspect-square object-cover rounded-lg border border-slate-200"
                                            />
                                        ))
                                    )}
                                    {variants.flatMap((v) => v.imageUrl || []).length === 0 && (
                                        <div className="col-span-3 py-8 text-center text-slate-400">
                                            No images available
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Vendor */}
                            <div className="bg-white rounded-2xl border border-slate-200 p-6">
                                <h2 className="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
                                    <svg className="w-5 h-5 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                    </svg>
                                    Vendor
                                </h2>
                                <input
                                    type="text"
                                    name="vendor"
                                    value={formData.vendor}
                                    onChange={handleInputChange}
                                    placeholder="Enter vendor name"
                                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
                                />
                            </div>

                            {/* Stock Summary */}
                            <div className="bg-white rounded-2xl border border-slate-200 p-6">
                                <h2 className="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
                                    <svg className="w-5 h-5 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                                    </svg>
                                    Stock Summary
                                </h2>
                                <div className="space-y-3">
                                    <div className="flex justify-between items-center p-3 bg-slate-50 rounded-lg">
                                        <span className="text-slate-600">Total Variants</span>
                                        <span className="font-semibold text-slate-800">{variants.length}</span>
                                    </div>
                                    <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                                        <span className="text-green-700">Total Stock</span>
                                        <span className="font-semibold text-green-700">{getTotalStock()}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="space-y-3">
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="w-full py-3.5 bg-amber-500 hover:bg-amber-600 text-white font-semibold rounded-xl transition-colors shadow-lg shadow-amber-500/30 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                                >
                                    {isSubmitting ? (
                                        <>
                                            <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                            </svg>
                                            Saving...
                                        </>
                                    ) : (
                                        <>
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                            </svg>
                                            Save Changes
                                        </>
                                    )}
                                </button>
                                <button
                                    type="button"
                                    onClick={() => navigate("/admin/products")}
                                    className="w-full py-3.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-xl transition-colors"
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}
