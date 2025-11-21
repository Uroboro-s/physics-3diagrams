# Aesthetica Physica: Master Project Blueprint

> **Senior Creative Technologist & Physics Engine Architect Documentation**
> Transforming physics diagrams into cinematic scientific visualization

---

## Table of Contents

1. [Project Vision & Philosophy](#project-vision--philosophy)
2. [Technical Stack](#technical-stack)
3. [Architecture Overview](#architecture-overview)
4. [Core Systems](#core-systems)
5. [Visual Design Principles](#visual-design-principles)
6. [Implementation Guidelines](#implementation-guidelines)
7. [Project Structure](#project-structure)
8. [Physics Diagrams Catalog](#physics-diagrams-catalog)
9. [Shader Library](#shader-library)
10. [Performance Optimization](#performance-optimization)
11. [Development Roadmap](#development-roadmap)
12. [Code Patterns & Examples](#code-patterns--examples)

---

## Project Vision & Philosophy

### Mission Statement
**Aesthetica Physica** is a view-only web gallery showcasing physics-driven 3D visualizations as high-end generative art. Visitors observe mesmerizing, autonomous animations—atoms pulsing with electron clouds, solar systems in graceful orbital dance, DNA helices twisting through space—all governed by real physics simulations. No interaction required; pure visual contemplation.

### Core Principles

1. **Physics-Driven Motion**: All movement is determined by accurate physics simulation (gravity, electromagnetism, molecular forces)
2. **Cinematic Quality**: AAA game-level graphics, film-quality rendering
3. **Autonomous Beauty**: Visualizations run continuously without user input—digital art installations
4. **Performance Excellence**: 60fps on modern hardware, graceful degradation on older devices
5. **Generative Aesthetics**: Procedural, shader-driven visuals that feel alive and ever-evolving

### Experience Philosophy

This is a **view-only gallery**. There are no controls, no buttons, no user input. Visitors arrive at the website and are immediately immersed in beautiful, physics-accurate visualizations. The experience is:
- **Contemplative**: Like watching a lava lamp or aquarium
- **Mesmerizing**: Continuous, hypnotic motion
- **Educational by Osmosis**: Physics principles revealed through observation
- **Ambient**: Can run in the background as digital art

### Target Audience

- Digital art enthusiasts and collectors
- Science lovers seeking ambient visualizations
- Offices and spaces wanting dynamic digital art displays
- Museums and exhibitions for installation pieces
- Anyone who appreciates the beauty of physics in motion

---

## Technical Stack

### Core Technologies

#### 3D Rendering Layer
```
Three.js (r160+)
├── WebGLRenderer (with custom post-processing)
├── Custom shader materials (GLSL ES 3.0)
├── EffectComposer for post-processing
└── Performance monitoring via Stats.js
```

**Why Three.js?**
- Industry-standard WebGL abstraction
- Excellent documentation and community
- Easy integration with React
- Built-in optimizations and helpers
- Active development and future-proof

#### Shader Programming
```
GLSL ES 3.0
├── Vertex Shaders (geometry manipulation, particle systems)
├── Fragment Shaders (lighting, materials, effects)
├── Compute-like patterns (simulation on GPU)
└── Custom shader chunks for reusability
```

#### Physics Engine
```
Custom Physics Layer
├── Cannon.js (rigid body dynamics)
├── Custom integrators (Verlet, RK4)
├── GPU-accelerated particle systems
└── Constraint solvers
```

**Why Custom + Cannon.js?**
- Cannon.js: Stable, debuggable rigid body physics
- Custom systems: Specialized simulations (fields, fluids, quantum)
- GPU acceleration: Handle thousands of particles at 60fps
- Flexibility: Scientific accuracy over gaming physics

#### Application Layer
```
React 18+
├── Functional components with hooks
├── Zustand (scene state management)
├── React Three Fiber (declarative Three.js)
└── No user controls (view-only experience)
```

#### Build & Development
```
Vite 5+
├── Hot Module Replacement (HMR)
├── Optimized production builds
├── GLSL shader loading
└── Asset optimization
```

### Recommended Libraries

```json
{
  "dependencies": {
    "three": "^0.160.0",
    "@react-three/fiber": "^8.15.0",
    "@react-three/drei": "^9.95.0",
    "@react-three/postprocessing": "^2.16.0",
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "cannon-es": "^0.20.0",
    "zustand": "^4.5.0",
    "gsap": "^3.12.0",
    "maath": "^0.10.7",
    "glsl-noise": "^0.0.0"
  },
  "devDependencies": {
    "vite": "^5.0.0",
    "vite-plugin-glsl": "^1.2.0",
    "@types/three": "^0.160.0",
    "typescript": "^5.3.0"
  }
}
```

> **Note**: No UI libraries (like Leva) are needed since this is a view-only experience with no user controls.

---

## Architecture Overview

### System Layers

```
┌─────────────────────────────────────────────────┐
│         Scene Management (Zustand)              │
│  Scene State | Physics Params | Animation Time  │
└─────────────────────────────────────────────────┘
                      ↕
┌─────────────────────────────────────────────────┐
│      Three.js Rendering Layer (3D Scene)        │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐      │
│  │ Geometry │  │ Materials│  │ Lighting │      │
│  │  System  │  │  Shaders │  │  System  │      │
│  └──────────┘  └──────────┘  └──────────┘      │
└─────────────────────────────────────────────────┘
                      ↕
┌─────────────────────────────────────────────────┐
│         Physics Simulation Layer                │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐      │
│  │ Orbital  │  │ Particle │  │ Molecular│      │
│  │ Mechanics│  │ Systems  │  │ Dynamics │      │
│  └──────────┘  └──────────┘  └──────────┘      │
└─────────────────────────────────────────────────┘
                      ↕
┌─────────────────────────────────────────────────┐
│         GPU Compute Layer (Shaders)             │
│  Particle Updates | Orbital Calculations        │
└─────────────────────────────────────────────────┘
```

### Data Flow (Autonomous Loop)

```javascript
// No user input - fully autonomous animation loop
Animation Frame → Physics Tick → Scene Update → Render → Next Frame
                       ↓              ↓            ↓
               Forces/Orbits      Positions     WebGL
```

The system runs continuously without any user interaction. Each frame:
1. Physics engine calculates new positions based on forces (gravity, electromagnetic, molecular)
2. Three.js scene updates mesh positions and shader uniforms
3. WebGL renders the frame
4. Loop repeats at 60fps

---

## Core Systems

### 1. Rendering Pipeline

#### Scene Setup
```javascript
// Core rendering configuration
const rendererConfig = {
  antialias: true,
  alpha: true,
  powerPreference: "high-performance",
  physicallyCorrectLights: true,
  toneMapping: THREE.ACESFilmicToneMapping,
  toneMappingExposure: 1.2,
  outputColorSpace: THREE.SRGBColorSpace
};
```

#### Camera System
- **Primary**: PerspectiveCamera with automated orbiting (no user controls)
- **Cinematic**: Smooth, looping camera paths using GSAP
- **Dynamic**: Camera slowly orbits around visualizations for varied perspectives
- **Auto-framing**: Automatically adjusts to keep subjects centered

#### Lighting Philosophy
```javascript
// Cinematic three-point lighting
const lightingSetup = {
  key: {
    type: "DirectionalLight",
    intensity: 2.5,
    position: [5, 8, 3],
    castShadow: true
  },
  fill: {
    type: "DirectionalLight",
    intensity: 0.8,
    position: [-3, 2, -2]
  },
  rim: {
    type: "SpotLight",
    intensity: 1.5,
    position: [-2, 4, -8]
  },
  ambient: {
    type: "AmbientLight",
    intensity: 0.3
  }
};
```

#### Post-Processing Stack
```javascript
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass';
import { SSAOPass } from 'three/examples/jsm/postprocessing/SSAOPass';

// Layered post-processing for cinematic quality
const postProcessingPipeline = [
  'RenderPass',           // Base scene render
  'SSAOPass',             // Ambient occlusion for depth
  'UnrealBloomPass',      // Selective bloom for energy/fields
  'FXAAPass',             // Anti-aliasing
  'ColorCorrectionPass'   // Final color grading
];
```

### 2. Physics Simulation Engine

#### Simulation Architecture
```javascript
class PhysicsEngine {
  constructor() {
    this.world = new CANNON.World();
    this.world.gravity.set(0, -9.82, 0);
    this.world.broadphase = new CANNON.NaiveBroadphase();
    this.world.solver.iterations = 10;
    this.timeStep = 1 / 60;

    // Custom systems
    this.particleSystem = new GPUParticleSystem();
    this.fieldSolver = new FieldSolver();
    this.constraints = new ConstraintManager();
  }

  update(delta) {
    this.world.step(this.timeStep, delta, 3);
    this.particleSystem.update(delta);
    this.fieldSolver.update(delta);
    this.syncWithThreeJS();
  }

  syncWithThreeJS() {
    // Copy physics positions/rotations to Three.js meshes
    this.bodies.forEach(body => {
      body.mesh.position.copy(body.position);
      body.mesh.quaternion.copy(body.quaternion);
    });
  }
}
```

#### Specialized Physics Modules

##### Particle Systems (GPU-Accelerated)
```javascript
class GPUParticleSystem {
  constructor(count = 100000) {
    this.count = count;

    // Use THREE.Points with custom shader
    this.geometry = new THREE.BufferGeometry();

    // Attributes
    this.positions = new Float32Array(count * 3);
    this.velocities = new Float32Array(count * 3);
    this.lifetimes = new Float32Array(count);

    this.geometry.setAttribute('position',
      new THREE.BufferAttribute(this.positions, 3));
    this.geometry.setAttribute('velocity',
      new THREE.BufferAttribute(this.velocities, 3));
    this.geometry.setAttribute('lifetime',
      new THREE.BufferAttribute(this.lifetimes, 1));

    this.material = new THREE.ShaderMaterial({
      vertexShader: particleVertexShader,
      fragmentShader: particleFragmentShader,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });

    this.mesh = new THREE.Points(this.geometry, this.material);
  }

  update(delta) {
    // Update in vertex shader for performance
    this.material.uniforms.time.value += delta;
  }
}
```

##### Field Solvers
```javascript
// For electric fields, magnetic fields, gravitational fields
class FieldSolver {
  constructor() {
    this.sources = [];  // Field sources (charges, masses, etc.)
    this.grid = new Field3D(32, 32, 32);  // 3D field grid
  }

  // Calculate field at point using superposition
  calculateFieldAt(position) {
    let field = new THREE.Vector3();

    this.sources.forEach(source => {
      const r = position.clone().sub(source.position);
      const distance = r.length();
      const magnitude = source.strength / (distance * distance);
      const direction = r.normalize();

      field.add(direction.multiplyScalar(magnitude));
    });

    return field;
  }

  // Visualize field lines
  generateFieldLines(startPoint, steps = 100) {
    const points = [];
    let current = startPoint.clone();

    for (let i = 0; i < steps; i++) {
      points.push(current.clone());
      const field = this.calculateFieldAt(current);
      current.add(field.normalize().multiplyScalar(0.1));
    }

    return new THREE.Line(
      new THREE.BufferGeometry().setFromPoints(points),
      fieldLineMaterial
    );
  }
}
```

### 3. Shader System

#### Shader Architecture
```
shaders/
├── common/
│   ├── noise.glsl          # Simplex, Perlin, Worley noise
│   ├── math.glsl           # Utility functions
│   └── lighting.glsl       # PBR lighting models
├── materials/
│   ├── energy.frag         # Energy field materials
│   ├── glass.frag          # Refractive materials
│   ├── holographic.frag    # Sci-fi hologram effects
│   └── particle.vert       # Particle animation
└── post/
    ├── bloom.frag          # Custom bloom
    ├── chromatic.frag      # Chromatic aberration
    └── grading.frag        # Color grading LUTs
```

#### Shader Examples

##### Energy Field Shader
```glsl
// Fragment shader for electromagnetic field visualization
uniform float time;
uniform vec3 fieldColor;
uniform float energy;

varying vec3 vPosition;
varying vec3 vNormal;

#include <noise>

void main() {
  // Animated energy flow
  float noise = snoise(vPosition * 2.0 + time * 0.5);
  float pulse = sin(time * 2.0 + vPosition.y * 5.0) * 0.5 + 0.5;

  // Fresnel effect for edge glow
  vec3 viewDir = normalize(cameraPosition - vPosition);
  float fresnel = pow(1.0 - dot(viewDir, vNormal), 3.0);

  // Combine effects
  float intensity = (noise * 0.3 + pulse * 0.7) * energy;
  vec3 glow = fieldColor * (intensity + fresnel * 2.0);

  // Output with transparency
  gl_FragColor = vec4(glow, fresnel * 0.8 + intensity * 0.2);
}
```

##### Particle Vertex Shader
```glsl
// GPU-based particle animation
attribute vec3 velocity;
attribute float lifetime;

uniform float time;
uniform vec3 gravity;

varying float vLife;

void main() {
  // Calculate current age
  float age = mod(time, lifetime);
  float t = age / lifetime;

  // Physics integration
  vec3 pos = position + velocity * age + 0.5 * gravity * age * age;

  // Fade out near death
  vLife = 1.0 - t;

  // Size attenuation
  vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
  gl_PointSize = 5.0 * (1.0 / -mvPosition.z) * vLife;
  gl_Position = projectionMatrix * mvPosition;
}
```

##### Holographic Material
```glsl
// Sci-fi holographic effect
uniform float time;
uniform float scanlineSpeed;
uniform vec3 holoColor;

varying vec2 vUv;
varying vec3 vNormal;

void main() {
  // Scanlines
  float scanline = sin(vUv.y * 100.0 + time * scanlineSpeed);
  scanline = smoothstep(0.3, 0.7, scanline);

  // Fresnel rim lighting
  float fresnel = pow(1.0 - dot(vNormal, vec3(0, 0, 1)), 2.0);

  // Flickering noise
  float flicker = random(vec2(time * 10.0)) * 0.1 + 0.9;

  // Combine
  vec3 color = holoColor * (scanline * 0.5 + fresnel) * flicker;
  float alpha = (fresnel + scanline * 0.3) * flicker;

  gl_FragColor = vec4(color, alpha);
}
```

### 4. Autonomous Camera System

Since this is a view-only experience, the camera operates autonomously to showcase the visualizations from optimal angles.

#### Auto-Orbit Camera
```javascript
class AutoOrbitCamera {
  constructor(camera, target, options = {}) {
    this.camera = camera;
    this.target = target;  // Point to orbit around

    // Orbit parameters
    this.radius = options.radius || 10;
    this.speed = options.speed || 0.1;  // Radians per second
    this.elevation = options.elevation || 0.3;  // Vertical offset
    this.elevationVariation = options.elevationVariation || 0.2;

    this.angle = 0;
  }

  update(delta) {
    // Slowly orbit around the target
    this.angle += this.speed * delta;

    // Calculate new camera position
    const elevation = this.elevation +
      Math.sin(this.angle * 0.5) * this.elevationVariation;

    this.camera.position.x = this.target.x + Math.cos(this.angle) * this.radius;
    this.camera.position.z = this.target.z + Math.sin(this.angle) * this.radius;
    this.camera.position.y = this.target.y + elevation * this.radius;

    // Always look at target
    this.camera.lookAt(this.target);
  }
}
```

#### Cinematic Camera Paths
```javascript
// Pre-defined camera paths for dramatic reveals
const cinematicPath = {
  keyframes: [
    { position: [0, 5, 15], target: [0, 0, 0], duration: 10 },
    { position: [10, 3, 10], target: [0, 0, 0], duration: 8 },
    { position: [0, 8, 8], target: [0, 0, 0], duration: 12 },
    { position: [-8, 4, 12], target: [0, 0, 0], duration: 10 }
  ],
  loop: true,
  easing: 'power2.inOut'
};
```

#### Viewing Modes
- **Orbit**: Camera slowly circles the visualization (default)
- **Drift**: Gentle, random camera movement for ambient viewing
- **Fixed**: Static camera position for focused observation
- **Cinematic**: Smooth transitions between pre-set dramatic angles

---

## Visual Design Principles

### Color Palettes

#### Palette 1: Quantum (Cold, Scientific)
```javascript
const quantumPalette = {
  primary: '#00D9FF',      // Cyan electric
  secondary: '#7B2FFF',    // Deep purple
  accent: '#FF006E',       // Hot magenta
  background: '#0A0E27',   // Deep space blue
  highlight: '#FFFFFF'     // Pure white
};
```

#### Palette 2: Energy (Warm, Dynamic)
```javascript
const energyPalette = {
  primary: '#FF6B35',      // Vibrant orange
  secondary: '#F7931E',    // Amber
  accent: '#FEC601',       // Electric yellow
  background: '#1A1423',   // Dark purple
  highlight: '#FFFAFF'     // Soft white
};
```

#### Palette 3: Field (Natural, Flowing)
```javascript
const fieldPalette = {
  primary: '#06FFA5',      // Mint green
  secondary: '#00B8A9',    // Teal
  accent: '#F8B500',       // Gold
  background: '#0B132B',   // Navy
  highlight: '#E0FBFC'     // Ice blue
};
```

### Material Guidelines

1. **Metals**: Use PBR metalness workflow
   - Metalness: 0.9-1.0
   - Roughness: 0.1-0.3
   - Environment map reflections

2. **Glass/Refractive**:
   - Physical material with transmission
   - IOR: 1.5-1.9 depending on material
   - Thin-film interference for variety

3. **Energy/Fields**:
   - Additive blending
   - Fresnel-based opacity
   - Animated noise for movement
   - Bloom-friendly high intensity

4. **Particles**:
   - Point sprites or instanced geometry
   - Screen-space size attenuation
   - Additive or alpha blending
   - Motion blur in post

### Animation Principles

1. **Physics-Driven**: All motion emerges from physical simulation, not keyframes
2. **Continuous Flow**: Animations loop seamlessly without obvious restart points
3. **Varied Tempo**: Mix slow, contemplative motion with occasional dynamic moments
4. **Natural Rhythm**: Orbital periods, molecular vibrations, and oscillations feel organic
5. **Performance**: Prefer GPU animation (shaders) over CPU for smooth 60fps

---

## Implementation Guidelines

### Code Style

```javascript
// Use modern ES6+ syntax
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';

// Functional components with hooks
function ParticleField({ count = 10000, color = '#00D9FF' }) {
  const particlesRef = useRef();

  useFrame((state) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y += 0.001;
      particlesRef.current.material.uniforms.time.value = state.clock.elapsedTime;
    }
  });

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={generateParticlePositions(count)}
          itemSize={3}
        />
      </bufferGeometry>
      <shaderMaterial
        uniforms={{
          time: { value: 0 },
          color: { value: new THREE.Color(color) }
        }}
        vertexShader={particleVert}
        fragmentShader={particleFrag}
        transparent
      />
    </points>
  );
}
```

### Performance Best Practices

1. **Geometry Reuse**: Share geometries between meshes
2. **Texture Optimization**: Use compressed textures (KTX2)
3. **Draw Calls**: Minimize with instancing and merging
4. **GPU Compute**: Move calculations to shaders
5. **LOD**: Use Level of Detail for complex models
6. **Frustum Culling**: Automatic in Three.js, but be aware
7. **Object Pooling**: Reuse particle systems, not recreate

### State Management Pattern

```javascript
// Zustand store for scene state (no user controls)
import create from 'zustand';

export const useSceneStore = create((set, get) => ({
  // Physics parameters (fixed, no user modification)
  gravity: -9.82,
  timeScale: 1.0,

  // Scene state
  currentVisualization: 'atom',  // 'atom' | 'solar-system' | 'dna-helix'
  elapsedTime: 0,

  // Internal actions (called by animation loop, not user)
  tick: (delta) => set((state) => ({
    elapsedTime: state.elapsedTime + delta
  })),

  // Computed
  getTimeStep: () => (1/60) * get().timeScale
}));
```

> **Note**: No user-facing actions like `togglePause` or `selectDiagram`. The visualization runs autonomously.

### Testing Strategy

1. **Visual Tests**: Screenshot comparison for rendering
2. **Physics Tests**: Assert physical properties (energy conservation, etc.)
3. **Performance Tests**: FPS monitoring, memory profiling
4. **Cross-browser**: Test on Chrome, Firefox, Safari

---

## Project Structure

```
aesthetica-physica/
├── public/
│   ├── assets/
│   │   ├── textures/
│   │   │   ├── electron-glow.png
│   │   │   ├── planet-surfaces/
│   │   │   └── particle-sprites/
│   │   └── hdri/              # Environment maps for reflections
│   └── index.html
├── src/
│   ├── components/
│   │   ├── visualizations/    # The three main visualizations
│   │   │   ├── Atom.jsx           # Atomic model with electron clouds
│   │   │   ├── SolarSystem.jsx    # Orbital mechanics
│   │   │   └── DNAHelix.jsx       # Double helix structure
│   │   ├── effects/           # Visual effects and particles
│   │   │   ├── ElectronCloud.jsx
│   │   │   ├── OrbitalTrail.jsx
│   │   │   └── MolecularBond.jsx
│   │   └── scene/             # Scene setup (no UI controls)
│   │       ├── AutoCamera.jsx     # Autonomous orbiting camera
│   │       ├── Lighting.jsx
│   │       └── PostProcessing.jsx
│   ├── physics/
│   │   ├── OrbitalMechanics.js    # Kepler's laws, n-body
│   │   ├── AtomicPhysics.js       # Electron behavior, orbitals
│   │   ├── MolecularDynamics.js   # DNA helix forces
│   │   └── ParticleSystem.js
│   ├── shaders/
│   │   ├── common/
│   │   │   ├── noise.glsl
│   │   │   ├── math.glsl
│   │   │   └── lighting.glsl
│   │   ├── materials/
│   │   │   ├── electron.frag      # Glowing electron effect
│   │   │   ├── planet.frag        # Planet surface shader
│   │   │   ├── dna-strand.frag    # DNA backbone glow
│   │   │   └── orbital-trail.frag # Fading orbital paths
│   │   └── post/
│   │       └── bloom.frag
│   ├── utils/
│   │   ├── math.js
│   │   ├── geometry.js
│   │   └── colors.js
│   ├── stores/
│   │   └── sceneStore.js      # Minimal state, no user controls
│   ├── hooks/
│   │   ├── useOrbitalPhysics.js
│   │   └── useAutoCamera.js
│   ├── constants/
│   │   ├── physics.js         # Physical constants (G, k, etc.)
│   │   └── visuals.js         # Color palettes, sizes
│   ├── App.jsx
│   └── main.jsx
├── tests/
│   ├── visual/
│   ├── physics/
│   └── performance/
├── docs/
│   └── claude.md (this file)
├── package.json
├── vite.config.js
├── tsconfig.json
└── README.md
```

---

## Visualization Catalog

The gallery features three mesmerizing, physics-driven visualizations that run autonomously. Each showcases different physical principles through continuous, contemplative animation.

---

### 1. The Atom

A stylized atomic model featuring a glowing nucleus surrounded by dynamic electron probability clouds.

#### Physics Simulation
- **Electron Behavior**: Based on quantum mechanical probability distributions
- **Energy Levels**: Electrons occupy distinct orbital shells (1s, 2s, 2p, etc.)
- **Orbital Motion**: Probabilistic cloud visualization rather than Bohr model orbits
- **Nucleus**: Subtle pulsing representing nuclear energy

#### Visual Design
```javascript
// Atom configuration
const atomConfig = {
  nucleus: {
    protons: 6,          // Carbon atom
    neutrons: 6,
    glowColor: '#FF6B35',
    pulseFrequency: 0.5  // Hz
  },
  electrons: {
    count: 6,
    shells: [2, 4],      // 2 in 1s, 4 in 2s/2p
    cloudOpacity: 0.3,
    trailLength: 50
  },
  camera: {
    orbitSpeed: 0.05,    // Slow, contemplative orbit
    distance: 15
  }
};
```

#### Implementation Notes
```javascript
// Electron cloud shader creates probability density visualization
// Uses 3D noise to simulate quantum uncertainty
// Electrons appear as bright points moving through the cloud
// Energy shell transitions shown with color gradient (blue → violet)
```

#### Visual Features
- **Nucleus Glow**: Warm orange/red pulsing core
- **Electron Trails**: Fading paths showing recent electron positions
- **Probability Clouds**: Semi-transparent orbitals (s, p, d shapes)
- **Energy Visualization**: Color indicates energy level (cooler = lower energy)
- **Ambient Particles**: Floating photon-like particles around the atom

---

### 2. The Solar System

A miniature solar system with planets orbiting a glowing sun, following Keplerian orbital mechanics.

#### Physics Simulation
- **Orbital Mechanics**: Kepler's laws of planetary motion
- **Gravitational Forces**: Newton's law of universal gravitation
- **Elliptical Orbits**: Proper eccentricity for each planet
- **Orbital Periods**: Proportional to real planet ratios (compressed timescale)

#### Visual Design
```javascript
// Solar system configuration
const solarSystemConfig = {
  sun: {
    radius: 2,
    glowColor: '#FEC601',
    coronaIntensity: 1.5,
    surfaceAnimation: true  // Animated plasma surface
  },
  planets: [
    { name: 'mercury', radius: 0.1, orbit: 4, period: 2, color: '#A0522D' },
    { name: 'venus', radius: 0.15, orbit: 5.5, period: 3, color: '#DEB887' },
    { name: 'earth', radius: 0.16, orbit: 7, period: 5, color: '#4169E1' },
    { name: 'mars', radius: 0.12, orbit: 9, period: 7, color: '#CD5C5C' },
    { name: 'jupiter', radius: 0.5, orbit: 14, period: 15, color: '#DAA520' },
    { name: 'saturn', radius: 0.45, orbit: 20, period: 25, color: '#F4A460', rings: true }
  ],
  camera: {
    orbitSpeed: 0.02,
    elevation: 0.4,  // Angled view to see orbital planes
    distance: 35
  }
};
```

#### Implementation Notes
```javascript
// Orbital mechanics using vis-viva equation
// v = sqrt(GM * (2/r - 1/a))
// Each planet follows proper elliptical path
// Moon systems for Earth and outer planets (optional)
```

#### Visual Features
- **Sun Corona**: Animated plasma effect with rays
- **Orbital Trails**: Glowing paths showing recent orbit segments
- **Planet Atmospheres**: Subtle glow around terrestrial planets
- **Saturn's Rings**: Thousands of instanced particles
- **Asteroid Belt**: Sparse particle field between Mars and Jupiter
- **Starfield Background**: Deep space environment

---

### 3. The DNA Helix

A rotating double helix structure with base pairs and molecular dynamics simulation.

#### Physics Simulation
- **Molecular Dynamics**: Spring forces between base pairs
- **Helical Geometry**: Accurate 3.4nm pitch, 2nm diameter (scaled)
- **Backbone Tension**: Phosphate-sugar backbone modeled with constraints
- **Thermal Motion**: Subtle vibration representing molecular energy

#### Visual Design
```javascript
// DNA helix configuration
const dnaConfig = {
  structure: {
    basePairs: 20,           // Number of A-T, G-C pairs
    pitch: 3.4,              // Height per full turn
    radius: 1.0,             // Helix radius
    rotationSpeed: 0.1       // Radians per second
  },
  basePairColors: {
    adenine: '#FF6B6B',      // A - Red
    thymine: '#4ECDC4',      // T - Teal
    guanine: '#45B7D1',      // G - Blue
    cytosine: '#96CEB4'      // C - Green
  },
  backbone: {
    color: '#E8E8E8',
    glowIntensity: 0.5
  },
  camera: {
    orbitSpeed: 0.08,
    verticalDrift: true,     // Camera slowly moves up/down helix
    distance: 12
  }
};
```

#### Implementation Notes
```javascript
// DNA structure using parametric helix equations
// x = r * cos(θ)
// y = pitch * θ / (2π)
// z = r * sin(θ)
// Two intertwined helices offset by 180°
// Base pairs connect as horizontal rungs
```

#### Visual Features
- **Phosphate Backbone**: Glowing twisted rails
- **Base Pair Bonds**: Hydrogen bonds shown as energy connections
- **Color Coding**: Each nucleotide type has distinct color
- **Molecular Vibration**: Subtle thermal motion animation
- **Depth of Field**: Focus pulls along the helix
- **Ambient Particles**: Water molecules and ions floating nearby

---

## Additional Visualization Ideas (Future)

These can be added to expand the gallery:

### Cosmic
- **Galaxy Spiral**: Rotating galaxy with gravitational dynamics
- **Black Hole**: Accretion disk with gravitational lensing
- **Nebula**: Particle cloud with stellar formation

### Molecular
- **Protein Folding**: Amino acid chain finding minimum energy state
- **Water Molecules**: Hydrogen bonding network
- **Crystal Lattice**: Growing crystal structure

### Physical Phenomena
- **Magnetic Field Lines**: 3D field visualization around dipoles
- **Wave Interference**: Rippling interference patterns
- **Pendulum Wave**: Multiple pendulums creating wave patterns

### Abstract Physics
- **Lorenz Attractor**: Chaotic particle stream
- **Double Pendulum**: Hypnotic chaotic motion
- **Fluid Simulation**: Calm, flowing liquid dynamics

---

## Shader Library

### Noise Functions

```glsl
// 3D Simplex noise (public domain)
// Author: Ian McEwan, Ashima Arts
vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec4 permute(vec4 x) { return mod289(((x*34.0)+1.0)*x); }
vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }

float snoise(vec3 v) {
  const vec2 C = vec2(1.0/6.0, 1.0/3.0);
  const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);

  // First corner
  vec3 i  = floor(v + dot(v, C.yyy));
  vec3 x0 = v - i + dot(i, C.xxx);

  // Other corners
  vec3 g = step(x0.yzx, x0.xyz);
  vec3 l = 1.0 - g;
  vec3 i1 = min(g.xyz, l.zxy);
  vec3 i2 = max(g.xyz, l.zxy);

  vec3 x1 = x0 - i1 + C.xxx;
  vec3 x2 = x0 - i2 + C.yyy;
  vec3 x3 = x0 - D.yyy;

  // Permutations
  i = mod289(i);
  vec4 p = permute(permute(permute(
    i.z + vec4(0.0, i1.z, i2.z, 1.0))
    + i.y + vec4(0.0, i1.y, i2.y, 1.0))
    + i.x + vec4(0.0, i1.x, i2.x, 1.0));

  // Gradients
  float n_ = 0.142857142857;
  vec3 ns = n_ * D.wyz - D.xzx;
  vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
  vec4 x_ = floor(j * ns.z);
  vec4 y_ = floor(j - 7.0 * x_);
  vec4 x = x_ *ns.x + ns.yyyy;
  vec4 y = y_ *ns.x + ns.yyyy;
  vec4 h = 1.0 - abs(x) - abs(y);
  vec4 b0 = vec4(x.xy, y.xy);
  vec4 b1 = vec4(x.zw, y.zw);
  vec4 s0 = floor(b0)*2.0 + 1.0;
  vec4 s1 = floor(b1)*2.0 + 1.0;
  vec4 sh = -step(h, vec4(0.0));
  vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy;
  vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww;
  vec3 p0 = vec3(a0.xy, h.x);
  vec3 p1 = vec3(a0.zw, h.y);
  vec3 p2 = vec3(a1.xy, h.z);
  vec3 p3 = vec3(a1.zw, h.w);

  // Normalise gradients
  vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2,p2), dot(p3,p3)));
  p0 *= norm.x;
  p1 *= norm.y;
  p2 *= norm.z;
  p3 *= norm.w;

  // Mix final noise value
  vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
  m = m * m;
  return 42.0 * dot(m*m, vec4(dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3)));
}
```

### Utility Functions

```glsl
// Map range [a,b] to [c,d]
float map(float value, float a, float b, float c, float d) {
  return c + (value - a) * (d - c) / (b - a);
}

// Smooth minimum (for soft blending)
float smin(float a, float b, float k) {
  float h = max(k - abs(a - b), 0.0) / k;
  return min(a, b) - h * h * h * k * (1.0 / 6.0);
}

// Rotation matrix 2D
mat2 rotate2D(float angle) {
  float s = sin(angle);
  float c = cos(angle);
  return mat2(c, -s, s, c);
}

// Rotation matrix 3D (around Y axis)
mat3 rotateY(float angle) {
  float s = sin(angle);
  float c = cos(angle);
  return mat3(
    c, 0.0, s,
    0.0, 1.0, 0.0,
    -s, 0.0, c
  );
}

// Pseudo-random
float random(vec2 st) {
  return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
}

// Fresnel (Schlick approximation)
float fresnel(vec3 viewDir, vec3 normal, float power) {
  return pow(1.0 - max(dot(viewDir, normal), 0.0), power);
}
```

### PBR Lighting

```glsl
// Cook-Torrance BRDF
vec3 cookTorranceBRDF(vec3 N, vec3 V, vec3 L, vec3 albedo, float metallic, float roughness) {
  vec3 H = normalize(V + L);
  float NdotV = max(dot(N, V), 0.0);
  float NdotL = max(dot(N, L), 0.0);
  float NdotH = max(dot(N, H), 0.0);
  float VdotH = max(dot(V, H), 0.0);

  // Fresnel (Schlick)
  vec3 F0 = mix(vec3(0.04), albedo, metallic);
  vec3 F = F0 + (1.0 - F0) * pow(1.0 - VdotH, 5.0);

  // Normal Distribution (GGX/Trowbridge-Reitz)
  float a = roughness * roughness;
  float a2 = a * a;
  float denom = NdotH * NdotH * (a2 - 1.0) + 1.0;
  float D = a2 / (3.14159 * denom * denom);

  // Geometry (Smith)
  float k = ((roughness + 1.0) * (roughness + 1.0)) / 8.0;
  float G1 = NdotV / (NdotV * (1.0 - k) + k);
  float G2 = NdotL / (NdotL * (1.0 - k) + k);
  float G = G1 * G2;

  // Specular
  vec3 specular = (D * F * G) / max(4.0 * NdotV * NdotL, 0.001);

  // Diffuse
  vec3 kD = (vec3(1.0) - F) * (1.0 - metallic);
  vec3 diffuse = kD * albedo / 3.14159;

  return (diffuse + specular) * NdotL;
}
```

---

## Performance Optimization

### Rendering Optimization

#### 1. Instanced Rendering
```javascript
// For repeated geometries (particles, field lines)
const geometry = new THREE.SphereGeometry(0.1, 8, 8);
const material = new THREE.MeshStandardMaterial({ color: 0x00ff00 });
const instancedMesh = new THREE.InstancedMesh(geometry, material, 1000);

// Set transforms for each instance
const matrix = new THREE.Matrix4();
for (let i = 0; i < 1000; i++) {
  matrix.setPosition(
    Math.random() * 10 - 5,
    Math.random() * 10 - 5,
    Math.random() * 10 - 5
  );
  instancedMesh.setMatrixAt(i, matrix);
}
instancedMesh.instanceMatrix.needsUpdate = true;
```

#### 2. Geometry Merging
```javascript
// Merge static geometries to reduce draw calls
import { mergeBufferGeometries } from 'three/examples/jsm/utils/BufferGeometryUtils';

const geometries = [];
staticObjects.forEach(obj => {
  const geo = obj.geometry.clone();
  geo.applyMatrix4(obj.matrix);
  geometries.push(geo);
});

const mergedGeometry = mergeBufferGeometries(geometries);
const mergedMesh = new THREE.Mesh(mergedGeometry, sharedMaterial);
```

#### 3. Level of Detail (LOD)
```javascript
const lod = new THREE.LOD();

// High detail (close)
const highDetail = new THREE.Mesh(
  new THREE.SphereGeometry(1, 32, 32),
  material
);
lod.addLevel(highDetail, 0);

// Medium detail
const medDetail = new THREE.Mesh(
  new THREE.SphereGeometry(1, 16, 16),
  material
);
lod.addLevel(medDetail, 10);

// Low detail (far)
const lowDetail = new THREE.Mesh(
  new THREE.SphereGeometry(1, 8, 8),
  material
);
lod.addLevel(lowDetail, 50);
```

### Physics Optimization

#### 1. Fixed Time Step
```javascript
// Prevents physics from slowing down on heavy frames
const fixedTimeStep = 1 / 60;
let accumulator = 0;

function physicsLoop(delta) {
  accumulator += Math.min(delta, 0.1); // Cap at 100ms

  while (accumulator >= fixedTimeStep) {
    physicsWorld.step(fixedTimeStep);
    accumulator -= fixedTimeStep;
  }
}
```

#### 2. Spatial Partitioning
```javascript
// Only check collisions between nearby objects
physicsWorld.broadphase = new CANNON.SAPBroadphase(physicsWorld);
```

#### 3. Sleep States
```javascript
// Let stationary objects sleep
body.sleepSpeedLimit = 0.1;
body.sleepTimeLimit = 1.0;
body.allowSleep = true;
```

### Memory Management

```javascript
// Dispose of geometries and materials when done
function cleanup(object) {
  object.traverse((child) => {
    if (child.geometry) child.geometry.dispose();

    if (child.material) {
      if (Array.isArray(child.material)) {
        child.material.forEach(mat => mat.dispose());
      } else {
        child.material.dispose();
      }
    }

    if (child.texture) child.texture.dispose();
  });
}
```

### Monitoring

```javascript
import Stats from 'stats.js';

const stats = new Stats();
stats.showPanel(0); // 0: fps, 1: ms, 2: mb
document.body.appendChild(stats.dom);

function animate() {
  stats.begin();

  // Your render code
  renderer.render(scene, camera);

  stats.end();
  requestAnimationFrame(animate);
}
```

---

## Development Roadmap

### Phase 1: Foundation (Week 1)
- [ ] Set up Vite + React + Three.js project
- [ ] Configure build pipeline with shader support
- [ ] Create base scene with lighting and post-processing
- [ ] Implement autonomous camera system
- [ ] Set up minimal state management

### Phase 2: Core Visualizations (Weeks 2-4)
- **Week 2: The Atom**
  - Nucleus with pulsing glow effect
  - Electron probability cloud shader
  - Electron particle trails
  - Auto-orbiting camera

- **Week 3: The Solar System**
  - Sun with corona shader
  - Planet orbital mechanics (Kepler's laws)
  - Orbital trail effects
  - Saturn's rings particle system

- **Week 4: The DNA Helix**
  - Double helix geometry generation
  - Base pair coloring and bonds
  - Backbone glow shader
  - Thermal vibration animation

### Phase 3: Visual Polish (Week 5)
- Refine post-processing (bloom, color grading)
- Add environmental effects (starfields, particles)
- Optimize shader performance
- Fine-tune camera movements for each visualization

### Phase 4: Testing & Launch (Week 6)
- Cross-browser testing (Chrome, Firefox, Safari)
- Performance profiling and optimization
- Mobile responsiveness check
- Deploy to production

### Future Expansions
- Additional visualizations (galaxy, black hole, molecules)
- WebXR/VR support for immersive viewing
- Multiple color themes
- Visualization transitions/morphing

---

## Code Patterns & Examples

### Atom Visualization Component

```javascript
import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export function Atom({ electrons = 6, nucleusColor = '#FF6B35' }) {
  const groupRef = useRef();
  const electronsRef = useRef([]);

  // Nucleus geometry
  const nucleusGeometry = useMemo(
    () => new THREE.SphereGeometry(0.5, 32, 32),
    []
  );

  // Nucleus shader with pulsing glow
  const nucleusMaterial = useMemo(
    () => new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 },
        color: { value: new THREE.Color(nucleusColor) }
      },
      vertexShader: `
        varying vec3 vNormal;
        void main() {
          vNormal = normalize(normalMatrix * normal);
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform float time;
        uniform vec3 color;
        varying vec3 vNormal;

        void main() {
          float pulse = sin(time * 2.0) * 0.2 + 0.8;
          float fresnel = pow(1.0 - dot(vNormal, vec3(0, 0, 1)), 2.0);
          vec3 glow = color * (pulse + fresnel * 0.5);
          gl_FragColor = vec4(glow, 1.0);
        }
      `
    }),
    [nucleusColor]
  );

  // Autonomous animation loop
  useFrame((state) => {
    // Update nucleus pulse
    nucleusMaterial.uniforms.time.value = state.clock.elapsedTime;

    // Update electron positions (orbital motion)
    electronsRef.current.forEach((electron, i) => {
      if (!electron) return;
      const shellRadius = 2 + Math.floor(i / 2) * 1.5;
      const speed = 0.5 / (Math.floor(i / 2) + 1);
      const offset = (i % 2) * Math.PI;

      electron.position.x = Math.cos(state.clock.elapsedTime * speed + offset) * shellRadius;
      electron.position.z = Math.sin(state.clock.elapsedTime * speed + offset) * shellRadius;
      electron.position.y = Math.sin(state.clock.elapsedTime * speed * 0.5) * 0.5;
    });
  });

  return (
    <group ref={groupRef}>
      {/* Nucleus */}
      <mesh geometry={nucleusGeometry} material={nucleusMaterial} />

      {/* Electrons */}
      {Array.from({ length: electrons }).map((_, i) => (
        <mesh
          key={i}
          ref={(el) => (electronsRef.current[i] = el)}
          position={[2 + i, 0, 0]}
        >
          <sphereGeometry args={[0.1, 16, 16]} />
          <meshBasicMaterial color="#00D9FF" />
        </mesh>
      ))}
    </group>
  );
}
```

### Orbital Mechanics Hook

```javascript
import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// Kepler's laws for planetary motion
export function useOrbitalMechanics(semiMajorAxis, eccentricity = 0, period = 10) {
  const position = useRef(new THREE.Vector3());
  const angle = useRef(0);

  useFrame((state, delta) => {
    // Update orbital angle based on period
    angle.current += (2 * Math.PI / period) * delta;

    // Calculate position using Kepler's equation (simplified for circular/elliptical)
    const r = semiMajorAxis * (1 - eccentricity * eccentricity) /
              (1 + eccentricity * Math.cos(angle.current));

    position.current.x = r * Math.cos(angle.current);
    position.current.z = r * Math.sin(angle.current);
    position.current.y = 0;  // Orbital plane
  });

  return position;
}

// Usage in planet component
export function Planet({ orbit, period, radius, color }) {
  const meshRef = useRef();
  const position = useOrbitalMechanics(orbit, 0.02, period);

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.position.copy(position.current);
      meshRef.current.rotation.y += 0.01;  // Planet rotation
    }
  });

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[radius, 32, 32]} />
      <meshStandardMaterial color={color} />
    </mesh>
  );
}
```

### DNA Helix Generator

```javascript
import { useMemo } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';

export function DNAHelix({ basePairs = 20, pitch = 3.4, radius = 1.0 }) {
  const groupRef = useRef();

  // Generate helix points
  const { backbone1, backbone2, bases } = useMemo(() => {
    const b1 = [], b2 = [], bases = [];

    for (let i = 0; i < basePairs; i++) {
      const theta = (i / basePairs) * Math.PI * 4;  // 2 full turns
      const y = (i / basePairs) * pitch * 2;

      // First backbone strand
      b1.push(new THREE.Vector3(
        radius * Math.cos(theta),
        y,
        radius * Math.sin(theta)
      ));

      // Second backbone strand (180° offset)
      b2.push(new THREE.Vector3(
        radius * Math.cos(theta + Math.PI),
        y,
        radius * Math.sin(theta + Math.PI)
      ));

      // Base pair connection
      bases.push({
        start: b1[b1.length - 1].clone(),
        end: b2[b2.length - 1].clone(),
        type: ['AT', 'TA', 'GC', 'CG'][i % 4]
      });
    }

    return {
      backbone1: new THREE.CatmullRomCurve3(b1),
      backbone2: new THREE.CatmullRomCurve3(b2),
      bases
    };
  }, [basePairs, pitch, radius]);

  // Slow rotation animation
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.1;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Backbone strands */}
      <mesh>
        <tubeGeometry args={[backbone1, 64, 0.05, 8, false]} />
        <meshStandardMaterial color="#E8E8E8" emissive="#444444" />
      </mesh>
      <mesh>
        <tubeGeometry args={[backbone2, 64, 0.05, 8, false]} />
        <meshStandardMaterial color="#E8E8E8" emissive="#444444" />
      </mesh>

      {/* Base pairs */}
      {bases.map((base, i) => (
        <BasePair key={i} start={base.start} end={base.end} type={base.type} />
      ))}
    </group>
  );
}

function BasePair({ start, end, type }) {
  const colors = {
    AT: ['#FF6B6B', '#4ECDC4'],
    TA: ['#4ECDC4', '#FF6B6B'],
    GC: ['#45B7D1', '#96CEB4'],
    CG: ['#96CEB4', '#45B7D1']
  };

  const midpoint = start.clone().add(end).multiplyScalar(0.5);
  const [color1, color2] = colors[type];

  return (
    <group>
      <mesh position={start.clone().add(midpoint).multiplyScalar(0.5).toArray()}>
        <cylinderGeometry args={[0.03, 0.03, start.distanceTo(midpoint), 8]} />
        <meshStandardMaterial color={color1} />
      </mesh>
      <mesh position={end.clone().add(midpoint).multiplyScalar(0.5).toArray()}>
        <cylinderGeometry args={[0.03, 0.03, end.distanceTo(midpoint), 8]} />
        <meshStandardMaterial color={color2} />
      </mesh>
    </group>
  );
}
```

### Auto-Orbit Camera Component

```javascript
import { useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

export function AutoOrbitCamera({
  target = [0, 0, 0],
  distance = 10,
  speed = 0.1,
  elevation = 0.3
}) {
  const { camera } = useThree();
  const angleRef = useRef(0);
  const targetVec = useRef(new THREE.Vector3(...target));

  useFrame((state, delta) => {
    // Slowly orbit around target
    angleRef.current += speed * delta;

    // Calculate camera position
    const elevationOffset = Math.sin(angleRef.current * 0.3) * elevation;
    camera.position.x = targetVec.current.x + Math.cos(angleRef.current) * distance;
    camera.position.z = targetVec.current.z + Math.sin(angleRef.current) * distance;
    camera.position.y = targetVec.current.y + distance * (elevation + elevationOffset);

    // Always look at target
    camera.lookAt(targetVec.current);
  });

  return null;  // This component only controls camera, renders nothing
}
```

---

## Appendix

### Useful Resources

**Three.js**
- Official Docs: https://threejs.org/docs/
- Examples: https://threejs.org/examples/
- Journey: https://threejs-journey.com/

**Shaders**
- The Book of Shaders: https://thebookofshaders.com/
- Shadertoy: https://www.shadertoy.com/
- Inigo Quilez: https://iquilezles.org/

**Physics**
- Cannon.js Docs: https://schteppe.github.io/cannon.js/
- Physics for Game Devs: https://www.toptal.com/game/video-game-physics-part-i-an-introduction-to-rigid-body-dynamics

**React Three Fiber**
- Docs: https://docs.pmnd.rs/react-three-fiber/
- Drei Helpers: https://github.com/pmndrs/drei

### Mathematical Reference

```javascript
// Common physics constants
export const PHYSICS_CONSTANTS = {
  G: 6.674e-11,              // Gravitational constant
  c: 299792458,              // Speed of light (m/s)
  h: 6.626e-34,              // Planck constant
  k: 8.988e9,                // Coulomb constant
  e: 1.602e-19,              // Elementary charge
  epsilon0: 8.854e-12,       // Permittivity of free space
  mu0: 1.257e-6,             // Permeability of free space
  me: 9.109e-31,             // Electron mass
  mp: 1.673e-27              // Proton mass
};
```

### Git Workflow

```bash
# Development
git checkout -b feature/new-diagram
# ... make changes ...
git add .
git commit -m "Add double pendulum diagram"
git push -u origin feature/new-diagram

# Create PR, review, merge to main
```

### Deployment

```bash
# Build for production
npm run build

# Preview build
npm run preview

# Deploy to Vercel/Netlify
# (Automatic via git integration)
```

---

## Final Notes

This document serves as the master blueprint for **Aesthetica Physica**. It should be treated as a living document—updated as the project evolves, new patterns emerge, and better practices are discovered.

### Design Philosophy

Every visualization we create should:
1. **Mesmerize** - Viewers should be drawn into continuous observation
2. **Inspire Wonder** - Beauty should spark curiosity about nature
3. **Perform Flawlessly** - 60fps is non-negotiable for smooth, hypnotic motion
4. **Respect Physics** - All motion emerges from accurate physical simulation

### The View-Only Experience

Remember: **No user input whatsoever.** The website is a window into beautiful, autonomous physics simulations. Visitors watch, contemplate, and appreciate—like observing an aquarium or gazing at stars. The absence of controls is a feature, not a limitation. It creates:

- **Immediacy**: No learning curve, instant immersion
- **Calm**: No decisions to make, pure observation
- **Universality**: Works the same for everyone
- **Ambient Quality**: Can run indefinitely as digital art

### Next Steps

1. Initialize project with Vite + React + Three.js
2. Set up base scene with autonomous camera
3. Implement The Atom visualization first
4. Add The Solar System and DNA Helix
5. Polish with post-processing and ambient effects
6. Deploy as a simple, beautiful web gallery

---

**Document Version**: 1.1
**Last Updated**: 2025-11-21
**Author**: Senior Creative Technologist & Physics Engine Architect
**Project**: Aesthetica Physica

---

*"Where physics meets poetry, and code becomes contemplation."*
