import { useState } from "react";

export default function VariantForm({ onSubmit }) {
    const [color, setColor] = useState("");
    const [colorCode, setColorCode] = useState("#000000");
    const [sizes, setSizes] = useState({ s: 0, m: 0, l: 0, xl: 0, xxl: 0 });
    const [pricing, setPricing] = useState("");
    const [images, setImages] = useState([]);
    const [preview, setPreview] = useState([]);


    const [vars , setVars] = useState({
        color : "",
        colorCode : "",
        sizes : {
            s : 0,
            m : 0,
            l : 0,
            xl : 0,
            xxl : 0
        },
        pricing : 0,
        images : [],
    })

    console.log(vars);

    const handleSize = (key, val) => {
        const n = parseInt(val || 0, 10);
        setSizes((prev) => ({ ...prev, [key]: Number.isNaN(n) ? 0 : n }));
    };

    const handleImageChange = (e) => {
        const files = Array.from(e.target.files);
        setImages(files);
        const urls = files.map((f) => URL.createObjectURL(f));
        setPreview(urls);
    };

    const handleSubmit = (e) => {


        // const data = new FormData();

        // Object.entries(formData).forEach(([key, value]) => {
        //     if (key === "images") {
        //         value.forEach((file) => data.append("images", file)); 
        //     } else {
        //         data.append(key, value);
        //     }
        // });



        e.preventDefault();

        const fd = new FormData();
        fd.append("color", color);
        fd.append("colorCode", colorCode);
        fd.append("pricing", pricing);

        Object.entries(sizes).forEach(([key, value]) => {
            fd.append(key, value);
        });

        images.forEach((file) => {
            fd.append("images", file);
        });

        if (typeof onSubmit === "function") onSubmit(fd);
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="max-w-3xl mx-auto p-4 bg-white rounded-lg shadow"
        >
            <h3 className="text-lg font-medium mb-4">Variant Input</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm">Color </label>
                    <input
                        value={vars.color}
                        onChange={(e) => setVars({
                            ...vars,
                            color : e.target.value
                        })}
                        className="mt-1 w-full border rounded p-2"
                        placeholder="Color Name..."
                        required
                    />
                </div>

                <div>
                    <label className="block text-sm">Color Code</label>
                    <div className="flex gap-2 mt-1">
                        <input
                            type="color"
                            value={vars.colorCode}
                            onChange={(e) => setColorCode({
                                ...vars,
                                colorCode : e.target.value
                            })}
                            className="w-12 h-10 p-0 rounded border"
                        />
                        <input
                            value={vars.colorCode}
                            onChange={(e) => setColorCode({
                                ...vars,
                                colorCode : e.target.value
                            })}
                            className="flex-1 border rounded p-2"
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
                                    value={sizes[sz]}
                                    onChange={(e) =>
                                        handleSize(sz, e.target.value)
                                    }
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
                        step="0.01"
                        value={pricing}
                        onChange={(e) => setPricing(e.target.value)}
                        className="mt-1 w-full border rounded p-2"
                        placeholder="Price.."
                    />
                </div>

                <div className="md:col-span-2">
                    <label className="block text-sm mb-2">Upload Images</label>

                    <input
                        type="file"
                        multiple
                        onChange={handleImageChange}
                        className="border p-2 rounded w-[100px]"
                        accept="image/*"
                    />

                    <div className="flex flex-wrap gap-3 mt-3">
                        {preview.map((url, i) => (
                            <img
                                key={i}
                                src={url}
                                className="w-24 h-24 object-cover rounded border"
                            />
                        ))}
                    </div>
                </div>
            </div>

            <div className="mt-4 flex justify-between items-center">
                <div className="text-sm">
                    Total stock :{" "}
                    {Object.values(sizes).reduce((a, b) => a + b, 0)}
                </div>

                <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 text-white rounded"
                >
                    Save
                </button>
            </div>
        </form>
    );
}

// import { useState } from "react";

// export default function AddColor({ onSubmit }) {
//     const [color, setColor] = useState("");
//     const [colorCode, setColorCode] = useState("#000000");
//     const [sizes, setSizes] = useState({ s: 0, m: 0, l: 0, xl: 0, xxl: 0 });
//     const [images, setImages] = useState([""]);
//     const [pricing, setPricing] = useState("");

//     const handleSize = (key, val) => {
//         const n = parseInt(val || 0, 10);
//         setSizes((prev) => ({ ...prev, [key]: Number.isNaN(n) ? 0 : n }));
//     };

//     const addImage = () => setImages((prev) => [...prev, ""]);
//     const removeImage = (i) =>
//         setImages((prev) => prev.filter((_, idx) => idx !== i));
//     const setImage = (i, val) =>
//         setImages((prev) => prev.map((v, idx) => (idx === i ? val : v)));

