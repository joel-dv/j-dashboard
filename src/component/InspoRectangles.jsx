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

  float random(vec2 st) {
    return fract(sin(dot(st, vec2(12.9898, 78.233))) * 43758.5453123);
  }

  vec3 palette(float index) {
    if (index < 0.5) {
      return vec3(0.67, 1.0, 0.22);
    }

    if (index < 1.5) {
      return vec3(0.69, 0.35, 1.0);
    }

    if (index < 2.5) {
      return vec3(1.0, 0.93, 0.18);
    }

    return vec3(0.16, 0.72, 1.0);
  }

  float rectangleLayer(vec2 uv, float time, vec2 density, float speed, out vec3 layerColor) {
    vec2 scaled = uv * density;
    scaled.x += time * speed;

    vec2 cellId = floor(scaled);
    vec2 cellUv = fract(scaled) - 0.5;

    float occupancy = step(0.28, random(cellId + density * 1.73));

    float width = mix(0.42, 0.98, random(cellId + 11.3));
    float height = mix(0.34, 0.94, random(cellId + 23.7));
    vec2 offset = vec2(
      (random(cellId + 31.1) - 0.5) * (1.0 - width) * 0.55,
      (random(cellId + 47.9) - 0.5) * (1.0 - height) * 0.55
    );

    vec2 centered = cellUv - offset;
    vec2 halfSize = vec2(width, height) * 0.5;
    vec2 edgeSoftness = vec2(0.03);

    float rectX = 1.0 - smoothstep(halfSize.x, halfSize.x + edgeSoftness.x, abs(centered.x));
    float rectY = 1.0 - smoothstep(halfSize.y, halfSize.y + edgeSoftness.y, abs(centered.y));
    float mask = occupancy * rectX * rectY;

    float colorIndex = floor(random(cellId + 61.7) * 4.0);
    layerColor = palette(colorIndex);

    return mask;
  }

  void main() {
    vec2 uv = vUv;
    uv.x *= uResolution.x / uResolution.y;

    float time = uTime * 0.32;
    vec3 background = vec3(0.03, 0.03, 0.05);
    vec3 color = background;

    vec3 layerColorA;
    vec3 layerColorB;
    vec3 layerColorC;

    float layerA = rectangleLayer(uv + vec2(0.0, 0.04), time, vec2(5.0, 8.0), 0.55, layerColorA);
    float layerB = rectangleLayer(uv + vec2(0.0, 0.02), time + 7.4, vec2(8.0, 13.0), 0.85, layerColorB);
    float layerC = rectangleLayer(uv - vec2(0.0, 0.03), time + 13.6, vec2(12.0, 20.0), 1.15, layerColorC);

    color = mix(color, layerColorA, layerA);
    color = mix(color, layerColorB, layerB * (1.0 - layerA * 0.75));
    color = mix(color, layerColorC, layerC * (1.0 - max(layerA, layerB) * 0.65));

    float pulse = 0.04 * sin((uv.y * 24.0) + time * 2.1);
    color += (layerA + layerB + layerC) * pulse;

    float vignette = smoothstep(1.45, 0.18, length((vUv * 2.0) - 1.0));
    color *= mix(0.72, 1.0, vignette);

    gl_FragColor = vec4(color, 1.0);
  }
`

function RectangleShaderPlane() {
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

export default function InspoRectangles() {
  return (
    <Canvas
      className="inspo-canvas"
      gl={{ antialias: true }}
      dpr={[1, 2]}
      orthographic
      camera={{ position: [0, 0, 1], zoom: 1 }}
    >
      <RectangleShaderPlane />
    </Canvas>
  )
}
