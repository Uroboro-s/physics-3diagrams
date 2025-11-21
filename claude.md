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
**Aesthetica Physica** reimagines standard physics diagrams as high-end, interactive generative art experiences. We move beyond static textbook illustrations to create cinematic, real-time 3D visualizations that maintain scientific accuracy while achieving museum-quality aesthetics.

### Core Principles

1. **Scientific Accuracy First**: Every visualization must be physically accurate and educationally valid
2. **Cinematic Quality**: AAA game-level graphics, film-quality rendering
3. **Interactive Exploration**: Users should feel empowered to manipulate and understand physics
4. **Performance Excellence**: 60fps on modern hardware, graceful degradation on older devices
5. **Generative Aesthetics**: Procedural, shader-driven visuals that feel alive

### Target Audience

- Physics students seeking intuitive understanding
- Educators looking for engaging teaching tools
- Digital artists exploring scientific visualization
- Science communicators and content creators
- Museum installations and exhibitions

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

#### UI & State Management
```
React 18+
├── Functional components with hooks
├── Zustand (lightweight state management)
├── React Three Fiber (declarative Three.js)
└── Leva (debug GUI)
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
    "leva": "^0.9.35",
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

---

## Architecture Overview

### System Layers

```
┌─────────────────────────────────────────────────┐
│          React UI Layer (2D Overlay)            │
│  Controls | Info Panels | Debug GUI             │
└─────────────────────────────────────────────────┘
                      ↕
┌─────────────────────────────────────────────────┐
│         State Management (Zustand)              │
│  Scene State | Physics Params | UI State        │
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
│  │ Rigid    │  │ Particle │  │ Field    │      │
│  │ Bodies   │  │ Systems  │  │ Solvers  │      │
│  └──────────┘  └──────────┘  └──────────┘      │
└─────────────────────────────────────────────────┘
                      ↕
┌─────────────────────────────────────────────────┐
│         GPU Compute Layer (Shaders)             │
│  Particle Updates | Field Calculations          │
└─────────────────────────────────────────────────┘
```

### Data Flow

```javascript
User Input → State Update → Physics Tick → Scene Update → Render
     ↓                          ↓              ↓            ↓
 UI Events              Forces/Constraints   Positions   WebGL
```

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
- **Primary**: PerspectiveCamera with orbital controls
- **Cinematic**: Animated camera paths using GSAP
- **Debug**: OrthographicCamera for technical views

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

### 4. Interaction System

#### Input Handling
```javascript
class InteractionManager {
  constructor(camera, scene, domElement) {
    this.raycaster = new THREE.Raycaster();
    this.mouse = new THREE.Vector2();
    this.camera = camera;
    this.scene = scene;

    // Event listeners
    domElement.addEventListener('mousemove', this.onMouseMove.bind(this));
    domElement.addEventListener('click', this.onClick.bind(this));
    domElement.addEventListener('wheel', this.onWheel.bind(this));
  }

  onMouseMove(event) {
    // Normalize mouse coordinates
    this.mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    this.mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

    // Raycast
    this.raycaster.setFromCamera(this.mouse, this.camera);
    const intersects = this.raycaster.intersectObjects(
      this.scene.children, true
    );

    if (intersects.length > 0) {
      this.handleHover(intersects[0]);
    }
  }

