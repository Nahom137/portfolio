const reducedQuery = '(prefers-reduced-motion: reduce)'

export function prefersReducedMotion() {
  return typeof window !== 'undefined' && window.matchMedia(reducedQuery).matches
}

/** Smooth-scroll to a section, update the hash, and move focus for keyboard/AT users. */
export function goTo(id) {
  const el = document.getElementById(id)
  if (!el) return
  el.scrollIntoView({ behavior: prefersReducedMotion() ? 'auto' : 'smooth', block: 'start' })
  if (window.location.hash !== `#${id}`) {
    window.history.pushState(null, '', `#${id}`)
  }
  el.focus({ preventScroll: true })
}
