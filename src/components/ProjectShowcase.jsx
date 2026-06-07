import { useState } from 'react'
import { PROJECTS } from '../data/site'
import Reveal from './Reveal'
import EkipGameHero from './EkipGameHero'

/** Petits éléments réutilisés par les deux mises en page. */
function ProjectMeta({ project, index }) {
  return (
    <>
      <div className="flex items-center gap-3 mb-4">
        <span className="font-mono text-sm font-bold" style={{ color: project.accent }}>
          0{index + 1}
        </span>
        <span className="flex items-center gap-1.5 text-xs font-semibold tracking-widest uppercase text-emerald-400">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          En ligne
        </span>
      </div>
      <div className="text-xs font-bold tracking-widest uppercase mb-2" style={{ color: project.accent }}>
        {project.tagline}
      </div>
    </>
  )
}

function ProjectTags({ tags }) {
  return (
    <div className="flex flex-wrap gap-2 mb-7">
      {tags.map((tag) => (
        <span
          key={tag}
          className="px-3 py-1 rounded-full text-xs font-semibold text-white/75"
          style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.14)' }}
        >
          {tag}
        </span>
      ))}
    </div>
  )
}

function readableText(hex) {
  const c = hex.replace('#', '')
  const r = parseInt(c.slice(0, 2), 16)
  const g = parseInt(c.slice(2, 4), 16)
  const b = parseInt(c.slice(4, 6), 16)
  const lum = 0.299 * r + 0.587 * g + 0.114 * b
  return lum > 145 ? '#06121a' : '#ffffff'
}

function VisitButton({ project }) {
  return (
    <span
      className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full text-sm font-bold transition-all duration-300 group-hover:-translate-y-0.5"
      style={{
        background: `linear-gradient(135deg, ${project.accent}, ${project.accent}bb)`,
        color: readableText(project.accent),
        boxShadow: `0 10px 30px -10px ${project.glow}`,
      }}
    >
      Visiter le site
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
        <path d="M7 17 17 7M9 7h8v8" />
      </svg>
    </span>
  )
}

/** Bandeau pleine largeur (full-bleed) avec image de couverture. */
function ProjectBanner({ project, index }) {
  return (
    <Reveal>
      <a
        href={project.url}
        target="_blank"
        rel="noopener noreferrer"
        className="group relative block w-full overflow-hidden"
      >
        {/* Image de fond */}
        <div
          className="absolute inset-0 bg-cover bg-center transition-transform duration-[1200ms] ease-out group-hover:scale-[1.04]"
          style={{ backgroundImage: `url(${project.cover})` }}
        />
        {/* Dégradé gauche → lisibilité du texte */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(90deg, rgba(3,7,18,0.94) 0%, rgba(3,7,18,0.7) 42%, rgba(3,7,18,0.25) 72%, rgba(3,7,18,0.1) 100%)',
          }}
        />
        {/* Fondu haut/bas → intégration dans la page */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'linear-gradient(180deg, #030712 0%, transparent 14%, transparent 86%, #030712 100%)',
          }}
        />

        {/* Contenu */}
        <div className="relative z-10 max-w-6xl mx-auto px-6 min-h-[62vh] md:min-h-[68vh] flex flex-col justify-center py-20">
          <div className="max-w-xl">
            <ProjectMeta project={project} index={index} />
            <h3
              className="font-black text-white tracking-tight mb-4 leading-none"
              style={{ fontSize: 'clamp(2.8rem, 7vw, 5rem)', textShadow: '0 4px 30px rgba(0,0,0,0.5)' }}
            >
              {project.title}
            </h3>
            <p className="text-white/70 leading-relaxed mb-6 max-w-md" style={{ fontSize: '1.05rem' }}>
              {project.description}
            </p>
            <ProjectTags tags={project.tags} />
            <VisitButton project={project} />
          </div>
        </div>
      </a>
    </Reveal>
  )
}

