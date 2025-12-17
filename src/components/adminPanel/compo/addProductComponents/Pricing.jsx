
export default function Pricing({formData, setFormData}) {
    return (
        <div className="p-5  max-sm:p-1 border rounded-xl">
            <h2 className="text-lg font-semibold mb-4">Pricing & Stock</h2>
            <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1">
                    <label className="block text-sm font-medium">
                        Base Price
                    </label>
                    <input
                        type="number"
                        placeholder="599"
                        className="w-full mt-1 p-2 border rounded-lg"
                        onChange={(e) =>
                            setFormData({
                                ...formData,
                                pricing: e.target.value,
                            })
                        }
                    />
                </div>
                <div className="flex-1">
                    <label className="block text-sm font-medium">
                        Discount Price
                    </label>
                    <input
                        type="number"
                        placeholder="499"
                        className="w-full mt-1 p-2 border rounded-lg"
                        onChange={(e) =>
                            setFormData({
                                ...formData,
                                discountsPrice: e.target.value,
                            })
                        }
                    />
                </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 mt-4">
                <div className="flex-1">
                    <label className="block text-sm font-medium">
                        Discount Percentage {" (?%)"}
                    </label>
                    <input
                        type="number"
                        placeholder="30%"
                        className="w-full mt-1 p-2 border rounded-lg"
                        onChange={(e) =>
                            setFormData({
                                ...formData,
                                discountsPercentage: e.target.value,
                            })
                        }
                    />
                </div>
                <div className="flex-1">
                    <label className="block text-sm font-medium">
                        Total Stock
                    </label>
                    <input
                        type="number"
                        placeholder="100"
                        className="w-full mt-1 p-2 border rounded-lg"
                        onChange={(e) =>
                            setFormData({
                                ...formData,
                                stock: e.target.value,
                            })
                        }
                    />
                </div>
            </div>







            <div className="p-5 border rounded-xl mt-4">
                <h2 className="text-lg font-semibold mb-4"> Vendor (যেখান থেকে কেনা হয়েছে )</h2>
                <input
                    type="text"
                    placeholder="XYZ Textile Company"
                    className="w-full p-2 border rounded-lg"
                    onChange={(e) =>
                            setFormData({
                                ...formData,
                                vendor: e.target.value,
                            })
                        }
                />
            </div>
        </div>
    );
}
