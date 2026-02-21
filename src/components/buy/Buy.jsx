import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { useLoaderData } from "react-router-dom";
import blue_check from "../../assets/check.png";
import CrossBlack from "../../assets/cross_black.svg";
import { pushDataLayer } from "../../utils/datalayer";
import { saveNewAddress } from "../../utils/saveAddress";
import ImageCarousel from "./ImageCarousel";
import ShippingAddress2 from "./ShippingAddress2";

export default function Buy() {
    const product = useLoaderData();
    const pushedRef = useRef(false);
    const [images, setImages] = useState(product.images);
    let discountsPrice = Math.ceil(product.pricing * (1 - product.discountsPercentage / 100));

    // const [selectedColor, setSelectedColor] = useState({});
    const [newAddress, setNewAddress] = useState(null);
    const [customerDetails, setCustomerDetails] = useState({
        name: "",
        phone: "",
        village: "",
        union: "",
        upazila: "",
        district: "",
        division: "",
        landmark: "",
        addressFull: ""
    })

    const [saveAddresses, setSaveAddresses] = useState(() => {
        try {
            return JSON.parse(localStorage.getItem("user_addresses")) || {};
        } catch {
            return null;
        }
    });



    const handleBuyNow = () => {

        console.log(customerDetails, "click 'Place Order' button");
        saveNewAddress(customerDetails);
    }



    const [order, setOrder] = useState({

        customerDetails: {
            name: "",
            phone: "",
            village: "",
            union: "",
            upazila: "",
            district: "",
            division: "",
            landmark: "",
            addressFull: ""
        },

        items: [

        ],
        productId: product._id,
        imageUrl: product.imageUrl,

        paymentMethod: "cod",
        status: "pending",
        note: ""
    });


    const handleColor = (v) => {
        console.log(v);

        order.items.filter((col) => col.color === v.color).length ? setOrder({
            ...order, items: order.items.filter(col => col.
                color != v.color)
        })
            :
            setOrder({
                ...order, items: [...order.items, {
                    color: v.color, qty: 1, imageUrl: v.imageUrl,
                    _id: v._id, productId: product._id, colorCode: v.colorCode, selectedSize: null, s: v.s, m: v.m, l: v.l, xl: v.xl, xxl: v.xxl
                }]
            })
    }

    const handleQty = (color, type) => {
        setOrder(prev => ({
            ...prev,
            items: prev.items.map(item =>
                item.color === color
                    ? {
                        ...item,
                        qty: type === "inc"
                            ? item.qty + 1
                            : item.qty > 1
                                ? item.qty - 1
                                : 1
                    }
                    : item
            )
        }));
    };


    const handleSize = (color, size) => {
        console.log(color, size);
        setOrder(prev => ({
            ...prev,
            items: prev.items.map(item =>
                item.color === color.color
                    ? {
                        ...item,
                        selectedSize: size,
                    } : item,
            )
        }))
    }

    console.log(order);

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
                <div className="p-2  md-h-[100vh] md:overflow-y-scroll no-scrollbar">
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
                                    {discountsPrice}
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

                    <div className="sm:py-4">
                        {
                            product.vars.length > 0 && (
                                <>
                                    <h1 className="font-semibold text-xl py-2 border-t border-gray-500 mt-4">
                                        Color Family {order.items.length < 1 && <p className="text-red-500 text-[12px]">(আপনার পছন্দের কালারটি বাছাই করুন)</p>}
                                    </h1>

                                    <div className="flex w-full gap-2 overflow-x-auto scroll-bar-bg">
                                        {product.vars.map((v, idx) => (
                                            <div
                                                onClick={() => handleColor(v)}
                                                key={idx}
                                                className={`cursor-pointer rounded-lg text-center shrink-0 border-2 ${order.items.some(c => c.color === v.color) ? "border-2 border-[#f85506] " : "border-gray-300"} transform transition-all duration-150 active:scale-95 active:translate-y-1`}
                                            >
                                                <img
                                                    className="w-16 h-16 object-cover rounded-lg"
                                                    src={v.imageUrl[0]}
                                                    alt=""
                                                />
                                                <p>{v.color}</p>
                                            </div>
                                        )
                                        )}
                                    </div>
                                </>
                            )
                        }


                    </div>



                    {
                        (order.items.length > 0) && <div className="border-gray-500 pb-4">
                            <h1 className="font-semibold text-xl py-2 border-t border-gray-500">
                                Size and Quantity
                            </h1>
                            <div className="md:h-[40vh]">
                                {
                                    order.items.map((c, idx) => (
                                        <motion.div
                                            className={`border-2 mt-2 ${c.selectedSize !== null ? "border-blue-400" : "border-red-400"} rounded flex justify-between items-center px-2 py-1 relative`}
                                            initial={{ scale: 0.8, opacity: 0 }} // শুরুতে ছোট এবং অদৃশ্য
                                            whileInView={{ scale: 1, opacity: 1 }} // view-এ আসলে বড় এবং দেখা যাবে
                                            viewport={{ once: true, amount: 0.2 }} // screen-এ 50% দেখলে animation হবে, একবারই
                                            transition={{ duration: 0.5, ease: "easeOut" }}
                                            key={idx}>

                                            <div
                                                onClick={() => handleColor(c)}
                                                className="absolute -top-1 right-0 w-7 h-7 flex justify-center items-center cursor-pointer transform transition-all duration-150 active:scale-120"><img className="w-5" src={CrossBlack} alt="" /></div>

                                            <div className="text-center">
                                                <img
                                                    className="w-16 h-16 object-cover rounded-lg"
                                                    src={c.imageUrl[0]}
                                                    alt=""
                                                />
                                                <p className="">{c.color}</p>
                                            </div>

                                            <div className="flex">
                                                <div className=" flex mr-2 text-[13px] relative">


                                                    {!c.selectedSize && (
                                                        <motion.div
                                                            className="absolute w-35 -top-5 right-0 text-red-600 font-bold"
                                                            initial={{ opacity: 0 }}
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
                                                            সঠিক সাইজ নির্বাচন করুন
                                                        </motion.div>
                                                    )}

                                                    {
                                                        c.s > 0 && <div
                                                            onClick={() => handleSize(c, "s")}
                                                            className={`border-gray-600 ${c.selectedSize === "s" && "bg-[#f85506] border-white text-white font-semibold"} mr-1 border w-7 h-7 flex justify-center items-center text-[13px] cursor-pointer transform transition-all duration-150 active:scale-120`}> S </div>
                                                    }

                                                    {
                                                        c.m > 0 && <div
                                                            onClick={() => handleSize(c, "m")}
                                                            className={`border-gray-600 ${c.selectedSize === "m" && "bg-[#f85506] border-white text-white font-semibold"} mr-1 border w-7 h-7 flex justify-center items-center text-[13px] cursor-pointer transform transition-all duration-150 active:scale-120`}> M </div>
                                                    }

                                                    {
                                                        c.l > 0 && <div onClick={() => handleSize(c, "l")}
                                                            className={`border-gray-600 ${c.selectedSize === "l" && "bg-[#f85506] border-white text-white font-semibold"} mr-1 border w-7 h-7 flex justify-center items-center text-[13px] cursor-pointer transform transition-all duration-150 active:scale-120`}> L </div>
                                                    }
                                                    {
                                                        c.xl > 0 && <div onClick={() => handleSize(c, "xl")}
                                                            className={`border-gray-600 ${c.selectedSize === "xl" && "bg-[#f85506] border-white text-white font-semibold"} mr-1 border w-7 h-7 flex justify-center items-center text-[13px] cursor-pointer transform transition-all duration-150 active:scale-120`}> XL </div>
                                                    }
                                                    {
                                                        c.xxl > 0 && <div onClick={() => handleSize(c, "xxl")}
                                                            className={`border-gray-600 ${c.selectedSize === "xxl" && "bg-[#f85506] border-white text-white font-semibold"} mr-1 border w-7 h-7 flex justify-center items-center text-[13px] cursor-pointer transform transition-all duration-150 active:scale-120`}> XXl </div>
                                                    }


                                                </div>

                                                <div className="flex">
                                                    <div className="border border-gray-600 w-7 h-7 text-3xl flex rounded-full justify-center items-center cursor-pointer transform transition-all duration-150 active:scale-120"
                                                        onClick={() => handleQty(c.color, "dec")}
                                                    >
                                                        -
                                                    </div>

                                                    <input
                                                        type="number"
                                                        min="1"
                                                        value={c.qty}
                                                        onChange={(e) => {
                                                            const value = Number(e.target.value);

                                                            setOrder(prev => ({
                                                                ...prev,
                                                                items: prev.items.map(item =>
                                                                    item.color === c.color
                                                                        ? { ...item, qty: value < 1 ? 1 : value }
                                                                        : item
                                                                )
                                                            }));
                                                        }}
                                                        className="w-7 h-7 text-center border-gray-600 border rounded-md outline-none mx-1 no-spinner"
                                                    />
                                                    {/* <span className="w-7 h-7 flex justify-center items-center">
                                                        {c.qty}
                                                    </span> */}
                                                    <div className="border border-gray-600 w-7 h-7 text-2xl flex rounded-full justify-center items-center cursor-pointer  transform transition-all duration-150 active:scale-120"
                                                        onClick={() => handleQty(c.color, "inc")}
                                                    >
                                                        +
                                                    </div>
                                                </div>
                                            </div>
                                        </motion.div>

                                    ))
                                }
                            </div>
                        </div>
                    }
                </div>

                {/* RIGHT */}
                <div className="px-2 md-h-[100vh] md:overflow-y-scroll">





                    {/* {
                        (newAddress || saveAddresses.length < 1) ? <ShippingAddress address={customerDetails} setAddress={setCustomerDetails} /> : ""
                    } */}

                    {
                        (newAddress || saveAddresses.phone == null) ? <ShippingAddress2 order={order} setOrder={setOrder} /> : ""
                    }

                    {
                        (saveAddresses.phone != null && !newAddress) && <div className="">

                            <div className="flex justify-between">
                                <h1 className="font-semibold py-2 border-gray-500 mt-4">
                                    Select Shipping Address
                                </h1>
                                <button className="border border-[#f85506] text-[14px] p-1 my-4 cursor-pointer"
                                    onClick={() => {
                                        setCustomerDetails({
                                            name: "",
                                            phone: "",
                                            village: "",
                                            union: "",
                                            upazila: "",
                                            district: "",
                                            division: "",
                                            landmark: ""
                                        })
                                        setNewAddress(true)
                                    }}
                                >+ Add Address</button>
                            </div>

                            {

                                saveAddresses.map((addr, idx) => addr.addressFull == null ? (
                                    <div key={idx} className="bg-red border mb-2 text-[#1b1818] p-2 relative cursor-pointer "
                                        onClick={() => setCustomerDetails({ ...addr })}
                                    >
                                        {customerDetails.village === addr.village && customerDetails.phone === addr.phone && customerDetails.name === addr.name && customerDetails.union === addr.union ? <div className="absolute top-0 right-0 m-2 p-1 border rounded-full bg-white"> <img src={blue_check} className="h-3 w-3" alt="" /></div> : <div className="absolute top-0 right-0 m-2 p-1 border rounded-full h-5 w-5"></div>}
                                        <div className="flex flex-col">
                                            <span className="font-bold">{addr.name} </span>
                                            <span className="font-semibold "> {addr.phone}</span>
                                        </div>
                                        <p className="text-[14px]">{addr.village}, {addr.union}, {addr.upazila}, {addr.district}, {addr.division}</p>

                                    </div>
                                ) : (<div key={idx} className="bg-red border mb-2 text-[#1b1818] p-2 relative cursor-pointer ">
                                    {addr.addressFull}
                                    {addr.name}
                                    {addr.phone}

                                </div>))
                            }
                        </div>
                    }
                    <div className="md:hidden h-15"></div>
                    <div className="bg-[#b7bdc5] flex justify-center items-center md:py-1 max-md:shadow-lg max-md:fixed max-md:bottom-0 right-0 left-0 py-1 ">





                        {/* <button
                            onClick={handleBuyNow}
                            className="md:mx-2  w-[80%] text-[20px] py-2 font-bold text-white  border h-full bg-[#f85506] border-gray-400 px-6 rounded-lg hover:text-[#f85506] hover:border-[#f85506] hover:bg-gray-100 transition"
                        >
                            Place Order
                        </button> */}


                        {
                            (customerDetails.phone && customerDetails.union && customerDetails.village && customerDetails.name) ? <button
                                onClick={handleBuyNow}
                                className="md:mx-2  w-[80%] text-[20px] py-2 font-bold text-white  border h-full bg-[#f85506] border-gray-400 px-6 rounded-lg hover:text-[#f85506] hover:border-[#f85506] hover:bg-gray-100 transition"
                            >
                                Place Order
                            </button> : <button
                                onClick={handleBuyNow}
                                className="md:mx-2  w-[80%] text-[20px] py-2 font-bold text-white  border h-full bg-[#f85506] border-gray-400 px-6 rounded-lg hover:text-[#f85506] hover:border-[#f85506] hover:bg-gray-100 transition cursor-not-allowed"
                            >
                                Place Order
                            </button>
                        }

                    </div>
                </div>
            </div>
        </div>
    );
}