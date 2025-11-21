import { create } from 'zustand'

export type ViewMode = 'animated' | 'interactive'
export type VisualizationType = 'atom' | 'solar-system' | 'dna-helix'
export type GridColorMode = 'colorful' | 'monochrome'

interface AppState {
  // View mode
  mode: ViewMode

  // Current visualization
  currentVisualization: VisualizationType

  // Grid visibility and color
  showGrid: boolean
  gridColorMode: GridColorMode

  // Physics state
  elapsedTime: number
  isPaused: boolean

  // Actions
  toggleMode: () => void
  setVisualization: (viz: VisualizationType) => void
  toggleGrid: () => void
  cycleGridColor: () => void
  tick: (delta: number) => void

  // Computed
  getTimeStep: () => number
}

export const useAppStore = create<AppState>((set, get) => ({
  mode: 'animated',
  currentVisualization: 'atom',
  showGrid: false,
  gridColorMode: 'colorful',
  elapsedTime: 0,
  isPaused: false,

  toggleMode: () => set((state) => ({
    mode: state.mode === 'animated' ? 'interactive' : 'animated',
    isPaused: state.mode === 'animated' // Pause when switching to interactive
  })),

  setVisualization: (viz) => set({
    currentVisualization: viz,
    elapsedTime: 0 // Reset time when switching
  }),

  toggleGrid: () => set((state) => ({
    showGrid: !state.showGrid
  })),

  cycleGridColor: () => set((state) => ({
    gridColorMode: state.gridColorMode === 'colorful' ? 'monochrome' : 'colorful'
  })),

  tick: (delta) => {
    const { isPaused } = get()
    if (!isPaused) {
      set((state) => ({ elapsedTime: state.elapsedTime + delta }))
    }
  },

  getTimeStep: () => {
    const { isPaused } = get()
    return isPaused ? 0 : 1/60
  }
}))
