import { Suspense, useRef, useState, useEffect, Component } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float, RoundedBox, Sphere, Cylinder, Torus, Sparkles, ContactShadows, Environment } from '@react-three/drei'

const CYAN = '#22d3ee'
const BLUE = '#4ea1e2'
const METAL = '#e9f1ff'
const DARK = '#1b2740'

// --- easing helpers ---
const clamp = (v, a, b) => Math.min(b, Math.max(a, v))
const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3)
const easeOutBack = (t) => {
  const c1 = 1.70158, c3 = c1 + 1
  return 1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2)
}
const easeInOut = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2)

// When the whole robot is considered "assembled" (idle motion + interaction start).
const ASSEMBLED_AT = 2.8

/* A part that flies in from an offset and pops into place on load. */
function AnimatedPart({ delay = 0, duration = 0.7, from = [0, 0, 0], position = [0, 0, 0], children }) {
  const ref = useRef()
  useFrame((state) => {
    if (!ref.current) return
    const p = clamp((state.clock.elapsedTime - delay) / duration, 0, 1)
    const eOut = easeOutCubic(p)
    ref.current.position.set(
      position[0] + from[0] * (1 - eOut),
      position[1] + from[1] * (1 - eOut),
      position[2] + from[2] * (1 - eOut),
    )
    ref.current.scale.setScalar(Math.max(0.0001, easeOutBack(p)))
  })
  return <group ref={ref} scale={0.0001}>{children}</group>
}

