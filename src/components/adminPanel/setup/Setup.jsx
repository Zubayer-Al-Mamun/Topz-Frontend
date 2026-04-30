import { useState, useEffect } from "react";

export default function Setup() {
    const [banners, setBanners] = useState([]);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [editingBanner, setEditingBanner] = useState(null);

    const [formData, setFormData] = useState({
        title: "",
        imageUrl: "",
        redirectType: "internal",
        redirectUrl: "",
        isActive: true,
        order: 1,
    });

    // Fetch banners on mount
    useEffect(() => {
        fetchBanners();
    }, []);

    async function fetchBanners() {
        try {
            const res = await fetch(import.meta.env.VITE_API_URL + "/banners");
            if (res.ok) {
                const data = await res.json();
                setBanners(data);
            }
        } catch (error) {
            console.error("Error fetching banners:", error);
        }
    }

    function resetForm() {
        setFormData({
            title: "",
            imageUrl: "",
            redirectType: "internal",
            redirectUrl: "",
            isActive: true,
            order: 1,
        });
        setEditingBanner(null);
    }

    async function handleSubmit(e) {
        e.preventDefault();
        if (isSubmitting) return;
        setIsSubmitting(true);

        try {
            const url = editingBanner
                ? `${import.meta.env.VITE_API_URL}/banners/${editingBanner._id}`
                : `${import.meta.env.VITE_API_URL}/banners`;

            const method = editingBanner ? "PUT" : "POST";

            const res = await fetch(url, {
                method,
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            if (res.ok) {
                console.log(
                    editingBanner
                        ? "Banner updated successfully!"
                        : "Banner created successfully!"
                );
                resetForm();
                fetchBanners();
            } else {
                console.error("Operation failed:", res.status);
            }
        } catch (error) {
            console.error("Error saving banner:", error);
        } finally {
            setIsSubmitting(false);
        }
    }

    async function handleDelete(id) {
        if (!window.confirm("Are you sure you want to delete this banner?"))
            return;

        try {
            const res = await fetch(
                `${import.meta.env.VITE_API_URL}/banners/${id}`,
                {
                    method: "DELETE",
                }
            );

            if (res.ok) {
                console.log("Banner deleted successfully!");
                fetchBanners();
            } else {
                console.error("Delete failed:", res.status);
            }
        } catch (error) {
            console.error("Error deleting banner:", error);
        }
    }

    async function handleToggleActive(banner) {
        try {
            const res = await fetch(
                `${import.meta.env.VITE_API_URL}/banners/${banner._id}`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        ...banner,
                        isActive: !banner.isActive,
                    }),
                }
            );

            if (res.ok) {
                fetchBanners();
            }
        } catch (error) {
            console.error("Error toggling banner status:", error);
        }
    }

    function handleEdit(banner) {
        setFormData({
            title: banner.title,
            imageUrl: banner.imageUrl,
            redirectType: banner.redirectType,
            redirectUrl: banner.redirectUrl,
            isActive: banner.isActive,
            order: banner.order,
        });
        setEditingBanner(banner);
        window.scrollTo({ top: 0, behavior: "smooth" });
    }

    return (
        <div className="space-y-8">
            {/* Banner Form */}
            <form
                onSubmit={handleSubmit}
                className="max-w-2xl mx-auto bg-white shadow-lg p-6 rounded-xl space-y-6"
            >
                <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold text-gray-800">
                        {editingBanner ? "Edit Banner" : "Add New Banner"}
                    </h2>
                    {editingBanner && (
                        <button
                            type="button"
                            onClick={resetForm}
                            className="text-sm text-gray-500 hover:text-gray-700"
                        >
                            Cancel Edit
                        </button>
                    )}
                </div>

                {/* Title */}
                <div>
                    <label className="block text-sm font-medium text-gray-600">
                        Banner Title
                    </label>
                    <input
                        type="text"
                        value={formData.title}
                        onChange={(e) =>
                            setFormData({ ...formData, title: e.target.value })
                        }
                        placeholder="e.g. Summer Sale"
                        className="w-full p-2 border rounded-lg mt-1 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none"
                        required
                    />
                </div>

                {/* Image URL */}
                <div>
                    <label className="block text-sm font-medium text-gray-600">
                        Image URL
                    </label>
                    <input
                        type="url"
                        value={formData.imageUrl}
                        onChange={(e) =>
                            setFormData({
                                ...formData,
                                imageUrl: e.target.value,
                            })
                        }
                        placeholder="https://example.com/banner.jpg"
                        className="w-full p-2 border rounded-lg mt-1 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none"
                        required
                    />
                    {formData.imageUrl && (
                        <div className="mt-2">
                            <img
                                src={formData.imageUrl}
                                alt="Banner preview"
                                className="max-h-32 rounded-lg border object-cover"
                                onError={(e) => {
                                    e.target.style.display = "none";
                                }}
                            />
                        </div>
                    )}
                </div>

                {/* Redirect Type & URL */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-600">
                            Redirect Type
                        </label>
                        <select
                            value={formData.redirectType}
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    redirectType: e.target.value,
                                })
                            }
                            className="w-full p-2 border rounded-lg mt-1 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none"
                        >
                            <option value="internal">Internal</option>
                            <option value="external">External</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-600">
                            Redirect URL
                        </label>
                        <input
                            type="text"
                            value={formData.redirectUrl}
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    redirectUrl: e.target.value,
                                })
                            }
                            placeholder={
                                formData.redirectType === "internal"
                                    ? "/products/summer"
                                    : "https://example.com"
                            }
                            className="w-full p-2 border rounded-lg mt-1 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none"
                            required
                        />
                    </div>
                </div>

                {/* Order & Active Status */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-600">
                            Display Order
                        </label>
                        <input
                            type="number"
                            min="1"
                            value={formData.order}
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    order: parseInt(e.target.value) || 1,
                                })
                            }
                            className="w-full p-2 border rounded-lg mt-1 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none"
                        />
                    </div>

                    <div className="flex items-center mt-6">
                        <label className="relative inline-flex items-center cursor-pointer">
                            <input
                                type="checkbox"
                                checked={formData.isActive}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        isActive: e.target.checked,
                                    })
                                }
                                className="sr-only peer"
                            />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-amber-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-amber-500"></div>
                            <span className="ml-3 text-sm font-medium text-gray-600">
                                Active
                            </span>
                        </label>
                    </div>
                </div>

                {/* Submit Button */}
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
                    {isSubmitting
                        ? "Saving..."
                        : editingBanner
                        ? "Update Banner"
                        : "Add Banner"}
                </button>
            </form>

            {/* Existing Banners List */}
            <div className="max-w-4xl mx-auto">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">
                    Current Banners ({banners.length})
                </h2>

                {banners.length === 0 ? (
                    <div className="bg-white rounded-xl shadow p-8 text-center text-gray-500">
                        No banners found. Add your first banner above.
                    </div>
                ) : (
                    <div className="space-y-4">
                        {banners
                            .sort((a, b) => a.order - b.order)
                            .map((banner) => (
                                <div
                                    key={banner._id}
                                    className={`bg-white rounded-xl shadow p-4 flex flex-col sm:flex-row gap-4 ${
                                        !banner.isActive ? "opacity-60" : ""
                                    }`}
                                >
                                    {/* Banner Image */}
                                    <div className="sm:w-48 h-32 flex-shrink-0">
                                        <img
                                            src={banner.imageUrl}
                                            alt={banner.title}
                                            className="w-full h-full object-cover rounded-lg"
                                            onError={(e) => {
                                                e.target.src =
                                                    "https://via.placeholder.com/200x100?text=No+Image";
                                            }}
                                        />
                                    </div>

                                    {/* Banner Details */}
                                    <div className="flex-1 flex flex-col justify-between">
                                        <div>
                                            <div className="flex items-center gap-2 mb-1">
                                                <h3 className="font-semibold text-gray-800">
                                                    {banner.title}
                                                </h3>
                                                <span
                                                    className={`text-xs px-2 py-0.5 rounded-full ${
                                                        banner.isActive
                                                            ? "bg-green-100 text-green-700"
                                                            : "bg-gray-100 text-gray-500"
                                                    }`}
                                                >
                                                    {banner.isActive
                                                        ? "Active"
                                                        : "Inactive"}
                                                </span>
                                                <span className="text-xs px-2 py-0.5 rounded-full bg-blue-100 text-blue-700">
                                                    Order: {banner.order}
                                                </span>
                                            </div>
                                            <p className="text-sm text-gray-500 mb-1">
                                                <span className="font-medium">
                                                    Type:
                                                </span>{" "}
                                                {banner.redirectType}
                                            </p>
                                            <p className="text-sm text-gray-500 truncate">
                                                <span className="font-medium">
                                                    URL:
                                                </span>{" "}
                                                {banner.redirectUrl}
                                            </p>
                                        </div>

                                        {/* Actions */}
                                        <div className="flex gap-2 mt-3">
                                            <button
                                                onClick={() =>
                                                    handleToggleActive(banner)
                                                }
                                                className={`px-3 py-1 text-sm rounded-lg ${
                                                    banner.isActive
                                                        ? "bg-gray-100 text-gray-600 hover:bg-gray-200"
                                                        : "bg-green-100 text-green-700 hover:bg-green-200"
                                                }`}
                                            >
                                                {banner.isActive
                                                    ? "Deactivate"
                                                    : "Activate"}
                                            </button>
                                            <button
                                                onClick={() =>
                                                    handleEdit(banner)
                                                }
                                                className="px-3 py-1 text-sm rounded-lg bg-blue-100 text-blue-700 hover:bg-blue-200"
                                            >
                                                Edit
                                            </button>
                                            <button
                                                onClick={() =>
                                                    handleDelete(banner._id)
                                                }
                                                className="px-3 py-1 text-sm rounded-lg bg-red-100 text-red-700 hover:bg-red-200"
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                    </div>
                )}
            </div>
        </div>
    );
}
