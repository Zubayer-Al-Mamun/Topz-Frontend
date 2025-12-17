import { useLoaderData } from "react-router-dom";

export default function SeeColor() {
    const product = useLoaderData();
    console.log(product);
    return (
        <div className="h-[90vh] grid grid-cols-1 md:grid-cols-2 gap-2">
            <div className="">
                <div className="flex gap-2 ">
                    {product.images.map((img) => (
                        <img src={img} className="h-30 w-30 object-cover" />
                    ))}
                </div>
                {product.title}
            </div>
            <div className=" no-scrollbar border rounded-lg border-gray-300 overflow-x-hidden pb-2">
                {product.vars.map((item) => (
                    <div className="my-2 bg-green-200 h-20 px-2 shadow-md ">
                        <div className="flex items-center gap-1">
                            <p className="w-20 font-semibold" >{item.color}</p>
                            {
                                item.imageUrl.map((img)=> (
                                    <img className=" h-20 w-20 object-cover" src={img} />
                                ))
                            }
                        </div>
                        <div></div>
                    </div>
                ))}
            </div>
        </div>
    );
}
