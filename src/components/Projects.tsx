import { useMemo, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowUpRight, Github, Star, X } from 'lucide-react'
import { projects, type Project } from '@/data/content'
import { cn } from '@/lib/cn'

const CATEGORIES = ['All', 'AI', 'Cloud', 'Backend', 'Full Stack', 'Data'] as const
type Category = (typeof CATEGORIES)[number]

export default function Projects({ showAll = false }: { showAll?: boolean }) {
  const [filter, setFilter] = useState<Category>('All')
  const [open, setOpen] = useState<Project | null>(null)

  const visible = useMemo(() => {
    let list = projects
    if (!showAll) list = list.filter((p) => p.featured)
    if (filter !== 'All') list = list.filter((p) => p.category.includes(filter as any))
    return list
  }, [filter, showAll])

  return (
    <section id="projects" className="relative py-24 md:py-32">
      <div className="container-page">
        {/* Header */}
        <div className="mb-12 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <span className="section-eyebrow">
              <span className="h-px w-6 bg-accent-electric/60" />
              Selected Work
            </span>
            <h2 className="mt-4 font-display text-4xl font-bold tracking-tightest text-white md:text-5xl">
              Production systems, shipped.
            </h2>
            <p className="mt-4 max-w-xl text-sm leading-relaxed text-white/55 md:text-base">
              Each project shipped to production at meaningful scale. Click any card for the architecture, challenges, and business impact.
            </p>
          </div>

          {/* Filters */}
          <div className="flex flex-wrap items-center gap-1.5">
            {CATEGORIES.map((c) => (
              <button
                key={c}
                onClick={() => setFilter(c)}
                className={cn(
                  'rounded-full border px-3 py-1.5 text-xs font-medium transition-all',
                  filter === c
                    ? 'border-accent-electric/40 bg-accent-electric/10 text-accent-electric'
                    : 'border-white/10 bg-white/[0.02] text-white/55 hover:border-white/20 hover:text-white'
                )}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        {/* Project grid */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <AnimatePresence mode="popLayout">
            {visible.map((p, i) => (
              <motion.button
                key={p.slug}
                layout
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.45, delay: i * 0.05 }}
                onClick={() => setOpen(p)}
                className="card-surface group relative overflow-hidden p-6 text-left md:p-8"
              >
                {/* Bg detail */}
                <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                  <div className="absolute -right-20 -top-20 h-60 w-60 rounded-full bg-accent-electric/10 blur-3xl" />
                  <div className="absolute -bottom-20 -left-20 h-60 w-60 rounded-full bg-accent-violet/10 blur-3xl" />
                </div>

                {/* Top row */}
                <div className="relative flex items-start justify-between gap-4">
                  <div className="flex flex-wrap gap-1.5">
                    {p.category.map((c) => (
                      <span key={c} className="badge-chip">{c}</span>
                    ))}
                  </div>
                  {p.featured && (
                    <Star className="h-4 w-4 fill-accent-electric/30 text-accent-electric" />
                  )}
                </div>

                {/* Title */}
                <h3 className="relative mt-5 font-display text-2xl font-bold text-white">
                  {p.title}
                </h3>
                <p className="relative mt-2 text-sm leading-relaxed text-white/55">
                  {p.tagline}
                </p>

                {/* Metrics */}
                <div className="relative mt-6 grid grid-cols-3 gap-3 border-t border-white/[0.06] pt-5">
                  {p.metrics.slice(0, 3).map((m) => (
                    <div key={m.label}>
                      <div className="font-display text-lg font-bold text-gradient">{m.value}</div>
                      <div className="mt-0.5 text-[10px] uppercase tracking-wider text-white/40">{m.label}</div>
                    </div>
                  ))}
                </div>

                {/* CTA */}
                <div className="relative mt-6 flex items-center justify-between">
                  <div className="flex flex-wrap gap-1">
                    {p.stack.slice(0, 4).map((s) => (
                      <span key={s} className="rounded-md bg-white/[0.04] px-2 py-1 font-mono text-[10px] text-white/55">
                        {s}
                      </span>
                    ))}
                    {p.stack.length > 4 && (
                      <span className="rounded-md bg-white/[0.04] px-2 py-1 font-mono text-[10px] text-white/40">
                        +{p.stack.length - 4}
                      </span>
                    )}
                  </div>
                  <span className="flex items-center gap-1 text-xs text-white/45 transition-colors group-hover:text-accent-electric">
                    Details <ArrowUpRight className="h-3.5 w-3.5" />
                  </span>
                </div>
              </motion.button>
            ))}
          </AnimatePresence>
        </div>

        {visible.length === 0 && (
          <div className="rounded-2xl border border-dashed border-white/10 p-12 text-center text-white/40">
            No projects match this filter yet.
          </div>
        )}
      </div>

      {/* Modal */}
      <ProjectModal project={open} onClose={() => setOpen(null)} />
    </section>
  )
}

function ProjectModal({ project, onClose }: { project: Project | null; onClose: () => void }) {
  return (
    <AnimatePresence>
      {project && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 z-[120] flex items-end justify-center bg-black/70 p-0 backdrop-blur-md md:items-center md:p-6"
        >
          <motion.div
            initial={{ y: 40, opacity: 0, scale: 0.98 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 40, opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="glass-strong relative max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-t-3xl border border-white/10 md:rounded-3xl"
          >
            <button
              onClick={onClose}
              className="sticky top-4 z-10 ml-auto mr-4 flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-ink-900/90 text-white/60 transition-colors hover:text-white"
              aria-label="Close"
            >
              <X className="h-4 w-4" />
            </button>

            <div className="p-6 pt-0 md:p-10 md:pt-0">
              {/* Header */}
              <div className="flex flex-wrap gap-1.5">
                {project.category.map((c) => (
                  <span key={c} className="badge-chip">{c}</span>
                ))}
                <span className="badge-chip border-accent-electric/30 text-accent-electric/90">
                  {project.year}
                </span>
              </div>
              <h2 className="mt-4 font-display text-3xl font-bold text-white md:text-4xl">
                {project.title}
              </h2>
              <p className="mt-3 text-base text-white/65">{project.tagline}</p>

              {/* Metrics */}
              <div className="mt-6 grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-white/[0.06] bg-white/[0.02] sm:grid-cols-4">
                {project.metrics.map((m) => (
                  <div key={m.label} className="bg-ink-950/40 p-4">
                    <div className="font-display text-lg font-bold text-gradient">{m.value}</div>
                    <div className="mt-0.5 text-[10px] uppercase tracking-wider text-white/50">{m.label}</div>
                  </div>
                ))}
              </div>

              {/* Story sections */}
              <div className="mt-8 space-y-6">
                <Pillar label="Problem" text={project.problem} />
                <Pillar label="Solution" text={project.solution} />
                <Pillar label="Why this was hard" text={project.challenge} />
                <Pillar label="Scale" text={project.scale} />
                <Pillar label="Impact" text={project.impact} />
              </div>

              {/* Stack */}
              <div className="mt-8">
                <div className="text-[10px] uppercase tracking-[0.2em] text-white/40">Stack</div>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {project.stack.map((s) => (
                    <span key={s} className="badge-chip">{s}</span>
                  ))}
                </div>
              </div>

              {/* Links */}
              {project.links && (project.links.github || project.links.live) && (
                <div className="mt-8 flex flex-wrap gap-3 border-t border-white/[0.06] pt-6">
                  {project.links.github && (
                    <a href={project.links.github} target="_blank" rel="noreferrer" className="btn-ghost">
                      <Github className="h-4 w-4" />
                      Source
                    </a>
                  )}
                  {project.links.live && (
                    <a href={project.links.live} target="_blank" rel="noreferrer" className="btn-primary">
                      Live <ArrowUpRight className="h-4 w-4" />
                    </a>
                  )}
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

function Pillar({ label, text }: { label: string; text: string }) {
  return (
    <div>
      <div className="text-[10px] uppercase tracking-[0.2em] text-accent-electric">{label}</div>
      <p className="mt-2 text-[15px] leading-relaxed text-white/70">{text}</p>
    </div>
  )
}
