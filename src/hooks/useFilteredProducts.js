import { useState, useMemo } from 'react';
import useDebounce from './useDebounce';
import { DEBOUNCE_DELAY } from '../constants/app';
import { INITIAL_FILTERS } from '../constants/filters';

export const useFilteredProducts = (products) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [filters, setFilters] = useState(INITIAL_FILTERS);
    const debouncedSearch = useDebounce(searchQuery, DEBOUNCE_DELAY);

    const filteredProducts = useMemo(() => {
        let result = [...products];
        const query = debouncedSearch.toLowerCase().trim();
        if (query) {
            result = result.filter((product) =>
                product.name.toLowerCase().includes(query)
            );
        }

        if (filters.minPrice) {
            result = result.filter((product) => product.price >= Number(filters.minPrice));
        }

        if (filters.maxPrice) {
            result = result.filter((product) => product.price <= Number(filters.maxPrice));
        }

        if (filters.categories.length > 0) {
            result = result.filter((product) =>
                filters.categories.includes(product.category)
            );
        }

        if (filters.minRating > 0) {
            result = result.filter((product) => product.rating >= filters.minRating);
        }

        if (filters.inStockOnly) {
            result = result.filter((product) => product.inStock);
        }

        return result;
    }, [products, debouncedSearch, filters]);

    const handleClearSearch = () => {
        setSearchQuery('');
        setFilters(INITIAL_FILTERS);
    };

    const handleFilterChange = (key, value) => {
        setFilters((prev) => ({ ...prev, [key]: value }));
    };

    const handleClearFilters = () => {
        setFilters(INITIAL_FILTERS);
    };

    return {
        searchQuery,
        setSearchQuery,
        filters,
        filteredProducts,
        handleClearSearch,
        handleFilterChange,
        handleClearFilters
    };
};
