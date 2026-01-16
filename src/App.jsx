import { Routes, Route, useLocation } from "react-router-dom"
import { useContext } from "react"
import { ProductContext } from "./context/ProductContext"
import { ToastContainer } from "react-toastify"
import 'react-toastify/ReactToastify.css'

// Pages
import Home from './pages/Home'
import Men from './pages/Men'
import Women from './pages/Women'
import About from './pages/About'
import Login from './pages/Login'
import SignUp from './pages/SignUp'
import Cart from './pages/Cart'
import Product from './pages/Product'
import Navbar from "./components/Navbar"
import Footer from "./components/Footer"
import Checkout from "./pages/Checkout"
import OrderHistory from "./pages/OrderHistory";

function App() {
  // paths where you want to hide
  const location = useLocation();
  const hideNavPaths = ["/login", "/signup"];
  const hideFooterPaths = ["/login", "/signup", "/cart"]

  const hideNav = hideNavPaths.includes(location.pathname);
  const hideFooter = hideFooterPaths.includes(location.pathname)

  const { products } = useContext(ProductContext)

  if (!products || products.length === 0) {
    return (
      <div className="flex flex-col justify-center items-center gap-5 h-screen animate-pulse">
        <div className="text-4xl font-bold">
          <h1 className='text-[#FD913C]'>Wear <span className='text-[#F13AB1]'>Well</span> </h1>
        </div>

        <p className="animate-spin rounded-full h-12 w-12 border-b-4 border-[#FD913C]"></p>

      </div>
    );
  }

  return (

    <div>
      {/* Show Navbar only if path is NOT in hideNavFooterPaths */}
      {!hideNav && <Navbar />}

      <ToastContainer />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/men" element={<Men />}></Route>
        <Route path="/women" element={<Women />}></Route>
        <Route path="/about" element={<About />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/signup" element={<SignUp />}></Route>
        <Route path="/cart" element={<Cart />}></Route>
        <Route path="/product/:id" element={<Product />}></Route>
        <Route path="/checkout" element={<Checkout />}></Route>
        <Route path="/orders" element={<OrderHistory />} />
      </Routes>

      {/* Show Footer only if path is NOT in hideNavFooterPaths */}
      {!hideFooter && <Footer />}
    </div>
  )
}

export default App

