import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

interface PlanetProps {
  name: string
  radius: number
  distance: number
  speed: number
  color: string
  hasRings: boolean
  elapsedTime: number
}

export function Planet({
  name,
  radius,
  distance,
  speed,
  color,
  hasRings,
  elapsedTime
}: PlanetProps) {
  const groupRef = useRef<THREE.Group>(null)
  const planetRef = useRef<THREE.Mesh>(null)

  // Calculate orbital position based on elapsed time
  const angle = elapsedTime * speed * 0.2
  const x = Math.cos(angle) * distance
  const z = Math.sin(angle) * distance

  useFrame(() => {
    if (planetRef.current) {
      // Planet rotation on its axis
      planetRef.current.rotation.y += 0.01
    }
  })

  return (
    <group ref={groupRef} position={[x, 0, z]}>
      {/* Planet sphere */}
      <mesh ref={planetRef}>
        <sphereGeometry args={[radius, 32, 32]} />
        <meshStandardMaterial
          color={color}
          roughness={0.7}
          metalness={0.1}
        />
      </mesh>

      {/* Atmosphere glow for Earth-like planets */}
      {name === 'Earth' && (
        <mesh>
          <sphereGeometry args={[radius * 1.05, 32, 32]} />
          <meshBasicMaterial
            color="#88ccff"
            transparent
            opacity={0.2}
          />
        </mesh>
      )}

      {/* Rings for Saturn and Uranus */}
      {hasRings && (
        <mesh rotation={[Math.PI / 2.5, 0, 0]}>
          <ringGeometry args={[radius * 1.4, radius * 2.2, 64]} />
          <meshStandardMaterial
            color={name === 'Saturn' ? '#d4c4a8' : '#aaddee'}
            transparent
            opacity={0.7}
            side={THREE.DoubleSide}
            roughness={0.8}
          />
        </mesh>
      )}

      {/* Shadow on planet (simulated) */}
      <mesh position={[-radius * 0.3, 0, 0]}>
        <sphereGeometry args={[radius * 1.01, 32, 32]} />
        <meshBasicMaterial
          color="#000000"
          transparent
          opacity={0.3}
        />
      </mesh>
    </group>
  )
}
