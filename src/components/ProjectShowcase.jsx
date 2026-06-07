import { useState } from 'react'
import { PROJECTS } from '../data/site'

function ProjectCard({ project }) {
  const [hovered, setHovered] = useState(false)

  return (
    <a
      href={project.url}
      target="_blank"
      rel="noopener noreferrer"
      className="relative rounded-3xl overflow-hidden group flex flex-col"
      style={{ minHeight: '420px' }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Background gradient */}
      <div
        className="absolute inset-0 transition-transform duration-700 ease-out"
        style={{ background: project.bg, transform: hovered ? 'scale(1.04)' : 'scale(1)' }}
      />

      {/* Base surface */}
      <div className="absolute inset-0 glass" style={{ background: 'rgba(255,255,255,0.025)' }} />

      {/* Border */}
      <div
        className="absolute inset-0 rounded-3xl transition-opacity duration-300 pointer-events-none"
        style={{ border: `1px solid ${project.accent}`, opacity: hovered ? 0.4 : 0.12 }}
      />

      {/* Glow on hover */}
      <div
        className="absolute inset-0 transition-opacity duration-500 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse at 50% 100%, ${project.glow} 0%, transparent 65%)`,
          opacity: hovered ? 1 : 0,
        }}
      />

      {/* Content */}
      <div className="relative z-10 flex flex-col h-full p-9">
        {/* Top row : icon + status */}
        <div className="flex items-start justify-between mb-auto">
          <div
            className="text-5xl transition-all duration-500"
            style={{
              transform: hovered ? 'scale(1.1) rotate(-4deg)' : 'scale(1)',
              filter: hovered ? `drop-shadow(0 0 24px ${project.accent})` : 'none',
            }}
          >
            {project.icon}
          </div>
          <span className="flex items-center gap-1.5 text-xs font-semibold tracking-widest uppercase text-emerald-400">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            En ligne
          </span>
        </div>

        {/* Bottom block */}
        <div className="mt-8">
          <div
            className="text-xs font-bold tracking-widest uppercase mb-2"
            style={{ color: project.accent }}
          >
            {project.tagline}
          </div>

          <h3 className="text-4xl font-black text-white tracking-tight mb-3">
            {project.title}
          </h3>

          <p className="text-white/55 text-sm leading-relaxed mb-5 max-w-md">
            {project.description}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-6">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 rounded-full text-xs font-semibold"
                style={{
                  background: 'rgba(255,255,255,0.06)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  color: 'rgba(255,255,255,0.7)',
                }}
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Visit link */}
          <div
            className="inline-flex items-center gap-2 text-sm font-bold transition-all duration-300"
            style={{
              color: project.accent,
              transform: hovered ? 'translateX(4px)' : 'translateX(0)',
            }}
          >
            Visiter le site
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M7 17 17 7M9 7h8v8" />
            </svg>
          </div>
        </div>
      </div>
    </a>
  )
}

export default function ProjectShowcase() {
  return (
    <section id="projects" className="py-28 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-14 text-center">
          <div className="section-tag mb-4 mx-auto w-fit">Projets</div>
          <h2
            className="font-black text-white tracking-tight leading-none"
            style={{ fontSize: 'clamp(2.4rem, 5vw, 4rem)' }}
          >
            Mes deux <span className="text-gradient">projets.</span>
          </h2>
        </div>

        {/* Two cards — one project per div */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {PROJECTS.map((p) => (
            <ProjectCard key={p.id} project={p} />
          ))}
        </div>
      </div>
    </section>
  )
}
