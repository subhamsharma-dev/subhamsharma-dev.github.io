import { motion } from 'framer-motion'
import { Code2, Cloud, Brain, Trophy } from 'lucide-react'

const MILESTONES = [
  {
    year: '2020',
    title: 'Started building',
    icon: Code2,
    blurb: 'Joined White Blink as a Software Engineering Intern. Shipped 8+ full-stack features and built a server-side PHP-based dynamic PDF generation engine.',
  },
  {
    year: '2021',
    title: 'Became an owner',
    icon: Cloud,
    blurb: 'Promoted to Associate Software Engineer. Codified 100% of AWS resources across 5+ accounts in CloudFormation + CDK. Manual provisioning errors → zero.',
  },
  {
    year: '2022 – 2025',
    title: 'Scaled & modernized',
    icon: Trophy,
    blurb: 'As SDE-I, architected 10+ event-driven serverless apps, drove SOC 2, migrated a monolith to ECS lifting uptime to 99%, and cut AWS spend by 35%.',
  },
  {
    year: '2025 – Now',
    title: 'AI at production scale',
    icon: Brain,
    blurb: 'As SDE-II, leading HIPAA-compliant AI pipelines (20M+ pages), identity resolution at 10M+ records, and a vendor portal serving 200+ vendors.',
  },
]

export default function About() {
  return (
    <section id="about" className="relative py-24 md:py-32">
      <div className="container-page">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-[1fr_1.4fr] lg:gap-20">
          {/* Left column — title + manifesto */}
          <div>
            <motion.span
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="section-eyebrow"
            >
              <span className="h-px w-6 bg-accent-electric/60" />
              About
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mt-4 font-display text-4xl font-bold tracking-tightest text-white md:text-5xl"
            >
              From intern to leading production AI systems.
            </motion.h2>
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.15 }}
              className="mt-6 space-y-5 text-[15px] leading-relaxed text-white/65"
            >
              <p>
                I'm a software engineer who's spent the last <span className="text-white">4+ years</span> owning systems
                end-to-end — from designing the cloud architecture to writing the line of Python that handles the
                edge case at 2am.
              </p>
              <p>
                I work in the gap between <span className="text-white">AI</span> and{' '}
                <span className="text-white">infrastructure</span>: turning research-y LLM ideas into
                HIPAA-compliant pipelines, agentic systems that handle real traffic, and serverless platforms that
                stay up.
              </p>
              <p>
                My favorite kind of problem is one where the right answer is part architecture, part code, part
                operational discipline — and where a real team depends on it working.
              </p>
            </motion.div>
          </div>

          {/* Right column — timeline */}
          <div className="relative">
            {/* Spine */}
            <div className="absolute left-[14px] top-2 bottom-2 w-px bg-gradient-to-b from-accent-electric/40 via-white/10 to-transparent" />

            <div className="space-y-8">
              {MILESTONES.map((m, i) => {
                const Icon = m.icon
                return (
                  <motion.div
                    key={m.year}
                    initial={{ opacity: 0, x: 16 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: '-50px' }}
                    transition={{ duration: 0.5, delay: i * 0.1 }}
                    className="relative pl-12"
                  >
                    {/* Node */}
                    <div className="absolute left-0 top-0 flex h-7 w-7 items-center justify-center rounded-full border border-accent-electric/30 bg-ink-900 shadow-glow-blue">
                      <Icon className="h-3.5 w-3.5 text-accent-electric" strokeWidth={2} />
                    </div>

                    <div className="card-surface p-5">
                      <div className="flex items-center justify-between gap-4">
                        <h3 className="text-base font-semibold text-white">{m.title}</h3>
                        <span className="font-mono text-[10px] uppercase tracking-wider text-accent-electric">
                          {m.year}
                        </span>
                      </div>
                      <p className="mt-2 text-sm leading-relaxed text-white/60">{m.blurb}</p>
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
