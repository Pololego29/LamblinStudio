// La pièce 3D est conservée mais désactivée (cf. plus bas). Pour la réactiver,
// décommente l'import et le bloc <HeroCoinLogo /> dans le JSX.
// import HeroCoinLogo from './HeroCoinLogo'

export default function Hero() {
  const scrollTo = (id) =>
    document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' })

  return (
    <section
      id="home"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden px-6"
    >
      {/* Background image — voie lactée */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: 'url(/background.avif)' }}
      />

      {/* Overlay pour la lisibilité du texte + fondu vers la section suivante */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(180deg, rgba(3,7,18,0.55) 0%, rgba(3,7,18,0.30) 38%, rgba(3,7,18,0.78) 82%, #030712 100%)',
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

        {/* Wordmark */}
        <h1
          className="font-black tracking-tight leading-[0.95]"
          style={{ fontSize: 'clamp(2.8rem, 8vw, 5.8rem)', textShadow: '0 4px 40px rgba(0,0,0,0.5)' }}
        >
          <span className="text-white">Lamblin</span>{' '}
          <span className="text-gradient">Studio</span>
        </h1>

        <p
          className="text-white/70 leading-relaxed mt-6 mx-auto"
          style={{ maxWidth: '42ch', fontSize: 'clamp(0.95rem, 1.8vw, 1.15rem)' }}
        >
          Sites web, applications web et iOS — conçus, développés et mis en ligne
          avec soin.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-9">
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

      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-40 pointer-events-none">
        <span className="text-white/60 text-xs tracking-widest uppercase">Scroll</span>
        <div className="w-px h-10 relative overflow-hidden bg-white/15">
          <div
            className="absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-b from-transparent to-blue-400"
            style={{ animation: 'scrollLine 1.6s ease infinite' }}
          />
        </div>
      </div>

      <style>{`
        @keyframes scrollLine {
          0%   { transform: translateY(-100%); }
          100% { transform: translateY(250%); }
        }
      `}</style>
    </section>
  )
}
