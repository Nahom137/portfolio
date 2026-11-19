import { ArrowUpRight, Lock } from 'lucide-react'
import Button from '../ui/Button.jsx'
import { GithubIcon } from '../ui/Icons.jsx'

/**
 * Links only become real once a URL exists in src/data/site.js.
 * Until then they render as disabled, clearly-labelled placeholders (no fake hrefs).
 */
export function GithubAction({ repo, isPrivate }) {
  if (repo) {
    return (
      <Button href={repo} external variant="ghost" icon={GithubIcon}>
        GitHub
      </Button>
    )
  }
  if (isPrivate) {
    return (
      <Button disabled variant="ghost" icon={Lock} title="The source code is in a private repository">
        Private repository
      </Button>
    )
  }
  return (
    <Button disabled variant="ghost" icon={GithubIcon} title="Placeholder: repository link not added yet">
      GitHub · link TBA
    </Button>
  )
}

/** Renders nothing when there is no public URL, so no dead button is shown. */
export function LiveAction({ live, label = 'Live site' }) {
  if (!live) return null
  return (
    <Button href={live} external variant="ghost" icon={ArrowUpRight}>
      {label}
    </Button>
  )
}
