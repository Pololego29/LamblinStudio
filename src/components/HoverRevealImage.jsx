import { useEffect, useRef, useState } from 'react'

/**
 * Effet "hover reveal" : deux images superposées (même cadrage).
 * Au survol, un halo circulaire autour du curseur révèle l'image `imageReveal`
 * par-dessus `imageBase`, avec un bord doux (feather) et une aura cyan.
 *
 * - imageBase   : image visible par défaut
 * - imageReveal : image révélée dans le halo
 * - radius      : rayon du halo en px
 *
 * Position suivie en CSS (mask radial-gradient) + lissage par lerp/rAF,
 * sans re-render React à chaque mouvement → fluide et léger.
 * Mobile : le halo suit le doigt (tap & glisse).
 */
export default function HoverRevealImage({ imageBase, imageReveal, alt = '', radius = 175, className = '' }) {
  const containerRef = useRef(null)
  const revealRef = useRef(null)
  const haloRef = useRef(null)

  const target = useRef({ x: 0, y: 0 })
  const current = useRef({ x: 0, y: 0 })
  const raf = useRef(null)
  const [active, setActive] = useState(false)

  const apply = () => {
    const { x, y } = current.current
    const mask = `radial-gradient(circle ${radius}px at ${x}px ${y}px, #000 0%, #000 42%, rgba(0,0,0,0.35) 62%, transparent 80%)`
    const el = revealRef.current
    if (el) {
      el.style.maskImage = mask
      el.style.webkitMaskImage = mask
    }
    const h = haloRef.current
    if (h) h.style.transform = `translate(${x}px, ${y}px) translate(-50%, -50%)`
  }

  const loop = () => {
    // lissage : on rapproche doucement la position courante de la cible
    current.current.x += (target.current.x - current.current.x) * 0.18
    current.current.y += (target.current.y - current.current.y) * 0.18
    apply()
    raf.current = requestAnimationFrame(loop)
  }

  const start = () => {
    setActive(true)
    if (!raf.current) raf.current = requestAnimationFrame(loop)
  }
  const stop = () => {
    setActive(false)
    if (raf.current) {
      cancelAnimationFrame(raf.current)
      raf.current = null
    }
  }

  const setTarget = (clientX, clientY) => {
    const rect = containerRef.current?.getBoundingClientRect()
    if (!rect) return
    target.current = { x: clientX - rect.left, y: clientY - rect.top }
  }

  // Position initiale au centre (halo prêt même avant le 1er survol)
  useEffect(() => {
    const rect = containerRef.current?.getBoundingClientRect()
    if (rect) {
      const c = { x: rect.width / 2, y: rect.height / 2 }
      target.current = { ...c }
      current.current = { ...c }
      apply()
    }
    return () => {
      if (raf.current) cancelAnimationFrame(raf.current)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden ${className}`}
      onMouseEnter={(e) => {
        setTarget(e.clientX, e.clientY)
        current.current = { ...target.current }
        start()
      }}
      onMouseMove={(e) => setTarget(e.clientX, e.clientY)}
      onMouseLeave={stop}
      onTouchStart={(e) => {
        const t = e.touches[0]
        if (!t) return
        setTarget(t.clientX, t.clientY)
        current.current = { ...target.current }
        start()
      }}
      onTouchMove={(e) => {
        const t = e.touches[0]
        if (t) setTarget(t.clientX, t.clientY)
      }}
      onTouchEnd={stop}
    >
      {/* Image naturelle (visible par défaut) */}
      <img
        src={imageBase}
        alt={alt}
        className="absolute inset-0 w-full h-full object-cover select-none"
        draggable={false}
      />

      {/* Image futuriste (révélée par le masque) */}
      <img
        ref={revealRef}
        src={imageReveal}
        alt=""
        aria-hidden="true"
        className="absolute inset-0 w-full h-full object-cover select-none"
        draggable={false}
        style={{
          opacity: active ? 1 : 0,
          transition: 'opacity 0.35s ease',
          maskRepeat: 'no-repeat',
          WebkitMaskRepeat: 'no-repeat',
        }}
      />

      {/* Halo / aura cyan autour du curseur */}
      <div
        ref={haloRef}
        className="pointer-events-none absolute top-0 left-0 rounded-full"
        style={{
          width: radius * 2,
          height: radius * 2,
          border: '1px solid rgba(56,189,248,0.45)',
          boxShadow:
            '0 0 60px 14px rgba(56,189,248,0.22), inset 0 0 60px rgba(56,189,248,0.18)',
          opacity: active ? 1 : 0,
          transition: 'opacity 0.4s ease',
        }}
      />
    </div>
  )
}
