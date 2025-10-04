"use client"

import { Suspense, useRef } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { Environment, Sparkles, Stars } from "@react-three/drei"
import type * as THREE from "three"

function Rotator({ color = "#00e5ff" }: { color?: string }) {
  const group = useRef<THREE.Group>(null)
  useFrame((_, delta) => {
    if (group.current) {
      group.current.rotation.y += delta * 0.15
      group.current.rotation.x += delta * 0.05
    }
  })
  return (
    <group ref={group}>
      <mesh position={[0, 0, -2]}>
        <torusKnotGeometry args={[1.2, 0.32, 128, 32]} />
        <meshStandardMaterial
          color={color}
          metalness={0.4}
          roughness={0.25}
          emissive={color}
          emissiveIntensity={0.12}
        />
      </mesh>
      <mesh position={[-2.2, -0.8, -1.2]}>
        <icosahedronGeometry args={[0.6, 0]} />
        <meshStandardMaterial color="#66f0ff" metalness={0.3} roughness={0.4} />
      </mesh>
      <mesh position={[2.4, 0.9, -1.4]}>
        <octahedronGeometry args={[0.5, 0]} />
        <meshStandardMaterial color="#7af7ff" metalness={0.2} roughness={0.5} />
      </mesh>
    </group>
  )
}

export function Project3DBackground() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 h-full w-full">
      <Canvas dpr={[1, 2]} camera={{ position: [0, 0, 4], fov: 50 }} gl={{ antialias: true, alpha: true }}>
        <color attach="background" args={["#0b0d12"]} />
        <fog attach="fog" args={["#0b0d12", 6, 16]} />
        <Suspense fallback={null}>
          <Environment preset="city" />
          <Stars radius={50} depth={20} count={1500} factor={3} saturation={0} speed={0.25} fade />
          <Sparkles size={2} count={60} scale={12} speed={0.4} color="#7af7ff" />
          <Rotator color="#00e5ff" />
        </Suspense>
        <ambientLight intensity={0.4} />
        <directionalLight position={[3, 4, 2]} intensity={1.2} />
      </Canvas>
    </div>
  )
}
