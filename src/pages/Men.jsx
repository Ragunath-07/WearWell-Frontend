import { useContext } from "react"
import { ProductContext } from '../context/ProductContext'
import { FilterContext } from "../context/FilterContext"
import { useEffect } from "react"

//Reusable Components
import Title from '../components/Title'
import Searchbar from '../components/Searchbar'
import ProductItem from '../components/ProductItem'
import Filter from '../components/Filter'

function Men() {

  const { products, search } = useContext(ProductContext)
  const { brand, subCategory, setfilterProducts, filterProducts } = useContext(FilterContext)

  const menBrands = [
    { id: 1, name: "ALLEN SOLLY" },
    { id: 2, name: "H&M" },
    { id: 3, name: "Jack & Jones" },
    { id: 4, name: "Highlander" },
    { id: 5, name: "KISAH" }
  ]

  const types = [
    { id: 1, type: "Top wear" },
    { id: 2, type: "Bottom wear" },
    { id: 3, type: "Ethnic wear" }
  ]

  const menProducts = products.filter((data) => {
    return (
      data.category === 'Men'
    )
  })

  const applyFilter = () => {
    let productsCopy = menProducts.slice()

    if (brand.length > 0) {
      productsCopy = productsCopy.filter(item => brand.includes(item.brand))
    }

    if (subCategory.length > 0) {
      productsCopy = productsCopy.filter(item => subCategory.includes(item.subCategory))
    }

    if (search) {
      productsCopy = productsCopy.filter(item => item.name.toLowerCase().includes(search.toLowerCase()))
    }

    setfilterProducts(productsCopy)
  }

  useEffect(() => {
    applyFilter()
  }, [products, brand, subCategory, search])

  return (
    <section className="Men-collections mt-10 mx-5">

      <div className="Men-collections__search">
        <Searchbar />
      </div>

      <div className="Men-collections__filter sm:flex gap-5 mt-10">
        <div>
          <Filter brands={menBrands} types={types} />
        </div>

        <div className="mt-3 sm:mt-0">
          <div>
            <Title text1={"All"} text2={"Collections"} />
          </div>

          <div className="mt-3 sm:mt-2 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 gap-5 gap-y-8">
            {filterProducts.map((data) => {
              return (
                <div key={data.id} className="cursor-pointer bg-gray-50 rounded-md transition-all duration-300 hover:-translate-y-2 hover:shadow-md">
                  <ProductItem id={data.id} img={data.img} brand={data.brand} name={data.name} price={data.price} />
                </div>
              )
            })}
          </div>
        </div>
      </div>

    </section>
  )
}

export default Men
