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

  float hash21(vec2 p) {
    p = fract(p * vec2(234.34, 435.345));
    p += dot(p, p + 34.23);
    return fract(p.x * p.y);
  }

  mat2 rotate2D(float angle) {
    float s = sin(angle);
    float c = cos(angle);
    return mat2(c, -s, s, c);
  }

  vec3 palette(float t) {
    vec3 a = vec3(0.52, 0.45, 0.65);
    vec3 b = vec3(0.42, 0.34, 0.35);
    vec3 c = vec3(1.1, 0.9, 0.75);
    vec3 d = vec3(0.05, 0.22, 0.38);
    return a + b * cos(6.28318 * (c * t + d));
  }

  void main() {
    vec2 uv = vUv * 2.0 - 1.0;
    uv.x *= uResolution.x / uResolution.y;

    float time = uTime * 0.55;
    float radius = length(uv);
    float angle = atan(uv.y, uv.x);

    uv *= rotate2D(sin(time * 0.35) * 0.3);

    float kaleidoSlices = 12.0;
    angle = abs(mod(angle, 6.28318 / kaleidoSlices) - 3.14159 / kaleidoSlices);

    vec2 polarUv = vec2(angle * 3.6, radius * 6.5 - time * 0.45);
    vec2 warped = uv * (3.0 + sin(radius * 8.0 - time * 1.2) * 0.25);

    vec2 gridUv = vec2(
      polarUv.x + sin(radius * 14.0 - time * 1.4) * 0.18,
      polarUv.y + cos(angle * 10.0 + time) * 0.22
    );

    vec2 cell = floor(gridUv);
    vec2 local = fract(gridUv) - 0.5;

    float pulse = 0.3 + 0.7 * sin(time * 2.4 - radius * 10.0);
    float cellNoise = hash21(cell);
    float dotRadius = mix(0.08, 0.34, pulse * (0.65 + cellNoise * 0.35));

    float dot = smoothstep(dotRadius, dotRadius - 0.07, length(local));

    float ring = sin(radius * 24.0 - time * 3.0);
    float spokes = cos(angle * 24.0 + time * 2.2);
    float wave = sin((warped.x + warped.y) * 5.0 - time * 1.6);

    float energy = dot;
    energy += 0.22 * ring + 0.14 * spokes + 0.08 * wave;
    energy *= 1.0 - smoothstep(0.88, 1.3, radius);

    float colorPhase = radius * 0.8 - time * 0.55 + dot * 0.3 + spokes * 0.08;
    vec3 color = palette(colorPhase);
    color *= 0.55 + dot * 0.9;
    color += palette(colorPhase + 0.18) * max(ring, 0.0) * 0.12;

    vec3 background = vec3(0.02, 0.01, 0.05);
    vec3 finalColor = mix(background, color, clamp(energy, 0.0, 1.0));

    float vignette = smoothstep(1.3, 0.25, radius);
    finalColor *= vignette;

    gl_FragColor = vec4(finalColor, 1.0);
  }
`

function ShaderPlane() {
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

export default function InspoShader() {
  return (
    <Canvas
      className="inspo-canvas"
      gl={{ antialias: true }}
      dpr={[1, 2]}
      orthographic
      camera={{ position: [0, 0, 1], zoom: 1 }}
    >
      <ShaderPlane />
    </Canvas>
  )
}
