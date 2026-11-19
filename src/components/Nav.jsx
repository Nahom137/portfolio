import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { ArrowUpRight, Menu, X } from 'lucide-react'
import Button from './ui/Button.jsx'
import useScrollSpy from '../hooks/useScrollSpy.js'
import { goTo } from '../utils/scroll.js'
import { navItems, sections, site } from '../data/site.js'

export default function Nav({ ready }) {
  const spy = useScrollSpy(sections)
  const current = spy === 'beyond' ? 'skills' : spy

  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [indicator, setIndicator] = useState({ x: 0, w: 0, visible: false })
  const listRef = useRef(null)
  const toggleRef = useRef(null)

  /* Sliding indicator under the active link */
  useLayoutEffect(() => {
    const place = () => {
      const el = listRef.current?.querySelector('[aria-current]')
      if (!el) {
        setIndicator((i) => ({ ...i, visible: false }))
        return
      }
      setIndicator({ x: el.offsetLeft, w: el.offsetWidth, visible: true })
    }
    place()
    window.addEventListener('resize', place)
    document.fonts?.ready.then(place)
    return () => window.removeEventListener('resize', place)
  }, [current])

  /* Background once the page scrolls */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  /* Mobile menu: scroll lock, Escape to close, close on resize to desktop */
  useEffect(() => {
    document.documentElement.classList.toggle('menu-open', open)
    if (!open) return undefined
    const onKey = (e) => {
      if (e.key === 'Escape') {
        setOpen(false)
        toggleRef.current?.focus()
      }
    }
    const onResize = () => window.innerWidth > 860 && setOpen(false)
    window.addEventListener('keydown', onKey)
    window.addEventListener('resize', onResize)
    return () => {
      window.removeEventListener('keydown', onKey)
      window.removeEventListener('resize', onResize)
      document.documentElement.classList.remove('menu-open')
    }
  }, [open])

  const go = (id) => (e) => {
    e.preventDefault()
    setOpen(false)
    // Wait a frame so the scroll lock is released before scrolling.
    requestAnimationFrame(() => goTo(id))
  }

  return (
    <header className={`nav ${ready ? 'is-ready' : ''} ${scrolled ? 'is-scrolled' : ''}`}>
      <div className="nav__inner">
        <a className="brand" href="#home" onClick={go('home')} aria-label={`${site.name}, back to top`}>
          <span className="brand__mark" aria-hidden="true">
            N
          </span>
          <span className="brand__name">
            {site.name}
            <span className="brand__dot">.</span>
          </span>
        </a>

        <nav className="nav__links" aria-label="Primary">
          <ul ref={listRef}>
            {navItems.map((item) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  onClick={go(item.id)}
                  aria-current={current === item.id ? 'location' : undefined}
                >
                  {item.label}
                </a>
              </li>
            ))}
            <span
              className="nav__indicator"
              aria-hidden="true"
              style={{
                transform: `translateX(${indicator.x}px)`,
                width: indicator.w,
                opacity: indicator.visible ? 1 : 0,
              }}
            />
          </ul>
        </nav>

        <div className="nav__cta">
          <Button href="#contact" size="sm" icon={ArrowUpRight}>
            Let&rsquo;s Talk
          </Button>
        </div>

        <button
          ref={toggleRef}
          type="button"
          className="nav__toggle"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? 'Close menu' : 'Open menu'}
          onClick={() => setOpen((o) => !o)}
        >
          {open ? <X size={22} aria-hidden="true" /> : <Menu size={22} aria-hidden="true" />}
        </button>
      </div>

      <div id="mobile-menu" className={`menu ${open ? 'is-open' : ''}`}>
        <nav aria-label="Mobile">
          <ol>
            {navItems.map((item, i) => (
              <li key={item.id} style={{ '--i': i }}>
                <a
                  href={`#${item.id}`}
                  onClick={go(item.id)}
                  aria-current={current === item.id ? 'location' : undefined}
                >
                  <span className="menu__num">0{i + 1}</span>
                  {item.label}
                </a>
              </li>
            ))}
          </ol>
        </nav>
        <div className="menu__foot">
          <Button href="#contact" icon={ArrowUpRight} onClick={() => setOpen(false)}>
            Let&rsquo;s Talk
          </Button>
          <p className="menu__meta">{site.location}</p>
        </div>
      </div>
    </header>
  )
}
