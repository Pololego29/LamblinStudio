import { useEffect, useState } from 'react'

/**
 * Titre qui se morphe entre plusieurs phrases avec un effet de flou + fondu.
 * Les phrases sont empilées en absolu ; une phrase invisible (la plus longue)
 * sert à dimensionner le conteneur pour éviter tout saut de hauteur.
 *
 * phrases = [{ lead: 'Lamblin', accent: 'Studio' }, ...]
 */
export default function RotatingTitle({ phrases = [], interval = 3800, className = '', style = {} }) {
  const [active, setActive] = useState(0)

  useEffect(() => {
    if (phrases.length <= 1) return
    const id = setInterval(() => setActive((a) => (a + 1) % phrases.length), interval)
    return () => clearInterval(id)
  }, [phrases.length, interval])

  const label = (p) => `${p.lead} ${p.accent}`
  const longest = phrases.reduce((max, p) => (label(p).length > max.length ? label(p) : max), '')

  return (
    <h1 className={`relative ${className}`} style={style}>
      {/* Sizer invisible : donne sa taille au conteneur */}
      <span className="invisible" aria-hidden="true">{longest}</span>

      {phrases.map((p, i) => {
        const on = i === active
        return (
          <span
            key={label(p)}
            className="absolute inset-0 flex items-center justify-center text-center"
            style={{
              opacity: on ? 1 : 0,
              filter: on ? 'blur(0px)' : 'blur(22px)',
              transform: on ? 'translateY(0) scale(1)' : 'translateY(16px) scale(0.94)',
              letterSpacing: on ? '0em' : '0.04em',
              transition:
                'opacity 1.1s cubic-bezier(0.2,0.7,0.2,1), filter 1.1s cubic-bezier(0.2,0.7,0.2,1), transform 1.1s cubic-bezier(0.2,0.7,0.2,1), letter-spacing 1.1s ease',
              pointerEvents: 'none',
            }}
          >
            <span>
              <span className="text-white">{p.lead}</span>
              <span> </span>
              <span className="text-gradient">{p.accent}</span>
            </span>
          </span>
        )
      })}
    </h1>
  )
}