  handleHover(intersection) {
    // Highlight object, show tooltip, etc.
    const object = intersection.object;
    if (object.userData.interactive) {
      object.material.emissive.setHex(0x444444);
    }
  }
}
```

#### Gesture Controls
- **Orbit**: Click + drag to rotate camera
- **Pan**: Right-click + drag to pan
- **Zoom**: Scroll to zoom
- **Select**: Click on interactive objects
- **Manipulate**: Drag to apply forces or change parameters

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

1. **Easing**: Use physically-based easing (not linear)
2. **Timing**: Follow 12 principles of animation
3. **Continuity**: Smooth transitions, no pops
4. **Purposeful Motion**: Every animation should teach or reveal
5. **Performance**: Prefer GPU animation (shaders) over CPU

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
// Zustand store for global state
import create from 'zustand';

export const usePhysicsStore = create((set, get) => ({
  // State
  gravity: -9.82,
  timeScale: 1.0,
  isPaused: false,
  selectedDiagram: null,

  // Actions
  setGravity: (g) => set({ gravity: g }),
  togglePause: () => set((state) => ({ isPaused: !state.isPaused })),
  selectDiagram: (id) => set({ selectedDiagram: id }),

  // Computed
  getEffectiveTimeStep: () => {
    const { timeScale, isPaused } = get();
    return isPaused ? 0 : (1/60) * timeScale;
  }
}));
```

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
│   │   ├── models/
│   │   └── fonts/
│   └── index.html
├── src/
│   ├── components/
│   │   ├── diagrams/
│   │   │   ├── Pendulum.jsx
│   │   │   ├── ElectricField.jsx
│   │   │   ├── DoubleSlit.jsx
│   │   │   └── [more diagrams...]
│   │   ├── ui/
│   │   │   ├── ControlPanel.jsx
│   │   │   ├── InfoOverlay.jsx
│   │   │   └── DebugGUI.jsx
│   │   └── shared/
│   │       ├── Camera.jsx
│   │       ├── Lighting.jsx
│   │       └── PostProcessing.jsx
│   ├── physics/
│   │   ├── PhysicsEngine.js
│   │   ├── ParticleSystem.js
│   │   ├── FieldSolver.js
│   │   └── RigidBody.js
│   ├── shaders/
│   │   ├── common/
│   │   │   ├── noise.glsl
│   │   │   ├── math.glsl
│   │   │   └── lighting.glsl
│   │   ├── materials/
│   │   │   ├── energy.frag
│   │   │   ├── holographic.frag
│   │   │   └── particle.vert
│   │   └── post/
│   │       └── bloom.frag
│   ├── utils/
│   │   ├── math.js
│   │   ├── geometry.js
│   │   └── colors.js
│   ├── stores/
│   │   ├── physicsStore.js
│   │   └── uiStore.js
│   ├── hooks/
│   │   ├── usePhysics.js
│   │   └── useInteraction.js
│   ├── constants/
│   │   ├── physics.js
│   │   └── visuals.js
│   ├── App.jsx
│   └── main.jsx
├── tests/
│   ├── visual/
│   ├── physics/
│   └── performance/
├── docs/
│   ├── claude.md (this file)
│   ├── diagrams.md
│   └── shaders.md
├── package.json
├── vite.config.js
├── tsconfig.json
└── README.md
```

---

## Physics Diagrams Catalog

### Mechanics

#### 1. Simple Pendulum
**Physics**: Harmonic motion, energy conservation
**Visual Style**: Glowing energy trail, ghosted motion history
**Interactivity**: Drag to set amplitude, adjust gravity

```javascript
// Key features:
- Real-time angle/velocity graph overlay
- Color-coded energy (PE = blue, KE = red)
- Adjustable string length and mass
- Damping controls
```

#### 2. Double Pendulum
**Physics**: Chaotic motion, sensitive dependence
**Visual Style**: Rainbow trail showing path divergence
**Interactivity**: Set initial conditions, observe butterfly effect

#### 3. Projectile Motion
**Physics**: Parabolic trajectories, range calculation
**Visual Style**: Multiple simultaneous trajectories at different angles
**Interactivity**: Adjust launch angle, velocity, air resistance

#### 4. Collision (Elastic/Inelastic)
**Physics**: Momentum conservation, energy transfer
**Visual Style**: Particle burst effects on impact, rippling energy waves
**Interactivity**: Adjust masses, velocities, coefficient of restitution

### Electromagnetism

#### 5. Electric Field Lines
**Physics**: Coulomb's law, superposition principle
**Visual Style**: Flowing, animated field lines with directional particles
**Interactivity**: Add/remove charges, adjust magnitudes

```javascript
// Visual features:
- Equipotential surfaces (semi-transparent)
- Field strength indicated by line density and glow
- Interactive test charge shows force direction
```

#### 6. Magnetic Field (Bar Magnet)
**Physics**: Magnetic dipole field
**Visual Style**: Iron filing simulation, 3D field visualization
**Interactivity**: Rotate magnet, place compass needles

#### 7. Electromagnetic Induction
**Physics**: Faraday's law, Lenz's law
**Visual Style**: Changing magnetic flux shown with animated field
**Interactivity**: Move magnet through coil, adjust velocity

#### 8. LC Circuit Oscillation
**Physics**: Energy oscillation between E and B fields
**Visual Style**: Pulsing capacitor and inductor with energy flow
**Interactivity**: Set initial charge, adjust L and C values

### Waves & Optics

#### 9. Wave Interference (2 Sources)
**Physics**: Constructive/destructive interference
**Visual Style**: Ripple tank simulation with 3D wave amplitude
**Interactivity**: Adjust frequency, phase difference, wavelength

#### 10. Double Slit Experiment
**Physics**: Wave-particle duality, diffraction
**Visual Style**: Probability wave visualization, particle detection events
**Interactivity**: Single photon mode vs. continuous wave

```javascript
// Quantum visualization:
- Build up interference pattern one photon at a time
- Show wavefronts passing through slits
- Detector screen with accumulating hits
```

#### 11. Standing Waves
**Physics**: Resonance, harmonics
**Visual Style**: 3D rope/string with nodes and antinodes
**Interactivity**: Select harmonic number, adjust tension

#### 12. Doppler Effect
**Physics**: Frequency shift due to motion
**Visual Style**: Compressed/expanded wavefronts, color shift
**Interactivity**: Adjust source velocity, observer position

### Thermodynamics & Statistical

#### 13. Maxwell-Boltzmann Distribution
**Physics**: Particle speed distribution in gases
**Visual Style**: Thousands of particles with color-coded speeds
**Interactivity**: Adjust temperature, observe distribution histogram

#### 14. Carnot Cycle
**Physics**: Thermodynamic cycle, PV diagram
**Visual Style**: 3D PV surface with animated state point
**Interactivity**: Adjust reservoir temperatures, step through cycle

### Modern Physics

#### 15. Photoelectric Effect
**Physics**: Photon energy, work function
**Visual Style**: Incoming photons, ejected electrons with KE visualization
**Interactivity**: Adjust light frequency and intensity

#### 16. Atomic Orbitals (Hydrogen)
**Physics**: Quantum mechanical probability densities
**Visual Style**: Volumetric rendering of ψ², glowing probability clouds
**Interactivity**: Select orbital (1s, 2p, 3d...), slice through planes

```javascript
// Advanced viz:
- Real and imaginary components
- Phase visualization
- Cross-section views
```

#### 17. Particle in a Box
**Physics**: Quantum confinement, energy quantization
**Visual Style**: Wavefunction with animated time evolution
**Interactivity**: Select quantum number n, adjust box size

### Advanced Topics

#### 18. Lorenz Attractor
**Physics**: Chaos theory, strange attractors
**Visual Style**: Flowing particle stream tracing butterfly path
**Interactivity**: Adjust parameters (σ, ρ, β), observe sensitivity

#### 19. Gravitational Lensing
**Physics**: General relativity, curved spacetime
**Visual Style**: Distorted background grid, multiple images of source
**Interactivity**: Adjust mass, observe Einstein ring

#### 20. Three-Body Problem
**Physics**: N-body gravity, orbital mechanics
**Visual Style**: Elegant orbital trails, gravitational field visualization
**Interactivity**: Set initial conditions, observe chaotic evolution

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

### Phase 1: Foundation (Weeks 1-2)
- ✓ Set up Vite + React + Three.js project
- ✓ Configure build pipeline with shader support
- ✓ Create base scene with camera, lighting, post-processing
- ✓ Implement state management with Zustand
- ✓ Build UI framework with control panel
- ✓ Set up physics engine integration

### Phase 2: Core Diagrams (Weeks 3-6)
- Week 3: Mechanics diagrams (pendulum, projectile, collisions)
- Week 4: Electromagnetism (fields, induction)
- Week 5: Waves (interference, standing waves)
- Week 6: Polish and optimization

### Phase 3: Advanced Features (Weeks 7-9)
- Week 7: Modern physics (quantum orbitals, photoelectric effect)
- Week 8: Advanced shaders (holographic, energy fields)
- Week 9: Interaction system enhancements

### Phase 4: Content & Polish (Weeks 10-12)
- Week 10: Additional diagrams, edge cases
- Week 11: Educational overlays, info panels, explanations
- Week 12: Performance optimization, cross-browser testing

### Phase 5: Launch (Week 13+)
- Deploy to production
- Gather user feedback
- Plan expansions (more diagrams, VR support)

---

## Code Patterns & Examples

### Complete Diagram Component Template

```javascript
import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { usePhysicsStore } from '../stores/physicsStore';

