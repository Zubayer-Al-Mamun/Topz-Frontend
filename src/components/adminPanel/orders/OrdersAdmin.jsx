
import { useEffect, useState, useCallback } from "react";
import CopyableId from "./CopyableId";
import ItemCard from "./ItemCard";

/* ── status config ───────────────────────── */
const STATUS_CONFIG = {
    pending: {
        label: "Pending",
        pillCls: "bg-orange-50 text-orange-700",
        dotCls: "bg-orange-400",
    },
    processing: {
        label: "Processing",
        pillCls: "bg-blue-50 text-blue-700",
        dotCls: "bg-blue-400",
    },
    shipped: {
        label: "Shipped",
        pillCls: "bg-green-50 text-green-700",
        dotCls: "bg-green-400",
    },
    delivered: {
        label: "Delivered",
        pillCls: "bg-violet-50 text-violet-700",
        dotCls: "bg-violet-400",
    },
    cancelled: {
        label: "Cancelled",
        pillCls: "bg-rose-50 text-rose-700",
        dotCls: "bg-rose-400",
    },
};

export default function OrdersAdmin() {
    const [orders, setOrders] = useState([]);
    console.log(orders)
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const fetchOrders = useCallback(async () => {
        const res = await fetch(
            `${import.meta.env.VITE_API_URL}/admin/orders?page=${page}&limit=10`
        );
        const data = await res.json();

        setOrders(data.data || []);
        setTotalPages(data.pagination?.totalPages || 1);
    }, [page]);

    useEffect(() => {
        fetchOrders();
    }, [fetchOrders]);

    const handleSaveCourier = async (orderId, courierId) => {
        await fetch(
            `${import.meta.env.VITE_API_URL}/admin/orders/${orderId}/courier`,
            {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ courierId }),
            }
        );
    };

    return (
        <div className="max-w-5xl mx-auto p-6">

            <h1 className="text-xl font-bold mb-4">Orders</h1>

            <div className="flex flex-col gap-3">
                {orders.map((order) => {
                    const items = order.items || [];

                    const totalItems = items.reduce(
                        (s, i) => s + (i.qty || 0),
                        0
                    );

                    const totalPrice =
                        items.reduce(
                            (s, i) => s + (i.price || 0) * (i.qty || 0),
                            0
                        ) ||
                        order.total ||
                        0;

                    const status =
                        STATUS_CONFIG[order.status] ||
                        STATUS_CONFIG.pending;

                    return (
                        <div
                            key={order._id}
                            className=" bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md"
                        >
                            {/* top grid */}
                            <div className="grid grid-cols-[1.1fr_1fr_1.1fr]">

                                {/* Customer */}
                                <div className="p-4">
                                    <p className="text-[10px] font-bold text-gray-400 uppercase mb-2">
                                        Customer
                                    </p>

                                    <CopyableId id={order._id} />

                                    <div className="mt-2 space-y-1">
                                        <div className="flex gap-2">
                                            <span className="text-[11px] text-gray-400 w-12">
                                                Phone
                                            </span>
                                            <span className="text-[13px] font-semibold text-gray-800">
                                                {order.customerDetails?.phone}
                                            </span>
                                        </div>

                                        <div className="flex gap-2">
                                            <span className="text-[11px] text-gray-400 w-12">
                                                Address
                                            </span>
                                            <span className="text-[12px] text-gray-500">
                                                {order.customerDetails?.addressFull}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                {/* Items */}
                                <div className="p-4 border-l border-gray-100">
                                    <p className="text-[10px] font-bold text-gray-400 uppercase mb-2">
                                        Items · {totalItems} pcs
                                    </p>

                                    <div className="w-40 flex gap-1 overflow-x-auto">
                                        {items.map((item, i) => (
                                            <ItemCard key={i} item={item} />
                                        ))}
                                    </div>
                                </div>

                                {/* Summary */}
                                <div className="p-4 border-l border-gray-100">
                                    <p className="text-[10px] font-bold text-gray-400 uppercase mb-2">
                                        Order summary
                                    </p>

                                    {/* status pill */}
                                    <span
                                        className={`inline-flex items-center gap-1.5 text-[11px] font-semibold px-2.5 py-0.5 rounded-full ${status.pillCls}`}
                                    >
                                        <span
                                            className={`w-1.5 h-1.5 rounded-full ${status.dotCls}`}
                                        />
                                        {status.label}
                                    </span>

                                    <div className="mt-3 space-y-1.5">
                                        <p className="text-xs text-gray-500">
                                            COD:{" "}
                                            <span className="font-semibold">
                                                ৳{order.cod ?? 110}
                                            </span>
                                        </p>

                                        <p className="text-sm font-bold text-slate-800">
                                            ৳{totalPrice.toLocaleString()}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* bottom */}
                            <div className="border-t bg-gray-50 px-4 py-3 grid grid-cols-[auto_auto_1fr] gap-4 items-center">
                                <div className="text-sm font-bold">
                                    ৳{totalPrice.toLocaleString()}
                                </div>

                                <div className="text-sm">
                                    {totalItems} pcs
                                </div>

                                <input
                                    type="text"
                                    defaultValue={order.courierId}
                                    placeholder="Courier ID"
                                    className="border px-2 py-1 text-xs rounded w-full"
                                    onKeyDown={(e) => {
                                        if (e.key === "Enter") {
                                            handleSaveCourier(
                                                order._id,
                                                e.target.value
                                            );
                                        }
                                    }}
                                />
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* pagination */}
            {totalPages > 1 && (
                <div className="flex gap-2 mt-6 justify-center">
                    <button
                        disabled={page === 1}
                        onClick={() => setPage((p) => p - 1)}
                        className="px-3 py-1 border rounded"
                    >
                        ←
                    </button>

                    {Array.from({ length: totalPages }, (_, i) => (
                        <button
                            key={i}
                            onClick={() => setPage(i + 1)}
                            className={`px-3 py-1 border rounded ${
                                page === i + 1 ? "bg-black text-white" : ""
                            }`}
                        >
                            {i + 1}
                        </button>
                    ))}

                    <button
                        disabled={page === totalPages}
                        onClick={() => setPage((p) => p + 1)}
                        className="px-3 py-1 border rounded"
                    >
                        →
                    </button>
                </div>
            )}
        </div>
    );
}