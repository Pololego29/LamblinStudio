const QUICK_LINKS = [
  { label: 'Accueil', href: '#home' },
  { label: 'Projets', href: '#projects' },
  { label: 'Studio', href: '#studio' },
  { label: 'Services', href: '#services' },
  { label: 'Contact', href: '#contact' },
]

export default function Footer() {
  const handleNav = (href) => {
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <footer className="relative border-t border-white/[0.05] px-6 py-12">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 mb-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2.5 mb-2">
              <div
                className="w-7 h-7 rounded-lg flex items-center justify-center"
                style={{ background: 'linear-gradient(135deg, #3b82f6, #6366f1)' }}
              >
                <span className="text-white font-black text-xs">L</span>
              </div>
              <span className="font-bold text-white">
                Lamblin<span className="text-gradient-blue"> Studio</span>
              </span>
            </div>
            <p className="text-white/25 text-xs max-w-xs leading-relaxed">
              Studio digital indépendant — sites web, applications et expériences numériques modernes.
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
          </nav>
        </div>

        {/* Bottom bar */}
        <div className="pt-6 border-t border-white/[0.04] flex flex-col sm:flex-row items-center justify-between gap-3">
          <span className="text-white/20 text-xs">© 2026 Lamblin Studio. All rights reserved.</span>
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
            <span className="text-white/20 text-xs">Available for new projects</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
