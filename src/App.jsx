import { useCallback, useEffect, useState } from 'react'
import Loader from './components/Loader.jsx'
import Cursor from './components/Cursor.jsx'
import Nav from './components/Nav.jsx'
import Hero from './components/Hero.jsx'
import About from './components/About.jsx'
import Projects from './components/Projects.jsx'
import Skills from './components/Skills.jsx'
import Beyond from './components/Beyond.jsx'
import Contact from './components/Contact.jsx'
import Footer from './components/Footer.jsx'
import useReducedMotion from './hooks/useReducedMotion.js'

const SEEN_KEY = 'np-intro-seen'

function hasSeenIntro() {
  try {
    return sessionStorage.getItem(SEEN_KEY) === '1'
  } catch {
    return false
  }
}

export default function App() {
  const reduced = useReducedMotion()
  // 'loading' → 'leaving' (hero starts animating) → 'ready' (loader removed)
  const [phase, setPhase] = useState(() => (reduced || hasSeenIntro() ? 'ready' : 'loading'))

  const onLeave = useCallback(() => setPhase('leaving'), [])
  const onDone = useCallback(() => {
    setPhase('ready')
    try {
      sessionStorage.setItem(SEEN_KEY, '1')
    } catch {
      /* storage unavailable: harmless */
    }
  }, [])

  useEffect(() => {
    document.documentElement.classList.toggle('is-loading', phase === 'loading')
    return () => document.documentElement.classList.remove('is-loading')
  }, [phase])

  // If the visitor enables reduced motion mid-intro, skip it.
  useEffect(() => {
    if (reduced && phase !== 'ready') setPhase('ready')
  }, [reduced, phase])

  const heroReady = phase !== 'loading'

  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      {phase !== 'ready' && <Loader onLeave={onLeave} onDone={onDone} />}
      <Cursor disabled={reduced} />
      <Nav ready={heroReady} />
      <main id="main" tabIndex={-1}>
        <Hero ready={heroReady} reduced={reduced} />
        <About />
        <Projects reduced={reduced} />
        <Skills />
        <Beyond />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
