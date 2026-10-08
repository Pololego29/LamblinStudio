import { POLICE_VOLEURS as G } from '../data/site'

// Schéma abstrait (illustration originale) : un quadrillage urbain et deux
// équipes aux trajectoires opposées. Ne décrit aucune mécanique précise.
function PursuitDiagram() {
  const blocks = []
  const cols = [20, 120, 220, 320]
  const rows = [20, 110, 200, 290]
  cols.forEach((x, i) =>
    rows.forEach((y, j) => {
      if ((i + j) % 5 === 3) return // une place ouverte
      blocks.push(<rect key={`${i}-${j}`} x={x} y={y} width="80" height="70" />)
    }),
  )
  return (
    <svg viewBox="0 0 420 380" className="block h-auto w-full" role="img" aria-labelledby="pv-svg-t">
      <title id="pv-svg-t">Schéma abstrait : deux équipes aux objectifs opposés dans un quadrillage urbain</title>
      <rect width="420" height="380" fill="#111618" />
      <g fill="#1b2326" stroke="#2f3a3e" strokeWidth="1">{blocks}</g>
      {/* Voleurs : fuite */}
      <path
        d="M60 360 V 190 H 210 V 100 H 400"
        fill="none"
        stroke="#c4553a"
        strokeWidth="3"
        strokeDasharray="8 7"
        strokeLinecap="round"
        className="pv-dash"
      />
      {/* Police : poursuite */}
      <path
        d="M20 360 H 110 V 280 H 210 V 190 H 310 V 100"
        fill="none"
        stroke="#7f9cb8"
        strokeWidth="3"
        strokeDasharray="2 7"
        strokeLinecap="round"
        className="pv-dash"
      />
      <g stroke="#0b0f10" strokeWidth="2">
        <polygon points="400,100 386,92 386,108" fill="#c4553a" />
        <polygon points="310,100 302,114 318,114" fill="#7f9cb8" />
        <circle cx="60" cy="360" r="8" fill="#c4553a" />
        <circle cx="20" cy="360" r="8" fill="#7f9cb8" />
      </g>
      <style>{`
        .pv-dash { animation: pv-march 1.8s linear infinite; }
        @keyframes pv-march { to { stroke-dashoffset: -30; } }
        @media (prefers-reduced-motion: reduce) { .pv-dash { animation: none; } }
      `}</style>
    </svg>
  )
}

const UPCOMING = [
  { label: 'Mécaniques détaillées', value: G.mechanics },
  { label: 'Plateformes', value: G.platforms },
  { label: 'Technologies', value: G.technologies },
]

export default function PoliceVoleurs() {
  return (
    <section id={G.id} aria-labelledby="pv-title" className="relative border-t border-line bg-ink-900 py-20 sm:py-28">
      <div className="container-page grid items-start gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
        <figure className="order-2 border border-line lg:order-1">
          <PursuitDiagram />
          <figcaption className="flex flex-wrap items-center gap-x-5 gap-y-1 border-t border-line px-4 py-3 font-mono text-[0.78rem] text-muted">
            <span className="flex items-center gap-2">
              <span className="inline-block h-2.5 w-2.5 rounded-full bg-[#7f9cb8]" aria-hidden="true" />
              Police
            </span>
            <span className="flex items-center gap-2">
              <span className="inline-block h-2.5 w-2.5 rounded-full bg-[#c4553a]" aria-hidden="true" />
              Voleurs
            </span>
            <span>Schéma d'intention</span>
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
