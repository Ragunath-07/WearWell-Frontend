import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import { ProductProvider } from "./context/ProductContext.jsx";
import { FilterProvider } from './context/FilterContext.jsx'
import { CartProvider } from "./context/CartContext";
import { AuthProvider } from "./context/AuthContext.jsx";
import { OrderProvider } from "./context/OrderContext";
import "./index.css";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <OrderProvider>
      <AuthProvider>
        <CartProvider>
          <ProductProvider>
            <FilterProvider>
              <App />
            </FilterProvider>
          </ProductProvider>
        </CartProvider>
      </AuthProvider>
    </OrderProvider>
  </BrowserRouter>
);
