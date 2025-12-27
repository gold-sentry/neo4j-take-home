import { formatPrice, formatNumber } from '../utils/formatter'
import StarRating from './StarRating'
import { STOCK } from '../constants/stock'

const ProductCard = ({ product }) => {
    const { name, price, image, rating, stock, reviews } = product


    const getStockStatus = (stock) => {
        if (stock === STOCK.OUT_OF_STOCK) {
            return { text: 'Out of Stock', color: 'text-red-600 bg-red-50' }
        }

        if (stock <= STOCK.LOW_STOCK_THRESHOLD) {
            return { text: `Only ${stock} left`, color: 'text-orange-600 bg-orange-50' }
        }

        return { text: 'In Stock', color: 'text-green-600 bg-green-50' }
    }

    const stockStatus = getStockStatus(stock)

    return (
        <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 cursor-pointer">
            <div className="aspect-square overflow-hidden bg-gray-100">
                <img
                    src={image}
                    alt={name}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
            </div>

            <div className="p-4">
                <h3 className="font-semibold text-gray-800 truncate" title={name}>
                    {name}
                </h3>

                <p className="text-xl font-bold text-gray-900 mt-1">
                    {formatPrice(price)}
                </p>

                <div className="flex items-center justify-center gap-1 mt-2">
                    <StarRating rating={rating} />
                    <span className="text-sm text-gray-500">({formatNumber(reviews)})</span>
                </div>

                <span className={`inline-block mt-3 px-2 py-1 text-xs font-medium rounded-full ${stockStatus.color}`}>
                    {stockStatus.text}
                </span>
            </div>
        </div>
    )
}

export default ProductCard