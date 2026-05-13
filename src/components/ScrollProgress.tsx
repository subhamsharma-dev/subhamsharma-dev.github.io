import { motion, useScroll, useSpring } from 'framer-motion'

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 28, mass: 0.3 })

  return (
    <motion.div
      style={{ scaleX }}
      className="scroll-progress fixed left-0 right-0 top-0 z-[150] h-[2px] origin-left"
      aria-hidden="true"
    />
  )
}
