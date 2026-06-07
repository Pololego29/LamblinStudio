import { SITE } from '../data/site'

const QUICK_LINKS = [
  { label: 'Projets', href: '#projects' },
  { label: 'À propos', href: '#about' },
  { label: 'Contact', href: '#contact' },
]

export default function Footer() {
  const handleNav = (href) => {
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <footer className="relative border-t border-white/[0.05] px-6 py-12">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 mb-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2.5 mb-2">
              <img
                src="/brand/logo-web.png"
                alt="Lamblin Studio"
                className="h-8 w-8 object-contain select-none"
                draggable={false}
              />
              <span className="font-bold text-white">
                Lamblin<span className="text-gradient-blue"> Studio</span>
              </span>
            </div>
            <p className="text-white/25 text-xs max-w-xs leading-relaxed">
              Sites web, applications web et iOS — du design à la mise en ligne.
            </p>
          </div>

          {/* Quick links */}
          <nav className="flex flex-wrap gap-x-6 gap-y-2">
            {QUICK_LINKS.map((l) => (
              <button
                key={l.href}
                onClick={() => handleNav(l.href)}
                className="text-white/30 hover:text-white/70 text-sm transition-colors duration-200"
              >
                {l.label}
              </button>
            ))}
            <a
              href={`mailto:${SITE.email}`}
              className="text-white/30 hover:text-white/70 text-sm transition-colors duration-200"
            >
              Email
            </a>
          </nav>
        </div>

        {/* Bottom bar */}
        <div className="pt-6 border-t border-white/[0.04] flex flex-col sm:flex-row items-center justify-between gap-3">
          <span className="text-white/20 text-xs">© 2026 Lamblin Studio. Tous droits réservés.</span>
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
            <span className="text-white/20 text-xs">Disponible pour de nouveaux projets</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
