import { useMemo, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'

/**
 * Generates point positions on (or near) the surface of a sphere
 * with a slight random radius wobble for organic depth.
 */
function generateSpherePoints(count: number, radius: number) {
  const positions = new Float32Array(count * 3)
  const colors = new Float32Array(count * 3)

  // Accent colors that match the rest of the design system:
  // electric blue → cyan → violet
  const c1 = new THREE.Color('#5cc8ff')
  const c2 = new THREE.Color('#22d3ee')
  const c3 = new THREE.Color('#8b7cf6')

  for (let i = 0; i < count; i++) {
    // Uniform random point on a sphere
    const u = Math.random()
    const v = Math.random()
    const theta = 2 * Math.PI * u
    const phi = Math.acos(2 * v - 1)
    const r = radius * (0.85 + Math.random() * 0.3) // 0.85x – 1.15x radius

    const x = r * Math.sin(phi) * Math.cos(theta)
    const y = r * Math.sin(phi) * Math.sin(theta)
    const z = r * Math.cos(phi)

    positions[i * 3 + 0] = x
    positions[i * 3 + 1] = y
    positions[i * 3 + 2] = z

    // Blend the three accent colors based on vertical position
    const t = (y / radius + 1) / 2 // 0..1
    const mixed = new THREE.Color()
    if (t < 0.5) {
      mixed.lerpColors(c1, c2, t * 2)
    } else {
      mixed.lerpColors(c2, c3, (t - 0.5) * 2)
    }
    colors[i * 3 + 0] = mixed.r
    colors[i * 3 + 1] = mixed.g
    colors[i * 3 + 2] = mixed.b
  }

  return { positions, colors }
}

function ParticleSphere() {
  const ref = useRef<THREE.Points>(null)
  const COUNT = 2200

  const { positions, colors } = useMemo(() => generateSpherePoints(COUNT, 2.2), [])

  useFrame((state) => {
    if (!ref.current) return
    const t = state.clock.getElapsedTime()
    // Slow rotation on two axes for an organic drift
    ref.current.rotation.y = t * 0.08
    ref.current.rotation.x = Math.sin(t * 0.12) * 0.18
  })

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
          count={positions.length / 3}
        />
        <bufferAttribute
          attach="attributes-color"
          args={[colors, 3]}
          count={colors.length / 3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.025}
        vertexColors
        transparent
        opacity={0.85}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  )
}

function InnerCore() {
  const ref = useRef<THREE.Points>(null)
  const COUNT = 600

  const { positions, colors } = useMemo(() => generateSpherePoints(COUNT, 0.9), [])

  useFrame((state) => {
    if (!ref.current) return
    const t = state.clock.getElapsedTime()
    // Inner core rotates the opposite way, faster
    ref.current.rotation.y = -t * 0.18
    ref.current.rotation.z = Math.sin(t * 0.2) * 0.25
  })

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} count={positions.length / 3} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} count={colors.length / 3} />
      </bufferGeometry>
      <pointsMaterial
        size={0.035}
        vertexColors
        transparent
        opacity={0.55}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  )
}

export default function ParticleCloud() {
  return (
    <div className="relative h-full w-full">
      {/* Glow ring behind the canvas */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <div className="h-[70%] w-[70%] rounded-full bg-gradient-to-br from-accent-electric/15 via-accent-cyan/10 to-accent-violet/15 blur-3xl" />
      </div>

      <Canvas
        camera={{ position: [0, 0, 5], fov: 50 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
        style={{ background: 'transparent' }}
      >
        <ambientLight intensity={0.4} />
        <ParticleSphere />
        <InnerCore />
      </Canvas>
    </div>
  )
}
