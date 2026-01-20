import { useState, useEffect } from 'react';
import { ProductAPI } from '../external-api/product-api';
import { STATUS } from '../constants/status';
import asyncWithRetry from '../utils/fetchWithRetry';

export const useProductData = () => {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [status, setStatus] = useState(STATUS.IDLE);
    const [error, setError] = useState(null);

    useEffect(() => {
        let isCancelled = false;

        const fetchData = async () => {
            setStatus(STATUS.LOADING);
            setError(null);

            try {
                const [productsResult, categoriesResult] = await Promise.allSettled([
                    asyncWithRetry(ProductAPI.getProducts),
                    asyncWithRetry(ProductAPI.getCategories),
                ]);

                if (isCancelled) return;

                if (productsResult.status === 'rejected') {
                    throw new Error(productsResult.reason?.message || 'Failed to fetch products');
                }

                setProducts(productsResult.value);
                setCategories(categoriesResult.status === 'fulfilled' ? categoriesResult.value : []);
                setStatus(STATUS.SUCCESS);
            } catch (err) {
                if (!isCancelled) {
                    setError(err.message);
                    setStatus(STATUS.ERROR);
                }
            }
        };

        fetchData();

        return () => {
            isCancelled = true;
        };
    }, []);

    return { products, categories, status, error };
};
