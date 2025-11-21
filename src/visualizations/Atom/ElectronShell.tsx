import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

interface ElectronShellProps {
  radius: number
  electronCount: number
  speed: number
  color: string
  elapsedTime: number
  shellIndex: number
}

export function ElectronShell({
  radius,
  electronCount,
  speed,
  color,
  elapsedTime,
  shellIndex
}: ElectronShellProps) {
  const groupRef = useRef<THREE.Group>(null)

  // Pre-calculate electron positions
  const electrons = useMemo(() => {
    return Array.from({ length: electronCount }, (_, i) => ({
      phaseOffset: (i / electronCount) * Math.PI * 2,
      tiltAngle: (Math.random() - 0.5) * 0.5, // Slight orbital tilt variation
      orbitTilt: shellIndex * 0.3 + Math.random() * 0.2
    }))
  }, [electronCount, shellIndex])

  useFrame(() => {
    if (groupRef.current) {
      // Rotate the entire shell group slowly
      groupRef.current.rotation.y += speed * 0.001
    }
  })

  return (
    <group ref={groupRef}>
      {electrons.map((electron, index) => {
        // Calculate position based on elapsed time
        const angle = elapsedTime * speed + electron.phaseOffset
        const x = Math.cos(angle) * radius
        const z = Math.sin(angle) * radius
        const y = Math.sin(angle * 2 + electron.tiltAngle) * radius * 0.1

        return (
          <group key={index}>
            {/* Electron sphere */}
            <mesh position={[x, y, z]}>
              <sphereGeometry args={[0.15, 16, 16]} />
              <meshStandardMaterial
                color={color}
                emissive={color}
                emissiveIntensity={0.8}
                roughness={0.2}
                metalness={0.8}
              />
            </mesh>

            {/* Electron glow */}
            <mesh position={[x, y, z]}>
              <sphereGeometry args={[0.25, 16, 16]} />
              <meshBasicMaterial
                color={color}
                transparent
                opacity={0.3}
              />
            </mesh>

            {/* Trail effect - multiple fading spheres */}
            {[1, 2, 3].map((trailIndex) => {
              const trailAngle = angle - trailIndex * 0.15
              const tx = Math.cos(trailAngle) * radius
              const tz = Math.sin(trailAngle) * radius
              const ty = Math.sin(trailAngle * 2 + electron.tiltAngle) * radius * 0.1

              return (
                <mesh key={trailIndex} position={[tx, ty, tz]}>
                  <sphereGeometry args={[0.08 - trailIndex * 0.02, 8, 8]} />
                  <meshBasicMaterial
                    color={color}
                    transparent
                    opacity={0.4 - trailIndex * 0.1}
                  />
                </mesh>
              )
            })}
          </group>
        )
      })}
    </group>
  )
}
