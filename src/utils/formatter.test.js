import { describe, it, expect } from 'vitest'
import { formatPrice, formatNumber } from './formatter'

describe('formatPrice', () => {
    it('should format numbers as GBP currency', () => {
        expect(formatPrice(1000)).toBe('£1,000.00')
        expect(formatPrice(10.5)).toBe('£10.50')
        expect(formatPrice(0)).toBe('£0.00')
        expect(formatPrice(1234.56)).toBe('£1,234.56')
    })

    it('should handle negative numbers', () => {
        expect(formatPrice(-100)).toBe('-£100.00')
    })
})

describe('formatNumber', () => {
    it('should format numbers with thousands separators', () => {
        expect(formatNumber(1000)).toBe('1,000')
        expect(formatNumber(1000000)).toBe('1,000,000')
        expect(formatNumber(1234)).toBe('1,234')
    })

    it('should handle decimals', () => {
        expect(formatNumber(1234.567)).toBe('1,234.567')
    })

    it('should handle zero', () => {
        expect(formatNumber(0)).toBe('0')
    })
})
