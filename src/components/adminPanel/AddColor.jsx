import { useState } from "react";
import { useLoaderData } from "react-router-dom";

export default function VariantForm() {
    const product = useLoaderData();
    // console.log(product._id);

    const [isSubmitting, setIsSubmitting] = useState(true);

    const [vars, setVars] = useState({
        color: "",
        colorCode: "#11224E",
        sizes: {
            s: 0,
            m: 0,
            l: 0,
            xl: 0,
            xxl: 0,
        },
        pricing: 0,
        images: [],
    });

    let totalStock = Object.values(vars.sizes).reduce(
        (sum, v) => sum + Number(v),
        0
    );

    const handleSubmit = async (e) => {
        if(!isSubmitting) return;
        setIsSubmitting(false);

        e.preventDefault();

        const varsForm = new FormData();
        varsForm.append("_id", product._id);

        Object.entries(vars).forEach(([key, value]) => {
            if (key !== "images") {
                if (key !== "sizes") {
                    varsForm.append(key, value);
                } else {
                    varsForm.append("sizes", JSON.stringify(vars.sizes));
                }
            } else if (key === "images") {
                value.map((imgFile) => {
                    varsForm.append(vars.color, imgFile);
                });
            }
        });

        for (let [key, value] of varsForm.entries()) {
            console.log(key, " : ", value);
        }

        // console.log(varsForm,"\n ........");
        console.log(vars);

        await fetch(`${import.meta.env.VITE_API_URL}/addColor`, {
            method: "post",
            body: varsForm,
        });
    };

    return (
        <form
            className="max-w-3xl mx-auto p-4 bg-white rounded-lg shadow"
            encType="multipart/form-data"
        >
            <h3 className="text-lg font-medium mb-4">Variant Input</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm">
                        Select Color & type Color Name
                    </label>
                    <div className="flex gap-2 mt-1">
                        <input
                            type="color"
                            value={vars.colorCode}
                            onChange={(e) => {
                                // setIsSubmitting(true);
                                setVars({
                                    ...vars,
                                    colorCode: e.target.value,
                                });
                            }}
                            className="w-12 h-10 p-0 rounded border"
                        />
                        <input
                            value={vars.color}
                            onChange={(e) => {
                                setVars({
                                    ...vars,
                                    color: e.target.value,
                                });
                            }}
                            className={`flex-1 border rounded p-2 bg-amber-200`}
                            placeholder="Type color name.."
                            required
                        />
                    </div>
                </div>

                <div className="md:col-span-2">
                    <label className="block text-sm mb-2">Sizes (stock)</label>
                    <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                        {["s", "m", "l", "xl", "xxl"].map((sz) => (
                            <div key={sz}>
                                <label className="block text-xs uppercase">
                                    {sz}
                                </label>
                                <input
                                    type="number"
                                    min={0}
                                    value={vars.sizes[sz]}
                                    onChange={(e) => {
                                        setVars({
                                            ...vars,
                                            sizes: {
                                                ...vars.sizes,
                                                [sz]: e.target.value,
                                            },
                                        });
                                    }}
                                    className="mt-1 w-full border rounded p-2"
                                />
                            </div>
                        ))}
                    </div>
                </div>

                <div>
                    <label className="block text-sm">Pricing</label>
                    <input
                        type="number"
                        min={0}
                        value={vars.pricing}
                        onChange={(e) => {
                            setVars({
                                ...vars,
                                pricing: e.target.value,
                            });
                        }}
                        className="mt-1 w-full border rounded p-2"
                        placeholder="Price.."
                    />
                </div>

                <div className="md:col-span-2">
                    <label className="block text-sm mb-2">Upload Images</label>

                    <input
                        type="file"
                        multiple
                        onChange={(e) => {
                            setVars({
                                ...vars,
                                images: Array.from(e.target.files),
                            });
                        }}
                        className="border p-2 rounded w-[100px]"
                        accept="image/*"
                    />

                    <div className="flex flex-wrap gap-3 mt-3">
                        {vars.images.map((img, idx) => (
                            <img
                                key={idx}
                                src={URL.createObjectURL(img)}
                                className="w-24 h-24 object-cover rounded border"
                            />
                        ))}
                    </div>
                </div>
            </div>

            <div className="mt-4 flex justify-between items-center">
                <div className="text-sm">Total stock : {totalStock}</div>

                {totalStock > 0 && vars.color !== "" && vars.images.length && isSubmitting ? (
                    <button
                        onClick={handleSubmit}
                        className="cursor-pointer px-4 py-2 bg-blue-600 text-white rounded"
                    >
                        Save
                    </button>
                ) : (
                    <span
                        className=" cursor-not-allowed px-4 py-2 bg-blue-300 text-white rounded"
                    >
                        Save
                    </span>
                )}
            </div>
        </form>
    );
}
