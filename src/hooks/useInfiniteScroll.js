import { useState, useEffect, useRef, useCallback } from 'react';

export const useInfiniteScroll = (items, batchSize = 12) => {
    const [visibleCount, setVisibleCount] = useState(batchSize);
    const observerRef = useRef(null);

    useEffect(() => {
        setVisibleCount(batchSize);
    }, [items, batchSize]);

    const loadMore = useCallback(() => {
        setVisibleCount((prev) => {
            if (prev >= items.length) return prev;
            return prev + batchSize;
        });
    }, [items.length, batchSize]);

    const sentinelRef = useCallback((node) => {
        if (observerRef.current) observerRef.current.disconnect();

        observerRef.current = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                loadMore();
            }
        });

        if (node) observerRef.current.observe(node);
    }, [loadMore]);

    return {
        visibleItems: items.slice(0, visibleCount),
        hasMore: visibleCount < items.length,
        sentinelRef
    };
};
