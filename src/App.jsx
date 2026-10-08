import Header from './components/Header'
import Hero from './components/Hero'
import SevenFronts from './components/SevenFronts'
import PoliceVoleurs from './components/PoliceVoleurs'
import Objective from './components/Objective'
import ContactSection from './components/ContactSection'
import Footer from './components/Footer'

export default function App() {
  return (
    <>
      <a href="#contenu" className="skip-link">
        Aller au contenu
      </a>
      <Header />
      <main id="contenu" tabIndex={-1} className="outline-none">
        <Hero />
        <div id="jeux">
          <SevenFronts />
          <PoliceVoleurs />
        </div>
        <Objective />
        <ContactSection />
      </main>
      <Footer />
    </>
  )
}
