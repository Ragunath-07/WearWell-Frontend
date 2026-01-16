import { useContext } from "react"
import { ProductContext } from '../context/ProductContext'
import Title from "./Title"
import ProductItem from "./ProductItem"

function BestSeller() {

    const { products } = useContext(ProductContext)

    const bestSeller = products.filter((data) => {
        return (
            data.bestseller === true
        )
    })

    const bestSellerProducts = bestSeller.slice(-5)

    return (
        <section className="Bestseller mt-10 mx-5">

            <div className="Bestseller__title flex flex-col items-center">
                <Title text1={"Best"} text2={"Seller"} />
                <p className="text-center text-xs sm:text-sm font-semibold">Explore our best sellers, loved by customers for their comfort, quality, and timeless style-unisex essentials designed to elevate everyday wear.</p>
            </div>

            <div className="best-seller__details mt-6 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 gap-5 gap-y-8">
                {bestSellerProducts.map(function (data) {
                    return (
                        <div key={data.id} className="relative cursor-pointer bg-gray-50 rounded-md transition-all duration-300 hover:-translate-y-2 hover:shadow-md">
                            <ProductItem id={data.id} img={data.img} brand={data.brand} name={data.name} price={data.price} />
                        </div>
                    )
                })}
            </div>

        </section>
    )
}

export default BestSeller
