import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { VisualizationProps, Label } from '../types'
import { DiagramLabel } from '../../components/core/DiagramLabel'
import { BasePair } from './BasePair'
import { Backbone } from './Backbone'

// Label definitions for the DNA helix diagram
const dnaLabels: Label[] = [
  {
    id: 'double-helix',
    text: 'Double Helix',
    description: 'The characteristic twisted ladder shape of DNA discovered by Watson and Crick in 1953.',
    position: [3, 0, 0]
  },
  {
    id: 'sugar-phosphate',
    text: 'Sugar-Phosphate Backbone',
    description: 'The structural framework of DNA. Alternating sugar (deoxyribose) and phosphate groups.',
    position: [2, 4, 0]
  },
  {
    id: 'adenine',
    text: 'Adenine (A)',
    description: 'Purine base that always pairs with Thymine via 2 hydrogen bonds.',
    position: [-1.5, 2, 1]
  },
  {
    id: 'thymine',
    text: 'Thymine (T)',
    description: 'Pyrimidine base that always pairs with Adenine. Contains a methyl group.',
    position: [1.5, 2, 1]
  },
  {
    id: 'guanine',
    text: 'Guanine (G)',
    description: 'Purine base that always pairs with Cytosine via 3 hydrogen bonds.',
    position: [-1.5, -1, 1]
  },
  {
    id: 'cytosine',
    text: 'Cytosine (C)',
    description: 'Pyrimidine base that always pairs with Guanine.',
    position: [1.5, -1, 1]
  },
  {
    id: 'hydrogen-bonds',
    text: 'Hydrogen Bonds',
    description: 'Weak bonds between base pairs that hold the two strands together. A-T has 2, G-C has 3.',
    position: [0, 0, 2]
  },
  {
    id: 'major-groove',
    text: 'Major Groove',
    description: 'Larger of the two grooves. Important for protein binding and gene regulation.',
    position: [2.5, 1, 0]
  },
  {
    id: 'minor-groove',
    text: 'Minor Groove',
    description: 'Smaller groove. Also involved in protein-DNA interactions.',
    position: [-2.5, -2, 0]
  },
  {
    id: 'base-pair',
    text: 'Base Pair',
    description: 'Two nucleotides connected by hydrogen bonds. The "rungs" of the DNA ladder.',
    position: [0, 3, 0]
  },
  {
    id: '3-5-direction',
    text: "5' to 3' Direction",
    description: 'DNA strands run antiparallel. Each strand has opposite directionality.',
    position: [0, -5, 1]
  }
]

// Base pair sequence (simplified representation)
const basePairSequence = [
  { base1: 'A', base2: 'T', color1: '#ff6b6b', color2: '#4ecdc4' },
  { base1: 'T', base2: 'A', color1: '#4ecdc4', color2: '#ff6b6b' },
  { base1: 'G', base2: 'C', color1: '#ffe66d', color2: '#95e1d3' },
  { base1: 'C', base2: 'G', color1: '#95e1d3', color2: '#ffe66d' },
  { base1: 'A', base2: 'T', color1: '#ff6b6b', color2: '#4ecdc4' },
  { base1: 'G', base2: 'C', color1: '#ffe66d', color2: '#95e1d3' },
  { base1: 'T', base2: 'A', color1: '#4ecdc4', color2: '#ff6b6b' },
  { base1: 'C', base2: 'G', color1: '#95e1d3', color2: '#ffe66d' },
]

export function DNAHelixVisualization({ mode, elapsedTime }: VisualizationProps) {
  const groupRef = useRef<THREE.Group>(null)
  const showLabels = mode === 'interactive'

  // Helix parameters
  const helixConfig = useMemo(() => ({
    radius: 1.5,
    pitch: 3.4, // Distance per full turn (in angstroms, scaled)
    basePairsPerTurn: 10,
    totalPairs: 24,
    rotationSpeed: 0.3
  }), [])

  useFrame(() => {
    if (groupRef.current && mode === 'animated') {
      // Continuous rotation in animated mode
      groupRef.current.rotation.y = elapsedTime * helixConfig.rotationSpeed
    }
  })

  // Generate base pair positions along the helix
  const basePairs = useMemo(() => {
    const pairs: Array<{
      position: THREE.Vector3
      rotation: number
      baseInfo: typeof basePairSequence[0]
      index: number
    }> = []

    for (let i = 0; i < helixConfig.totalPairs; i++) {
      const angle = (i / helixConfig.basePairsPerTurn) * Math.PI * 2
      const y = (i - helixConfig.totalPairs / 2) * (helixConfig.pitch / helixConfig.basePairsPerTurn)

      pairs.push({
        position: new THREE.Vector3(0, y, 0),
        rotation: angle,
        baseInfo: basePairSequence[i % basePairSequence.length],
        index: i
      })
    }

    return pairs
  }, [helixConfig])

  return (
    <group ref={groupRef}>
      {/* Base pairs (the "rungs" of the ladder) */}
      {basePairs.map((pair, index) => (
        <BasePair
          key={index}
          position={pair.position}
          rotation={pair.rotation}
          baseInfo={pair.baseInfo}
          radius={helixConfig.radius}
        />
      ))}

      {/* Sugar-phosphate backbones (the "rails" of the ladder) */}
      <Backbone
        basePairs={basePairs}
        radius={helixConfig.radius}
        strand={1}
      />
      <Backbone
        basePairs={basePairs}
        radius={helixConfig.radius}
        strand={2}
      />

      {/* Labels for interactive mode */}
      {dnaLabels.map((label) => (
        <DiagramLabel
          key={label.id}
          label={label}
          visible={showLabels}
        />
      ))}
    </group>
  )
}
