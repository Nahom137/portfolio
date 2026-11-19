import { goTo } from '../../utils/scroll.js'

/**
 * One button primitive for every action on the site.
 * - href="#id"   → smooth in-page navigation
 * - href="https" → external link (opens safely in a new tab)
 * - disabled     → used for links that are still placeholders
 */
export default function Button({
  href,
  onClick,
  variant = 'primary',
  size = 'md',
  icon: Icon,
  disabled = false,
  external = false,
  type = 'button',
  children,
  ...rest
}) {
  const cls = `btn btn--${variant} btn--${size}`
  const inner = (
    <>
      <span className="btn__label">{children}</span>
      {Icon && <Icon className="btn__icon" size={16} strokeWidth={2} aria-hidden="true" />}
    </>
  )

  if (disabled) {
    return (
      <button type="button" className={`${cls} is-disabled`} disabled {...rest}>
        {inner}
      </button>
    )
  }

  if (href && href.startsWith('#')) {
    return (
      <a
        className={cls}
        href={href}
        onClick={(e) => {
          e.preventDefault()
          goTo(href.slice(1))
          onClick?.(e)
        }}
        {...rest}
      >
        {inner}
      </a>
    )
  }

  if (href) {
    return (
      <a
        className={cls}
        href={href}
        {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
        onClick={onClick}
        {...rest}
      >
        {inner}
      </a>
    )
  }

  return (
    <button type={type} className={cls} onClick={onClick} {...rest}>
      {inner}
    </button>
  )
}