function RobotModel() {
  const group = useRef()
  const headTrack = useRef()
  const leftArm = useRef()
  const rightArm = useRef()
  const antennaTip = useRef()
  const eyeL = useRef()
  const eyeR = useRef()
  const chest = useRef()
  const ring = useRef()

  const [hovered, setHovered] = useState(false)
  const drag = useRef({ active: false, lastX: 0, rotY: 0, moved: 0 })
  const reactReq = useRef(false)
  const reactStart = useRef(-1)

  // Drag handling on the window so a spin keeps tracking even off the mesh.
  useEffect(() => {
    const onMove = (e) => {
      if (!drag.current.active) return
      const dx = e.clientX - drag.current.lastX
      drag.current.lastX = e.clientX
      drag.current.rotY += dx * 0.01
      drag.current.moved += Math.abs(dx)
    }
    const onUp = () => {
      if (!drag.current.active) return
      drag.current.active = false
      document.body.style.cursor = hovered ? 'grab' : 'auto'
      if (drag.current.moved < 5) reactReq.current = true // treat as a click
    }
    window.addEventListener('pointermove', onMove)
    window.addEventListener('pointerup', onUp)
    return () => {
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointerup', onUp)
    }
  }, [hovered])

  const startDrag = (e) => {
    e.stopPropagation()
    drag.current.active = true
    drag.current.lastX = e.clientX
    drag.current.moved = 0
    document.body.style.cursor = 'grabbing'
  }
  const onOver = (e) => { e.stopPropagation(); setHovered(true); if (!drag.current.active) document.body.style.cursor = 'grab' }
  const onOut = () => { setHovered(false); if (!drag.current.active) document.body.style.cursor = 'auto' }

  const setGlow = (m, base, extra) => { if (m && m.material) m.material.emissiveIntensity = base * (1 + extra) }

  useFrame((state) => {
    const e = state.clock.elapsedTime
    const settle = clamp((e - ASSEMBLED_AT) / 0.8, 0, 1) // ramp idle/interaction in after assembly

    // Trigger a click reaction.
    if (reactReq.current && reactStart.current < 0) { reactStart.current = e; reactReq.current = false }
    let spin = 0, bounce = 0, flash = 0
    if (reactStart.current >= 0) {
      const p = (e - reactStart.current) / 0.9
      if (p >= 1) reactStart.current = -1
      else { spin = easeInOut(p) * Math.PI * 2; bounce = Math.sin(p * Math.PI) * 0.5; flash = Math.sin(p * Math.PI) }
    }

    if (group.current) {
      group.current.rotation.y = Math.sin(e * 0.4) * 0.12 * settle + state.pointer.x * 0.15 * settle + drag.current.rotY + spin
      group.current.position.y = -0.4 + bounce
      const target = 1.05 * (hovered ? 1.05 : 1)
      group.current.scale.x += (target - group.current.scale.x) * 0.12
      group.current.scale.y += (target - group.current.scale.y) * 0.12
      group.current.scale.z += (target - group.current.scale.z) * 0.12
    }
    if (headTrack.current) {
      headTrack.current.rotation.y += (state.pointer.x * 0.6 * settle - headTrack.current.rotation.y) * 0.06
      headTrack.current.rotation.x += (-state.pointer.y * 0.35 * settle - headTrack.current.rotation.x) * 0.06
    }
    if (antennaTip.current) antennaTip.current.scale.setScalar(1 + Math.sin(e * 4) * 0.25)
    if (leftArm.current) leftArm.current.rotation.z = 0.35 + Math.sin(e * 1.6) * 0.18 * settle
    if (rightArm.current) rightArm.current.rotation.z = -0.35 - Math.sin(e * 1.6 + 1) * 0.18 * settle

    const extra = (hovered ? 0.5 : 0) + flash * 2
    setGlow(eyeL.current, 2.4, extra)
    setGlow(eyeR.current, 2.4, extra)
    setGlow(chest.current, 2.6, extra * 0.6)
    setGlow(ring.current, 1.6, extra * 0.6)
    setGlow(antennaTip.current, 2.8, extra * 0.6)
  })

  return (
    <group ref={group} position={[0, -0.4, 0]} scale={0.0001}
      onPointerOver={onOver} onPointerOut={onOut} onPointerDown={startDrag}>

      {/* Hover ring — rises from below */}
      <AnimatedPart delay={0.1} duration={0.6} from={[0, -2.2, 0]} position={[0, -1.15, 0]}>
        <Torus ref={ring} args={[0.7, 0.06, 16, 48]} rotation={[Math.PI / 2, 0, 0]}>
          <meshStandardMaterial color={CYAN} emissive={CYAN} emissiveIntensity={1.6} toneMapped={false} />
        </Torus>
      </AnimatedPart>

      {/* Torso — drops in */}
      <AnimatedPart delay={0.4} duration={0.7} from={[0, 3, 0]} position={[0, -0.1, 0]}>
        <RoundedBox args={[1.7, 1.5, 1.05]} radius={0.32} smoothness={5}>
          <meshStandardMaterial color={METAL} metalness={0.55} roughness={0.28} />
        </RoundedBox>
        {/* Chest core — pops after the torso */}
        <AnimatedPart delay={1.4} duration={0.5} from={[0, 0, 2.2]} position={[0, 0.15, 0.55]}>
          <Torus ref={chest} args={[0.32, 0.07, 16, 40]}>
            <meshStandardMaterial color={BLUE} emissive={BLUE} emissiveIntensity={1.4} toneMapped={false} />
          </Torus>
          <Sphere args={[0.18, 24, 24]} position={[0, 0, 0.01]}>
            <meshStandardMaterial color={CYAN} emissive={CYAN} emissiveIntensity={2.6} toneMapped={false} />
          </Sphere>
        </AnimatedPart>
      </AnimatedPart>

      {/* Neck */}
      <AnimatedPart delay={0.75} duration={0.5} from={[0, 2, 0]} position={[0, 0.68, 0]}>
        <Cylinder args={[0.28, 0.32, 0.25, 20]}>
          <meshStandardMaterial color={DARK} metalness={0.7} roughness={0.3} />
        </Cylinder>
      </AnimatedPart>

      {/* Head — drops from the top */}
      <AnimatedPart delay={1.0} duration={0.7} from={[0, 4, 0]} position={[0, 1.35, 0]}>
        <group ref={headTrack}>
          <RoundedBox args={[1.5, 1.2, 1.3]} radius={0.28} smoothness={5}>
            <meshStandardMaterial color={METAL} metalness={0.6} roughness={0.25} />
          </RoundedBox>

          {/* Ears */}
          {[-0.82, 0.82].map((x) => (
            <Cylinder key={x} args={[0.14, 0.14, 0.2, 20]} rotation={[0, 0, Math.PI / 2]} position={[x, 0, 0]}>
              <meshStandardMaterial color={BLUE} metalness={0.7} roughness={0.3} />
            </Cylinder>
          ))}

          {/* Face — powers on after the head lands */}
          <AnimatedPart delay={1.55} duration={0.45} from={[0, 0, 0.8]} position={[0, 0, 0]}>
            <RoundedBox args={[1.15, 0.62, 0.16]} radius={0.16} smoothness={4} position={[0, 0.02, 0.62]}>
              <meshStandardMaterial color={DARK} metalness={0.8} roughness={0.2} />
            </RoundedBox>
            <Sphere ref={eyeL} args={[0.14, 24, 24]} position={[-0.28, 0.05, 0.74]}>
              <meshStandardMaterial color={CYAN} emissive={CYAN} emissiveIntensity={2.4} toneMapped={false} />
            </Sphere>
            <Sphere ref={eyeR} args={[0.14, 24, 24]} position={[0.28, 0.05, 0.74]}>
              <meshStandardMaterial color={CYAN} emissive={CYAN} emissiveIntensity={2.4} toneMapped={false} />
            </Sphere>
            <RoundedBox args={[0.5, 0.06, 0.05]} radius={0.03} position={[0, -0.22, 0.74]}>
              <meshStandardMaterial color={BLUE} emissive={BLUE} emissiveIntensity={1.2} toneMapped={false} />
            </RoundedBox>
          </AnimatedPart>

          {/* Antenna — extends up last */}
          <AnimatedPart delay={2.2} duration={0.5} from={[0, 1.5, 0]} position={[0, 0, 0]}>
            <Cylinder args={[0.035, 0.035, 0.5, 12]} position={[0, 0.85, 0]}>
              <meshStandardMaterial color={METAL} metalness={0.8} roughness={0.2} />
            </Cylinder>
            <Sphere ref={antennaTip} args={[0.11, 20, 20]} position={[0, 1.15, 0]}>
              <meshStandardMaterial color={CYAN} emissive={CYAN} emissiveIntensity={2.8} toneMapped={false} />
            </Sphere>
          </AnimatedPart>
        </group>
      </AnimatedPart>

      {/* Left arm — slides in from the left */}
      <AnimatedPart delay={1.7} duration={0.55} from={[-4, 0, 0]} position={[-0.95, 0.3, 0]}>
        <group ref={leftArm}>
          <Sphere args={[0.26, 20, 20]}>
            <meshStandardMaterial color={BLUE} metalness={0.7} roughness={0.3} />
          </Sphere>
          <Cylinder args={[0.17, 0.15, 1, 16]} position={[-0.15, -0.55, 0]}>
            <meshStandardMaterial color={METAL} metalness={0.6} roughness={0.3} />
          </Cylinder>
          <Sphere args={[0.22, 20, 20]} position={[-0.28, -1.05, 0]}>
            <meshStandardMaterial color={DARK} metalness={0.6} roughness={0.35} />
          </Sphere>
        </group>
      </AnimatedPart>

      {/* Right arm — slides in from the right */}
      <AnimatedPart delay={1.9} duration={0.55} from={[4, 0, 0]} position={[0.95, 0.3, 0]}>
        <group ref={rightArm}>
          <Sphere args={[0.26, 20, 20]}>
            <meshStandardMaterial color={BLUE} metalness={0.7} roughness={0.3} />
          </Sphere>
          <Cylinder args={[0.17, 0.15, 1, 16]} position={[0.15, -0.55, 0]}>
            <meshStandardMaterial color={METAL} metalness={0.6} roughness={0.3} />
          </Cylinder>
          <Sphere args={[0.22, 20, 20]} position={[0.28, -1.05, 0]}>
            <meshStandardMaterial color={DARK} metalness={0.6} roughness={0.35} />
          </Sphere>
        </group>
      </AnimatedPart>
    </group>
  )
}

