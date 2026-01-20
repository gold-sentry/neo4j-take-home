import './App.css';


import { STATUS } from './constants/status';
import Loader from './components/Loader';
import ErrorMessage from './components/ErrorMessage';
import ProductGrid from './components/ProductGrid';
import SearchInput from './components/SearchInput';

import FilterPanel from './components/FilterPanel';
import { useProductData } from './hooks/useProductData';
import { useFilteredProducts } from './hooks/useFilteredProducts';

function App() {

  const { products, categories, status, error } = useProductData();

  const {
    searchQuery,
    setSearchQuery,
    filters,
    filteredProducts,
    handleClearSearch,
    handleFilterChange,
    handleClearFilters
  } = useFilteredProducts(products);

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
            {products.length > 0 && <p className="text-gray-600 text-sm whitespace-nowrap">
              {filteredProducts.length}  of {products.length} products
            </p>}
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
