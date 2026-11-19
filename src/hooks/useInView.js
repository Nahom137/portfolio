import { useEffect, useState } from 'react'

/** True once the referenced element has entered the viewport. */
export default function useInView(ref, { threshold = 0.15, rootMargin = '0px 0px -8% 0px' } = {}) {
  const [seen, setSeen] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return undefined
    if (!('IntersectionObserver' in window)) {
      setSeen(true)
      return undefined
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setSeen(true)
          io.disconnect()
        }
      },
      { threshold, rootMargin },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [ref, threshold, rootMargin])

  return seen
}
