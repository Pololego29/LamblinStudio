import { useState } from 'react'
import PhysicsLogo from './PhysicsLogo'

// ── Palette locale (premium gaming nocturne) ────────────────────────────────
const VIOLET = '#a855f7'
const CYAN = '#22d3ee'

// ── Petites icônes ──────────────────────────────────────────────────────────
const Icon = {
  bolt: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
    </svg>
  ),
  layout: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="18" height="18" rx="2" /><path d="M3 9h18M9 21V9" />
    </svg>
  ),
  users: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  ),
  sparkles: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 3v4M12 17v4M3 12h4M17 12h4M5.6 5.6l2.8 2.8M15.6 15.6l2.8 2.8M18.4 5.6l-2.8 2.8M8.4 15.6l-2.8 2.8" />
    </svg>
  ),
  gamepad: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <line x1="6" y1="11" x2="10" y2="11" /><line x1="8" y1="9" x2="8" y2="13" />
      <line x1="15" y1="12" x2="15.01" y2="12" /><line x1="18" y1="10" x2="18.01" y2="10" />
      <rect x="2" y="6" width="20" height="12" rx="6" />
    </svg>
  ),
  refresh: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 2v6h-6M3 22v-6h6M3.5 9a9 9 0 0 1 14.85-3.36L21 8M20.5 15a9 9 0 0 1-14.85 3.36L3 16" />
    </svg>
  ),
  gift: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="8" width="18" height="4" rx="1" /><path d="M12 8v13M5 12v9h14v-9" />
      <path d="M12 8C12 8 10 3 7.5 4.5 5.5 5.7 7 8 12 8zM12 8c0 0 2-5 4.5-3.5C18.5 5.7 17 8 12 8z" />
    </svg>
  ),
}

const DOC_ITEMS = [
  { icon: Icon.bolt, text: 'Accès rapide à des mini-jeux variés' },
  { icon: Icon.layout, text: 'Interface simple et intuitive' },
  { icon: Icon.users, text: 'Jeux solo, multijoueur et défis' },
  { icon: Icon.sparkles, text: 'Une expérience ludique et moderne' },
]

const STATS = [
  { value: '+20', label: 'Jeux disponibles', icon: Icon.gamepad },
  { value: '10K+', label: 'Joueurs actifs', icon: Icon.users },
  { value: 'Mises à jour', label: 'Régulières', icon: Icon.refresh },
  { value: '100%', label: 'Gratuit', icon: Icon.gift },
]

