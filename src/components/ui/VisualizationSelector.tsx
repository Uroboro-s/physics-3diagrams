import { useAppStore, VisualizationType } from '../../stores/appStore'

const visualizations: { id: VisualizationType; name: string; icon: string }[] = [
  { id: 'atom', name: 'Atom', icon: '⚛️' },
  { id: 'solar-system', name: 'Solar System', icon: '🌍' },
  { id: 'dna-helix', name: 'DNA Helix', icon: '🧬' },
]

export function VisualizationSelector() {
  const currentVisualization = useAppStore((state) => state.currentVisualization)
  const setVisualization = useAppStore((state) => state.setVisualization)

  return (
    <div className="visualization-selector">
      {visualizations.map((viz) => (
        <button
          key={viz.id}
          className={`viz-button ${currentVisualization === viz.id ? 'active' : ''}`}
          onClick={() => setVisualization(viz.id)}
          aria-label={`View ${viz.name}`}
        >
          <span className="viz-icon">{viz.icon}</span>
          <span className="viz-name">{viz.name}</span>
        </button>
      ))}
    </div>
  )
}
