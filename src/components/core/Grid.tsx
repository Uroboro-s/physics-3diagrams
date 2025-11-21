import { useAppStore } from '../../stores/appStore'
import { Grid as DreiGrid } from '@react-three/drei'

// Color schemes for the grid
const colorSchemes = {
  colorful: {
    horizontal: { cell: '#4a90d9', section: '#6eb5ff' },
    back: { cell: '#9d4edd', section: '#c77dff' },
    side: { cell: '#ff6b9d', section: '#ff8fab' }
  },
  monochrome: {
    horizontal: { cell: '#888888', section: '#aaaaaa' },
    back: { cell: '#888888', section: '#aaaaaa' },
    side: { cell: '#888888', section: '#aaaaaa' }
  }
}

export function Grid() {
  const showGrid = useAppStore((state) => state.showGrid)
  const currentVisualization = useAppStore((state) => state.currentVisualization)
  const gridColorMode = useAppStore((state) => state.gridColorMode)

  if (!showGrid) return null

  // Adjust grid size based on visualization
  const gridConfig = {
    'atom': { size: 20, divisions: 20 },
    'solar-system': { size: 80, divisions: 40 },
    'dna-helix': { size: 30, divisions: 30 }
  }

  const config = gridConfig[currentVisualization]
  const colors = colorSchemes[gridColorMode]

  return (
    <group>
      {/* Horizontal grid (XZ plane) */}
      <DreiGrid
        position={[0, -config.size / 4, 0]}
        args={[config.size, config.size]}
        cellSize={config.size / config.divisions}
        cellThickness={0.5}
        cellColor={colors.horizontal.cell}
        sectionSize={config.size / 4}
        sectionThickness={1}
        sectionColor={colors.horizontal.section}
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
        cellColor={colors.back.cell}
        sectionSize={config.size / 4}
        sectionThickness={1}
        sectionColor={colors.back.section}
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
        cellColor={colors.side.cell}
        sectionSize={config.size / 4}
        sectionThickness={1}
        sectionColor={colors.side.section}
        fadeDistance={config.size * 2}
        fadeStrength={1}
        followCamera={false}
        infiniteGrid={false}
      />
    </group>
  )
}
