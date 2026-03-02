
export default function ShippingAddress2({ order, setOrder }) {
    return (
        <div
            className="flex items-center justify-center"
        >
            <form className="w-full rounded-md">
                <h2 className="text-xl font-bold mb-2 md:text-white">
                    Shippping Address (ঠিকানা লিখুন)
                </h2>

                <label
                    className=" text-[18px] pl-1 font-semibold"
                    htmlFor="name"
                >
                    Name (আপনার নাম লিখুন)
                </label>
                <input
                    onChange={(event) =>
                        setOrder({
                            ...order,
                            customerDetails: {
                                ...order.customerDetails,
                                name: event.target.value,
                            },
                        })
                    }
                    type="text"
                    value={order.customerDetails.name}
                    placeholder=""
                    className="w-full mb-2 px-4 py-3 rounded bg-white border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-400"
                    required
                    id="name"
                />

                <label
                    className=" text-[18px] pl-1 font-semibold"
                    htmlFor="phone"
                >
                    Phone (সচল মোবাইল নাম্বার দিন)
                </label>
                <input
                    onChange={(event) =>
                        setOrder({
                            ...order,
                            customerDetails: {
                                ...order.customerDetails,
                                phone: event.target.value,
                            },
                        })
                    }
                    type="tel"
                    value={order.customerDetails.phone}
                    inputMode="numeric"
                    maxLength="11"
                    placeholder="01*********"
                    className="w-full mb-2 px-4 py-3 rounded bg-white border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-400"
                    required
                    id="phone"
                />

                <label
                    className="mt-2 text-[18px] pl-1 font-semibold"
                    htmlFor="address"
                >
                    Address (আপনার পূর্ণাঙ্গ ঠিকানা লিখুন)
                </label>
                <textarea
                    placeholder="গ্রাম/সড়ক নং,  ইউনিয়ন,  থানা/উপজেলা,  জেলা"
                    onChange={(event) =>
                        setOrder({
                            ...order,
                            customerDetails: {
                                ...order.customerDetails,
                                addressFull: event.target.value,
                            },
                        })
                    }
                    value={order.customerDetails.addressFull}
                    rows="2"
                    className="w-full mb-2 px-4 py-3 rounded bg-white border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-400 resize-none"
                    required
                    id="address"
                />

                <label
                    className="mt-2 text-[18px] pl-1 font-semibold"
                    htmlFor="note"
                >
                    Note (বিশেষ কিছু বলে দিতে পারেন)
                </label>
                <textarea
                    onChange={(event) =>
                        setOrder({ ...order, note: event.target.value })
                    }
                    value={order.note}
                    placeholder="এটি একটি উপহার বাক্সে পাঠান।"
                    rows="4"
                    className="w-full mb-2 px-4 py-3 rounded bg-white border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-400 resize-none"
                    required
                    id="note"
                />

                {/* <button
          type="submit"
          className="w-full py-3 rounded-full bg-orange-500 text-white font-semibold tracking-wide hover:bg-orange-600 transition"
        >
          SUBMIT
        </button> */}
            </form>
        </div>
    );
}
