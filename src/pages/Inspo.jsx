import InspoShader from '../component/InspoShader'

export default function Inspo() {
  return (
    <main className="page">
      <header className="page-intro">
        <h1>Inspo</h1>
        <p>Wild things</p>
      </header>
      <section className="panel" aria-label="Animated visual study">
        <div
          style={{
            position: 'relative',
            width: '100%',
            height: '70svh',
            minHeight: '320px',
            borderRadius: 'var(--radius-md)',
            background: '#080610',
            overflow: 'hidden',
          }}
        >
          <InspoShader />
        </div>
      </section>
    </main>
  )
}
