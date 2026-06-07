import Header from './components/Header'
import Hero from './components/Hero'
import ProjectShowcase from './components/ProjectShowcase'
import AboutSection from './components/AboutSection'
import ContactSection from './components/ContactSection'
import Footer from './components/Footer'

export default function App() {
  return (
    <div className="min-h-screen bg-[#030712]">
      <Header />
      <main>
        <Hero />
        <ProjectShowcase />
        <AboutSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  )
}
