const SERVICES = [
  {
    number: '01',
    title: 'Site vitrine',
    desc: 'Une présence en ligne élégante et performante qui représente votre identité.',
    tags: ['HTML/CSS', 'React', 'Tailwind'],
    color: '#60a5fa',
  },
  {
    number: '02',
    title: 'Application web',
    desc: 'Des plateformes et apps complexes, pensées pour scaler et séduire.',
    tags: ['React', 'Node.js', 'Supabase'],
    color: '#06b6d4',
  },
  {
    number: '03',
    title: 'UI/UX Design',
    desc: 'Maquettes, prototypes et systèmes de design pour des interfaces mémorables.',
    tags: ['Figma', 'Design System', 'Motion'],
    color: '#8b5cf6',
  },
  {
    number: '04',
    title: 'Branding digital',
    desc: 'Logo, couleurs, typographie — une identité forte et cohérente sur tous les supports.',
    tags: ['Logo', 'Brand Kit', 'Identité'],
    color: '#a78bfa',
  },
  {
    number: '05',
    title: 'Intégration front-end',
    desc: 'Intégration pixel-perfect de maquettes en code propre et responsive.',
    tags: ['React', 'GSAP', 'Animations'],
    color: '#34d399',
  },
  {
    number: '06',
    title: 'Déploiement web',
    desc: 'Mise en ligne, nom de domaine, hébergement et optimisation SEO technique.',
    tags: ['Vercel', 'Cloudflare', 'CI/CD'],
    color: '#fbbf24',
  },
]

export default function ServicesSection() {
  return (
    <section id="services" className="py-32 px-6 relative">
      {/* Divider accent */}
      <div className="absolute top-0 left-6 right-6 max-w-7xl mx-auto h-px"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.06), transparent)' }}
      />

      <div className="max-w-7xl mx-auto">
        <div className="mb-16">
          <div className="section-tag mb-4">Services</div>
          <h2
            className="font-black text-white tracking-tight"
            style={{ fontSize: 'clamp(2.5rem, 5vw, 4.5rem)' }}
          >
            Ce que je fais.
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {SERVICES.map((s, i) => (
            <div
              key={s.number}
              className="glass rounded-2xl p-7 group hover:bg-white/[0.05] transition-all duration-300 cursor-default relative overflow-hidden"
            >
              {/* Number watermark */}
              <div
                className="absolute -top-2 -right-1 text-7xl font-black opacity-[0.04] select-none transition-opacity duration-300 group-hover:opacity-[0.07]"
                style={{ color: s.color }}
              >
                {s.number}
              </div>

              {/* Color dot */}
              <div
                className="w-2.5 h-2.5 rounded-full mb-5 transition-transform duration-300 group-hover:scale-110"
                style={{ backgroundColor: s.color, boxShadow: `0 0 12px ${s.color}88` }}
              />

              <h3 className="text-white font-bold text-lg mb-3 tracking-tight">{s.title}</h3>
              <p className="text-white/45 text-sm leading-relaxed mb-5">{s.desc}</p>

              <div className="flex flex-wrap gap-2">
                {s.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2.5 py-1 rounded-lg text-xs font-medium"
                    style={{
                      background: `${s.color}12`,
                      border: `1px solid ${s.color}25`,
                      color: `${s.color}`,
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
