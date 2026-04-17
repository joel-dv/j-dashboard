import { useRef, useMemo } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'

// ─── Vertex Shader ──────────────────────────────────────────────────────────
// Bypasses the camera entirely — maps the 2×2 plane straight to clip space.
const vertexShader = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position.xy, 0.0, 1.0);
  }
`

// ─── Fragment Shader ─────────────────────────────────────────────────────────
// Concentric rings of dots drawn in polar coordinates.
// Odd/even rings counter-rotate. Dot radius and hue pulse with time.
const fragmentShader = /* glsl */ `
  uniform float uTime;
  uniform vec2  uResolution;
  varying vec2  vUv;

  #define PI  3.14159265358979
  #define TAU 6.28318530717959

  // HSV → RGB (smooth, no branches)
  vec3 hsv2rgb(vec3 c) {
    vec4 K = vec4(1.0, 2.0 / 3.0, 1.0 / 3.0, 3.0);
    vec3 p = abs(fract(c.xxx + K.xyz) * 6.0 - K.www);
    return c.z * mix(K.xxx, clamp(p - K.xxx, 0.0, 1.0), c.y);
  }

  void main() {
    // Aspect-correct, centred UV  (ranges roughly ±1 on shorter axis)
    vec2 uv = (vUv - 0.5) * 2.0;
    uv.x *= uResolution.x / uResolution.y;

    float r     = length(uv);
    float theta = atan(uv.y, uv.x);   // -PI … +PI

    // ── Ring layout ──────────────────────────────────────────────────────────
    const float RING_COUNT   = 13.0;
    const float RING_SPACING = 0.095;  // world-space gap between ring centres

    float accumMask = 0.0;
    float accumHue  = 0.0;
    float accumWt   = 0.0;

    for (float i = 0.0; i < 13.0; i++) {
      float ringR     = (i + 1.0) * RING_SPACING;
      float halfBand  = RING_SPACING * 0.38;

      // Skip rings we can't possibly be inside
      float distToRing = abs(r - ringR);
      if (distToRing > halfBand * 1.6) continue;

      // ── Dots per ring: proportional to circumference so dot density is even
      float numDots = max(floor(TAU * ringR / (RING_SPACING * 0.72)), 5.0);

      // ── Each ring rotates; alternating rings swap direction → moiré magic
      float dir      = (mod(i, 2.0) < 1.0) ? 1.0 : -1.0;
      float speed    = 0.18 + i * 0.022;
      float rotation = dir * uTime * speed;

      // Angular position inside the ring's slot (0 … 1)
      float angSlot  = fract((theta / TAU + 0.5 + rotation) * numDots);

      // ── Pulse: ring index offset so adjacent rings are out-of-phase
      float phase    = i * 0.48 - uTime * 1.8;
      float pulse    = 0.5 + 0.5 * sin(phase);

      // ── 2-D elliptical SDF in (angular, radial) local space
      float dotAngR  = 0.22 + 0.14 * pulse;   // angular half-width  (0…1)
      float dotRadR  = 0.30 + 0.12 * pulse;   // radial  half-width  (0…1)

      float da = (angSlot - 0.5) / dotAngR;
      float dr = (distToRing / halfBand)  / dotRadR;
      float sd = length(vec2(da, dr));         // 1.0 = dot edge

      float mask = 1.0 - smoothstep(0.85, 1.05, sd);
      if (mask < 0.001) continue;

      // ── Hue: shifts across rings, spirals outward, evolves with time
      float hue = fract(
        i / RING_COUNT * 0.65    // spread across the colour wheel
        + r   * 0.28             // radial rainbow gradient
        + uTime * 0.085          // slow global drift
      );

      accumMask = max(accumMask, mask);
      // Weighted blend: brighter / more central dot wins the hue vote
      float wt   = mask * mask;
      accumHue  += hue * wt;
      accumWt   += wt;
    }

    // ── Final hue resolve ────────────────────────────────────────────────────
    float finalHue = (accumWt > 0.0) ? (accumHue / accumWt) : 0.0;

    // ── Dot colour: fully saturated, slight brightness pulse ─────────────────
    float bright   = 0.85 + 0.15 * sin(uTime * 2.1);
    vec3  dotColor = hsv2rgb(vec3(finalHue, 0.92, bright));

    // ── Background: near-black with a very slow complementary hue wash ───────
    float bgHue  = fract(finalHue + 0.5 + uTime * 0.04);
    vec3  bgBase = vec3(0.03, 0.02, 0.05);
    vec3  bgTint = hsv2rgb(vec3(bgHue, 0.55, 0.18));
    // Vignette: brighter near centre
    float vig  = 1.0 - smoothstep(0.0, 1.35, r);
    vec3  bg   = mix(bgBase, bgTint, vig * 0.45);

    // ── Soft additive glow ring around each dot ───────────────────────────────
    float glow = accumMask * 0.35;
    vec3  col  = mix(bg, dotColor, accumMask);
    col       += dotColor * glow * (1.0 - accumMask);

    gl_FragColor = vec4(col, 1.0);
  }
`

// ─── R3F scene ───────────────────────────────────────────────────────────────
export default function InspoShaderClaude() {
  const matRef = useRef()
  const { size, viewport } = useThree()

  // Stable uniforms object — never re-created
  const uniforms = useMemo(() => ({
    uTime:       { value: 0.0 },
    uResolution: { value: new THREE.Vector2(size.width, size.height) },
  }), []) // eslint-disable-line react-hooks/exhaustive-deps

  useFrame(({ clock }) => {
    uniforms.uTime.value = clock.getElapsedTime()
    uniforms.uResolution.value.set(size.width, size.height)
  })

  return (
    // 2×2 plane fills clip space exactly when the vertex shader ignores MVP
    <mesh>
      <planeGeometry args={[2, 2]} />
      <shaderMaterial
        ref={matRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        depthWrite={false}
        depthTest={false}
      />
    </mesh>
  )
}

// ─── Page component 