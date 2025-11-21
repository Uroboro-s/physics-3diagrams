import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

export function Lighting() {
  const pointLightRef = useRef<THREE.PointLight>(null)

  useFrame((state) => {
    if (pointLightRef.current) {
      // Subtle light movement for dynamic shadows
      const time = state.clock.getElapsedTime()
      pointLightRef.current.position.x = Math.sin(time * 0.2) * 5
      pointLightRef.current.position.z = Math.cos(time * 0.2) * 5
    }
  })

  return (
    <>
      {/* Ambient light for base illumination */}
      <ambientLight intensity={0.3} color="#4a90d9" />

      {/* Main directional light */}
      <directionalLight
        position={[10, 10, 5]}
        intensity={1}
        color="#ffffff"
        castShadow
        shadow-mapSize={[2048, 2048]}
      />

      {/* Dynamic point light for highlights */}
      <pointLight
        ref={pointLightRef}
        position={[5, 5, 5]}
        intensity={0.8}
        color="#6eb5ff"
        distance={50}
        decay={2}
      />

      {/* Fill light from below */}
      <pointLight
        position={[0, -10, 0]}
        intensity={0.3}
        color="#ff6b9d"
        distance={30}
        decay={2}
      />

      {/* Rim light for edge definition */}
      <directionalLight
        position={[-5, 5, -10]}
        intensity={0.5}
        color="#9d4edd"
      />
    </>
  )
}
