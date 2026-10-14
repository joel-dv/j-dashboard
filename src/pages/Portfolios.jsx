import { portfolios } from '../data/portfolios'
import NewsCard from '../component/NewsCard'

export default function Portfolios() {
  return (
    <main className="page">
      <header className="page-intro">
        <h1>Portfolios</h1>
        <p>A new page generated for your dashboard.</p>
      </header>

      <section className="page grid">
        {portfolios.map((portfolio) => (
          <NewsCard
            key={portfolio.id}
            name={portfolio.name}
            url={portfolio.url}
            image={portfolio.image}
            description={portfolio.description}
          />
        ))}
      </section>
    </main>
  )
}
