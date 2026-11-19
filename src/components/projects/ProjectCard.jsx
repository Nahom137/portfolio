import { useEffect, useRef } from 'react'
import { ArrowUpRight } from 'lucide-react'
import Button from '../ui/Button.jsx'
import Reveal from '../ui/Reveal.jsx'
import ProjectPreview from './Previews.jsx'
import StackList from './StackList.jsx'
import { GithubAction, LiveAction } from './ProjectLinks.jsx'

/** Subtle pointer-driven tilt on the preview. Skipped for touch and reduced motion. */
function useTilt(ref, enabled) {
  useEffect(() => {
    const el = ref.current
    if (!el || !enabled) return undefined
    let raf = 0
    const onMove = (e) => {
      if (raf) return
      raf = requestAnimationFrame(() => {
        raf = 0
        const r = el.getBoundingClientRect()
        const px = (e.clientX - r.left) / r.width - 0.5
        const py = (e.clientY - r.top) / r.height - 0.5
        el.style.setProperty('--ry', `${(px * 5).toFixed(2)}deg`)
        el.style.setProperty('--rx', `${(-py * 5).toFixed(2)}deg`)
      })
    }
    const reset = () => {
      el.style.setProperty('--ry', '0deg')
      el.style.setProperty('--rx', '0deg')
    }
    el.addEventListener('pointermove', onMove, { passive: true })
    el.addEventListener('pointerleave', reset)
    return () => {
      el.removeEventListener('pointermove', onMove)
      el.removeEventListener('pointerleave', reset)
      cancelAnimationFrame(raf)
    }
  }, [ref, enabled])
}

export default function ProjectCard({ project, onOpen, tiltEnabled }) {
  const previewRef = useRef(null)
  useTilt(previewRef, tiltEnabled)
  const titleId = `proj-${project.id}`

  return (
    <Reveal as="article" className={`proj proj--${project.id}`} aria-labelledby={titleId}>
      <span className="proj__rule" aria-hidden="true" />

      <div
        className="proj__preview"
        ref={previewRef}
        data-cursor="View"
        onClick={(e) => onOpen(project, e.currentTarget)}
      >
        <div className="proj__frame">
          <ProjectPreview kind={project.preview} />
          <span className="proj__badge">Illustrative preview</span>
        </div>
      </div>

      <div className="proj__info">
        <p className="proj__meta">
          <span className="proj__index">{project.index}</span>
          <span>{project.category}</span>
        </p>
        <h3 className="proj__name" id={titleId}>
          {project.name}
        </h3>
        <p className="proj__desc">{project.description}</p>
        <StackList stack={project.stack} />
        <div className="proj__actions">
          <Button icon={ArrowUpRight} onClick={(e) => onOpen(project, e.currentTarget)}>
            View Project
          </Button>
          <LiveAction live={project.live} label={project.liveLabel} />
          <GithubAction repo={project.repo} isPrivate={project.repoPrivate} />
        </div>
      </div>
    </Reveal>
  )
}