//     const handleSubmit = (e) => {
//         e.preventDefault();
//         const payload = {
//             color: color.trim(),
//             colorCode,
//             s: Number(sizes.s),
//             m: Number(sizes.m),
//             l: Number(sizes.l),
//             xl: Number(sizes.xl),
//             xxl: Number(sizes.xxl),
//             imageUrl: images.map((u) => u.trim()).filter(Boolean),
//             pricing: pricing === "" ? null : Number(pricing),
//         };
//         if (typeof onSubmit === "function") onSubmit(payload);
//     };

//     return (
//         <form
//             onSubmit={handleSubmit}
//             className="max-w-3xl mx-auto p-4 bg-white rounded-lg shadow-sm"
//         >
//             <h3 className="text-lg font-medium mb-4">Variant Input</h3>

//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 <div>
//                     <label className="block text-sm">Color</label>
//                     <input
//                         value={color}
//                         onChange={(e) => setColor(e.target.value)}
//                         className="mt-1 w-full border rounded p-2"
//                         placeholder="e.g. Jet Black"
//                         required
//                     />
//                 </div>

//                 <div>
//                     <label className="block text-sm">Color Code</label>
//                     <div className="flex gap-2 mt-1">
//                         <input
//                             type="color"
//                             value={colorCode}
//                             onChange={(e) => setColorCode(e.target.value)}
//                             className="w-12 h-10 p-0 rounded border"
//                         />
//                         <input
//                             value={colorCode}
//                             onChange={(e) => setColorCode(e.target.value)}
//                             className="flex-1 border rounded p-2"
//                             placeholder="#000000"
//                             required
//                         />
//                     </div>
//                 </div>

//                 <div className="md:col-span-2">
//                     <label className="block text-sm mb-2">Sizes (stock)</label>
//                     <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
//                         {["s", "m", "l", "xl", "xxl"].map((sz) => (
//                             <div key={sz}>
//                                 <label className="block text-xs uppercase">
//                                     {sz}
//                                 </label>
//                                 <input
//                                     type="number"
//                                     min={0}
//                                     value={sizes[sz]}
//                                     onChange={(e) =>
//                                         handleSize(sz, e.target.value)
//                                     }
//                                     className="mt-1 w-full border rounded p-2"
//                                 />
//                             </div>
//                         ))}
//                     </div>
//                 </div>

//                 <div>
//                     <label className="block text-sm">Pricing</label>
//                     <input
//                         type="number"
//                         min={0}
//                         step="0.01"
//                         value={pricing}
//                         onChange={(e) => setPricing(e.target.value)}
//                         className="mt-1 w-full border rounded p-2"
//                         placeholder="e.g. 450"
//                     />
//                 </div>

//                 <div className="md:col-span-2">
//                     <label className="block text-sm mb-2">Image URLs</label>
//                     <div className="space-y-2">
//                         {images.map((img, i) => (
//                             <div key={i} className="flex gap-2">
//                                 <input
//                                     value={img}
//                                     onChange={(e) =>
//                                         setImage(i, e.target.value)
//                                     }
//                                     className="flex-1 border rounded p-2"
//                                     placeholder="https://example.com/image.jpg"
//                                 />
//                                 <button
//                                     type="button"
//                                     onClick={() => removeImage(i)}
//                                     className="px-3 py-2 border rounded"
//                                 >
//                                     Remove
//                                 </button>
//                             </div>
//                         ))}

//                         <div className="flex gap-2">
//                             <button
//                                 type="button"
//                                 onClick={addImage}
//                                 className="px-3 py-2 border rounded"
//                             >
//                                 + Add image
//                             </button>
//                             <button
//                                 type="button"
//                                 onClick={() => setImages([""])}
//                                 className="px-3 py-2 border rounded"
//                             >
//                                 Reset
//                             </button>
//                         </div>
//                     </div>
//                 </div>
//             </div>

//             <div className="mt-4 flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
//                 <div className="flex gap-2">
//                     <button
//                         type="submit"
//                         className="px-4 py-2 rounded bg-sky-600 text-white"
//                     >
//                         Save
//                     </button>
//                     <button
//                         type="button"
//                         onClick={() => {
//                             setColor("");
//                             setColorCode("#000000");
//                             setSizes({ s: 0, m: 0, l: 0, xl: 0, xxl: 0 });
//                             setImages([""]);
//                             setPricing("");
//                         }}
//                         className="px-4 py-2 border rounded"
//                     >
//                         Reset
//                     </button>
//                 </div>

//                 <div className="flex items-center gap-3">
//                     <div className="p-2 border rounded">
//                         <div className="text-xs">Color</div>
//                         <div
//                             className="w-8 h-8 rounded mt-1"
//                             style={{ background: colorCode }}
//                         />
//                     </div>

//                     <div className="p-2 border rounded">
//                         <div className="text-xs">Total stock</div>
//                         <div className="text-sm mt-1">
//                             {Object.values(sizes).reduce((a, b) => a + b, 0)}
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </form>
//     );
// }
