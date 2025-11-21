import { useAppStore } from '../../stores/appStore'

export function GridToggle() {
  const showGrid = useAppStore((state) => state.showGrid)
  const gridColorMode = useAppStore((state) => state.gridColorMode)
  const toggleGrid = useAppStore((state) => state.toggleGrid)
  const cycleGridColor = useAppStore((state) => state.cycleGridColor)

  return (
    <div className="grid-controls">
      <button
        className={`grid-toggle ${showGrid ? 'active' : ''}`}
        onClick={toggleGrid}
        aria-label={`Turn grid ${showGrid ? 'off' : 'on'}`}
      >
        <span className="grid-toggle-icon">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
            <path d="M0 1.5A1.5 1.5 0 0 1 1.5 0h13A1.5 1.5 0 0 1 16 1.5v13a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 0 14.5v-13zM1.5 1a.5.5 0 0 0-.5.5V5h4V1H1.5zM5 6H1v4h4V6zm1 4h4V6H6v4zm-1 1H1v3.5a.5.5 0 0 0 .5.5H5v-4zm1 0v4h4v-4H6zm5 0v4h3.5a.5.5 0 0 0 .5-.5V11h-4zm0-1h4V6h-4v4zm0-5h4V1.5a.5.5 0 0 0-.5-.5H11v4zm-1 0V1H6v4h4z"/>
          </svg>
        </span>
        <span className="grid-toggle-text">
          Grid: {showGrid ? 'On' : 'Off'}
        </span>
      </button>

      {showGrid && (
        <button
          className={`grid-color-toggle ${gridColorMode}`}
          onClick={cycleGridColor}
          aria-label={`Switch to ${gridColorMode === 'colorful' ? 'monochrome' : 'colorful'} grid`}
        >
          <span className="grid-color-indicator">
            {gridColorMode === 'colorful' ? (
              <span className="color-dots">
                <span className="dot cyan"></span>
                <span className="dot violet"></span>
                <span className="dot pink"></span>
              </span>
            ) : (
              <span className="color-dots">
                <span className="dot gray"></span>
                <span className="dot gray"></span>
                <span className="dot gray"></span>
              </span>
            )}
          </span>
          <span className="grid-color-text">
            {gridColorMode === 'colorful' ? 'Color' : 'Gray'}
          </span>
        </button>
      )}
    </div>
  )
}
