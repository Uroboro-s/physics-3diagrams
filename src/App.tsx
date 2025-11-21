import { Canvas } from '@react-three/fiber'
import { Suspense } from 'react'
import { useAppStore } from './stores/appStore'
import { Scene } from './components/Scene'
import { ModeToggle } from './components/ui/ModeToggle'
import { VisualizationSelector } from './components/ui/VisualizationSelector'

export default function App() {
  const mode = useAppStore((state) => state.mode)

  return (
    <div className="app-container">
      <Canvas
        camera={{ position: [0, 0, 10], fov: 50 }}
        dpr={[1, 2]}
        gl={{
          antialias: true,
          alpha: false,
          powerPreference: 'high-performance'
        }}
      >
        <Suspense fallback={null}>
          <Scene />
        </Suspense>
      </Canvas>

      {/* UI Overlay */}
      <ModeToggle />
      <VisualizationSelector />

      {/* Mode indicator */}
      <div className="mode-indicator">
        {mode === 'animated' ? 'Animated Mode' : 'Interactive Mode'}
      </div>
    </div>
  )
}