// ── Popover "À propos" ──────────────────────────────────────────────────────
function AboutPopover() {
  return (
    <div
      className={[
        // mobile : bloc statique sous la card
        'relative mt-4 w-full opacity-100 translate-x-0',
        // desktop : popover flottant à droite de la card, révélé au hover
        'md:absolute md:left-full md:top-1/2 md:-translate-y-1/2 md:ml-5 md:mt-0 md:w-80',
        'md:opacity-0 md:invisible md:-translate-x-2',
        'md:group-hover:opacity-100 md:group-hover:visible md:group-hover:translate-x-0',
        'transition-all duration-300 ease-out z-20 pointer-events-none',
      ].join(' ')}
      style={{
        background: 'rgba(12,8,28,0.72)',
        backdropFilter: 'blur(18px)',
        WebkitBackdropFilter: 'blur(18px)',
        border: `1px solid ${VIOLET}55`,
        borderRadius: '1rem',
        boxShadow: `0 20px 60px -20px ${VIOLET}55, 0 0 0 1px rgba(255,255,255,0.04) inset`,
        padding: '1.1rem 1.2rem',
      }}
    >
      {/* Flèche (desktop) pointant vers la card */}
      <span
        className="hidden md:block absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 rotate-45"
        style={{
          width: 12, height: 12,
          background: 'rgba(12,8,28,0.72)',
          borderLeft: `1px solid ${VIOLET}55`,
          borderBottom: `1px solid ${VIOLET}55`,
        }}
      />
      <h4 className="text-white font-bold text-sm mb-3 tracking-wide">À propos d'Ekip Game</h4>
      <ul className="flex flex-col gap-2.5">
        {DOC_ITEMS.map((d) => (
          <li key={d.text} className="flex items-start gap-2.5">
            <span
              className="mt-0.5 shrink-0 w-6 h-6 rounded-md flex items-center justify-center"
              style={{ background: `${VIOLET}1f`, border: `1px solid ${VIOLET}40`, color: VIOLET }}
            >
              {d.icon}
            </span>
            <span className="text-white/70 text-[0.82rem] leading-snug">{d.text}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

// ── Card "Voir le site" + popover ───────────────────────────────────────────
function SiteCard({ project }) {
  const [imgErr, setImgErr] = useState(false)

  return (
    <div className="relative group inline-block self-start mt-9 max-w-full">
      <a
        href={project.url}
        target="_blank"
        rel="noopener noreferrer"
        className="relative flex items-center gap-4 p-3.5 pr-5 rounded-2xl transition-all duration-300 group-hover:-translate-y-1"
        style={{
          background: 'rgba(12,8,28,0.55)',
          backdropFilter: 'blur(14px)',
          WebkitBackdropFilter: 'blur(14px)',
          border: `1px solid ${VIOLET}55`,
          boxShadow: `0 14px 40px -16px ${VIOLET}66`,
        }}
      >
        {/* Icône : remplit exactement le carré (ses propres bords font foi,
            pas de bordure/clip HTML → évite le dédoublement) */}
        <div className="w-16 h-16 shrink-0">
          {imgErr ? (
            <div
              className="w-full h-full rounded-xl flex items-center justify-center text-2xl"
              style={{ background: `linear-gradient(135deg, ${VIOLET}33, ${CYAN}22)`, border: `1px solid ${VIOLET}40` }}
            >
              🎮
            </div>
          ) : (
            <img
              src={project.cardImage}
              alt="Ekip Game"
              className="w-full h-full object-cover"
              onError={() => setImgErr(true)}
              draggable={false}
            />
          )}
        </div>

        {/* Texte */}
        <div className="min-w-0">
          <div className="text-white font-bold leading-tight">Voir le site</div>
          <div className="text-sm font-medium truncate" style={{ color: VIOLET }}>
            {project.display || project.url.replace(/^https?:\/\//, '').replace(/\/$/, '')}
          </div>
        </div>

        {/* Flèche */}
        <svg
          className="ml-1 shrink-0 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
          width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={VIOLET} strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"
        >
          <path d="M7 17 17 7M9 7h8v8" />
        </svg>
      </a>

      <AboutPopover />
    </div>
  )
}

// ── Section principale ──────────────────────────────────────────────────────
export default function EkipGameHero({ project }) {
  return (
    <div className="relative w-full overflow-hidden">
      {/* Image de fond */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${project.cover})` }}
      />

      {/* Overlay plat (lisibilité globale, surtout mobile) */}
      <div className="absolute inset-0" style={{ background: 'rgba(8,5,22,0.45)' }} />
      {/* Dégradé directionnel : sombre à gauche, image visible à droite */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(90deg, rgba(8,5,22,0.95) 0%, rgba(8,5,22,0.78) 38%, rgba(10,8,30,0.35) 72%, rgba(10,8,30,0.12) 100%)',
        }}
      />
      {/* Fondu haut/bas pour intégrer la section dans la page */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'linear-gradient(180deg, #030712 0%, transparent 5%, transparent 90%, #030712 100%)' }}
      />
      {/* Glow violet ambiant */}
      <div
        className="absolute -top-24 left-1/4 w-[520px] h-[520px] rounded-full blur-[130px] opacity-30 pointer-events-none"
        style={{ background: `radial-gradient(circle, ${VIOLET}, transparent 70%)` }}
      />

      {/* ── Contenu (aligné à gauche, pleine largeur) ── */}
      <div className="relative z-10 w-full px-6 sm:px-10 lg:px-16 xl:px-24 min-h-[680px] md:min-h-[90vh] flex flex-col py-8">

        {/* Espace réservé : le logo Ekip est l'objet physique flottant (cf. bas) */}
        <div className="h-32 md:h-44 shrink-0" />

        {/* Bloc central (gauche) */}
        <div className="flex-1 flex flex-col justify-center max-w-2xl py-12">
          {/* Titre */}
          <h2
            className="font-black text-white uppercase tracking-tight leading-[0.92]"
            style={{
              fontSize: 'clamp(3rem, 8.5vw, 6.5rem)',
              textShadow: `0 0 45px ${VIOLET}80, 0 0 90px rgba(59,130,246,0.35)`,
              backgroundImage: 'linear-gradient(180deg, #ffffff 0%, #e9d5ff 100%)',
              WebkitBackgroundClip: 'text',
              backgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            Ekip Game
          </h2>

          {/* Description */}
          <p className="text-white/75 leading-relaxed mt-6" style={{ fontSize: 'clamp(1rem, 1.8vw, 1.2rem)' }}>
            Plateforme de mini-jeux en ligne :<br />
            Wordle, Sutom, Scrabble, Sudoku,<br />
            Loup-Garou{' '}
            <span className="font-semibold" style={{ color: VIOLET }}>
              et bien plus encore.
            </span>
          </p>

          {/* Card cliquable + popover */}
          <SiteCard project={project} />
        </div>

        {/* Stats (bas gauche) */}
        <div className="flex flex-wrap gap-3 pb-2">
          {STATS.map((s) => (
            <div
              key={s.label}
              className="flex items-center gap-3 px-4 py-3 rounded-xl"
              style={{
                background: 'rgba(255,255,255,0.05)',
                backdropFilter: 'blur(12px)',
                WebkitBackdropFilter: 'blur(12px)',
                border: '1px solid rgba(168,85,247,0.22)',
              }}
            >
              <span
                className="shrink-0 w-9 h-9 rounded-lg flex items-center justify-center"
                style={{ background: `${VIOLET}1f`, border: `1px solid ${VIOLET}33`, color: VIOLET }}
              >
                {s.icon}
              </span>
              <div className="leading-none">
                <div className="text-white font-extrabold text-base sm:text-lg">{s.value}</div>
                <div className="text-white/45 text-xs mt-1">{s.label}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Logo Ekip — flotte surtout en horizontal (peu de vertical pour ne pas
          recouvrir "EKIP GAME"), tombe au toucher, jouable comme un ballon */}
      <PhysicsLogo
        src={project.logo}
        alt="Ekip Game"
        size={150}
        start={{ xPct: 0.12, yPct: 0.15 }}
        float={{ x: 150, y: 5 }}
        sweepRight
        glow="rgba(168,85,247,0.6)"
      />
    </div>
  )
}
