import { Hammer, Puzzle, ShieldCheck, Telescope } from 'lucide-react'
import Reveal from './ui/Reveal.jsx'
import SectionHead from './ui/SectionHead.jsx'
import { beyond } from '../data/site.js'

const ICONS = { shield: ShieldCheck, telescope: Telescope, puzzle: Puzzle, hammer: Hammer }

export default function Beyond() {
  return (
    <section id="beyond" tabIndex={-1} className="section beyond" aria-labelledby="beyond-title">
      <div className="container">
        <SectionHead
          num="04"
          label="Beyond coding"
          id="beyond-title"
          lines={[
            'Beyond the',
            <>
              <span className="serif-accent">editor.</span>
            </>,
          ]}
        />

        <ul className="bento">
          {beyond.map((item, i) => {
            const Icon = ICONS[item.icon]
            return (
              <Reveal
                as="li"
                key={item.id}
                delay={i * 90}
                className={`bento__tile ${item.feature ? 'bento__tile--feature' : ''}`}
              >
                <Icon className="bento__icon" size={26} strokeWidth={1.5} aria-hidden="true" />
                <h3>{item.title}</h3>
                <p>{item.text}</p>
                {item.feature && (
                  <pre className="terminal" aria-hidden="true">
                    <span className="terminal__dim">$ </span>study --field cybersecurity{'\n'}
                    <span className="terminal__dim">→ </span>ethical hacking, one concept at a time{'\n'}
                    <span className="terminal__dim">$ </span>
                    <span className="terminal__caret" />
                  </pre>
                )}
              </Reveal>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
