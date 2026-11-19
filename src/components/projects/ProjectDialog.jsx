import { useEffect, useRef } from 'react'
import { X } from 'lucide-react'
import ProjectPreview from './Previews.jsx'
import StackList from './StackList.jsx'
import { GithubAction, LiveAction } from './ProjectLinks.jsx'

/**
 * Case-study dialog built on the native <dialog> element:
 * focus trapping, Escape to close and focus restoration come for free.
 */
export default function ProjectDialog({ project, onClose }) {
  const ref = useRef(null)

  useEffect(() => {
    const dlg = ref.current
    if (!dlg) return
    if (project && !dlg.open) dlg.showModal()
    if (!project && dlg.open) dlg.close()
    document.documentElement.classList.toggle('dialog-open', Boolean(project))
    return () => document.documentElement.classList.remove('dialog-open')
  }, [project])

  return (
    <dialog
      ref={ref}
      className={`dialog ${project ? `dialog--${project.id}` : ''}`}
      aria-labelledby="dialog-title"
      onClose={onClose}
      onClick={(e) => {
        if (e.target === ref.current) ref.current.close()
      }}
    >
      {project && (
        <div className="dialog__panel">
          <button type="button" className="dialog__close" onClick={() => ref.current.close()}>
            <X size={18} aria-hidden="true" />
            <span className="sr-only">Close project details</span>
          </button>

          <div className="dialog__preview">
            <ProjectPreview kind={project.preview} />
          </div>

          <div className="dialog__body">
            <p className="proj__meta">
              <span className="proj__index">{project.index}</span>
              <span>{project.category}</span>
            </p>
            <h3 id="dialog-title" className="dialog__title">
              {project.name}
            </h3>
            <p className="dialog__desc">{project.description}</p>

            <h4 className="dialog__label">Stack</h4>
            <StackList stack={project.stack} />

            <h4 className="dialog__label">Case study</h4>
            <p className="dialog__ph">
              <span className="ph-tag">Placeholder</span> Problem, approach and outcome write-up to be
              added.
            </p>

            <div className="dialog__actions">
              <LiveAction live={project.live} label={project.liveLabel} />
              <GithubAction repo={project.repo} isPrivate={project.repoPrivate} />
            </div>
          </div>
        </div>
      )}
    </dialog>
  )
}
