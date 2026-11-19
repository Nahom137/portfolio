import { useRef } from 'react'
import useInView from '../../hooks/useInView.js'

/**
 * Masked line-by-line text reveal. Pass each visual line as an array item.
 * `active` overrides the scroll trigger (used by the hero, which waits for the loader).
 */
export default function Lines({ lines, as: Tag = 'span', className = '', active, delay = 0 }) {
  const ref = useRef(null)
  const seen = useInView(ref, { threshold: 0.2 })
  const on = active ?? seen

  return (
    <Tag
      ref={ref}
      className={`lines ${on ? 'is-in' : ''} ${className}`.trim()}
      style={{ '--base': `${delay}ms` }}
    >
      {lines.map((line, i) => (
        <span className="line" key={i}>
          <span className="line__inner" style={{ '--i': i }}>
            {line}
          </span>
        </span>
      ))}
    </Tag>
  )
}
