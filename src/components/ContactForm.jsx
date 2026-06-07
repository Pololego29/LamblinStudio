import { useState } from 'react'
import { SITE } from '../data/site'

const SUBJECTS = ['Partenariat', 'Un projet', 'Une question', 'Autre']

const inputClass =
  'w-full rounded-xl px-4 py-3 bg-white/[0.04] border border-white/10 text-white ' +
  'placeholder-white/30 focus:outline-none focus:border-blue-400/60 focus:bg-white/[0.06] ' +
  'transition-colors duration-200'

export default function ContactForm() {
  const [status, setStatus] = useState('idle') // idle | sending | success | error
  const [error, setError] = useState('')

  const configured = SITE.formAccessKey && !SITE.formAccessKey.startsWith('VOTRE_')

  const handleSubmit = async (e) => {
    e.preventDefault()
    const form = e.target

    // Honeypot anti-spam : si rempli, on ignore silencieusement.
    if (form.botcheck?.checked) return

    if (!configured) {
      setStatus('error')
      setError("Le formulaire n'est pas encore activé : ajoute ta clé Web3Forms dans src/data/site.js.")
      return
    }

    const payload = {
      access_key: SITE.formAccessKey,
      from_name: 'Site Lamblin Studio',
      subject: `[Contact] ${form.subject.value} — ${form.name.value}`,
      name: form.name.value,
      email: form.email.value,
      objet: form.subject.value,
      message: form.message.value,
    }

    try {
      setStatus('sending')
      setError('')
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(payload),
      })
      const json = await res.json()
      if (json.success) {
        setStatus('success')
        form.reset()
      } else {
        setStatus('error')
        setError(json.message || "L'envoi a échoué. Réessaie dans un instant.")
      }
    } catch {
      setStatus('error')
      setError("Impossible d'envoyer le message. Vérifie ta connexion et réessaie.")
    }
  }

  if (status === 'success') {
    return (
      <div className="glass-strong rounded-2xl p-10 text-center max-w-xl mx-auto">
        <div className="w-14 h-14 rounded-full mx-auto mb-5 flex items-center justify-center"
             style={{ background: 'rgba(52,211,153,0.15)', border: '1px solid rgba(52,211,153,0.35)' }}>
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#34d399" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20 6 9 17l-5-5" />
          </svg>
        </div>
        <h3 className="text-white font-bold text-xl mb-2">Message envoyé !</h3>
        <p className="text-white/50 text-sm mb-6">Merci, je te réponds au plus vite.</p>
        <button
          onClick={() => setStatus('idle')}
          className="btn-secondary px-6 py-2.5 text-sm mx-auto"
        >
          Envoyer un autre message
        </button>
      </div>
    )
  }

  const sending = status === 'sending'

  return (
    <form onSubmit={handleSubmit} className="max-w-xl mx-auto text-left">
      {/* Honeypot caché */}
      <input type="checkbox" name="botcheck" tabIndex={-1} autoComplete="off"
             className="hidden" aria-hidden="true" />

      <div className="grid sm:grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-white/50 text-xs font-medium mb-2 tracking-wide">Nom</label>
          <input name="name" type="text" required placeholder="Ton nom" className={inputClass} />
        </div>
        <div>
          <label className="block text-white/50 text-xs font-medium mb-2 tracking-wide">Email</label>
          <input name="email" type="email" required placeholder="ton@email.com" className={inputClass} />
        </div>
      </div>

      <div className="mb-4">
        <label className="block text-white/50 text-xs font-medium mb-2 tracking-wide">Objet</label>
        <select name="subject" defaultValue="Un projet" className={`${inputClass} appearance-none cursor-pointer`}>
          {SUBJECTS.map((s) => (
            <option key={s} value={s} className="bg-[#0a0f1e] text-white">{s}</option>
          ))}
        </select>
      </div>

      <div className="mb-6">
        <label className="block text-white/50 text-xs font-medium mb-2 tracking-wide">Message</label>
        <textarea name="message" required rows={5} placeholder="Dis-moi tout…"
                  className={`${inputClass} resize-y min-h-[120px]`} />
      </div>

      {status === 'error' && (
        <p className="text-red-400 text-sm mb-4 text-center">{error}</p>
      )}

      <button type="submit" disabled={sending}
              className="btn-primary w-full justify-center py-4 text-base disabled:opacity-60 disabled:cursor-not-allowed">
        {sending ? 'Envoi en cours…' : 'Envoyer le message'}
        {!sending && (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="m22 2-7 20-4-9-9-4Z" /><path d="M22 2 11 13" />
          </svg>
        )}
      </button>
    </form>
  )
}
