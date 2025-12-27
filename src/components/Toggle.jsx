const Toggle = ({ checked, onChange, label }) => {
    return (
        <label className="flex items-center gap-3 cursor-pointer">
            <div
                className={`relative w-11 h-6 rounded-full transition-colors ${checked ? 'bg-blue-600' : 'bg-gray-300'
                    }`}
                onClick={() => onChange(!checked)}
            >
                <div
                    className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform ${checked ? 'translate-x-5' : 'translate-x-0'
                        }`}
                />
            </div>
            <span className="text-sm text-gray-700">{label}</span>
        </label>
    )
}

export default Toggle