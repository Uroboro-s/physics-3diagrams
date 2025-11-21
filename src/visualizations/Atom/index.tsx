import { useRef, useMemo } from 'react'
import * as THREE from 'three'
import { VisualizationProps, Label } from '../types'
import { DiagramLabel } from '../../components/core/DiagramLabel'
import { Nucleus } from './Nucleus'
import { ElectronShell } from './ElectronShell'

// Label definitions for the atom diagram
const atomLabels: Label[] = [
  {
    id: 'nucleus',
    text: 'Nucleus',
    description: 'Contains protons (+) and neutrons. Makes up 99.9% of atomic mass.',
    position: [0, 0, 0]
  },
  {
    id: 'proton',
    text: 'Proton',
    description: 'Positively charged particle. Determines atomic number.',
    position: [0.5, 0.5, 0]
  },
  {
    id: 'neutron',
    text: 'Neutron',
    description: 'Neutral particle. Stabilizes the nucleus.',
    position: [-0.5, 0.5, 0]
  },
  {
    id: 'electron-k',
    text: 'K Shell (n=1)',
    description: 'First electron shell. Can hold up to 2 electrons.',
    position: [3, 0, 0]
  },
  {
    id: 'electron-l',
    text: 'L Shell (n=2)',
    description: 'Second electron shell. Can hold up to 8 electrons.',
    position: [5, 0, 0]
  },
  {
    id: 'electron-m',
    text: 'M Shell (n=3)',
    description: 'Third electron shell. Can hold up to 18 electrons.',
    position: [7, 0, 0]
  },
  {
    id: 'orbital-path',
    text: 'Electron Orbital',
    description: 'Probability region where electrons are most likely found.',
    position: [4, 3, 0]
  }
]

export function AtomVisualization({ mode, elapsedTime }: VisualizationProps) {
  const groupRef = useRef<THREE.Group>(null)

  // Electron shell configurations
  const shells = useMemo(() => [
    { radius: 3, electronCount: 2, speed: 1.5, color: '#00ffff' },
    { radius: 5, electronCount: 8, speed: 1.0, color: '#00ff88' },
    { radius: 7, electronCount: 8, speed: 0.7, color: '#ff88ff' }
  ], [])

  const showLabels = mode === 'interactive'

  return (
    <group ref={groupRef}>
      {/* Central nucleus */}
      <Nucleus />

      {/* Electron shells */}
      {shells.map((shell, index) => (
        <ElectronShell
          key={index}
          radius={shell.radius}
          electronCount={shell.electronCount}
          speed={shell.speed}
          color={shell.color}
          elapsedTime={elapsedTime}
          shellIndex={index}
        />
      ))}

      {/* Orbital paths (visual guides) */}
      {shells.map((shell, index) => (
        <mesh key={`path-${index}`} rotation={[Math.PI / 2, 0, 0]}>
          <ringGeometry args={[shell.radius - 0.02, shell.radius + 0.02, 64]} />
          <meshBasicMaterial
            color={shell.color}
            transparent
            opacity={0.2}
            side={THREE.DoubleSide}
          />
        </mesh>
      ))}

      {/* Labels for interactive mode */}
      {atomLabels.map((label) => (
        <DiagramLabel
          key={label.id}
          label={label}
          visible={showLabels}
        />
      ))}
    </group>
  )
}
