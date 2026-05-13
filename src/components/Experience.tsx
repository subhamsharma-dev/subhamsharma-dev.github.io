import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Building2, ChevronDown, MapPin, Zap } from 'lucide-react'
import { experiences } from '@/data/content'
import { cn } from '@/lib/cn'

export default function Experience() {
  const [expanded, setExpanded] = useState<number>(0)

  return (
    <section id="experience" className="relative py-24 md:py-32">
      <div className="container-page">
        <div className="mb-16 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <span className="section-eyebrow">
              <span className="h-px w-6 bg-accent-electric/60" />
              Experience
            </span>
            <h2 className="mt-4 font-display text-4xl font-bold tracking-tightest text-white md:text-5xl">
              Where I've <span className="text-gradient">grown.</span>
            </h2>
          </div>
          <p className="max-w-md text-sm leading-relaxed text-white/55">
            4+ years at White Blink — from intern to SDE-II. Click any role to expand the details.
          </p>
        </div>

        <div className="relative">
          {/* Timeline spine */}
          <div className="absolute left-[19px] top-4 bottom-4 w-px bg-gradient-to-b from-accent-electric/30 via-white/8 to-transparent md:left-[23px]" />

          <div className="space-y-4">
            {experiences.map((exp, i) => {
              const isOpen = expanded === i
              return (
                <motion.div
                  key={`${exp.role}-${exp.period}`}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ duration: 0.5, delay: i * 0.07 }}
                  className="relative pl-12 md:pl-16"
                >
                  {/* Timeline node */}
                  <div className="absolute left-0 top-5 flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-ink-900 md:left-[2px]">
                    <Building2 className="h-4 w-4 text-white/60" strokeWidth={1.6} />
                    {exp.current && (
                      <span className="absolute -right-0.5 -top-0.5 h-2.5 w-2.5 rounded-full bg-emerald-400 ring-2 ring-ink-950">
                        <span className="absolute inset-0 animate-ping rounded-full bg-emerald-400 opacity-50" />
                      </span>
                    )}
                  </div>

                  {/* Card */}
                  <button
                    onClick={() => setExpanded(isOpen ? -1 : i)}
                    className={cn(
                      'card-surface block w-full overflow-hidden text-left',
                      isOpen && 'border-accent-electric/20'
                    )}
                    aria-expanded={isOpen}
                  >
                    {/* Header */}
                    <div className="flex flex-col gap-4 p-6 md:flex-row md:items-start md:justify-between">
                      <div className="flex-1">
                        <div className="flex flex-wrap items-center gap-2.5">
                          <h3 className="font-display text-lg font-semibold text-white md:text-xl">
                            {exp.role}
                          </h3>
                          {exp.current && (
                            <span className="badge-chip border-emerald-400/30 bg-emerald-400/10 text-emerald-300">
                              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                              Current
                            </span>
                          )}
                        </div>
                        <div className="mt-2 flex flex-wrap items-center gap-3 text-sm text-white/55">
                          <span className="text-white/75">{exp.company}</span>
                          <span className="h-1 w-1 rounded-full bg-white/20" />
                          <span className="flex items-center gap-1.5">
                            <MapPin className="h-3 w-3" />
                            {exp.location}
                          </span>
                          <span className="h-1 w-1 rounded-full bg-white/20" />
                          <span className="font-mono text-[12px] text-white/50">{exp.period}</span>
                        </div>
                      </div>
                      <ChevronDown
                        className={cn(
                          'h-5 w-5 shrink-0 text-white/40 transition-transform duration-300',
                          isOpen && 'rotate-180 text-accent-electric'
                        )}
                      />
                    </div>

                    {/* Summary always visible */}
                    <p className="px-6 pb-5 text-sm leading-relaxed text-white/60">
                      {exp.summary}
                    </p>

                    {/* Expandable highlights */}
                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                          className="overflow-hidden"
                        >
                          <div className="border-t border-white/[0.06] px-6 py-5">
                            <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.18em] text-accent-electric">
                              <Zap className="h-3 w-3" />
                              Impact &amp; Highlights
                            </div>
                            <ul className="mt-4 space-y-3">
                              {exp.highlights.map((h) => (
                                <li key={h} className="flex gap-3 text-sm leading-relaxed text-white/70">
                                  <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent-electric/70" />
                                  <span>{h}</span>
                                </li>
                              ))}
                            </ul>

                            {/* Stack */}
                            <div className="mt-6 flex flex-wrap gap-1.5">
                              {exp.stack.map((s) => (
                                <span key={s} className="badge-chip">{s}</span>
                              ))}
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </button>
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
