import { useEffect, useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { imageToWireframe, type TracedPath } from '@/lib/wireframe'

const VIEW_W = 320
const VIEW_H = 400
const SRC = '/portrait.jpg'

export default function WireframePortrait() {
  const [paths, setPaths] = useState<TracedPath[] | null>(null)
  const [failed, setFailed] = useState(false)

  useEffect(() => {
    let cancelled = false
    imageToWireframe(SRC)
      .then((p) => {
        if (!cancelled) setPaths(p)
      })
      .catch(() => {
        if (!cancelled) setFailed(true)
      })
    return () => {
      cancelled = true
    }
  }, [])

  // Stagger schedule — long strokes (silhouette) draw first, fine detail later.
  const schedule = useMemo(() => {
    if (!paths) return []
    const baseDelay = 0.25
    const perPath = 0.012
    return paths.map((_, i) => ({
      delay: baseDelay + i * perPath,
      // Longer strokes take a touch longer to draw — feels intentional.
      duration: 1.6 + Math.min(1.4, (paths[i].length / 200) * 1.2),
    }))
  }, [paths])

  return (
    <div className="relative aspect-[4/5] w-full max-w-[520px] lg:max-w-none">
      {/* Aurora glow behind */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -inset-10 -z-10 rounded-[2rem] bg-gradient-to-br from-accent-electric/20 via-accent-cyan/10 to-accent-violet/25 blur-3xl"
      />

      {/* Frame / vignette */}
      <div className="absolute inset-0 overflow-hidden rounded-2xl border border-white/[0.07] bg-gradient-to-br from-white/[0.02] to-white/[0.005] backdrop-blur-sm">
        {/* Inner radial backdrop */}
        <div
          aria-hidden="true"
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse 80% 60% at 50% 35%, rgba(92,200,255,0.08), transparent 65%), radial-gradient(ellipse 60% 50% at 50% 90%, rgba(139,124,246,0.08), transparent 60%)',
          }}
        />

        {/* Faint dotted grid */}
        <div
          aria-hidden="true"
          className="absolute inset-0 opacity-[0.18]"
          style={{
            backgroundImage:
              'radial-gradient(circle, rgba(255,255,255,0.5) 0.6px, transparent 0.6px)',
            backgroundSize: '14px 14px',
            maskImage:
              'radial-gradient(ellipse at center, black 50%, transparent 85%)',
            WebkitMaskImage:
              'radial-gradient(ellipse at center, black 50%, transparent 85%)',
          }}
        />

        {/* Corner registration marks */}
        <CornerMarks />

        {/* Scanline beam */}
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-3 h-px"
          style={{
            background:
              'linear-gradient(90deg, transparent, rgba(92,200,255,0.85), rgba(139,124,246,0.85), transparent)',
            boxShadow:
              '0 0 16px rgba(92,200,255,0.6), 0 0 32px rgba(139,124,246,0.3)',
          }}
          initial={{ top: '0%', opacity: 0 }}
          animate={{ top: ['0%', '100%', '0%'], opacity: [0, 0.9, 0] }}
          transition={{
            duration: 7,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 3.2,
          }}
        />

        {/* The wireframe SVG */}
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          preserveAspectRatio="xMidYMid meet"
          className="absolute inset-0 h-full w-full"
          aria-label="Stylised wireframe portrait of Subham Sharma"
        >
          <defs>
            <linearGradient id="wire-grad" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2={VIEW_W} y2={VIEW_H}>
              <stop offset="0%" stopColor="#5cc8ff">
                <animate attributeName="stop-color" values="#5cc8ff;#22d3ee;#8b7cf6;#5cc8ff" dur="14s" repeatCount="indefinite" />
              </stop>
              <stop offset="55%" stopColor="#22d3ee">
                <animate attributeName="stop-color" values="#22d3ee;#8b7cf6;#5cc8ff;#22d3ee" dur="14s" repeatCount="indefinite" />
              </stop>
              <stop offset="100%" stopColor="#8b7cf6">
                <animate attributeName="stop-color" values="#8b7cf6;#5cc8ff;#22d3ee;#8b7cf6" dur="14s" repeatCount="indefinite" />
              </stop>
            </linearGradient>

            <linearGradient id="wire-core" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="0" y2={VIEW_H}>
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0.95" />
              <stop offset="60%" stopColor="#cce8ff" stopOpacity="0.85" />
              <stop offset="100%" stopColor="#e2d6ff" stopOpacity="0.75" />
            </linearGradient>

            <filter id="wire-glow-soft" x="-30%" y="-30%" width="160%" height="160%">
              <feGaussianBlur stdDeviation="3.2" />
            </filter>
            <filter id="wire-glow-mid" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="1.4" />
            </filter>
          </defs>

          {paths && (
            <>
              {/* Layer 1: wide bloom halo */}
              <g opacity="0.55" filter="url(#wire-glow-soft)">
                {paths.map((p, i) => (
                  <motion.path
                    key={`halo-${i}`}
                    d={p.d}
                    fill="none"
                    stroke="url(#wire-grad)"
                    strokeWidth={3.2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 0.55 }}
                    transition={{
                      pathLength: { duration: schedule[i].duration, delay: schedule[i].delay, ease: 'easeOut' },
                      opacity: { duration: 0.6, delay: schedule[i].delay },
                    }}
                  />
                ))}
              </g>

              {/* Layer 2: mid neon */}
              <g opacity="0.95" filter="url(#wire-glow-mid)">
                {paths.map((p, i) => (
                  <motion.path
                    key={`mid-${i}`}
                    d={p.d}
                    fill="none"
                    stroke="url(#wire-grad)"
                    strokeWidth={1.25}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 1 }}
                    transition={{
                      pathLength: { duration: schedule[i].duration, delay: schedule[i].delay, ease: 'easeOut' },
                      opacity: { duration: 0.4, delay: schedule[i].delay },
                    }}
                  />
                ))}
              </g>

              {/* Layer 3: sharp white core */}
              <g>
                {paths.map((p, i) => (
                  <motion.path
                    key={`core-${i}`}
                    d={p.d}
                    fill="none"
                    stroke="url(#wire-core)"
                    strokeWidth={0.55}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 0.9 }}
                    transition={{
                      pathLength: { duration: schedule[i].duration, delay: schedule[i].delay + 0.1, ease: 'easeOut' },
                      opacity: { duration: 0.4, delay: schedule[i].delay + 0.1 },
                    }}
                  />
                ))}
              </g>
            </>
          )}
        </svg>

        {/* Floating accent dots — pure decoration */}
        <FloatingDots />

        {/* Status chips */}
        <div className="absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-md border border-white/10 bg-ink-950/60 px-2 py-1 backdrop-blur">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
          <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-white/65">
            {paths ? 'trace · complete' : failed ? 'trace · offline' : 'tracing…'}
          </span>
        </div>

        <div className="absolute right-3 top-3 font-mono text-[10px] uppercase tracking-[0.18em] text-white/35">
          subham.svg
        </div>

        <div className="absolute bottom-3 left-3 font-mono text-[10px] uppercase tracking-[0.18em] text-white/35">
          {paths ? `${paths.length} paths` : '—'}
        </div>

        <div className="absolute bottom-3 right-3 font-mono text-[10px] uppercase tracking-[0.18em] text-white/35">
          {VIEW_W}×{VIEW_H}
        </div>

        {/* Fallback if image fails to load */}
        {failed && (
          <div className="absolute inset-0 flex items-center justify-center p-6 text-center">
            <p className="font-mono text-[11px] text-white/40">
              portrait source missing<br />
              <span className="text-white/25">/portrait.jpg</span>
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

function CornerMarks() {
  const cornerBase =
    'pointer-events-none absolute h-3.5 w-3.5 border-white/25'
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0">
      <span className={`${cornerBase} left-2.5 top-2.5 border-l border-t`} />
      <span className={`${cornerBase} right-2.5 top-2.5 border-r border-t`} />
      <span className={`${cornerBase} bottom-2.5 left-2.5 border-b border-l`} />
      <span className={`${cornerBase} bottom-2.5 right-2.5 border-b border-r`} />
    </div>
  )
}

function FloatingDots() {
  const dots = useMemo(
    () =>
      Array.from({ length: 14 }, (_, i) => ({
        left: 10 + ((i * 71) % 80),
        top: 8 + ((i * 53) % 84),
        delay: (i * 0.3) % 4,
        duration: 4 + ((i * 0.7) % 3),
        size: 1 + (i % 3) * 0.5,
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
            boxShadow: '0 0 6px rgba(92,200,255,0.9), 0 0 12px rgba(139,124,246,0.4)',
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0.7, 0], y: [0, -6, 0] }}
          transition={{ duration: d.duration, delay: d.delay, repeat: Infinity, ease: 'easeInOut' }}
        />
      ))}
    </div>
  )
}
