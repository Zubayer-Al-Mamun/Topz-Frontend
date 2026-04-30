import { useState } from "react";

export default function ItemCard({ item }) {
    const [imgErr, setImgErr] = useState(false);
    return (
        <a
            href={`/product/${item.productId}`}
            className="shrink-0 w-[58px] border border-gray-200 rounded-lg overflow-hidden"
        >
            {imgErr ? (
                <div className="w-[58px] h-[58px] bg-gray-100 flex items-center justify-center text-xl">
                    📦
                </div>
            ) : (
                <img
                    src={item.imageUrl?.[0]}
                    alt={item.color}
                    onError={() => setImgErr(true)}
                    className="w-[58px] h-[58px] object-cover block"
                />
            )}
            <div className="px-1 py-0.5 text-center">
                <div className="text-[10px] text-gray-500 truncate">
                    {item.color}
                </div>
                <div className="text-[10px] font-semibold text-gray-800">
                    ×{item.qty}
                </div>
            </div>
        </a>
    );
}
