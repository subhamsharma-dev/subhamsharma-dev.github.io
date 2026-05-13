import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, Download, MapPin, Sparkles } from 'lucide-react'
import { Link } from 'react-router-dom'
import { profile, heroStats } from '@/data/content'
import NetworkGraph from './NetworkGraph'

export default function Hero() {
  const [roleIndex, setRoleIndex] = useState(0)
  const [displayedRole, setDisplayedRole] = useState('')
  const [phase, setPhase] = useState<'typing' | 'pause' | 'deleting'>('typing')

  // Typing effect for rotating roles
  useEffect(() => {
    const currentRole = profile.rotatingRoles[roleIndex]
    let timeout: number

    if (phase === 'typing') {
      if (displayedRole.length < currentRole.length) {
        timeout = window.setTimeout(() => {
          setDisplayedRole(currentRole.slice(0, displayedRole.length + 1))
        }, 55)
      } else {
        timeout = window.setTimeout(() => setPhase('pause'), 1600)
      }
    } else if (phase === 'pause') {
      timeout = window.setTimeout(() => setPhase('deleting'), 400)
    } else {
      if (displayedRole.length > 0) {
        timeout = window.setTimeout(() => {
          setDisplayedRole(displayedRole.slice(0, -1))
        }, 28)
      } else {
        setRoleIndex((i) => (i + 1) % profile.rotatingRoles.length)
        setPhase('typing')
      }
    }

    return () => clearTimeout(timeout)
  }, [displayedRole, phase, roleIndex])

  return (
    <section className="relative overflow-hidden pt-32 pb-16 md:pt-40 md:pb-24">
      {/* Atmospheric backgrounds */}
      <div className="grid-bg absolute inset-0 -z-10 opacity-50" aria-hidden="true" />
      <div className="absolute inset-x-0 top-0 -z-10 h-[600px] bg-aurora" aria-hidden="true" />

      <div className="container-page">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-[1.1fr_1fr] lg:gap-16">
          {/* LEFT — text */}
          <div className="relative">
            {/* Availability badge */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.6 }}
              className="inline-flex items-center gap-2.5 rounded-full border border-emerald-400/20 bg-emerald-400/[0.06] px-3 py-1.5"
            >
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
              </span>
              <span className="text-[11px] font-medium uppercase tracking-[0.15em] text-emerald-300/90">
                Open to opportunities
              </span>
              <span className="ml-1 h-3 w-px bg-emerald-400/30" />
              <span className="flex items-center gap-1 text-[11px] text-emerald-300/70">
                <MapPin className="h-2.5 w-2.5" />
                {profile.location}
              </span>
            </motion.div>

            {/* Name + Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.7 }}
              className="mt-6 font-display text-5xl font-bold tracking-tightest text-white sm:text-6xl lg:text-7xl"
            >
              <span className="block text-gradient-subtle">{profile.name}</span>
              <span className="mt-2 block text-gradient">
                Architecting Production AI &amp; Cloud Systems
              </span>
            </motion.h1>

            {/* Rotating role */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="mt-6 flex items-center gap-3"
            >
              <span className="font-mono text-xs uppercase tracking-[0.2em] text-white/30">
                Role
              </span>
              <span className="h-px w-6 bg-white/15" />
              <span className="font-mono text-sm text-accent-electric typing-cursor">
                {displayedRole || '\u00A0'}
              </span>
            </motion.div>

            {/* Subheadline */}
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.55, duration: 0.7 }}
              className="mt-8 max-w-xl text-lg leading-relaxed text-white/65"
            >
              Software Engineer with <span className="text-white">{profile.yearsExperience} years</span> building
              <span className="text-white"> AI platforms</span>,
              <span className="text-white"> distributed systems</span>, and
              <span className="text-white"> HIPAA-compliant infrastructure</span> across
              <span className="text-white"> AWS</span> and
              <span className="text-white"> Azure</span> — from proof-of-concept to production.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.6 }}
              className="mt-10 flex flex-wrap items-center gap-3"
            >
              <Link to="/projects" className="btn-primary group">
                <span>View Projects</span>
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Link>

              <a href={profile.resumeUrl} download className="btn-ghost group">
                <Download className="h-4 w-4" />
                <span>Download Resume</span>
              </a>

              <Link to="/contact" className="group inline-flex items-center gap-2 px-2 py-2 text-sm font-medium text-white/65 transition-colors hover:text-white">
                <span>Book interview</span>
                <span className="opacity-50 transition-opacity group-hover:opacity-100">↗</span>
              </Link>
            </motion.div>

            {/* Tech ticker */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.0, duration: 0.8 }}
              className="mt-12 flex items-center gap-4 text-[11px] uppercase tracking-[0.2em] text-white/30"
            >
              <Sparkles className="h-3 w-3 text-accent-electric" />
              <span>Trusted with production systems at scale</span>
            </motion.div>
          </div>

          {/* RIGHT — Network graph */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
            className="relative"
          >
            <NetworkGraph />
          </motion.div>
        </div>

        {/* Quick stats strip */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1, duration: 0.8 }}
          className="mt-20 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-white/[0.06] bg-white/[0.02] sm:grid-cols-3 lg:grid-cols-6"
        >
          {heroStats.map((stat, i) => (
            <div
              key={stat.label}
              className="relative bg-ink-950/40 p-5 backdrop-blur transition-colors hover:bg-white/[0.02]"
              style={{ animationDelay: `${i * 80}ms` }}
            >
              <div className="font-display text-2xl font-bold text-gradient">{stat.value}</div>
              <div className="mt-1 text-[11px] uppercase tracking-wider text-white/60">{stat.label}</div>
              <div className="mt-0.5 text-[10px] text-white/35">{stat.sub}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
