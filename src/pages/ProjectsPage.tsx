import { motion } from 'framer-motion'
import Projects from '@/components/Projects'

export default function ProjectsPage() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      className="pt-28"
    >
      {/* Atmospheric header */}
      <div className="container-page mb-4 pt-12">
        <div className="grid-bg absolute inset-0 -z-10 opacity-30" />
        <span className="section-eyebrow">
          <span className="h-px w-6 bg-accent-electric/60" />
          Portfolio
        </span>
        <h1 className="mt-4 max-w-3xl font-display text-5xl font-bold tracking-tightest text-white md:text-6xl">
          Every project. Every system. <span className="text-gradient">Shipped.</span>
        </h1>
        <p className="mt-5 max-w-2xl text-base leading-relaxed text-white/55">
          The full collection — filterable by domain. Each project includes the problem, the solution, the scale, and the impact.
        </p>
      </div>

      <Projects showAll />
    </motion.div>
  )
}
