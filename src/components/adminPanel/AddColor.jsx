import { useState } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";

export default function VariantForm() {
    const product = useLoaderData();
    const navigate = useNavigate();

    const [isSubmitting, setIsSubmitting] = useState(true);
    const [dragActive, setDragActive] = useState(false);

    const [vars, setVars] = useState({
        color: "",
        colorCode: "#11224E",
        sizes: {
            s: 0,
            m: 0,
            l: 0,
            xl: 0,
            xxl: 0,
        },
        images: [],
    });

    let totalStock = Object.values(vars.sizes).reduce(
        (sum, v) => sum + Number(v),
        0
    );

    const handleSubmit = async (e) => {
        if (!isSubmitting) return;
        setIsSubmitting(false);

        e.preventDefault();

        const varsForm = new FormData();
        varsForm.append("_id", product._id);

        Object.entries(vars).forEach(([key, value]) => {
            if (key !== "images") {
                if (key !== "sizes") {
                    varsForm.append(key, value);
                } else {
                    varsForm.append("sizes", JSON.stringify(vars.sizes));
                }
            } else if (key === "images") {
                value.map((imgFile) => {
                    varsForm.append(vars.color, imgFile);
                });
            }
        });

        for (let [key, value] of varsForm.entries()) {
            console.log(key, " : ", value);
        }

        console.log(vars);

        await fetch(`${import.meta.env.VITE_API_URL}/addColor`, {
            method: "post",
            body: varsForm,
        });

        navigate("/admin/products");
    };

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
            setVars({
                ...vars,
                images: [...vars.images, ...Array.from(e.dataTransfer.files)],
            });
        }
    };

    const removeImage = (index) => {
        setVars({
            ...vars,
            images: vars.images.filter((_, i) => i !== index),
        });
    };

    const canSubmit = totalStock > 0 && vars.color.trim() !== "" && vars.images.length > 0;
    const isFormValid = canSubmit && isSubmitting;

    return (
        <div className="min-h-screen bg-slate-50 p-4 sm:p-6 lg:p-8">
            <div className="max-w-3xl mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-2xl sm:text-3xl font-bold text-slate-800">
                        Add Product Variant
                    </h1>
                    <p className="text-slate-500 mt-1">
                        Add color variant with sizes and images for your product
                    </p>
                </div>

                <form encType="multipart/form-data">
                    {/* Color Selection Section */}
                    <div className="bg-white rounded-2xl border border-slate-200 p-6 mb-6">
                        <h2 className="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
                            <svg className="w-5 h-5 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                            </svg>
                            Color Details
                        </h2>

                        <div className="flex flex-col sm:flex-row gap-4">
                            {/* Color Picker */}
                            <div className="flex-shrink-0">
                                <label className="block text-sm font-medium text-slate-700 mb-2">
                                    Pick Color
                                </label>
                                <div className="relative">
                                    <input
                                        type="color"
                                        value={vars.colorCode}
                                        onChange={(e) => {
                                            setVars({
                                                ...vars,
                                                colorCode: e.target.value,
                                            });
                                        }}
                                        className="w-16 h-16 p-1 rounded-xl border-2 border-slate-200 cursor-pointer hover:border-amber-400 transition-colors"
                                    />
                                    <div 
                                        className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full border-2 border-white shadow-md"
                                        style={{ backgroundColor: vars.colorCode }}
                                    />
                                </div>
                            </div>

                            {/* Color Name Input */}
                            <div className="flex-1">
                                <label className="block text-sm font-medium text-slate-700 mb-2">
                                    Color Name <span className="text-red-500">*</span>
                                </label>
                                <input
                                    value={vars.color}
                                    onChange={(e) => {
                                        setVars({
                                            ...vars,
                                            color: e.target.value,
                                        });
                                    }}
                                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
                                    placeholder="e.g., Navy Blue, Coral Red..."
                                    required
                                />
                                <p className="mt-2 text-xs text-slate-400">
                                    Selected: <span className="font-mono font-medium" style={{ color: vars.colorCode }}>{vars.colorCode}</span>
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Sizes & Stock Section */}
                    <div className="bg-white rounded-2xl border border-slate-200 p-6 mb-6">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-lg font-semibold text-slate-800 flex items-center gap-2">
                                <svg className="w-5 h-5 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
                                </svg>
                                Size Inventory
                            </h2>
                            <div className="flex items-center gap-2 bg-amber-50 px-3 py-1.5 rounded-full">
                                <svg className="w-4 h-4 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                                </svg>
                                <span className="text-sm font-semibold text-amber-700">
                                    Total: {totalStock}
                                </span>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                            {["s", "m", "l", "xl", "xxl"].map((sz) => (
                                <div key={sz} className="relative group">
                                    <label className="block text-xs font-bold uppercase text-slate-500 mb-2 text-center">
                                        {sz}
                                    </label>
                                    <input
                                        type="number"
                                        min={0}
                                        value={vars.sizes[sz]}
                                        onChange={(e) => {
                                            setVars({
                                                ...vars,
                                                sizes: {
                                                    ...vars.sizes,
                                                    [sz]: e.target.value,
                                                },
                                            });
                                        }}
                                        className="w-full px-3 py-3 bg-slate-50 border border-slate-200 rounded-xl text-center text-lg font-semibold focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all no-spinner"
                                    />
                                    {Number(vars.sizes[sz]) > 0 && (
                                        <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white" />
                                    )}
                                </div>
                            ))}
                        </div>

                        <p className="mt-4 text-xs text-slate-400 text-center">
                            Enter stock quantity for each size
                        </p>
                    </div>

                    {/* Image Upload Section */}
                    <div className="bg-white rounded-2xl border border-slate-200 p-6 mb-6">
                        <h2 className="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
                            <svg className="w-5 h-5 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            Variant Images
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
                                multiple
                                onChange={(e) => {
                                    setVars({
                                        ...vars,
                                        images: [...vars.images, ...Array.from(e.target.files)],
                                    });
                                }}
                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                accept="image/*"
                            />
                            <div className="flex flex-col items-center gap-3">
                                <div className="w-14 h-14 bg-amber-100 rounded-full flex items-center justify-center">
                                    <svg className="w-7 h-7 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                                    </svg>
                                </div>
                                <div>
                                    <p className="text-slate-700 font-medium">
                                        Drag and drop images here
                                    </p>
                                    <p className="text-slate-400 text-sm mt-1">
                                        or click to browse from your device
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Image Preview Grid */}
                        {vars.images.length > 0 && (
                            <div className="mt-4">
                                <div className="flex items-center justify-between mb-3">
                                    <p className="text-sm font-medium text-slate-600">
                                        {vars.images.length} image{vars.images.length > 1 ? 's' : ''} selected
                                    </p>
                                    <button
                                        type="button"
                                        onClick={() => setVars({ ...vars, images: [] })}
                                        className="text-xs text-red-500 hover:text-red-700 font-medium"
                                    >
                                        Remove all
                                    </button>
                                </div>
                                <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3">
                                    {vars.images.map((img, idx) => (
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
                            </div>
                        )}
                    </div>

                    {/* Submit Section */}
                    <div className="bg-white rounded-2xl border border-slate-200 p-6">
                        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                            {/* Summary */}
                            <div className="flex flex-wrap items-center gap-3">
                                {vars.color && (
                                    <div className="flex items-center gap-2 bg-slate-100 px-3 py-1.5 rounded-full">
                                        <div 
                                            className="w-4 h-4 rounded-full border border-slate-300"
                                            style={{ backgroundColor: vars.colorCode }}
                                        />
                                        <span className="text-sm font-medium text-slate-700">{vars.color}</span>
                                    </div>
                                )}
                                {totalStock > 0 && (
                                    <div className="flex items-center gap-2 bg-green-100 px-3 py-1.5 rounded-full">
                                        <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                        <span className="text-sm font-medium text-green-700">{totalStock} in stock</span>
                                    </div>
                                )}
                                {vars.images.length > 0 && (
                                    <div className="flex items-center gap-2 bg-blue-100 px-3 py-1.5 rounded-full">
                                        <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                        </svg>
                                        <span className="text-sm font-medium text-blue-700">{vars.images.length} images</span>
                                    </div>
                                )}
                            </div>

                            {/* Submit Button */}
                            {isFormValid ? (
                                <button
                                    type="button"
                                    onClick={handleSubmit}
                                    className="w-full sm:w-auto px-8 py-3 bg-amber-500 hover:bg-amber-600 text-white font-semibold rounded-xl shadow-lg shadow-amber-500/30 transition-all duration-200 flex items-center justify-center gap-2"
                                >
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                    Save Variant
                                </button>
                            ) : (
                                <button
                                    type="button"
                                    disabled
                                    className="w-full sm:w-auto px-8 py-3 bg-slate-200 text-slate-400 font-semibold rounded-xl cursor-not-allowed flex items-center justify-center gap-2"
                                >
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                    </svg>
                                    Save Variant
                                </button>
                            )}
                        </div>

                        {!canSubmit && (
                            <div className="mt-4 p-3 bg-amber-50 border border-amber-200 rounded-xl">
                                <p className="text-sm text-amber-700 flex items-start gap-2">
                                    <svg className="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    <span>
                                        Required: {vars.color.trim() === "" && "Color name"}{vars.color.trim() === "" && totalStock === 0 && ", "}{totalStock === 0 && "At least one size with stock"}{(vars.color.trim() === "" || totalStock === 0) && vars.images.length === 0 && ", "}{vars.images.length === 0 && "At least one image"}
                                    </span>
                                </p>
                            </div>
                        )}
                    </div>
                </form>
            </div>

            <style>{`
                .no-spinner::-webkit-outer-spin-button,
                .no-spinner::-webkit-inner-spin-button {
                    -webkit-appearance: none;
                    margin: 0;
                }
                .no-spinner[type=number] {
                    -moz-appearance: textfield;
                }
            `}</style>
        </div>
    );
}










// import { useState } from "react";
// import { useLoaderData } from "react-router-dom";

// export default function VariantForm() {
//     const product = useLoaderData();
//     // console.log(product._id);

//     const [isSubmitting, setIsSubmitting] = useState(true);

//     const [vars, setVars] = useState({
//         color: "",
//         colorCode: "#11224E",
//         sizes: {
//             s: 0,
//             m: 0,
//             l: 0,
//             xl: 0,
//             xxl: 0,
//         },
//         pricing: 0,
//         images: [],
//     });

//     let totalStock = Object.values(vars.sizes).reduce(
//         (sum, v) => sum + Number(v),
//         0
//     );

//     const handleSubmit = async (e) => {
//         if(!isSubmitting) return;
//         setIsSubmitting(false);

//         e.preventDefault();

//         const varsForm = new FormData();
//         varsForm.append("_id", product._id);

//         Object.entries(vars).forEach(([key, value]) => {
//             if (key !== "images") {
//                 if (key !== "sizes") {
//                     varsForm.append(key, value);
//                 } else {
//                     varsForm.append("sizes", JSON.stringify(vars.sizes));
//                 }
//             } else if (key === "images") {
//                 value.map((imgFile) => {
//                     varsForm.append(vars.color, imgFile);
//                 });
//             }
//         });

//         for (let [key, value] of varsForm.entries()) {
//             console.log(key, " : ", value);
//         }

//         // console.log(varsForm,"\n ........");
//         console.log(vars);

//         await fetch(`${import.meta.env.VITE_API_URL}/addColor`, {
//             method: "post",
//             body: varsForm,
//         });
//     };

//     return (
//         <form
//             className="max-w-3xl mx-auto p-4 bg-white rounded-lg shadow"
//             encType="multipart/form-data"
//         >
//             <h3 className="text-lg font-medium mb-4">Variant Input</h3>

//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 <div>
//                     <label className="block text-sm">
//                         Select Color & type Color Name
//                     </label>
//                     <div className="flex gap-2 mt-1">
//                         <input
//                             type="color"
//                             value={vars.colorCode}
//                             onChange={(e) => {
//                                 // setIsSubmitting(true);
//                                 setVars({
//                                     ...vars,
//                                     colorCode: e.target.value,
//                                 });
//                             }}
//                             className="w-12 h-10 p-0 rounded border"
//                         />
//                         <input
//                             value={vars.color}
//                             onChange={(e) => {
//                                 setVars({
//                                     ...vars,
//                                     color: e.target.value,
//                                 });
//                             }}
//                             className={`flex-1 border rounded p-2 bg-amber-200`}
//                             placeholder="Type color name.."
//                             required
//                         />
//                     </div>
//                 </div>

//                 <div className="md:col-span-2">
//                     <label className="block text-sm mb-2">Sizes (stock)</label>
//                     <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
//                         {["s", "m", "l", "xl", "xxl"].map((sz) => (
//                             <div key={sz}>
//                                 <label className="block text-xs uppercase">
//                                     {sz}
//                                 </label>
//                                 <input
//                                     type="number"
//                                     min={0}
//                                     value={vars.sizes[sz]}
//                                     onChange={(e) => {
//                                         setVars({
//                                             ...vars,
//                                             sizes: {
//                                                 ...vars.sizes,
//                                                 [sz]: e.target.value,
//                                             },
//                                         });
//                                     }}
//                                     className="mt-1 w-full border rounded p-2"
//                                 />
//                             </div>
//                         ))}
//                     </div>
//                 </div>

//                 <div>
//                     <label className="block text-sm">Pricing</label>
//                     <input
//                         type="number"
//                         min={0}
//                         value={vars.pricing}
//                         onChange={(e) => {
//                             setVars({
//                                 ...vars,
//                                 pricing: e.target.value,
//                             });
//                         }}
//                         className="mt-1 w-full border rounded p-2"
//                         placeholder="Price.."
//                     />
//                 </div>

//                 <div className="md:col-span-2">
//                     <label className="block text-sm mb-2">Upload Images</label>

//                     <input
//                         type="file"
//                         multiple
//                         onChange={(e) => {
//                             setVars({
//                                 ...vars,
//                                 images: Array.from(e.target.files),
//                             });
//                         }}
//                         className="border p-2 rounded w-[100px]"
//                         accept="image/*"
//                     />

//                     <div className="flex flex-wrap gap-3 mt-3">
//                         {vars.images.map((img, idx) => (
//                             <img
//                                 key={idx}
//                                 src={URL.createObjectURL(img)}
//                                 className="w-24 h-24 object-cover rounded border"
//                             />
//                         ))}
//                     </div>
//                 </div>
//             </div>

//             <div className="mt-4 flex justify-between items-center">
//                 <div className="text-sm">Total stock : {totalStock}</div>

//                 {totalStock > 0 && vars.color !== "" && vars.images.length && isSubmitting ? (
//                     <button
//                         onClick={handleSubmit}
//                         className="cursor-pointer px-4 py-2 bg-blue-600 text-white rounded"
//                     >
//                         Save
//                     </button>
//                 ) : (
//                     <span
//                         className=" cursor-not-allowed px-4 py-2 bg-blue-300 text-white rounded"
//                     >
//                         Save
//                     </span>
//                 )}
//             </div>
//         </form>
//     );
// }













// import { useState } from "react";
// import { useLoaderData } from "react-router-dom";

// export default function VariantForm() {
//     const product = useLoaderData();
//     // console.log(product._id);

//     const [isSubmitting, setIsSubmitting] = useState(true);

//     const [vars, setVars] = useState({
//         color: "",
//         colorCode: "#11224E",
//         sizes: {
//             s: 0,
//             m: 0,
//             l: 0,
//             xl: 0,
//             xxl: 0,
//         },
//         images: [],
//     });

//     let totalStock = Object.values(vars.sizes).reduce(
//         (sum, v) => sum + Number(v),
//         0
//     );

//     const handleSubmit = async (e) => {
//         if(!isSubmitting) return;
//         setIsSubmitting(false);

//         e.preventDefault();

//         const varsForm = new FormData();
//         varsForm.append("_id", product._id);

//         Object.entries(vars).forEach(([key, value]) => {
//             if (key !== "images") {
//                 if (key !== "sizes") {
//                     varsForm.append(key, value);
//                 } else {
//                     varsForm.append("sizes", JSON.stringify(vars.sizes));
//                 }
//             } else if (key === "images") {
//                 value.map((imgFile) => {
//                     varsForm.append(vars.color, imgFile);
//                 });
//             }
//         });

//         for (let [key, value] of varsForm.entries()) {
//             console.log(key, " : ", value);
//         }

//         // console.log(varsForm,"\n ........");
//         console.log(vars);

//         await fetch(`${import.meta.env.VITE_API_URL}/addColor`, {
//             method: "post",
//             body: varsForm,
//         });
//     };

//     return (
//         <form
//             className="max-w-3xl mx-auto p-4 bg-white rounded-lg shadow"
//             encType="multipart/form-data"
//         >
//             <h3 className="text-lg font-medium mb-4">Variant Input</h3>

//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 <div>
//                     <label className="block text-sm">
//                         Select Color & type Color Name
//                     </label>
//                     <div className="flex gap-2 mt-1">
//                         <input
//                             type="color"
//                             value={vars.colorCode}
//                             onChange={(e) => {
//                                 // setIsSubmitting(true);
//                                 setVars({
//                                     ...vars,
//                                     colorCode: e.target.value,
//                                 });
//                             }}
//                             className="w-12 h-10 p-0 rounded border"
//                         />
//                         <input
//                             value={vars.color}
//                             onChange={(e) => {
//                                 setVars({
//                                     ...vars,
//                                     color: e.target.value,
//                                 });
//                             }}
//                             className={`flex-1 border rounded p-2 bg-amber-200`}
//                             placeholder="Type color name.."
//                             required
//                         />
//                     </div>
//                 </div>

//                 <div className="md:col-span-2">
//                     <label className="block text-sm mb-2">Sizes (stock)</label>
//                     <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
//                         {["s", "m", "l", "xl", "xxl"].map((sz) => (
//                             <div key={sz}>
//                                 <label className="block text-xs uppercase">
//                                     {sz}
//                                 </label>
//                                 <input
//                                     type="number"
//                                     min={0}
//                                     value={vars.sizes[sz]}
//                                     onChange={(e) => {
//                                         setVars({
//                                             ...vars,
//                                             sizes: {
//                                                 ...vars.sizes,
//                                                 [sz]: e.target.value,
//                                             },
//                                         });
//                                     }}
//                                     className="mt-1 w-full border rounded p-2"
//                                 />
//                             </div>
//                         ))}
//                     </div>
//                 </div>



//                 <div className="md:col-span-2">
//                     <label className="block text-sm mb-2">Upload Images</label>

//                     <input
//                         type="file"
//                         multiple
//                         onChange={(e) => {
//                             setVars({
//                                 ...vars,
//                                 images: Array.from(e.target.files),
//                             });
//                         }}
//                         className="border p-2 rounded w-[100px]"
//                         accept="image/*"
//                     />

//                     <div className="flex flex-wrap gap-3 mt-3">
//                         {vars.images.map((img, idx) => (
//                             <img
//                                 key={idx}
//                                 src={URL.createObjectURL(img)}
//                                 className="w-24 h-24 object-cover rounded border"
//                             />
//                         ))}
//                     </div>
//                 </div>
//             </div>

//             <div className="mt-4 flex justify-between items-center">
//                 <div className="text-sm">Total stock : {totalStock}</div>

//                 {totalStock > 0 && vars.color !== "" && vars.images.length && isSubmitting ? (
//                     <button
//                         onClick={handleSubmit}
//                         className="cursor-pointer px-4 py-2 bg-blue-600 text-white rounded"
//                     >
//                         Save
//                     </button>
//                 ) : (
//                     <span
//                         className=" cursor-not-allowed px-4 py-2 bg-blue-300 text-white rounded"
//                     >
//                         Save
//                     </span>
//                 )}
//             </div>
//         </form>
//     );
// }
