import { createContext, useEffect, useState } from "react";
import axios from 'axios'

export const ProductContext = createContext()

export function ProductProvider(props) {

    const [products, setProducts] = useState([])
    const [search, setSearch] = useState("")

    useEffect(() => {
        axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/products`)
            .then((item) => {
                setProducts(item.data)
            })
            .catch((error) => {
                console.log(error)
            })
    }, [])

    const value = {
        products, search, setSearch
    }

    return (
        <ProductContext.Provider value={value}>
            {props.children}
        </ProductContext.Provider>
    )
}
