export default function ColorFamily({product, order , handleColor}) {
    return (
        <div className="sm:py-4">
            {product.vars.length > 0 && (
                <>
                    <h1 className="font-semibold text-xl py-2 border-t border-gray-500 mt-4">
                        Color Family{" "}
                        {order.items.length < 1 && (
                            <p className="text-red-500 text-[12px]">
                                (আপনার পছন্দের কালারটি বাছাই করুন)
                            </p>
                        )}
                    </h1>

                    <div className="flex w-full gap-2 overflow-x-auto scroll-bar-bg">
                        {product.vars.map((v, idx) => (
                            <div
                                onClick={() => handleColor(v)}
                                key={idx}
                                className={`cursor-pointer rounded-lg text-center shrink-0 border-2 ${order.items.some((c) => c.color === v.color) ? "border-green-500" : "border-gray-300"} transform transition-all duration-150 active:scale-95 active:translate-y-1`}
                            >
                                <img
                                    className="w-16 h-16 object-cover rounded-lg"
                                    src={v.imageUrl[0]}
                                    alt=""
                                />
                                <p>{v.color}</p>
                            </div>
                        ))}
                    </div>
                </>
            )}
        </div>
    );
}
