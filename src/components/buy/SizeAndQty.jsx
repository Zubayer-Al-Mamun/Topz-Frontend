import { motion } from "framer-motion";
import { useEffect, useRef } from "react";
import CrossBlack from "../../assets/cross_black.svg";

export default function SizeAndQty({
    product,
    order,
    discountsPrice,
    setOrder,
    handleColor,
}) {
    const lastItemRef = useRef(null);

    const handleQty = (color, type) => {
        setOrder((prev) => ({
            ...prev,
            items: prev.items.map((item) =>
                item.color === color
                    ? {
                          ...item,
                          qty:
                              type === "inc"
                                  ? item.qty + 1
                                  : item.qty > 1
                                    ? item.qty - 1
                                    : 1,
                      }
                    : item,
            ),
        }));
    };

    const handleSize = (color, size) => {
        console.log(color, size);
        setOrder((prev) => ({
            ...prev,
            items: prev.items.map((item) =>
                item.color === color.color
                    ? {
                          ...item,
                          selectedSize: size,
                      }
                    : item,
            ),
        }));
    };

    useEffect(() => {
        lastItemRef.current?.scrollIntoView({
            behavior: "smooth",
            block: "nearest",
        });
    }, [order.items]);

    return (
        <>
            {order?.items?.length && product.vars.length > 0 ? (
                <div className="border-gray-500 pb-4">
                    <h1 className="font-semibold text-xl pt-2 mt-2 border-t">
                        Size and Quantity
                    </h1>

                    <div className="md:h-[40vh]">
                        {order?.items?.map((c, idx) => (
                            <motion.div
                                ref={
                                    idx === order.items.length - 1
                                        ? lastItemRef
                                        : null
                                }
                                key={idx}
                                className={`border-2 mt-2 ${
                                    c?.selectedSize != null
                                        ? "border-green-400 bg-green-200"
                                        : "border-red-400"
                                } rounded flex justify-between px-1 py-1 relative`}
                                initial={{ scale: 0.8, opacity: 0 }}
                                whileInView={{ scale: 1, opacity: 1 }}
                                viewport={{ once: true, amount: 0.2 }}
                                transition={{
                                    duration: 0.5,
                                    ease: "easeOut",
                                }}
                            >
                                <div>
                                    <div className="flex items-center mb-2">
                                        <img
                                            className="w-16 h-16 object-cover rounded-lg"
                                            src={c?.imageUrl?.[0] ?? ""}
                                            alt=""
                                        />
                                        <p className="ml-2 font-semibold">
                                            {c?.color}
                                        </p>
                                    </div>

                                    <div className="flex">
                                        <div className="text-[13px]">
                                            {!c?.selectedSize && (
                                                <motion.div
                                                    className="w-30 ml-1 text-red-600 font-bold"
                                                    initial={{
                                                        opacity: 0,
                                                    }}
                                                    animate={{
                                                        opacity: [1, 0.3, 1],
                                                        scale: [1, 1.05, 1],
                                                    }}
                                                    transition={{
                                                        duration: 2,
                                                        repeat: Infinity,
                                                        ease: "easeInOut",
                                                    }}
                                                >
                                                    সাইজ নির্বাচন করুন
                                                </motion.div>
                                            )}

                                            <div className="flex text-[13px]">
                                                {c?.s > 0 && (
                                                    <div
                                                        onClick={() =>
                                                            handleSize?.(c, "s")
                                                        }
                                                        className={`border-gray-600 ${
                                                            c?.selectedSize ===
                                                                "s" &&
                                                            "bg-green-400 text-white font-semibold"
                                                        } mr-1 border w-7 h-7 flex justify-center items-center text-[13px] cursor-pointer`}
                                                    >
                                                        S
                                                    </div>
                                                )}

                                                {c?.m > 0 && (
                                                    <div
                                                        onClick={() =>
                                                            handleSize?.(c, "m")
                                                        }
                                                        className={`border-gray-600 ${
                                                            c?.selectedSize ===
                                                                "m" &&
                                                            "bg-green-400 text-white font-semibold"
                                                        } mr-1 border w-7 h-7 flex justify-center items-center text-[13px] cursor-pointer`}
                                                    >
                                                        M
                                                    </div>
                                                )}

                                                {c?.l > 0 && (
                                                    <div
                                                        onClick={() =>
                                                            handleSize?.(c, "l")
                                                        }
                                                        className={`border-gray-600 ${
                                                            c?.selectedSize ===
                                                                "l" &&
                                                            "bg-green-400 text-white font-semibold"
                                                        } mr-1 border w-7 h-7 flex justify-center items-center text-[13px] cursor-pointer`}
                                                    >
                                                        L
                                                    </div>
                                                )}

                                                {c?.xl > 0 && (
                                                    <div
                                                        onClick={() =>
                                                            handleSize?.(
                                                                c,
                                                                "xl",
                                                            )
                                                        }
                                                        className={`border-gray-600 ${
                                                            c?.selectedSize ===
                                                                "xl" &&
                                                            "bg-green-400 text-white font-semibold"
                                                        } mr-1 border w-7 h-7 flex justify-center items-center text-[13px] cursor-pointer`}
                                                    >
                                                        XL
                                                    </div>
                                                )}

                                                {c?.xxl > 0 && (
                                                    <div
                                                        onClick={() =>
                                                            handleSize?.(
                                                                c,
                                                                "xxl",
                                                            )
                                                        }
                                                        className={`border-gray-600 ${
                                                            c?.selectedSize ===
                                                                "xxl" &&
                                                            "bg-green-400 text-white font-semibold"
                                                        } mr-1 border w-7 h-7 flex justify-center items-center text-[13px] cursor-pointer`}
                                                    >
                                                        XXL
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex flex-col justify-between">
                                    <div className="flex justify-end">
                                        <div
                                            onClick={() => handleColor?.(c)}
                                            className="w-7 h-7 flex justify-center items-center cursor-pointer"
                                        >
                                            <img
                                                className="w-5"
                                                src={CrossBlack}
                                                alt=""
                                            />
                                        </div>
                                    </div>

                                    <div className="flex justify-end">
                                        <p>
                                            {(c?.pricing ??
                                                discountsPrice ??
                                                0) * (c?.qty ?? 1)}{" "}
                                            ৳
                                        </p>
                                    </div>

                                    <div className="flex">
                                        <div
                                            className="border border-gray-600 w-7 h-7 text-3xl flex rounded-full justify-center items-center cursor-pointer"
                                            onClick={() =>
                                                handleQty?.(c?.color, "dec")
                                            }
                                        >
                                            -
                                        </div>

                                        <input
                                            type="number"
                                            min="1"
                                            value={c?.qty ?? 1}
                                            onChange={(e) => {
                                                const value = Number(
                                                    e.target.value,
                                                );

                                                setOrder?.((prev) => ({
                                                    ...prev,
                                                    items:
                                                        prev?.items?.map(
                                                            (item) =>
                                                                item?.color ===
                                                                c?.color
                                                                    ? {
                                                                          ...item,
                                                                          qty:
                                                                              value <
                                                                              1
                                                                                  ? 1
                                                                                  : value,
                                                                      }
                                                                    : item,
                                                        ) ?? [],
                                                }));
                                            }}
                                            className="w-7 h-7 text-center border-gray-600 border rounded-md outline-none mx-1 no-spinner"
                                        />

                                        <div
                                            className="border border-gray-600 w-7 h-7 text-2xl flex rounded-full justify-center items-center cursor-pointer"
                                            onClick={() =>
                                                handleQty?.(c?.color, "inc")
                                            }
                                        >
                                            +
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            ) : (
                ""
            )}
        </>
    );
}
