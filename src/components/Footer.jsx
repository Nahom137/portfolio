import { ArrowUp } from 'lucide-react'
import { goTo } from '../utils/scroll.js'
import { site } from '../data/site.js'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__inner">
        <p>
          &copy; {new Date().getFullYear()} {site.name}. All rights reserved.
        </p>
        <p className="footer__built">Designed &amp; built with React + Vite</p>
        <a
          className="footer__top"
          href="#home"
          onClick={(e) => {
            e.preventDefault()
            goTo('home')
          }}
        >
          Back to top <ArrowUp size={14} aria-hidden="true" />
        </a>
      </div>
    </footer>
  )
}
