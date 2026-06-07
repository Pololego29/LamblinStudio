import { SITE } from '../data/site'
import Reveal from './Reveal'
import HoverRevealImage from './HoverRevealImage'

export default function RevealSection() {
  return (
    <section className="py-28 px-6 relative overflow-hidden">
      {/* Accent cyan ambiant */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] rounded-full opacity-[0.06] blur-3xl pointer-events-none"
        style={{ background: 'radial-gradient(ellipse, #22d3ee, transparent)' }}
      />

      <div className="max-w-6xl mx-auto relative z-10">
        <Reveal className="text-center mb-10">
          <div className="section-tag mb-4 mx-auto w-fit">Exploration</div>
          <h2
            className="font-black text-white tracking-tight leading-none"
            style={{ fontSize: 'clamp(2.2rem, 4.5vw, 3.6rem)' }}
          >
            Un monde <span className="text-gradient">caché.</span>
          </h2>
          <p className="text-white/40 text-sm mt-4 max-w-md mx-auto">
            Passe la souris sur l'image — un portail révèle sa version futuriste.
            <span className="md:hidden"> (Sur mobile : touche &amp; glisse.)</span>
          </p>
        </Reveal>

        <Reveal
          className="rounded-3xl overflow-hidden"
          style={{ border: '1px solid rgba(56,189,248,0.18)', boxShadow: '0 30px 90px -40px rgba(56,189,248,0.35)' }}
        >
          <HoverRevealImage
            imageBase={SITE.reveal.base}
            imageReveal={SITE.reveal.futur}
            alt="Vue naturelle révélant une version futuriste"
            className="w-full h-[58vh] min-h-[360px] cursor-crosshair"
          />
        </Reveal>
      </div>
    </section>
  )
}
