import { POLICE_VOLEURS as G } from '../data/site'

const UPCOMING = [
  { label: 'Mécaniques détaillées', value: G.mechanics },
  { label: 'Plateformes', value: G.platforms },
  { label: 'Technologies', value: G.technologies },
]

export default function PoliceVoleurs() {
  return (
    <section id={G.id} aria-labelledby="pv-title" className="relative border-t border-line bg-ink-900 py-20 sm:py-28">
      <div className="container-page grid items-start gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
        <figure className="order-2 border border-line bg-ink-950 lg:order-1">
          <picture>
            <source
              type="image/avif"
              srcSet="/games/police-voleurs-560.avif 560w, /games/police-voleurs-1024.avif 1024w"
              sizes="(min-width: 1024px) 40vw, 100vw"
            />
            <img
              src="/games/police-voleurs-560.webp"
              srcSet="/games/police-voleurs-560.webp 560w, /games/police-voleurs-1024.webp 1024w"
              sizes="(min-width: 1024px) 40vw, 100vw"
              alt="Visuel de Police vs Voleurs : un policier et un voleur face à face"
              width={1024}
              height={1024}
              loading="lazy"
              decoding="async"
              className="block h-auto w-full"
            />
          </picture>
          <figcaption className="flex flex-wrap items-center gap-x-5 gap-y-1 border-t border-line px-4 py-3 font-mono text-[0.78rem] text-muted">
            <span className="flex items-center gap-2">
              <span className="inline-block h-2.5 w-2.5 rounded-full bg-[#3d6bff]" aria-hidden="true" />
              Police
            </span>
            <span className="flex items-center gap-2">
              <span className="inline-block h-2.5 w-2.5 rounded-full bg-[#ff9a1f]" aria-hidden="true" />
              Voleurs
            </span>
          </figcaption>
        </figure>

        <div className="order-1 lg:order-2">
          <div className="flex flex-wrap items-center gap-4">
            <p className="status">{G.status}</p>
          </div>
          <h2 id="pv-title" className="mt-5 text-[clamp(2.6rem,7vw,4.75rem)] uppercase text-bone">
            {G.title}
          </h2>
          <p className="mt-3 font-display text-[clamp(1.35rem,3vw,1.9rem)] font-semibold uppercase leading-none text-gold">
            {G.genre}
          </p>

          <div className="mt-8 space-y-5 text-[1.075rem] leading-relaxed text-bone/90">
            {G.description.map((p) => (
              <p key={p.slice(0, 24)}>{p}</p>
            ))}
          </div>

          <dl className="mt-10 border-t border-line">
            {UPCOMING.map(({ label, value }) => (
              <div key={label} className="flex items-baseline justify-between gap-4 border-b border-line py-3">
                <dt className="text-muted">{label}</dt>
                <dd className="text-right font-mono text-[0.9rem] text-bone">
                  {value.length ? value.join(', ') : 'À venir'}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  )
}
