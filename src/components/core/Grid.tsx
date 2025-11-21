import { useAppStore } from '../../stores/appStore'
import { Grid as DreiGrid } from '@react-three/drei'

export function Grid() {
  const showGrid = useAppStore((state) => state.showGrid)
  const currentVisualization = useAppStore((state) => state.currentVisualization)

  if (!showGrid) return null

  // Adjust grid size based on visualization
  const gridConfig = {
    'atom': { size: 20, divisions: 20 },
    'solar-system': { size: 80, divisions: 40 },
    'dna-helix': { size: 30, divisions: 30 }
  }

  const config = gridConfig[currentVisualization]

  return (
    <group>
      {/* Horizontal grid (XZ plane) */}
      <DreiGrid
        position={[0, -config.size / 4, 0]}
        args={[config.size, config.size]}
        cellSize={config.size / config.divisions}
        cellThickness={0.5}
        cellColor="#4a90d9"
        sectionSize={config.size / 4}
        sectionThickness={1}
        sectionColor="#6eb5ff"
        fadeDistance={config.size * 2}
        fadeStrength={1}
        followCamera={false}
        infiniteGrid={false}
      />

      {/* Vertical grid (XY plane) - back */}
      <DreiGrid
        position={[0, 0, -config.size / 4]}
        rotation={[Math.PI / 2, 0, 0]}
        args={[config.size, config.size]}
        cellSize={config.size / config.divisions}
        cellThickness={0.5}
        cellColor="#9d4edd"
        sectionSize={config.size / 4}
        sectionThickness={1}
        sectionColor="#c77dff"
        fadeDistance={config.size * 2}
        fadeStrength={1}
        followCamera={false}
        infiniteGrid={false}
      />

      {/* Vertical grid (YZ plane) - side */}
      <DreiGrid
        position={[-config.size / 4, 0, 0]}
        rotation={[Math.PI / 2, 0, Math.PI / 2]}
        args={[config.size, config.size]}
        cellSize={config.size / config.divisions}
        cellThickness={0.5}
        cellColor="#ff6b9d"
        sectionSize={config.size / 4}
        sectionThickness={1}
        sectionColor="#ff8fab"
        fadeDistance={config.size * 2}
        fadeStrength={1}
        followCamera={false}
        infiniteGrid={false}
      />
    </group>
  )
}
