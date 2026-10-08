import { SITE } from '../data/site'

export default function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="ruler" aria-hidden="true" />
      <div className="container-page flex flex-col gap-8 py-10 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-3">
          <img
            src="/brand/otter-octagon-128.webp"
            alt=""
            width="29"
            height="32"
            loading="lazy"
            decoding="async"
            className="h-8 w-auto"
          />
          <div>
            <p className="font-display text-xl font-bold uppercase leading-none tracking-wide text-bone">{SITE.name}</p>
            <p className="mt-1 text-sm text-muted">Studio indépendant de jeux vidéo</p>
          </div>
        </div>

        <nav aria-label="Liens du pied de page">
          <ul className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
            <li><a href="#jeux" className="text-muted hover:text-bone">Jeux</a></li>
            <li><a href="#studio" className="text-muted hover:text-bone">Studio</a></li>
            <li><a href="#contact" className="text-muted hover:text-bone">Contact</a></li>
            <li>
              <a href={SITE.github} target="_blank" rel="noopener noreferrer" className="text-muted hover:text-bone">
                GitHub<span className="sr-only"> (nouvel onglet)</span>
              </a>
            </li>
            <li>
              <a href={SITE.linkedin} target="_blank" rel="noopener noreferrer" className="text-muted hover:text-bone">
                LinkedIn<span className="sr-only"> (nouvel onglet)</span>
              </a>
            </li>
          </ul>
        </nav>
      </div>
      <div className="container-page flex flex-col gap-2 border-t border-line py-5 text-[0.8rem] text-muted sm:flex-row sm:items-center sm:justify-between">
        <p>© {new Date().getFullYear()} {SITE.name}</p>
        <p>
          <a href={SITE.portfolio} className="underline decoration-line underline-offset-4 hover:text-bone hover:decoration-gold">
            Portfolio de {SITE.owner}
          </a>
        </p>
      </div>
    </footer>
  )
}
