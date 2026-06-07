import { useEffect, useRef } from 'react'

/**
 * Effet "hover reveal" : deux images superposées (même cadrage).
 * Au survol, un cercle autour du curseur révèle `imageReveal` par-dessus
 * `imageBase`, bord doux (feather) + aura cyan.
 *
 * 100 % impératif : aucun state React → aucun re-render pendant l'interaction.
 * Le mask-image est réécrit en entier à chaque frame (chaîne complète, pas une
 * var CSS) → repeint de façon fiable même en compositing GPU.
 * Le cercle s'ouvre/se ferme via son rayon (0 = rien de révélé).
 * Mobile : le halo suit le doigt (touche & glisse).
 */
export default function HoverRevealImage({ imageBase, imageReveal, alt = '', radius = 175, className = '' }) {
  const containerRef = useRef(null)
  const revealRef = useRef(null)
  const haloRef = useRef(null)

  const target = useRef({ x: 0, y: 0 })
  const current = useRef({ x: 0, y: 0 })
  const rTarget = useRef(0)
  const rCur = useRef(0)
  const active = useRef(false)
  const raf = useRef(null)

  const apply = () => {
    const x = current.current.x
    const y = current.current.y
    const r = rCur.current
    const inner = Math.max(0, r * 0.42)
    const mid = Math.max(0, r * 0.62)
    const mask = `radial-gradient(circle ${r}px at ${x}px ${y}px, #000 0px, #000 ${inner}px, rgba(0,0,0,0.4) ${mid}px, transparent ${r}px)`
    const el = revealRef.current
    if (el) {
      el.style.webkitMaskImage = mask
      el.style.maskImage = mask
    }
    const h = haloRef.current
    if (h) {
      const k = radius ? r / radius : 0
      h.style.transform = `translate(${x}px, ${y}px) translate(-50%, -50%) scale(${0.6 + 0.4 * k})`
      h.style.opacity = String(k)
    }
  }

  const loop = () => {
    current.current.x += (target.current.x - current.current.x) * 0.2
    current.current.y += (target.current.y - current.current.y) * 0.2
    rCur.current += (rTarget.current - rCur.current) * 0.18
    apply()
    // continue tant qu'actif, ou tant que le cercle n'est pas refermé
    if (active.current || rCur.current > 0.6) {
      raf.current = requestAnimationFrame(loop)
    } else {
      rCur.current = 0
      apply()
      raf.current = null
    }
  }

  const ensureLoop = () => {
    if (!raf.current) raf.current = requestAnimationFrame(loop)
  }

  const setTarget = (clientX, clientY) => {
    const rect = containerRef.current?.getBoundingClientRect()
    if (!rect) return
    target.current = { x: clientX - rect.left, y: clientY - rect.top }
  }

  const open = (clientX, clientY) => {
    setTarget(clientX, clientY)
    current.current = { ...target.current }
    active.current = true
    rTarget.current = radius
    ensureLoop()
  }
  const close = () => {
    active.current = false
    rTarget.current = 0
    ensureLoop()
  }

  useEffect(() => {
    const rect = containerRef.current?.getBoundingClientRect()
    if (rect) {
      const c = { x: rect.width / 2, y: rect.height / 2 }
      target.current = { ...c }
      current.current = { ...c }
      apply() // cercle fermé au repos
    }
    return () => {
      if (raf.current) cancelAnimationFrame(raf.current)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Si le parent fournit déjà une position (absolute/fixed/relative/sticky),
  // on ne force pas "relative" (sinon il écraserait un "absolute" voulu).
  const hasPosition = /(^|\s)(absolute|fixed|relative|sticky)(\s|$)/.test(className)

  return (
    <div
      ref={containerRef}
      className={`overflow-hidden ${hasPosition ? '' : 'relative'} ${className}`}
      onMouseEnter={(e) => open(e.clientX, e.clientY)}
      onMouseMove={(e) => setTarget(e.clientX, e.clientY)}
      onMouseLeave={close}
      onTouchStart={(e) => {
        const t = e.touches[0]
        if (t) open(t.clientX, t.clientY)
      }}
      onTouchMove={(e) => {
        const t = e.touches[0]
        if (t) setTarget(t.clientX, t.clientY)
      }}
      onTouchEnd={close}
    >
      {/* Image classique (visible par défaut) */}
      <img
        src={imageBase}
        alt={alt}
        className="absolute inset-0 w-full h-full object-cover select-none"
        draggable={false}
      />

      {/* Image modifiée (révélée dans le cercle) */}
      <img
        ref={revealRef}
        src={imageReveal}
        alt=""
        aria-hidden="true"
        className="absolute inset-0 w-full h-full object-cover select-none"
        draggable={false}
        style={{ WebkitMaskRepeat: 'no-repeat', maskRepeat: 'no-repeat' }}
      />

      {/* Halo / aura cyan */}
      <div
        ref={haloRef}
        className="pointer-events-none absolute top-0 left-0 rounded-full"
        style={{
          width: radius * 2,
          height: radius * 2,
          opacity: 0,
          border: '1px solid rgba(56,189,248,0.5)',
          boxShadow: '0 0 60px 14px rgba(56,189,248,0.22), inset 0 0 60px rgba(56,189,248,0.18)',
        }}
      />
    </div>
  )
}
