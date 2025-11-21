export interface Label {
  id: string
  text: string
  description?: string
  position: [number, number, number]
  attachTo?: string
}

export interface CameraConfig {
  animated: {
    distance: number
    speed: number
    elevation: number
  }
  interactive: {
    minDistance: number
    maxDistance: number
  }
}

export interface VisualizationProps {
  mode: 'animated' | 'interactive'
  elapsedTime: number
}

export interface Visualization {
  id: string
  name: string
  description: string
  Component: React.FC<VisualizationProps>
  labels: Label[]
  cameraConfig: CameraConfig
}
