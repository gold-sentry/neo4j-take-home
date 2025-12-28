import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import FilterPanel from './FilterPanel'
import { FILTER_KEYS } from '../constants/filters'

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
        expect(screen.getByPlaceholderText('Min')).toBeInTheDocument()
        expect(screen.getByPlaceholderText('Max')).toBeInTheDocument()
        expect(screen.getByText('All Categories')).toBeInTheDocument() // CategoryFilter default
        expect(screen.getByText('Minimum Rating')).toBeInTheDocument()
        expect(screen.getByText('Availability')).toBeInTheDocument()
    })

    it('should call onFilterChange when price inputs are changed', () => {
        renderPanel()

        const minInput = screen.getByPlaceholderText('Min')
        fireEvent.change(minInput, { target: { value: '10' } })
        expect(mockOnFilterChange).toHaveBeenCalledWith(FILTER_KEYS.MIN_PRICE, '10')

        const maxInput = screen.getByPlaceholderText('Max')
        fireEvent.change(maxInput, { target: { value: '100' } })
        expect(mockOnFilterChange).toHaveBeenCalledWith(FILTER_KEYS.MAX_PRICE, '100')
    })

    it('should call onFilterChange when rating is changed', () => {
        renderPanel()
        const select = screen.getByRole('combobox')
        fireEvent.change(select, { target: { value: '4' } })
        expect(mockOnFilterChange).toHaveBeenCalledWith(FILTER_KEYS.MIN_RATING, 4)
    })

    it('should call onFilterChange when in stock toggle is clicked', () => {
        renderPanel()
        const toggle = screen.getByText('In Stock Only')
        fireEvent.click(toggle)
        // Toggle component logic: onClick={() => onChange(!checked)}
        // Initial false -> true
        expect(mockOnFilterChange).toHaveBeenCalledWith(FILTER_KEYS.IN_STOCK_ONLY, true)
    })

    it('shows "Clear all" button only when filters are active', () => {
        // No active filters
        const { rerender } = render(
            <FilterPanel
                filters={mockFilters}
                onFilterChange={mockOnFilterChange}
                categories={mockCategories}
                onClearFilters={mockOnClearFilters}
            />
        )
        expect(screen.queryByText('Clear all')).not.toBeInTheDocument()

        // Active filters
        const activeFilters = { ...mockFilters, minPrice: '10' }
        rerender(
            <FilterPanel
                filters={activeFilters}
                onFilterChange={mockOnFilterChange}
                categories={mockCategories}
                onClearFilters={mockOnClearFilters}
            />
        )
        expect(screen.getByText('Clear all')).toBeInTheDocument()
    })

    it('should calls onClearFilters when "Clear all" is clicked', () => {
        const activeFilters = { ...mockFilters, minPrice: '10' }
        renderPanel(activeFilters)

        fireEvent.click(screen.getByText('Clear all'))
        expect(mockOnClearFilters).toHaveBeenCalled()
    })

    it('should toggles visibility on mobile when title is clicked', () => {
        renderPanel()

        // Use text match for the title which is inside the button
        const title = screen.getByText('Filters')
        const button = title.closest('button')

        // Initial state logic is local to component.
        // We can't check 'hidden' class easily on the container div because we need to find that specific div.
        // But we can check if the svg rotates.
        // The SVG is inside the button.

        // The SVG has class `transition-transform ${isOpen ? 'rotate-180' : ''}`
        // We can check for 'rotate-180' class.

        // Initially closed, so no rotate-180
        // (Assuming isOpen starts false)
        const svg = button.querySelector('svg')
        expect(svg).not.toHaveClass('rotate-180')

        // Click to open
        fireEvent.click(button)
        expect(svg).toHaveClass('rotate-180')

        // Click to close
        fireEvent.click(button)
        expect(svg).not.toHaveClass('rotate-180')
    })
})
