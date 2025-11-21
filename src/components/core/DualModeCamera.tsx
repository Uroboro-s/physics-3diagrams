import { useRef } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import { useAppStore } from '../../stores/appStore'
import * as THREE from 'three'

export function DualModeCamera() {
  const mode = useAppStore((state) => state.mode)
  const currentVisualization = useAppStore((state) => state.currentVisualization)
  const controlsRef = useRef<any>(null)
  const { camera } = useThree()

  // Camera configuration per visualization
  const cameraConfigs = {
    'atom': {
      animated: { distance: 12, speed: 0.15, elevation: 0.3 },
      interactive: { minDistance: 5, maxDistance: 25 }
    },
    'solar-system': {
      animated: { distance: 35, speed: 0.08, elevation: 0.4 },
      interactive: { minDistance: 15, maxDistance: 80 }
    },
    'dna-helix': {
      animated: { distance: 20, speed: 0.12, elevation: 0.2 },
      interactive: { minDistance: 8, maxDistance: 40 }
    }
  }

  const config = cameraConfigs[currentVisualization]

  useFrame((state) => {
    if (mode === 'animated' && controlsRef.current) {
      // Smooth auto-orbit in animated mode
      const time = state.clock.getElapsedTime()
      const { distance, speed, elevation } = config.animated

      const x = Math.sin(time * speed) * distance
      const z = Math.cos(time * speed) * distance
      const y = Math.sin(time * speed * 0.5) * distance * elevation + distance * 0.3

      camera.position.lerp(new THREE.Vector3(x, y, z), 0.02)
      camera.lookAt(0, 0, 0)

      // Disable user controls during animated mode
      controlsRef.current.enabled = false
    } else if (controlsRef.current) {
      // Enable controls in interactive mode
      controlsRef.current.enabled = true
    }
  })

  return (
    <OrbitControls
      ref={controlsRef}
      enablePan={false}
      enableZoom={true}
      enableRotate={true}
      minDistance={config.interactive.minDistance}
      maxDistance={config.interactive.maxDistance}
      enableDamping={true}
      dampingFactor={0.05}
      rotateSpeed={0.5}
      zoomSpeed={0.8}
    />
  )
}
