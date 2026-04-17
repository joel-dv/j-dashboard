import { Canvas, useFrame } from '@react-three/fiber'
import { useEffect, useRef } from 'react'
import { MathUtils, Vector2 } from 'three'

const vertexShader = `
  varying vec2 vUv;

  void main() {
    vUv = uv;
    gl_Position = vec4(position, 1.0);
  }
`

const fragmentShader = `
  precision highp float;

  varying vec2 vUv;

  uniform vec2 uResolution;
  uniform vec2 uPointer;
  uniform float uPointerStrength;
  uniform float uTime;

  float hash(float value) {
    return fract(sin(value) * 43758.5453123);
  }

  void main() {
    float aspect = uResolution.x / uResolution.y;
    vec2 grid = vec2(44.0 * aspect, 44.0);
    vec2 gridUv = vUv * grid;
    vec2 cellUv = fract(gridUv) - 0.5;
    vec2 cellIndex = floor(gridUv);
    vec2 cellCenterUv = (cellIndex + 0.5) / grid;

    vec2 delta = cellCenterUv - uPointer;
    delta.x *= aspect;

    float influence = uPointerStrength * (1.0 - smoothstep(0.02, 0.26, length(delta)));
    float baseRadius = 0.135;
    float dotRadius = mix(baseRadius, baseRadius * 0.12, influence);

    float cycle = floor(uTime * 0.5);
    vec2 randomDot = floor(vec2(
      hash(cycle + 1.73) * grid.x,
      hash(cycle + 8.41) * grid.y
    ));
    float cycleProgress = fract(uTime * 0.25);
    float pulse = smoothstep(0.0, 0.18, cycleProgress) * (1.0 - smoothstep(0.58, 1.0, cycleProgress));
    float selectedDot =
      (1.0 - step(0.5, abs(cellIndex.x - randomDot.x))) *
      (1.0 - step(0.5, abs(cellIndex.y - randomDot.y)));

    dotRadius *= 1.0 + selectedDot * pulse * 1.8;

    float dot = 1.0 - smoothstep(dotRadius, dotRadius + 0.028, length(cellUv));

    float vignette = smoothstep(1.05, 0.18, length((vUv - 0.5) * vec2(aspect, 1.0)));
    float shimmer = 0.96 + 0.04 * sin((vUv.y + vUv.x) * 18.0);

    vec3 background = vec3(0.028, 0.028, 0.035);
    vec3 dotColor = vec3(0.88, 0.88, 0.9);
    float accent = 1.0 + selectedDot * pulse * 1.1;
    vec3 color = background + dotColor * dot * 0.2 * vignette * shimmer * accent;

    gl_FragColor = vec4(color, 1.0);
  }
`

function DotGridPlane() {
  const materialRef = useRef(null)
  const pointerTargetRef = useRef(new Vector2(0.5, 0.5))
  const pointerCurrentRef = useRef(new Vector2(0.5, 0.5))
  const pointerStrengthRef = useRef(0)
  const isPointerActiveRef = useRef(false)

  useEffect(() => {
    const handlePointerMove = (event) => {
      const viewportWidth = window.innerWidth || 1
      const viewportHeight = window.innerHeight || 1
      const x = event.clientX / viewportWidth
      const y = 1 - event.clientY / viewportHeight

      pointerTargetRef.current.set(x, y)
      isPointerActiveRef.current = true
    }

    const handlePointerLeave = () => {
      isPointerActiveRef.current = false
    }

    window.addEventListener('pointermove', handlePointerMove)
    window.addEventListener('pointerleave', handlePointerLeave)
    window.addEventListener('blur', handlePointerLeave)

    return () => {
      window.removeEventListener('pointermove', handlePointerMove)
      window.removeEventListener('pointerleave', handlePointerLeave)
      window.removeEventListener('blur', handlePointerLeave)
    }
  }, [])

  useFrame((state, delta) => {
    if (!materialRef.current) {
      return
    }

    const { width, height } = state.size
    const current = pointerCurrentRef.current
    const target = pointerTargetRef.current
    const ease = 1.0 - Math.exp(-delta * 8.0)

    current.lerp(target, ease)
    pointerStrengthRef.current = MathUtils.damp(
      pointerStrengthRef.current,
      isPointerActiveRef.current ? 1 : 0,
      isPointerActiveRef.current ? 10 : 2.4,
      delta
    )

    materialRef.current.uniforms.uResolution.value.set(width, height)
    materialRef.current.uniforms.uPointer.value.copy(current)
    materialRef.current.uniforms.uPointerStrength.value = pointerStrengthRef.current
    materialRef.current.uniforms.uTime.value = state.clock.elapsedTime
  })

  return (
    <mesh>
      <planeGeometry args={[2, 2]} />
      <shaderMaterial
        ref={materialRef}
        uniforms={{
          uResolution: { value: new Vector2(1, 1) },
          uPointer: { value: new Vector2(0.5, 0.5) },
          uPointerStrength: { value: 0 },
          uTime: { value: 0 },
        }}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
      />
    </mesh>
  )
}

export default function InspoDotGridShader() {
  return (
    <Canvas
      className="inspo-canvas"
      gl={{ antialias: true }}
      dpr={[1, 2]}
      orthographic
      camera={{ position: [0, 0, 1], zoom: 1 }}
    >
      <DotGridPlane />
    </Canvas>
  )
}
