import { Suspense, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Environment, ContactShadows, Html } from '@react-three/drei'

function ArcLamp({ tone }) {
  return (
    <group>
      <mesh position={[0, -0.85, 0]}>
        <cylinderGeometry args={[0.55, 0.6, 0.14, 48]} />
        <meshStandardMaterial color="#1a1a1a" metalness={0.6} roughness={0.35} />
      </mesh>
      <mesh position={[0, -0.1, 0]}>
        <torusGeometry args={[0.7, 0.035, 16, 64, Math.PI]} />
        <meshStandardMaterial color="#C9A227" metalness={0.85} roughness={0.25} />
      </mesh>
      <mesh position={[0.7, 0.55, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.035, 0.035, 0.55, 24]} />
        <meshStandardMaterial color="#C9A227" metalness={0.85} roughness={0.25} />
      </mesh>
      <mesh position={[0.7, 0.55, 0]}>
        <sphereGeometry args={[0.28, 32, 32]} />
        <meshPhysicalMaterial color={tone} transmission={0.55} thickness={0.6} roughness={0.15} emissive={tone} emissiveIntensity={0.4} />
      </mesh>
    </group>
  )
}

function TerraLamp({ tone }) {
  return (
    <group>
      <mesh position={[0, -0.6, 0]}>
        <cylinderGeometry args={[0.5, 0.6, 0.7, 32]} />
        <meshStandardMaterial color={tone} roughness={0.55} metalness={0.05} />
      </mesh>
      <mesh position={[0, -0.05, 0]}>
        <cylinderGeometry args={[0.42, 0.5, 0.4, 32]} />
        <meshStandardMaterial color={tone} roughness={0.55} metalness={0.05} />
      </mesh>
      <mesh position={[0, 0.35, 0]}>
        <cylinderGeometry args={[0.46, 0.4, 0.28, 32]} />
        <meshStandardMaterial color="#5b4530" roughness={0.7} />
      </mesh>
    </group>
  )
}

function ObeliskLamp({ tone }) {
  return (
    <group>
      <mesh position={[0, -1.1, 0]}>
        <cylinderGeometry args={[0.5, 0.5, 0.12, 32]} />
        <meshStandardMaterial color="#111" metalness={0.7} roughness={0.4} />
      </mesh>
      <mesh position={[0, -0.05, 0]}>
        <cylinderGeometry args={[0.05, 0.05, 2.0, 16]} />
        <meshStandardMaterial color="#222" metalness={0.8} roughness={0.3} />
      </mesh>
      <mesh position={[0, 0.5, 0]}>
        <coneGeometry args={[0.42, 1.1, 32, 1, true]} />
        <meshPhysicalMaterial color={tone} side={2} roughness={0.9} transmission={0.15} emissive={tone} emissiveIntensity={0.15} />
      </mesh>
    </group>
  )
}

function OrbPendant({ tone }) {
  return (
    <group>
      <mesh position={[0, 1.1, 0]}>
        <cylinderGeometry args={[0.02, 0.02, 0.9, 12]} />
        <meshStandardMaterial color="#C9A227" metalness={0.8} roughness={0.3} />
      </mesh>
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.62, 0.03, 16, 48]} />
        <meshStandardMaterial color="#C9A227" metalness={0.85} roughness={0.2} />
      </mesh>
      <mesh>
        <sphereGeometry args={[0.55, 48, 48]} />
        <meshPhysicalMaterial color={tone} transmission={0.7} thickness={0.5} roughness={0.25} emissive="#fff3d6" emissiveIntensity={0.35} />
      </mesh>
    </group>
  )
}

function SteleSconce({ tone }) {
  return (
    <group>
      <mesh>
        <boxGeometry args={[0.9, 2.0, 0.32]} />
        <meshStandardMaterial color="#3a382f" roughness={0.85} />
      </mesh>
      <mesh position={[0, 0, 0.18]}>
        <boxGeometry args={[0.12, 1.7, 0.06]} />
        <meshPhysicalMaterial color={tone} emissive="#fff3d6" emissiveIntensity={0.6} transmission={0.3} roughness={0.3} />
      </mesh>
    </group>
  )
}

function FulcrumLamp({ tone }) {
  return (
    <group>
      <mesh position={[0, -0.9, 0]}>
        <cylinderGeometry args={[0.55, 0.6, 0.16, 6]} />
        <meshStandardMaterial color="#4a3826" roughness={0.6} />
      </mesh>
      <mesh position={[0, -0.1, 0]}>
        <cylinderGeometry args={[0.045, 0.045, 1.6, 16]} />
        <meshStandardMaterial color="#c8c8c8" metalness={0.9} roughness={0.25} />
      </mesh>
      <mesh position={[0.35, 0.65, 0]} rotation={[0, 0, -0.5]}>
        <boxGeometry args={[0.85, 0.16, 0.3]} />
        <meshStandardMaterial color={tone} metalness={0.7} roughness={0.35} />
      </mesh>
      <mesh position={[0.72, 0.85, 0]}>
        <sphereGeometry args={[0.09, 16, 16]} />
        <meshStandardMaterial color="#fff3d6" emissive="#fff3d6" emissiveIntensity={1.2} />
      </mesh>
    </group>
  )
}

const FORM_MAP = {
  arc: ArcLamp,
  terra: TerraLamp,
  obelisk: ObeliskLamp,
  orb: OrbPendant,
  stele: SteleSconce,
  fulcrum: FulcrumLamp,
}

function RotatingForm({ form, tone, spin }) {
  const ref = useRef()
  useFrame((_, delta) => {
    if (ref.current && spin) ref.current.rotation.y += delta * 0.35
  })
  const Comp = FORM_MAP[form] || TerraLamp
  return (
    <group ref={ref}>
      <Comp tone={tone} />
    </group>
  )
}

export default function ProductViewer3D({ form, tone = '#C9A227', interactive = true, spin = true, height = 420 }) {
  return (
    <div style={{ height, width: '100%', borderRadius: 2 }}>
      <Canvas camera={{ position: [2.2, 0.6, 2.6], fov: 40 }} dpr={[1, 1.5]}>
        <Suspense fallback={<Html center><span style={{ color: '#B8B2A4', fontFamily: 'IBM Plex Mono, monospace', fontSize: 12 }}>rendering…</span></Html>}>
          <ambientLight intensity={0.35} />
          <spotLight position={[3, 4, 2]} angle={0.4} penumbra={0.6} intensity={1.2} />
          <RotatingForm form={form} tone={tone} spin={spin} />
          <ContactShadows position={[0, -1.15, 0]} opacity={0.55} scale={6} blur={2.4} far={2} />
          <Environment preset="city" />
          {interactive && (
            <OrbitControls
              enablePan={false}
              enableZoom={interactive}
              minDistance={1.8}
              maxDistance={4.5}
              autoRotate={false}
              maxPolarAngle={Math.PI / 1.7}
            />
          )}
        </Suspense>
      </Canvas>
    </div>
  )
}
