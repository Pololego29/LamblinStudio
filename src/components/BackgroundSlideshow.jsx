import { useEffect, useState } from 'react'

/**
 * Enchaîne plusieurs images de fond en fondu croisé, à intervalle aléatoire
 * (5–9 s) pour un rythme naturel. Les images sont empilées en absolu.
 */
export default function BackgroundSlideshow({ images = [], fade = 2000 }) {
  const [active, setActive] = useState(0)

  useEffect(() => {
    if (images.length <= 1) return
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return

    let timer
    const schedule = () => {
      const delay = 5000 + Math.random() * 4000 // 5–9 s
      timer = setTimeout(() => {
        setActive((a) => (a + 1) % images.length)
        schedule()
      }, delay)
    }
    schedule()
    return () => clearTimeout(timer)
  }, [images.length])

  return (
    <div className="absolute inset-0">
      {images.map((src, i) => (
        <div
          key={src}
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(${src})`,
            opacity: i === active ? 1 : 0,
            transition: `opacity ${fade}ms ease-in-out`,
          }}
        />
      ))}
    </div>
  )
}
