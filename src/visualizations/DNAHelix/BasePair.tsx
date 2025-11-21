import * as THREE from 'three'

interface BasePairProps {
  position: THREE.Vector3
  rotation: number
  baseInfo: {
    base1: string
    base2: string
    color1: string
    color2: string
  }
  radius: number
}

export function BasePair({ position, rotation, baseInfo, radius }: BasePairProps) {
  // Calculate the positions of the two bases
  const x1 = Math.cos(rotation) * radius
  const z1 = Math.sin(rotation) * radius
  const x2 = Math.cos(rotation + Math.PI) * radius
  const z2 = Math.sin(rotation + Math.PI) * radius

  return (
    <group position={position}>
      {/* Base 1 (nucleotide) */}
      <mesh position={[x1, 0, z1]}>
        <sphereGeometry args={[0.25, 16, 16]} />
        <meshStandardMaterial
          color={baseInfo.color1}
          emissive={baseInfo.color1}
          emissiveIntensity={0.3}
          roughness={0.4}
          metalness={0.3}
        />
      </mesh>

      {/* Base 2 (nucleotide) */}
      <mesh position={[x2, 0, z2]}>
        <sphereGeometry args={[0.25, 16, 16]} />
        <meshStandardMaterial
          color={baseInfo.color2}
          emissive={baseInfo.color2}
          emissiveIntensity={0.3}
          roughness={0.4}
          metalness={0.3}
        />
      </mesh>

      {/* Hydrogen bonds connecting the bases (the "rung") */}
      <HydrogenBond
        start={[x1, 0, z1]}
        end={[x2, 0, z2]}
        bonds={baseInfo.base1 === 'G' || baseInfo.base1 === 'C' ? 3 : 2}
      />
    </group>
  )
}

// Hydrogen bonds between base pairs
function HydrogenBond({
  start,
  end,
  bonds
}: {
  start: [number, number, number]
  end: [number, number, number]
  bonds: number
}) {
  const midX = (start[0] + end[0]) / 2
  const midZ = (start[2] + end[2]) / 2
  const length = Math.sqrt(
    Math.pow(end[0] - start[0], 2) +
    Math.pow(end[2] - start[2], 2)
  ) - 0.5 // Subtract base radii

  const angle = Math.atan2(end[2] - start[2], end[0] - start[0])

  return (
    <group position={[midX, 0, midZ]} rotation={[0, -angle, 0]}>
      {/* Main bond cylinder */}
      <mesh rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.03, 0.03, length, 8]} />
        <meshStandardMaterial
          color="#ffffff"
          transparent
          opacity={0.6}
          roughness={0.5}
        />
      </mesh>

      {/* Bond indicators (dots representing H-bonds) */}
      {Array.from({ length: bonds }).map((_, i) => {
        const offset = ((i - (bonds - 1) / 2) / bonds) * length * 0.5
        return (
          <mesh key={i} position={[offset, 0, 0]}>
            <sphereGeometry args={[0.06, 8, 8]} />
            <meshBasicMaterial color="#88ffff" />
          </mesh>
        )
      })}
    </group>
  )
}
