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

  useEffect(() => {
    let isCancelled = false

    const fetchData = async () => {
      setStatus(STATUS.LOADING)
      setError(null)

      try {
        const [productsResult, categoriesResult] = await Promise.allSettled([
          ProductAPI.getProducts(),
          ProductAPI.getCategories(),
        ])

        if (isCancelled) return

        if (productsResult.status === 'rejected') {
          throw new Error(productsResult.reason?.message || 'Failed to fetch products')
        }

        setProducts(productsResult.value)
        setCategories(categoriesResult.status === 'fulfilled' ? categoriesResult.value : [])
        setStatus(STATUS.SUCCESS)
      } catch (err) {
        if (!isCancelled) {
          setError(err.message)
          setStatus(STATUS.ERROR)
        }
      }
    }

    fetchData()

    return () => {
      isCancelled = true
    }
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

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }))
  }

  const handleClearFilters = () => {
    setFilters(INITIAL_FILTERS)
  }

  return (
    <div className="min-h-screen">
      <div className="sticky top-0 z-20 bg-gray-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Product Catalog
          </h1>

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
            <div className="w-full sm:flex-1 sm:max-w-lg">
              <SearchInput
                value={searchQuery}
                onChange={setSearchQuery}
                onClear={handleClearSearch}
              />
            </div>
            <p className="text-gray-600 text-sm whitespace-nowrap">
              {filteredProducts.length}  of {products.length} products
            </p>
          </div>

          <FilterPanel
            filters={filters}
            onFilterChange={handleFilterChange}
            categories={categories}
            onClearFilters={handleClearFilters}
          />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6">
        {status === STATUS.LOADING && <Loader />}
        {status === STATUS.ERROR && (
          <ErrorMessage message={error} onRetry={() => window.location.reload()} />
        )}
        {status === STATUS.SUCCESS && <ProductGrid products={filteredProducts} />}
      </div>
    </div>
  );
}

export default App;
