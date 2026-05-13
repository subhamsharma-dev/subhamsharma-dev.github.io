import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { techStack } from '@/data/content'
import { cn } from '@/lib/cn'

export default function TechStack() {
  const [active, setActive] = useState(techStack[0].id)
  const activeCategory = techStack.find((c) => c.id === active)!

  return (
    <section id="stack" className="relative py-24 md:py-32">
      {/* Background */}
      <div className="absolute inset-0 -z-10 opacity-50" aria-hidden>
        <div className="grid-bg absolute inset-0" />
      </div>

      <div className="container-page">
        <div className="mx-auto mb-14 max-w-3xl text-center">
          <span className="section-eyebrow">
            <span className="h-px w-6 bg-accent-electric/60" />
            Tech I work with
          </span>
          <h2 className="mt-4 font-display text-4xl font-bold tracking-tightest text-white md:text-5xl">
            Tools I've <span className="text-gradient">shipped with.</span>
          </h2>
          <p className="mt-4 text-sm text-white/55 md:text-base">
            Picked up over 4+ years across AI, cloud, and backend work. Hover or tap a category to explore.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[280px_1fr]">
          {/* Category list */}
          <div className="flex gap-2 overflow-x-auto pb-2 lg:flex-col lg:overflow-visible lg:pb-0">
            {techStack.map((cat) => {
              const isActive = active === cat.id
              return (
                <button
                  key={cat.id}
                  onClick={() => setActive(cat.id)}
                  onMouseEnter={() => setActive(cat.id)}
                  className={cn(
                    'group relative shrink-0 overflow-hidden rounded-xl border px-4 py-3 text-left transition-all lg:w-full',
                    isActive
                      ? 'border-white/15 bg-white/[0.05]'
                      : 'border-white/[0.06] bg-white/[0.02] hover:border-white/10'
                  )}
                >
                  {isActive && (
                    <motion.div
                      layoutId="stack-bg"
                      className="absolute inset-0 -z-10"
                      style={{
                        background: `radial-gradient(circle at left, ${cat.color}20, transparent 60%)`,
                      }}
                      transition={{ type: 'spring', stiffness: 280, damping: 30 }}
                    />
                  )}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span
                        className="h-2.5 w-2.5 rounded-full transition-all"
                        style={{
                          background: cat.color,
                          boxShadow: isActive ? `0 0 12px ${cat.color}` : 'none',
                        }}
                      />
                      <span className={cn(
                        'whitespace-nowrap text-sm font-medium transition-colors',
                        isActive ? 'text-white' : 'text-white/60'
                      )}>
                        {cat.name}
                      </span>
                    </div>
                    <span className="font-mono text-[10px] text-white/30">
                      {String(cat.items.length).padStart(2, '0')}
                    </span>
                  </div>
                </button>
              )
            })}
          </div>

          {/* Display panel */}
          <div className="card-surface relative min-h-[400px] overflow-hidden p-6 md:p-8">
            {/* Atmosphere */}
            <div
              className="pointer-events-none absolute -right-32 -top-32 h-80 w-80 rounded-full opacity-30 blur-3xl"
              style={{ background: activeCategory.color }}
            />

            <AnimatePresence mode="wait">
              <motion.div
                key={activeCategory.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.3 }}
                className="relative"
              >
                <div className="flex items-baseline gap-3">
                  <span
                    className="h-3 w-3 rounded-full"
                    style={{ background: activeCategory.color, boxShadow: `0 0 16px ${activeCategory.color}` }}
                  />
                  <h3 className="font-display text-2xl font-bold text-white">
                    {activeCategory.name}
                  </h3>
                  <span className="font-mono text-xs text-white/40">
                    {activeCategory.items.length} tools
                  </span>
                </div>

                {/* Item grid */}
                <div className="mt-8 grid grid-cols-2 gap-2 sm:grid-cols-3">
                  {activeCategory.items.map((item, i) => (
                    <motion.div
                      key={item}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.025 }}
                      className="group flex items-center gap-2.5 rounded-lg border border-white/[0.06] bg-white/[0.02] px-3 py-2.5 transition-all hover:border-white/15 hover:bg-white/[0.04]"
                    >
                      <span
                        className="h-1.5 w-1.5 shrink-0 rounded-full opacity-60 transition-all group-hover:opacity-100"
                        style={{ background: activeCategory.color }}
                      />
                      <span className="truncate text-sm text-white/75 group-hover:text-white">
                        {item}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  )
}
