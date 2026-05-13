import { Routes, Route, useLocation, useNavigate } from 'react-router-dom'
import { AnimatePresence, MotionConfig } from 'framer-motion'
import { useEffect, useState } from 'react'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import ScrollProgress from './components/ScrollProgress'
import LoadingScreen from './components/LoadingScreen'
import CommandPalette from './components/CommandPalette'
import Home from './pages/Home'
import NotFound from './pages/NotFound'

/**
 * Old route paths that used to be standalone pages — now sections on home.
 * Hitting these URLs (e.g. from a bookmark) redirects to home and scrolls
 * to the matching section so old links still land somewhere useful.
 */
function RedirectToSection({ section }: { section: string }) {
  const navigate = useNavigate()
  useEffect(() => {
    navigate('/', { replace: true })
    // Wait one frame for the home route to mount, then scroll
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        document.getElementById(section)?.scrollIntoView({ behavior: 'smooth' })
      })
    })
  }, [navigate, section])
  return null
}

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

  // Scroll to top on route change (after the new page mounts)
  useEffect(() => {
    requestAnimationFrame(() => {
      window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior })
    })
  }, [location.pathname])

  return (
    // MotionConfig with reducedMotion="user" tells every Framer Motion component
    // in the tree to skip animations when the user has prefers-reduced-motion set.
    <MotionConfig reducedMotion="user">
      <AnimatePresence>{loading && <LoadingScreen key="loader" />}</AnimatePresence>
      <ScrollProgress />
      <Navbar onOpenPalette={() => setPaletteOpen(true)} />
      <CommandPalette open={paletteOpen} onClose={() => setPaletteOpen(false)} />

      <main className="relative z-10">
        <Routes>
          <Route path="/" element={<Home />} />
          {/* Backward-compat: old standalone pages → redirect to home + scroll to section */}
          <Route path="/projects" element={<RedirectToSection section="projects" />} />
          <Route path="/contact" element={<RedirectToSection section="contact" />} />
          {/* Catch-all 404 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>

      <Footer />
    </MotionConfig>
  )
}
