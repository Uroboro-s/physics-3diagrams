import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

export function Sun() {
  const meshRef = useRef<THREE.Mesh>(null)
  const glowRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (meshRef.current) {
      // Slow rotation
      meshRef.current.rotation.y += 0.002
    }

    if (glowRef.current) {
      // Pulsing glow effect
      const pulse = 1 + Math.sin(state.clock.getElapsedTime() * 0.5) * 0.1
      glowRef.current.scale.setScalar(pulse)
    }
  })

  return (
    <group>
      {/* Sun core */}
      <mesh ref={meshRef}>
        <sphereGeometry args={[2.5, 64, 64]} />
        <meshStandardMaterial
          color="#ffaa00"
          emissive="#ff6600"
          emissiveIntensity={2}
          roughness={1}
          metalness={0}
        />
      </mesh>

      {/* Inner glow */}
      <mesh ref={glowRef}>
        <sphereGeometry args={[3, 32, 32]} />
        <meshBasicMaterial
          color="#ff8800"
          transparent
          opacity={0.3}
        />
      </mesh>

      {/* Outer corona */}
      <mesh>
        <sphereGeometry args={[4, 32, 32]} />
        <meshBasicMaterial
          color="#ff6600"
          transparent
          opacity={0.1}
        />
      </mesh>

      {/* Sun light source */}
      <pointLight
        color="#ffddaa"
        intensity={3}
        distance={100}
        decay={2}
      />

      {/* Corona rays (subtle) */}
      {[...Array(8)].map((_, i) => {
        const angle = (i / 8) * Math.PI * 2
        return (
          <mesh
            key={i}
            position={[Math.cos(angle) * 3.5, 0, Math.sin(angle) * 3.5]}
            rotation={[0, 0, angle]}
          >
            <planeGeometry args={[0.3, 2]} />
            <meshBasicMaterial
              color="#ffaa44"
              transparent
              opacity={0.2}
              side={THREE.DoubleSide}
            />
          </mesh>
        )
      })}
    </group>
  )
}
