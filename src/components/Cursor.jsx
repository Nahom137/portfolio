import { useEffect, useRef, useState } from 'react'

const FINE = '(hover: hover) and (pointer: fine)'

/**
 * A lagging ring that follows the pointer and grows over interactive elements.
 * Purely decorative: the native cursor stays visible. Off for touch and reduced motion.
 */
export default function Cursor({ disabled }) {
  const ringRef = useRef(null)
  const [label, setLabel] = useState('')
  const [enabled, setEnabled] = useState(false)

  useEffect(() => {
    setEnabled(!disabled && window.matchMedia(FINE).matches)
  }, [disabled])

  useEffect(() => {
    if (!enabled) return undefined
    const ring = ringRef.current
    let x = -100
    let y = -100
    let rx = x
    let ry = y
    let raf = 0
    let visible = false

    const loop = () => {
      rx += (x - rx) * 0.18
      ry += (y - ry) * 0.18
      ring.style.transform = `translate3d(${rx}px, ${ry}px, 0) translate(-50%, -50%)`
      raf = requestAnimationFrame(loop)
    }

    const onMove = (e) => {
      x = e.clientX
      y = e.clientY
      if (!visible) {
        visible = true
        rx = x
        ry = y
        ring.dataset.visible = 'true'
      }
      const target = e.target.closest?.('a, button, [data-cursor], input, textarea')
      if (!target) {
        ring.dataset.state = ''
        setLabel('')
      } else if (target.dataset.cursor) {
        ring.dataset.state = 'label'
        setLabel(target.dataset.cursor)
      } else {
        ring.dataset.state = 'link'
        setLabel('')
      }
    }
    const onLeave = () => {
      visible = false
      ring.dataset.visible = 'false'
    }

    window.addEventListener('pointermove', onMove, { passive: true })
    document.documentElement.addEventListener('pointerleave', onLeave)
    raf = requestAnimationFrame(loop)

    return () => {
      window.removeEventListener('pointermove', onMove)
      document.documentElement.removeEventListener('pointerleave', onLeave)
      cancelAnimationFrame(raf)
    }
  }, [enabled])

  if (!enabled) return null

  return (
    <div className="cursor" ref={ringRef} data-visible="false" aria-hidden="true">
      <span className="cursor__label">{label}</span>
    </div>
  )
}
