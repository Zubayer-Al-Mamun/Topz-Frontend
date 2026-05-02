// import { useState } from "react";
// import { useNavigate } from "react-router-dom";

// export default function ProductForm() {
//     const navigate = useNavigate();
//     const [isSubmitting, setIsSubmitting] = useState(false);

//     const [formData, setFormData] = useState({
//         title: "",
//         images: [],
//         description: "",
//         category: "",
//         subcategory: "",
//         pricing: "",
//         discountsPrice: "",
//         discountsPercentage: "",
//         for: "male",
//         stock: "",
//         rating: "",
//         vars: [],
//         vendor: "",
//         reviews: [],
//     });

//     async function handleSubmit(e) {
//         e.preventDefault();
//         if (isSubmitting) return;
//         setIsSubmitting(true);

//         const data = new FormData();

        

//         Object.entries(formData).forEach(([key, value]) => {
//             if (key === "images") {
//                 value.forEach((file) => data.append("images", file)); 
//             } else {
//                 data.append(key, value);
//             }
//         });

//         try {
//             const res = await fetch(import.meta.env.VITE_API_URL + "/product", {
//                 method: "POST",
//                 body: data,
//             });

//             if (res.ok) {
//                 console.log("Product uploaded successfully!");
//                 navigate("/admin/products");
//             } else {
//                 console.error("Upload failed:", res.status);
//             }
//         } catch (error) {
//             console.error("Error uploading product:", error);
//         } finally {
//             setIsSubmitting(false);
//         }
//     }

//     console.log(formData.image);
//     return (
//         <form
//             onSubmit={handleSubmit}
//             encType="multipart/form-data"
//             className="max-w-2xl mx-auto bg-white shadow-lg p-6 rounded-xl space-y-6"
//         >
//             <h2 className="text-xl font-semibold">Add Product</h2>

//             {/* Image Upload */}
//             <div>
//                 <label className="block text-sm font-medium text-gray-600">
//                     Product Image
//                 </label>
//                 <input
//                     type="file"
//                     name="images"
//                     accept="image/*"
//                     multiple 
//                     required
//                     onChange={(e) =>
//                         setFormData({
//                             ...formData,
//                             images: Array.from(e.target.files),
//                         })
//                     }
//                     className="w-full p-2 border rounded-lg mt-1"
//                 />
//                 {formData.images.length > 0 && (
//                     <div className="flex gap-2 mt-2 flex-wrap">
//                         {formData.images.map((img, idx) => (
//                             <img
//                                 key={idx}
//                                 src={URL.createObjectURL(img)}
//                                 alt={`preview-${idx}`}
//                                 className="w-24 h-24 object-cover rounded border"
//                             />
//                         ))}
//                     </div>
//                 )}
//             </div>

//             {/* Title */}
//             <div>
//                 <label className="block text-sm font-medium text-gray-600">
//                     Product Title
//                 </label>
//                 <input
//                     type="text"
//                     name="title"
//                     value={formData.title}
//                     onChange={(e) =>
//                         setFormData({ ...formData, title: e.target.value })
//                     }
//                     className="w-full p-2 border rounded-lg mt-1"
//                     required
//                 />
//             </div>

//             {/* Description */}
//             <div>
//                 <label className="block text-sm font-medium text-gray-600">
//                     Description (
//                     <b className="text-red-400">
//                         প্রত্যেক লাইন শেষে "Full Stop" / "." ব্যবহার করতে হবে
//                     </b>
//                     )
//                 </label>
//                 <textarea
//                     name="description"
//                     rows="3"
//                     value={formData.description}
//                     onChange={(e) =>
//                         setFormData({
//                             ...formData,
//                             description: e.target.value,
//                         })
//                     }
//                     className="w-full p-2 border rounded-lg mt-1"
//                 />
//             </div>

