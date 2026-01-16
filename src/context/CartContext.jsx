import { createContext, useState, useEffect, useContext } from "react";
import { AuthContext } from "./AuthContext";

export const CartContext = createContext();

export function CartProvider(props) {
  const { user } = useContext(AuthContext); // get the logged-in user

  const getStorageKey = () => (user ? `cart_${user.uid}` : "cart_guest");

  const [cartItems, setCartItems] = useState([]);

  // Load cart from localStorage whenever user changes
  useEffect(() => {
    const savedCart = localStorage.getItem(getStorageKey());
    setCartItems(savedCart ? JSON.parse(savedCart) : []);
  }, [user]);

  // Save cart to localStorage whenever cartItems change
  useEffect(() => {
    localStorage.setItem(getStorageKey(), JSON.stringify(cartItems));
  }, [cartItems, user]);

  // Add to cart
  function addToCart(product) {
    setCartItems((prev) => {
      const existingItem = prev.find(
        (item) => item.id === product.id && item.size === product.size
      );

      if (existingItem) {
        return prev.map((item) =>
          item.id === product.id && item.size === product.size
            ? { ...item, qty: item.qty + 1 }
            : item
        );
      }

      return [...prev, { ...product, qty: 1 }];
    });
  }

  // Remove from cart
  const removeFromCart = (id, size) => {
    setCartItems((prev) =>
      prev.filter((item) => !(item.id === id && item.size === size))
    );
  };

  // Update quantity
  const updateQty = (id, size, qty) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id && item.size === size ? { ...item, qty } : item
      )
    );
  };

  // Clear cart
  const clearCart = () => {
    setCartItems([]);
    localStorage.removeItem(getStorageKey());
  };

  const value = { cartItems, addToCart, removeFromCart, updateQty, clearCart };

  return (
    <CartContext.Provider value={value}>
      {props.children}
    </CartContext.Provider>
  );
}

