import { useState } from 'react'

const PROJECTS = [
  {
    id: 'ekip-game',
    title: 'Ekip Game',
    tagline: 'Gaming Hub Platform',
    description:
      'Un hub moderne de jeux en ligne, pensé comme une plateforme évolutive avec plusieurs expériences de jeu, un système de profil et une interface premium.',
    tags: ['Web App', 'Gaming', 'React', 'Supabase'],
    gradient: 'from-blue-600/80 via-cyan-600/40 to-transparent',
    accentColor: '#06b6d4',
    glowColor: 'rgba(6,182,212,0.3)',
    bgPattern: `radial-gradient(ellipse at 30% 50%, rgba(6,182,212,0.25) 0%, rgba(59,130,246,0.15) 40%, rgba(3,7,18,0.9) 100%)`,
    icon: '🎮',
    status: 'En développement',
    statusColor: 'text-cyan-400',
  },
  {
    id: 'verdict',
    title: 'Verdict',
    tagline: 'Immersive Legal Roleplay',
    description:
      'Une application web immersive autour de procès en ligne. Créez des parties, incarnez des rôles, participez à des débats et vivez des procès interactifs.',
    tags: ['Web App', 'Roleplay', 'React', 'Real-time'],
    gradient: 'from-violet-600/80 via-purple-600/40 to-transparent',
    accentColor: '#8b5cf6',
    glowColor: 'rgba(139,92,246,0.3)',
    bgPattern: `radial-gradient(ellipse at 70% 50%, rgba(139,92,246,0.25) 0%, rgba(99,102,241,0.15) 40%, rgba(3,7,18,0.9) 100%)`,
    icon: '⚖️',
    status: 'En développement',
    statusColor: 'text-violet-400',
  },
]

function ProjectCard({ project, index }) {
  const [hovered, setHovered] = useState(false)

  return (
    <div
      className="relative rounded-3xl overflow-hidden cursor-pointer group"
      style={{ minHeight: '580px', animationDelay: `${index * 0.15}s` }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Background */}
      <div
        className="absolute inset-0 transition-transform duration-700 ease-out"
        style={{
          background: project.bgPattern,
          transform: hovered ? 'scale(1.05)' : 'scale(1)',
        }}
      />

      {/* Grid lines on bg */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
        }}
      />

      {/* Glow effect on hover */}
      <div
        className="absolute inset-0 transition-opacity duration-500"
        style={{
          background: `radial-gradient(ellipse at 50% 100%, ${project.glowColor} 0%, transparent 60%)`,
          opacity: hovered ? 1 : 0,
        }}
      />

      {/* Border */}
      <div
        className="absolute inset-0 rounded-3xl transition-opacity duration-300"
        style={{
          border: `1px solid ${project.accentColor}`,
          opacity: hovered ? 0.35 : 0.1,
        }}
      />

      {/* Floating icon */}
      <div
        className="absolute top-8 right-8 text-6xl transition-all duration-500"
        style={{
          transform: hovered ? 'scale(1.2) rotate(-5deg)' : 'scale(1) rotate(0deg)',
          filter: hovered ? `drop-shadow(0 0 30px ${project.accentColor})` : 'none',
        }}
      >
        {project.icon}
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col justify-end p-10">
        {/* Status badge */}
        <div
          className="mb-4 inline-flex items-center gap-2 transition-all duration-300"
          style={{ transform: hovered ? 'translateY(-4px)' : 'translateY(0)' }}
        >
          <span
            className={`flex items-center gap-1.5 text-xs font-semibold tracking-widest uppercase ${project.statusColor}`}
          >
            <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: project.accentColor }} />
            {project.status}
          </span>
        </div>

        {/* Tagline */}
        <div
          className="text-xs font-bold tracking-widest uppercase mb-3 transition-all duration-300"
          style={{
            color: project.accentColor,
            transform: hovered ? 'translateY(-4px)' : 'translateY(0)',
            transitionDelay: '30ms',
          }}
        >
          {project.tagline}
        </div>

        {/* Title */}
        <h3
          className="text-5xl font-black text-white tracking-tight mb-4 transition-all duration-300"
          style={{
            transform: hovered ? 'translateY(-6px)' : 'translateY(0)',
            transitionDelay: '50ms',
          }}
        >
          {project.title}
        </h3>

        {/* Description — revealed on hover */}
        <p
          className="text-white/60 text-sm leading-relaxed mb-6 max-w-sm transition-all duration-500"
          style={{
            opacity: hovered ? 1 : 0,
            transform: hovered ? 'translateY(0)' : 'translateY(10px)',
            transitionDelay: '70ms',
          }}
        >
          {project.description}
        </p>

        {/* Tags */}
        <div
          className="flex flex-wrap gap-2 mb-6 transition-all duration-300"
          style={{
            transform: hovered ? 'translateY(-4px)' : 'translateY(0)',
            transitionDelay: '80ms',
          }}
        >
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 rounded-full text-xs font-semibold"
              style={{
                background: `rgba(255,255,255,0.06)`,
                border: `1px solid rgba(255,255,255,0.1)`,
                color: 'rgba(255,255,255,0.7)',
              }}
            >
              {tag}
            </span>
          ))}
        </div>

        {/* CTA */}
        <div
          className="transition-all duration-500"
          style={{
            opacity: hovered ? 1 : 0,
            transform: hovered ? 'translateY(0)' : 'translateY(12px)',
            transitionDelay: '100ms',
          }}
        >
          <button
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-bold transition-all duration-200"
            style={{
              background: `linear-gradient(135deg, ${project.accentColor}, ${project.accentColor}aa)`,
              color: 'white',
              boxShadow: `0 0 30px ${project.glowColor}`,
            }}
          >
            Découvrir le projet
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </button>
        </div>
      </div>
    </div>
  )
}

function ComingSoonCard() {
  return (
    <div
      className="relative rounded-3xl overflow-hidden col-span-full lg:col-span-1"
      style={{ minHeight: '200px' }}
    >
      <div className="absolute inset-0 glass" />
      <div
        className="absolute inset-0 rounded-3xl"
        style={{ border: '1px dashed rgba(255,255,255,0.1)' }}
      />
      <div className="relative z-10 h-full flex flex-col items-center justify-center gap-3 p-8 text-center">
        <div className="w-10 h-10 rounded-full flex items-center justify-center glass">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5">
            <path d="M12 5v14M5 12h14"/>
          </svg>
        </div>
        <p className="text-white/25 text-sm font-semibold tracking-widest uppercase">Prochain projet</p>
        <p className="text-white/15 text-xs">Something's brewing...</p>
      </div>
    </div>
  )
}

export default function ProjectShowcase() {
  return (
    <section id="projects" className="py-32 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="section-tag mb-4">Projets</div>
            <h2
              className="font-black text-white tracking-tight leading-none"
              style={{ fontSize: 'clamp(2.5rem, 5vw, 4.5rem)' }}
            >
              Ce qu'on construit.
            </h2>
          </div>
          <p className="text-white/40 text-sm max-w-xs leading-relaxed">
            Des projets ambitieux, des expériences pensées pour l'utilisateur, et des interfaces qui marquent.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          {PROJECTS.map((p, i) => (
            <ProjectCard key={p.id} project={p} index={i} />
          ))}
          <ComingSoonCard />
        </div>
      </div>
    </section>
  )
}
