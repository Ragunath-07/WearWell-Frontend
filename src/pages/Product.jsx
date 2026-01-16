import { useEffect, useState, useContext } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import { CartContext } from "../context/CartContext";
import { toast } from "react-toastify";
import { AuthContext } from "../context/AuthContext";

function Product() {

  const { addToCart } = useContext(CartContext);
  const { user } = useContext(AuthContext);
  const { id } = useParams()
  const [productById, setproductById] = useState(null)
  const [size, setSize] = useState('')

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/products/${id}`)
      .then((item) => {
        setproductById(item.data)
      })
      .catch((error) => {
        console.log(error)
      })
  }, [id])

  if (!productById) {
    return (
      <div className="flex items-center justify-center h-[80vh]">
        <h1 className="text-xl font-bold">Product Loading...</h1>
      </div>
    )
  }

  const handleCart = () => {
    if (!user) {
      toast.error("You must be logged in to add items in the cart");
      return;
    }
    if (user) {
      toast.success("Product added to cart")
    }
    addToCart(
      {
        id: productById.id,
        img: productById.img,
        name: productById.name,
        brand: productById.brand,
        price: productById.price,
        size
      }
    )

  }
  return (
    <section className='Product mx-10'>

      <div className='flex justify-center'>
        <div className='Product__image flex flex-col md:flex-row gap-8 lg:gap-16 mt-10'>
          <div className='w-[320px] sm:w-[400px]'>
            <img src={productById.img} alt={productById.name} className="w-full h-[400px] sm:h-[450px] object-cover rounded-lg" />
          </div>

          <div className='Product__detail flex flex-col gap-2'>
            <h1 className='text-lg font-bold'>{productById.brand}</h1>
            <p className='text-sm font-medium text-gray-500'>{productById.name}</p>
            <p className='text-xl font-semibold'>₹{productById.price}</p>

            <div className='Product__sizes mt-5'>
              <h1>Select Size</h1>
              <ul className='flex gap-4 mt-2'>
                {productById.sizes.map((item) => (
                  <li key={item}>
                    <button onClick={() => setSize(item)} className={`border bg-gray-100 w-12 h-12 text-center ${item === size ? "border-orange-500" : ""}`}>{item}</button>
                  </li>
                ))}
              </ul>
            </div>

            <div className='Product__cart_button'>
              <button className='bg-black px-4 py-3 text-white rounded-md mt-5 disabled:bg-gray-700 disabled:opacity-60 disabled:cursor-not-allowed transition-all duration-300'
                disabled={!size}
                onClick={handleCart}
              >
                Add to cart
              </button>
              <hr className='mt-5' />
            </div>

            <div className='text-gray-500 text-sm mt-5'>
              <p>100% Original Products.</p>
              <p>Easy return and exchange policy within 7 days.</p>
            </div>
          </div>
        </div>
      </div>

    </section >


  )
}

export default Product
