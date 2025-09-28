export default function GeneralInfoForm({ formData, setFormData }) {
    return (
        <div className="p-4 border rounded-xl">
            <h2 className="text-lg font-semibold mb-4">General Information</h2>
            <div className="">
                {/* Title */}
                <div>
                    <label className="block text-sm font-medium">
                        Product Title / Name
                    </label>
                    <input
                        onChange={(e) =>
                            setFormData({ ...formData, title: e.target.value })
                        }
                        type="text"
                        value={formData.title}
                        className="w-full mt-1 p-2 border rounded-lg"
                    />
                </div>
                {/* Description */}
                <div>
                    <label className="block text-sm font-medium">
                        Description
                    </label>
                    <textarea
                        rows="4"
                        defaultValue="Soft cotton crew neck t-shirt, everyday wear."
                        className="w-full mt-1 p-2 border rounded-lg"
                        onChange={(e) =>
                            setFormData({
                                ...formData,
                                description: e.target.value,
                            })
                        }
                    />
                </div>
                {/* Category / Subcategory */}
                <div className="flex flex-col sm:flex-row gap-4">
                    <div className="flex-1">
                        <label className="block text-sm font-medium">
                            Category
                        </label>

                        <select
                            className="w-full mt-1 p-2 border rounded-lg"
                            defaultValue="t-shirt"
                            onChange={(e) =>
                            setFormData({
                                ...formData,
                                category: e.target.value,
                            })
                        }
                        >
                            <option value="t-shirt">T-Shirt</option>
                            <option value="drop-shoulder">Drop Shoulder</option>
                            <option value="shirt">Shirt</option>
                            <option value="hoodie">Hoodie</option>
                        </select>

                        {/* <input
                            type="text"
                            defaultValue="hoodie"
                            className="w-full mt-1 p-2 border rounded-lg"
                        /> */}
                    </div>
                    <div className="flex-1">
                        <label className="block text-sm font-medium">
                            Subcategory
                        </label>
                        <input
                            type="text"
                            placeholder="Casual, Elegant, Cozy, Sporty, Business Casual"
                            className="w-full mt-1 p-2 border rounded-lg"

                            onChange={(e) =>
                            setFormData({
                                ...formData,
                                subcategory: e.target.value,
                            })
                        }
                        />
                    </div>
                </div>
                {/* For (Gender) */}
                <div>
                    <label className="block text-sm font-medium">For</label>
                    <select
                        className="w-full mt-1 p-2 border rounded-lg"
                        defaultValue="male"
                        onChange={(e) =>
                            setFormData({
                                ...formData,
                                for: e.target.value,
                            })
                        }
                    >
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="kids">Kids</option>
                    </select>
                </div>
            </div>
        </div>
    );
}
