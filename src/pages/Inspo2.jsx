import { Canvas } from '@react-three/fiber'
import InspoShaderClaude from '../component/InspoShaderClaude'

export default function Inspo2() {
  return (
    <main className="page">
      <header className="page-intro">
        <h1>Inspo2</h1>
        <p>A new page generated for your dashboard.</p>
      </header>
    <section className="panel">
    <div
      style={{
        position: 'fixed',
        inset: 0,
        width: '100vw',
        height: '100vh',
        background: '#080610',  // shown for the single frame before WebGL starts
        overflow: 'hidden',
      }}
    >
      <Canvas
        // Orthographic + no camera transforms — the vertex shader handles it all
        orthographic
        camera={{ zoom: 1, position: [0, 0, 1], near: 0, far: 2 }}
        gl={{
          antialias: true,
          alpha: false,
          powerPreference: 'high-performance',
        }}
        style={{ width: '100%', height: '100%' }}
        dpr={[1, 2]}
      >
        <InspoShaderClaude />
      </Canvas>
    </div>
    </section>
    </main>
  )
}
