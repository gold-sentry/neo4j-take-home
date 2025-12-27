import './App.css';
import { ProductAPI } from './external-api/product-api';
import { useState, useEffect, useMemo } from 'react';
import { STATUS } from './constants/status';
import Loader from './components/Loader';
import ErrorMessage from './components/ErrorMessage';
import ProductGrid from './components/ProductGrid';
import SearchInput from './components/SearchInput';
import useDebounce from './hooks/useDebounce';
import { DEBOUNCE_DELAY } from './constants/app';
import { INITIAL_FILTERS } from './constants/filters';
import FilterPanel from './components/FilterPanel';

function App() {
  const [products, setProducts] = useState([]);
  const [status, setStatus] = useState(STATUS.IDLE)
  const [error, setError] = useState(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [categories, setCategories] = useState([])
  const [filters, setFilters] = useState(INITIAL_FILTERS)

  const debouncedSearch = useDebounce(searchQuery, DEBOUNCE_DELAY)

  const fetchProducts = async () => {
    setStatus(STATUS.LOADING)
    setError(null)

    try {
      const products = await ProductAPI.getProducts()
      setProducts(products)
      setStatus(STATUS.SUCCESS)
    } catch (err) {
      setError(err.message || 'Failed to fetch products')
      setStatus(STATUS.ERROR)
    }
  }

  const fetchCategories = async () => {
    try {
      const data = await ProductAPI.getCategories()
      setCategories(data)
    } catch {
      // My idea here is to gather metrics on the number of times this fails
      console.warn('Failed to fetch categories')
    }
  }


  useEffect(() => {
    fetchProducts()
    fetchCategories()
  }, [])

  const filteredProducts = useMemo(() => {
    let result = [...products]
    const query = debouncedSearch.toLowerCase().trim()
    if (query) {
      result = result.filter((product) =>
        product.name.toLowerCase().includes(query)
      )
    }

    if (filters.minPrice) {
      result = result.filter((product) => product.price >= Number(filters.minPrice))
    }

    if (filters.maxPrice) {
      result = result.filter((product) => product.price <= Number(filters.maxPrice))
    }

    if (filters.categories.length > 0) {
      result = result.filter((product) =>
        filters.categories.includes(product.category)
      )
    }

    if (filters.minRating > 0) {
      result = result.filter((product) => product.rating >= filters.minRating)
    }

    if (filters.inStockOnly) {
      result = result.filter((product) => product.inStock)
    }

    return result
  }, [products, debouncedSearch, filters])



  const handleClearSearch = () => {
    setSearchQuery('')
    setFilters(INITIAL_FILTERS)
  }

  const handleSearchChange = (query) => setSearchQuery(query)

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }))
  }

  const handleClearFilters = () => {
    setFilters(INITIAL_FILTERS)
  }

  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          Product Catalog
        </h1>

        {status === STATUS.SUCCESS && <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <div className='w-full sm:flex-1 sm:max-w-md'>
            <SearchInput value={searchQuery} onChange={handleSearchChange} onClear={handleClearSearch} />
          </div>
          <p className="text-gray-600 text-sm whitespace-nowrap">
            {filteredProducts.length} of {products.length} products
          </p>
        </div>}

        {status === STATUS.LOADING && <Loader />}

        {status === STATUS.ERROR && <ErrorMessage message={error} onRetry={fetchProducts} />}

        {status === STATUS.SUCCESS && <FilterPanel
          filters={filters}
          onFilterChange={handleFilterChange}
          categories={categories}
          onClearFilters={handleClearFilters}
        />}
        {status === STATUS.SUCCESS && <ProductGrid products={filteredProducts} />}
      </div>
    </div>
  );
}

export default App;
