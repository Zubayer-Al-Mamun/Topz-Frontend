// import { useEffect, useState } from "react";
// import EyeSVG from "../../assets/eye.svg";

// export default function Order() {
//     const [ordersDetails, setOrdersDetails] = useState([]);
//     const [orders] = useState(() => {
//         try {
//             const item = localStorage.getItem("user_orderIds");
//             return item ? JSON.parse(item) : [];
//         } catch (err) {
//             console.log("error", err);
//             return [];
//         }
//     });

//     useEffect(() => {
//         if (!orders.length) return;

//         const query = new URLSearchParams();
//         orders.forEach((order) => query.append("ids", order));

//         fetch(`${import.meta.env.VITE_API_URL}/orders?${query}`)
//             .then((res) => {
//                 if (!res.ok) throw new Error("Network response was not OK");
//                 return res.json();
//             })
//             .then(setOrdersDetails)
//             .catch(console.error);
//     }, [orders]);



//     console.log(ordersDetails);

//     function copyContent(item) {
//         console.log("copy item => ", item);
//         navigator.clipboard.writeText(item).then(() => {
//             alert(`'${item}' Order Id copied`);
//         });
//     }

//     return (
//         <div className="w-full">
//             {ordersDetails.map((orderDetails, idx) => (
//                 <div
//                     key={idx}
//                     className="w-full my-4 px-2 text-[11pt] flex items-center justify-between hover:bg-gray-200 border border-gray-200"
//                 >
//                     <div className="flex items-center">
//                         <div className="w-60 h-35 overflow-y-scroll no-scrollbar flex flex-col justify-between">
//                             <div className="h-[50%]">
//                                 <div className="flex items-center">
//                                     <span className="font-bold">Id :</span>{" "}
//                                     <div
//                                         onClick={() =>
//                                             copyContent(orderDetails._id)
//                                         }
//                                         className="mx-1 cursor-pointer group relative flex"
//                                     >
//                                         {orderDetails._id}
//                                         <div className="hidden group-hover:flex absolute w-45 -bottom-10 bg-gray-400 rounded-md p-2">
//                                             <span className="h-5 w-5 bg-gray-400 absolute rotate-45 -top-1 left-5"></span>
//                                             <span className="z-10 font-semibold">
//                                                 Click to Copy Order ID
//                                             </span>
//                                         </div>
//                                     </div>
//                                 </div>
//                                 <div className="">
//                                     <span className="font-semibold">
//                                         Phone :{" "}
//                                     </span>
//                                     {orderDetails.customerDetails.phone}
//                                 </div>
//                                 <p>
//                                     <b>Address : </b> {orderDetails.customerDetails.addressFull}
//                                 </p>
//                             </div>
//                             <div className="h-[50%">
//                                 <h1> <b>COD : </b> 110</h1>
//                                 <h1> <b>Total : </b> 33354534</h1> 
//                             </div>
//                         </div>

//                         <div className="flex w-35 overflow-x-auto  border-1 border-gray-300 rounded-sm">
//                             {orderDetails.items.map((item) => (
//                                 <a
//                                     href={`/product/${item.productId}`}
//                                     className="flex flex-col items-center border border-gray-200 m-1 hover:bg-blue-200 hover:rounded-md"
//                                 >
//                                     <div className=" group h-15 w-15 relative flex items-center justify-center">
//                                         <img
//                                             className=" group-hover:blur-[3px] h-full w-full object-cover"
//                                             src={item.imageUrl[0]}
//                                         />
//                                         <img
//                                             className="absolute h-10 hidden group-hover:block"
//                                             src={EyeSVG}
//                                             alt=""
//                                         />
//                                     </div>

//                                     <p>{item.color}</p>
//                                     <span>qty : {item.qty}</span>
//                                 </a>
//                             ))}
//                         </div>
//                     </div>

//                     <div className=""></div>
//                 </div>
//             ))}
//         </div>
//     );
// }








import { useEffect, useState } from "react";
import EyeSVG from "../../assets/eye.svg";

// Status pill configuration with colors and labels
const STATUS_CONFIG = {
    pending: {
        label: "Pending",
        bgColor: "bg-yellow-100",
        textColor: "text-yellow-800",
        borderColor: "border-yellow-300",
    },
    processing: {
        label: "Processing",
        bgColor: "bg-blue-100",
        textColor: "text-blue-800",
        borderColor: "border-blue-300",
    },
    shipped: {
        label: "Shipped",
        bgColor: "bg-purple-100",
        textColor: "text-purple-800",
        borderColor: "border-purple-300",
    },
    delivered: {
        label: "Delivered",
        bgColor: "bg-green-100",
        textColor: "text-green-800",
        borderColor: "border-green-300",
    },
    cancelled: {
        label: "Cancelled",
        bgColor: "bg-red-100",
        textColor: "text-red-800",
        borderColor: "border-red-300",
    },
    returned: {
        label: "Returned",
        bgColor: "bg-gray-100",
        textColor: "text-gray-800",
        borderColor: "border-gray-300",
    },
};

