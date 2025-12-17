import { useForm, useFieldArray } from "react-hook-form";
import { useNavigate } from "react-router-dom";

export default function AddProduct() {
  const navigate = useNavigate();

  const {
    register,
    control,
    handleSubmit,
    watch,
    formState: { isSubmitting }
  } = useForm({
    defaultValues: {
      variants: [
        {
          color: "",
          colorCode: "#000000",
          pricing: "",
          sizes: { s: 0, m: 0, l: 0, xl: 0, xxl: 0 },
          images: []
        }
      ]
    }
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "variants"
  });

  const onSubmit = async (data) => {
    const fd = new FormData();

    // product fields
    Object.entries(data).forEach(([key, value]) => {
      if (key !== "variants") {
        fd.append(key, value);
      }
    });

    // variants
    data.variants.forEach((v, i) => {
      fd.append(`variants[${i}]`, JSON.stringify({
        color: v.color,
        colorCode: v.colorCode,
        pricing: v.pricing,
        sizes: v.sizes
      }));

      v.images.forEach((img) => {
        fd.append(`variantImages_${i}`, img);
      });
    });

    const res = await fetch(
      `${import.meta.env.VITE_API_URL}/product`,
      { method: "POST", body: fd }
    );

    if (res.ok) navigate("/admin/products");
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      encType="multipart/form-data"
      className="max-w-4xl mx-auto bg-white p-6 rounded shadow space-y-6"
    >
      <h2 className="text-xl font-semibold">Add Product</h2>

      {/* PRODUCT INFO */}
      <input {...register("title")} placeholder="Title" className="input" />
      <textarea {...register("description")} placeholder="Description" />

      <select {...register("category")}>
        <option value="">Select Category</option>
        <option value="hoodie">Hoodie</option>
        <option value="t-shirt">T-Shirt</option>
      </select>

      {/* VARIANTS */}
      <h3 className="text-lg font-semibold">Variants</h3>

      {fields.map((item, index) => (
        <div key={item.id} className="border p-4 rounded space-y-3">
          <input
            {...register(`variants.${index}.color`)}
            placeholder="Color Name"
          />

          <input
            type="color"
            {...register(`variants.${index}.colorCode`)}
          />

          <input
            type="number"
            {...register(`variants.${index}.pricing`)}
            placeholder="Price"
          />

          {/* Sizes */}
          {["s","m","l","xl","xxl"].map(sz => (
            <input
              key={sz}
              type="number"
              {...register(`variants.${index}.sizes.${sz}`)}
              placeholder={sz.toUpperCase()}
            />
          ))}

          {/* Images */}
          <input
            type="file"
            multiple
            {...register(`variants.${index}.images`)}
          />

          <button
            type="button"
            onClick={() => remove(index)}
            className="text-red-500"
          >
            Remove Variant
          </button>
        </div>
      ))}

      <button
        type="button"
        onClick={() =>
          append({
            color: "",
            colorCode: "#000000",
            pricing: "",
            sizes: { s: 0, m: 0, l: 0, xl: 0, xxl: 0 },
            images: []
          })
        }
        className="bg-gray-200 px-4 py-2 rounded"
      >
        + Add Variant
      </button>

      <button
        type="submit"
        disabled={isSubmitting}
        className="bg-amber-500 text-white px-6 py-2 rounded"
      >
        {isSubmitting ? "Uploading..." : "Save Product"}
      </button>
    </form>
  );
}
