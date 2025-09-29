import { useState } from "react";
// import { useNavigate } from "react-router-dom";
import SingleProduct from "../SingleProduct";
import GeneralInfoForm from "./compo/addProductComponents/GeneralInfoForm";
import Pricing from "./compo/addProductComponents/Pricing";
import SizeAndColor from "./compo/addProductComponents/SizeAndColor";

export default function AddProduct() {
    // const navigat = useNavigate();
    // const submit = useSubmit();
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        productId: "1e2d3c4b-5f6a-7b8c-9d0e-1f2a3b4c5d6e",
        title: "Classic Hoodie",
        description: "Soft and cozy material.",
        category: "hoodie",
        subcategory: "casual",
        pricing: 28900,
        discountsPrice: 23120,
        discountsPercentage: 20,
        for: "male",
        stock: 42,
        rating: 4,
        vars: [
            {
                color: "blue",
                colorCode: "#0000FF",
                m: 33,
                l: 45,
                xl: 27,
                imageUrl: [
                    "https://picsum.photos/id/101/500/500",
                    "https://picsum.photos/id/202/500/500",
                ],
            },
            {
                color: "red",
                colorCode: "#FF0000",
                m: 22,
                l: 36,
                xl: 48,
                imageUrl: [
                    "https://picsum.photos/id/303/500/500",
                    "https://picsum.photos/id/404/500/500",
                ],
            },
        ],
        vendor: "BrandB",
        createdAt: "2024-05-11T09:45:00Z",
        updatedAt: "2025-06-02T13:15:00Z",
        reviews: [],
        totalView: 256,
        totalSale: 49,
    });






const handleSubmit = async () => {
  try {
    const data = new FormData();

    // General fields
    data.append("productId", formData.productId);
    data.append("title", formData.title);
    data.append("description", formData.description);
    data.append("category", formData.category);
    data.append("subcategory", formData.subcategory);
    data.append("pricing", formData.pricing);
    data.append("discountsPrice", formData.discountsPrice);
    data.append("discountsPercentage", formData.discountsPercentage);
    data.append("for", formData.for);
    data.append("vendor", formData.vendor);
    data.append("stock", formData.stock);
    data.append("rating", formData.rating || 0);
    data.append("totalView", formData.totalView || 0);
    data.append("totalSale", formData.totalSale || 0);

    // vars array (colors + images)
    formData.vars.forEach((v, idx) => {
      data.append(`vars[${idx}][color]`, v.color);
      data.append(`vars[${idx}][colorCode]`, v.colorCode);
      data.append(`vars[${idx}][m]`, v.m);
      data.append(`vars[${idx}][l]`, v.l);
      data.append(`vars[${idx}][xl]`, v.xl);

      v.imageUrl.forEach((file, imgIdx) => {
        if (file) data.append(`vars[${idx}][image][${imgIdx}]`, file);
      });
    });

    const res = await fetch("https://sn34t60d-8000.inc1.devtunnels.ms/product", {
      method: "POST",
      body: data, // Content-Type automatically handled
    });

    const result = await res.json();
    console.log("Upload result:", result);
  } catch (err) {
    console.error("Error uploading product:", err);
  }
};






















//     const handleSubmit = async () => {
//   try {
//     const data = new FormData();

//     data.append("productId", formData.productId);
//     data.append("title", formData.title);
//     data.append("description", formData.description);
//     data.append("category", formData.category);
//     data.append("subcategory", formData.subcategory);
//     data.append("pricing", formData.pricing);
//     data.append("discountsPrice", formData.discountsPrice);
//     data.append("discountsPercentage", formData.discountsPercentage);
//     data.append("for", formData.for);
//     data.append("vendor", formData.vendor);
//     data.append("stock", formData.stock);


//     formData.vars.forEach((v, idx) => {
//       data.append(`vars[${idx}][color]`, v.color);
//       data.append(`vars[${idx}][colorCode]`, v.colorCode);
//       data.append(`vars[${idx}][m]`, v.m);
//       data.append(`vars[${idx}][l]`, v.l);
//       data.append(`vars[${idx}][xl]`, v.xl);


//       v.imageUrl.forEach((file, imgIdx) => {
//         if (file) data.append(`vars[${idx}][image][${imgIdx}]`, file);
//       });
//     });

//     const res = await fetch("https://sn34t60d-8000.inc1.devtunnels.ms/product", {
//       method: "POST",
//       body: data, 
//     });

//     if (!res.ok) console.log("New Product Adding Fatching problem..");

//     navigat("/admin/products");
//   } catch (err) {
//     alert("Some Problem in Adding Product...\nCall : Zubayer");
//     console.log("Some Problem in Adding Product...", err);
//     navigat("/admin/products");
//   }
// };





    return (
        <div className="max-sm:w-full max-sm:p-0 p-4 overflow-x-hidden">
            {step === 1 && (
                <GeneralInfoForm
                    formData={formData}
                    setFormData={setFormData}
                />
            )}
            {step === 2 && (
                <Pricing formData={formData} setFormData={setFormData} />
            )}
            {step === 3 && (
                <SizeAndColor formData={formData} setFormData={setFormData} />
            )}
            {step === 4 && (
                <SingleProduct
                    propsValue={formData}
                    formData={formData}
                    setFormData={setFormData}
                />
            )}

            <div className="flex justify-between mt-6 px-6">
                {step > 1 && (
                    <button
                        onClick={() => setStep(step - 1)}
                        className="px-4 py-2 border rounded"
                    >
                        Back
                    </button>
                )}
                {step < 4 ? (
                    <button
                        onClick={() => setStep(step + 1)}
                        className="px-4 py-2 bg-green-500 text-white rounded"
                    >
                        Next
                    </button>
                ) : (
                    <button
                        onClick={handleSubmit}
                        className=" px-4 py-2 bg-blue-500 text-white rounded"
                    >
                        Submit
                    </button>
                )}
            </div>
        </div>
    );
}
