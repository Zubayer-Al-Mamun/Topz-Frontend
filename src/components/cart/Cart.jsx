import { useContext } from "react";
import { CartContext } from "../../context/CartContext";
import { NavLink } from "react-router-dom";

export default function Cart() {
  const { cartItems = [], setCartItems } = useContext(CartContext) || {};
 



  const deliveryCharge = 120;

  const getUnitPrice = (price, discount) => {
    const validPrice = Number(price) || 0;
    const validDiscount = Number(discount) || 0;
    return Math.ceil(validPrice * (1 - validDiscount / 100));
  };

  const handleQuantity = (id, type) => {
    setCartItems((prevItems) =>
      prevItems.map((item) => {
        if (item._id === id) {
          let newQty = Number(item.qty) || 1;
          if (type === "increase") newQty += 1;
          if (type === "decrease" && newQty > 1) newQty -= 1;
          return { ...item, qty: newQty };
        }
        return item;
      })
    );
  };

  const handleRemove = (id) => {
    setCartItems((prevItems) => prevItems.filter((item) => item._id !== id));
  };

  const subTotal = cartItems.reduce((total, item) => {
    const unitPrice = getUnitPrice(item.pricing, item.discountsPercentage);
    return total + unitPrice * (Number(item.qty) || 1);
  }, 0);

  const grandTotal = subTotal > 0 ? subTotal + deliveryCharge : 0;

  return (
    // এখানে max-h-[1100px] এবং overflow-y-auto যোগ করা হয়েছে যাতে উচ্চতা ১১০০ পিক্সেলের বেশি না হয়।
    <div className="min-h-screen max-h-[1100px] overflow-y-auto py-10 px-4 sm:px-6 lg:px-8 w-full">
      
      {/* যদি আপনি Width 1100px করতে চান তবে w-full এর জায়গায় max-w-[1100px] mx-auto ব্যবহার করবেন */}
      <div className="w-full">
        {/* Header Section */}
        <div className="mb-8">
          <NavLink
            to="/"
            className="flex items-center text-sm text-gray-500 hover:text-gray-700 w-max"
          >
            <svg
              className="w-4 h-4 mr-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            Go Back
          </NavLink>
          <div className="text-center mt-2">
            <h1 className="text-3xl font-bold text-gray-900">Cart</h1>
            <p className="text-sm text-gray-500 mt-1">Home / Cart</p>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 w-full">
          {/* Left Column: Cart Items */}
          <div className="w-full lg:w-2/3 p-6 rounded-lg border border-gray-200">
            {/* Table Header (Hidden on Mobile) */}
            <div className="hidden md:grid grid-cols-12 gap-4 text-sm font-semibold text-gray-500 border-b pb-4 mb-4">
              <div className="col-span-5">Product Details</div>
              <div className="col-span-3 text-center">Quantity</div>
              <div className="col-span-2 text-center">Price</div>
              <div className="col-span-2 text-right">Total</div>
            </div>

            {/* Cart Items List */}
            {cartItems.length === 0 ? (
              <div className="text-center py-10 text-gray-500">
                Your cart is empty.
              </div>
            ) : (
              cartItems.map((item) => {
                const unitPrice = getUnitPrice(
                  item.pricing,
                  item.discountsPercentage
                );
                const itemTotal = unitPrice * (Number(item.qty) || 1);

                return (
                  <div
                    key={item._id}
                    className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center border-b border-gray-200 py-4 last:border-0"
                  >
                    {/* Product Info */}
                    <div className="col-span-1 md:col-span-5 flex items-center gap-4">
                      <img
                        src={item.images?.[0] || item.imageUrl || ""}
                        alt={item.title || "Product Image"}
                        className="w-16 h-16 object-cover rounded-md border"
                      />
                      <div>
                        <h3 className="text-sm font-semibold text-gray-800 line-clamp-2">
                          {item.title}
                        </h3>
                      </div>
                    </div>

                    {/* Quantity Controls */}
                    <div className="col-span-1 md:col-span-3 flex justify-center">
                      <div className="flex items-center border rounded-md">
                        <button
                          onClick={() => handleQuantity(item._id, "decrease")}
                          className="px-3 py-1 text-gray-600 hover:bg-gray-100 transition"
                        >
                          -
                        </button>
                        <span className="px-3 py-1 border-l border-r text-sm font-medium">
                          {item.qty}
                        </span>
                        <button
                          onClick={() => handleQuantity(item._id, "increase")}
                          className="px-3 py-1 text-gray-600 hover:bg-gray-100 transition"
                        >
                          +
                        </button>
                      </div>
                    </div>

                    {/* Unit Price */}
                    <div className="col-span-1 md:col-span-2 text-center max-md:hidden">
                      <span className="text-sm font-medium text-gray-600">
                        ৳ {unitPrice}
                      </span>
                    </div>

                    {/* Total Price & Remove */}
                    <div className="col-span-1 md:col-span-2 flex justify-between md:justify-end items-center">
                      <span className="text-sm font-bold text-gray-800">
                        ৳ {itemTotal}
                      </span>
                      <button
                        onClick={() => handleRemove(item._id)}
                        className="ml-4 text-gray-400 hover:text-red-500 transition"
                        aria-label="Remove item"
                      >
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Right Column: Order Summary */}
          <div className="w-full lg:w-1/3">
            <div className="p-6 rounded-lg border border-gray-200 sticky top-20">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Total</h2>

              <div className="flex justify-between items-center mb-4 text-sm">
                <span className="text-gray-600">Sub-Total</span>
                <span className="font-semibold text-gray-800">৳ {subTotal}</span>
              </div>

              <div className="flex justify-between items-center mb-4 text-sm">
                <span className="text-gray-600">Delivery</span>
                <span className="font-semibold text-gray-800">
                  {subTotal > 0 ? `৳ ${deliveryCharge}` : "৳ 0"}
                </span>
              </div>
              <p className="text-xs text-gray-500 mb-6">
                Standard Delivery (Inside Dhaka)
              </p>

              <hr className="my-4 border-gray-200" />

              <div className="flex justify-between items-center mb-6">
                <span className="text-base font-bold text-gray-900">Total</span>
                <span className="text-lg font-bold text-gray-900">
                  ৳ {grandTotal}
                </span>
              </div>

              <button
                disabled={cartItems.length === 0}
                className="w-full bg-[#E50027] text-white py-3 rounded-md font-semibold hover:bg-red-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Check Out
              </button>

              {/* Payment Methods Section */}
              <div className="mt-8">
                <h3 className="text-sm font-semibold text-gray-800 mb-4">
                  We Accept
                </h3>
                <div className="flex flex-wrap gap-2 items-center">
                  <div className="px-2 py-1 border border-gray-300 rounded text-xs font-bold text-blue-900">
                    VISA
                  </div>
                  <div className="px-2 py-1 border border-gray-300 rounded text-xs font-bold text-red-500">
                    MasterCard
                  </div>
                  <div className="px-2 py-1 border border-gray-300 rounded text-xs font-bold text-pink-600">
                    bKash
                  </div>
                  <div className="px-2 py-1 border border-gray-300 rounded text-xs font-bold text-orange-600">
                    Nagad
                  </div>
                </div>
                <p className="text-xs text-gray-400 mt-4 text-center">
                  Got a discount code? Use it in the next step.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}