//             {/* Category & Subcategory */}
//             <div className="flex flex-col sm:flex-row gap-4">
//                 <div className="flex-1">
//                     <label className="block text-sm font-medium text-gray-600">
//                         Category
//                     </label>
//                     <select
//                         name="category"
//                         value={formData.category}
//                         onChange={(e) =>
//                             setFormData({
//                                 ...formData,
//                                 category: e.target.value,
//                             })
//                         }
//                         className="w-full p-2 border rounded-lg mt-1"
//                     >
//                         <option value="">Select Category</option>
//                         <option value="hoodie">Hoodie</option>
//                         <option value="t-shirt">T-Shirt</option>
//                         <option value="shirt">Shirt</option>
//                         <option value="drop-shoulder">Drop Shoulder</option>
//                         <option value="sharee">Sharee</option>
//                     </select>
//                 </div>

//                 <div className="flex-1">
//                     <label className="block text-sm font-medium text-gray-600">
//                         Subcategory
//                     </label>
//                     <input
//                         type="text"
//                         name="subcategory"
//                         value={formData.subcategory}
//                         placeholder="Casual, Elegant, Cozy..."
//                         onChange={(e) =>
//                             setFormData({
//                                 ...formData,
//                                 subcategory: e.target.value,
//                             })
//                         }
//                         className="w-full p-2 border rounded-lg mt-1"
//                     />
//                 </div>
//             </div>

//             {/* Pricing */}
//             <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
//                 <div>
//                     <label className="block text-sm font-medium text-gray-600">
//                         Price
//                     </label>
//                     <input
//                         type="number"
//                         name="pricing"
//                         value={formData.pricing}
//                         onChange={(e) =>
//                             setFormData({
//                                 ...formData,
//                                 pricing: e.target.value,
//                             })
//                         }
//                         className="w-full p-2 border rounded-lg mt-1"
//                     />
//                 </div>

//                 <div>
//                     <label className="block text-sm font-medium text-gray-600">
//                         Discount %
//                     </label>
//                     <input
//                         type="number"
//                         name="discountsPercentage"
//                         value={formData.discountsPercentage}
//                         onChange={(e) =>
//                             setFormData({
//                                 ...formData,
//                                 discountsPercentage: e.target.value,
//                             })
//                         }
//                         className="w-full p-2 border rounded-lg mt-1"
//                     />
//                 </div>

//                 <div>
//                     <label className="block text-sm font-medium text-gray-600">
//                         Discount Price
//                     </label>
//                     <input
//                         readOnly
//                         type="number"
//                         value={
//                             formData.pricing && formData.discountsPercentage
//                                 ? Math.ceil(
//                                       formData.pricing -
//                                           (formData.discountsPercentage / 100) *
//                                               formData.pricing
//                                   )
//                                 : ""
//                         }
//                         className="w-full p-2 border rounded-lg mt-1"
//                     />
//                 </div>
//             </div>

//             {/* For (Gender) */}
//             <div>
//                 <label className="block text-sm font-medium text-gray-600">
//                     For
//                 </label>
//                 <select
//                     name="for"
//                     value={formData.for}
//                     onChange={(e) =>
//                         setFormData({ ...formData, for: e.target.value })
//                     }
//                     className="w-full p-2 border rounded-lg mt-1"
//                 >
//                     <option value="male">Male</option>
//                     <option value="female">Female</option>
//                     <option value="kids">Kids</option>
//                 </select>
//             </div>

//             {/* Stock & Rating */}
//             <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//                 <div>
//                     <label className="block text-sm font-medium text-gray-600">
//                         Stock
//                     </label>
//                     <input
//                         type="number"
//                         name="stock"
//                         value={formData.stock}
//                         onChange={(e) =>
//                             setFormData({ ...formData, stock: e.target.value })
//                         }
//                         className="w-full p-2 border rounded-lg mt-1"
//                     />
//                 </div>

