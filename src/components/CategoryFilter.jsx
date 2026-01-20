import { useState, useRef } from 'react'
import CategoryList from './CategoryList'
import useOnClickOutside from '../hooks/useOnClickOutside'
import { ALL_CATEGORIES } from '../constants/filters'

const CategoryFilter = ({ categories, selected, onChange, 'data-testid': testId }) => {
    const [isOpen, setIsOpen] = useState(false)
    const dropdownRef = useRef(null)

    useOnClickOutside(dropdownRef, () => setIsOpen(false))

    const toggleCategory = (category) => {
        const isAlreadySelected = selected.includes(category)
        const updated = isAlreadySelected
            ? selected.filter((c) => c !== category)
            : [...selected, category]
        onChange(updated)
    }

    const getDisplayText = () => {
        if (selected.length === 0) return ALL_CATEGORIES
        if (selected.length === 1) return selected[0]
        return `${selected.length} selected`
    }

    return (
        <div className="relative" ref={dropdownRef}>
            <h3 className="text-sm font-medium text-gray-700 mb-2">Categories</h3>
            <button
                type="button"
                data-testid={testId}
                onClick={() => setIsOpen(!isOpen)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm text-left bg-white flex items-center justify-between hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
                <span className="truncate">{getDisplayText()}</span>
                <svg
                    className={`w-4 h-4 text-gray-500 transition-transform ${isOpen ? 'rotate-180' : ''}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
            </button>

            {isOpen && (
                <CategoryList
                    categories={categories}
                    selected={selected}
                    toggleCategory={toggleCategory}
                />
            )}
        </div>
    )
}

export default CategoryFilter