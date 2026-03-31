import NewsCard from '../component/NewsCard'
import { portals } from '../data/portals'

export default function HomePage() {
  return (
    <main className="page">
      <header className="page-intro">
        <h1>News Portal Grid</h1>
        <p>Minimal dark homepage with animated news links.</p>
      </header>

      <section className="grid">
        {portals.map((portal) => (
          <NewsCard
            key={portal.name}
            name={portal.name}
            url={portal.url}
            image={portal.image}
          />
        ))}
      </section>
    </main>
  )
}