import HeroCoinLogo from './HeroCoinLogo'

export default function Hero() {
  const scrollTo = (id) =>
    document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' })

  return (
    <section
      id="home"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden px-6"
      style={{
        background:
          'radial-gradient(ellipse 90% 55% at 50% 5%, rgba(212,168,0,0.07) 0%, rgba(59,130,246,0.07) 40%, #030712 72%)',
      }}
    >
      {/* Subtle gold-tinted grid */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,210,80,0.6) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,210,80,0.6) 1px, transparent 1px)
          `,
          backgroundSize: '80px 80px',
          opacity: 0.025,
        }}
      />

      {/* Golden glow halo centred behind the coin */}
      <div
        className="absolute pointer-events-none"
        style={{
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -54%)',
          width: 560,
          height: 560,
          borderRadius: '50%',
          background:
            'radial-gradient(ellipse, rgba(212,168,0,0.13) 0%, transparent 68%)',
          filter: 'blur(40px)',
        }}
      />

      {/* Blue side accent */}
      <div
        className="absolute -right-40 top-1/3 w-96 h-96 rounded-full pointer-events-none opacity-[0.06] blur-3xl"
        style={{ background: 'radial-gradient(circle, #6366f1, transparent)' }}
      />

      {/* ── Content ── */}
      <div className="relative z-10 flex flex-col items-center w-full max-w-3xl">

        {/* 3D Coin — responsive sizing */}
        <div
          className="mt-24 w-56 h-56 sm:w-72 sm:h-72 md:w-[400px] md:h-[400px]"
          aria-label="Pièce Lamblin Studio 3D"
        >
          <HeroCoinLogo />
        </div>

        {/* Wordmark */}
        <div className="text-center -mt-2">
          <h1
            className="font-black tracking-tight leading-[0.95]"
            style={{ fontSize: 'clamp(2.6rem, 8vw, 5.5rem)' }}
          >
            <span className="text-white">Lamblin</span>{' '}
            <span className="text-gradient">Studio</span>
          </h1>

          <p
            className="text-white/55 leading-relaxed mt-6 mx-auto"
            style={{
              maxWidth: '42ch',
              fontSize: 'clamp(0.95rem, 1.8vw, 1.15rem)',
            }}
          >
            Sites web, applications web et iOS — conçus, développés et mis en
            ligne avec soin.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-9">
            <button
              onClick={() => scrollTo('#projects')}
              className="btn-primary px-8 py-4 text-base"
            >
              Voir les projets
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </button>
            <button
              onClick={() => scrollTo('#contact')}
              className="btn-secondary px-8 py-4 text-base"
            >
              Me contacter
            </button>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-30 pointer-events-none">
        <span className="text-white/50 text-xs tracking-widest uppercase">Scroll</span>
        <div className="w-px h-10 relative overflow-hidden bg-white/10">
          <div
            className="absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-b from-transparent to-yellow-400"
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
