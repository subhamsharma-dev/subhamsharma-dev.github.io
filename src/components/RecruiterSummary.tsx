import { motion } from 'framer-motion'
import {
  Sparkles, Cloud, Server, Network, ShieldCheck, Activity, Users, Workflow,
  type LucideIcon,
} from 'lucide-react'
import { recruiterCards } from '@/data/content'

const ICONS: Record<string, LucideIcon> = {
  Sparkles, Cloud, Server, Network, ShieldCheck, Activity, Users, Workflow,
}

export default function RecruiterSummary() {
  return (
    <section id="for-recruiters" className="relative py-24 md:py-32">
      <div className="container-page">
        {/* Header */}
        <div className="mx-auto max-w-3xl text-center">
          <motion.span
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            className="section-eyebrow"
          >
            <span className="h-px w-6 bg-accent-electric/60" />
            For Recruiters &amp; Hiring Managers
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ delay: 0.05 }}
            className="mt-5 font-display text-4xl font-bold tracking-tightest text-white md:text-5xl"
          >
            Why teams reach out
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ delay: 0.1 }}
            className="mt-5 text-base leading-relaxed text-white/55 md:text-lg"
          >
            Where I create the most value — engineering depth paired with the business impact that matters.
          </motion.p>
        </div>

        {/* Grid */}
        <div className="mt-16 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
          {recruiterCards.map((card, i) => {
            const Icon = ICONS[card.icon] ?? Sparkles
            return (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
                className="card-surface group relative overflow-hidden p-5"
              >
                {/* Corner glow */}
                <div className="pointer-events-none absolute -right-12 -top-12 h-32 w-32 rounded-full bg-accent-electric/8 blur-3xl opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                {/* Icon */}
                <div className="relative inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-gradient-to-br from-white/10 to-white/[0.02]">
                  <Icon className="h-4.5 w-4.5 text-accent-electric" strokeWidth={1.6} />
                </div>

                {/* Title */}
                <h3 className="mt-5 text-base font-semibold text-white">
                  {card.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-white/55">
                  {card.blurb}
                </p>

                {/* Proof */}
                <div className="mt-5 flex items-center gap-2 border-t border-white/[0.06] pt-4">
                  <span className="h-1 w-1 rounded-full bg-accent-electric" />
                  <span className="font-mono text-[10px] uppercase tracking-wider text-white/50">
                    {card.proof}
                  </span>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
