import { useRef, useMemo } from 'react'
import * as THREE from 'three'
import { VisualizationProps, Label } from '../types'
import { DiagramLabel } from '../../components/core/DiagramLabel'
import { Sun } from './Sun'
import { Planet } from './Planet'
import { OrbitPath } from './OrbitPath'

// Planet configurations (simplified distances and sizes for visualization)
const planetConfigs = [
  { name: 'Mercury', radius: 0.4, distance: 5, speed: 4.15, color: '#b5b5b5', hasRings: false },
  { name: 'Venus', radius: 0.6, distance: 7, speed: 1.62, color: '#e6c87a', hasRings: false },
  { name: 'Earth', radius: 0.65, distance: 9, speed: 1.0, color: '#4a90d9', hasRings: false },
  { name: 'Mars', radius: 0.5, distance: 12, speed: 0.53, color: '#c1440e', hasRings: false },
  { name: 'Jupiter', radius: 1.5, distance: 17, speed: 0.084, color: '#d4a574', hasRings: false },
  { name: 'Saturn', radius: 1.3, distance: 22, speed: 0.034, color: '#f4d59e', hasRings: true },
  { name: 'Uranus', radius: 0.9, distance: 27, speed: 0.012, color: '#72c2d4', hasRings: true },
  { name: 'Neptune', radius: 0.85, distance: 32, speed: 0.006, color: '#3f54ba', hasRings: false }
]

// Label definitions for the solar system diagram
const solarSystemLabels: Label[] = [
  {
    id: 'sun',
    text: 'Sun',
    description: 'G-type main-sequence star. Contains 99.86% of the solar system mass.',
    position: [0, 3, 0]
  },
  {
    id: 'inner-planets',
    text: 'Inner Planets',
    description: 'Mercury, Venus, Earth, Mars - Rocky terrestrial planets.',
    position: [9, 2, 0]
  },
  {
    id: 'asteroid-belt',
    text: 'Asteroid Belt',
    description: 'Region between Mars and Jupiter containing rocky debris.',
    position: [14.5, 0, 0]
  },
  {
    id: 'outer-planets',
    text: 'Outer Planets',
    description: 'Jupiter, Saturn, Uranus, Neptune - Gas and ice giants.',
    position: [22, 2, 0]
  },
  {
    id: 'earth',
    text: 'Earth',
    description: 'Third planet from the Sun. Only known planet with life.',
    position: [9, 0, 0]
  },
  {
    id: 'saturn-rings',
    text: 'Saturn\'s Rings',
    description: 'Made of ice and rock particles. Extends 282,000 km from the planet.',
    position: [22, 1, 2]
  },
  {
    id: 'orbital-plane',
    text: 'Ecliptic Plane',
    description: 'The plane of Earth\'s orbit. Most planets orbit near this plane.',
    position: [15, -2, 5]
  }
]

export function SolarSystemVisualization({ mode, elapsedTime }: VisualizationProps) {
  const groupRef = useRef<THREE.Group>(null)
  const showLabels = mode === 'interactive'

  return (
    <group ref={groupRef}>
      {/* Sun at center */}
      <Sun />

      {/* Asteroid belt */}
      <AsteroidBelt />

      {/* Planets */}
      {planetConfigs.map((planet) => (
        <group key={planet.name}>
          <OrbitPath radius={planet.distance} />
          <Planet
            name={planet.name}
            radius={planet.radius}
            distance={planet.distance}
            speed={planet.speed}
            color={planet.color}
            hasRings={planet.hasRings}
            elapsedTime={elapsedTime}
          />
        </group>
      ))}

      {/* Labels for interactive mode */}
      {solarSystemLabels.map((label) => (
        <DiagramLabel
          key={label.id}
          label={label}
          visible={showLabels}
        />
      ))}
    </group>
  )
}

// Asteroid belt component
function AsteroidBelt() {
  const asteroids = useMemo(() => {
    const positions: THREE.Vector3[] = []
    const asteroidCount = 200

    for (let i = 0; i < asteroidCount; i++) {
      const angle = Math.random() * Math.PI * 2
      const distance = 14 + Math.random() * 2 // Between Mars and Jupiter
      const y = (Math.random() - 0.5) * 0.5

      positions.push(new THREE.Vector3(
        Math.cos(angle) * distance,
        y,
        Math.sin(angle) * distance
      ))
    }

    return positions
  }, [])

  return (
    <group>
      {asteroids.map((pos, i) => (
        <mesh key={i} position={pos}>
          <sphereGeometry args={[0.05 + Math.random() * 0.05, 6, 6]} />
          <meshStandardMaterial
            color="#888888"
            roughness={0.9}
            metalness={0.1}
          />
        </mesh>
      ))}
    </group>
  )
}
