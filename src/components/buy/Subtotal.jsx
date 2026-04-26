export default function Subtotal({order, discountsPrice, codCharge}) {
    return (
        <>
            {order.items.length > 0 && (
                <div className="w-full text-gray- font-bold border border-gray-200 rounded-md shadow-sm max-md:mb-4">
                    <div className="flex justify-between pl-[40%] pr-2">
                        <span>Item {order.items?.length > 1 ? "Subtotal" : "Price"}</span>
                        <span>
                            {order.items.reduce(
                                (sum, item) =>
                                    sum +
                                    (item.pricing || discountsPrice) * item.qty,
                                0,
                            )}{" "}
                            ৳
                        </span>
                    </div>
                    <div className="flex justify-between pl-[40%] pr-2">
                        <span>Shipping</span>
                        <span>{codCharge} ৳</span>
                    </div>
                    <div className="flex justify-between pl-[40%] pr-2">
                        <span>Order Total</span>
                        <span className="text-[#f85506]">
                            {order.items.reduce(
                                (sum, item) =>
                                    sum +
                                    (item.pricing || discountsPrice) * item.qty,
                                0,
                            ) + codCharge}{" "}
                            ৳
                        </span>
                    </div>
                </div>
            )}
        </>
    );
}
