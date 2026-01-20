import { describe, it, expect, vi, afterEach } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import useOnClickOutside from '../useOnClickOutside'

describe('useOnClickOutside', () => {
    afterEach(() => {
        vi.restoreAllMocks()
    })

    it('should call handler when clicking outside element', () => {
        const handler = vi.fn()
        const ref = { current: document.createElement('div') }
        document.body.appendChild(ref.current)

        renderHook(() => useOnClickOutside(ref, handler))

        act(() => {
            document.dispatchEvent(new MouseEvent('mousedown', { bubbles: true }))
        })

        expect(handler).toHaveBeenCalledTimes(1)
        document.body.removeChild(ref.current)
    })

    it('should not call handler when clicking inside element', () => {
        const handler = vi.fn()
        const ref = { current: document.createElement('div') }
        document.body.appendChild(ref.current)

        renderHook(() => useOnClickOutside(ref, handler))

        act(() => {
            ref.current.dispatchEvent(new MouseEvent('mousedown', { bubbles: true }))
        })

        expect(handler).not.toHaveBeenCalled()

        document.body.removeChild(ref.current)
    })

    it('should not call handler when clicking disabled element', () => {
        const handler = vi.fn()
        const ref = { current: null }

        renderHook(() => useOnClickOutside(ref, handler))

        act(() => {
            document.dispatchEvent(new MouseEvent('mousedown', { bubbles: true }))
        })

        expect(handler).not.toHaveBeenCalled()
    })
})
