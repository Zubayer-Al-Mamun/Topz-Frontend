import { useEffect, useRef, useState } from "react";
import { useLoaderData } from "react-router-dom";
import { pushDataLayer } from "../../utils/datalayer";
import ImageCarousel from "./ImageCarousel";
import ShippingAddress from "./ShippingAddress";

export default function Buy() {
    const product = useLoaderData();
    const pushedRef = useRef(false);

    const [images, setImages] = useState(product.images);

    const [order, setOrder] = useState({
        customer: {
            name: "",
            phone: "",
            email: "",
        },
        shippingAddress: {
            division: "",
            district: "",
            upazila: "",
            union: "",
            village: "",
            landmark: "",
        },
        items: [],
        pricing: {},
        payment: {
            method: "cod",
        },
        status: "pending",
    });



    useEffect(() => {
        if (!product || pushedRef.current) return;

        pushDataLayer({
            event: "begin_checkout",
            ...product,
        });

        pushedRef.current = true;
    }, [product]);

    useEffect(() => {
        const varImages = product.vars.flatMap((v) => v.imageUrl || []);
        setImages([...product.images, ...varImages]);
    }, [product]);

    return (
        <div className="fixed inset-0 z-30 bg-[#293a5256] backdrop-blur-sm">
            <div className="w-full h-full overflow-y-auto grid grid-cols-1 md:grid-cols-2 md:p-4 gap-4 lg:px-25">
                {/* LEFT */}
                <div className="p-2">
                    <div className="flex gap-2 items-center">
                        <div className="rounded-md w-[150px] h-[150px]">
                            <ImageCarousel images={images} />
                        </div>



                        <div className="flex flex-col">

                            <div
                                className="text-[16px] font-bold line-clamp-2"
                            >
                                {product.title}
                            </div>


                            <div className="flex  items-baseline-last gap-2 mb-3">
                                <p className="text-2xl text-red-500 font-bold">
                                    ৳{" "}
                                    {Math.ceil(
                                        product.pricing *
                                        (1 - product.discountsPercentage / 100)
                                    )}
                                </p>
                                <span className="text-[12px] line-through font-semibold text-gray-500">
                                    {" "}
                                    ৳ {product.pricing}
                                </span>
                                <span className="text-[12px] text-red-500 font-semibold rounded-sm bg-red-100 px-1">
                                    {" "}
                                    ৳ -{product.discountsPercentage}%
                                </span>
                            </div>

                        </div>
                        {/* <div className="py-4">
                            <p className="line-clamp-1">{product.title}</p>
                            <p>{product.pricing}</p>
                        </div> */}
                    </div>

                    <div className="sm:p-4 sm:px-6">
                        <h1 className="font-semibold py-2 border-t border-gray-500 mt-4">
                            Select Color
                        </h1>

                        <div className="flex w-full gap-2 overflow-x-scroll no-scrollbar">
                            {product.vars.map((v, idx) => (
                                <div
                                    key={idx}
                                    className="cursor-pointer border border-gray-300 rounded-lg text-center shrink-0"
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

                        <div className="flex justify-between border-t border-gray-500 mt-4 pt-2">
                            <h1>Quantity</h1>
                            <div className="flex">
                                <span className="border border-gray-600 w-7 h-7 flex justify-center items-center">
                                    -
                                </span>
                                <span className="w-7 h-7 flex justify-center items-center">
                                    1
                                </span>
                                <span className="border border-gray-600 w-7 h-7 flex justify-center items-center">
                                    +
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* RIGHT */}
                <div className="p-2">
                    <ShippingAddress
                        address={{
                            ...order.shippingAddress,
                            name: order.customer.name,
                            phone: order.customer.phone,
                        }}
                        setAddress={(addr) =>
                            setOrder((prev) => ({
                                ...prev,
                                customer: {
                                    ...prev.customer,
                                    name: addr.name,
                                    phone: addr.phone,
                                },
                                shippingAddress: {
                                    division: addr.division,
                                    district: addr.district,
                                    upazila: addr.upazila,
                                    union: addr.union,
                                    village: addr.village,
                                    landmark: addr.landmark,
                                },
                            }))
                        }
                    />
                </div>
            </div>
        </div>
    );
}
