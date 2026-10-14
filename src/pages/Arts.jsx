import NewsCard from '../component/NewsCard'
import { portals } from '../data/portals'
import Hero from '../component/Hero'

export default function ArtsPage() {
  return (
    <main className="">
            <Hero
              eyebrow="Latest"
              title="Arts & Fashion News"
              caption="Get the latest news delivered to your feet"
              backgroundImage="/images/bgnews.jpg"
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
