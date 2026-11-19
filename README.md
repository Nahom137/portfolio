# Nahom — Portfolio

React + Vite (plain JavaScript), modern CSS, Lucide icons. No other runtime dependencies.

```bash
npm install
npm run dev       # local dev server
npm run build     # production build in dist/
npm run preview   # serve the production build
```

## Design concept: "Field Notes"

An editorial / Swiss-grid layout in near-black with warm off-white ink and a single signal-orange accent.
Type is a three-voice system: **Inter Tight** (display), **Instrument Serif italic** (the human voice, used for one
accent word per heading), and **JetBrains Mono** (annotations, labels, metadata). The hero is a typographic
composition on a ruled grid that lights up around the pointer, not a profile photo.

## Where to fill in your real details

Everything lives in **`src/data/site.js`**. Nothing is invented: empty values render as clearly marked placeholders
and switch to real links as soon as you fill them in.

| What | Where | Until filled in |
| --- | --- | --- |
| Email / GitHub | `contact` | shown as dashed "Placeholder" tags, not links |
| Per-project GitHub repo | `projects[i].repo` | disabled "GitHub · link TBA" button |
| Per-project live URL | `projects[i].live` | disabled "Live site · link TBA" button (in the project dialog) |
| ScholarPath tech stack | `projects[3].stack` | dashed "Stack: placeholder" chip |
| Case-study write-ups | project dialog (`ProjectDialog.jsx`) | "Placeholder" note |

Please double-check the stack chips for Payroll360, Hotel Management System and Ethio Textbooks. They were taken
from your earlier project notes, not from the brief.

## Contact form

The form validates on the client and then delivers in this order:

1. **`VITE_CONTACT_ENDPOINT`** (copy `.env.example` to `.env`): the form POSTs JSON to this URL. Works with a form
   service such as Formspree, or your own Express route. The browser never talks to a database directly.
2. **`contact.email`** in `site.js`: opens the visitor's mail app with the message prefilled.
3. Neither set: shows a clear "placeholder mode" notice instead of pretending the message was sent.

Never put secrets in a `VITE_` variable; they are public in the browser bundle.

## Structure

```
src/
  components/      Nav, Hero, About, Projects, Skills, Beyond, Contact, Footer, Loader, Cursor
    projects/      ProjectCard, ProjectDialog, Previews (4 illustrative CSS/SVG previews), links, stack
    ui/            Button, Reveal, Lines (masked text reveal), SectionHead, Icons
  hooks/           useInView, useScrollSpy, useReducedMotion, useLocalTime
  data/site.js     all content and placeholders
  styles/          tokens, base, chrome (nav/buttons/loader/cursor), one file per section
```

## Accessibility and performance notes

- Semantic landmarks, skip link, `aria-current` navigation, native `<dialog>` for case studies (focus trap, Esc,
  focus restoration), labelled form fields with inline errors and a live status region.
- `prefers-reduced-motion`: the intro loader and custom cursor are skipped, all reveals render in their final state,
  the marquee stops, and smooth scrolling falls back to instant.
- Animations use `transform` and `opacity` only; scroll effects use `IntersectionObserver` (no scroll-jacking).
- The custom cursor ring is decorative and never replaces the native cursor; it is disabled on touch devices.

## Before you deploy

- Add a canonical URL and an `og:image` to `index.html` once you have a domain (none were invented).
- Fonts load from Google Fonts at runtime; self-host them if you want zero third-party requests.
