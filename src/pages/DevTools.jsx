import NewsCard from '../component/NewsCard'
import { portals } from '../data/devtools'
import Hero from '../component/Hero'

export default function DevTools() {
  return (
    <main className="">
            <Hero
              eyebrow="Latest"
              title="Main Dev Tools 2026"
              caption="Get the latest news delivered to your feet"
              backgroundImage="/images/bgnews2.jpg"
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
