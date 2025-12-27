import { useState, useRef, useEffect } from 'react'

const CategoryFilter = ({ categories, selected, onChange }) => {
    const [isOpen, setIsOpen] = useState(false)
    const dropdownRef = useRef(null)

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false)
            }
        }

        document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [])

    const toggleCategory = (category) => {
        console.log(category)
        const isAlreadySelected = selected.includes(category)
        const updated = isAlreadySelected
            ? selected.filter((c) => c !== category)
            : [...selected, category]
        onChange(updated)
    }

    const getDisplayText = () => {
        if (selected.length === 0) return 'All Categories'
        if (selected.length === 1) return selected[0]
        return `${selected.length} selected`
    }

    return (
        <div className="relative" ref={dropdownRef}>
            <h3 className="text-sm font-medium text-gray-700 mb-2">Categories</h3>
            <button
                type="button"
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
                <div className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-lg shadow-lg py-1">
                    {categories.map((category) => (
                        <div
                            key={category}
                            className="flex items-center gap-2 px-3 py-2 hover:bg-gray-50 cursor-pointer"
                            onClick={() => toggleCategory(category)}
                        >
                            <input
                                type="checkbox"
                                checked={selected.includes(category)}
                                readOnly
                                className="w-4 h-4 text-blue-600 rounded pointer-events-none"
                            />
                            <span className="text-sm text-gray-700">{category}</span>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}

export default CategoryFilter