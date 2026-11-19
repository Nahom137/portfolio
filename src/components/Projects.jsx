import { useCallback, useState } from 'react'
import SectionHead from './ui/SectionHead.jsx'
import ProjectCard from './projects/ProjectCard.jsx'
import ProjectDialog from './projects/ProjectDialog.jsx'
import { projects } from '../data/site.js'

export default function Projects({ reduced }) {
  const [active, setActive] = useState(null)
  const open = useCallback((project) => setActive(project), [])
  const close = useCallback(() => setActive(null), [])

  return (
    <section id="projects" tabIndex={-1} className="section projects" aria-labelledby="projects-title">
      <div className="container">
        <SectionHead
          num="02"
          label="Selected work"
          id="projects-title"
          lines={[
            'Products,',
            <>
              not <span className="serif-accent">exercises.</span>
            </>,
          ]}
          intro="Three products built around real-world problems: payroll, hospitality and education."
        />

        <div className="proj-list">
          {projects.map((p) => (
            <ProjectCard key={p.id} project={p} onOpen={open} tiltEnabled={!reduced} />
          ))}
        </div>
      </div>

      <ProjectDialog project={active} onClose={close} />
    </section>
  )
}
