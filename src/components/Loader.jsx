import { useEffect, useRef, useState } from 'react'

const DURATION = 1500

/**
 * Short, purposeful intro: a counter that doubles as the page's first typographic statement.
 * Calls onLeave when it starts sliding away (so the hero can begin) and onDone when removed.
 */
export default function Loader({ onLeave, onDone }) {
  const [count, setCount] = useState(0)
  const [leaving, setLeaving] = useState(false)
  const callbacks = useRef({ onLeave, onDone })
  callbacks.current = { onLeave, onDone }

  useEffect(() => {
    let raf = 0
    let t1 = 0
    let t2 = 0
    const start = performance.now()

    const tick = (now) => {
      const p = Math.min((now - start) / DURATION, 1)
      setCount(Math.round((1 - Math.pow(1 - p, 3)) * 100))
      if (p < 1) {
        raf = requestAnimationFrame(tick)
      } else {
        setLeaving(true)
        t1 = window.setTimeout(() => callbacks.current.onLeave(), 250)
        t2 = window.setTimeout(() => callbacks.current.onDone(), 900)
      }
    }
    raf = requestAnimationFrame(tick)

    return () => {
      cancelAnimationFrame(raf)
      clearTimeout(t1)
      clearTimeout(t2)
    }
  }, [])

  return (
    <div className={`loader ${leaving ? 'is-leaving' : ''}`} role="status" aria-live="polite">
      <div className="loader__top">
        <span>Nahom — Portfolio</span>
        <span>Loading</span>
      </div>
      <div className="loader__count" aria-hidden="true">
        {String(count).padStart(3, '0')}
      </div>
      <div className="loader__bar" aria-hidden="true">
        <span style={{ transform: `scaleX(${count / 100})` }} />
      </div>
      <span className="sr-only">Loading portfolio, {count} percent</span>
    </div>
  )
}
