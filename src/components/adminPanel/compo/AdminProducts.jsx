// import { Link, useLoaderData, useNavigate } from "react-router-dom";

// export default function AdminProducts() {
//     const products = useLoaderData();
//     const navigate = useNavigate();


//     const handleDelete = async (product_id) => {
//         try {
//             const result = await fetch(`${import.meta.env.VITE_API_URL}/products/${product_id}`, {
//                 method: "DELETE",
//             })

//             const data = await result.json();
//             console.log(data);

//             if(!result.ok){
//                 throw new Error(`${product_id} deleting failed`)
//             }

//             navigate("/admin/products");

//         }catch(err){
//             console.log(err.message, err);
//         }
//     }

//     return (
//         // <div>this is products page</div>
//         <div className="overflow-y-scroll">
//             <div className="m-2 border-b p-2 flex items-center">
//                 <Link to="/admin/newproduct" className="p-2 bg-[#51a2ff] rounded-md hover:bg-indigo-100 ">Add Product</Link>
//                 <div className="text-[14px]">
//                     <button className="m-2">DropShoulder</button>
//                     <button className="m-2">T-Shirt</button>
//                     <button className="m-2">Shirt</button>
//                     <button className="m-2">hoddie</button>
//                 </div>
//             </div>
//             {products.map((product, idx) => (
//                 <div
//                     key={idx}
//                     className=" rounded-l-lg overflow-hidden h-[100px] m-2 shadow-md flex justify-between hover:bg-indigo-100 "
//                 >
//                     <div className="h-full flex">
//                         <img
//                             className="h-[100px] w-[100px] object-cover shrink-0 "
//                             src={product.images[0]}
//                             alt=""
//                         />
//                         <div className="m-2">
//                             <p className="line-clamp-1 font-bold">{product.title}</p>
//                             <p className="font-semibold text-[11px]">Sale : {product.totalSale}</p>
//                             <p className="font-semibold text-[11px]">View : {product.totalView}</p>
//                         </div>
//                     </div>

//                     <div className=" h-full flex items-center text-[11px]">

//                         <button className="p-1 py-2 m-1 border rounded-lg bg-gray-300"
//                             onClick={()=> handleDelete(product._id)}
//                         >Delete</button>

//                         <Link
//                             to={`/admin/products/seecolor/${product._id}`}
//                             className="p-1 py-2 m-1 border rounded-lg bg-gray-300"
//                         >
//                             {" "}
//                             See Color
//                         </Link>
//                         <Link
//                             to={`/admin/products/addcolor/${product._id}`}
//                             className="p-1 py-2 m-1 border rounded-lg bg-gray-300"
//                         >
//                             {" "}
//                             Add Color
//                         </Link>
//                         <Link
//                             to={`/admin/products/${product._id}`}
//                             className="p-1 py-2 m-1 border rounded-lg bg-gray-300">
//                             Edit
//                         </Link>
//                     </div>
//                 </div>
//             ))}
//         </div>
//     );
// }


















import { useState, useEffect, useRef } from "react";
import { Link, useLoaderData, useNavigate } from "react-router-dom";

