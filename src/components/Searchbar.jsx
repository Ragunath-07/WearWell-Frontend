import { useContext } from "react"
import { ProductContext } from "../context/ProductContext"

function Searchbar() {

    const { search, setSearch } = useContext(ProductContext)

    const handleSearch = (e) => {
        setSearch(e.target.value)
    }

    return (
        <section className="flex justify-center my-8 ">
            <div className="border border-black flex w-80 sm:w-[500px] items-center justify-between px-5 py-2 rounded-3xl">
                <input type="text" className="bg-transparent outline-none w-full cursor-default" placeholder="Search for Products..." value={search} onChange={handleSearch}/>
                <i className="ri-search-line text-xl cursor-pointer"></i>
            </div>
        </section>
    )
}

export default Searchbar
