import CategoryFilter from './CategoryFilter'
import Toggle from './Toggle'

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

    return (
        <div className="bg-white rounded-lg shadow-md p-4 mb-6">
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-800">Filters</h2>
                {hasActiveFilters && (
                    <button
                        onClick={onClearFilters}
                        className="px-3 py-1 text-sm text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-50 transition-colors cursor-pointer"
                    >
                        Clear all
                    </button>
                )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-end">
                <div className="text-left">
                    <h3 className="text-sm font-medium text-gray-700 mb-2">Price Range</h3>
                    <div className="flex items-center gap-2">
                        <input
                            type="number"
                            placeholder="Min"
                            value={filters.minPrice}
                            onChange={(e) => onFilterChange('minPrice', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                        />
                        <span className="text-gray-400">-</span>
                        <input
                            type="number"
                            placeholder="Max"
                            value={filters.maxPrice}
                            onChange={(e) => onFilterChange('maxPrice', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                        />
                    </div>
                </div>

                <CategoryFilter
                    categories={categories}
                    selected={filters.categories}
                    onChange={(value) => onFilterChange('categories', value)}
                />

                <div className="text-left">
                    <h3 className="text-sm font-medium text-gray-700 mb-2">Minimum Rating</h3>
                    <select
                        value={filters.minRating}
                        onChange={(e) => onFilterChange('minRating', Number(e.target.value))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                    >
                        <option value={0}>All Ratings</option>
                        <option value={4}>4 Stars & Up</option>
                        <option value={3}>3 Stars & Up</option>
                        <option value={2}>2 Stars & Up</option>
                        <option value={1}>1 Star & Up</option>
                    </select>
                </div>

                <div className="text-left">
                    <h3 className="text-sm font-medium text-gray-700 mb-2 align-left">Availability</h3>
                    <div className="h-[42px] flex items-center">
                        <Toggle
                            checked={filters.inStockOnly}
                            onChange={(value) => onFilterChange('inStockOnly', value)}
                            label="In Stock Only"
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FilterPanel