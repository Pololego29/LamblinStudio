import { SEVEN_FRONTS as G } from '../data/site'
import mapUrl from '../assets/seven-fronts-map.svg'

export default function SevenFronts() {
  return (
    <section id={G.id} aria-labelledby="sf-title" className="relative py-20 sm:py-28">
      <div className="container-page">
        {/* En-tête du projet */}
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="flex items-center gap-5 sm:gap-7">
            <img
              src="/games/seven-fronts-icon.svg"
              alt=""
              width={112}
              height={112}
              loading="lazy"
              decoding="async"
              className="h-20 w-20 shrink-0 rounded-[22%] shadow-[0_12px_30px_-10px_rgba(0,0,0,0.8)] ring-1 ring-[#2f5a6c] sm:h-28 sm:w-28"
            />
            <div>
              <h2 id="sf-title" className="text-[clamp(3rem,9vw,6rem)] uppercase text-bone">
                {G.title}
              </h2>
              <p className="mt-3 font-display text-[clamp(1.35rem,3vw,1.9rem)] font-semibold uppercase leading-none text-gold">
                {G.genre}
              </p>
            </div>
          </div>
          <p className="status self-start md:self-auto">{G.status}</p>
        </div>

        {/* Carte stratégique (illustration originale) */}
        <figure className="mt-10 border border-line bg-ink-900">
          <img
            src={mapUrl}
            alt="Carte stylisée de l'Europe découpée en centaines de régions, avec plusieurs camps colorés, des lignes de front et des flèches d'offensive."
            width="1000"
            height="867"
            loading="lazy"
            decoding="async"
            className="block h-auto w-full"
          />
          <figcaption className="flex flex-col gap-1 border-t border-line px-4 py-3 font-mono text-[0.78rem] text-muted sm:flex-row sm:items-center sm:justify-between">
            <span>{G.mapCaption}</span>
            <span className="flex items-center gap-2 text-bone/80" aria-hidden="true">
              <svg width="34" height="8" viewBox="0 0 34 8">
                <path d="M1 4h32" stroke="#e0b45c" strokeWidth="2.4" strokeDasharray="6 5" />
              </svg>
              Ligne de front
            </span>
          </figcaption>
        </figure>

        {/* Description + contenu du projet */}
        <div className="mt-14 grid gap-12 lg:grid-cols-[1fr_1.05fr] lg:gap-16">
          <div className="space-y-5 text-[1.075rem] leading-relaxed text-bone/90">
            {G.description.map((p) => (
              <p key={p.slice(0, 24)}>{p}</p>
            ))}
          </div>

          <div>
            <h3 className="text-[1.9rem] uppercase text-bone">{G.featuresTitle}</h3>
            <ol className="mt-5 border-t border-line">
              {G.features.map((f, i) => (
                <li key={f} className="grid grid-cols-[2.75rem_1fr] gap-2 border-b border-line py-4">
                  <span className="pt-0.5 font-mono text-[0.85rem] text-gold" aria-hidden="true">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="leading-relaxed text-bone/90">{f}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>

        {/* Technologies */}
        <div className="mt-14 border-t-2 border-gold/70 pt-6 lg:grid lg:grid-cols-[14rem_1fr] lg:gap-8">
          <h3 className="text-[1.9rem] uppercase text-bone">Technologies</h3>
          <ul className="mt-4 flex flex-wrap gap-x-6 gap-y-3 lg:mt-1">
            {G.technologies.map((t) => (
              <li
                key={t}
                className="border-l-2 border-gold/60 pl-3 font-mono text-[0.95rem] font-medium leading-tight text-bone"
              >
                {t}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
