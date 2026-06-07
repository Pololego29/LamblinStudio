import { useState } from 'react'
import { SITE } from '../data/site'

const GithubIcon = (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
  </svg>
)

const LinkedinIcon = (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" /><circle cx="4" cy="4" r="2" />
  </svg>
)

const STACK = ['Web', 'Applications web', 'iOS', 'DevOps']

export default function AboutSection() {
  const [imgError, setImgError] = useState(false)

  return (
    <section id="about" className="py-28 px-6 relative overflow-hidden">
      {/* Background accent */}
      <div
        className="absolute top-1/4 right-0 w-[600px] h-[400px] rounded-full opacity-[0.05] blur-3xl pointer-events-none"
        style={{ background: 'radial-gradient(ellipse, #6366f1, transparent)' }}
      />

      <div className="max-w-5xl mx-auto relative z-10">
        <div className="grid md:grid-cols-[300px_1fr] gap-12 md:gap-16 items-center">
          {/* Photo */}
          <div className="mx-auto md:mx-0">
            <div className="relative w-56 h-56 md:w-[300px] md:h-[300px]">
              {/* Glow ring */}
              <div
                className="absolute -inset-3 rounded-full opacity-50 blur-2xl"
                style={{ background: 'radial-gradient(circle, rgba(96,165,250,0.35), transparent 70%)' }}
              />
              <div
                className="relative w-full h-full rounded-full overflow-hidden"
                style={{ border: '1px solid rgba(255,255,255,0.12)' }}
              >
                {imgError ? (
                  // Visuel de secours si la photo n'est pas encore déposée
                  <img
                    src="/brand/logo-web.png"
                    alt="Paul Lamblin"
                    className="w-full h-full object-contain p-6 bg-white/[0.03] select-none"
                    draggable={false}
                  />
                ) : (
                  <img
                    src={SITE.photo}
                    alt="Paul Lamblin"
                    className="w-full h-full object-cover select-none"
                    draggable={false}
                    onError={() => setImgError(true)}
                  />
                )}
              </div>
            </div>
          </div>

          {/* Text */}
          <div>
            <div className="section-tag mb-5">À propos</div>

            <h2
              className="font-black text-white tracking-tight leading-tight mb-2"
              style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}
            >
              Paul Lamblin
            </h2>
            <p className="text-gradient-blue font-semibold mb-6">
              Développeur &amp; DevOps · fondateur de Lamblin Studio
            </p>

            <p className="text-white/55 leading-relaxed mb-4" style={{ fontSize: '1.05rem' }}>
              Je conçois et développe des produits numériques de bout en bout —
              sites web, applications web et applications iOS — avec une approche
              DevOps, du premier commit jusqu'à la mise en production.
            </p>
            <p className="text-white/40 leading-relaxed text-sm mb-8">
              Sous le nom de Lamblin Studio, je transforme des idées en produits
              concrets, soignés et fiables. Curieux et autonome, j'aime maîtriser
              toute la chaîne : design, code, déploiement et infrastructure.
            </p>

            {/* Stack */}
            <div className="flex flex-wrap gap-2 mb-8">
              {STACK.map((s) => (
                <span
                  key={s}
                  className="px-3.5 py-1.5 rounded-full text-xs font-semibold text-white/70"
                  style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}
                >
                  {s}
                </span>
              ))}
            </div>

            {/* Socials */}
            <div className="flex flex-wrap gap-3">
              <a
                href={SITE.github}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary px-5 py-3 text-sm"
              >
                {GithubIcon}
                GitHub
              </a>
              <a
                href={SITE.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary px-5 py-3 text-sm"
              >
                {LinkedinIcon}
                LinkedIn
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
