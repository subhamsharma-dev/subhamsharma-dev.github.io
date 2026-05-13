import { motion } from 'framer-motion'
import { Sparkles, Cloud, Server, ShieldCheck, Workflow, Users } from 'lucide-react'
import { about } from '@/data/content'

const iconMap = {
  'AI & LLM systems': Sparkles,
  'Cloud platforms': Cloud,
  'Backend at scale': Server,
  'Compliance': ShieldCheck,
  'IaC + DevOps': Workflow,
  'Mentorship': Users,
} as const

export default function About() {
  return (
    <section id="about" className="relative py-24 md:py-32">
      <div className="container-page">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
        >
          <span className="section-eyebrow">
            <span className="h-px w-6 bg-accent-electric/60" />
            About
          </span>
          <h2 className="mt-4 max-w-3xl font-display text-4xl font-bold tracking-tightest text-white md:text-5xl">
            A short version of <span className="text-gradient">what I do.</span>
          </h2>
        </motion.div>

        <div className="mt-12 grid grid-cols-1 gap-12 lg:grid-cols-[1.2fr_1fr] lg:gap-16">
          {/* LEFT — narrative */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="space-y-5"
          >
            {about.paragraphs.map((p, i) => (
              <p key={i} className="text-lg leading-relaxed text-white/65">
                {p}
              </p>
            ))}
          </motion.div>

          {/* RIGHT — highlights */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="grid grid-cols-1 gap-3 sm:grid-cols-2"
          >
            {about.highlights.map((h, i) => {
              const Icon = iconMap[h.title as keyof typeof iconMap] ?? Sparkles
              return (
                <motion.div
                  key={h.title}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-80px' }}
                  transition={{ duration: 0.5, delay: i * 0.05 }}
                  className="card-surface group p-5"
                >
                  <div className="flex items-start gap-3">
                    <div className="rounded-lg border border-white/10 bg-white/[0.03] p-2 transition-colors group-hover:border-accent-electric/30 group-hover:bg-accent-electric/[0.06]">
                      <Icon className="h-4 w-4 text-accent-electric" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-sm font-semibold text-white">{h.title}</h3>
                      <p className="mt-1 text-[13px] leading-relaxed text-white/55">{h.detail}</p>
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
