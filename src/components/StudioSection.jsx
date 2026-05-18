const PILLARS = [
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
      </svg>
    ),
    title: 'Design moderne',
    desc: 'Interfaces pensées avec soin, visuellement cohérentes et mémorables.',
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/>
      </svg>
    ),
    title: 'Développement web',
    desc: 'Code propre, maintenable, et performant sur tous les environnements.',
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/>
      </svg>
    ),
    title: 'Apps interactives',
    desc: 'De la simple vitrine à la plateforme complexe, en passant par le jeu.',
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/>
        <path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
      </svg>
    ),
    title: 'Expérience utilisateur',
    desc: 'Chaque interaction est pensée pour être fluide, intuitive et agréable.',
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="12" cy="12" r="10"/><path d="M12 8v4l3 3"/>
      </svg>
    ),
    title: 'Identité digitale',
    desc: 'Brand, couleurs, typographie — une identité forte et cohérente.',
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
      </svg>
    ),
    title: 'Déploiement & mise en ligne',
    desc: 'Hébergement, domaine, CI/CD — du code au produit en production.',
  },
]

export default function StudioSection() {
  return (
    <section id="studio" className="py-32 px-6 relative overflow-hidden">
      {/* Background accent */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[500px] rounded-full opacity-[0.04] blur-3xl pointer-events-none"
        style={{ background: 'radial-gradient(ellipse, #6366f1, transparent)' }}
      />

      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          {/* Left: text */}
          <div>
            <div className="section-tag mb-6">Le Studio</div>
            <h2
              className="font-black text-white tracking-tight leading-[1.05] mb-8"
              style={{ fontSize: 'clamp(2.2rem, 4vw, 3.8rem)' }}
            >
              Un studio digital
              <br />
              <span className="text-gradient">focalisé sur l'impact.</span>
            </h2>
            <p className="text-white/50 leading-relaxed mb-6" style={{ fontSize: '1.05rem' }}>
              Lamblin Studio accompagne la création de projets digitaux modernes, de la simple vitrine web
              à l'application interactive. Chaque projet est pensé avec une attention particulière portée
              au design, à l'expérience utilisateur, à la performance et à l'évolutivité.
            </p>
            <p className="text-white/35 leading-relaxed text-sm">
              Indépendant et passionné, Lamblin Studio est là pour transformer vos idées en produits
              numériques qui marquent les esprits — et qui fonctionnent.
            </p>

            {/* Accent line */}
            <div className="mt-10 flex items-center gap-4">
              <div className="h-px flex-1 max-w-16" style={{ background: 'linear-gradient(90deg, #3b82f6, transparent)' }} />
              <span className="text-white/20 text-xs tracking-widest uppercase">Lamblin Studio — 2026</span>
            </div>
          </div>

          {/* Right: pillars grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {PILLARS.map((p, i) => (
              <div
                key={i}
                className="glass rounded-2xl p-5 group hover:bg-white/[0.06] transition-all duration-300 cursor-default"
                style={{ animationDelay: `${i * 0.08}s` }}
              >
                <div
                  className="w-9 h-9 rounded-xl flex items-center justify-center mb-3 transition-all duration-300 group-hover:scale-110"
                  style={{
                    background: 'linear-gradient(135deg, rgba(59,130,246,0.2), rgba(99,102,241,0.2))',
                    border: '1px solid rgba(96,165,250,0.2)',
                    color: '#60a5fa',
                  }}
                >
                  {p.icon}
                </div>
                <h4 className="text-white font-semibold text-sm mb-1.5">{p.title}</h4>
                <p className="text-white/40 text-xs leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
