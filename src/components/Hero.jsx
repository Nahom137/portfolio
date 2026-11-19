import { useEffect, useRef } from 'react'
import { ArrowDownRight, ArrowUpRight } from 'lucide-react'
import Button from './ui/Button.jsx'
import Lines from './ui/Lines.jsx'
import useLocalTime from '../hooks/useLocalTime.js'
import { marquee, site } from '../data/site.js'

function Marquee() {
  const set = marquee.map((item, i) => (
    <span className={`marquee__item ${i % 2 ? 'is-filled' : ''}`} key={item}>
      {item}
      <span className="marquee__sep" aria-hidden="true">
        ✱
      </span>
    </span>
  ))
  return (
    <div className="marquee" aria-label="Areas of interest">
      <div className="marquee__track">
        <div className="marquee__set">{set}</div>
        <div className="marquee__set" aria-hidden="true">
          {set}
        </div>
      </div>
    </div>
  )
}

export default function Hero({ ready, reduced }) {
  const ref = useRef(null)
  const time = useLocalTime(site.timezone)

  /* The grid "lights up" around the pointer. */
  useEffect(() => {
    const el = ref.current
    if (!el || reduced) return undefined
    let raf = 0
    const onMove = (e) => {
      if (raf) return
      raf = requestAnimationFrame(() => {
        raf = 0
        const r = el.getBoundingClientRect()
        el.style.setProperty('--mx', `${e.clientX - r.left}px`)
        el.style.setProperty('--my', `${e.clientY - r.top}px`)
      })
    }
    el.addEventListener('pointermove', onMove, { passive: true })
    return () => {
      el.removeEventListener('pointermove', onMove)
      cancelAnimationFrame(raf)
    }
  }, [reduced])

  return (
    <section id="home" tabIndex={-1} className={`hero ${ready ? 'is-ready' : ''}`} ref={ref} aria-labelledby="hero-title">
      <div className="hero__grid hero__grid--base" aria-hidden="true" />
      <div className="hero__grid hero__grid--lit" aria-hidden="true" />
      <div className="hero__glow" aria-hidden="true" />

      <div className="container hero__body">
        <div className="hero__meta">
          <span>Portfolio / {new Date().getFullYear()}</span>
          <span className="hero__meta-mid">Computer Science student</span>
          <span className="hero__scroll">
            Scroll <ArrowDownRight size={14} aria-hidden="true" />
          </span>
        </div>

        <h1 className="hero__title" id="hero-title">
          <Lines
            active={ready}
            delay={150}
            lines={[
              'Finding the',
              'problem.',
              'Building the',
              <span className="serif-accent" key="s">
                software.
              </span>,
            ]}
          />
        </h1>

        <div className="hero__bottom">
          <div className="hero__intro">
            <p className="hero__lede">
              I&rsquo;m <strong>{site.name}</strong>, an aspiring software engineer who builds full-stack
              products and SaaS for real-world problems, and studies how systems break so I can build
              ones that don&rsquo;t.
            </p>
            <div className="hero__actions">
              <Button href="#projects" icon={ArrowDownRight}>
                View Projects
              </Button>
              <Button href="#contact" variant="ghost" icon={ArrowUpRight}>
                Contact Me
              </Button>
            </div>
          </div>

          <dl className="spec" aria-label="Quick facts">
            <div className="spec__row">
              <dt>Status</dt>
              <dd>
                <span className="pulse" aria-hidden="true" />
                {site.status}
              </dd>
            </div>
            <div className="spec__row">
              <dt>Based in</dt>
              <dd>{site.location}</dd>
            </div>
            <div className="spec__row">
              <dt>Local time</dt>
              <dd>
                <time>{time}</time> EAT
              </dd>
            </div>
            <div className="spec__row">
              <dt>Focus</dt>
              <dd>Full-stack · Security · SaaS</dd>
            </div>
          </dl>
        </div>
      </div>

      <Marquee />
    </section>
  )
}
