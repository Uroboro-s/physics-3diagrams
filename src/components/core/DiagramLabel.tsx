import { Html } from '@react-three/drei'
import { useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { Label } from '../../visualizations/types'

interface DiagramLabelProps {
  label: Label
  visible: boolean
  targetRef?: React.RefObject<THREE.Object3D>
}

export function DiagramLabel({ label, visible, targetRef }: DiagramLabelProps) {
  const [isHovered, setIsHovered] = useState(false)
  const groupRef = useRef<THREE.Group>(null)

  // Update position if attached to a moving object
  useFrame(() => {
    if (targetRef?.current && groupRef.current) {
      const worldPos = new THREE.Vector3()
      targetRef.current.getWorldPosition(worldPos)
      groupRef.current.position.copy(worldPos)
    }
  })

  if (!visible) return null

  const position = targetRef ? [0, 0, 0] : label.position

  return (
    <group ref={groupRef} position={position as [number, number, number]}>
      <Html
        center
        distanceFactor={15}
        occlude={false}
        style={{
          transition: 'all 0.3s ease',
          opacity: visible ? 1 : 0,
          transform: `scale(${isHovered ? 1.1 : 1})`,
        }}
      >
        <div
          className={`diagram-label ${isHovered ? 'expanded' : ''}`}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <span className="label-text">{label.text}</span>
          {isHovered && label.description && (
            <span className="label-description">{label.description}</span>
          )}
        </div>
      </Html>
    </group>
  )
}
