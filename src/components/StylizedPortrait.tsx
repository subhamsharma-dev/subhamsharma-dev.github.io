import { useEffect, useMemo, useState } from 'react'
import { motion } from 'framer-motion'

const SRC = '/portrait.jpg'

export default function StylizedPortrait() {
  const [loaded, setLoaded] = useState(false)
  const [failed, setFailed] = useState(false)

  useEffect(() => {
    const img = new Image()
    img.onload = () => setLoaded(true)
    img.onerror = () => setFailed(true)
    img.src = SRC
  }, [])

  return (
    <div className="relative aspect-[4/5] w-full max-w-[520px] lg:max-w-none">
      {/* Aurora glow behind frame */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -inset-12 -z-10 rounded-[2rem] bg-gradient-to-br from-accent-electric/30 via-accent-cyan/15 to-accent-violet/35 blur-3xl"
      />

      <div className="absolute inset-0 overflow-hidden rounded-2xl border border-white/[0.08] bg-gradient-to-br from-white/[0.02] to-white/[0.005] backdrop-blur-sm">
        {/* Backdrop wash */}
        <div
          aria-hidden="true"
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse 75% 60% at 50% 28%, rgba(92,200,255,0.16), transparent 65%), radial-gradient(ellipse 80% 70% at 50% 95%, rgba(139,124,246,0.18), transparent 60%), linear-gradient(180deg, rgba(10,11,15,0.2), rgba(5,6,8,0.78))',
          }}
        />

        {/* Tech grid backdrop */}
        <div
          aria-hidden="true"
          className="absolute inset-0 opacity-[0.10]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(92,200,255,0.55) 1px, transparent 1px), linear-gradient(90deg, rgba(92,200,255,0.55) 1px, transparent 1px)',
            backgroundSize: '28px 28px',
            maskImage: 'radial-gradient(ellipse at center, black 35%, transparent 82%)',
            WebkitMaskImage: 'radial-gradient(ellipse at center, black 35%, transparent 82%)',
          }}
        />

        {/* The subject — photo + duotone */}
        {loaded && (
          <motion.div
            initial={{ opacity: 0, scale: 1.04 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-0"
            style={{
              maskImage:
                'radial-gradient(ellipse 64% 74% at 50% 40%, black 40%, rgba(0,0,0,0.55) 68%, transparent 96%)',
              WebkitMaskImage:
                'radial-gradient(ellipse 64% 74% at 50% 40%, black 40%, rgba(0,0,0,0.55) 68%, transparent 96%)',
            }}
          >
            {/* Base photo, slightly desaturated + punchier contrast */}
            <img
              src={SRC}
              alt="Subham Sharma"
              draggable={false}
              className="absolute inset-0 h-full w-full select-none object-cover object-[50%_28%]"
              style={{ filter: 'contrast(1.1) saturate(0.55) brightness(0.95)' }}
            />
            {/* Color grade — pushes the whole hue toward the site palette */}
            <div
              aria-hidden="true"
              className="absolute inset-0"
              style={{
                background:
                  'linear-gradient(140deg, #5cc8ff 0%, #22d3ee 45%, #8b7cf6 100%)',
                mixBlendMode: 'color',
                opacity: 0.78,
              }}
            />
            {/* Highlight bloom on face area */}
            <div
              aria-hidden="true"
              className="absolute inset-0"
              style={{
                background:
                  'radial-gradient(ellipse 50% 40% at 50% 32%, rgba(255,255,255,0.18), transparent 70%)',
                mixBlendMode: 'overlay',
              }}
            />
            {/* Holographic shimmer slowly sliding across */}
            <motion.div
              aria-hidden="true"
              className="absolute inset-0"
              style={{
                background:
                  'linear-gradient(115deg, transparent 30%, rgba(255,255,255,0.10) 45%, rgba(92,200,255,0.22) 50%, rgba(139,124,246,0.16) 55%, transparent 70%)',
                mixBlendMode: 'overlay',
              }}
              animate={{ x: ['-110%', '110%'] }}
              transition={{
                duration: 11,
                repeat: Infinity,
                ease: 'easeInOut',
                repeatDelay: 4,
              }}
            />
            {/* Inner vignette to deepen edges */}
            <div
              aria-hidden="true"
              className="absolute inset-0"
              style={{ boxShadow: 'inset 0 0 90px 28px rgba(5,6,8,0.55)' }}
            />
          </motion.div>
        )}

        {/* Scan beam */}
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-3 h-[2px]"
          style={{
            background:
              'linear-gradient(90deg, transparent 0%, rgba(92,200,255,0.6) 30%, rgba(255,255,255,0.95) 50%, rgba(139,124,246,0.6) 70%, transparent 100%)',
            boxShadow:
              '0 0 24px rgba(92,200,255,0.8), 0 0 60px rgba(139,124,246,0.45)',
            filter: 'blur(0.4px)',
          }}
          initial={{ top: '0%', opacity: 0 }}
          animate={{ top: ['0%', '100%', '0%'], opacity: [0, 0.95, 0] }}
          transition={{
            duration: 7.5,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 2.4,
          }}
        />

        <CornerMarks />
        <ParticleDust />

        {/* HUD chips */}
        <div className="absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-md border border-white/10 bg-ink-950/65 px-2 py-1 backdrop-blur">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
          <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-white/70">
            {failed ? 'signal · offline' : loaded ? 'signal · live' : 'syncing…'}
          </span>
        </div>
        <div className="absolute right-3 top-3 font-mono text-[10px] uppercase tracking-[0.18em] text-white/45">
          subham.sharma
        </div>
        <div className="absolute bottom-3 left-3 font-mono text-[10px] uppercase tracking-[0.18em] text-white/45">
          12.97°N · 77.59°E
        </div>
        <div className="absolute bottom-3 right-3 font-mono text-[10px] uppercase tracking-[0.18em] text-white/45">
          ●●●● open
        </div>

        {failed && (
          <div className="absolute inset-0 flex items-center justify-center p-6 text-center">
            <p className="font-mono text-[11px] text-white/40">
              portrait source missing
              <br />
              <span className="text-white/25">/portrait.jpg</span>
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

function CornerMarks() {
  const base = 'pointer-events-none absolute h-3.5 w-3.5 border-white/30'
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0">
      <span className={`${base} left-2.5 top-2.5 border-l border-t`} />
      <span className={`${base} right-2.5 top-2.5 border-r border-t`} />
      <span className={`${base} bottom-2.5 left-2.5 border-b border-l`} />
      <span className={`${base} bottom-2.5 right-2.5 border-b border-r`} />
    </div>
  )
}

function ParticleDust() {
  const dots = useMemo(
    () =>
      Array.from({ length: 16 }, (_, i) => ({
        left: 5 + ((i * 73) % 90),
        top: 5 + ((i * 47) % 90),
        delay: (i * 0.4) % 5,
        duration: 5 + ((i * 0.6) % 4),
        size: 1 + (i % 3) * 0.4,
      })),
    [],
  )
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0">
      {dots.map((d, i) => (
        <motion.span
          key={i}
          className="absolute rounded-full bg-accent-electric"
          style={{
            left: `${d.left}%`,
            top: `${d.top}%`,
            width: d.size,
            height: d.size,
            boxShadow:
              '0 0 6px rgba(92,200,255,0.85), 0 0 14px rgba(139,124,246,0.35)',
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0.7, 0], y: [0, -10, 0] }}
          transition={{
            duration: d.duration,
            delay: d.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  )
}
