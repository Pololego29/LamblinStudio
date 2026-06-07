import { SITE } from '../data/site'
import Reveal from './Reveal'

const REASONS = [
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
    title: 'Partenariat',
    desc: "Envie de collaborer, de s'associer ou de construire quelque chose ensemble.",
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
        <path d="M2 3h20v14H6l-4 4V3z" />
      </svg>
    ),
    title: 'Un projet',
    desc: 'Un site, une application web ou iOS à concevoir et mettre en ligne.',
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
        <circle cx="12" cy="12" r="10" /><path d="M9.1 9a3 3 0 0 1 5.8 1c0 2-3 3-3 3" /><line x1="12" y1="17" x2="12" y2="17" />
      </svg>
    ),
    title: 'Une question',
    desc: 'Un renseignement, un conseil, ou simplement discuter — écris-moi.',
  },
]

const SOCIALS = [
  {
    label: 'GitHub',
    href: SITE.github,
    color: '#94a3b8',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
        <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
      </svg>
    ),
  },
  {
    label: 'LinkedIn',
    href: SITE.linkedin,
    color: '#60a5fa',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
        <rect x="2" y="9" width="4" height="12" /><circle cx="4" cy="4" r="2" />
      </svg>
    ),
  },
  {
    label: 'Email',
    href: `mailto:${SITE.email}`,
    color: '#34d399',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
        <polyline points="22,6 12,13 2,6" />
      </svg>
    ),
  },
]

export default function ContactSection() {
  return (
    <section id="contact" className="py-28 px-6 relative overflow-hidden">
      {/* Background */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(rgba(96,165,250,1) 1px, transparent 1px), linear-gradient(90deg, rgba(96,165,250,1) 1px, transparent 1px)',
          backgroundSize: '80px 80px',
        }}
      />
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] rounded-full opacity-[0.06] blur-3xl pointer-events-none"
        style={{ background: 'radial-gradient(ellipse, #3b82f6, transparent)' }}
      />

      <div className="max-w-5xl mx-auto relative z-10 text-center">
        <Reveal>
          <div className="section-tag mb-6 mx-auto w-fit">Contact</div>

          <h2
            className="font-black text-white tracking-tight mb-5 leading-tight"
            style={{ fontSize: 'clamp(2.2rem, 6vw, 4.5rem)' }}
          >
            Me <span className="text-gradient">contacter.</span>
          </h2>

          <p className="text-white/45 max-w-lg mx-auto leading-relaxed">
            Une raison de m'écrire ? En voici quelques-unes — la boîte mail est
            toujours ouverte.
          </p>
        </Reveal>

        {/* Why contact me */}
        <div className="grid sm:grid-cols-3 gap-4 mt-14 mb-14 text-left">
          {REASONS.map((r, i) => (
            <Reveal
              key={r.title}
              delay={i * 110}
              className="glass rounded-2xl p-6 hover:bg-white/[0.06] hover:-translate-y-1 transition-all duration-300"
            >
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center mb-4"
                style={{
                  background: 'linear-gradient(135deg, rgba(59,130,246,0.2), rgba(99,102,241,0.2))',
                  border: '1px solid rgba(96,165,250,0.2)',
                  color: '#60a5fa',
                }}
              >
                {r.icon}
              </div>
              <h3 className="text-white font-semibold mb-1.5">{r.title}</h3>
              <p className="text-white/40 text-sm leading-relaxed">{r.desc}</p>
            </Reveal>
          ))}
        </div>

        {/* Email CTA */}
        <a
          href={`mailto:${SITE.email}`}
          className="btn-primary mx-auto mb-12 inline-flex"
          style={{ fontSize: '1.05rem', padding: '1.1rem 2.4rem' }}
        >
          {SITE.email}
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
            <polyline points="22,6 12,13 2,6" />
          </svg>
        </a>

        {/* Divider */}
        <div className="flex items-center gap-4 mb-8 max-w-md mx-auto">
          <div className="h-px flex-1" style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.08))' }} />
          <span className="text-white/20 text-xs tracking-widest uppercase">Retrouvez-moi</span>
          <div className="h-px flex-1" style={{ background: 'linear-gradient(90deg, rgba(255,255,255,0.08), transparent)' }} />
        </div>

        {/* Socials */}
        <div className="flex items-center justify-center gap-4">
          {SOCIALS.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target={s.href.startsWith('http') ? '_blank' : undefined}
              rel="noopener noreferrer"
              aria-label={s.label}
              className="w-12 h-12 rounded-xl flex items-center justify-center glass hover:bg-white/[0.08] transition-all duration-300 hover:scale-110"
              style={{ color: s.color }}
            >
              {s.icon}
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
