import NewsCard from '../component/NewsCard'
import { tools } from '../data/tools'

export default function ToolsPage() {
  return (
    <main className="page">
      <header className="page-intro">
        <h1>Tools Portal Grid</h1>
        <p>A curated grid of design, branding, motion, and typography links.</p>
      </header>

      <section className="grid">
        {tools.map((tool) => (
          <NewsCard
            key={tool.id}
            name={tool.name}
            url={tool.url}
            image={tool.image}
            description={tool.description}
          />
        ))}
      </section>
    </main>
  )
}
