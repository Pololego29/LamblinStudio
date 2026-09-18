import { IOS_APPS } from '../data/site'
import Reveal from './Reveal'

// ── Palette locale (bleu iOS) ───────────────────────────────────────────────
const IOS_BLUE = '#60a5fa'

const AppleLogo = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701" />
  </svg>
)

const CheckIcon = (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 6 9 17l-5-5" />
  </svg>
)

/** Maquette d'iPhone en CSS pur (pas d'image à fournir). */
function PhoneMockup() {
  return (
    <div className="relative mx-auto" style={{ width: 252, maxWidth: '100%' }}>
      {/* Halo */}
      <div
        className="absolute -inset-10 rounded-full blur-3xl opacity-40 pointer-events-none"
        style={{ background: `radial-gradient(circle, ${IOS_BLUE}55, transparent 70%)` }}
      />

      {/* Châssis */}
      <div
        className="relative rounded-[2.6rem] p-2.5"
        style={{
          background: 'linear-gradient(160deg, rgba(255,255,255,0.16), rgba(255,255,255,0.04) 45%, rgba(255,255,255,0.12))',
          boxShadow: '0 40px 90px -35px rgba(0,0,0,0.9), 0 0 0 1px rgba(255,255,255,0.06)',
        }}
      >
        {/* Écran */}
        <div
          className="relative rounded-[2.1rem] overflow-hidden flex flex-col items-center justify-center"
          style={{
            aspectRatio: '9 / 19.5',
            background:
              'radial-gradient(ellipse at 50% 0%, rgba(96,165,250,0.28) 0%, rgba(99,102,241,0.14) 45%, #05070f 100%)',
          }}
        >
          {/* Dynamic island */}
          <div className="absolute top-3 left-1/2 -translate-x-1/2 h-5 w-20 rounded-full bg-black/80" />

          {/* Icône d'app (logo du studio) */}
          <div
            className="w-[70px] h-[70px] rounded-[1.1rem] flex items-center justify-center overflow-hidden"
            style={{
              background: 'linear-gradient(145deg, rgba(96,165,250,0.35), rgba(99,102,241,0.25))',
              border: '1px solid rgba(255,255,255,0.18)',
              boxShadow: `0 14px 34px -12px ${IOS_BLUE}99`,
            }}
          >
            <img
              src="/brand/logo-web.png"
              alt="Lamblin Studio"
              className="w-12 h-12 object-contain select-none"
              draggable={false}
            />
          </div>

          <div className="mt-4 text-white font-bold text-sm tracking-tight">Lamblin Studio</div>
          <div className="text-white/40 text-[0.7rem] mt-1">iPhone · iOS</div>

          {/* Barre de progression décorative */}
          <div className="mt-6 w-28 h-1 rounded-full overflow-hidden bg-white/10">
            <div className="h-full w-2/3 rounded-full animate-pulse" style={{ background: IOS_BLUE }} />
          </div>
          <div className="mt-2.5 text-[0.65rem] tracking-widest uppercase font-semibold" style={{ color: IOS_BLUE }}>
            En développement
          </div>

          {/* Indicateur du bas */}
          <div className="absolute bottom-2.5 left-1/2 -translate-x-1/2 h-1 w-24 rounded-full bg-white/25" />
        </div>
      </div>
    </div>
  )
}

export default function IosAppsSection() {
  return (
    <section id="ios" className="relative py-28 px-6 overflow-hidden">
      {/* Glow ambiant */}
      <div
        className="absolute top-1/3 left-0 w-[620px] h-[420px] rounded-full opacity-[0.07] blur-3xl pointer-events-none"
        style={{ background: 'radial-gradient(ellipse, #60a5fa, transparent)' }}
      />

      <div className="max-w-6xl mx-auto relative z-10 grid md:grid-cols-[1fr_auto] gap-14 md:gap-20 items-center">
        {/* Texte */}
        <Reveal>
          <div className="section-tag mb-5">{IOS_APPS.tag}</div>

          <h2
            className="font-black text-white tracking-tight leading-[1.05] mb-5"
            style={{ fontSize: 'clamp(2.2rem, 4.5vw, 3.4rem)' }}
          >
            {IOS_APPS.title} <span className="text-gradient">{IOS_APPS.titleAccent}</span>
          </h2>

          <p className="text-white/55 leading-relaxed max-w-xl mb-8" style={{ fontSize: '1.05rem' }}>
            {IOS_APPS.intro}
          </p>

          {/* Points clés */}
          <ul className="flex flex-col gap-4 mb-9 max-w-xl">
            {IOS_APPS.features.map((f) => (
              <li key={f.title} className="flex items-start gap-3.5">
                <span
                  className="mt-0.5 shrink-0 w-7 h-7 rounded-lg flex items-center justify-center"
                  style={{
                    background: 'rgba(96,165,250,0.12)',
                    border: '1px solid rgba(96,165,250,0.25)',
                    color: IOS_BLUE,
                  }}
                >
                  {CheckIcon}
                </span>
                <span>
                  <span className="block text-white font-semibold text-[0.95rem] leading-snug">{f.title}</span>
                  <span className="block text-white/40 text-sm leading-relaxed mt-0.5">{f.desc}</span>
                </span>
              </li>
            ))}
          </ul>

          {/* Badge App Store (à venir) */}
          <div className="flex flex-wrap items-center gap-4">
            <span
              className="inline-flex items-center gap-3 pl-4 pr-5 py-3 rounded-2xl"
              style={{
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(96,165,250,0.28)',
                backdropFilter: 'blur(12px)',
                WebkitBackdropFilter: 'blur(12px)',
                color: 'white',
              }}
            >
              <AppleLogo size={22} />
              <span className="leading-tight text-left">
                <span className="block text-[0.65rem] uppercase tracking-widest text-white/40">Prochainement</span>
                <span className="block font-bold text-sm">{IOS_APPS.badge}</span>
              </span>
            </span>

            <span className="text-white/30 text-sm max-w-xs leading-relaxed">{IOS_APPS.note}</span>
          </div>
        </Reveal>

        {/* Maquette */}
        <Reveal delay={140} className="w-full md:w-auto">
          <PhoneMockup />
        </Reveal>
      </div>
    </section>
  )
}
