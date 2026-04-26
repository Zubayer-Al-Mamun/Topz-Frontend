import { useEffect, useRef, useState } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import CrossBlack from "../../assets/cross_black.svg";
import { pushDataLayer } from "../../utils/datalayer";
import { saveNewAddress } from "../../utils/saveAddress";
import ColorFamily from "./ColorFamily";
import ShippingAddress2 from "./ShippingAddress2";
import SizeAndQty from "./SizeAndQty";
import Subtotal from "./Subtotal";
import TitleAndPrice from "./TitleAndPrice";

import PhoneIcon from "../../assets/phone-1.svg";
import PlaceIcon from "../../assets/place-svgrepo-com.svg";
import ProfileIcon from "../../assets/profile-svgrepo-com.svg";

export default function Buy() {
    const [orderIds, setOrderIds] = useState(() => {
        try {
            return JSON.parse(localStorage.getItem("user_orderIds")) || [];
        } catch {
            return [];
        }
    });
    // console.log(orderIds);
    const navigate = useNavigate();
    const product = useLoaderData();
    const pushedRef = useRef(false);
    const [images, setImages] = useState(product.images);
    let discountsPrice = Math.ceil(
        product.pricing * (1 - product.discountsPercentage / 100),
    );
    let codCharge = product?.codChargeStatus
        ? product.codCharge
        : Number(import.meta.env.VITE_COD_CHARGE);

    // const [selectedColor, setSelectedColor] = useState({});
    const [newAddress, setNewAddress] = useState(null);
    // const [customerDetails, setCustomerDetails] = useState({
    //     name: "",
    //     phone: "",
    //     village: "",
    //     union: "",
    //     upazila: "",
    //     district: "",
    //     division: "",
    //     landmark: "",
    //     addressFull: "",
    // });

    const [saveAddresses, setSaveAddresses] = useState(() => {
        try {
            return JSON.parse(localStorage.getItem("user_addresses")) || {};
        } catch {
            return null;
        }
    });

    // console.log(JSON.parse(localStorage.getItem("user_addresses")));

    const [order, setOrder] = useState(() => ({
        customerDetails: saveAddresses?.phone
            ? saveAddresses
            : {
                  name: "",
                  phone: "",
                  village: "",
                  union: "",
                  upazila: "",
                  district: "",
                  division: "",
                  landmark: "",
                  addressFull: "",
              },

        items: [],
        productId: product._id,
        imageUrl: product.images,
        paymentMethod: "cod",
        status: "pending",
        note: "",
    }));

    console.log(order);
    //    place order Button

    const handleBuyNow = async (orderDetails) => {
        console.log(orderDetails);
        saveNewAddress(orderDetails.customerDetails);

        try {
            const result = await fetch(
                import.meta.env.VITE_API_URL + "/order",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(orderDetails),
                },
            );
            const newOrderId = await result.json();

            await localStorage.setItem(
                "user_orderIds",
                JSON.stringify([...orderIds, newOrderId]),
            );

            if (result.ok) {
                console.log(newOrderId);

                navigate("/orders");
            }
        } catch (error) {
            console.log("error in order creating request", error);
        }
    };

    // useEffect(()=>{
    //     if(product.vars?.length === null) {
    //         setOrder((prev) => ({
    //             ...prev,
    //             items : [{
    //                 imageUrl : prev.imageUrl,
    //                 qty : 1,
    //                 productId : prev._id,
    //                 selectedSize : null,

    //             }]
    //         }) )
    //     }
    // },[product])

    const handleColor = (v) => {
        // console.log(v);

        order.items.filter((col) => col.color === v.color).length
            ? setOrder({
                  ...order,
                  items: order.items.filter((col) => col.color != v.color),
              })
            : setOrder({
                  ...order,
                  items: [
                      ...order.items,
                      {
                          color: v.color,
                          qty: 1,
                          imageUrl: v.imageUrl,
                          _id: v._id,
                          productId: product._id,
                          colorCode: v.colorCode,
                          selectedSize: null,
                          s: v.s,
                          m: v.m,
                          l: v.l,
                          xl: v.xl,
                          xxl: v.xxl,
                      },
                  ],
              });
    };

    useEffect(() => {
        if (!product.vars || product.vars.length === 0) {
            setOrder((prev) => ({
                ...prev,
                items: [
                    {
                        productId: product._id,
                        imageUrl: product.images,
                        pricing: product.discountsPrice,
                        qty: 1,
                        selectedSize: "base",
                    },
                ],
            }));
        }
    }, [product]);

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

    const isValidOrder =
        order.customerDetails.phone &&
        order.customerDetails.name &&
        (order.customerDetails.addressFull ||
            order.customerDetails.upazila ||
            order.customerDetails.union);

    const totalPrice =
        order.items.reduce(
            (sum, item) => sum + (item.pricing || discountsPrice) * item.qty,
            0,
        ) + codCharge;

    return (
        <div className="fixed inset-0 z-30 bg-white">
            <div className="w-full h-full overflow-y-auto grid grid-cols-1 md:grid-cols-2 md:p-4 gap-4 lg:px-25">
                {/* LEFT */}
                <div className="p-2 pb-4  md-h-[100vh] md:overflow-y-scroll no-scrollbar">
                    <TitleAndPrice
                        discountsPrice={discountsPrice}
                        product={product}
                        images={images}
                    />
                    <ColorFamily
                        product={product}
                        order={order}
                        handleColor={handleColor}
                    />

                    <SizeAndQty
                        product={product}
                        order={order}
                        handleColor={handleColor}
                        discountsPrice={discountsPrice}
                        setOrder={setOrder}
                    />
                </div>

                {/* RIGHT */}

                {!order.items.find((itm) => itm.selectedSize == null) &&
                    order.items.length > 0 && (
                        <div className="px-2 md-h-[100vh] md:overflow-y-scroll">
                            {/* item SubTotal */}
                            <div className="w-full mt-6">
                                <Subtotal
                                    discountsPrice={discountsPrice}
                                    order={order}
                                    codCharge={codCharge}
                                />
                            </div>

                            {newAddress || saveAddresses.phone == null ? (
                                <ShippingAddress2
                                    order={order}
                                    setOrder={setOrder}
                                />
                            ) : (
                                ""
                            )}

                            {saveAddresses.phone != null && !newAddress && (
                                <div className="">
                                    <div className="flex justify-between">
                                        <h1 className="font-semibold py-1 border-gray-500 mt-4">
                                            পূর্বের ঠিকানা সিলেক্ট হয়েছে
                                        </h1>

                                        <button
                                            className="border border-[#f85506] text-white rounded-md bg-green-500 text-[16px] p-1 my-4 cursor-pointer"
                                            onClick={() => {
                                                setOrder((prev) => ({
                                                    ...prev,
                                                    customerDetails: {
                                                        name: "",
                                                        phone: "",
                                                        village: "",
                                                        union: "",
                                                        upazila: "",
                                                        district: "",
                                                        division: "",
                                                        landmark: "",
                                                        addressFull: "",
                                                    },
                                                }));
                                                setNewAddress(true);
                                            }}
                                        >
                                            + Add New Address
                                        </button>
                                    </div>
                                    <div className=" mb-1 border-2 border-green-400 bg-green-200 p-2 rounded-md flex justify-between">
                                        <div>
                                            <div className="flex items-center my-1">
                                                <img
                                                    className="h-5 w-5 mr-1"
                                                    src={PlaceIcon}
                                                    alt=""
                                                />
                                                {saveAddresses.addressFull ? (
                                                    <p>
                                                        {
                                                            saveAddresses.addressFull
                                                        }
                                                    </p>
                                                ) : (
                                                    <div>
                                                        {`${saveAddresses.village} / ${saveAddresses.union} / ${saveAddresses.upazila} / ${saveAddresses.district} / ${saveAddresses.division}`}
                                                    </div>
                                                )}
                                            </div>

                                            <div className="flex items-center my-1">
                                                <img
                                                    className="h-5 w-5 mr-1"
                                                    src={ProfileIcon}
                                                    alt=""
                                                />
                                                <h1>{saveAddresses.name}</h1>
                                            </div>

                                            <div className="flex items-center my-1">
                                                <img
                                                    className="h-5 w-5 mr-1"
                                                    src={PhoneIcon}
                                                    alt=""
                                                />
                                                <h1>{saveAddresses.phone}</h1>
                                            </div>
                                        </div>
                                        <div
                                            className="flex items-center justify-center h-7 w-7"
                                            onClick={() => {
                                                setOrder((prev) => ({
                                                    ...prev,
                                                    customerDetails: {
                                                        name: "",
                                                        phone: "",
                                                        village: "",
                                                        union: "",
                                                        upazila: "",
                                                        district: "",
                                                        division: "",
                                                        landmark: "",
                                                        addressFull: "",
                                                    },
                                                }));
                                                setNewAddress(true);
                                            }}
                                        >
                                            <img
                                                className="w-4"
                                                src={CrossBlack}
                                                alt=""
                                            />
                                        </div>
                                    </div>
                                </div>
                            )}

                            <div>
                                <label
                                    className="mt-2 text-[18px] pl-1 font-semibold"
                                    htmlFor="note"
                                >
                                    Note (বিশেষ কিছু বলে দিতে পারেন)
                                </label>
                                <textarea
                                    onChange={(event) =>
                                        setOrder({
                                            ...order,
                                            note: event.target.value,
                                        })
                                    }
                                    value={order.note}
                                    placeholder="এটি একটি উপহার বাক্সে পাঠান।"
                                    rows="2"
                                    className="w-full mb-2 px-4 py-3 rounded bg-white border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-400 resize-none"
                                    required
                                    id="note"
                                />
                            </div>

                            <div className="md:hidden h-20"></div>

                            {/* Place Order Button */}
                            <div className="max-md:bg-[#b7bdc5] flex justify-center items-center md:py-1 max-md:shadow-lg max-md:fixed max-md:bottom-0 right-0 left-0 py-1">
                                <button
                                    disabled={!isValidOrder}
                                    onClick={() =>
                                        isValidOrder && handleBuyNow(order)
                                    }
                                    className={`md:mx-2 w-[80%] font-bold border h-full px-6 rounded-lg transition
        ${
            isValidOrder
                ? "text-white bg-[#f85506] border-gray-400 hover:text-[#f85506] hover:border-[#f85506] hover:bg-gray-100"
                : "text-white bg-[#f85506] opacity-50 cursor-not-allowed"
        }`}
                                >
                                    Place Order <br />৳ {totalPrice}
                                </button>
                            </div>
                        </div>
                    )}
            </div>
        </div>
    );
}
