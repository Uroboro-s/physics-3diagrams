import { useMemo } from 'react'
import { Line } from '@react-three/drei'
import * as THREE from 'three'

interface BackboneProps {
  basePairs: Array<{
    position: THREE.Vector3
    rotation: number
    index: number
  }>
  radius: number
  strand: 1 | 2
}

export function Backbone({ basePairs, radius, strand }: BackboneProps) {
  // Calculate backbone points along the helix
  const points = useMemo(() => {
    const backbonePoints: THREE.Vector3[] = []
    const angleOffset = strand === 1 ? 0 : Math.PI

    for (const pair of basePairs) {
      const x = Math.cos(pair.rotation + angleOffset) * radius
      const z = Math.sin(pair.rotation + angleOffset) * radius

      backbonePoints.push(new THREE.Vector3(x, pair.position.y, z))
    }

    return backbonePoints
  }, [basePairs, radius, strand])

  // Create smooth curve through the points
  const curve = useMemo(() => {
    return new THREE.CatmullRomCurve3(points, false, 'catmullrom', 0.5)
  }, [points])

  // Get points along the curve for rendering
  const curvePoints = useMemo(() => {
    return curve.getPoints(basePairs.length * 10)
  }, [curve, basePairs.length])

  const color = strand === 1 ? '#ff8866' : '#66aaff'

  return (
    <group>
      {/* Main backbone line */}
      <Line
        points={curvePoints}
        color={color}
        lineWidth={3}
        opacity={0.9}
      />

      {/* Sugar molecules at connection points */}
      {points.map((point, index) => (
        <mesh key={index} position={point}>
          <dodecahedronGeometry args={[0.12, 0]} />
          <meshStandardMaterial
            color={color}
            emissive={color}
            emissiveIntensity={0.2}
            roughness={0.5}
            metalness={0.3}
          />
        </mesh>
      ))}

      {/* Phosphate groups between sugars */}
      {points.slice(0, -1).map((point, index) => {
        const nextPoint = points[index + 1]
        const midPoint = new THREE.Vector3().lerpVectors(point, nextPoint, 0.5)

        return (
          <mesh key={`phosphate-${index}`} position={midPoint}>
            <octahedronGeometry args={[0.08, 0]} />
            <meshStandardMaterial
              color="#ffff88"
              emissive="#ffff44"
              emissiveIntensity={0.3}
              roughness={0.3}
              metalness={0.5}
            />
          </mesh>
        )
      })}
    </group>
  )
}
