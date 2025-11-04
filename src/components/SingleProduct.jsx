import { useEffect, useRef, useState } from "react";
import { Link, useLoaderData } from "react-router-dom";
import messengerIcon from "../assets/messenger.svg";
import phoneIcon from "../assets/phone-1.svg";
import starIconYellow from "../assets/starYellow.svg";
import WhatsappIcon from "../assets/whatsapp.svg";
import ImagePreview from "./ImagePreview";

export default function SingleProduct() {
    const [selectedColor, setSelectedColor] = useState("maroon");
    const [quantity, setQuantity] = useState(1);
    const [size, setSize] = useState(42);
    const [showFullTitle, setShowFullTitle] = useState(false);
    const [showFullDesc, setShowFullDesc] = useState(false);
    const hasFetched = useRef(false);

    const imageUrls = [
    "https://picsum.photos/500/300",
    "https://picsum.photos/500/500",
    "https://picsum.photos/500/700",
    "https://picsum.photos/500/700",
    "https://picsum.photos/500/700",
    "https://picsum.photos/500/300",
    "https://picsum.photos/500/500",
    "https://picsum.photos/500/700",
    "https://picsum.photos/500/700",
    "https://picsum.photos/500/700"
  ];

    const product = useLoaderData();

    const colors = [
        { name: "maroon", hex: "#4A1C1C" },
        { name: "green", hex: "#8BAE5E" },
        { name: "yellow", hex: "#E1C340" },
    ];

    useEffect(() => {
        if (!hasFetched.current) {
            hasFetched.current = true;

            fetch(`${import.meta.env.VITE_API_URL}/view/${product._id}`)
                .then((res) => res.json())
                .then((data) => console.log(data))
                .catch((err) => console.error(err));
        }
    }, [product._id]);

    useEffect(() => {
        window.scrollTo(0, 0);
    });
    return (
        <div className="min-h-screen w-[100%] lg:w-[1100px] flex flex-col items-center ">
            {/* Container */}
            <div className="w-full sm:p-8 grid grid-cols-1 md:grid-cols-2">
                {/* Left - Images */}
                <div>
                    <ImagePreview images={imageUrls} />
                </div>
                

                {/* Right - Product Info */}
                <div className="flex flex-col p-2 sm:px-3">
                    {/* <div className="flex items-center gap-2 mb-2">
                        <div className="text-yellow-500">★★★★★</div>
                        <p className="text-gray-500 text-sm">(256)</p>
                    </div> */}

                    <div className="flex items-baseline-last gap-2 mb-3">
                        <p className="text-2xl text-red-500 font-bold">
                            ৳ {product.discountsPrice}
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

                    {showFullTitle ? (
                        <div
                            onClick={() => setShowFullTitle(!showFullTitle)}
                            className="text-[16px] font-bold m-1 "
                        >
                            {product.title}
                        </div>
                    ) : (
                        <div
                            onClick={() => setShowFullTitle(!showFullTitle)}
                            className="text-[16px] font-bold m-1 line-clamp-2"
                        >
                            {product.title}{" "}
                        </div>
                    )}

                    <div className="flex justify-between">
                        <div className="flex text-[11px] items-center">
                            <img
                                className="h-[14px]"
                                src={starIconYellow}
                                alt=""
                            />
                            <p className="">{product.rating} &nbsp;</p>

                            <p className="">
                                | &nbsp; {product.totalSale} sold
                            </p>
                        </div>

                        <div className="flex justify-between h-full">
                            <Link className="mx-2">O</Link>
                            <Link>Share</Link>
                        </div>
                    </div>

                    <div className="bg-gray-200 text-[14px] py-1 px-2 rounded-md">
                        <Link to=" " className="flex justify-between my-1">
                            <p> [ ] 3 days easy return . warranty</p>
                            <p>go</p>
                        </Link>

                        <Link to=" " className="flex justify-between my-1">
                            <div>
                                <p>Guaranteed by {}</p>
                                <p className="text-[11px]">Standard Delivery</p>
                            </div>
                            <p className="font-semibold">৳ 130</p>
                        </Link>
                    </div>

                    {/* Description */}

                    {showFullDesc ? (
                        <div
                            onClick={() => setShowFullDesc(!showFullDesc)}
                            className="text-gray-600 leading-relaxed mb-6 cursor-pointer"
                        >
                            {product.description}
                        </div>
                    ) : (
                        <div
                            onClick={() => setShowFullDesc(!showFullDesc)}
                            className="text-gray-600 leading-relaxed mb-6 line-clamp-4 relative cursor-pointer"
                        >
                            {product.description}{" "}
                            <span className="text-black text-[18px] absolute bottom-0 right-0 bg-[#F8F8F0] px-3 font-semibold">
                                see more..
                            </span>{" "}
                        </div>
                    )}

                    {/* Colors */}
                    {/* <div className="mb-4">
                        <p className="font-semibold mb-2">Colors</p>
                        <div className="flex gap-3">
                            {colors.map((color) => (
                                <button
                                    key={color.name}
                                    onClick={() => setSelectedColor(color.name)}
                                    className={`w-8 h-8 rounded-full border-2 ${
                                        selectedColor === color.name
                                            ? "border-black"
                                            : "border-gray-300"
                                    }`}
                                    style={{ backgroundColor: color.hex }}
                                ></button>
                            ))}
                        </div>
                    </div> */}

                    <div className="h-[60px] sm:hidden"></div>

                    {/* Quantity & Size */}
                    {/* <div className="flex items-center gap-10 mb-6">

                        <div>
                            <p className="font-semibold mb-2">Quantity</p>
                            <div className="flex items-center border rounded-lg overflow-hidden">
                                <button
                                    onClick={() =>
                                        setQuantity(Math.max(1, quantity - 1))
                                    }
                                    className="px-3 py-1 text-xl hover:bg-gray-100"
                                >
                                    −
                                </button>
                                <span className="px-4">{quantity}</span>
                                <button
                                    onClick={() => setQuantity(quantity + 1)}
                                    className="px-3 py-1 text-xl hover:bg-gray-100"
                                >
                                    +
                                </button>
                            </div>
                        </div>

                        <div>
                            <p className="font-semibold mb-2">Size (UK)</p>
                            <select
                                value={size}
                                onChange={(e) => setSize(e.target.value)}
                                className="border rounded-lg px-3 py-2"
                            >
                                {[39, 40, 41, 42, 43, 44].map((s) => (
                                    <option key={s}>{s}</option>
                                ))}
                            </select>
                            <p className="text-blue-600 text-sm mt-1 hover:underline cursor-pointer">
                                Size Guide
                            </p>
                        </div>
                    </div> */}

                    <div className=" bg-[#F8F8F0] flex justify-between items-center py-1 max-md:hidden ">
                        <div className="flex">
                            <a
                                href="tel:+8801602369203"
                                className="group flex justify-center text-[14px] p-2 border ml-2 rounded-full hover:bg-green-400 border-green-400 "
                            >
                                <img
                                    src={phoneIcon}
                                    className="h-[30px]"
                                    alt=""
                                />

                                <div className="text-white hidden group-hover:inline -top-[10px] pt-1 px-1">
                                    Phone
                                </div>
                            </a>

                            <a
                                href="https://wa.me/+8801602369203"
                                className="group flex justify-center text-[14px] p-2 border ml-2 rounded-full hover:bg-green-400 border-green-400"
                            >
                                <img
                                    src={WhatsappIcon}
                                    className="h-[30px]"
                                    alt=""
                                />

                                <div className="text-white hidden group-hover:inline -top-[10px] pt-1 px-1">
                                    Whatsapp
                                </div>
                            </a>

                            {/* <a
                                href="https://m.me/61580630246411"
                                className="group flex justify-center text-[14px] p-2 border ml-2 rounded-full hover:bg-green-400 border-green-400"
                            >
                                <img
                                    src={messengerIcon}
                                    className="h-[30px]"
                                    alt=""
                                />

                                <div className="text-white hidden group-hover:inline -top-[10px] pt-1 px-1">
                                    Messanger
                                </div>
                            </a> */}
                        </div>
                        <div className=" flex text-[14px] items-center h-[45px]">
                            <button className="bg-[#f85506] h-full text-white px-5 rounded-lg hover:bg-gray-800 transition">
                                Add to Cart
                            </button>
                            <button className="ml-2 font-bold text-white  border h-full bg-[#ffab1c] border-gray-400 px-6  rounded-lg hover:bg-gray-100 transition">
                                Buy Now
                                <br /> ৳ {product.pricing}
                            </button>
                        </div>
                    </div>

                    {/* Buttons */}
                    <div className=" fixed bottom-0 left-0 right-0 bg-[#F8F8F0] flex justify-between items-center py-1 shadow md:hidden ">
                        <div className="flex">
                            <a
                                href={`tel:${import.meta.env.VITE_CONTACT_PHONE}`}
                                className=" text-[14px] p-2 border ml-2 rounded-full hover:bg-green-400 border-green-400"
                            >
                                <img
                                    src={phoneIcon}
                                    className="h-[30px]"
                                    alt=""
                                />
                            </a>
                                    
                            <a
                                href={`https://wa.me/${import.meta.envVITE_CONTACT_WHATS}`}
                                className=" text-[14px] p-2 border ml-2 rounded-full hover:bg-green-400 border-green-400"
                            >
                                <img
                                    src={WhatsappIcon}
                                    className="h-[30px]"
                                    alt=""
                                />
                            </a>

                            {/* <a
                                href="https://m.me/61580630246411"
                                className=" text-[14px] p-2 border ml-2 rounded-full hover:bg-green-400 border-green-400"
                            >
                                <img
                                    src={messengerIcon}
                                    className="h-[30px]"
                                    alt=""
                                />
                            </a> */}
                        </div>
                        <div className=" flex text-[14px] items-center h-[45px]">
                            <button className="bg-[#f85506] h-full text-white px-5 rounded-lg hover:bg-gray-800 transition">
                                Add to Cart
                            </button>
                            <button className="mx-2 font-bold text-white  border h-full bg-[#ffab1c] border-gray-400 px-6  rounded-lg hover:bg-gray-100 transition">
                                Buy Now
                                <br /> ৳ {product.pricing}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

