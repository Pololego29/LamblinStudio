// La pièce 3D est conservée mais désactivée (cf. plus bas). Pour la réactiver,
// décommente l'import et le bloc <HeroCoinLogo /> dans le JSX.
// import HeroCoinLogo from './HeroCoinLogo'
import { SITE } from '../data/site'
import RotatingTitle from './RotatingTitle'
import HoverRevealImage from './HoverRevealImage'
import PhysicsLogo from './PhysicsLogo'

export default function Hero() {
  const scrollTo = (id) =>
    document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' })

  return (
    <section
      id="home"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden px-6"
    >
      {/* Fond interactif : survole pour révéler la version futuriste */}
      <HoverRevealImage
        imageBase={SITE.reveal.base}
        imageReveal={SITE.reveal.futur}
        alt="Lamblin Studio"
        radius={230}
        className="absolute inset-0"
      />

      {/* Overlay lisibilité (laisse passer la souris) */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'linear-gradient(180deg, rgba(3,7,18,0.62) 0%, rgba(3,7,18,0.30) 40%, rgba(3,7,18,0.55) 78%, #030712 100%)',
        }}
      />
      {/* Vignette douce */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 75% 65% at 50% 45%, transparent 42%, rgba(3,7,18,0.5) 100%)' }}
      />

      {/* ── Content (laisse passer la souris vers le fond, sauf les boutons) ── */}
      <div className="relative z-10 flex flex-col items-center w-full max-w-3xl text-center pointer-events-none">

        {/* (Le logo "ma tête" est désormais l'objet physique flottant ci-dessous) */}
        <div className="h-32 md:h-44" />

        {/*
          ── PIÈCE 3D (désactivée, gardée au cas où) ──
          <div className="w-56 h-56 md:w-[380px] md:h-[380px]">
            <HeroCoinLogo />
          </div>
        */}

        {/* Wordmark — se morphe entre les phrases (effet flou) */}
        <RotatingTitle
          phrases={SITE.heroPhrases}
          className="font-black tracking-tight leading-[0.95]"
          style={{ fontSize: 'clamp(2.4rem, 7.5vw, 5.4rem)', textShadow: '0 4px 40px rgba(0,0,0,0.6)' }}
        />

        {/* CTAs (cliquables) */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10 pointer-events-auto">
          <button onClick={() => scrollTo('#projects')} className="btn-primary px-8 py-4 text-base">
            Voir les projets
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </button>
          <button onClick={() => scrollTo('#contact')} className="btn-secondary px-8 py-4 text-base">
            Me contacter
          </button>
        </div>
      </div>

      {/* Logo "ma tête" — flotte en boucle, tombe au toucher, jouable comme un ballon */}
      <PhysicsLogo
        src="/brand/logo-web.png"
        alt="Lamblin Studio"
        size={132}
        start={{ xPct: 0.5, yPct: 0.24 }}
        glow="rgba(96,165,250,0.55)"
      />
    </section>
  )
}
