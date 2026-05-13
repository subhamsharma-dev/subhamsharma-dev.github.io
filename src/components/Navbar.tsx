import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Command, Github, Linkedin, Mail } from 'lucide-react'
import { cn } from '@/lib/cn'
import { profile } from '@/data/content'

const NAV_ITEMS = [
  { label: 'Home', to: '/' },
  { label: 'Projects', to: '/projects' },
  { label: 'Resume', to: '/resume' },
  { label: 'Contact', to: '/contact' },
]

export default function Navbar({ onOpenPalette }: { onOpenPalette: () => void }) {
  const { pathname } = useLocation()
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => { setMobileOpen(false) }, [pathname])

  return (
    <motion.header
      initial={{ y: -32, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 1.0 }}
      className="fixed inset-x-0 top-3 z-[100] flex justify-center px-4"
    >
      <nav
        className={cn(
          'flex w-full max-w-5xl items-center justify-between rounded-full border px-4 py-2.5 transition-all duration-500',
          scrolled
            ? 'glass-strong border-white/10 shadow-card'
            : 'glass border-white/[0.06]'
        )}
      >
        {/* Brand */}
        <Link to="/" className="flex items-center gap-2.5 pl-1.5 pr-3" aria-label="Home">
          <div className="relative h-7 w-7 overflow-hidden rounded-md border border-white/10 bg-gradient-to-br from-accent-electric/30 via-ink-800 to-accent-violet/30">
            <span className="absolute inset-0 flex items-center justify-center font-mono text-[10px] font-bold text-white">
              SS
            </span>
          </div>
          <div className="hidden md:flex flex-col leading-none">
            <span className="text-sm font-semibold text-white">Subham Sharma</span>
            <span className="font-mono text-[10px] uppercase tracking-wider text-white/40">
              Software Engineer
            </span>
          </div>
        </Link>

        {/* Center nav */}
        <ul className="hidden items-center gap-1 md:flex">
          {NAV_ITEMS.map((item) => {
            const active = pathname === item.to
            return (
              <li key={item.to}>
                <Link
                  to={item.to}
                  className={cn(
                    'relative rounded-full px-3.5 py-1.5 text-sm transition-colors',
                    active ? 'text-white' : 'text-white/60 hover:text-white'
                  )}
                >
                  {active && (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute inset-0 rounded-full bg-white/[0.07]"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                  <span className="relative">{item.label}</span>
                </Link>
              </li>
            )
          })}
        </ul>

        {/* Right side */}
        <div className="flex items-center gap-1.5">
          <button
            onClick={onOpenPalette}
            className="hidden md:inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-[12px] text-white/55 transition-colors hover:border-white/20 hover:text-white"
            aria-label="Open command palette"
          >
            <Command className="h-3 w-3" />
            <span className="font-mono">⌘K</span>
          </button>

          <div className="hidden md:flex items-center gap-0.5 pl-1">
            <a href={profile.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub"
              className="rounded-full p-2 text-white/55 transition-colors hover:bg-white/[0.06] hover:text-white">
              <Github className="h-4 w-4" />
            </a>
            <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"
              className="rounded-full p-2 text-white/55 transition-colors hover:bg-white/[0.06] hover:text-white">
              <Linkedin className="h-4 w-4" />
            </a>
            <a href={`mailto:${profile.email}`} aria-label="Email"
              className="rounded-full p-2 text-white/55 transition-colors hover:bg-white/[0.06] hover:text-white">
              <Mail className="h-4 w-4" />
            </a>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileOpen((v) => !v)}
            className="md:hidden inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-white"
            aria-label="Toggle menu"
            aria-expanded={mobileOpen}
          >
            <div className="flex flex-col gap-1">
              <span className={cn('h-[1.5px] w-4 bg-white transition-transform', mobileOpen && 'translate-y-[5px] rotate-45')} />
              <span className={cn('h-[1.5px] w-4 bg-white transition-opacity', mobileOpen && 'opacity-0')} />
              <span className={cn('h-[1.5px] w-4 bg-white transition-transform', mobileOpen && '-translate-y-[5px] -rotate-45')} />
            </div>
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {mobileOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="fixed left-4 right-4 top-20 z-[99] md:hidden"
        >
          <div className="glass-strong rounded-2xl border border-white/10 p-3">
            <ul className="flex flex-col">
              {NAV_ITEMS.map((item) => (
                <li key={item.to}>
                  <Link
                    to={item.to}
                    className={cn(
                      'flex items-center justify-between rounded-xl px-4 py-3 text-sm transition-colors',
                      pathname === item.to ? 'bg-white/[0.06] text-white' : 'text-white/70 hover:bg-white/[0.04] hover:text-white'
                    )}
                  >
                    <span>{item.label}</span>
                    <span className="text-white/30">→</span>
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-2 flex justify-center gap-3 border-t border-white/10 pt-3">
              <a href={profile.github} target="_blank" rel="noopener noreferrer" className="rounded-full p-2 text-white/60 hover:text-white">
                <Github className="h-4 w-4" />
              </a>
              <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="rounded-full p-2 text-white/60 hover:text-white">
                <Linkedin className="h-4 w-4" />
              </a>
              <a href={`mailto:${profile.email}`} className="rounded-full p-2 text-white/60 hover:text-white">
                <Mail className="h-4 w-4" />
              </a>
            </div>
          </div>
        </motion.div>
      )}
    </motion.header>
  )
}
