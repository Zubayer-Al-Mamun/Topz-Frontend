export default function AddProduct(){
    return (
        <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow p-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Section */}
        <div className="lg:col-span-2 space-y-6">
          {/* General Information */}
          <div className="p-5 border rounded-xl">
            <h2 className="text-lg font-semibold mb-4">General Information</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium">Name Product</label>
                <input
                  type="text"
                  placeholder="Puffer Jacket With Pocket Detail"
                  className="w-full mt-1 p-2 border rounded-lg"
                />
              </div>
              <div>
                <label className="block text-sm font-medium">Description Product</label>
                <textarea
                  rows="4"
                  placeholder="Cropped puffer jacket made of technical fabric..."
                  className="w-full mt-1 p-2 border rounded-lg"
                ></textarea>
              </div>
              {/* Size */}
              <div>
                <label className="block text-sm font-medium">Size</label>
                <div className="flex gap-2 mt-2">
                  {["XS", "S", "M", "XL", "XXL"].map((size) => (
                    <button
                      key={size}
                      className="px-3 py-1 border rounded-lg hover:bg-green-100 focus:bg-green-500 focus:text-white"
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
              {/* Gender */}
              <div>
                <label className="block text-sm font-medium">Gender</label>
                <div className="flex gap-4 mt-2">
                  {["Men", "Woman", "Unisex"].map((gender) => (
                    <label key={gender} className="flex items-center gap-2">
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
            <h2 className="text-lg font-semibold mb-4">Pricing And Stock</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium">Base Pricing</label>
                <input
                  type="text"
                  placeholder="$47.55"
                  className="w-full mt-1 p-2 border rounded-lg"
                />
              </div>
              <div>
                <label className="block text-sm font-medium">Stock</label>
                <input
                  type="number"
                  placeholder="77"
                  className="w-full mt-1 p-2 border rounded-lg"
                />
              </div>
              <div>
                <label className="block text-sm font-medium">Discount</label>
                <input
                  type="text"
                  placeholder="10%"
                  className="w-full mt-1 p-2 border rounded-lg"
                />
              </div>
              <div>
                <label className="block text-sm font-medium">Discount Type</label>
                <input
                  type="text"
                  placeholder="Chinese New Year Discount"
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
            <h2 className="text-lg font-semibold mb-4">Upload Img</h2>
            <div className="w-full">
              <img
                src="https://via.placeholder.com/250x250"
                alt="product"
                className="rounded-xl border mb-3"
              />
              <div className="flex gap-2">
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
