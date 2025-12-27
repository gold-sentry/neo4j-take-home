export const INITIAL_FILTERS = {
    minPrice: '',
    maxPrice: '',
    categories: [],
    minRating: 0,
    inStockOnly: false,
}

export const FILTER_KEYS = Object.keys(INITIAL_FILTERS)

export const RATING_OPTIONS = [
    { value: 0, label: 'All Ratings' },
    { value: 4, label: '4 Stars & Up' },
    { value: 3, label: '3 Stars & Up' },
    { value: 2, label: '2 Stars & Up' },
    { value: 1, label: '1 Star & Up' },
]