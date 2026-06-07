import { useEffect, useRef, useState } from 'react'

/**
 * Effet "hover reveal" : deux images superposées (même cadrage).
 * Au survol, un halo circulaire autour du curseur révèle `imageReveal`
 * par-dessus `imageBase`, bord doux (feather) + aura cyan.
 *
 * Le masque est défini dans le style (var CSS --rx / --ry) ; on ne met à jour
 * que ces variables (via ref + lissage rAF), sans re-render React → fluide.
 * Mobile : le halo suit le doigt (touche & glisse).
 */
export default function HoverRevealImage({ imageBase, imageReveal, alt = '', radius = 175, className = '' }) {
  const containerRef = useRef(null)
  const haloRef = useRef(null)

  const target = useRef({ x: 0, y: 0 })
  const current = useRef({ x: 0, y: 0 })
  const raf = useRef(null)
  const [active, setActive] = useState(false)

  const setVars = (x, y) => {
    const c = containerRef.current
    if (c) {
      c.style.setProperty('--rx', `${x}px`)
      c.style.setProperty('--ry', `${y}px`)
    }
    if (haloRef.current) haloRef.current.style.transform = `translate(${x}px, ${y}px) translate(-50%, -50%)`
  }

  const loop = () => {
    current.current.x += (target.current.x - current.current.x) * 0.18
    current.current.y += (target.current.y - current.current.y) * 0.18
    setVars(current.current.x, current.current.y)
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

  // Position initiale au centre
  useEffect(() => {
    const rect = containerRef.current?.getBoundingClientRect()
    if (rect) {
      const c = { x: rect.width / 2, y: rect.height / 2 }
      target.current = { ...c }
      current.current = { ...c }
      setVars(c.x, c.y)
    }
    return () => {
      if (raf.current) cancelAnimationFrame(raf.current)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const mask = `radial-gradient(circle ${radius}px at var(--rx, 50%) var(--ry, 50%), #000 0%, #000 42%, rgba(0,0,0,0.4) 62%, transparent 80%)`

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden ${className}`}
      style={{ '--rx': '50%', '--ry': '50%' }}
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
      {/* Image classique (visible par défaut, au-dessus) */}
      <img
        src={imageBase}
        alt={alt}
        className="absolute inset-0 w-full h-full object-cover select-none"
        draggable={false}
      />

      {/* Image modifiée (révélée dans le halo) */}
      <img
        src={imageReveal}
        alt=""
        aria-hidden="true"
        className="absolute inset-0 w-full h-full object-cover select-none"
        draggable={false}
        style={{
          opacity: active ? 1 : 0,
          transition: 'opacity 0.3s ease',
          WebkitMaskImage: mask,
          maskImage: mask,
          WebkitMaskRepeat: 'no-repeat',
          maskRepeat: 'no-repeat',
        }}
      />

      {/* Halo / aura cyan */}
      <div
        ref={haloRef}
        className="pointer-events-none absolute top-0 left-0 rounded-full"
        style={{
          width: radius * 2,
          height: radius * 2,
          border: '1px solid rgba(56,189,248,0.5)',
          boxShadow: '0 0 60px 14px rgba(56,189,248,0.22), inset 0 0 60px rgba(56,189,248,0.18)',
          opacity: active ? 1 : 0,
          transition: 'opacity 0.4s ease',
        }}
      />
    </div>
  )
}
