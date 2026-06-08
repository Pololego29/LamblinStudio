import Header from './components/Header'
import Hero from './components/Hero'
import ProjectShowcase from './components/ProjectShowcase'
import AboutSection from './components/AboutSection'
import ContactSection from './components/ContactSection'
import Footer from './components/Footer'

export default function App() {
  return (
    <div className="relative min-h-screen">
      {/* Backdrop ambiant continu (fixe, derrière le contenu) :
          évite tout "noir plat" entre les sections. */}
      <div
        className="fixed inset-0 z-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(820px 620px at 12% 10%, rgba(99,102,241,0.16), transparent 58%),
            radial-gradient(760px 600px at 88% 26%, rgba(56,189,248,0.13), transparent 58%),
            radial-gradient(900px 700px at 50% 58%, rgba(139,92,246,0.13), transparent 60%),
            radial-gradient(820px 620px at 18% 88%, rgba(59,130,246,0.12), transparent 58%)
          `,
        }}
      />

      {/* Contenu au-dessus du backdrop */}
      <div className="relative z-10">
        <Header />
        <main>
          <Hero />
          <ProjectShowcase />
          <AboutSection />
          <ContactSection />
        </main>
        <Footer />
      </div>
    </div>
  )
}
