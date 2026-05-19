const SOCIAL_LINKS = [
  {
    label: 'Portfolio',
    href: 'https://paul-lamblin.com',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/>
        <path d="M2 12h20"/>
      </svg>
    ),
    color: '#60a5fa',
  },
  {
    label: 'GitHub',
    href: 'https://github.com/Pololego29',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/>
      </svg>
    ),
    color: '#94a3b8',
  },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/paul-lamblin',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
        <rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/>
      </svg>
    ),
    color: '#60a5fa',
  },
  {
    label: 'Email',
    href: 'mailto:contact@lamblinstudio.fr',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
        <polyline points="22,6 12,13 2,6"/>
      </svg>
    ),
    color: '#34d399',
  },
]

export default function ContactSection() {
  return (
    <section id="contact" className="py-32 px-6 relative overflow-hidden">
      {/* Background */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(rgba(96,165,250,1) 1px, transparent 1px), linear-gradient(90deg, rgba(96,165,250,1) 1px, transparent 1px)`,
          backgroundSize: '80px 80px',
        }}
      />
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] rounded-full opacity-[0.06] blur-3xl"
        style={{ background: 'radial-gradient(ellipse, #3b82f6, transparent)' }}
      />

      <div className="max-w-4xl mx-auto relative z-10 text-center">
        <div className="section-tag mb-6 mx-auto w-fit">Contact</div>

        <h2
          className="font-black text-white tracking-tight mb-6 leading-tight"
          style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)' }}
        >
          Un projet en tête ?
          <br />
          <span className="text-gradient">Parlons-en.</span>
        </h2>

        <p className="text-white/45 max-w-lg mx-auto mb-12 leading-relaxed">
          Vous avez un projet, une idée, ou vous voulez juste discuter de possibilités ?
          Je suis disponible pour construire quelque chose d'ambitieux ensemble.
        </p>

        {/* CTA email */}
        <a
          href="mailto:contact@lamblinstudio.fr"
          className="btn-primary text-lg px-10 py-5 mx-auto mb-16 inline-flex"
          style={{ fontSize: '1.05rem' }}
        >
          contact@lamblinstudio.fr
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
            <polyline points="22,6 12,13 2,6"/>
          </svg>
        </a>

        {/* Divider */}
        <div className="flex items-center gap-4 mb-12">
          <div className="h-px flex-1" style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.08))' }} />
          <span className="text-white/20 text-xs tracking-widest uppercase">Retrouvez-moi sur</span>
          <div className="h-px flex-1" style={{ background: 'linear-gradient(90deg, rgba(255,255,255,0.08), transparent)' }} />
        </div>

        {/* Social grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {SOCIAL_LINKS.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target={s.href.startsWith('http') ? '_blank' : undefined}
              rel="noopener noreferrer"
              className="glass rounded-2xl p-5 flex flex-col items-center gap-3 group hover:bg-white/[0.07] transition-all duration-300"
            >
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 group-hover:scale-110"
                style={{
                  background: `${s.color}15`,
                  border: `1px solid ${s.color}25`,
                  color: s.color,
                }}
              >
                {s.icon}
              </div>
              <span className="text-white/60 text-sm font-medium group-hover:text-white transition-colors">{s.label}</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
