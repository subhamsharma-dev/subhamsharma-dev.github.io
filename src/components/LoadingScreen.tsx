import { motion } from 'framer-motion'

export default function LoadingScreen() {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="fixed inset-0 z-[200] flex items-center justify-center bg-ink-950"
      aria-hidden="true"
    >
      <div className="relative flex flex-col items-center gap-6">
        {/* Animated mark */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="relative h-16 w-16"
        >
          <svg viewBox="0 0 64 64" className="h-full w-full">
            <defs>
              <linearGradient id="lg1" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#5cc8ff" />
                <stop offset="100%" stopColor="#8b7cf6" />
              </linearGradient>
            </defs>
            <motion.circle
              cx="32" cy="32" r="22"
              stroke="url(#lg1)" strokeWidth="1.5" fill="none"
              strokeDasharray="140"
              animate={{ strokeDashoffset: [140, 0, 140], rotate: 360 }}
              transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
              style={{ transformOrigin: 'center' }}
            />
            <circle cx="32" cy="32" r="3" fill="#5cc8ff" />
          </svg>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-center"
        >
          <div className="font-mono text-[11px] uppercase tracking-[0.3em] text-white/40">
            Subham Sharma
          </div>
          <div className="mt-1 text-[10px] text-white/30">Spinning up…</div>
        </motion.div>
      </div>
    </motion.div>
  )
}
