import { CONTACT, SITE } from '../data/site'
import ContactForm from './ContactForm'

const CHANNELS = [
  { label: 'Email', value: SITE.email, href: `mailto:${SITE.email}` },
  { label: 'GitHub', value: 'github.com/Pololego29', href: SITE.github, external: true },
  { label: 'LinkedIn', value: 'linkedin.com/in/paul-lamblin', href: SITE.linkedin, external: true },
]

export default function ContactSection() {
  return (
    <section id="contact" aria-labelledby="contact-title" className="border-t border-line bg-ink-900 py-20 sm:py-28">
      <div className="container-page grid gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
        <div>
          <h2 id="contact-title" className="text-[clamp(2.8rem,8vw,5rem)] uppercase text-bone">
            {CONTACT.title}
          </h2>
          <p className="mt-6 max-w-md text-[1.075rem] leading-relaxed text-bone/90">{CONTACT.intro}</p>

          <ul className="mt-10 border-t border-line">
            {CHANNELS.map((c) => (
              <li key={c.label}>
                <a
                  href={c.href}
                  {...(c.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                  className="group flex items-center justify-between gap-4 border-b border-line py-4"
                >
                  <span className="min-w-0">
                    <span className="block text-sm text-muted">{c.label}</span>
                    <span className="block break-words font-mono text-[0.95rem] text-bone group-hover:text-gold-bright">
                      {c.value}
                    </span>
                  </span>
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    className="shrink-0 text-muted transition-transform group-hover:translate-x-1 group-hover:text-gold"
                    aria-hidden="true"
                  >
                    {c.external ? <path d="M7 17 17 7M8 7h9v9" /> : <path d="M5 12h14M13 6l6 6-6 6" />}
                  </svg>
                  {c.external && <span className="sr-only">(nouvel onglet)</span>}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <ContactForm />
      </div>
    </section>
  )
}
