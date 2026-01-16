import { createContext } from "react"
import { useState } from "react"

export const FilterContext = createContext()

export function FilterProvider(props) {

    const [filterProducts, setfilterProducts] = useState([])
    const [brand, setbrand] = useState([])
    const [subCategory, setsubCategory] = useState([])
    const [showfilter, setshowFilter] = useState(false)

    const handleFilter = () => {
        setshowFilter(!showfilter)
    }

    const togglebrand = (e) => {
        if (brand.includes(e.target.value)) {
            setbrand(prev => prev.filter(item => item !== e.target.value))
        }
        else {
            setbrand(prev => [...prev, e.target.value])
        }
    }

    const toggleSubCategory = (e) => {
        if (subCategory.includes(e.target.value)) {
            setsubCategory(prev => prev.filter(item => item !== e.target.value))
        }
        else {
            setsubCategory(prev => [...prev, e.target.value])
        }
    }

    const value = {
        brand, subCategory, handleFilter, showfilter, togglebrand, toggleSubCategory, setfilterProducts, filterProducts
    }

    return (
        <FilterContext.Provider value={value}>
            {props.children}
        </FilterContext.Provider>
    )
}

