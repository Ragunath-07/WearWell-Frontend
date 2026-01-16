import { Link } from 'react-router-dom'

function ProductItem({ id, img, name, brand, price }) {

    return (
        <section className="products">
            <Link to={`/product/${id}`} className="text-gray-700 text-sm">
                <div className="overflow-hidden">
                    <img src={img} alt="img" className="rounded-t-md" />
                </div>
                <div className="px-2 py-6">
                    <p>{brand}</p>
                    <p className="py-2">{name}</p>
                    <p className="font-semibold">₹{price}</p>
                </div>
            </Link>
        </section>
    )
}

export default ProductItem