export default function AdminProducts() {
    const products = useLoaderData();
    const navigate = useNavigate();
    const [activeFilter, setActiveFilter] = useState("all");
    const [searchQuery, setSearchQuery] = useState("");
    const [deletingId, setDeletingId] = useState(null);
    const [openMenuId, setOpenMenuId] = useState(null);
    const [togglingId, setTogglingId] = useState(null);
    const [pendingDelete, setPendingDelete] = useState(null);
    const [countdown, setCountdown] = useState(10);
    const deleteTimerRef = useRef(null);
    const countdownIntervalRef = useRef(null);
    const [productStatuses, setProductStatuses] = useState(() => {
        const statuses = {};
        products.forEach(p => {
            statuses[p._id] = p.isActive !== false;
        });
        return statuses;
    });

    const categories = ["all", "DropShoulder", "T-Shirt", "Shirt", "Hoodie"];

    const filteredProducts = products.filter((product) => {
        const matchesFilter = activeFilter === "all" || product.category === activeFilter;
        const matchesSearch = product.title.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesFilter && matchesSearch;
    });

    const startDeleteCountdown = (product_id) => {
        setPendingDelete(product_id);
        setCountdown(10);
        
        countdownIntervalRef.current = setInterval(() => {
            setCountdown(prev => prev - 1);
        }, 1000);
        
        deleteTimerRef.current = setTimeout(() => {
            executeDelete(product_id);
        }, 5000);
    };

    const cancelDelete = () => {
        if (deleteTimerRef.current) {
            clearTimeout(deleteTimerRef.current);
            deleteTimerRef.current = null;
        }
        if (countdownIntervalRef.current) {
            clearInterval(countdownIntervalRef.current);
            countdownIntervalRef.current = null;
        }
        setPendingDelete(null);
        setCountdown(5);
    };

    const executeDelete = async (product_id) => {
        if (countdownIntervalRef.current) {
            clearInterval(countdownIntervalRef.current);
            countdownIntervalRef.current = null;
        }
        setPendingDelete(null);
        setDeletingId(product_id);
        
        try {
            const result = await fetch(`${import.meta.env.VITE_API_URL}/products/${product_id}`, {
                method: "DELETE",
            });

            const data = await result.json();
            console.log(data);

            if (!result.ok) {
                throw new Error(`${product_id} deleting failed`);
            }

            navigate("/admin/products");
        } catch (err) {
            console.log(err.message, err);
        } finally {
            setDeletingId(null);
        }
    };

    useEffect(() => {
        return () => {
            if (deleteTimerRef.current) clearTimeout(deleteTimerRef.current);
            if (countdownIntervalRef.current) clearInterval(countdownIntervalRef.current);
        };
    }, []);

    const handleToggleActive = async (product_id) => {
        setTogglingId(product_id);
        const newStatus = !productStatuses[product_id];
        try {
            const result = await fetch(`${import.meta.env.VITE_API_URL}/products/${product_id}/status`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ isActive: newStatus }),
            });

            if (!result.ok) {
                throw new Error(`Failed to update product status`);
            }

            setProductStatuses(prev => ({
                ...prev,
                [product_id]: newStatus
            }));
        } catch (err) {
            console.log(err.message, err);
        } finally {
            setTogglingId(null);
        }
    };

    const getTotalStock = (product) => {
        if (!product.vars || product.vars.length === 0) return 0;
        return product.vars.reduce((total, variant) => {
            const sizes = variant.sizes || {};
            return total + Object.values(sizes).reduce((sum, qty) => sum + (Number(qty) || 0), 0);
        }, 0);
    };

    return (
        <div className="h-full overflow-y-auto bg-slate-50 p-6">
            {/* Header Section */}
            <div className="mb-6">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
                    <div>
                        <h1 className="text-2xl font-bold text-slate-800">Products</h1>
                        <p className="text-sm text-slate-500 mt-1">
                            {filteredProducts.length} product{filteredProducts.length !== 1 ? "s" : ""} found
                        </p>
                    </div>
                    <Link
                        to="/admin/newproduct"
                        className="inline-flex items-center gap-2 px-5 py-2.5 bg-amber-500 hover:bg-amber-600 text-white font-medium rounded-xl transition-colors shadow-sm"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                        </svg>
                        Add Product
                    </Link>
                </div>

                {/* Search and Filter Bar */}
                <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-sm">
                    <div className="flex flex-col lg:flex-row gap-4">
                        {/* Search Input */}
                        <div className="relative flex-1">
                            <svg
                                className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                />
                            </svg>
                            <input
                                type="text"
                                placeholder="Search products..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent text-sm"
                            />
                        </div>

                        {/* Category Filters */}
                        <div className="flex flex-wrap gap-2">
                            {categories.map((category) => (
                                <button
                                    key={category}
                                    onClick={() => setActiveFilter(category)}
                                    className={`px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
                                        activeFilter === category
                                            ? "bg-amber-500 text-white shadow-sm"
                                            : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                                    }`}
                                >
                                    {category === "all" ? "All" : category}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Products Grid */}
            {filteredProducts.length === 0 ? (
                <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center">
                    <svg
                        className="w-16 h-16 text-slate-300 mx-auto mb-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={1.5}
                            d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                        />
                    </svg>
                    <h3 className="text-lg font-semibold text-slate-700 mb-2">No products found</h3>
                    <p className="text-slate-500 text-sm">Try adjusting your search or filter criteria</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                    {filteredProducts.map((product) => (
                        <div
                            key={product._id}
                            className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow group"
                        >
                            {/* Product Image */}
                            <div className="relative h-48 bg-slate-100 overflow-hidden">
                                <img
                                    src={product.images?.[0] || "/placeholder.jpg"}
                                    alt={product.title}
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                />
                                {/* Category Badge */}
                                {product.category && (
                                    <span className="absolute top-3 left-3 px-3 py-1 bg-white/90 backdrop-blur-sm text-xs font-medium text-slate-700 rounded-lg">
                                        {product.category}
                                    </span>
                                )}
                                {/* 3-Dot Menu Button */}
                                <div className="absolute top-3 right-3 z-10">
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            const rect = e.currentTarget.getBoundingClientRect();
                                            setOpenMenuId(openMenuId === product._id ? null : { id: product._id, top: rect.bottom + 8, right: window.innerWidth - rect.right });
                                        }}
                                        className="p-2 bg-white/90 backdrop-blur-sm rounded-lg hover:bg-white transition-colors shadow-sm"
                                    >
                                        <svg className="w-5 h-5 text-slate-700" fill="currentColor" viewBox="0 0 24 24">
                                            <circle cx="12" cy="5" r="2" />
                                            <circle cx="12" cy="12" r="2" />
                                            <circle cx="12" cy="19" r="2" />
                                        </svg>
                                    </button>
                                </div>
                            </div>

                            {/* Fixed Dropdown Menu - Outside overflow container */}
                            {openMenuId?.id === product._id && (
                                <>
                                    <div className="fixed inset-0 z-50" onClick={() => setOpenMenuId(null)} />
                                    <div 
                                        className="fixed z-50 w-48 bg-white rounded-xl shadow-lg border border-slate-200 overflow-hidden"
                                        style={{ top: openMenuId.top, right: openMenuId.right }}
                                    >
                                        <Link
                                            to={`/admin/products/${product._id}`}
                                            onClick={() => setOpenMenuId(null)}
                                            className="flex items-center gap-3 px-4 py-3 text-sm text-slate-700 hover:bg-slate-50 transition-colors"
                                        >
                                            <svg className="w-4 h-4 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                            </svg>
                                            Edit Product
                                        </Link>
                                        <Link
                                            to={`/admin/products/seecolor/${product._id}`}
                                            onClick={() => setOpenMenuId(null)}
                                            className="flex items-center gap-3 px-4 py-3 text-sm text-slate-700 hover:bg-slate-50 transition-colors"
                                        >
                                            <svg className="w-4 h-4 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                                            </svg>
                                            View Variants
                                        </Link>
                                        <Link
                                            to={`/admin/products/addcolor/${product._id}`}
                                            onClick={() => setOpenMenuId(null)}
                                            className="flex items-center gap-3 px-4 py-3 text-sm text-slate-700 hover:bg-slate-50 transition-colors"
                                        >
                                            <svg className="w-4 h-4 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                            </svg>
                                            Add Variant
                                        </Link>
                                        <div className="border-t border-slate-100" />
                                        <button
                                            onClick={() => {
                                                handleToggleActive(product._id);
                                                setOpenMenuId(null);
                                            }}
                                            disabled={togglingId === product._id}
                                            className={`flex items-center gap-3 w-full px-4 py-3 text-sm transition-colors disabled:opacity-50 ${
                                                productStatuses[product._id]
                                                    ? "text-amber-600 hover:bg-amber-50"
                                                    : "text-green-600 hover:bg-green-50"
                                            }`}
                                        >
                                            {togglingId === product._id ? (
                                                <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                                </svg>
                                            ) : productStatuses[product._id] ? (
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
                                                </svg>
                                            ) : (
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                </svg>
                                            )}
                                            {productStatuses[product._id] ? "Deactivate Product" : "Activate Product"}
                                        </button>
                                        <div className="border-t border-slate-100" />
                                        <button
                                            onClick={() => {
                                                setOpenMenuId(null);
                                                startDeleteCountdown(product._id);
                                            }}
                                            disabled={deletingId === product._id || pendingDelete === product._id}
                                            className="flex items-center gap-3 w-full px-4 py-3 text-sm text-red-600 hover:bg-red-50 transition-colors disabled:opacity-50"
                                        >
                                            {deletingId === product._id ? (
                                                <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                                </svg>
                                            ) : (
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                </svg>
                                            )}
                                            Delete Product
                                        </button>
                                    </div>
                                </>
                            )}

                            {/* Product Info */}
                            <div className="p-4">
                                <h3 className="font-semibold text-slate-800 line-clamp-1 mb-3">
                                    {product.title}
                                </h3>

                                {/* Stats Row */}
                                <div className="flex items-center gap-4 mb-4">
                                    <div className="flex items-center gap-1.5">
                                        <svg className="w-4 h-4 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                        </svg>
                                        <span className="text-xs text-slate-600">{product.totalView || 0}</span>
                                    </div>
                                    <div className="flex items-center gap-1.5">
                                        <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                                        </svg>
                                        <span className="text-xs text-slate-600">{product.totalSale || 0} sold</span>
                                    </div>
                                </div>

                                {/* Variants and Stock Info */}
                                <div className="flex items-center justify-between pt-3 border-t border-slate-100">
                                    <div className="flex items-center gap-2">
                                        {/* Color Swatches */}
                                        {product.vars && product.vars.length > 0 ? (
                                            <div className="flex items-center">
                                                <div className="flex -space-x-1">
                                                    {product.vars.slice(0, 4).map((variant, idx) => (
                                                        <div
                                                            key={idx}
                                                            className="w-5 h-5 rounded-full border-2 border-white shadow-sm"
                                                            style={{ backgroundColor: variant.colorCode || "#ccc" }}
                                                            title={variant.color}
                                                        />
                                                    ))}
                                                </div>
                                                {product.vars.length > 4 && (
                                                    <span className="text-xs text-slate-500 ml-2">
                                                        +{product.vars.length - 4}
                                                    </span>
                                                )}
                                            </div>
                                        ) : (
                                            <span className="text-xs text-slate-400">No variants</span>
                                        )}
                                    </div>

                                    {/* Stock Badge */}
                                    <div className={`px-2.5 py-1 rounded-lg text-xs font-medium ${
                                        getTotalStock(product) > 10
                                            ? "bg-green-50 text-green-700"
                                            : getTotalStock(product) > 0
                                            ? "bg-amber-50 text-amber-700"
                                            : "bg-red-50 text-red-700"
                                    }`}>
                                        {getTotalStock(product)} in stock
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Delete Countdown Toast */}
            {pendingDelete && (
                <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 animate-in slide-in-from-bottom-4 fade-in duration-300">
                    <div className="flex items-center gap-4 px-5 py-4 bg-slate-900 text-white rounded-2xl shadow-xl">
                        <div className="relative w-10 h-10 flex-shrink-0">
                            <svg className="w-10 h-10 -rotate-90" viewBox="0 0 36 36">
                                <circle
                                    cx="18"
                                    cy="18"
                                    r="16"
                                    fill="none"
                                    className="stroke-slate-700"
                                    strokeWidth="3"
                                />
                                <circle
                                    cx="18"
                                    cy="18"
                                    r="16"
                                    fill="none"
                                    className="stroke-red-500"
                                    strokeWidth="3"
                                    strokeDasharray={100}
                                    strokeDashoffset={100 - (countdown / 5) * 100}
                                    strokeLinecap="round"
                                    style={{ transition: "stroke-dashoffset 1s linear" }}
                                />
                            </svg>
                            <span className="absolute inset-0 flex items-center justify-center text-sm font-bold text-red-500">
                                {countdown}
                            </span>
                        </div>
                        <div className="flex-1">
                            <p className="text-sm font-medium">Deleting product...</p>
                            <p className="text-xs text-slate-400">Click cancel to undo</p>
                        </div>
                        <button
                            onClick={cancelDelete}
                            className="px-4 py-2 bg-white text-slate-900 text-sm font-medium rounded-xl hover:bg-slate-100 transition-colors"
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