function StatusPill({ status }) {
    const config = STATUS_CONFIG[status?.toLowerCase()] || STATUS_CONFIG.pending;

    return (
        <span
            className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold border ${config.bgColor} ${config.textColor} ${config.borderColor}`}
        >
            <span
                className={`w-2 h-2 rounded-full mr-2 ${
                    status === "pending"
                        ? "bg-yellow-500"
                        : status === "processing"
                        ? "bg-blue-500"
                        : status === "shipped"
                        ? "bg-purple-500"
                        : status === "delivered"
                        ? "bg-green-500"
                        : status === "cancelled"
                        ? "bg-red-500"
                        : "bg-gray-500"
                }`}
            ></span>
            {config.label}
        </span>
    );
}

function TrackOrderButton({ trackingId, courierName }) {
    // Common courier tracking URLs
    const getCourierTrackingUrl = (courier, trackingId) => {
        const courierUrls = {
            steadfast: `https://steadfast.com.bd/tracking?consignment_id=${trackingId}`,
            pathao: `https://merchant.pathao.com/tracking?consignment_id=${trackingId}`,
            redx: `https://redx.com.bd/track-parcel?parcelId=${trackingId}`,
            paperfly: `https://go.paperfly.com.bd/merchant/tracking/${trackingId}`,
            sundarban: `https://sundarbancourierltd.com/tracking/${trackingId}`,
            ecourier: `https://ecourier.com.bd/track/?ecr=${trackingId}`,
            default: `https://steadfast.com.bd/tracking?consignment_id=${trackingId}`,
        };

        const normalizedCourier = courier?.toLowerCase()?.trim() || "default";
        return courierUrls[normalizedCourier] || courierUrls.default;
    };

    if (!trackingId) return null;

    const trackingUrl = getCourierTrackingUrl(courierName, trackingId);

    return (
        <a
            href={trackingUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 bg-[#f85506] text-white text-sm font-semibold rounded-lg hover:bg-orange-600 transition-colors"
        >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
                />
            </svg>
            Track Order
        </a>
    );
}

export default function Order() {
    const [ordersDetails, setOrdersDetails] = useState([]);
    const [orders] = useState(() => {
        try {
            const item = localStorage.getItem("user_orderIds");
            return item ? JSON.parse(item) : [];
        } catch (err) {
            console.log("error", err);
            return [];
        }
    });

    useEffect(() => {
        if (!orders.length) return;

        const query = new URLSearchParams();
        orders.forEach((order) => query.append("ids", order));

        fetch(`${import.meta.env.VITE_API_URL}/orders?${query}`)
            .then((res) => {
                if (!res.ok) throw new Error("Network response was not OK");
                return res.json();
            })
            .then(setOrdersDetails)
            .catch(console.error);
    }, [orders]);

    function copyContent(item) {
        navigator.clipboard.writeText(item).then(() => {
            alert(`'${item}' Order Id copied`);
        });
    }

    if (!orders.length) {
        return (
            <div className="w-full min-h-[60vh] flex flex-col items-center justify-center p-4">
                <div className="text-center">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-16 w-16 mx-auto text-gray-300 mb-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={1.5}
                            d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                        />
                    </svg>
                    <h2 className="text-xl font-semibold text-gray-700 mb-2">
                        No Orders Yet
                    </h2>
                    <p className="text-gray-500 mb-4">
                        You haven&apos;t placed any orders yet.
                    </p>
                    <a
                        href="/shop"
                        className="inline-block px-6 py-2 bg-[#f85506] text-white font-semibold rounded-lg hover:bg-orange-600 transition-colors"
                    >
                        Start Shopping
                    </a>
                </div>
            </div>
        );
    }

    return (
        <div className="w-full max-w-4xl mx-auto p-4">
            <h1 className="text-2xl font-bold text-gray-800 mb-6">My Orders</h1>

            <div className="space-y-4">
                {ordersDetails.map((orderDetails, idx) => (
                    <div
                        key={idx}
                        className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow"
                    >
                        {/* Order Header */}
                        <div className="bg-gray-50 px-4 py-3 border-b border-gray-200 flex flex-wrap items-center justify-between gap-2">
                            <div className="flex items-center gap-3">
                                <div
                                    onClick={() => copyContent(orderDetails._id)}
                                    className="cursor-pointer group relative"
                                >
                                    <span className="text-sm text-gray-500">
                                        Order ID:{" "}
                                    </span>
                                    <span className="text-sm font-mono font-semibold text-gray-700 hover:text-[#f85506]">
                                        #{orderDetails._id?.slice(-8)}
                                    </span>
                                    <div className="hidden group-hover:block absolute z-10 w-48 -bottom-12 left-0 bg-gray-800 text-white text-xs rounded-lg p-2 shadow-lg">
                                        Click to copy full ID
                                    </div>
                                </div>
                            </div>
                            <StatusPill status={orderDetails.status} />
                        </div>

                        {/* Order Body */}
                        <div className="p-4">
                            <div className="flex flex-col md:flex-row gap-4">
                                {/* Product Images - Fixed width for 2 items, scroll if more */}
                                <div className="w-[180px] flex-shrink-0 flex gap-2 overflow-x-auto pb-2">
                                    {orderDetails.items?.map((item, itemIdx) => (
                                        <a
                                            key={itemIdx}
                                            href={`/product/${item.productId}`}
                                            className="flex-shrink-0 group"
                                        >
                                            <div className="relative h-20 w-20 rounded-lg overflow-hidden border border-gray-200">
                                                <img
                                                    className="h-full w-full object-cover group-hover:scale-105 transition-transform"
                                                    src={item.imageUrl?.[0]}
                                                    alt="Product"
                                                />
                                                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                                                    <img
                                                        className="h-8 opacity-0 group-hover:opacity-100 transition-opacity"
                                                        src={EyeSVG}
                                                        alt="View"
                                                    />
                                                </div>
                                            </div>
                                            <div className="text-center mt-1">
                                                <p className="text-xs text-gray-600 truncate max-w-[80px]">
                                                    {item.selectedSize}
                                                </p>
                                                <span className="text-xs text-gray-500">
                                                    Qty: {item.qty}
                                                </span>
                                            </div>
                                        </a>
                                    ))}
                                </div>

                                {/* Order Details */}
                                <div className="flex-1 space-y-2 text-sm">
                                    {/* Customer Name */}
                                    <div className="flex items-start gap-2">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-4 w-4 text-gray-400 mt-0.5 flex-shrink-0"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                                            />
                                        </svg>
                                        <span className="text-gray-700 font-medium">
                                            {orderDetails.customerDetails?.name}
                                        </span>
                                    </div>
                                    {/* Phone */}
                                    <div className="flex items-start gap-2">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-4 w-4 text-gray-400 mt-0.5 flex-shrink-0"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                                            />
                                        </svg>
                                        <span className="text-gray-700">
                                            {orderDetails.customerDetails?.phone}
                                        </span>
                                    </div>
                                    {/* Address */}
                                    <div className="flex items-start gap-2">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-4 w-4 text-gray-400 mt-0.5 flex-shrink-0"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                                            />
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                                            />
                                        </svg>
                                        <span className="text-gray-700">
                                            {orderDetails.customerDetails?.addressFull ||
                                                [
                                                    orderDetails.customerDetails?.village,
                                                    orderDetails.customerDetails?.union,
                                                    orderDetails.customerDetails?.upazila,
                                                    orderDetails.customerDetails?.district,
                                                    orderDetails.customerDetails?.division,
                                                ]
                                                    .filter(Boolean)
                                                    .join(", ")}
                                        </span>
                                    </div>
                                    {/* Payment Method */}
                                    <div className="flex items-center gap-2 pt-1">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-4 w-4 text-gray-400 flex-shrink-0"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"
                                            />
                                        </svg>
                                        <span className="text-gray-600">Payment:</span>
                                        <span className="uppercase text-xs font-semibold px-2 py-0.5 bg-gray-100 rounded text-gray-700">
                                            {orderDetails.paymentMethod || "COD"}
                                        </span>
                                    </div>
                                    {/* Note if exists */}
                                    {orderDetails.note && (
                                        <div className="flex items-start gap-2 pt-1">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                className="h-4 w-4 text-gray-400 mt-0.5 flex-shrink-0"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"
                                                />
                                            </svg>
                                            <span className="text-gray-600 italic">
                                                &quot;{orderDetails.note}&quot;
                                            </span>
                                        </div>
                                    )}
                                    {/* Order Date */}
                                    <div className="flex items-center gap-2 pt-1 text-xs text-gray-500">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-3.5 w-3.5 text-gray-400 flex-shrink-0"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                                            />
                                        </svg>
                                        <span>
                                            Ordered:{" "}
                                            {new Date(
                                                orderDetails.createdAt
                                            ).toLocaleDateString("en-BD", {
                                                year: "numeric",
                                                month: "short",
                                                day: "numeric",
                                                hour: "2-digit",
                                                minute: "2-digit",
                                            })}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Order Footer - Track Button (shows when shipped) */}
                        {(orderDetails.status === "shipped" ||
                            orderDetails.status === "delivered" ||
                            orderDetails.trackingId) && (
                            <div className="px-4 py-3 bg-gray-50 border-t border-gray-200 flex flex-wrap items-center justify-between gap-3">
                                {orderDetails.trackingId && (
                                    <div className="flex items-center gap-2 text-sm">
                                        <span className="text-gray-500">
                                            Tracking ID:
                                        </span>
                                        <span className="font-mono font-semibold text-gray-700">
                                            {orderDetails.trackingId}
                                        </span>
                                    </div>
                                )}
                                <TrackOrderButton
                                    trackingId={orderDetails.trackingId}
                                    courierName={orderDetails.courierName}
                                />
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}
