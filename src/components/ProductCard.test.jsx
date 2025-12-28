import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import ProductCard from './ProductCard'

describe('ProductCard', () => {
    const mockProduct = {
        id: 1,
        name: 'Test Product',
        price: 99.99,
        image: 'test-image.jpg',
        rating: 4.5,
        inStock: true,
        reviews: 125,
        category: 'Electronics'
    }

    it('should render product information correctly', () => {
        render(<ProductCard product={mockProduct} />)

        expect(screen.getByTestId('product-card')).toBeInTheDocument()
        expect(screen.getByTestId('product-name')).toHaveTextContent(mockProduct.name)
        expect(screen.getByTestId('product-price')).toHaveTextContent('£99.99')
        expect(screen.getByTestId('product-image')).toHaveAttribute('src', mockProduct.image)
        expect(screen.getByTestId('product-image')).toHaveAttribute('alt', mockProduct.name)
        expect(screen.getByTestId('product-reviews')).toHaveTextContent('(125)')
    })

    it('should displays correct stock status for out of stock items', () => {
        const outOfStockProduct = { ...mockProduct, inStock: false }
        render(<ProductCard product={outOfStockProduct} />)

        const status = screen.getByTestId('product-stock-status')
        expect(status).toHaveTextContent('Out of Stock')
        expect(status).toHaveClass('text-red-600')
    })
})
