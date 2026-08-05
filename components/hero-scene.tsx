'use client'

import { Canvas, useFrame } from '@react-three/fiber'
import { Float, Points, PointMaterial } from '@react-three/drei'
import { useMemo, useRef } from 'react'
import type * as THREE from 'three'

function ParticleField() {
  const ref = useRef<THREE.Points>(null)
  const positions = useMemo(() => {
    const count = 2500
    const arr = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      const r = 6 + Math.random() * 10
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)
      arr[i * 3] = r * Math.sin(phi) * Math.cos(theta)
      arr[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta)
      arr[i * 3 + 2] = r * Math.cos(phi)
    }
    return arr
  }, [])

  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.rotation.y += delta * 0.02
      ref.current.rotation.x += delta * 0.005
    }
  })

  return (
    <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#8b949e"
        size={0.025}
        sizeAttenuation
        depthWrite={false}
        opacity={0.6}
      />
    </Points>
  )
}

function WireCore() {
  const outer = useRef<THREE.Mesh>(null)
  const inner = useRef<THREE.Mesh>(null)

  useFrame((state, delta) => {
    const t = state.clock.elapsedTime
    if (outer.current) {
      outer.current.rotation.y += delta * 0.15
      outer.current.rotation.x = Math.sin(t * 0.2) * 0.3
    }
    if (inner.current) {
      inner.current.rotation.y -= delta * 0.25
      inner.current.rotation.z += delta * 0.1
    }
  })

  return (
    <Float speed={1.5} rotationIntensity={0.4} floatIntensity={0.8}>
      <mesh ref={outer}>
        <icosahedronGeometry args={[2.2, 1]} />
        <meshStandardMaterial
          color="#30363d"
          wireframe
          emissive="#8b949e"
          emissiveIntensity={0.25}
        />
      </mesh>
      <mesh ref={inner}>
        <icosahedronGeometry args={[1.3, 0]} />
        <meshStandardMaterial
          color="#161b22"
          metalness={0.9}
          roughness={0.2}
          emissive="#e6edf3"
          emissiveIntensity={0.04}
        />
      </mesh>
    </Float>
  )
}

function CameraRig() {
  useFrame((state) => {
    const { pointer, camera } = state
    camera.position.x += (pointer.x * 0.8 - camera.position.x) * 0.03
    camera.position.y += (pointer.y * 0.5 - camera.position.y) * 0.03
    camera.lookAt(0, 0, 0)
  })
  return null
}

export default function HeroScene() {
  return (
    <div className="absolute inset-0" aria-hidden="true">
      <Canvas
        camera={{ position: [0, 0, 7], fov: 50 }}
        gl={{ antialias: true, alpha: true }}
        dpr={[1, 2]}
      >
        <ambientLight intensity={0.4} />
        <directionalLight position={[5, 5, 5]} intensity={1.2} color="#e6edf3" />
        <pointLight position={[-5, -3, -5]} intensity={0.5} color="#8b949e" />
        <ParticleField />
        <WireCore />
        <CameraRig />
      </Canvas>
    </div>
  )
}
