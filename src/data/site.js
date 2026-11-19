/**
 * Single source of truth for all site content.
 * Anything marked PLACEHOLDER is intentionally empty: fill it in and the UI
 * switches from a clearly-marked placeholder to a real link automatically.
 */

export const site = {
  name: 'Nahom',
  location: 'Addis Ababa, Ethiopia',
  timezone: 'Africa/Addis_Ababa',
  status: 'Open to opportunities',
}

/* ------------------------------------------------------------------ */
/* CONTACT                                                             */
/* ------------------------------------------------------------------ */
export const contact = {
  email: 'sharewnahom@gmail.com',
  github: 'https://github.com/Nahom137',
  // Optional endpoint that accepts the form as JSON (see README).
  formEndpoint: import.meta.env.VITE_CONTACT_ENDPOINT || '',
}

export const contactPlaceholders = {
  email: 'your.email@example.com',
  github: 'github.com/your-username',
}

export const sections = ['home', 'about', 'projects', 'skills', 'beyond', 'contact']

export const navItems = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'projects', label: 'Projects' },
  { id: 'skills', label: 'Skills' },
  { id: 'contact', label: 'Contact' },
]

export const marquee = [
  'Full-stack web',
  'Software engineering',
  'Cybersecurity',
  'SaaS products',
  'Ethical hacking',
  'Problem solving',
]

export const process = [
  {
    title: 'Identify',
    text: 'Find the real problem before touching the keyboard. Who has it, and what does it cost them?',
  },
  {
    title: 'Think it through',
    text: 'Work out the simplest solution that still holds up once real people and real data show up.',
  },
  {
    title: 'Build',
    text: 'Ship something people can actually use, then keep improving it.',
  },
]

/* ------------------------------------------------------------------ */
/* PROJECTS                                                            */
/* repoPrivate: repository is private (client/commercial systems).     */
/* live: only set where a real public URL exists.                      */
/* ------------------------------------------------------------------ */
export const projects = [
  {
    id: 'payroll360',
    index: '01',
    name: 'Payroll360',
    category: 'SaaS · Payroll & HR',
    description:
      'An Ethiopian payroll and HR management SaaS platform designed to help businesses manage employees, payroll, attendance, and HR operations.',
    stack: ['React', 'Node.js', 'Express', 'PostgreSQL'],
    preview: 'payroll',
    live: '',
    repo: '',
    repoPrivate: true,
  },
  {
    id: 'hotel',
    index: '02',
    name: 'Hotel Management System',
    category: 'Hospitality · Operations',
    description:
      'A hotel management platform designed to simplify reservations, room management, housekeeping, and hotel operations.',
    stack: ['React', 'PostgreSQL'],
    preview: 'hotel',
    live: '',
    repo: '',
    repoPrivate: true,
  },
  {
    id: 'ethio-textbooks',
    index: '03',
    name: 'Ethio Textbooks',
    category: 'Education · Learning',
    description:
      'An educational platform providing Ethiopian students with access to textbooks and learning resources.',
    stack: ['React Native', 'Expo', 'Supabase'],
    preview: 'textbooks',
    live: 'https://play.google.com/store/apps/details?id=com.ethiotextbooks.app',
    liveLabel: 'Get it on Google Play',
    repo: '',
    repoPrivate: true,
  },
]

export const skillGroups = [
  {
    title: 'Frontend',
    items: ['HTML', 'CSS', 'JavaScript', 'React', 'Vite'],
  },
  {
    title: 'Backend',
    items: ['Node.js', 'Express.js'],
  },
  {
    title: 'Database',
    items: ['PostgreSQL', 'Supabase'],
  },
  {
    title: 'Other',
    items: ['Git', 'GitHub', 'REST APIs', 'Linux', 'Python', 'Cybersecurity fundamentals'],
  },
]

export const beyond = [
  {
    id: 'security',
    title: 'Cybersecurity & ethical hacking',
    text: 'Learning how systems get broken makes me a more careful builder.',
    icon: 'shield',
    feature: true,
  },
  {
    id: 'tech',
    title: 'Exploring new technology',
    text: 'Curious by default. I try things to understand how they work.',
    icon: 'telescope',
  },
  {
    id: 'problems',
    title: 'Problem-solving',
    text: 'Taking a hard thing apart until every piece is small enough to solve.',
    icon: 'puzzle',
  },
  {
    id: 'products',
    title: 'Building useful products',
    text: 'If it does not help someone, it is not finished.',
    icon: 'hammer',
  },
]
