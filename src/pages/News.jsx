import NewsCard from '../component/NewsCard'
import { portals } from '../data/portals'
import Hero from '../component/Hero'

export default function NewsPage() {
  return (
    <main className="">
            <Hero
              eyebrow="Latest"
              title="News Grid"
              caption="Get the latest news delivered to your feet"
              backgroundImage="/images/itsnice.jpg"
            />


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
