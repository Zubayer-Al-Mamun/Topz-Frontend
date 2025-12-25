
import { useState } from "react";
import { useLoaderData } from "react-router-dom";

export default function SeeColor() {
    const productData = useLoaderData();
    const [product, setProduct] = useState(productData);
    const [colorEdit, setColorEdit] = useState(null);

    const deleteColor = async (productId, color) => {
        try {
            console.log("trigger...");
            const res = await fetch(`${import.meta.env.VITE_API_URL}/products/${productId}/vars/${color}`, {
                method: "DELETE",
            });
            const data = await res.json();
            if (!res.ok) {
                throw new Error(data.message || `${color} deleting failed`);
            }

            setProduct(prev => ({
                ...prev,
                vars: prev.vars.filter(v => v.color !== color)
            }));

        } catch (err) {
            console.log(err.message, err);
        }
    };

    return (
        <div className="h-[90vh] grid grid-cols-1 md:grid-cols-2 gap-2">
            <div>
                <div className="flex gap-2 ">
                    {product.images.map((img, idx) => (
                        <img key={idx} src={img} className="h-30 w-30 object-cover" />
                    ))}
                </div>
                <p>{product.title}</p>
            </div>

            <div className="no-scrollbar border rounded-lg border-gray-300 overflow-x-hidden pb-2">
                {product.vars.map((item, idx) => (
                    <div
                        className="my-2 bg-green-200 h-20 px-2 shadow-md cursor-pointer flex justify-between"

                        key={idx}
                    >
                        <div className="flex items-center gap-1">
                            <p className="w-20 font-semibold">{item.color}</p>
                            {item.imageUrl.map((img, idx) => (
                                <img key={idx} className="h-20 w-20 object-cover" src={img} />
                            ))}
                        </div>
                        <div className="relative w-[100px]">
                            <div className="font-bold text-2xl flex justify-end items-center"
                                onClick={() => setColorEdit(item.color)}
                            >...</div>
                            {
                                colorEdit === item.color && <div className=" rounded-lg absolute top-0 right-0 w-[150px] py-3 bg-white z-10 min-h-20">
                                    <div className="flex flex-row-reverse p-1 pr-2"
                                        onClick={() => setColorEdit(false)}
                                    > <span className="font-bold">X</span> </div>
                                    <div className="flex flex-col">
                                        <button className=" my-1 w-full border border-gray-300 cursor-pointer"> Edit</button>
                                        <button className=" my-1 w-full border border-gray-300 "
                                            onClick={() => deleteColor(product._id, item.color)}
                                        > Delete</button>
                                        <button className=" my-1 w-full border border-gray-300 "> new</button>
                                    </div>
                                </div>
                            }
                        </div>

                    </div>
                ))}
            </div>
        </div>
    );
}
