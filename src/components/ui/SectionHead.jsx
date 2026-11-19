import Lines from './Lines.jsx'
import Reveal from './Reveal.jsx'

export default function SectionHead({ num, label, id, lines, intro }) {
  return (
    <header className="sec-head">
      <Reveal as="p" className="eyebrow">
        <span className="eyebrow__num">({num})</span>
        <span>{label}</span>
      </Reveal>
      <h2 className="sec-title" id={id}>
        <Lines lines={lines} />
      </h2>
      {intro && (
        <Reveal as="p" className="sec-intro" delay={150}>
          {intro}
        </Reveal>
      )}
    </header>
  )
}
