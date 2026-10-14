import { portfolios } from '../data/portfolios'
import NewsCard from '../component/NewsCard'

export default function Portfolios() {
  return (
    <main className="page">
      <header className="page-intro">
        <h1>Portfolios</h1>
        <p>Portfolios of recommended designers</p>
      </header>

      <section className="grid">
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
