import { useEffect, useMemo, useRef, useState } from 'react'
import { motion } from 'framer-motion'

type Node = {
  id: string
  label: string
  x: number
  y: number
  group: 'core' | 'ai' | 'cloud' | 'data' | 'edge'
  size: number
}

// Hand-placed for a balanced composition
const NODES: Node[] = [
  { id: 'core', label: 'Backend', x: 50, y: 50, group: 'core', size: 9 },
  { id: 'llm', label: 'LLM', x: 22, y: 28, group: 'ai', size: 6 },
  { id: 'rag', label: 'RAG', x: 18, y: 62, group: 'ai', size: 5.5 },
  { id: 'vec', label: 'Vector DB', x: 32, y: 80, group: 'data', size: 5 },
  { id: 'lambda', label: 'Lambda', x: 76, y: 22, group: 'cloud', size: 6.5 },
  { id: 'ecs', label: 'ECS', x: 82, y: 56, group: 'cloud', size: 6 },
  { id: 'spark', label: 'Spark', x: 68, y: 82, group: 'data', size: 5.5 },
  { id: 'queue', label: 'SQS', x: 50, y: 18, group: 'edge', size: 4.5 },
  { id: 'cdn', label: 'CDN', x: 88, y: 38, group: 'edge', size: 4 },
  { id: 'db', label: 'Postgres', x: 50, y: 88, group: 'data', size: 5 },
]

// Edges between nodes
const EDGES: [string, string][] = [
  ['core', 'llm'],
  ['core', 'rag'],
  ['core', 'lambda'],
  ['core', 'ecs'],
  ['core', 'queue'],
  ['core', 'db'],
  ['llm', 'rag'],
  ['rag', 'vec'],
  ['vec', 'db'],
  ['lambda', 'cdn'],
  ['lambda', 'queue'],
  ['ecs', 'spark'],
  ['spark', 'db'],
]

const GROUP_COLOR: Record<Node['group'], string> = {
  core: '#ffffff',
  ai: '#a78bfa',
  cloud: '#5cc8ff',
  data: '#22d3ee',
  edge: '#f472b6',
}

export default function NetworkGraph() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [activeEdge, setActiveEdge] = useState(0)

  // Rotate through edges to animate "data flow"
  useEffect(() => {
    const i = window.setInterval(() => {
      setActiveEdge((a) => (a + 1) % EDGES.length)
    }, 600)
    return () => clearInterval(i)
  }, [])

  const nodeById = useMemo(() => Object.fromEntries(NODES.map((n) => [n.id, n])), [])

  return (
    <div ref={containerRef} className="relative aspect-square w-full max-w-[520px] mx-auto">
      {/* Glow halos */}
      <div className="absolute inset-0 -z-10 rounded-full bg-gradient-to-br from-accent-electric/10 via-transparent to-accent-violet/10 blur-3xl" />

      {/* Concentric rings */}
      <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full">
        {[20, 30, 40].map((r) => (
          <circle
            key={r}
            cx="50" cy="50" r={r}
            fill="none"
            stroke="rgba(255,255,255,0.04)"
            strokeWidth="0.15"
            strokeDasharray="0.6 0.6"
          />
        ))}
      </svg>

      {/* Edges */}
      <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full">
        <defs>
          <linearGradient id="edge-gradient" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#5cc8ff" stopOpacity="0" />
            <stop offset="50%" stopColor="#5cc8ff" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#8b7cf6" stopOpacity="0" />
          </linearGradient>
          <radialGradient id="node-glow">
            <stop offset="0%" stopColor="white" stopOpacity="0.6" />
            <stop offset="100%" stopColor="white" stopOpacity="0" />
          </radialGradient>
        </defs>

        {EDGES.map(([a, b], i) => {
          const na = nodeById[a]
          const nb = nodeById[b]
          if (!na || !nb) return null
          const active = i === activeEdge
          return (
            <g key={`${a}-${b}`}>
              <line
                x1={na.x} y1={na.y} x2={nb.x} y2={nb.y}
                stroke="rgba(255,255,255,0.08)"
                strokeWidth="0.15"
              />
              {active && (
                <motion.line
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: [0, 1, 0] }}
                  transition={{ duration: 0.8, ease: 'easeInOut' }}
                  x1={na.x} y1={na.y} x2={nb.x} y2={nb.y}
                  stroke="url(#edge-gradient)"
                  strokeWidth="0.4"
                  strokeLinecap="round"
                />
              )}
              {active && (
                <motion.circle
                  initial={{ cx: na.x, cy: na.y, opacity: 1 }}
                  animate={{ cx: nb.x, cy: nb.y, opacity: [1, 1, 0] }}
                  transition={{ duration: 0.8, ease: 'easeInOut' }}
                  r="0.6"
                  fill="#5cc8ff"
                />
              )}
            </g>
          )
        })}
      </svg>

      {/* Nodes */}
      <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full overflow-visible">
        {NODES.map((n, i) => (
          <g key={n.id}>
            {/* Halo */}
            <motion.circle
              cx={n.x} cy={n.y}
              r={n.size * 0.7}
              fill={GROUP_COLOR[n.group]}
              opacity="0.15"
              animate={{ r: [n.size * 0.7, n.size * 1.0, n.size * 0.7] }}
              transition={{
                duration: 3 + (i % 4) * 0.4,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: i * 0.15,
              }}
            />
            {/* Node */}
            <motion.circle
              cx={n.x} cy={n.y}
              r={n.size * 0.32}
              fill={GROUP_COLOR[n.group]}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.6 + i * 0.06, type: 'spring', stiffness: 200 }}
              style={{ transformOrigin: `${n.x}px ${n.y}px` }}
            />
            {/* Inner dot */}
            <circle
              cx={n.x} cy={n.y}
              r={n.size * 0.12}
              fill={n.group === 'core' ? '#5cc8ff' : '#0a0b0f'}
            />
          </g>
        ))}
      </svg>

      {/* Labels (HTML over SVG for crisp text) */}
      <div className="absolute inset-0">
        {NODES.map((n, i) => (
          <motion.div
            key={n.id}
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.0 + i * 0.05 }}
            style={{ left: `${n.x}%`, top: `${n.y + n.size * 0.55}%` }}
            className="absolute -translate-x-1/2 whitespace-nowrap font-mono text-[9px] tracking-wider text-white/60 sm:text-[10px]"
          >
            {n.label}
          </motion.div>
        ))}
      </div>

      {/* Center "core" badge */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <div className="relative">
          <div className="absolute -inset-8 rounded-full bg-accent-electric/20 blur-2xl" />
          <div className="relative flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-ink-900/80 backdrop-blur">
            <svg viewBox="0 0 24 24" className="h-4 w-4 text-accent-electric" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 2L2 7l10 5 10-5-10-5z" />
              <path d="M2 17l10 5 10-5" />
              <path d="M2 12l10 5 10-5" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  )
}
