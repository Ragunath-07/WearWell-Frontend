import Title from "../components/Title"
import { useContext } from "react"
import { ProductContext } from "../context/ProductContext"
import ProductItem from '../components/ProductItem'

function LatestCollections() {

  const { products } = useContext(ProductContext)

  // Slicing Last 10 elements from the the array to show Latest collections
  const latestCollection = products.slice(-10)

  return (
    <section className="LatestCollections mt-10 mx-5">

      <div className="LatestCollections__title flex flex-col items-center">
        <Title text1={"Latest"} text2={"Collections"} />
        <p className="text-xs text-center sm:text-sm font-semibold">Discover our latest collection of unisex apparel-stylish, comfortable, and versatile pieces designed for everyday wear, perfect for expressing your unique style effortlessly.</p>
      </div>

      <div className="mt-6 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 gap-5 gap-y-8">
        {latestCollection.map((data) => {
          return (
            <div key={data.id} className="relative cursor-pointer bg-gray-50 rounded-md transition-all duration-300 hover:-translate-y-2 hover:shadow-md">
              <ProductItem id={data.id} img={data.img} brand={data.brand} name={data.name} price={data.price} />
              <p className="text-center text-xs font-medium w-12 py-1 text-white rounded absolute top-2 right-2" style={{ backgroundColor: "red" }}>New</p>
            </div>
          )
        })}
      </div>

    </section>
  )
}

export default LatestCollections
