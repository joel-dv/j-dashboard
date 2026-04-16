import { Canvas, useFrame } from '@react-three/fiber'
import { useRef } from 'react'
import { Vector2 } from 'three'

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

  uniform float uTime;
  uniform vec2 uResolution;

  mat2 rotate2D(float angle) {
    float s = sin(angle);
    float c = cos(angle);
    return mat2(c, -s, s, c);
  }

  float lineField(vec2 uv, float time) {
    float radius = length(uv);
    float angle = atan(uv.y, uv.x);

    vec2 warped = uv * rotate2D(time * 0.08 + radius * 0.7);
    float bandsA = sin(warped.x * 18.0 + sin(warped.y * 6.0 - time * 0.6) * 2.0 - time * 0.45);
    float bandsB = sin(warped.y * 22.0 + cos(warped.x * 7.0 + time * 0.5) * 1.7 + time * 0.35);
    float rings = sin(radius * 38.0 - time * 1.1);
    float spokes = cos(angle * 28.0 + radius * 8.0 - time * 0.7);

    float pattern = bandsA * 0.42 + bandsB * 0.34 + rings * 0.16 + spokes * 0.12;
    float lineMask = 1.0 - smoothstep(0.0, 0.085, abs(pattern));

    return lineMask;
  }

  void main() {
    vec2 uv = vUv * 2.0 - 1.0;
    uv.x *= uResolution.x / uResolution.y;

    float time = uTime * 0.55;
    float radius = length(uv);

    float lines = lineField(uv, time);
    float secondaryLines = lineField(uv * 1.18 + vec2(0.0, 0.04), time + 1.4) * 0.45;
    float glow = smoothstep(0.34, 0.0, abs(sin(radius * 22.0 - time * 0.9)));

    vec3 background = vec3(0.02, 0.02, 0.03);
    vec3 lineColor = vec3(1.0);

    float intensity = lines + secondaryLines + glow * 0.08;
    intensity *= 1.0 - smoothstep(0.92, 1.35, radius);

    vec3 color = mix(background, lineColor, clamp(intensity, 0.0, 1.0));

    float vignette = smoothstep(1.28, 0.18, radius);
    color *= vignette;

    gl_FragColor = vec4(color, 1.0);
  }
`

function LineShaderPlane() {
  const materialRef = useRef(null)

  useFrame((state) => {
    if (!materialRef.current) {
      return
    }

    const { width, height } = state.size
    materialRef.current.uniforms.uTime.value = state.clock.elapsedTime
    materialRef.current.uniforms.uResolution.value.set(width, height)
  })

  return (
    <mesh>
      <planeGeometry args={[2, 2]} />
      <shaderMaterial
        ref={materialRef}
        uniforms={{
          uTime: { value: 0 },
          uResolution: { value: new Vector2(1, 1) },
        }}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
      />
    </mesh>
  )
}

export default function InspoLineShader() {
  return (
    <Canvas
      className="inspo-canvas"
      gl={{ antialias: true }}
      dpr={[1, 2]}
      orthographic
      camera={{ position: [0, 0, 1], zoom: 1 }}
    >
      <LineShaderPlane />
    </Canvas>
  )
}
