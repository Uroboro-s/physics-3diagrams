import { useFrame } from '@react-three/fiber'
import { useAppStore } from '../stores/appStore'
import { DualModeCamera } from './core/DualModeCamera'
import { Lighting } from './core/Lighting'
import { AtomVisualization } from '../visualizations/Atom'
import { SolarSystemVisualization } from '../visualizations/SolarSystem'
import { DNAHelixVisualization } from '../visualizations/DNAHelix'

export function Scene() {
  const currentVisualization = useAppStore((state) => state.currentVisualization)
  const mode = useAppStore((state) => state.mode)
  const elapsedTime = useAppStore((state) => state.elapsedTime)
  const tick = useAppStore((state) => state.tick)

  // Update elapsed time every frame
  useFrame((_, delta) => {
    tick(delta)
  })

  const renderVisualization = () => {
    const props = { mode, elapsedTime }

    switch (currentVisualization) {
      case 'atom':
        return <AtomVisualization {...props} />
      case 'solar-system':
        return <SolarSystemVisualization {...props} />
      case 'dna-helix':
        return <DNAHelixVisualization {...props} />
      default:
        return <AtomVisualization {...props} />
    }
  }

  return (
    <>
      <DualModeCamera />
      <Lighting />
      {renderVisualization()}
    </>
  )
}