//                 <div>
//                     <label className="block text-sm font-medium text-gray-600">
//                         Rating
//                     </label>
//                     <input
//                         type="number"
//                         min="0"
//                         max="5"
//                         name="rating"
//                         value={formData.rating}
//                         onChange={(e) =>
//                             setFormData({ ...formData, rating: e.target.value })
//                         }
//                         className="w-full p-2 border rounded-lg mt-1"
//                     />
//                 </div>
//             </div>

//             {/* Vendor */}
//             <div>
//                 <label className="block text-sm font-medium text-gray-600">
//                     Vendor (যেখান থেকে কেনা হয়েছে)
//                 </label>
//                 <input
//                     type="text"
//                     name="vendor"
//                     value={formData.vendor}
//                     onChange={(e) =>
//                         setFormData({ ...formData, vendor: e.target.value })
//                     }
//                     className="w-full p-2 border rounded-lg mt-1"
//                 />
//             </div>

//             {/* Submit Button with Spinner */}
//             <button
//                 type="submit"
//                 disabled={isSubmitting}
//                 className={`w-full py-2 font-medium rounded-lg text-white flex justify-center items-center gap-2 ${
//                     isSubmitting
//                         ? "bg-gray-400 cursor-not-allowed"
//                         : "bg-amber-500 hover:bg-amber-600"
//                 }`}
//             >
//                 {isSubmitting && (
//                     <svg
//                         className="animate-spin h-5 w-5 text-white"
//                         xmlns="http://www.w3.org/2000/svg"
//                         fill="none"
//                         viewBox="0 0 24 24"
//                     >
//                         <circle
//                             className="opacity-25"
//                             cx="12"
//                             cy="12"
//                             r="10"
//                             stroke="currentColor"
//                             strokeWidth="4"
//                         ></circle>
//                         <path
//                             className="opacity-75"
//                             fill="currentColor"
//                             d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
//                         ></path>
//                     </svg>
//                 )}
//                 {isSubmitting ? "Uploading..." : "Save Product"}
//             </button>
//         </form>
//     );
// }





