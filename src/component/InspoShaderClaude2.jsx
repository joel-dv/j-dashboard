import { useMemo } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'

const vertexShader = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position.xy, 0.0, 1.0);
  }
`

const fragmentShader = /* glsl */ `
  uniform float uTime;
  uniform vec2  uResolution;
  varying vec2  vUv;

  #define PI  3.14159265358979
  #define TAU 6.28318530717959

  vec3 pal(float t) {
    return 0.5 + 0.5 * cos(TAU * (t + vec3(0.0, 0.333, 0.667)));
  }

  vec3 palHot(float t) {
    return 0.5 + 0.5 * cos(TAU * (vec3(t * 1.6, t, t * 0.4) + vec3(0.9, 0.35, 0.05)));
  }

  vec2 rot2(vec2 p, float a) {
    float s = sin(a), c = cos(a);
    return vec2(c*p.x - s*p.y, s*p.x + c*p.y);
  }

  float hexDist(vec2 p) {
    vec2 r = vec2(1.0, 1.7320508);
    vec2 h = r * 0.5;
    vec2 a = mod(p, r) - h;
    vec2 b = mod(p - h, r) - h;
    return length(dot(a, a) < dot(b, b) ? a : b);
  }

  float hexDot(vec2 p, float scale, float rad) {
    float d = hexDist(p * scale);
    return smoothstep(rad + 0.027, rad - 0.027, d);
  }

  vec2 warp(vec2 p, float t) {
    vec2 d1 = vec2(
      sin(1.30 * p.y + t * 0.60) * 0.175 + sin(2.40 * p.x - t * 0.40) * 0.070,
      cos(1.30 * p.x + t * 0.50) * 0.175 + cos(2.40 * p.y + t * 0.55) * 0.070
    );
    vec2 p2 = p + d1;
    return p2 + 0.042 * vec2(
      sin(3.8 * p2.y - t * 1.20),
      cos(3.8 * p2.x + t * 0.95)
    );
  }

  vec2 kaleido(vec2 uv, float n) {
    float r  = length(uv);
    float th = atan(uv.y, uv.x);
    float s  = TAU / n;
    th = mod(th, s);
    th = min(th, s - th);
    return vec2(cos(th), sin(th)) * r;
  }

  vec2 spiralNudge(vec2 p, float t) {
    float r = length(p);
    float ang = atan(p.y, p.x) + r * 1.8 - t * 0.25;
    return p + vec2(cos(ang), sin(ang)) * 0.055 * smoothstep(0.0, 1.5, r);
  }

  void main() {
    vec2 uv = (vUv - 0.5) * 2.0;
    uv.x *= uResolution.x / uResolution.y;
    float t = uTime;

    float rRef  = length(uv);
    float thRef = atan(uv.y, uv.x);

    float zoom = 1.0 + 0.06 * sin(t * 0.37) + 0.02 * sin(t * 0.91 + 1.2);
    uv *= zoom;

    vec2 kUV = kaleido(uv, 6.0);
    vec2 rUV = rot2(kUV, t * 0.055);
    vec2 sUV = spiralNudge(rUV, t);
    vec2 wUV = warp(sUV, t);

    float s1 = 3.20 + 0.28 * sin(t * 0.27);
    float s2 = 5.55 + 0.38 * sin(t * 0.20 + 1.05);
    float s3 = 9.10 + 0.50 * sin(t * 0.16 + 2.20);

    float r1 = 0.30 + 0.10 * sin(t * 1.55);
    float r2 = 0.22 + 0.07 * sin(t * 1.90 + 1.40);
    float r3 = 0.17 + 0.05 * sin(t * 2.40 + 2.70);

    float ca  = 0.0080;
    vec2  caV = normalize(uv + 1e-5) * ca;

    float dR = max(max(
      hexDot(wUV + caV * s1, s1, r1),
      hexDot(wUV + caV * s2, s2, r2)),
      hexDot(wUV + caV * s3, s3, r3));

    float mG1 = hexDot(wUV, s1, r1);
    float mG2 = hexDot(wUV, s2, r2);
    float mG3 = hexDot(wUV, s3, r3);
    float dG  = max(max(mG1, mG2), mG3);

    float dB = max(max(
      hexDot(wUV - caV * s1, s1, r1),
      hexDot(wUV - caV * s2, s2, r2)),
      hexDot(wUV - caV * s3, s3, r3));

    float iRaw  = mG1 * mG2 + mG2 * mG3 + mG1 * mG3;
    float iMask = clamp(iRaw * 1.6, 0.0, 1.0);

    float g1   = hexDot(wUV, s1, r1 + 0.16) * 0.40;
    float g2   = hexDot(wUV, s2, r2 + 0.12) * 0.30;
    float g3   = hexDot(wUV, s3, r3 + 0.09) * 0.22;
    float glow = max(max(g1, g2), g3) * (1.0 - dG);
    float halo = hexDot(wUV, s1, r1 + 0.35) * 0.18 * (1.0 - dG);

    float hue  = rRef * 0.38 + thRef / TAU * 0.5 + t * 0.062;
    vec3  dotC = pal(hue);
    vec3  ifC  = palHot(hue + 0.40);
    vec3  glwC = pal(hue - 0.15);

    float bgHex = hexDot(rot2(wUV, PI / 11.0), 1.75, 0.42);
    vec3  bg    = vec3(0.018, 0.009, 0.038)
                + pal(hue + 0.50) * 0.060 * bgHex;

    vec3 col;
    col.r = mix(bg.r, dotC.r, dR) + ifC.r * iMask * 0.60 + glwC.r * glow + glwC.r * halo;
    col.g = mix(bg.g, dotC.g, dG) + ifC.g * iMask * 0.60 + glwC.g * glow + glwC.g * halo;
    col.b = mix(bg.b, dotC.b, dB) + ifC.b * iMask * 0.60 + glwC.b * glow + glwC.b * halo;

    float vig       = 1.0 - smoothstep(0.30, 1.35, rRef) * 0.70;
    float spotlight = 1.0 + 0.12 * (1.0 - smoothstep(0.0, 0.25, rRef));
    col *= vig * spotlight;

    col = col / (col + 0.72);
    col = pow(col, vec3(0.855));

    gl_FragColor = vec4(col, 1.0);
  }
`

export default function InspoShaderClaude2() {
  const { size } = useThree()

  const uniforms = useMemo(() => ({
    uTime:       { value: 0.0 },
    uResolution: { value: new THREE.Vector2(size.width, size.height) },
  }), []) // eslint-disable-line react-hooks/exhaustive-deps

  useFrame(({ clock }) => {
    uniforms.uTime.value = clock.getElapsedTime()
    uniforms.uResolution.value.set(size.width, size.height)
  })

  return (
    <mesh>
      <planeGeometry args={[2, 2]} />
      <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        depthWrite={false}
        depthTest={false}
      />
    </mesh>
  )
}