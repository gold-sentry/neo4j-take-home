const MAX_STARS = 5
const FULL_STAR_THRESHOLD = 1

const getStar = (difference, index) => {
    if (difference >= FULL_STAR_THRESHOLD) {
        return <span key={index} className="text-yellow-400">★</span>
    }

    return <span key={index} className="text-gray-300">☆</span>
}

const StarRating = ({ rating }) => {
    const stars = []

    for (let index = 0; index < MAX_STARS; index++) {
        stars.push(getStar(rating - index, index))
    }

    return (
        <div className="flex items-center gap-1" aria-label={`Rating: ${rating} out of ${MAX_STARS} stars`}>
            {stars}
        </div>
    )
}

export default StarRating