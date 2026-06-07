import { useState, useEffect } from 'react'
import { SITE } from '../data/site'

const NAV_LINKS = [
  { label: 'Projets', href: '#projects', id: 'projects' },
  { label: 'À propos', href: '#about', id: 'about' },
  { label: 'Contact', href: '#contact', id: 'contact' },
]

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [active, setActive] = useState('home')

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Surligne le lien de la section actuellement visible
  useEffect(() => {
    const ids = ['home', 'projects', 'about', 'contact']
    const sections = ids.map((id) => document.getElementById(id)).filter(Boolean)
    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
        if (visible) setActive(visible.target.id)
      },
      { rootMargin: '-45% 0px -50% 0px', threshold: [0, 0.25, 0.5, 1] }
    )
    sections.forEach((s) => io.observe(s))
    return () => io.disconnect()
  }, [])

  const handleNav = (href) => {
    setMenuOpen(false)
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? 'py-3 glass border-b border-white/[0.06]' : 'py-5 bg-transparent'
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
        {/* Logo + wordmark */}
        <button onClick={() => handleNav('#home')} className="flex items-center gap-2.5 group">
          <img
            src="/brand/logo-web.png"
            alt="Lamblin Studio"
            className="h-10 w-10 object-contain transition-transform duration-300 group-hover:scale-110 select-none"
            draggable={false}
          />
          <span className="font-bold text-white tracking-tight text-lg">
            Lamblin<span className="text-gradient-blue"> Studio</span>
          </span>
        </button>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((l) => (
            <button
              key={l.href}
              onClick={() => handleNav(l.href)}
              className={`relative text-sm transition-colors duration-200 font-medium tracking-wide ${
                active === l.id ? 'text-white' : 'text-white/55 hover:text-white'
              }`}
            >
              {l.label}
              <span
                className="absolute -bottom-1.5 left-0 h-0.5 rounded-full bg-gradient-to-r from-blue-400 to-cyan-400 transition-all duration-300"
                style={{ width: active === l.id ? '100%' : '0%' }}
              />
            </button>
          ))}
        </nav>

        {/* CTA */}
        <div className="hidden md:flex items-center">
          <a href={`mailto:${SITE.email}`} className="btn-primary text-sm py-2.5 px-5">
            Me contacter
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </a>
        </div>

        {/* Mobile burger */}
        <button
          className="md:hidden p-2 text-white/70 hover:text-white transition-colors"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <div className="w-5 flex flex-col gap-1.5">
            <span className={`block h-0.5 bg-current transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
            <span className={`block h-0.5 bg-current transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`} />
            <span className={`block h-0.5 bg-current transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
          </div>
        </button>
      </div>

      {/* Mobile menu */}
      <div className={`md:hidden transition-all duration-300 overflow-hidden ${menuOpen ? 'max-h-80 opacity-100' : 'max-h-0 opacity-0'}`}>
        <div className="glass border-t border-white/[0.06] px-6 py-4 flex flex-col gap-4">
          {NAV_LINKS.map((l) => (
            <button
              key={l.href}
              onClick={() => handleNav(l.href)}
              className={`text-left transition-colors font-medium py-1 ${
                active === l.id ? 'text-white' : 'text-white/70 hover:text-white'
              }`}
            >
              {l.label}
            </button>
          ))}
          <a href={`mailto:${SITE.email}`} className="btn-primary justify-center mt-2">
            Me contacter
          </a>
        </div>
      </div>
    </header>
  )
}