function Scene() {
  return (
    <>
      <ambientLight intensity={0.6} />
      <directionalLight position={[5, 6, 4]} intensity={1.4} color="#ffffff" />
      <pointLight position={[-4, 2, 3]} intensity={40} color={CYAN} />
      <pointLight position={[4, -1, 4]} intensity={25} color={BLUE} />
      <Suspense fallback={null}>
        <Float speed={2} rotationIntensity={0.35} floatIntensity={0.9}>
          <RobotModel />
        </Float>
        <Sparkles count={40} scale={7} size={3} speed={0.4} color={CYAN} opacity={0.7} />
        <ContactShadows position={[0, -2.1, 0]} opacity={0.35} scale={9} blur={2.6} far={4} color="#000000" />
        <Environment preset="city" />
      </Suspense>
    </>
  )
}

/* Error boundary so a WebGL failure degrades gracefully to a static badge. */
class RobotBoundary extends Component {
  constructor(props) { super(props); this.state = { failed: false } }
  static getDerivedStateFromError() { return { failed: true } }
  render() {
    if (this.state.failed) return this.props.fallback || null
    return this.props.children
  }
}

export default function Robot({ className = '' }) {
  const fallback = (
    <div className={`robot-fallback ${className}`} aria-hidden="true">
      <div className="robot-fallback__emoji">🤖</div>
    </div>
  )
  return (
    <RobotBoundary fallback={fallback}>
      <Canvas
        className={className}
        dpr={[1, 2]}
        camera={{ position: [0, 0.5, 6.2], fov: 42 }}
        gl={{ antialias: true, alpha: true }}
      >
        <Scene />
      </Canvas>
    </RobotBoundary>
  )
}
