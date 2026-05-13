import { motion } from 'framer-motion'
import Projects from '@/components/Projects'

export default function ProjectsPage() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className="pt-28"
    >
      <div className="container-page pt-12">
        <span className="section-eyebrow">
          <span className="h-px w-6 bg-accent-electric/60" />
          Portfolio
        </span>
        <h1 className="mt-4 max-w-3xl font-display text-5xl font-bold tracking-tightest text-white md:text-6xl">
          Everything I've <span className="text-gradient">built.</span>
        </h1>
        <p className="mt-5 max-w-2xl text-base leading-relaxed text-white/55">
          The full collection — filterable by domain. Each project includes the problem, the solution, the trade-offs, and what shipped.
        </p>
      </div>

      <Projects showAll hideHeader />
    </motion.div>
  )
}
