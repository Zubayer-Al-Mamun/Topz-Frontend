export default function ProductColorInpu({name ,moreColor, setMoreColor}) {
    return (
        <div>
            <div className="flex flex-col gap-3 p-1 rounded-md bg-[#d9c3b0] mb-2">
                <h1 className="text-center font-semibold">Color {name[0]}</h1>
                {/* Color Input */}
                <div className="flex flex-col sm:flex-row gap-4">
                    <div className="flex-1">
                        <label className="block text-sm font-medium">
                            Color Code
                        </label>
                        <input
                            type="color"
                            className="w-full h-10 mt-1 p-1 border rounded-lg"
                        />
                    </div>

                    <div className="flex-1">
                        <label className="block text-sm font-medium">
                            Color Name
                        </label>
                        <input
                            type="text"
                            placeholder="e.g. Coffee Brown"
                            className="w-full mt-1 p-2 border rounded-lg"
                        />
                    </div>
                </div>

                {/* Image URL */}
                <div>
                    <label className="block text-sm font-medium">
                        Image URL
                    </label>
                    <input
                        type="url"
                        placeholder="https://example.com/image.jpg"
                        className="w-full mt-1 p-2 border rounded-lg"
                    />
                </div>

                {/* Sizes */}
                <div>
                    <label className="block text-sm font-medium">
                        Sizes & Stock
                    </label>
                    <div className="flex flex-col sm:flex-row gap-4 mt-2">
                        <div className="flex-1">
                            <input
                                type="text"
                                defaultValue="M"
                                className="w-full p-2 border rounded-lg"
                            />
                            <input
                                type="number"
                                defaultValue="30"
                                className="w-full mt-1 p-2 border rounded-lg"
                            />
                        </div>

                        <div className="flex-1">
                            <input
                                type="text"
                                defaultValue="L"
                                className="w-full p-2 border rounded-lg"
                            />
                            <input
                                type="number"
                                defaultValue="30"
                                className="w-full mt-1 p-2 border rounded-lg"
                            />
                        </div>

                        <div className="flex-1">
                            <input
                                type="text"
                                defaultValue="XL"
                                className="w-full p-2 border rounded-lg"
                            />
                            <input
                                type="number"
                                defaultValue="30"
                                className="w-full mt-1 p-2 border rounded-lg"
                            />
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex flex-col gap-3 p-1 rounded-md bg-[#d9c3b0] mb-2">
                <h1 className="text-center font-semibold">Color {name[1]}</h1>
                {/* Color Input */}
                <div className="flex flex-col sm:flex-row gap-4">
                    <div className="flex-1">
                        <label className="block text-sm font-medium">
                            Color Code
                        </label>
                        <input
                            type="color"
                            className="w-full h-10 mt-1 p-1 border rounded-lg"
                        />
                    </div>

                    <div className="flex-1">
                        <label className="block text-sm font-medium">
                            Color Name
                        </label>
                        <input
                            type="text"
                            placeholder="e.g. Coffee Brown"
                            className="w-full mt-1 p-2 border rounded-lg"
                        />
                    </div>
                </div>

                {/* Image URL */}
                <div>
                    <label className="block text-sm font-medium">
                        Image URL
                    </label>
                    <input
                        type="url"
                        placeholder="https://example.com/image.jpg"
                        className="w-full mt-1 p-2 border rounded-lg"
                    />
                </div>

                {/* Sizes */}
                <div>
                    <label className="block text-sm font-medium">
                        Sizes & Stock
                    </label>
                    <div className="flex flex-col sm:flex-row gap-4 mt-2">
                        <div className="flex-1">
                            <input
                                type="text"
                                defaultValue="M"
                                className="w-full p-2 border rounded-lg"
                            />
                            <input
                                type="number"
                                defaultValue="30"
                                className="w-full mt-1 p-2 border rounded-lg"
                            />
                        </div>

                        <div className="flex-1">
                            <input
                                type="text"
                                defaultValue="L"
                                className="w-full p-2 border rounded-lg"
                            />
                            <input
                                type="number"
                                defaultValue="30"
                                className="w-full mt-1 p-2 border rounded-lg"
                            />
                        </div>

                        <div className="flex-1">
                            <input
                                type="text"
                                defaultValue="XL"
                                className="w-full p-2 border rounded-lg"
                            />
                            <input
                                type="number"
                                defaultValue="30"
                                className="w-full mt-1 p-2 border rounded-lg"
                            />
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex flex-col gap-3 p-1 rounded-md bg-[#d9c3b0] mb-2">
                <h1 className="text-center font-semibold">Color {name[2]}</h1>
                {/* Color Input */}
                <div className="flex flex-col sm:flex-row gap-4">
                    <div className="flex-1">
                        <label className="block text-sm font-medium">
                            Color Code
                        </label>
                        <input
                            type="color"
                            className="w-full h-10 mt-1 p-1 border rounded-lg"
                        />
                    </div>

                    <div className="flex-1">
                        <label className="block text-sm font-medium">
                            Color Name
                        </label>
                        <input
                            type="text"
                            placeholder="e.g. Coffee Brown"
                            className="w-full mt-1 p-2 border rounded-lg"
                        />
                    </div>
                </div>

                {/* Image URL */}
                <div>
                    <label className="block text-sm font-medium">
                        Image URL
                    </label>
                    <input
                        type="url"
                        placeholder="https://example.com/image.jpg"
                        className="w-full mt-1 p-2 border rounded-lg"
                    />
                </div>

                {/* Sizes */}
                <div>
                    <label className="block text-sm font-medium">
                        Sizes & Stock
                    </label>
                    <div className="flex flex-col sm:flex-row gap-4 mt-2">
                        <div className="flex-1">
                            <input
                                type="text"
                                defaultValue="M"
                                className="w-full p-2 border rounded-lg"
                            />
                            <input
                                type="number"
                                defaultValue="30"
                                className="w-full mt-1 p-2 border rounded-lg"
                            />
                        </div>

                        <div className="flex-1">
                            <input
                                type="text"
                                defaultValue="L"
                                className="w-full p-2 border rounded-lg"
                            />
                            <input
                                type="number"
                                defaultValue="30"
                                className="w-full mt-1 p-2 border rounded-lg"
                            />
                        </div>

                        <div className="flex-1">
                            <input
                                type="text"
                                defaultValue="XL"
                                className="w-full p-2 border rounded-lg"
                            />
                            <input
                                type="number"
                                defaultValue="30"
                                className="w-full mt-1 p-2 border rounded-lg"
                            />
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex justify-center items-center p-1">
                <div
                    onClick={() => setMoreColor(!moreColor)}
                    className="p-2 border-2 rounded-lg"
                >
                    {moreColor ? "Close" : "Add more Color"}
                </div>
            </div>
        </div>
    );
}
