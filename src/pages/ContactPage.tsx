import { motion } from 'framer-motion'
import Contact from '@/components/Contact'

export default function ContactPage() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className="pt-28"
    >
      <div className="container-page pt-12">
        <span className="section-eyebrow">
          <span className="h-px w-6 bg-accent-electric/60" />
          Contact
        </span>
        <h1 className="mt-4 font-display text-5xl font-bold tracking-tightest text-white md:text-6xl">
          Let's <span className="text-gradient">connect</span>.
        </h1>
        <p className="mt-5 max-w-xl text-base leading-relaxed text-white/55">
          Open to senior engineering roles in AI infrastructure, cloud systems, and backend platforms.
          The fastest reply route is email — typically within 24 hours.
        </p>
      </div>
      <Contact />
    </motion.div>
  )
}
