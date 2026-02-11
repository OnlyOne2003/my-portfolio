"use client"
import Hero from '@/components/Hero'
import About from '@/components/About'
import Skills from '@/components/Skills'
import Experience from '@/components/Experience'
import Projects from '@/components/Projects'
import Contact from '@/components/Contact'
import Navigation from '@/components/Navigation'
import ParticlesBackground from '@/components/ParticlesBackground'

export default function Home() {
  return (
    <main className={`relative min-h-screen overflow-hidden bg-transparent`}>
      {/* Background Effects */}
      <ParticlesBackground />

      {/* Navigation */}
      <Navigation />


      {/* Sections */}
      <div className="relative z-10">
        <Hero />
        <About />
        <Skills />
        <Experience />
        <Projects />
        <Contact />
      </div>

      {/* Footer */}
      <footer className="relative z-10 py-8 text-center border-t border-white/10">
        <p className="text-gray-400">
          ساخته شده با ❤️ توسط یگانه موسوی • {new Date().getFullYear()}
        </p>
      </footer>
    </main>
  )
}