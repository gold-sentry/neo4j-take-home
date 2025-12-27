import { describe, it, expect, vi } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import useDebounce from './useDebounce'

describe('useDebounce', () => {
    it('should return initial value immediately', () => {
        const { result } = renderHook(() => useDebounce('sample-product', 300))
        expect(result.current).toBe('sample-product')
    })

    it('should debounce value changes', async () => {
        vi.useFakeTimers()

        const { result, rerender } = renderHook(
            ({ value }) => useDebounce(value, 300),
            { initialProps: { value: 'sample-product' } }
        )

        rerender({ value: 'updated-product' })
        expect(result.current).toBe('sample-product')

        act(() => {
            vi.advanceTimersByTime(300)
        })

        expect(result.current).toBe('updated-product')

        vi.useRealTimers()
    })
})