/** Aperçu "fenêtre de navigateur" (cliquable vers le site). */
function BrowserPreview({ project }) {
  const [hovered, setHovered] = useState(false)
  const host = project.url.replace(/^https?:\/\//, '').replace(/\/$/, '')

  return (
    <a
      href={project.url}
      target="_blank"
      rel="noopener noreferrer"
      className="block rounded-2xl overflow-hidden group"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        border: `1px solid ${hovered ? project.accent : 'rgba(255,255,255,0.12)'}`,
        boxShadow: hovered ? `0 30px 80px -30px ${project.glow}` : '0 20px 60px -30px rgba(0,0,0,0.6)',
        transform: hovered ? 'translateY(-4px)' : 'translateY(0)',
        transition: 'all 0.4s cubic-bezier(0.16,1,0.3,1)',
      }}
    >
      <div className="flex items-center gap-2 px-4 py-3 bg-white/[0.04] border-b border-white/[0.06]">
        <span className="w-3 h-3 rounded-full bg-[#ff5f57]" />
        <span className="w-3 h-3 rounded-full bg-[#febc2e]" />
        <span className="w-3 h-3 rounded-full bg-[#28c840]" />
        <div className="ml-3 flex-1 truncate rounded-md bg-white/[0.06] px-3 py-1 text-xs text-white/40">
          {host}
        </div>
      </div>
      <div
        className="relative h-64 sm:h-72 flex items-center justify-center overflow-hidden"
        style={{ background: project.bg }}
      >
        <div
          className="absolute inset-0 opacity-[0.05]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)',
            backgroundSize: '40px 40px',
          }}
        />
        <div
          className="text-7xl sm:text-8xl transition-transform duration-500"
          style={{
            transform: hovered ? 'scale(1.12) rotate(-4deg)' : 'scale(1)',
            filter: hovered ? `drop-shadow(0 0 30px ${project.accent})` : 'none',
          }}
        >
          {project.icon}
        </div>
        <span className="absolute bottom-4 right-5 font-black tracking-tight text-white/10" style={{ fontSize: '2.5rem' }}>
          {project.title}
        </span>
      </div>
    </a>
  )
}

/** Ligne classique (aperçu + texte) pour les projets sans image de couverture. */
function ProjectRow({ project, index }) {
  const reversed = index % 2 === 1
  return (
    <Reveal className="max-w-6xl mx-auto px-6 w-full grid md:grid-cols-2 gap-10 lg:gap-16 items-center">
      <div className={reversed ? 'md:order-2' : 'md:order-1'}>
        <BrowserPreview project={project} />
      </div>
      <div className={`group ${reversed ? 'md:order-1' : 'md:order-2'}`}>
        <ProjectMeta project={project} index={index} />
        <h3 className="text-4xl sm:text-5xl font-black text-white tracking-tight mb-4">{project.title}</h3>
        <p className="text-white/55 leading-relaxed mb-6 max-w-md" style={{ fontSize: '1.02rem' }}>
          {project.description}
        </p>
        <ProjectTags tags={project.tags} />
        <a href={project.url} target="_blank" rel="noopener noreferrer" className="group inline-block">
          <VisitButton project={project} />
        </a>
      </div>
    </Reveal>
  )
}

export default function ProjectShowcase() {
  return (
    <section id="projects" className="py-28">
      {/* Header */}
      <Reveal className="mb-20 text-center px-6">
        <div className="section-tag mb-4 mx-auto w-fit">Projets</div>
        <h2
          className="font-black text-white tracking-tight leading-none"
          style={{ fontSize: 'clamp(2.4rem, 5vw, 4rem)' }}
        >
          Mes <span className="text-gradient">projets.</span>
        </h2>
      </Reveal>

      {/* Une div séparée par site */}
      <div className="flex flex-col gap-24">
        {PROJECTS.map((p, i) =>
          p.id === 'ekip-game' ? (
            <Reveal key={p.id}>
              <EkipGameHero project={p} index={i} />
            </Reveal>
          ) : p.cover ? (
            <ProjectBanner key={p.id} project={p} index={i} />
          ) : (
            <ProjectRow key={p.id} project={p} index={i} />
          )
        )}
      </div>
    </section>
  )
}
