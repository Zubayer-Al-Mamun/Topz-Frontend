// import { useState } from "react";
import crossIcon from "../assets/cross_gray.svg";

export default function PopUp({ product, setShowPopup }) {
    // const [order, setOrder] = useState({
    //     productId: product._id,
    // });

    return (
        <div className=" sm:hidden fixed h-full w-full backdrop-blur-sm top-0 bottom-0 left-0 right-0 z-20">


            <div className="popup fixed bg-white w-full bottom-0 p-2 md:w-2/3 md:rounded-t-md shadow-[5px_2px_20px_5px_rgb(0,0,0)] z-20">
                <div className="w-full flex rounded-sm overflow-hidden mb-2 shadow-sm">
                    <div className="relative h-[100px] py-1 aspect-square">
                        <img
                            className="h-full w-full object-cover rounded-sm"
                            src={product.images[0]}
                            alt=""
                        />
                    </div>
                    <div className=" w-full pl-2 flex justify-between">
                        <div className="">
                            <p className="text-2xl text-red-500 font-bold">
                                ৳{" "}
                                {Math.ceil(
                                    product.pricing *
                                        (1 - product.discountsPercentage / 100)
                                )}
                            </p>
                            <div>
                                <span className="text-[12px] line-through font-semibold text-gray-500">
                                    {" "}
                                    ৳ {product.pricing}
                                </span>
                                <span className="text-[12px] text-red-500 font-semibold rounded-sm bg-red-100 px-1">
                                    {" "}
                                    ৳ -{product.discountsPercentage}%
                                </span>
                            </div>
                            <p>Lorem ipsum dolor sit.</p>
                        </div>
                        <div
                            className=""
                            onClick={() => {
                                setShowPopup(false);
                            }}
                        >
                            <img className="h-[25px]" src={crossIcon} alt="" />
                        </div>
                    </div>
                </div>

                <div className="single_product_popup max-h-[200px] overflow-x-hidden py-2">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Ipsam corrupti, nihil consectetur quisquam aut eligendi
                    nisi. Iure, fuga quis adipisci eligendi nesciunt quidem,
                    dolore perspiciatis cupiditate alias consequatur nihil
                    et?Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Facilis libero perferendis necessitatibus provident sed
                    perspiciatis hic possimus, nostrum placeat iusto laborum
                    facere, praesentium similique. Quas quibusdam dolores
                    ratione iste similique. Lorem ipsum dolor sit amet
                    consectetur adipisicing elit. Quam est dolorem a, eum
                    sapiente corporis autem labore, veniam doloremque ratione
                    quasi esse, nostrum necessitatibus ad eius veritatis
                    perferendis quia adipisci. Lorem ipsum, dolor sit amet
                    consectetur adipisicing elit. Cupiditate, aperiam in optio
                    repudiandae officiis necessitatibus explicabo accusantium
                    beatae debitis nulla. Assumenda, perspiciatis natus
                    dignissimos mollitia tempora provident aperiam incidunt
                    repudiandae? Lorem ipsum dolor sit amet consectetur,
                    adipisicing elit. Hic possimus odio velit necessitatibus sed
                    harum facere ea nam neque labore, esse provident similique
                    nostrum. Iure aut voluptates aspernatur explicabo eaque.
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui
                    deleniti odio aliquam blanditiis mollitia soluta atque ea
                    voluptatibus similique iste vitae, doloremque dolor
                    accusamus ipsa cumque repellendus, laborum, et nulla.
                </div>

                <div className="w-full mt-2">
                    <button className="bg-green-400 py-2 rounded-sm w-full h-full font-bold">
                        {" "}
                        Place Order
                    </button>
                </div>
            </div>
        </div>
    );
}
