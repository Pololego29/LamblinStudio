import { useEffect, useState } from 'react'

/**
 * Titre qui se morphe entre plusieurs phrases avec un effet de flou + fondu.
 * Les phrases sont empilées en absolu ; une phrase invisible (la plus longue)
 * sert à dimensionner le conteneur pour éviter tout saut de hauteur.
 *
 * phrases = [{ lead: 'Lamblin', accent: 'Studio' }, ...]
 */
export default function RotatingTitle({ phrases = [], interval = 4200, className = '', style = {} }) {
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
              filter: on ? 'blur(0px)' : 'blur(14px)',
              transform: on ? 'scale(1)' : 'scale(0.98)',
              transition: 'opacity 0.9s ease, filter 0.9s ease, transform 0.9s ease',
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
