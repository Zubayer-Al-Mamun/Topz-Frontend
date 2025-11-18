import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ProductForm() {
    const navigate = useNavigate();
    const [isSubmitting, setIsSubmitting] = useState(false);

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
                console.log("Product uploaded successfully!");
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

    console.log(formData.image);
    return (
        <form
            onSubmit={handleSubmit}
            encType="multipart/form-data"
            className="max-w-2xl mx-auto bg-white shadow-lg p-6 rounded-xl space-y-6"
        >
            <h2 className="text-xl font-semibold">Add Product</h2>

            {/* Image Upload */}
            <div>
                <label className="block text-sm font-medium text-gray-600">
                    Product Image
                </label>
                <input
                    type="file"
                    name="images"
                    accept="image/*"
                    multiple 
                    required
                    onChange={(e) =>
                        setFormData({
                            ...formData,
                            images: Array.from(e.target.files),
                        })
                    }
                    className="w-full p-2 border rounded-lg mt-1"
                />
                {formData.images.length > 0 && (
                    <div className="flex gap-2 mt-2 flex-wrap">
                        {formData.images.map((img, idx) => (
                            <img
                                key={idx}
                                src={URL.createObjectURL(img)}
                                alt={`preview-${idx}`}
                                className="w-24 h-24 object-cover rounded border"
                            />
                        ))}
                    </div>
                )}
            </div>

            {/* Title */}
            <div>
                <label className="block text-sm font-medium text-gray-600">
                    Product Title
                </label>
                <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={(e) =>
                        setFormData({ ...formData, title: e.target.value })
                    }
                    className="w-full p-2 border rounded-lg mt-1"
                    required
                />
            </div>

            {/* Description */}
            <div>
                <label className="block text-sm font-medium text-gray-600">
                    Description (
                    <b className="text-red-400">
                        প্রত্যেক লাইন শেষে "Full Stop" / "." ব্যবহার করতে হবে
                    </b>
                    )
                </label>
                <textarea
                    name="description"
                    rows="3"
                    value={formData.description}
                    onChange={(e) =>
                        setFormData({
                            ...formData,
                            description: e.target.value,
                        })
                    }
                    className="w-full p-2 border rounded-lg mt-1"
                />
            </div>

            {/* Category & Subcategory */}
            <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1">
                    <label className="block text-sm font-medium text-gray-600">
                        Category
                    </label>
                    <select
                        name="category"
                        value={formData.category}
                        onChange={(e) =>
                            setFormData({
                                ...formData,
                                category: e.target.value,
                            })
                        }
                        className="w-full p-2 border rounded-lg mt-1"
                    >
                        <option value="">Select Category</option>
                        <option value="hoodie">Hoodie</option>
                        <option value="t-shirt">T-Shirt</option>
                        <option value="shirt">Shirt</option>
                        <option value="drop-shoulder">Drop Shoulder</option>
                    </select>
                </div>

                <div className="flex-1">
                    <label className="block text-sm font-medium text-gray-600">
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
                        className="w-full p-2 border rounded-lg mt-1"
                    />
                </div>
            </div>

            {/* Pricing */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                    <label className="block text-sm font-medium text-gray-600">
                        Price
                    </label>
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
                        className="w-full p-2 border rounded-lg mt-1"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-600">
                        Discount %
                    </label>
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
                        className="w-full p-2 border rounded-lg mt-1"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-600">
                        Discount Price
                    </label>
                    <input
                        readOnly
                        type="number"
                        value={
                            formData.pricing && formData.discountsPercentage
                                ? Math.ceil(
                                      formData.pricing -
                                          (formData.discountsPercentage / 100) *
                                              formData.pricing
                                  )
                                : ""
                        }
                        className="w-full p-2 border rounded-lg mt-1"
                    />
                </div>
            </div>

            {/* For (Gender) */}
            <div>
                <label className="block text-sm font-medium text-gray-600">
                    For
                </label>
                <select
                    name="for"
                    value={formData.for}
                    onChange={(e) =>
                        setFormData({ ...formData, for: e.target.value })
                    }
                    className="w-full p-2 border rounded-lg mt-1"
                >
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="kids">Kids</option>
                </select>
            </div>

            {/* Stock & Rating */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium text-gray-600">
                        Stock
                    </label>
                    <input
                        type="number"
                        name="stock"
                        value={formData.stock}
                        onChange={(e) =>
                            setFormData({ ...formData, stock: e.target.value })
                        }
                        className="w-full p-2 border rounded-lg mt-1"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-600">
                        Rating
                    </label>
                    <input
                        type="number"
                        min="0"
                        max="5"
                        name="rating"
                        value={formData.rating}
                        onChange={(e) =>
                            setFormData({ ...formData, rating: e.target.value })
                        }
                        className="w-full p-2 border rounded-lg mt-1"
                    />
                </div>
            </div>

            {/* Vendor */}
            <div>
                <label className="block text-sm font-medium text-gray-600">
                    Vendor (যেখান থেকে কেনা হয়েছে)
                </label>
                <input
                    type="text"
                    name="vendor"
                    value={formData.vendor}
                    onChange={(e) =>
                        setFormData({ ...formData, vendor: e.target.value })
                    }
                    className="w-full p-2 border rounded-lg mt-1"
                />
            </div>

            {/* Submit Button with Spinner */}
            <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full py-2 font-medium rounded-lg text-white flex justify-center items-center gap-2 ${
                    isSubmitting
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-amber-500 hover:bg-amber-600"
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
                {isSubmitting ? "Uploading..." : "Save Product"}
            </button>
        </form>
    );
}
