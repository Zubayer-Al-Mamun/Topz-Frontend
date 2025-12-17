import { useState } from "react";

export default function SizeAndColor({ formData, setFormData }) {
  // Initialize 6 colors, each with 2 image files
  const [local, setLocal] = useState(
    Array(6)
      .fill()
      .map(() => ({
        color: "",
        colorCode: "#000000",
        m: 0,
        l: 0,
        xl: 0,
        imageUrl: [null, null], // store file objects
      }))
  );

  // Generic change handler for fields except imageUrl
  const handleChange = (idx, field, value) => {
    setLocal((prev) => {
      const updated = [...prev];
      updated[idx] = { ...updated[idx], [field]: value };
      return updated;
    });
  };

  // Special handler for image files
  const handleImageChange = (idx, imgIdx, file) => {
    if (!file) return;
    setLocal((prev) => {
      const updated = [...prev];
      const files = [...updated[idx].imageUrl];
      files[imgIdx] = file; // save file object
      updated[idx] = { ...updated[idx], imageUrl: files };
      return updated;
    });
  };

  // Sync local state to parent formData
  const handleBlur = () => {
    // console.log(local)
    setFormData((prev) => ({
      ...prev,
      vars: local,
    }));
  };

  return (
    <div className="p-5 max-sm:p-1 rounded-xl">
      <h2 className="text-lg font-semibold mb-2">Sizes & Colors</h2>
      <p className="text-[18px] p-1 text-red-500 font-semibold">
        (সব রং এবং সাইজের স্টক উল্লেখ করতে হবে)
      </p>
      <hr />
      <div className="space-y-4">
        {local.map((item, idx) => (
          <div
            key={idx}
            className={`flex flex-col gap-3 p-2 shadow-xl rounded-md m-2 mb-5 
            ${idx % 2 === 0 ? "bg-[#5735e133]" : "bg-[#1cc9f82a]"}`}
          >
            <h1 className="text-center font-semibold">Color {idx + 1}</h1>

            {/* Color inputs */}
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <label className="block text-sm font-medium">Color Code</label>
                <input
                  type="color"
                  value={item.colorCode || "#000000"}
                  onChange={(e) =>
                    handleChange(idx, "colorCode", e.target.value)
                  }
                  onBlur={handleBlur}
                  className="w-full h-10 mt-1 p-1 border rounded-lg"
                />
              </div>
              <div className="flex-1">
                <label className="block text-sm font-medium">Color Name</label>
                <input
                  type="text"
                  value={item.color}
                  placeholder="e.g. Coffee Brown"
                  onChange={(e) => handleChange(idx, "color", e.target.value)}
                  onBlur={handleBlur}
                  className="w-full mt-1 p-2 border rounded-lg"
                />
              </div>
            </div>

            {/* Image Inputs */}
            <div>
              <label className="block text-sm font-medium">Images</label>
              <div className="flex gap-2 mt-1">
                {item.imageUrl.map((file, imgIdx) => (
                  <div key={imgIdx} className="flex flex-col">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) =>
                        handleImageChange(idx, imgIdx, e.target.files[0])
                      }
                      onBlur={handleBlur}
                      className="w-full p-2 border rounded-lg"
                    />

                    {/* Preview */}
                    {file && (
                      <img
                        src={URL.createObjectURL(file)}
                        alt={`preview-${idx}-${imgIdx}`}
                        className="mt-2 w-24 h-24 object-cover rounded border"
                      />
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Sizes */}
            <div>
              <label className="block text-sm font-medium">Sizes & Stock</label>
              <div className="flex flex-col sm:flex-row gap-4 mt-2">
                {["m", "l", "xl"].map((size) => (
                  <div key={size} className="flex-1">
                    <input
                      type="text"
                      value={size.toUpperCase()}
                      readOnly
                      className="w-full p-2 border rounded-lg"
                    />
                    <input
                      type="number"
                      value={item[size]}
                      onChange={(e) =>
                        handleChange(idx, size, e.target.value)
                      }
                      onBlur={handleBlur}
                      className="w-full mt-1 p-2 border rounded-lg"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}


























// import { useState } from "react";


// export default function SizeAndColor({ formData, setFormData }) {
//   // Initialize 6 colors, each with 2 image URLs
//   const [local, setLocal] = useState(
//     Array(6).fill().map(() => ({
//       color: "",
//       colorCode: "#000000",
//       m: 0,
//       l: 0,
//       xl: 0,
//       imageUrl: ["", ""], // 2 images per color
//     }))
//   );

//   console.log(local);

//   // Generic change handler for fields except imageUrl
//   const handleChange = (idx, field, value) => {
//     setLocal((prev) => {
//       const updated = [...prev];
//       updated[idx] = { ...updated[idx], [field]: value };
//       return updated;
//     });
//   };

//   // Special handler for imageUrl array
//   const handleImageChange = (idx, imgIdx, value) => {
//     console.log(idx, imgIdx, value);
//     const formImage = new FormData();



//     // setLocal((prev) => {
//     //   const updated = [...prev];
//     //   const urls = [...updated[idx].imageUrl];
//     //   urls[imgIdx] = value;
//     //   updated[idx] = { ...updated[idx], imageUrl: urls };
//     //   return updated;
//     // });
//   };

//   // On blur / submit, sync with parent formData
//   const handleBlur = () => {
//     setFormData((prev) => ({
//       ...prev,
//       vars: local,
//     }));
//   };

//   return (
//     <div className="p-5 max-sm:p-1 rounded-xl">
//       <h2 className="text-lg font-semibold mb-2">Sizes & Colors</h2>
//       <p className="text-[18px] p-1 text-red-500 font-semibold">
//         (সব রং এবং সাইজের স্টক উল্লেখ করতে হবে)
//       </p>
//       <hr />
//       <div className="space-y-4">
//         {local.map((item, idx) => (
//           <div
//             key={idx}
//             className={`flex flex-col gap-3 p-2 shadow-xl rounded-md m-2 mb-5 
//             ${idx % 2 === 0 ? "bg-[#5735e133]" : "bg-[#1cc9f82a]"}`}
//           >
//             <h1 className="text-center font-semibold">Color {idx + 1}</h1>

//             {/* Color inputs */}
//             <div className="flex flex-col sm:flex-row gap-4">
//               <div className="flex-1">
//                 <label className="block text-sm font-medium">Color Code</label>
//                 <input
//                   type="color"
//                   value={item.colorCode || "#000000"}
//                   onChange={(e) =>
//                     handleChange(idx, "colorCode", e.target.value)
//                   }
//                   onBlur={handleBlur}
//                   className=" w-full h-10 mt-1 p-1 border rounded-lg"
//                 />
//               </div>
//               <div className="flex-1">
//                 <label className="block text-sm font-medium">Color Name</label>
//                 <input
//                   type="text"
//                   value={item.color}
//                   placeholder="e.g. Coffee Brown"
//                   onChange={(e) => handleChange(idx, "color", e.target.value)}
//                   onBlur={handleBlur}
//                   className="w-full mt-1 p-2 border rounded-lg"
//                 />
//               </div>
//             </div>

//             {/* Image URLs */}
//             <div>
//               <label className="block text-sm font-medium">Image URLs</label>
//               <div className="flex gap-2 mt-1">
//                 {item.imageUrl.map((url, imgIdx) => (
//                   <input
//                     key={imgIdx}
//                     type="file"
//                     accept="image/*"
//                     // value={url}
//                     onChange={(e) =>
//                       handleImageChange(idx, imgIdx, e.target.value)
//                     }
//                     onBlur={handleBlur}
//                     className="w-full p-2 border rounded-lg"
//                   />
//                 ))}
//               </div>
//             </div>

//             {/* Sizes */}
//             <div>
//               <label className="block text-sm font-medium">Sizes & Stock</label>
//               <div className="flex flex-col sm:flex-row gap-4 mt-2">
//                 {["m", "l", "xl"].map((size) => (
//                   <div key={size} className="flex-1">
//                     <input
//                       type="text"
//                       value={size.toUpperCase()}
//                       readOnly
//                       className="w-full p-2 border rounded-lg"
//                     />
//                     <input
//                       type="number"
//                       value={item[size]}
//                       onChange={(e) =>
//                         handleChange(idx, size, e.target.value)
//                       }
//                       onBlur={handleBlur}
//                       className="w-full mt-1 p-2 border rounded-lg"
//                     />
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }
