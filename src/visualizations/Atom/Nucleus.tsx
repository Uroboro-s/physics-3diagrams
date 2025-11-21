import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

export function Nucleus() {
  const groupRef = useRef<THREE.Group>(null)

  // Generate proton and neutron positions in a cluster
  const particles = useMemo(() => {
    const positions: { position: THREE.Vector3; type: 'proton' | 'neutron' }[] = []
    const particleCount = 12 // 6 protons, 6 neutrons (Carbon-like)

    for (let i = 0; i < particleCount; i++) {
      const phi = Math.acos(-1 + (2 * i) / particleCount)
      const theta = Math.sqrt(particleCount * Math.PI) * phi
      const radius = 0.6 + Math.random() * 0.2

      positions.push({
        position: new THREE.Vector3(
          radius * Math.cos(theta) * Math.sin(phi),
          radius * Math.sin(theta) * Math.sin(phi),
          radius * Math.cos(phi)
        ),
        type: i % 2 === 0 ? 'proton' : 'neutron'
      })
    }

    return positions
  }, [])

  useFrame((state) => {
    if (groupRef.current) {
      // Subtle pulsing animation
      const pulse = 1 + Math.sin(state.clock.getElapsedTime() * 2) * 0.02
      groupRef.current.scale.setScalar(pulse)
    }
  })

  return (
    <group ref={groupRef}>
      {/* Core glow */}
      <mesh>
        <sphereGeometry args={[1.2, 32, 32]} />
        <meshBasicMaterial
          color="#ff6600"
          transparent
          opacity={0.15}
        />
      </mesh>

      {/* Individual protons and neutrons */}
      {particles.map((particle, index) => (
        <mesh key={index} position={particle.position}>
          <sphereGeometry args={[0.25, 16, 16]} />
          <meshStandardMaterial
            color={particle.type === 'proton' ? '#ff4444' : '#4488ff'}
            emissive={particle.type === 'proton' ? '#ff2222' : '#2244ff'}
            emissiveIntensity={0.5}
            roughness={0.3}
            metalness={0.7}
          />
        </mesh>
      ))}

      {/* Central energy core */}
      <mesh>
        <sphereGeometry args={[0.3, 32, 32]} />
        <meshBasicMaterial color="#ffffff" />
      </mesh>

      {/* Inner glow point light */}
      <pointLight
        color="#ff8844"
        intensity={2}
        distance={5}
        decay={2}
      />
    </group>
  )
}