export function ExampleDiagram({
  parameter1 = 1.0,
  parameter2 = 2.0,
  color = '#00D9FF'
}) {
  // Refs
  const meshRef = useRef();
  const physicsRef = useRef({
    velocity: new THREE.Vector3(),
    acceleration: new THREE.Vector3()
  });

  // State
  const { gravity, timeScale } = usePhysicsStore();

  // Memoized geometry/material
  const geometry = useMemo(
    () => new THREE.SphereGeometry(1, 32, 32),
    []
  );

  const material = useMemo(
    () => new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 },
        color: { value: new THREE.Color(color) }
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
          float fresnel = pow(1.0 - dot(vNormal, vec3(0, 0, 1)), 3.0);
          vec3 finalColor = color * (0.5 + fresnel * 0.5);
          gl_FragColor = vec4(finalColor, 1.0);
        }
      `
    }),
    [color]
  );

  // Animation loop
  useFrame((state, delta) => {
    if (!meshRef.current) return;

    // Update physics
    const dt = delta * timeScale;
    physicsRef.current.acceleration.set(0, gravity, 0);
    physicsRef.current.velocity.addScaledVector(
      physicsRef.current.acceleration,
      dt
    );
    meshRef.current.position.addScaledVector(
      physicsRef.current.velocity,
      dt
    );

    // Update shader uniforms
    material.uniforms.time.value = state.clock.elapsedTime;

    // Boundary conditions
    if (meshRef.current.position.y < -5) {
      meshRef.current.position.y = -5;
      physicsRef.current.velocity.y *= -0.8; // Bounce with damping
    }
  });

  return (
    <mesh ref={meshRef} geometry={geometry} material={material} />
  );
}
```

