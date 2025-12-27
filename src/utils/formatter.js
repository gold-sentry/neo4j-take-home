export const formatPrice = (price) => {
    return new Intl.NumberFormat('en-GB', {
        style: 'currency',
        currency: 'GBP',
    }).format(price)
}

export const formatNumber = (number) => {
    return new Intl.NumberFormat('en-GB').format(number)
}