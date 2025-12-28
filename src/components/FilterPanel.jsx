import CategoryFilter from './CategoryFilter'
import Toggle from './Toggle'
import { FILTER_KEYS } from '../constants/filters'
import { useState } from 'react'

const FilterPanel = ({
    filters,
    onFilterChange,
    categories,
    onClearFilters,
}) => {
    const hasActiveFilters =
        filters.minPrice ||
        filters.maxPrice ||
        filters.categories.length > 0 ||
        filters.minRating > 0 ||
        filters.inStockOnly

    const [isOpen, setIsOpen] = useState(false)

    return (
        <div className="bg-white rounded-lg shadow-md p-4 mb-6">
            <div
                className="flex items-center justify-between mb-4 cursor-pointer"
                onClick={() => setIsOpen(!isOpen)}
                data-testid="mobile-filter-toggle"
            >
                <h2 className="text-lg font-semibold text-gray-800">Filters</h2>
                <svg
                    className={`w-5 h-5 text-gray-500 lg:hidden transition-transform ${isOpen ? 'rotate-180' : ''}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>

                {hasActiveFilters && (
                    <button
                        onClick={onClearFilters}
                        className="px-3 py-1 text-sm text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-50 transition-colors cursor-pointer"
                        data-testid="clear-filters-button"
                    >
                        Clear all
                    </button>
                )}
            </div>
            <div className={`${isOpen ? 'block' : 'hidden'} lg:block mt-4`}>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-end">
                    <div className="text-left">
                        <h3 className="text-sm font-medium text-gray-700 mb-2">Price Range</h3>
                        <div className="flex items-center gap-2">
                            <input
                                type="number"
                                placeholder="Min"
                                value={filters.minPrice}
                                onChange={(e) => onFilterChange(FILTER_KEYS.MIN_PRICE, e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                                data-testid="min-price-input"
                            />
                            <span className="text-gray-400">-</span>
                            <input
                                type="number"
                                placeholder="Max"
                                value={filters.maxPrice}
                                onChange={(e) => onFilterChange(FILTER_KEYS.MAX_PRICE, e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                                data-testid="max-price-input"
                            />
                        </div>
                    </div>

                    <div className="text-left">
                        <CategoryFilter
                            categories={categories}
                            selected={filters.categories}
                            onChange={(value) => onFilterChange(FILTER_KEYS.CATEGORIES, value)}
                            data-testid="category-filter"
                        />
                    </div>

                    <div className="text-left">
                        <h3 data-testid="rating-label" className="text-sm font-medium text-gray-700 mb-2">Minimum Rating</h3>
                        <select
                            value={filters.minRating}
                            onChange={(e) => onFilterChange(FILTER_KEYS.MIN_RATING, Number(e.target.value))}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                            data-testid="rating-select"
                        >
                            <option value={0}>All Ratings</option>
                            <option value={4}>4 Stars & Up</option>
                            <option value={3}>3 Stars & Up</option>
                            <option value={2}>2 Stars & Up</option>
                            <option value={1}>1 Star & Up</option>
                        </select>
                    </div>

                    <div className="text-left">
                        <h3 data-testid="stock-label" className="text-sm font-medium text-gray-700 mb-2 align-left">Availability</h3>
                        <div className="h-[42px] flex items-center">
                            <Toggle
                                checked={filters.inStockOnly}
                                onChange={(value) => onFilterChange(FILTER_KEYS.IN_STOCK_ONLY, value)}
                                label="In Stock Only"
                                data-testid="stock-toggle"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FilterPanel