import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import CategoryFilter from '../CategoryFilter'

describe('CategoryFilter', () => {
    const categories = ['Electronics', 'Books', 'Clothing']
    const onChange = vi.fn()

    it('should renders "All Categories" when no category is selected', () => {
        render(<CategoryFilter categories={categories} selected={[]} onChange={onChange} />)
        expect(screen.getByText('All Categories')).toBeInTheDocument()
    })

    it('should renders selected category name when one category is selected', () => {
        render(<CategoryFilter categories={categories} selected={['Electronics']} onChange={onChange} />)
        expect(screen.getByText('Electronics')).toBeInTheDocument()
    })

    it('should renders count when multiple categories are selected', () => {
        render(<CategoryFilter categories={categories} selected={['Electronics', 'Books']} onChange={onChange} />)
        expect(screen.getByText('2 selected')).toBeInTheDocument()
    })

    it('should toggles dropdown visibility on button click', () => {
        render(<CategoryFilter categories={categories} selected={[]} onChange={onChange} />)

        const dropDownOpener = screen.getByRole('button')

        expect(screen.queryByText('Electronics')).not.toBeInTheDocument()

        expect(screen.getByText('All Categories')).toBeInTheDocument()

        fireEvent.click(dropDownOpener)
        expect(screen.getByText('Electronics')).toBeInTheDocument()

        fireEvent.click(dropDownOpener)
        expect(screen.queryByText('Electronics')).not.toBeInTheDocument()
    })

    it('should calls onChange when a category is selected', () => {
        render(<CategoryFilter categories={categories} selected={[]} onChange={onChange} />)

        fireEvent.click(screen.getByRole('button'))

        fireEvent.click(screen.getByText('Books'))

        expect(onChange).toHaveBeenCalledWith(['Books'])
    })

    it('should calls onChange with removed category when already selected (deselect)', () => {
        render(<CategoryFilter categories={categories} selected={['Books']} onChange={onChange} />)

        fireEvent.click(screen.getByRole('button'))

        const booksElements = screen.getAllByText('Books')
        const categoryItem = booksElements[booksElements.length - 1]
        fireEvent.click(categoryItem)

        expect(onChange).toHaveBeenCalledWith([])
    })

    it('should closes dropdown when clicking outside', () => {
        render(<CategoryFilter categories={categories} selected={[]} onChange={onChange} />)

        fireEvent.click(screen.getByRole('button'))
        expect(screen.getByText('Electronics')).toBeInTheDocument()

        fireEvent.mouseDown(document.body)

        expect(screen.queryByText('Electronics')).not.toBeInTheDocument()
    })
})
