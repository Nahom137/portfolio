import { useRef, useState } from 'react'
import { ArrowUpRight, Check, TriangleAlert } from 'lucide-react'
import Button from './ui/Button.jsx'
import { contact } from '../data/site.js'

const FIELDS = [
  { name: 'name', label: 'Name', type: 'text', autoComplete: 'name' },
  { name: 'email', label: 'Email', type: 'email', autoComplete: 'email' },
  { name: 'subject', label: 'Subject', type: 'text', autoComplete: 'off' },
  { name: 'message', label: 'Message', type: 'textarea', autoComplete: 'off' },
]

const VALIDATORS = {
  name: (v) => (v.trim().length < 2 ? 'Please tell me your name.' : ''),
  email: (v) => (/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim()) ? '' : 'Enter a valid email address.'),
  subject: (v) => (v.trim().length < 3 ? 'Add a short subject.' : ''),
  message: (v) => (v.trim().length < 10 ? 'Say a little more (at least 10 characters).' : ''),
}

const EMPTY = { name: '', email: '', subject: '', message: '' }

/**
 * Delivery order:
 *  1. a configured HTTP endpoint (POST JSON), never a direct database call from the browser
 *  2. the visitor's mail app via mailto, when an email address is configured
 *  3. otherwise an honest "not connected yet" notice (placeholder mode)
 */
async function deliver(values) {
  if (contact.formEndpoint) {
    const res = await fetch(contact.formEndpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify(values),
    })
    if (!res.ok) throw new Error(`Request failed: ${res.status}`)
    return 'sent'
  }
  if (contact.email) {
    const body = `${values.message}\n\n— ${values.name} (${values.email})`
    window.location.href = `mailto:${contact.email}?subject=${encodeURIComponent(
      values.subject,
    )}&body=${encodeURIComponent(body)}`
    return 'mailto'
  }
  return 'unconfigured'
}

const MESSAGES = {
  sent: 'Thanks. Your message is on its way and I will reply soon.',
  mailto: 'Your email app should open with the message ready to send.',
  unconfigured:
    'Placeholder mode: this form is not connected to an inbox yet. Add an email or endpoint in src/data/site.js (see README).',
  error: 'Something went wrong sending your message. Please try again in a moment.',
}

export default function ContactForm() {
  const [values, setValues] = useState(EMPTY)
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle') // idle | sending | sent | mailto | unconfigured | error
  const formRef = useRef(null)

  const setField = (name) => (e) => {
    const value = e.target.value
    setValues((v) => ({ ...v, [name]: value }))
    if (errors[name]) setErrors((er) => ({ ...er, [name]: VALIDATORS[name](value) }))
  }

  const blur = (name) => () => setErrors((er) => ({ ...er, [name]: VALIDATORS[name](values[name]) }))

  const onSubmit = async (e) => {
    e.preventDefault()
    if (status === 'sending') return

    // Honeypot: real visitors never fill this in.
    if (formRef.current?.elements.website?.value) {
      setStatus('sent')
      return
    }

    const next = {}
    FIELDS.forEach(({ name }) => {
      next[name] = VALIDATORS[name](values[name])
    })
    setErrors(next)
    const firstInvalid = FIELDS.find(({ name }) => next[name])
    if (firstInvalid) {
      formRef.current.elements[firstInvalid.name].focus()
      setStatus('idle')
      return
    }

    setStatus('sending')
    try {
      const result = await deliver(values)
      setStatus(result)
      if (result === 'sent') setValues(EMPTY)
    } catch {
      setStatus('error')
    }
  }

  const notice = MESSAGES[status]
  const isOk = status === 'sent' || status === 'mailto'

  return (
    <form className="form" ref={formRef} onSubmit={onSubmit} noValidate aria-label="Contact form">
      {FIELDS.map(({ name, label, type, autoComplete }) => {
        const id = `cf-${name}`
        const err = errors[name]
        const common = {
          id,
          name,
          value: values[name],
          onChange: setField(name),
          onBlur: blur(name),
          autoComplete,
          required: true,
          'aria-invalid': err ? 'true' : undefined,
          'aria-describedby': err ? `${id}-err` : undefined,
        }
        return (
          <div className={`field ${err ? 'has-error' : ''}`} key={name}>
            <label htmlFor={id}>{label}</label>
            {type === 'textarea' ? (
              <textarea rows={5} {...common} />
            ) : (
              <input type={type} {...common} />
            )}
            {err && (
              <p className="field__error" id={`${id}-err`}>
                {err}
              </p>
            )}
          </div>
        )
      })}

      <div className="field--hp" aria-hidden="true">
        <label htmlFor="cf-website">Leave this empty</label>
        <input id="cf-website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="form__foot">
        <Button type="submit" icon={ArrowUpRight} disabled={false} aria-busy={status === 'sending'}>
          {status === 'sending' ? 'Sending…' : 'Send message'}
        </Button>
        <p
          className={`form__status ${isOk ? 'is-ok' : ''} ${
            status === 'error' || status === 'unconfigured' ? 'is-warn' : ''
          }`}
          role="status"
          aria-live="polite"
        >
          {notice && (
            <>
              {isOk ? (
                <Check size={16} aria-hidden="true" />
              ) : (
                <TriangleAlert size={16} aria-hidden="true" />
              )}
              <span>{notice}</span>
            </>
          )}
        </p>
      </div>
    </form>
  )
}
