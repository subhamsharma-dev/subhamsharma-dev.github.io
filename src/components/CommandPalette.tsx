import { useEffect, useMemo, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import {
  ArrowRight, Briefcase, Download, Github, Home, Linkedin, Mail, PenSquare, Twitter,
  type LucideIcon,
} from 'lucide-react'
import { profile } from '@/data/content'
import { cn } from '@/lib/cn'

type Command = {
  id: string
  label: string
  hint?: string
  icon: LucideIcon
  shortcut?: string
  action: (nav: ReturnType<typeof useNavigate>) => void
  keywords?: string
}

const COMMANDS: Command[] = [
  { id: 'home', label: 'Go to Home', icon: Home, action: (n) => n('/'), keywords: 'index landing' },
  { id: 'projects', label: 'View Projects', icon: Briefcase, action: (n) => n('/projects'), keywords: 'work case studies' },
  { id: 'contact', label: 'Get in touch', icon: Mail, action: (n) => n('/contact'), keywords: 'email hire interview' },
  { id: 'download-cv', label: 'Download CV (PDF)', icon: Download, action: () => window.open(profile.resumeUrl, '_blank'), keywords: 'resume' },
  { id: 'linkedin', label: 'Open LinkedIn', icon: Linkedin, action: () => window.open(profile.linkedin, '_blank') },
  { id: 'github', label: 'Open GitHub', icon: Github, action: () => window.open(profile.github, '_blank') },
  { id: 'twitter', label: 'Open Twitter / X', icon: Twitter, action: () => window.open(profile.twitter, '_blank') },
  { id: 'medium', label: 'Open Medium', icon: PenSquare, action: () => window.open(profile.medium, '_blank'), keywords: 'blog writing articles' },
  { id: 'email', label: `Email ${profile.email}`, icon: Mail, action: () => (window.location.href = `mailto:${profile.email}`) },
]

export default function CommandPalette({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [query, setQuery] = useState('')
  const [selected, setSelected] = useState(0)
  const nav = useNavigate()
  const inputRef = useRef<HTMLInputElement>(null)

  const filtered = useMemo(() => {
    const q = query.toLowerCase().trim()
    if (!q) return COMMANDS
    return COMMANDS.filter((c) =>
      c.label.toLowerCase().includes(q) || c.keywords?.toLowerCase().includes(q)
    )
  }, [query])

  useEffect(() => {
    if (open) {
      setQuery('')
      setSelected(0)
      setTimeout(() => inputRef.current?.focus(), 50)
    }
  }, [open])

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowDown') {
        e.preventDefault()
        setSelected((s) => Math.min(filtered.length - 1, s + 1))
      } else if (e.key === 'ArrowUp') {
        e.preventDefault()
        setSelected((s) => Math.max(0, s - 1))
      } else if (e.key === 'Enter') {
        e.preventDefault()
        const cmd = filtered[selected]
        if (cmd) {
          cmd.action(nav)
          onClose()
        }
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, filtered, selected, nav, onClose])

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 z-[130] flex items-start justify-center bg-black/60 px-4 pt-[12vh] backdrop-blur-md"
        >
          <motion.div
            initial={{ y: -10, scale: 0.97, opacity: 0 }}
            animate={{ y: 0, scale: 1, opacity: 1 }}
            exit={{ y: -10, scale: 0.97, opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={(e) => e.stopPropagation()}
            className="glass-strong w-full max-w-xl overflow-hidden rounded-2xl border border-white/15 shadow-2xl"
          >
            {/* Search */}
            <div className="flex items-center gap-3 border-b border-white/[0.06] px-4 py-4">
              <svg className="h-4 w-4 text-white/40" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <circle cx="11" cy="11" r="7" />
                <path d="m21 21-4.3-4.3" />
              </svg>
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => { setQuery(e.target.value); setSelected(0) }}
                placeholder="Type a command or search…"
                className="flex-1 bg-transparent text-sm text-white placeholder-white/35 outline-none"
              />
              <span className="hidden font-mono text-[10px] text-white/30 sm:inline">ESC</span>
            </div>

            {/* Results */}
            <ul className="max-h-80 overflow-y-auto p-2">
              {filtered.length === 0 ? (
                <li className="px-4 py-8 text-center text-sm text-white/40">No commands found.</li>
              ) : (
                filtered.map((cmd, i) => {
                  const Icon = cmd.icon
                  const isActive = i === selected
                  return (
                    <li key={cmd.id}>
                      <button
                        onMouseEnter={() => setSelected(i)}
                        onClick={() => { cmd.action(nav); onClose() }}
                        className={cn(
                          'flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left transition-colors',
                          isActive ? 'bg-white/[0.07] text-white' : 'text-white/70'
                        )}
                      >
                        <Icon className="h-4 w-4 shrink-0 text-white/60" />
                        <span className="flex-1 truncate text-sm">{cmd.label}</span>
                        {isActive && <ArrowRight className="h-3.5 w-3.5 text-accent-electric" />}
                      </button>
                    </li>
                  )
                })
              )}
            </ul>

            {/* Footer */}
            <div className="flex items-center justify-between border-t border-white/[0.06] px-4 py-2.5 text-[10px] uppercase tracking-wider text-white/35">
              <div className="flex gap-3">
                <span>↑↓ Navigate</span>
                <span>↵ Select</span>
              </div>
              <span className="font-mono">⌘K to open anywhere</span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
