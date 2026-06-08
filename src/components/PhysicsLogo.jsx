import { useEffect, useRef } from 'react'

/**
 * Logo "ballon" interactif.
 * - Au repos : flotte doucement en boucle.
 * - Dès qu'on le touche : la gravité s'active, il tombe.
 * - On peut l'attraper et le lancer (drag & throw) ; il rebondit sur les bords
 *   et le sol de sa div parente et ne peut PAS en sortir.
 *
 * À placer comme enfant direct d'un conteneur `position: relative` (sa div).
 */
export default function PhysicsLogo({
  src,
  alt = '',
  size = 130,
  start = { xPct: 0.5, yPct: 0.3 },
  glow = 'rgba(96,165,250,0.5)',
  zIndex = 20,
}) {
  const ref = useRef(null)
  const raf = useRef(0)
  const s = useRef({
    x: 0, y: 0, vx: 0, vy: 0, ang: 0, va: 0,
    mode: 'float', dragging: false,
    t: Math.random() * 10, bx: 0, by: 0,
    last: null,
  })

  const container = () => ref.current?.parentElement

  const apply = () => {
    const el = ref.current
    if (!el) return
    const { x, y, ang } = s.current
    el.style.transform = `translate(${x - size / 2}px, ${y - size / 2}px) rotate(${ang}deg)`
  }

  useEffect(() => {
    const c = container()
    if (!c) return
    const rect = c.getBoundingClientRect()
    const r = size / 2
    const st = s.current
    st.x = Math.min(Math.max(rect.width * start.xPct, r), rect.width - r)
    st.y = Math.min(Math.max(rect.height * start.yPct, r), rect.height - r)
    st.bx = st.x
    st.by = st.y
    apply()

    const loop = () => {
      const c2 = container()
      if (c2) {
        const rc = c2.getBoundingClientRect()
        const W = rc.width
        const H = rc.height
        const r2 = size / 2
        const st2 = s.current

        if (st2.dragging) {
          // position pilotée par le pointeur (cf. onMove)
        } else if (st2.mode === 'float') {
          st2.t += 0.016
          st2.x = st2.bx + Math.sin(st2.t * 0.9) * 16
          st2.y = st2.by + Math.sin(st2.t * 1.4 + 1) * 12
          st2.ang = Math.sin(st2.t * 0.7) * 6
        } else {
          // ── Physique ──
          st2.vy += 0.55 // gravité
          st2.vx *= 0.999 // friction de l'air
          st2.x += st2.vx
          st2.y += st2.vy
          st2.ang += st2.va
          st2.va *= 0.985

          const e = 0.7 // rebond
          if (st2.x < r2) { st2.x = r2; st2.vx = -st2.vx * e; st2.va += st2.vy * 0.02 }
          if (st2.x > W - r2) { st2.x = W - r2; st2.vx = -st2.vx * e; st2.va -= st2.vy * 0.02 }
          if (st2.y < r2) { st2.y = r2; st2.vy = -st2.vy * e }
          if (st2.y > H - r2) {
            st2.y = H - r2
            st2.vy = -st2.vy * e
            st2.vx *= 0.96          // friction au sol (roulis)
            st2.va = st2.vx * 0.9   // roule
            if (Math.abs(st2.vy) < 1.4) st2.vy = 0
          }
        }
        apply()
      }
      raf.current = requestAnimationFrame(loop)
    }
    raf.current = requestAnimationFrame(loop)
    return () => cancelAnimationFrame(raf.current)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const onDown = (e) => {
    const st = s.current
    st.dragging = true
    st.mode = 'physics'
    e.currentTarget.setPointerCapture?.(e.pointerId)
    const rc = container().getBoundingClientRect()
    st.x = e.clientX - rc.left
    st.y = e.clientY - rc.top
    st.vx = 0; st.vy = 0; st.va = 0
    st.last = { x: e.clientX, y: e.clientY }
  }

  const onMove = (e) => {
    const st = s.current
    if (!st.dragging) return
    const rc = container().getBoundingClientRect()
    const ivx = e.clientX - st.last.x
    const ivy = e.clientY - st.last.y
    st.vx = st.vx * 0.4 + ivx * 0.6
    st.vy = st.vy * 0.4 + ivy * 0.6
    st.x = e.clientX - rc.left
    st.y = e.clientY - rc.top
    st.last = { x: e.clientX, y: e.clientY }
  }

  const onUp = () => {
    const st = s.current
    st.dragging = false
    const cap = 45
    st.vx = Math.max(-cap, Math.min(cap, st.vx))
    st.vy = Math.max(-cap, Math.min(cap, st.vy))
    st.va = st.vx * 0.6
  }

  return (
    <div
      ref={ref}
      onPointerDown={onDown}
      onPointerMove={onMove}
      onPointerUp={onUp}
      onPointerCancel={onUp}
      className="absolute top-0 left-0 cursor-grab active:cursor-grabbing"
      style={{ width: size, height: size, zIndex, touchAction: 'none', willChange: 'transform' }}
      aria-hidden="true"
    >
      <img
        src={src}
        alt={alt}
        draggable={false}
        className="w-full h-full object-contain pointer-events-none select-none"
        style={{ filter: `drop-shadow(0 10px 26px ${glow})` }}
      />
    </div>
  )
}
