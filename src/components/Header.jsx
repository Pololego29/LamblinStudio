import { useEffect, useState } from 'react'
import { SITE } from '../data/site'

const NAV = [
  { label: 'Jeux', id: 'jeux' },
  { label: 'Studio', id: 'studio' },
  { label: 'Contact', id: 'contact' },
]

export default function Header() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [active, setActive] = useState('')

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Lien actif selon la section visible
  useEffect(() => {
    const els = NAV.map((n) => document.getElementById(n.id)).filter(Boolean)
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id)
        })
      },
      { rootMargin: '-45% 0px -50% 0px' },
    )
    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])

  // Fermer le menu mobile avec Échap
  useEffect(() => {
    if (!open) return
    const onKey = (e) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b transition-colors duration-200 ${
        scrolled || open ? 'border-line bg-ink-950/95 backdrop-blur' : 'border-transparent bg-transparent'
      }`}
    >
      <div className="container-page flex h-[var(--header-h)] items-center justify-between gap-4">
        <a href="#top" className="flex items-center gap-3" onClick={() => setOpen(false)}>
          <img
            src="/brand/otter-octagon-128.webp"
            alt=""
            width="36"
            height="40"
            className="h-10 w-9 object-contain"
            decoding="async"
          />
          <span className="font-display text-[1.45rem] font-bold uppercase leading-none tracking-wide text-bone">
            {SITE.name}
          </span>
        </a>

        <nav aria-label="Navigation principale" className="hidden md:block">
          <ul className="flex items-center gap-1">
            {NAV.map((n) => (
              <li key={n.id}>
                <a
                  href={`#${n.id}`}
                  aria-current={active === n.id ? 'true' : undefined}
                  className={`relative block px-4 py-2 text-[0.95rem] font-medium transition-colors ${
                    active === n.id ? 'text-bone' : 'text-muted hover:text-bone'
                  }`}
                >
                  {n.label}
                  <span
                    aria-hidden="true"
                    className={`absolute inset-x-4 -bottom-0.5 h-0.5 bg-gold transition-opacity ${
                      active === n.id ? 'opacity-100' : 'opacity-0'
                    }`}
                  />
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <button
          type="button"
          className="-mr-2 flex h-11 w-11 items-center justify-center text-bone md:hidden"
          aria-expanded={open}
          aria-controls="menu-mobile"
          aria-label={open ? 'Fermer le menu' : 'Ouvrir le menu'}
          onClick={() => setOpen((v) => !v)}
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            {open ? <path d="M6 6l12 12M18 6 6 18" /> : <path d="M3 7h18M3 12h18M3 17h18" />}
          </svg>
        </button>
      </div>

      <nav
        id="menu-mobile"
        aria-label="Navigation mobile"
        hidden={!open}
        className="border-t border-line bg-ink-950 md:hidden"
      >
        <ul className="container-page flex flex-col py-2">
          {NAV.map((n) => (
            <li key={n.id}>
              <a
                href={`#${n.id}`}
                onClick={() => setOpen(false)}
                className="block border-b border-line/60 py-3.5 font-display text-2xl font-semibold uppercase tracking-wide text-bone last:border-0"
              >
                {n.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  )
}
