import { useState, useEffect, useRef } from "react";
import ReactCrop from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";

export default function Setup() {
    const [banners, setBanners] = useState([]);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [editingBanner, setEditingBanner] = useState(null);

    // Image cropping states
    const [selectedFile, setSelectedFile] = useState(null);
    const [imageSrc, setImageSrc] = useState(null);
    const [crop, setCrop] = useState(null);
    const [completedCrop, setCompletedCrop] = useState(null);
    const [croppedImageUrl, setCroppedImageUrl] = useState(null);
    const [showCropper, setShowCropper] = useState(false);
    const imgRef = useRef(null);

    const [formData, setFormData] = useState({
        title: "",
        redirectType: "internal",
        redirectUrl: "",
        isActive: true,
        order: 1,
    });

    // 16:9 aspect ratio
    const ASPECT_RATIO = 16 / 9;

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
            redirectType: "internal",
            redirectUrl: "",
            isActive: true,
            order: 1,
        });
        setEditingBanner(null);
        setSelectedFile(null);
        setImageSrc(null);
        setCrop(null);
        setCompletedCrop(null);
        setCroppedImageUrl(null);
        setShowCropper(false);
    }

    // Handle file selection
    function handleFileChange(e) {
        const file = e.target.files?.[0];
        if (!file) return;

        setSelectedFile(file);
        const reader = new FileReader();
        reader.onload = () => {
            setImageSrc(reader.result);
            setShowCropper(true);
            setCroppedImageUrl(null);
        };
        reader.readAsDataURL(file);
    }

    // When image loads, set initial crop to center with 16:9 ratio
    function onImageLoad(e) {
        const { width, height } = e.currentTarget;
        
        // Calculate crop dimensions maintaining 16:9 aspect ratio
        let cropWidth = width;
        let cropHeight = width / ASPECT_RATIO;

        if (cropHeight > height) {
            cropHeight = height;
            cropWidth = height * ASPECT_RATIO;
        }

        const cropX = (width - cropWidth) / 2;
        const cropY = (height - cropHeight) / 2;

        const initialCrop = {
            unit: "px",
            x: cropX,
            y: cropY,
            width: cropWidth,
            height: cropHeight,
        };

        setCrop(initialCrop);
        setCompletedCrop(initialCrop);
    }

    // Generate cropped image
    function getCroppedImg() {
        if (!imgRef.current || !completedCrop) return;

        const image = imgRef.current;
        const canvas = document.createElement("canvas");
        const scaleX = image.naturalWidth / image.width;
        const scaleY = image.naturalHeight / image.height;

        canvas.width = completedCrop.width * scaleX;
        canvas.height = completedCrop.height * scaleY;

        const ctx = canvas.getContext("2d");
        ctx.drawImage(
            image,
            completedCrop.x * scaleX,
            completedCrop.y * scaleY,
            completedCrop.width * scaleX,
            completedCrop.height * scaleY,
            0,
            0,
            canvas.width,
            canvas.height
        );

        // Convert to blob and create URL
        canvas.toBlob(
            (blob) => {
                if (blob) {
                    const croppedUrl = URL.createObjectURL(blob);
                    setCroppedImageUrl(croppedUrl);
                    setShowCropper(false);
                }
            },
            "image/jpeg",
            0.95
        );
    }

    // Convert cropped image URL to File for upload
    async function getCroppedFile() {
        if (!imgRef.current || !completedCrop) return null;

        const image = imgRef.current;
        const canvas = document.createElement("canvas");
        const scaleX = image.naturalWidth / image.width;
        const scaleY = image.naturalHeight / image.height;

        canvas.width = completedCrop.width * scaleX;
        canvas.height = completedCrop.height * scaleY;

        const ctx = canvas.getContext("2d");
        ctx.drawImage(
            image,
            completedCrop.x * scaleX,
            completedCrop.y * scaleY,
            completedCrop.width * scaleX,
            completedCrop.height * scaleY,
            0,
            0,
            canvas.width,
            canvas.height
        );

        return new Promise((resolve) => {
            canvas.toBlob(
                (blob) => {
                    if (blob) {
                        const file = new File(
                            [blob],
                            selectedFile?.name || "banner.jpg",
                            { type: "image/jpeg" }
                        );
                        resolve(file);
                    } else {
                        resolve(null);
                    }
                },
                "image/jpeg",
                0.95
            );
        });
    }

    async function handleSubmit(e) {
        e.preventDefault();
        if (isSubmitting) return;

        // Validate image
        if (!croppedImageUrl && !editingBanner) {
            alert("Please select and crop an image");
            return;
        }

        setIsSubmitting(true);

        try {
            const submitData = new FormData();
            submitData.append("title", formData.title);
            submitData.append("redirectType", formData.redirectType);
            submitData.append("redirectUrl", formData.redirectUrl);
            submitData.append("isActive", formData.isActive);
            submitData.append("order", formData.order);

            // Add cropped image if available
            if (croppedImageUrl && imgRef.current && completedCrop) {
                const croppedFile = await getCroppedFile();
                if (croppedFile) {
                    submitData.append("image", croppedFile);
                }
            }

            const url = editingBanner
                ? `${import.meta.env.VITE_API_URL}/banners/${editingBanner._id}`
                : `${import.meta.env.VITE_API_URL}/banners`;

            const method = editingBanner ? "PUT" : "POST";

            const res = await fetch(url, {
                method,
                body: submitData,
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
            redirectType: banner.redirectType,
            redirectUrl: banner.redirectUrl,
            isActive: banner.isActive,
            order: banner.order,
        });
        setEditingBanner(banner);
        setCroppedImageUrl(banner.imageUrl);
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

                {/* Image Upload */}
                <div>
                    <label className="block text-sm font-medium text-gray-600 mb-2">
                        Banner Image (16:9 ratio)
                    </label>

                    {/* File Input */}
                    <div className="flex items-center gap-4">
                        <label className="cursor-pointer bg-amber-50 hover:bg-amber-100 border-2 border-dashed border-amber-300 rounded-lg px-4 py-3 flex items-center gap-2 transition-colors">
                            <svg
                                className="w-5 h-5 text-amber-600"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                                />
                            </svg>
                            <span className="text-amber-700 font-medium">
                                {selectedFile
                                    ? "Change Image"
                                    : "Select Image"}
                            </span>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleFileChange}
                                className="hidden"
                            />
                        </label>
                        {selectedFile && (
                            <span className="text-sm text-gray-500 truncate max-w-[200px]">
                                {selectedFile.name}
                            </span>
                        )}
                    </div>

                    {/* Cropper Modal */}
                    {showCropper && imageSrc && (
                        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
                            <div className="bg-white rounded-xl p-4 max-w-3xl w-full max-h-[90vh] overflow-auto">
                                <div className="flex items-center justify-between mb-4">
                                    <h3 className="text-lg font-semibold text-gray-800">
                                        Crop Image (16:9)
                                    </h3>
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setShowCropper(false);
                                            setImageSrc(null);
                                            setSelectedFile(null);
                                        }}
                                        className="text-gray-400 hover:text-gray-600"
                                    >
                                        <svg
                                            className="w-6 h-6"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M6 18L18 6M6 6l12 12"
                                            />
                                        </svg>
                                    </button>
                                </div>

                                <div className="flex justify-center bg-gray-100 rounded-lg p-2">
                                    <ReactCrop
                                        crop={crop}
                                        onChange={(c) => setCrop(c)}
                                        onComplete={(c) => setCompletedCrop(c)}
                                        aspect={ASPECT_RATIO}
                                    >
                                        <img
                                            ref={imgRef}
                                            src={imageSrc}
                                            alt="Crop preview"
                                            onLoad={onImageLoad}
                                            className="max-h-[60vh] object-contain"
                                            crossOrigin="anonymous"
                                        />
                                    </ReactCrop>
                                </div>

                                <div className="flex justify-end gap-3 mt-4">
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setShowCropper(false);
                                            setImageSrc(null);
                                            setSelectedFile(null);
                                        }}
                                        className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="button"
                                        onClick={getCroppedImg}
                                        className="px-4 py-2 bg-amber-500 hover:bg-amber-600 text-white rounded-lg font-medium"
                                    >
                                        Apply Crop
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Cropped Image Preview */}
                    {croppedImageUrl && !showCropper && (
                        <div className="mt-3">
                            <p className="text-xs text-gray-500 mb-1">
                                Preview (16:9):
                            </p>
                            <div className="relative inline-block">
                                <img
                                    src={croppedImageUrl}
                                    alt="Cropped banner preview"
                                    className="max-h-40 rounded-lg border object-cover"
                                />
                                <button
                                    type="button"
                                    onClick={() => {
                                        setCroppedImageUrl(null);
                                        setSelectedFile(null);
                                        setImageSrc(null);
                                    }}
                                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center hover:bg-red-600"
                                >
                                    <svg
                                        className="w-4 h-4"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M6 18L18 6M6 6l12 12"
                                        />
                                    </svg>
                                </button>
                            </div>
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
                                    <div className="sm:w-48 h-28 flex-shrink-0">
                                        <img
                                            src={banner.imageUrl}
                                            alt={banner.title}
                                            className="w-full h-full object-cover rounded-lg"
                                            onError={(e) => {
                                                e.target.src =
                                                    "https://via.placeholder.com/200x113?text=No+Image";
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
