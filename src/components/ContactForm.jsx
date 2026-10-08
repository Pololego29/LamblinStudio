import { useState } from 'react'
import { CONTACT, SITE } from '../data/site'

const configured = Boolean(SITE.formAccessKey) && !SITE.formAccessKey.startsWith('VOTRE_')

function mailtoHref({ name, email, subject, message }) {
  const body = `${message}\n\n—\n${name}${email ? ` (${email})` : ''}`
  return `mailto:${SITE.email}?subject=${encodeURIComponent(`[${subject}] ${name}`)}&body=${encodeURIComponent(body)}`
}

function Field({ id, label, children }) {
  return (
    <div>
      <label htmlFor={id} className="mb-2 block text-sm font-medium text-bone/85">
        {label}
      </label>
      {children}
    </div>
  )
}

export default function ContactForm() {
  const [status, setStatus] = useState('idle') // idle | sending | success | error
  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    const form = e.currentTarget
    const el = form.elements
    if (el.namedItem('botcheck')?.checked) return // honeypot : ignoré silencieusement

    const values = {
      name: el.namedItem('name').value.trim(),
      email: el.namedItem('email').value.trim(),
      subject: el.namedItem('subject').value,
      message: el.namedItem('message').value.trim(),
    }

    // Formulaire en ligne pas encore activé : repli vers la messagerie du visiteur
    if (!configured) {
      window.location.href = mailtoHref(values)
      return
    }

    try {
      setStatus('sending')
      setError('')
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: SITE.formAccessKey,
          from_name: 'Site Lamblin Studio',
          subject: `[Contact] ${values.subject} — ${values.name}`,
          name: values.name,
          email: values.email,
          objet: values.subject,
          message: values.message,
          botcheck: false,
        }),
      })
      const json = await res.json()
      if (json.success) {
        setStatus('success')
        form.reset()
      } else {
        setStatus('error')
        setError("L'envoi n'a pas abouti.")
      }
    } catch {
      setStatus('error')
      setError("Impossible d'envoyer le message pour le moment.")
    }
  }

  if (status === 'success') {
    return (
      <div className="border border-line bg-ink-950 p-8 sm:p-10" role="status">
        <h3 className="text-3xl uppercase text-bone">Message envoyé</h3>
        <p className="mt-3 text-bone/85">Merci pour votre message. Je vous répondrai dans les meilleurs délais.</p>
        <button type="button" onClick={() => setStatus('idle')} className="btn-ghost mt-6">
          Envoyer un autre message
        </button>
      </div>
    )
  }

  const sending = status === 'sending'

  return (
    <form
      onSubmit={handleSubmit}
      className="border border-line bg-ink-950 p-5 sm:p-8"
      aria-describedby={configured ? undefined : 'form-notice'}
    >
      <h3 className="text-[1.9rem] uppercase text-bone">Écrire au studio</h3>

      {!configured && (
        <p id="form-notice" className="mt-4 border-l-2 border-gold pl-4 text-[0.95rem] leading-relaxed text-bone/85">
          L'envoi direct depuis le site n'est pas encore disponible : à la validation, votre messagerie s'ouvrira
          avec un message pré-rempli. Vous pouvez aussi écrire à{' '}
          <a href={`mailto:${SITE.email}`} className="font-medium text-gold-bright underline underline-offset-4">
            {SITE.email}
          </a>
          .
        </p>
      )}

      {/* Honeypot anti-spam, invisible pour les visiteurs */}
      <div className="hidden" aria-hidden="true">
        <label htmlFor="cf-botcheck">Ne pas remplir</label>
        <input id="cf-botcheck" type="checkbox" name="botcheck" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="mt-6 grid gap-5 sm:grid-cols-2">
        <Field id="cf-name" label="Nom">
          <input id="cf-name" name="name" type="text" required autoComplete="name" className="field" />
        </Field>
        <Field id="cf-email" label="Email">
          <input id="cf-email" name="email" type="email" required autoComplete="email" className="field" />
        </Field>
      </div>

      <div className="mt-5">
        <Field id="cf-subject" label="Objet">
          <select id="cf-subject" name="subject" defaultValue={CONTACT.subjects[0]} className="field cursor-pointer">
            {CONTACT.subjects.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </Field>
      </div>

      <div className="mt-5">
        <Field id="cf-message" label="Message">
          <textarea id="cf-message" name="message" required rows={6} className="field min-h-[9rem] resize-y" />
        </Field>
      </div>

      {status === 'error' && (
        <p role="alert" className="mt-5 border-l-2 border-[#c4553a] pl-4 text-[0.95rem] text-bone/90">
          {error} Vous pouvez réessayer ou écrire directement à{' '}
          <a href={`mailto:${SITE.email}`} className="font-medium text-gold-bright underline underline-offset-4">
            {SITE.email}
          </a>
          .
        </p>
      )}

      <button type="submit" disabled={sending} className="btn-primary mt-6 w-full disabled:cursor-wait disabled:opacity-70">
        {sending ? 'Envoi en cours…' : configured ? 'Envoyer le message' : 'Envoyer par email'}
      </button>
    </form>
  )
}
