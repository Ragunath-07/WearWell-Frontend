import { useContext, useState } from "react";
import { CartContext } from "../context/CartContext";
import { AuthContext } from "../context/AuthContext";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { OrderContext } from "../context/OrderContext";

export default function Checkout() {
  const { addOrder } = useContext(OrderContext);
  const { cartItems, removeFromCart, updateQty, clearCart } = useContext(CartContext);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [address, setAddress] = useState({
    fullName: "",
    phone: "",
    street: "",
    city: "",
    state: "",
    pincode: "",
  });

  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.qty,
    0
  );

  const handleChange = (e) => {
    setAddress({ ...address, [e.target.name]: e.target.value });
  };

  const handlePlaceOrder = () => {
    if (!user) {
      toast.error("Please login to place order");
      return;
    }

    const values = Object.values(address);
    if (values.some(v => !v)) {
      toast.error("Please fill all address details");
      return;
    }

    addOrder(user.id || user.email, {
      id: Date.now(),
      date: new Date().toLocaleString(),
      items: cartItems,
      address,
      total: totalPrice,
      status: "Order Placed",
    });

    toast.success("Order placed successfully!");
    navigate("/orders");
    clearCart();
  };


  if (cartItems.length === 0) {
    return (
      <div className="flex items-center justify-center h-[80vh]">
        <h1 className="text-xl font-bold">Your cart is empty!</h1>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center mx-5 mt-10">
      <h1 className="text-3xl font-bold mb-4">Checkout</h1>

      {/* Address Section */}
      <div className="mb-8 border p-4 rounded w-full lg:w-[60%]">
        <h2 className="text-xl font-semibold mb-4">Delivery Address</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input name="fullName" placeholder="Full Name" value={address.fullName} onChange={handleChange} className="border p-2 rounded" />
          <input name="phone" placeholder="Phone Number" value={address.phone} onChange={handleChange} className="border p-2 rounded" />
          <input name="street" placeholder="Street Address" value={address.street} onChange={handleChange} className="border p-2 rounded md:col-span-2" />
          <input name="city" placeholder="City" value={address.city} onChange={handleChange} className="border p-2 rounded" />
          <input name="state" placeholder="State" value={address.state} onChange={handleChange} className="border p-2 rounded" />
          <input name="pincode" placeholder="Pincode" value={address.pincode} onChange={handleChange} className="border p-2 rounded" />
        </div>
      </div>

      {/* Cart Items */}
      <div className="w-full lg:w-[60%]">
        {cartItems.map((item, index) => (
          <div key={index} className="flex flex-col sm:flex-row justify-between gap-4 border p-3 rounded">

            <div className="flex gap-5 text-sm sm:text-base">
              <div className="w-24">
                <img src={item.img} alt="" className="w-full" />
              </div>
              <div>
                <p className="font-semibold">{item.name}</p>
                <p>Size: {item.size}</p>
                <p>Price: ₹{item.price}</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button onClick={() => updateQty(item.id, item.size, item.qty - 1)} disabled={item.qty <= 1} className="px-2 bg-gray-200 rounded" > - </button>
              <span>{item.qty}</span>
              <button onClick={() => updateQty(item.id, item.size, item.qty + 1)} className="px-2 bg-gray-200 rounded" > + </button>
              <button onClick={() => removeFromCart(item.id, item.size)} className="px-2 py-1 bg-red-500 text-white rounded">Remove</button>
            </div>
          </div>
        ))}
      </div>

      {/* Total & Place Order */}
      <div className="my-8 flex gap-5 items-center">
        <h2 className="text-xl font-bold">Total: ₹{totalPrice}</h2>
        <button
          onClick={handlePlaceOrder}
          disabled={!user}
          className={`px-6 py-2 rounded text-white ${user ? "bg-green-600 hover:bg-green-700" : "bg-gray-400 cursor-not-allowed"}`}>
          Place Order
        </button>
      </div>
    </div >
  );
}

