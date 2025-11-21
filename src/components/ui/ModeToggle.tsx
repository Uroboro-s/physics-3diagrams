import { useAppStore } from '../../stores/appStore'

export function ModeToggle() {
  const mode = useAppStore((state) => state.mode)
  const toggleMode = useAppStore((state) => state.toggleMode)

  return (
    <button
      className="mode-toggle"
      onClick={toggleMode}
      aria-label={`Switch to ${mode === 'animated' ? 'interactive' : 'animated'} mode`}
    >
      <span className="mode-toggle-icon">
        {mode === 'animated' ? '🎬' : '🖱️'}
      </span>
      <span className="mode-toggle-text">
        {mode === 'animated' ? 'Interactive' : 'Animated'}
      </span>
    </button>
  )
}
