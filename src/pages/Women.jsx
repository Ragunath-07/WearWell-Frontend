import { useContext } from "react"
import { ProductContext } from '../context/ProductContext'
import { FilterContext } from "../context/FilterContext"
import { useEffect } from "react"

// Reusable Components
import Title from '../components/Title'
import Searchbar from '../components/Searchbar'
import ProductItem from '../components/ProductItem'
import Filter from '../components/Filter'

function Women() {

  const { products, search } = useContext(ProductContext)
  const { brand, subCategory, setfilterProducts, filterProducts } = useContext(FilterContext)

  const womenBrands = [
    { id: 1, name: "MAX" },
    { id: 2, name: "DNMX" },
    { id: 3, name: "Levis" },
    { id: 4, name: "Libas Art" },
    { id: 5, name: "Lee Cooper" }
  ]

  const types = [
    { id: 1, type: "Top wear" },
    { id: 2, type: "Bottom wear" },
    { id: 3, type: "Ethnic wear" }
  ]

  const womenProducts = products.filter((data) => {
    return (
      data.category === 'Women'
    )
  })

  const applyFilter = () => {
    let productsCopy = womenProducts.slice()

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
    <section className="Women-collections mt-10 mx-5">

      <div className="Women-collections__search">
        <Searchbar />
      </div>

      <div className="Women-collections__filter mt-10 sm:flex gap-5">
        <div>
          <Filter brands={womenBrands} types={types} />
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

export default Women
