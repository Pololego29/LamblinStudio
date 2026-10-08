import { HERO, SEVEN_FRONTS } from '../data/site'
import CoinStage from './CoinStage'

export default function Hero() {
  return (
    <section id="top" aria-labelledby="hero-title" className="relative overflow-hidden">
      {/* Trame de carte + halo chaud derrière la pièce */}
      <div className="bg-grid pointer-events-none absolute inset-0" aria-hidden="true" />
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden="true"
        style={{
          background:
            'radial-gradient(42rem 32rem at 72% 46%, rgba(201,165,90,0.13), transparent 70%), linear-gradient(to bottom, transparent 70%, #0b0f10)',
        }}
      />

      <div className="container-page relative grid items-center gap-10 pb-14 pt-[calc(var(--header-h)+2.5rem)] lg:min-h-[calc(min(100svh,980px)-4.5rem)] lg:grid-cols-[1.08fr_0.92fr] lg:gap-6 lg:pb-20">
        <div className="max-w-2xl">
          <h1 id="hero-title" className="uppercase">
            <span className="block text-[clamp(3.4rem,11vw,7.5rem)] tracking-[-0.01em] text-bone">{HERO.title}</span>
            <span className="mt-3 block font-semibold text-[clamp(1.6rem,4.2vw,2.6rem)] leading-none tracking-[0.01em] text-gold">
              {HERO.subtitle}
            </span>
          </h1>

          <div className="mt-8 space-y-4 border-l-2 border-gold/70 pl-5 text-[1.075rem] leading-relaxed text-bone/90 sm:text-lg">
            {HERO.intro.map((p) => (
              <p key={p.slice(0, 24)}>{p}</p>
            ))}
          </div>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <a href={`#${SEVEN_FRONTS.id}`} className="btn-primary">
              Découvrir Seven Fronts
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" aria-hidden="true">
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </a>
            <a href="#contact" className="btn-ghost">
              Prendre contact
            </a>
          </div>
        </div>

        <div className="relative">
          <CoinStage />
        </div>
      </div>

      {/* Les sept étapes du cycle de développement (reprises du texte d'intro) */}
      <div className="relative border-y border-line bg-ink-900/80">
        <ol
          aria-label="Cycle de développement"
          className="container-page grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7"
        >
          {HERO.disciplines.map((d, i) => (
            <li
              key={d}
              className="flex items-baseline gap-2.5 border-line py-4 pr-3 max-lg:border-b lg:border-l lg:pl-4 lg:first:border-l-0 lg:first:pl-0"
            >
              <span className="font-mono text-[0.78rem] text-gold" aria-hidden="true">
                {String(i + 1).padStart(2, '0')}
              </span>
              <span className="font-display text-[1.2rem] font-semibold uppercase leading-tight tracking-wide text-bone lg:text-[1.1rem]">
                {d}
              </span>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
