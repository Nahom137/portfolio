import Reveal from './ui/Reveal.jsx'
import SectionHead from './ui/SectionHead.jsx'
import { process } from '../data/site.js'

export default function About() {
  return (
    <section id="about" tabIndex={-1} className="section about" aria-labelledby="about-title">
      <div className="container">
        <SectionHead
          num="01"
          label="About"
          id="about-title"
          lines={[
            'I start with',
            <>
              the <span className="serif-accent">problem.</span>
            </>,
          ]}
        />

        <div className="about__grid">
          <Reveal as="blockquote" className="about__quote">
            Code is the means. A problem solved for a <em>real person</em> is the point.
          </Reveal>

          <div className="about__body">
            <Reveal as="p" delay={100}>
              I&rsquo;m a Computer Science student working toward a career as a software engineer. Most of
              what I know I learned by building: frontend interfaces, backend systems, databases,
              authentication, and the unglamorous details that make real business software hold together.
            </Reveal>
            <Reveal as="p" delay={180}>
              I&rsquo;m drawn to products that exist because someone has a genuine problem: payroll that
              is painful to run, hotels juggling rooms and housekeeping, students hunting for textbooks
              and scholarships. I like starting there, then working out the simplest thing that actually
              solves it.
            </Reveal>
            <Reveal as="p" delay={260}>
              Alongside software engineering I&rsquo;m studying cybersecurity and ethical hacking.
              Understanding how systems get broken makes me a more careful builder. I&rsquo;m still
              learning, and I like it that way.
            </Reveal>
          </div>
        </div>

        <Reveal as="h3" className="process__title eyebrow">
          <span className="eyebrow__num">—</span>
          <span>How I work</span>
        </Reveal>
        <ol className="process">
          {process.map((step, i) => (
            <Reveal as="li" className="process__step" key={step.title} delay={i * 120}>
              <span className="process__num" aria-hidden="true">
                0{i + 1}
              </span>
              <h4>{step.title}</h4>
              <p>{step.text}</p>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  )
}
