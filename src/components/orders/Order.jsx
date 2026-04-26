import { useEffect, useState } from "react";
import EyeSVG from "../../assets/eye.svg";

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

    console.log(ordersDetails);

    function copyContent(item) {
        console.log("copy item => ", item);
        navigator.clipboard.writeText(item).then(() => {
            alert(`'${item}' Order Id copied`);
        });
    }

    return (
        <div className="w-full">
            {ordersDetails.map((orderDetails, idx) => (
                <div
                    key={idx}
                    className="w-full my-4 px-2 text-[11pt] flex items-center justify-between hover:bg-gray-200 border border-gray-200"
                >
                    <div className="flex items-center">
                        <div className="w-60 h-35 overflow-y-scroll no-scrollbar flex flex-col justify-between">
                            <div className="h-[50%]">
                                <div className="flex items-center">
                                    <span className="font-bold">Id :</span>{" "}
                                    <div
                                        onClick={() =>
                                            copyContent(orderDetails._id)
                                        }
                                        className="mx-1 cursor-pointer group relative flex"
                                    >
                                        {orderDetails._id}
                                        <div className="hidden group-hover:flex absolute w-45 -bottom-10 bg-gray-400 rounded-md p-2">
                                            <span className="h-5 w-5 bg-gray-400 absolute rotate-45 -top-1 left-5"></span>
                                            <span className="z-10 font-semibold">
                                                Click to Copy Order ID
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div className="">
                                    <span className="font-semibold">
                                        Phone :{" "}
                                    </span>
                                    {orderDetails.customerDetails.phone}
                                </div>
                                <p>
                                    <b>Address : </b> {orderDetails.customerDetails.addressFull}
                                </p>
                            </div>
                            <div className="h-[50%">
                                <h1> <b>COD : </b> 110</h1>
                                <h1> <b>Total : </b> 33354534</h1> 
                            </div>
                        </div>

                        <div className="flex w-35 overflow-x-auto  border-1 border-gray-300 rounded-sm">
                            {orderDetails.items.map((item) => (
                                <a
                                    href={`/product/${item.productId}`}
                                    className="flex flex-col items-center border border-gray-200 m-1 hover:bg-blue-200 hover:rounded-md"
                                >
                                    <div className=" group h-15 w-15 relative flex items-center justify-center">
                                        <img
                                            className=" group-hover:blur-[3px] h-full w-full object-cover"
                                            src={item.imageUrl[0]}
                                        />
                                        <img
                                            className="absolute h-10 hidden group-hover:block"
                                            src={EyeSVG}
                                            alt=""
                                        />
                                    </div>

                                    <p>{item.color}</p>
                                    <span>qty : {item.qty}</span>
                                </a>
                            ))}
                        </div>
                    </div>

                    <div className=""></div>
                </div>
            ))}
        </div>
    );
}
