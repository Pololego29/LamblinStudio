import { useEffect, useRef } from 'react'

function ParticleCanvas() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let animId

    const resize = () => {
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
    }
    resize()
    window.addEventListener('resize', resize)

    const count = 80
    const particles = Array.from({ length: count }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 1.5 + 0.3,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      alpha: Math.random() * 0.5 + 0.1,
    }))

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      for (const p of particles) {
        p.x += p.vx
        p.y += p.vy
        if (p.x < 0) p.x = canvas.width
        if (p.x > canvas.width) p.x = 0
        if (p.y < 0) p.y = canvas.height
        if (p.y > canvas.height) p.y = 0

        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(96,165,250,${p.alpha})`
        ctx.fill()
      }

      // Draw connections
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < 120) {
            ctx.beginPath()
            ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(particles[j].x, particles[j].y)
            ctx.strokeStyle = `rgba(96,165,250,${0.06 * (1 - dist / 120)})`
            ctx.lineWidth = 0.5
            ctx.stroke()
          }
        }
      }
      animId = requestAnimationFrame(draw)
    }

    draw()
    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
}

export default function Hero() {
  const handleNav = (href) => {
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{ background: 'radial-gradient(ellipse 80% 60% at 50% 0%, rgba(59,130,246,0.12) 0%, #030712 60%)' }}
    >
      {/* Grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(96,165,250,1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(96,165,250,1) 1px, transparent 1px)
          `,
          backgroundSize: '80px 80px',
        }}
      />

      {/* Particle canvas */}
      <div className="absolute inset-0">
        <ParticleCanvas />
      </div>

      {/* Radial glow center */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] rounded-full opacity-10 animate-glow pointer-events-none"
        style={{ background: 'radial-gradient(ellipse, rgba(99,102,241,0.8) 0%, transparent 70%)' }}
      />

      {/* Side accents */}
      <div className="absolute top-1/3 -left-32 w-96 h-96 rounded-full opacity-[0.06] blur-3xl"
        style={{ background: 'radial-gradient(circle, #3b82f6, transparent)' }} />
      <div className="absolute bottom-1/3 -right-32 w-96 h-96 rounded-full opacity-[0.06] blur-3xl"
        style={{ background: 'radial-gradient(circle, #8b5cf6, transparent)' }} />

      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 mb-8 animate-fade-up" style={{ animationDelay: '0.1s', animationFillMode: 'both' }}>
          <span className="section-tag">
            <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
            Studio Digital Indépendant
          </span>
        </div>

        {/* Main heading */}
        <h1
          className="font-black tracking-tight mb-6 leading-[0.95] animate-fade-up"
          style={{ animationDelay: '0.2s', animationFillMode: 'both', fontSize: 'clamp(3rem, 8vw, 7.5rem)' }}
        >
          <span className="block text-white">Des expériences</span>
          <span className="block text-gradient">digitales modernes,</span>
          <span className="block text-white/90">pensées pour marquer.</span>
        </h1>

        {/* Subtitle */}
        <p
          className="text-white/50 max-w-2xl mx-auto mb-10 leading-relaxed animate-fade-up"
          style={{ animationDelay: '0.35s', animationFillMode: 'both', fontSize: 'clamp(1rem, 2vw, 1.2rem)' }}
        >
          Lamblin Studio conçoit des sites web, applications interactives et plateformes numériques
          avec une attention particulière portée au design, à la performance et à l'expérience utilisateur.
        </p>

        {/* CTAs */}
        <div
          className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-up"
          style={{ animationDelay: '0.5s', animationFillMode: 'both' }}
        >
          <button onClick={() => handleNav('#projects')} className="btn-primary text-base px-8 py-4">
            Découvrir les projets
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </button>
          <button onClick={() => handleNav('#contact')} className="btn-secondary text-base px-8 py-4">
            Me contacter
          </button>
        </div>

        {/* Stats */}
        <div
          className="mt-20 flex flex-col sm:flex-row items-center justify-center gap-8 sm:gap-16 animate-fade-up"
          style={{ animationDelay: '0.65s', animationFillMode: 'both' }}
        >
          {[
            { value: '2', label: 'Projets en cours' },
            { value: '100%', label: 'Focus design' },
            { value: '∞', label: 'Ambition' },
          ].map((s) => (
            <div key={s.label} className="text-center">
              <div className="text-3xl font-black text-gradient-blue">{s.value}</div>
              <div className="text-white/40 text-sm mt-1 tracking-wide">{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-40">
        <span className="text-white/50 text-xs tracking-widest uppercase">Scroll</span>
        <div className="w-px h-12 relative overflow-hidden bg-white/10">
          <div className="w-full h-1/2 bg-gradient-to-b from-transparent to-blue-400 animate-[scrollDown_1.5s_ease_infinite]" />
        </div>
      </div>

      <style>{`
        @keyframes scrollDown {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(200%); }
        }
      `}</style>
    </section>
  )
}
