import { lazy, Suspense, useCallback, useEffect, useState } from 'react'

// three.js + la scène sont chargés à la demande, après le premier rendu.
const HeroCoinLogo = lazy(() => import('./HeroCoinLogo'))

const STATIC_COIN = '/brand/otter-coin-512.webp'

function hasWebGL() {
  try {
    const c = document.createElement('canvas')
    return !!(window.WebGLRenderingContext && (c.getContext('webgl2') || c.getContext('webgl')))
  } catch {
    return false
  }
}

function usePrefersReducedMotion() {
  const query = '(prefers-reduced-motion: reduce)'
  const [reduced, setReduced] = useState(() => typeof window !== 'undefined' && window.matchMedia?.(query).matches)
  useEffect(() => {
    const mq = window.matchMedia?.(query)
    if (!mq) return
    const onChange = () => setReduced(mq.matches)
    mq.addEventListener?.('change', onChange)
    return () => mq.removeEventListener?.('change', onChange)
  }, [])
  return reduced
}

// Cadran gradué façon rapporteur d'état-major, derrière la pièce
function Dial() {
  const ticks = []
  for (let i = 0; i < 72; i++) {
    const a = (i * 5 * Math.PI) / 180
    const long = i % 9 === 0
    const r1 = 236
    const r2 = long ? 214 : 226
    ticks.push(
      <line
        key={i}
        x1={250 + r1 * Math.sin(a)}
        y1={250 - r1 * Math.cos(a)}
        x2={250 + r2 * Math.sin(a)}
        y2={250 - r2 * Math.cos(a)}
        strokeWidth={long ? 1.6 : 1}
      />,
    )
  }
  return (
    <svg viewBox="0 0 500 500" className="absolute inset-0 h-full w-full" aria-hidden="true">
      <g stroke="#e8e2d4" strokeOpacity="0.35" fill="none">
        <circle cx="250" cy="250" r="240" />
        <circle cx="250" cy="250" r="206" strokeDasharray="2 6" strokeOpacity="0.25" />
        {ticks}
        <path d="M250 0v28M250 472v28M0 250h28M472 250h28" strokeOpacity="0.55" />
      </g>
      <g
        fill="#a3abad"
        fontFamily="'IBM Plex Mono', ui-monospace, monospace"
        fontSize="13"
        fontWeight="500"
        textAnchor="middle"
      >
        <text x="250" y="46">N</text>
        <text x="462" y="255">E</text>
        <text x="250" y="466">S</text>
        <text x="38" y="255">O</text>
      </g>
    </svg>
  )
}

export default function CoinStage() {
  const reduced = usePrefersReducedMotion()
  const [mount3D, setMount3D] = useState(false)
  const [ready3D, setReady3D] = useState(false)
  const onReady = useCallback(() => setReady3D(true), [])

  // Monte la scène 3D à la première interaction (souris, toucher, clavier,
  // défilement) : le premier rendu reste léger, l'image statique est identique.
  useEffect(() => {
    if (reduced) {
      setMount3D(false)
      setReady3D(false)
      return
    }
    const events = ['pointermove', 'pointerdown', 'touchstart', 'keydown', 'wheel', 'scroll']
    const start = () => {
      cleanup()
      if (hasWebGL()) setMount3D(true)
    }
    const cleanup = () => events.forEach((e) => window.removeEventListener(e, start))
    events.forEach((e) => window.addEventListener(e, start, { once: true, passive: true }))
    return cleanup
  }, [reduced])

  return (
    <div className="relative mx-auto aspect-square w-full max-w-[min(340px,86vw)] sm:max-w-[440px] lg:max-w-[520px]">
      <Dial />
      {/* Image statique : premier rendu, mouvement réduit ou WebGL indisponible */}
      <img
        src={STATIC_COIN}
        alt="Pièce d'or à l'effigie de la loutre, emblème de Lamblin Studio"
        width="512"
        height="512"
        fetchpriority="high"
        decoding="async"
        className={`absolute left-[9%] top-[9%] h-[82%] w-[82%] select-none object-contain drop-shadow-[0_24px_40px_rgba(0,0,0,0.55)] transition-opacity duration-500 ${
          ready3D ? 'opacity-0' : 'opacity-100'
        }`}
        draggable="false"
      />
      {mount3D && (
        <div className={`absolute inset-0 transition-opacity duration-500 ${ready3D ? 'opacity-100' : 'opacity-0'}`}>
          <Suspense fallback={null}>
            <HeroCoinLogo onReady={onReady} />
          </Suspense>
        </div>
      )}
    </div>
  )
}
