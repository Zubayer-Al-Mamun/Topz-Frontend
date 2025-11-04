import { useState } from "react";

export default function ImagePreview({ images }) {
    const [selected, setSelected] = useState(images[0]);

    return (
        <div className="max-sm:w-full bg-green-200">
            {/* Main Image */}
            <div className="w-full aspect-square mb-4 rounded-lg overflow-hidden flex items-center justify-center bg-gray-100">
                <img
                    src={selected}
                    alt="Selected"
                    className="object-cover w-full h-full"
                />
            </div>

            {/* Thumbnails */}
            <div className="flex gap-2 overflow-y-hidden">
                {images.map((img, idx) => (
                    <button
                        key={idx}
                        onClick={() => setSelected(img)}
                        className={`flex-shrink-0 w-20 h-20 border rounded-lg overflow-hidden ${
                            selected === img
                                ? "border-blue-500"
                                : "border-gray-300"
                        }`}
                    >
                        <img
                            src={img}
                            alt={`thumb-${idx}`}
                            className="object-cover w-full h-full"
                        />
                    </button>
                ))}
            </div>
        </div>
    );
}
