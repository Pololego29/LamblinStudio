// La pièce 3D est conservée mais désactivée (cf. plus bas). Pour la réactiver,
// décommente l'import et le bloc <HeroCoinLogo /> dans le JSX.
// import HeroCoinLogo from './HeroCoinLogo'
import { SITE } from '../data/site'
import BackgroundSlideshow from './BackgroundSlideshow'
import RotatingTitle from './RotatingTitle'

export default function Hero() {
  const scrollTo = (id) =>
    document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' })

  return (
    <section
      id="home"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden px-6"
    >
      {/* Fonds en diaporama (fondu, toutes les 5–9s) */}
      <BackgroundSlideshow images={SITE.heroBackgrounds} />

      {/* Overlay pour la lisibilité du texte + fondu vers la section suivante */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(180deg, rgba(3,7,18,0.60) 0%, rgba(3,7,18,0.42) 38%, rgba(3,7,18,0.80) 82%, #030712 100%)',
        }}
      />
      {/* Vignette douce */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 70% 60% at 50% 45%, transparent 40%, rgba(3,7,18,0.55) 100%)' }}
      />

      {/* ── Content ── */}
      <div className="relative z-10 flex flex-col items-center w-full max-w-3xl text-center">

        {/* Logo */}
        <div className="relative mb-8">
          <div
            className="absolute -inset-6 rounded-full blur-2xl opacity-60"
            style={{ background: 'radial-gradient(circle, rgba(96,165,250,0.45), transparent 70%)' }}
          />
          <img
            src="/brand/logo-web.png"
            alt="Lamblin Studio"
            className="relative w-28 h-28 md:w-36 md:h-36 object-contain select-none"
            style={{ filter: 'drop-shadow(0 8px 30px rgba(0,0,0,0.5))' }}
            draggable={false}
          />
        </div>

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
          style={{ fontSize: 'clamp(2.4rem, 7.5vw, 5.4rem)', textShadow: '0 4px 40px rgba(0,0,0,0.5)' }}
        />

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10">
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
    </section>
  )
}
