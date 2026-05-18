import Header from './components/Header'
import Hero from './components/Hero'
import ProjectShowcase from './components/ProjectShowcase'
import StudioSection from './components/StudioSection'
import ServicesSection from './components/ServicesSection'
import ContactSection from './components/ContactSection'
import Footer from './components/Footer'

export default function App() {
  return (
    <div className="min-h-screen bg-[#030712]">
      <Header />
      <main>
        <Hero />
        <ProjectShowcase />
        <StudioSection />
        <ServicesSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  )
}
