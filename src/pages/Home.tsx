import { motion } from 'framer-motion'
import Hero from '@/components/Hero'
import About from '@/components/About'
import Projects from '@/components/Projects'
import Experience from '@/components/Experience'
import TechStack from '@/components/TechStack'
import Achievements from '@/components/Achievements'
import Contact from '@/components/Contact'

export default function Home() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
    >
      <Hero />
      <Divider />
      <About />
      <Divider />
      <Projects />
      <Divider />
      <Experience />
      <Divider />
      <TechStack />
      <Divider />
      <Achievements />
      <Divider />
      <Contact />
    </motion.div>
  )
}

function Divider() {
  return (
    <div className="container-page">
      <div className="divider-glow" />
    </div>
  )
}
