import * as THREE from 'three'

interface OrbitPathProps {
  radius: number
}

export function OrbitPath({ radius }: OrbitPathProps) {
  return (
    <mesh rotation={[Math.PI / 2, 0, 0]}>
      <ringGeometry args={[radius - 0.03, radius + 0.03, 128]} />
      <meshBasicMaterial
        color="#ffffff"
        transparent
        opacity={0.1}
        side={THREE.DoubleSide}
      />
    </mesh>
  )
}
