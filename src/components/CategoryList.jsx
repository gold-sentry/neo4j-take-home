const CategoryList = ({ categories, selected, toggleCategory }) => {
    return (
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
    )
}

export default CategoryList
