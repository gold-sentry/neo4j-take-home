import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import FilterPanel from '../FilterPanel'
import { FILTER_KEYS } from '../../constants/filters'

describe('FilterPanel', () => {
    const mockCategories = ['Electronics', 'Books', 'Clothing']
    const mockFilters = {
        minPrice: '',
        maxPrice: '',
        categories: [],
        minRating: 0,
        inStockOnly: false,
    }
    const mockOnFilterChange = vi.fn()
    const mockOnClearFilters = vi.fn()

    beforeEach(() => {
        vi.clearAllMocks()
    })

    const renderPanel = (filters = mockFilters) => {
        render(
            <FilterPanel
                filters={filters}
                onFilterChange={mockOnFilterChange}
                categories={mockCategories}
                onClearFilters={mockOnClearFilters}
            />
        )
    }

    it('should render all filter inputs', () => {
        renderPanel()
        expect(screen.getByTestId('min-price-input')).toBeInTheDocument()
        expect(screen.getByTestId('max-price-input')).toBeInTheDocument()
        expect(screen.getByTestId('category-filter')).toBeInTheDocument()
        expect(screen.getByTestId('rating-label')).toBeInTheDocument()
        expect(screen.getByTestId('stock-toggle')).toBeInTheDocument()
    })

    it('should call onFilterChange when price inputs are changed', () => {
        renderPanel()

        const minInput = screen.getByTestId('min-price-input')
        fireEvent.change(minInput, { target: { value: '10' } })
        expect(mockOnFilterChange).toHaveBeenCalledWith(FILTER_KEYS.MIN_PRICE, '10')

        const maxInput = screen.getByTestId('max-price-input')
        fireEvent.change(maxInput, { target: { value: '100' } })
        expect(mockOnFilterChange).toHaveBeenCalledWith(FILTER_KEYS.MAX_PRICE, '100')
    })

    it('should call onFilterChange when rating is changed', () => {
        renderPanel()
        const select = screen.getByTestId('rating-select')
        fireEvent.change(select, { target: { value: '4' } })
        expect(mockOnFilterChange).toHaveBeenCalledWith(FILTER_KEYS.MIN_RATING, 4)
    })

    it('should call onFilterChange when in stock toggle is clicked', () => {
        renderPanel()
        const toggle = screen.getByTestId('stock-toggle')
        fireEvent.click(toggle)
        expect(mockOnFilterChange).toHaveBeenCalledWith(FILTER_KEYS.IN_STOCK_ONLY, true)
    })

    it('shows "Clear all" button only when filters are active', () => {
        const { rerender } = render(
            <FilterPanel
                filters={mockFilters}
                onFilterChange={mockOnFilterChange}
                categories={mockCategories}
                onClearFilters={mockOnClearFilters}
            />
        )
        expect(screen.queryByTestId('clear-filters-button')).not.toBeInTheDocument()

        const activeFilters = { ...mockFilters, minPrice: '10' }
        rerender(
            <FilterPanel
                filters={activeFilters}
                onFilterChange={mockOnFilterChange}
                categories={mockCategories}
                onClearFilters={mockOnClearFilters}
            />
        )
        expect(screen.getByTestId('clear-filters-button')).toBeInTheDocument()
    })

    it('should calls onClearFilters when "Clear all" is clicked', () => {
        const activeFilters = { ...mockFilters, minPrice: '10' }
        renderPanel(activeFilters)

        fireEvent.click(screen.getByTestId('clear-filters-button'))
        expect(mockOnClearFilters).toHaveBeenCalled()
    })
})
