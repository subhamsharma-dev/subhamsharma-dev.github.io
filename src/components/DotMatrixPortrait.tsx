import { useEffect, useRef, useState } from 'react'
import { loadDotGrid, type Dot } from '@/lib/dotMatrix'

const COLS = 52
const ROWS = 68
const SRC = '/portrait.jpg'

export default function DotMatrixPortrait() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const gridRef = useRef<Dot[][] | null>(null)
  const [ready, setReady] = useState(false)
  const [failed, setFailed] = useState(false)

  useEffect(() => {
    let cancelled = false
    loadDotGrid(SRC, COLS, ROWS)
      .then((grid) => {
        if (cancelled) return
        gridRef.current = grid
        setReady(true)
      })
      .catch(() => {
        if (!cancelled) setFailed(true)
      })
    return () => {
      cancelled = true
    }
  }, [])

  useEffect(() => {
    if (!ready || !canvasRef.current || !containerRef.current) return
    const canvas = canvasRef.current
    const container = containerRef.current
    const ctx = canvas.getContext('2d', { alpha: true })
    if (!ctx) return

    const dpr = Math.min(2, window.devicePixelRatio || 1)
    let displayW = 0
    let displayH = 0

    const resize = () => {
      displayW = container.clientWidth
      displayH = container.clientHeight
      canvas.width = displayW * dpr
      canvas.height = displayH * dpr
      canvas.style.width = displayW + 'px'
      canvas.style.height = displayH + 'px'
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }
    resize()
    const ro = new ResizeObserver(resize)
    ro.observe(container)

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const startTime = performance.now()
    let rafId = 0

    const render = (now: number) => {
      const t = prefersReducedMotion ? 8 : (now - startTime) / 1000
      const grid = gridRef.current!
      ctx.clearRect(0, 0, displayW, displayH)

      const spacing = displayW / COLS
      const maxR = spacing * 0.46

      // Ripple cycling outward from center.
      const rippleT = (t % 12) / 12
      const rippleR = rippleT * Math.hypot(displayW, displayH) * 0.6
      const rippleStrength = (1 - rippleT) * 0.35

      // Vertical scan beam.
      const scanT = ((t + 2) % 9) / 9
      const scanY = scanT * displayH * 1.2 - displayH * 0.1

      ctx.globalCompositeOperation = 'lighter'

      for (let row = 0; row < ROWS; row++) {
        for (let col = 0; col < COLS; col++) {
          const d = grid[row][col]
          if (d.density < 0.04 || d.mask < 0.04) continue

          const x = col * spacing + spacing / 2
          const y = row * spacing + spacing / 2

          // Stagger intro from top-left so the portrait "boots up".
          const introDelay = (col / COLS + row / ROWS) * 0.5
          let intro = (t - introDelay) / 1.4
          intro = intro < 0 ? 0 : intro > 1 ? 1 : intro
          intro = 1 - Math.pow(1 - intro, 3)
          if (intro <= 0) continue

          // Subtle per-dot breath.
          const pulse = 0.88 + 0.12 * Math.sin(t * 0.6 + d.phase)

          // Boost dots near the scan beam.
          const scanDist = Math.abs(y - scanY)
          const scanInf = Math.max(0, 1 - scanDist / (spacing * 2.8))

          // Boost dots intersecting the expanding ripple.
          const cx = x - displayW / 2
          const cy = y - displayH / 2
          const distC = Math.sqrt(cx * cx + cy * cy)
          const rippleDelta = Math.abs(distC - rippleR)
          const rippleInf =
            Math.max(0, 1 - rippleDelta / (spacing * 3.5)) * rippleStrength

          const base = d.density * d.mask * intro * pulse
          const boost = scanInf * 0.55 + rippleInf * 0.55
          const radius = maxR * base * (1 + boost)
          if (radius < 0.35) continue

          // Color cycles diagonally across the grid + slowly over time.
          const hueT =
            (col / COLS) * 0.5 - (row / ROWS) * 0.2 + t * 0.035
          const [r, g, b] = palette(hueT)

          let alpha = (0.78 + base * 0.22) * (1 + boost * 0.5)
          if (alpha > 1) alpha = 1

          ctx.shadowBlur = Math.min(16, radius * 2.4)
          ctx.shadowColor = `rgba(${r | 0},${g | 0},${b | 0},${alpha * 0.7})`

          ctx.beginPath()
          ctx.arc(x, y, radius, 0, Math.PI * 2)
          ctx.fillStyle = `rgba(${r | 0},${g | 0},${b | 0},${alpha})`
          ctx.fill()
        }
      }

      ctx.shadowBlur = 0
      if (!prefersReducedMotion) rafId = requestAnimationFrame(render)
    }

    rafId = requestAnimationFrame(render)
    return () => {
      cancelAnimationFrame(rafId)
      ro.disconnect()
    }
  }, [ready])

  return (
    <div className="relative aspect-[4/5] w-full max-w-[520px] lg:max-w-none">
      {/* Aurora glow behind */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -inset-10 -z-10 rounded-[2rem] bg-gradient-to-br from-accent-electric/25 via-accent-cyan/10 to-accent-violet/25 blur-3xl"
      />

      <div
        ref={containerRef}
        className="absolute inset-0 overflow-hidden rounded-2xl border border-white/[0.07] bg-gradient-to-br from-white/[0.02] to-white/[0.005] backdrop-blur-sm"
      >
        {/* Interior glow */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse 80% 60% at 50% 35%, rgba(92,200,255,0.07), transparent 65%), radial-gradient(ellipse 60% 50% at 50% 90%, rgba(139,124,246,0.10), transparent 60%)',
          }}
        />

        <CornerMarks />

        <canvas
          ref={canvasRef}
          className="absolute inset-0 h-full w-full"
          style={{ filter: 'drop-shadow(0 0 10px rgba(92,200,255,0.18))' }}
        />

        {/* Status chips */}
        <div className="absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-md border border-white/10 bg-ink-950/60 px-2 py-1 backdrop-blur">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
          <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-white/65">
            {failed ? 'matrix · offline' : ready ? 'matrix · live' : 'sync…'}
          </span>
        </div>
        <div className="absolute right-3 top-3 font-mono text-[10px] uppercase tracking-[0.18em] text-white/35">
          subham.dot
        </div>
        <div className="absolute bottom-3 left-3 font-mono text-[10px] uppercase tracking-[0.18em] text-white/35">
          {COLS}×{ROWS}
        </div>
        <div className="absolute bottom-3 right-3 font-mono text-[10px] uppercase tracking-[0.18em] text-white/35">
          {COLS * ROWS} cells
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

function palette(t: number): [number, number, number] {
  const phase = ((t % 1) + 1) % 1
  const c1: [number, number, number] = [92, 200, 255]
  const c2: [number, number, number] = [34, 211, 238]
  const c3: [number, number, number] = [139, 124, 246]
  if (phase < 0.5) {
    const k = phase * 2
    return [
      c1[0] * (1 - k) + c2[0] * k,
      c1[1] * (1 - k) + c2[1] * k,
      c1[2] * (1 - k) + c2[2] * k,
    ]
  }
  const k = (phase - 0.5) * 2
  return [
    c2[0] * (1 - k) + c3[0] * k,
    c2[1] * (1 - k) + c3[1] * k,
    c2[2] * (1 - k) + c3[2] * k,
  ]
}

function CornerMarks() {
  const base = 'pointer-events-none absolute h-3.5 w-3.5 border-white/25'
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0">
      <span className={`${base} left-2.5 top-2.5 border-l border-t`} />
      <span className={`${base} right-2.5 top-2.5 border-r border-t`} />
      <span className={`${base} bottom-2.5 left-2.5 border-b border-l`} />
      <span className={`${base} bottom-2.5 right-2.5 border-b border-r`} />
    </div>
  )
}
