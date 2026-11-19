import { ArrowUpRight, Mail } from 'lucide-react'
import Reveal from './ui/Reveal.jsx'
import Lines from './ui/Lines.jsx'
import { GithubIcon } from './ui/Icons.jsx'
import { contact, contactPlaceholders } from '../data/site.js'

const CHANNELS = [
  {
    key: 'email',
    label: 'Email',
    icon: Mail,
    href: (v) => `mailto:${v}`,
    text: (v) => v,
  },
  {
    key: 'github',
    label: 'GitHub',
    icon: GithubIcon,
    href: (v) => v,
    text: (v) => v.replace(/^https?:\/\/(www\.)?/, ''),
  },
]

export default function Contact() {
  return (
    <section id="contact" tabIndex={-1} className="section contact" aria-labelledby="contact-title">
      <div className="container">
        <Reveal as="p" className="eyebrow">
          <span className="eyebrow__num">(05)</span>
          <span>Contact</span>
        </Reveal>

        <h2 className="contact__title" id="contact-title">
          <Lines
            lines={[
              'Have an idea?',
              <>
                Let&rsquo;s <span className="serif-accent">build it.</span>
              </>,
            ]}
          />
        </h2>

        <div className="contact__grid">
          <Reveal as="div" className="contact__channels">
            <p className="contact__lede">
              Whether it is a project, an internship, or a problem you think software could solve, I would
              like to hear about it.
            </p>
            <ul>
              {CHANNELS.map(({ key, label, icon: Icon, href, text }) => {
                const value = contact[key]
                return (
                  <li key={key}>
                    <span className="channel__label">
                      <Icon size={16} aria-hidden="true" /> {label}
                    </span>
                    {value ? (
                      <a
                        className="channel__value"
                        href={href(value)}
                        {...(key !== 'email' ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                      >
                        {text(value)}
                        <ArrowUpRight size={16} aria-hidden="true" />
                      </a>
                    ) : (
                      <span className="channel__value is-placeholder">
                        {contactPlaceholders[key]}
                        <span className="ph-tag">Placeholder</span>
                      </span>
                    )}
                  </li>
                )
              })}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
