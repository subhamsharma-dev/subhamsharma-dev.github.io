import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import { useEffect, useState } from 'react'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import ScrollProgress from './components/ScrollProgress'
import LoadingScreen from './components/LoadingScreen'
import CommandPalette from './components/CommandPalette'
import Home from './pages/Home'
import ProjectsPage from './pages/ProjectsPage'
import ContactPage from './pages/ContactPage'

export default function App() {
  const location = useLocation()
  const [loading, setLoading] = useState(true)
  const [paletteOpen, setPaletteOpen] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 1100)
    return () => clearTimeout(t)
  }, [])

  // Keyboard shortcut: ⌘K / Ctrl+K
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        setPaletteOpen((o) => !o)
      }
      if (e.key === 'Escape') setPaletteOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  // Scroll to top on route change — use requestAnimationFrame so the new page
  // has time to mount before we scroll (otherwise we sometimes scroll past
  // the new page while the exit animation is still playing).
  useEffect(() => {
    requestAnimationFrame(() => {
      window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior })
    })
  }, [location.pathname])

  return (
    <>
      <AnimatePresence>{loading && <LoadingScreen key="loader" />}</AnimatePresence>
      <ScrollProgress />
      <Navbar onOpenPalette={() => setPaletteOpen(true)} />
      <CommandPalette open={paletteOpen} onClose={() => setPaletteOpen(false)} />

      <main className="relative z-10">
        {/*
          AnimatePresence: mode="wait" was causing flashes of blank content on some
          navigations. Using the default sync mode lets the new page mount immediately
          (under the exiting one) so users always see content during the transition.
        */}
        <AnimatePresence mode="sync" initial={false}>
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<Home />} />
            <Route path="/projects" element={<ProjectsPage />} />
            <Route path="/contact" element={<ContactPage />} />
          </Routes>
        </AnimatePresence>
      </main>

      <Footer />
    </>
  )
}
