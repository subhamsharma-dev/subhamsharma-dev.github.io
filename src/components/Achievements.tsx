import { motion } from 'framer-motion'
import { Award, Trophy } from 'lucide-react'
import { achievements } from '@/data/content'

export default function Achievements() {
  return (
    <section id="achievements" className="relative py-24 md:py-32">
      <div className="container-page">
        <div className="mb-14 max-w-2xl">
          <span className="section-eyebrow">
            <span className="h-px w-6 bg-accent-electric/60" />
            Recognition
          </span>
          <h2 className="mt-4 font-display text-4xl font-bold tracking-tightest text-white md:text-5xl">
            Awards &amp; achievements.
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-white/55 md:text-base">
            A few moments along the way where the work was recognized.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3">
          {achievements.map((a, i) => (
            <motion.div
              key={a.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: i * 0.06 }}
              className="card-surface group relative overflow-hidden p-5"
            >
              {/* Trophy bg */}
              <div className="pointer-events-none absolute -right-4 -top-4 opacity-[0.04] transition-opacity duration-500 group-hover:opacity-[0.08]">
                <Trophy className="h-32 w-32 text-accent-electric" strokeWidth={1} />
              </div>

              <div className="relative">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-accent-electric/20 bg-accent-electric/[0.07]">
                  <Award className="h-4 w-4 text-accent-electric" />
                </div>

                <h3 className="mt-4 text-[15px] font-semibold leading-tight text-white">
                  {a.title}
                </h3>
                <p className="mt-1.5 text-xs leading-relaxed text-white/55">
                  {a.org}
                </p>

                <div className="mt-4 flex items-center justify-between border-t border-white/[0.06] pt-3">
                  <span className="font-mono text-[10px] uppercase tracking-wider text-white/40">
                    {a.note}
                  </span>
                  <span className="font-mono text-[10px] text-accent-electric/80">
                    {a.date}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