import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ProductForm() {
    const navigate = useNavigate();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [dragActive, setDragActive] = useState(false);

    const [formData, setFormData] = useState({
        title: "",
        images: [],
        description: "",
        category: "",
        subcategory: "",
        pricing: "",
        discountsPrice: "",
        discountsPercentage: "",
        for: "male",
        stock: "",
        rating: "",
        vars: [],
        vendor: "",
        reviews: [],
    });

    async function handleSubmit(e) {
        e.preventDefault();
        if (isSubmitting) return;
        setIsSubmitting(true);

        const data = new FormData();

        Object.entries(formData).forEach(([key, value]) => {
            if (key === "images") {
                value.forEach((file) => data.append("images", file));
            } else {
                data.append(key, value);
            }
        });

        try {
            const res = await fetch(import.meta.env.VITE_API_URL + "/product", {
                method: "POST",
                body: data,
            });

            if (res.ok) {
                navigate("/admin/products");
            } else {
                console.error("Upload failed:", res.status);
            }
        } catch (error) {
            console.error("Error uploading product:", error);
        } finally {
            setIsSubmitting(false);
        }
    }

    const handleDrag = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === "dragenter" || e.type === "dragover") {
            setDragActive(true);
        } else if (e.type === "dragleave") {
            setDragActive(false);
        }
    };

    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            setFormData({
                ...formData,
                images: [...formData.images, ...Array.from(e.dataTransfer.files)],
            });
        }
    };

    const removeImage = (index) => {
        setFormData({
            ...formData,
            images: formData.images.filter((_, i) => i !== index),
        });
    };

    const calculatedDiscount =
        formData.pricing && formData.discountsPercentage
            ? Math.ceil(
                  formData.pricing -
                      (formData.discountsPercentage / 100) * formData.pricing
              )
            : "";

    return (
        <div className="min-h-screen bg-slate-50 p-4 sm:p-6 lg:p-8">
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-2xl sm:text-3xl font-bold text-slate-800">
                        Add New Product
                    </h1>
                    <p className="text-slate-500 mt-1">
                        Fill in the details below to add a new product to your store
                    </p>
                </div>

                <form onSubmit={handleSubmit} encType="multipart/form-data">
                    {/* Image Upload Section */}
                    <div className="bg-white rounded-2xl border border-slate-200 p-6 mb-6">
                        <h2 className="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
                            <svg className="w-5 h-5 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            Product Images
                        </h2>

                        <div
                            onDragEnter={handleDrag}
                            onDragLeave={handleDrag}
                            onDragOver={handleDrag}
                            onDrop={handleDrop}
                            className={`relative border-2 border-dashed rounded-xl p-8 text-center transition-all duration-200 ${
                                dragActive
                                    ? "border-amber-500 bg-amber-50"
                                    : "border-slate-300 hover:border-amber-400 hover:bg-slate-50"
                            }`}
                        >
                            <input
                                type="file"
                                name="images"
                                accept="image/*"
                                multiple
                                required={formData.images.length === 0}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        images: [...formData.images, ...Array.from(e.target.files)],
                                    })
                                }
                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                            />
                            <div className="flex flex-col items-center gap-3">
                                <div className="w-14 h-14 bg-amber-100 rounded-full flex items-center justify-center">
                                    <svg className="w-7 h-7 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                                    </svg>
                                </div>
                                <div>
                                    <p className="text-slate-700 font-medium">
                                        Drag and drop your images here
                                    </p>
                                    <p className="text-slate-400 text-sm mt-1">
                                        or click to browse from your device
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Image Preview Grid */}
                        {formData.images.length > 0 && (
                            <div className="mt-4 grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3">
                                {formData.images.map((img, idx) => (
                                    <div key={idx} className="relative group aspect-square">
                                        <img
                                            src={URL.createObjectURL(img)}
                                            alt={`preview-${idx}`}
                                            className="w-full h-full object-cover rounded-lg border border-slate-200"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => removeImage(idx)}
                                            className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-lg"
                                        >
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                            </svg>
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Basic Information */}
                    <div className="bg-white rounded-2xl border border-slate-200 p-6 mb-6">
                        <h2 className="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
                            <svg className="w-5 h-5 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            Basic Information
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
                                    onChange={(e) =>
                                        setFormData({ ...formData, title: e.target.value })
                                    }
                                    placeholder="Enter product title"
                                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
                                    required
                                />
                            </div>

                            {/* Description */}
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-2">
                                    Description
                                    <span className="text-red-400 text-xs ml-2 font-normal">
                                        (End each line with a period &quot;.&quot;)
                                    </span>
                                </label>
                                <textarea
                                    name="description"
                                    rows="4"
                                    value={formData.description}
                                    onChange={(e) =>
                                        setFormData({
                                            ...formData,
                                            description: e.target.value,
                                        })
                                    }
                                    placeholder="Describe your product in detail..."
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
                                            onChange={(e) =>
                                                setFormData({
                                                    ...formData,
                                                    category: e.target.value,
                                                })
                                            }
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
                                        placeholder="Casual, Elegant, Cozy..."
                                        onChange={(e) =>
                                            setFormData({
                                                ...formData,
                                                subcategory: e.target.value,
                                            })
                                        }
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

                    {/* Pricing Section */}
                    <div className="bg-white rounded-2xl border border-slate-200 p-6 mb-6">
                        <h2 className="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
                            <svg className="w-5 h-5 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            Pricing
                        </h2>

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-2">
                                    Original Price
                                </label>
                                <div className="relative">
                                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-medium">
                                        ৳
                                    </span>
                                    <input
                                        type="number"
                                        name="pricing"
                                        value={formData.pricing}
                                        onChange={(e) =>
                                            setFormData({
                                                ...formData,
                                                pricing: e.target.value,
                                            })
                                        }
                                        placeholder="0"
                                        className="w-full pl-8 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent no-spinner"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-2">
                                    Discount %
                                </label>
                                <div className="relative">
                                    <input
                                        type="number"
                                        name="discountsPercentage"
                                        value={formData.discountsPercentage}
                                        onChange={(e) =>
                                            setFormData({
                                                ...formData,
                                                discountsPercentage: e.target.value,
                                            })
                                        }
                                        placeholder="0"
                                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent no-spinner"
                                    />
                                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 font-medium">
                                        %
                                    </span>
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-2">
                                    Final Price
                                </label>
                                <div className="relative">
                                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-medium">
                                        ৳
                                    </span>
                                    <input
                                        readOnly
                                        type="number"
                                        value={calculatedDiscount}
                                        placeholder="Auto-calculated"
                                        className="w-full pl-8 pr-4 py-3 bg-green-50 border border-green-200 rounded-xl text-green-700 font-semibold cursor-not-allowed"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Inventory Section */}
                    <div className="bg-white rounded-2xl border border-slate-200 p-6 mb-6">
                        <h2 className="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
                            <svg className="w-5 h-5 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                            </svg>
                            Inventory & Rating
                        </h2>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-2">
                                    Stock Quantity
                                </label>
                                <input
                                    type="number"
                                    name="stock"
                                    value={formData.stock}
                                    onChange={(e) =>
                                        setFormData({ ...formData, stock: e.target.value })
                                    }
                                    placeholder="Enter available quantity"
                                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent no-spinner"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-2">
                                    Rating (0-5)
                                </label>
                                <div className="relative">
                                    <input
                                        type="number"
                                        min="0"
                                        max="5"
                                        step="0.1"
                                        name="rating"
                                        value={formData.rating}
                                        onChange={(e) =>
                                            setFormData({ ...formData, rating: e.target.value })
                                        }
                                        placeholder="4.5"
                                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent no-spinner"
                                    />
                                    <svg className="w-5 h-5 text-amber-400 absolute right-4 top-1/2 -translate-y-1/2" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                                    </svg>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Vendor Section */}
                    <div className="bg-white rounded-2xl border border-slate-200 p-6 mb-6">
                        <h2 className="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
                            <svg className="w-5 h-5 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                            </svg>
                            Vendor Information
                        </h2>

                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">
                                Vendor / Source
                                <span className="text-slate-400 text-xs ml-2 font-normal">
                                    (Where was this product purchased from?)
                                </span>
                            </label>
                            <input
                                type="text"
                                name="vendor"
                                value={formData.vendor}
                                onChange={(e) =>
                                    setFormData({ ...formData, vendor: e.target.value })
                                }
                                placeholder="Enter vendor or supplier name"
                                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
                            />
                        </div>
                    </div>

                    {/* Submit Button */}
                    <div className="flex flex-col sm:flex-row gap-4">
                        <button
                            type="button"
                            onClick={() => navigate(-1)}
                            className="flex-1 sm:flex-none px-8 py-3.5 bg-slate-100 text-slate-700 font-medium rounded-xl hover:bg-slate-200 transition-all"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className={`flex-1 py-3.5 font-semibold rounded-xl text-white flex justify-center items-center gap-2 transition-all ${
                                isSubmitting
                                    ? "bg-slate-400 cursor-not-allowed"
                                    : "bg-amber-500 hover:bg-amber-600 shadow-lg shadow-amber-500/30 hover:shadow-amber-500/40"
                            }`}
                        >
                            {isSubmitting && (
                                <svg
                                    className="animate-spin h-5 w-5 text-white"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                >
                                    <circle
                                        className="opacity-25"
                                        cx="12"
                                        cy="12"
                                        r="10"
                                        stroke="currentColor"
                                        strokeWidth="4"
                                    ></circle>
                                    <path
                                        className="opacity-75"
                                        fill="currentColor"
                                        d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                                    ></path>
                                </svg>
                            )}
                            {isSubmitting ? "Saving Product..." : "Save Product"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
