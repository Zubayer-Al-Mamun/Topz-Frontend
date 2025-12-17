import { useState } from "react";

export default function ImagePreview({ setFullImage, images }) {
    const [selected, setSelected] = useState(images[0]);

    return (
        <div className="">
            {/* Main Image */}
            <div className="" onClick={() => setFullImage(selected)}>
                <img
                    src={selected}
                    alt="Selected"
                    className="w-[200px] h-[200px] object-cover "
                />
            </div>

            {/* Thumbnails */}
            <div className="w-full flex flex-wrap overflow-y-hidden relative">
                <div className="h-5 w-5"></div>
                {images.map((img, idx) => (
                    <button
                        key={idx}
                        onClick={() => setSelected(img)}
                        className={`h-15 w-15 border-2 rounded-lg overflow-hidden ${
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
            {/* <div className="flex gap-2 max-sm:h-[280px] md:w-[350px]  overflow-x-hidden md:overflow-y-hidden  flex-col sm:flex-row mr-2 py-2">
                {images.map((img, idx) => (
                    <button
                        key={idx}
                        onClick={() => setSelected(img)}
                        className={`flex-shrink-0 w-17 h-17 border rounded-lg overflow-hidden ${
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
            </div> */}
        </div>
    );
}
