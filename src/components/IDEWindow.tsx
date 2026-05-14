import { motion } from 'framer-motion'
import { profile } from '@/data/content'

const codeLines: Array<Array<{ t: string; c?: string }>> = [
  [{ t: '// self.tsx', c: 'text-white/35 italic' }],
  [{ t: 'const ', c: 'text-accent-violet' }, { t: 'subham', c: 'text-accent-cyan' }, { t: ' = {', c: 'text-white/70' }],
  [{ t: '  role: ', c: 'text-white/70' }, { t: "'Software Engineer'", c: 'text-emerald-300' }, { t: ',', c: 'text-white/70' }],
  [{ t: '  stack: [', c: 'text-white/70' }, { t: "'AI'", c: 'text-emerald-300' }, { t: ', ', c: 'text-white/70' }, { t: "'Cloud'", c: 'text-emerald-300' }, { t: ', ', c: 'text-white/70' }, { t: "'Backend'", c: 'text-emerald-300' }, { t: '],', c: 'text-white/70' }],
  [{ t: '  location: ', c: 'text-white/70' }, { t: `'${profile.location}'`, c: 'text-emerald-300' }, { t: ',', c: 'text-white/70' }],
  [{ t: '  available: ', c: 'text-white/70' }, { t: 'true', c: 'text-amber-300' }, { t: ',', c: 'text-white/70' }],
  [{ t: '  currently: ', c: 'text-white/70' }, { t: "'shipping with Claude Code'", c: 'text-emerald-300' }, { t: ',', c: 'text-white/70' }],
  [{ t: '}', c: 'text-white/70' }],
]

export default function IDEWindow() {
  return (
    <div className="relative w-full">
      {/* Glow halo behind */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -inset-8 -z-10 rounded-[2rem] bg-gradient-to-br from-accent-electric/15 via-accent-cyan/10 to-accent-violet/15 blur-3xl"
      />

      <div className="relative overflow-hidden rounded-xl border border-white/10 bg-ink-900/90 shadow-2xl backdrop-blur-xl">
        {/* Title bar */}
        <div className="flex items-center gap-3 border-b border-white/[0.06] bg-ink-800/80 px-4 py-2.5">
          <div className="flex items-center gap-1.5">
            <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
            <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
            <span className="h-3 w-3 rounded-full bg-[#28c840]" />
          </div>
          <div className="ml-2 flex items-center gap-1 font-mono text-[11px] text-white/45">
            <span className="rounded-md bg-white/[0.04] px-2 py-1 text-white/80">subham.tsx</span>
            <span className="px-2 py-1">about.md</span>
          </div>
          <div className="ml-auto font-mono text-[10px] uppercase tracking-wider text-white/30">
            ~/portfolio
          </div>
        </div>

        {/* Editor body */}
        <div className="flex flex-col sm:flex-row">
          {/* Photo pane — "preview" */}
          <div className="relative w-full sm:w-[44%] sm:min-w-[200px] sm:border-r sm:border-white/[0.06]">
            <div className="relative aspect-[4/5] w-full overflow-hidden">
              <img
                src="/portrait.jpg"
                alt="Subham Sharma"
                loading="eager"
                decoding="async"
                className="absolute inset-0 h-full w-full object-cover"
              />
              {/* Tint to match the dark UI */}
              <div className="absolute inset-0 bg-gradient-to-br from-accent-electric/10 via-transparent to-accent-violet/15 mix-blend-overlay" />
              {/* Vignette */}
              <div className="absolute inset-0 bg-gradient-to-t from-ink-950/60 via-transparent to-transparent" />
              {/* Scanlines (CRT) */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 opacity-[0.12] mix-blend-overlay"
                style={{
                  backgroundImage:
                    'repeating-linear-gradient(0deg, rgba(255,255,255,0.45) 0 1px, transparent 1px 3px)',
                }}
              />
              {/* Floating filename label */}
              <div className="absolute bottom-2.5 left-2.5 inline-flex items-center gap-1.5 rounded-md border border-white/10 bg-ink-950/70 px-2 py-1 backdrop-blur">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
                <span className="font-mono text-[10px] uppercase tracking-wider text-white/65">live</span>
              </div>
            </div>
          </div>

          {/* Code pane */}
          <div className="relative flex-1 bg-ink-900/60 p-4 font-mono text-[12.5px] leading-[1.65] sm:p-5">
            <div className="flex">
              {/* Line numbers */}
              <div className="select-none pr-4 text-right text-white/20">
                {codeLines.map((_, i) => (
                  <div key={i}>{i + 1}</div>
                ))}
              </div>

              {/* Code */}
              <div className="flex-1">
                {codeLines.map((line, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -6 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.6 + i * 0.12, duration: 0.4, ease: 'easeOut' }}
                    className="whitespace-nowrap"
                  >
                    {line.map((tok, j) => (
                      <span key={j} className={tok.c}>
                        {tok.t}
                      </span>
                    ))}
                    {i === codeLines.length - 1 && (
                      <span className="ml-1 inline-block h-[1em] w-[7px] -translate-y-[1px] animate-pulse bg-accent-electric align-middle" />
                    )}
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Status bar */}
        <div className="flex items-center gap-4 border-t border-white/[0.06] bg-ink-800/80 px-4 py-1.5 font-mono text-[10px] uppercase tracking-wider text-white/45">
          <span className="flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
            main
          </span>
          <span className="hidden sm:inline">TypeScript</span>
          <span className="hidden sm:inline">UTF-8</span>
          <span className="ml-auto truncate">{profile.timezone}</span>
        </div>
      </div>
    </div>
  )
}
