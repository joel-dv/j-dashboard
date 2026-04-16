import NewsCard from '../component/NewsCard'
import { portals } from '../data/portals'

export default function NewsPage() {
  return (
    <main className="page">
      <header className="page-intro">
        <h1>News Portal Grid</h1>
        <p>A curated grid of design, branding, motion, and typography links.</p>
      </header>

      <section className="grid">
        {portals.map((portal) => (
          <NewsCard
            key={portal.id}
            name={portal.name}
            url={portal.url}
            image={portal.image}
            description={portal.description}
          />
        ))}
      </section>
    </main>
  )
}