### Custom Hook for Physics

```javascript
import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { usePhysicsStore } from '../stores/physicsStore';

export function usePhysicsObject(mass = 1.0) {
  const physics = useRef({
    position: new THREE.Vector3(),
    velocity: new THREE.Vector3(),
    acceleration: new THREE.Vector3(),
    forces: new THREE.Vector3(),
    mass: mass
  });

  const { gravity, timeScale, isPaused } = usePhysicsStore();

  const addForce = (force) => {
    physics.current.forces.add(force);
  };

  const clearForces = () => {
    physics.current.forces.set(0, 0, 0);
  };

  const integrate = (delta) => {
    if (isPaused) return;

    const dt = delta * timeScale;
    const { velocity, acceleration, forces, position } = physics.current;

    // F = ma → a = F/m
    acceleration.copy(forces).divideScalar(mass);
    acceleration.y += gravity; // Add gravity

    // Velocity Verlet integration
    velocity.addScaledVector(acceleration, dt);
    position.addScaledVector(velocity, dt);

    clearForces();
  };

  useFrame((_, delta) => {
    integrate(delta);
  });

  return {
    physics: physics.current,
    addForce,
    clearForces
  };
}
```

### Field Visualization Component

```javascript
import { useMemo } from 'react';
import * as THREE from 'three';

export function FieldLines({ sources = [], resolution = 20 }) {
  const lines = useMemo(() => {
    const lineGeometries = [];

    // Create field lines starting from grid around sources
    sources.forEach(source => {
      for (let i = 0; i < resolution; i++) {
        const angle = (i / resolution) * Math.PI * 2;
        const startPoint = new THREE.Vector3(
          source.position.x + Math.cos(angle) * 0.5,
          source.position.y,
          source.position.z + Math.sin(angle) * 0.5
        );

        // Trace field line
        const points = [];
        let current = startPoint.clone();

        for (let step = 0; step < 100; step++) {
          points.push(current.clone());

          // Calculate field at current point
          const field = new THREE.Vector3();
          sources.forEach(s => {
            const r = current.clone().sub(s.position);
            const dist = r.length();
            if (dist < 0.1) return; // Avoid singularity

            const magnitude = s.strength / (dist * dist);
            field.add(r.normalize().multiplyScalar(magnitude));
          });

          // Step along field
          if (field.length() < 0.001) break;
          current.add(field.normalize().multiplyScalar(0.1));

          // Bounds check
          if (current.length() > 20) break;
        }

        if (points.length > 2) {
          const geometry = new THREE.BufferGeometry().setFromPoints(points);
          lineGeometries.push(geometry);
        }
      }
    });

    return lineGeometries;
  }, [sources, resolution]);

  return (
    <group>
      {lines.map((geometry, i) => (
        <line key={i} geometry={geometry}>
          <lineBasicMaterial color="#00D9FF" linewidth={2} />
        </line>
      ))}
    </group>
  );
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

### Philosophy Reminder

Every diagram we create should:
1. **Teach** - Users should understand the physics better
2. **Inspire** - Beauty should draw people to science
3. **Perform** - 60fps is non-negotiable
4. **Accuracy** - Never sacrifice physics correctness for aesthetics

### Next Steps

1. Initialize project with Vite + React + Three.js
2. Set up base scene architecture
3. Implement first diagram (simple pendulum) as template
4. Iterate and expand catalog

---

**Document Version**: 1.0
**Last Updated**: 2025-11-21
**Author**: Senior Creative Technologist & Physics Engine Architect
**Project**: Aesthetica Physica

---

*"Where physics meets poetry, and code becomes art."*
