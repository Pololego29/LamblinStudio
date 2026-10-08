import { OBJECTIVE, SITE } from '../data/site'

export default function Objective() {
  return (
    <section id="studio" aria-labelledby="studio-title" className="relative overflow-hidden py-20 sm:py-28">
      <div className="bg-grid pointer-events-none absolute inset-0 opacity-70" aria-hidden="true" />
      <div className="container-page relative grid items-center gap-10 lg:grid-cols-[auto_1fr] lg:gap-20">
        <div className="flex items-center gap-5 lg:flex-col lg:items-center">
          <img
            src="/brand/otter-octagon-128.webp"
            alt=""
            width="116"
            height="128"
            loading="lazy"
            decoding="async"
            className="h-24 w-auto lg:h-32"
          />
          <div className="ruler w-24 lg:w-32" aria-hidden="true" />
        </div>

        <div>
          <h2 id="studio-title" className="text-[clamp(2.4rem,6vw,4.25rem)] uppercase text-bone">
            {OBJECTIVE.title}
          </h2>
          <p className="mt-8 max-w-4xl text-[clamp(1.25rem,2.4vw,1.75rem)] leading-snug text-bone/90">
            {OBJECTIVE.parts.map((part, i) =>
              part.em ? (
                <strong
                  key={i}
                  className="font-semibold text-gold-bright"
                >
                  {part.text}
                </strong>
              ) : (
                <span key={i}>{part.text}</span>
              ),
            )}
          </p>
          <p className="mt-8 font-display text-xl font-semibold uppercase tracking-wide text-gold">
            — {SITE.owner}
          </p>
        </div>
      </div>
    </section>
  )
}
