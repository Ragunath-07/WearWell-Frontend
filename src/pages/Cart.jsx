import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { AuthContext } from "../context/AuthContext";

import empty_bag from '../assets/images/empty.png'

function Cart() {
  const { cartItems, removeFromCart, updateQty } = useContext(CartContext);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  if (cartItems.length === 0) {
    return (
      <div className="flex flex-col justify-center items-center gap-2 text-gray-500 h-[80vh]">
        <img src={empty_bag} alt="Empty" className="w-36" />
        <h1 className="text-xl font-extrabold">Hey, it feels so light!</h1>
        <p className="text-sm font-semibold">There is nothing in your bag. Add some items.</p>
      </div>
    );
  }

  return (
    <section className="m-5">
      {cartItems.map(item => (
        <div key={item.id + item.size} className="flex gap-5 border-b py-4">
          <div className="w-24 sm:w-36">
            <img src={item.img} className="w-full rounded" />
          </div>

          <div className="flex-1">
            <p className="font-semibold">{item.brand}</p>
            <p className="text-sm text-gray-500">{item.name}</p>
            <p className="border bg-gray-100 w-6 text-center text-sm">{item.size}</p>
            <p className="mt-2">₹{item.price}</p>

            <div className="flex items-center gap-3 mt-2">
              <input type="number" min="1" value={item.qty} className="w-14 border px-2"
                onChange={(e) =>
                  updateQty(item.id, item.size, Number(e.target.value))
                }
              />
              <button onClick={() => removeFromCart(item.id, item.size)} className="text-red-500 text-sm">Remove</button>
            </div>
          </div>

          <p className="font-semibold">₹{item.price * item.qty}</p>
        </div>
      ))}

      <p className="text-right mt-5 text-xl font-bold">Total: ₹ {cartItems.reduce((acc, item) => acc + item.price * item.qty, 0)}</p>

      <div className="text-right mt-5">
        <button
          onClick={() => navigate("/checkout")}
          disabled={!user}
          className={`px-6 py-2 rounded text-white ${user
            ? "bg-black hover:bg-gray-800"
            : "bg-gray-400 cursor-not-allowed"
            }`}
        >Proceed to Checkout
        </button>

        {!user && (
          <p className="text-sm text-red-500 mt-2">Please login to checkout</p>
        )}
      </div>
    </section>
  );
}

export default Cart;


