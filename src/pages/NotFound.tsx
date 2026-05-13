import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowLeft, Compass } from 'lucide-react'

export default function NotFound() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="relative flex min-h-screen items-center justify-center px-6 pt-28"
    >
      {/* Atmospheric backgrounds */}
      <div className="grid-bg absolute inset-0 -z-10 opacity-40" aria-hidden="true" />
      <div className="absolute inset-x-0 top-0 -z-10 h-[500px] bg-aurora" aria-hidden="true" />

      <div className="relative w-full max-w-xl text-center">
        <div className="mx-auto mb-8 inline-flex h-16 w-16 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.04]">
          <Compass className="h-7 w-7 text-accent-electric" strokeWidth={1.4} />
        </div>

        <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-white/45">
          Error 404
        </div>
        <h1 className="mt-3 font-display text-5xl font-bold tracking-tightest text-white md:text-6xl">
          Page not <span className="text-gradient">found.</span>
        </h1>
        <p className="mt-5 text-base leading-relaxed text-white/55">
          That URL doesn't lead anywhere — maybe it moved, maybe it never existed. Either way, head back home and try again.
        </p>

        <div className="mt-10 flex items-center justify-center">
          <Link to="/" className="btn-primary group">
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" />
            <span>Back home</span>
          </Link>
        </div>
      </div>
    </motion.div>
  )
}
