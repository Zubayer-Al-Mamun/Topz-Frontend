import ImageCarousel from "./ImageCarousel";


export default function TitleAndPrice({product, discountsPrice, images}){
    return (
        <div className="flex gap-2 items-center">
                        <div className="rounded-md w-[80px] h-[80px] md:w-[150px] md:h-[150px]">
                            <ImageCarousel showArrows={false} images={images} />
                        </div>

                        <div className="flex flex-col">
                            <div className="text-[16px] text-black font-bold line-clamp-2">
                                {product.title}
                            </div>

                            <div className="flex  items-baseline-last gap-2 mb-3">
                                <p className="text-2xl text-red-500 font-bold">
                                    ৳ {discountsPrice}
                                </p>
                                <span className="text-[12px] line-through font-semibold text-black">
                                    {" "}
                                    ৳ {product.pricing}
                                </span>
                                <span className="text-[12px] text-red-600 font-semibold rounded-sm bg-red-200 px-1">
                                    {" "}
                                    ৳ -{product.discountsPercentage}%
                                </span>
                            </div>
                        </div>
                        {/* <div className="py-4">
                            <p className="line-clamp-1">{product.title}</p>
                            <p>{product.pricing}</p>
                        </div> */}
                    </div>
    );
}