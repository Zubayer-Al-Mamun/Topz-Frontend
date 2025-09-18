export default function AddProduct() {
    return (
        <div className="min-h-screen overflow-y-scroll bg-gray-50 p-6">
            <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow p-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Left Section */}
                <div className="lg:col-span-2 space-y-6">
                    {/* General Information */}
                    <div className="p-5 border rounded-xl">
                        <h2 className="text-lg font-semibold mb-4">
                            General Information
                        </h2>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium">
                                    Name Product / Title
                                </label>
                                <input
                                    type="text"
                                    placeholder="Puffer Jacket With Pocket Detail"
                                    className="w-full mt-1 p-2 border rounded-lg"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium">
                                    Description Product
                                </label>
                                <textarea
                                    rows="4"
                                    placeholder="Cropped puffer jacket made of technical fabric..."
                                    className="w-full mt-1 p-2 border rounded-lg"
                                ></textarea>
                            </div>
                            {/* Size */}
                            <div>
                                <label className="block text-sm font-medium">
                                    Size
                                </label>
                                <div className="flex justify-evenly">
                                    {/* <div className="">
                                        <label htmlFor="xs">XS</label>
                                        <input
                                            className="m-2 border rounded-md"
                                            type="number"
                                            name="xs"
                                            id="xs"
                                        />
                                    </div> */}

                                    {["S", "M", "XL", "XXL"].map(
                                        (size) => (
                                            <div className="flex flex-col items-center">
                                                <label htmlFor={size.toLocaleLowerCase()}>{size.toUpperCase()}</label>
                                                <input
                                                    className="w-[60px] md:w-[100px] p-1 border rounded-md"
                                                    type="number"
                                                    name={size.toLocaleLowerCase()}
                                                    id={size.toLocaleLowerCase()}
                                                />
                                            </div>
                                        )
                                    )}
                                </div>
                            </div>
                            {/* Gender */}
                            <div>
                                <label className="block text-sm font-medium">
                                    Gender
                                </label>
                                <div className="flex gap-4 mt-2">
                                    {["Men", "Woman"].map((gender) => (
                                        <label
                                            key={gender}
                                            className="flex items-center gap-2"
                                        >
                                            <input type="radio" name="gender" />
                                            <span>{gender}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Pricing and Stock */}
                    <div className="p-5 border rounded-xl">
                        <h2 className="text-lg font-semibold mb-4">
                            Pricing And Stock
                        </h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium">
                                    Base Pricing
                                </label>
                                <input
                                    type="text"
                                    placeholder="৳750"
                                    className="w-full mt-1 p-2 border rounded-lg"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium">
                                    Stock / Quantity
                                </label>
                                <input
                                    type="number"
                                    placeholder="77 টি প্রোডাক্ট আছে"
                                    className="w-full mt-1 p-2 border rounded-lg"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium">
                                    Discount
                                </label>
                                <input
                                    type="text"
                                    placeholder="10%"
                                    className="w-full mt-1 p-2 border rounded-lg"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium">
                                    Discount Price
                                </label>
                                <input
                                    type="text"
                                    placeholder="৳500"
                                    className="w-full mt-1 p-2 border rounded-lg"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium">
                                    Discount Type
                                </label>
                                <input
                                    type="text"
                                    placeholder=" ঈদ স্পেশাল ছাড় ! "
                                    className="w-full mt-1 p-2 border rounded-lg"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Section */}
                <div className="space-y-6">
                    {/* Upload Image */}
                    <div className="p-5 border rounded-xl">
                        <h2 className="text-lg font-semibold mb-4">
                            Upload Image
                        </h2>
                        <div className="w-full flex flex-col justify-center">
                            <h5 className="text-red-500 font-semibold">May look cropped, but full size uploads</h5>
                            <img
                                src="data:image/jpeg;base64,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"
                                alt="product"
                                className="rounded-xl border m-4 h-[200px] object-cover"
                            />
                            <div className="flex justify-between gap-2">
                                <div className="w-16 h-16 border rounded-xl"></div>
                                <div className="w-16 h-16 border rounded-xl"></div>
                                <div className="w-16 h-16 border rounded-xl"></div>
                                <div className="w-16 h-16 border rounded-xl"></div>
                                <div className="w-16 h-16 border rounded-xl"></div>
                            </div>
                        </div>
                    </div>

                    {/* Category */}
                    <div className="p-5 border rounded-xl">
                        <h2 className="text-lg font-semibold mb-4">Category</h2>
                        <input
                            type="text"
                            placeholder="Jacket"
                            className="w-full p-2 border rounded-lg mb-3"
                        />
                        <button className="w-full py-2 bg-green-500 text-white rounded-lg hover:bg-green-600">
                            Add Category
                        </button>
                    </div>
                </div>
            </div>

            {/* Bottom Buttons */}
            <div className="max-w-6xl mx-auto mt-6 flex justify-end gap-3">
                <button className="px-4 py-2 border rounded-lg hover:bg-gray-100">
                    Save Draft
                </button>
                <button className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600">
                    Add Product
                </button>
            </div>
        </div>
    );
}
