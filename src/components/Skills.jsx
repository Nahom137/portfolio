import Reveal from './ui/Reveal.jsx'
import SectionHead from './ui/SectionHead.jsx'
import { skillGroups } from '../data/site.js'

export default function Skills() {
  return (
    <section id="skills" tabIndex={-1} className="section skills" aria-labelledby="skills-title">
      <div className="container">
        <SectionHead
          num="03"
          label="Skills & technologies"
          id="skills-title"
          lines={[
            'What I',
            <>
              <span className="serif-accent">work with</span> and learn.
            </>,
          ]}
          intro="Not a proficiency chart. This is a map of the tools I use and the areas I'm still growing in."
        />

        <div className="skills__grid">
          {skillGroups.map((group, g) => (
            <Reveal as="div" className="skills__group" key={group.title} delay={g * 90}>
              <h3 className="skills__title">
                <span className="skills__count" aria-hidden="true">
                  {String(group.items.length).padStart(2, '0')}
                </span>
                {group.title}
              </h3>
              <ul>
                {group.items.map((item, i) => (
                  <li key={item}>
                    <span className="skills__idx" aria-hidden="true">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span className="skills__name">{item}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
