import { useContext } from "react"
import { FilterContext } from '../context/FilterContext'

function Filter({ brands = [], types = [] }) {

    const { showfilter, handleFilter, togglebrand, toggleSubCategory } = useContext(FilterContext)

    return (
        <div className=" min-w-80 sm:min-w-48 lg:min-w-60 mt-3 sm:sticky sm:top-24 self-start">

            <div onClick={handleFilter} className="flex items-center gap-1 cursor-pointer sm:cursor-auto">
                <p className="text-lg font-semibold">FILTERS</p>
                <i className={`ri-arrow-right-s-line text-xl sm:hidden transition-all duration-200 ${showfilter ? "rotate-90" : ""}`}></i>
            </div>

            <div className={` border border-gray-300 px-4 py-3 mt-2 ${showfilter ? "" : "hidden"} sm:block max-w-96`}>
                <h1 className="font-semibold text-sm">BRANDS</h1>
                <div className="mt-2">
                    {brands.map(function (data, index) {
                        return (
                            <p key={index} className="flex items-center gap-1 my-2 text-xs">
                                <input type="checkbox" value={data.name} onChange={togglebrand} />
                                {data.name}</p>
                        )
                    })}
                </div>
            </div>

            <div className={` border border-gray-300 px-4 py-3 mt-5 ${showfilter ? "" : "hidden"} sm:block max-w-96`}>
                <h1 className="font-semibold text-sm">TYPE</h1>
                <div className="mt-2">
                    {types.map(function (data, index) {
                        return (
                            <p key={index} className="flex items-center gap-1 my-2 text-xs">
                                <input type="checkbox" value={data.type} onChange={toggleSubCategory} />
                                {data.type}</p>
                        )
                    })}
                </div>
            </div>

        </div>
    )
}

export default Filter
