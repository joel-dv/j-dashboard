import Hero from '../component/Hero'

export default function About() {
  return (
    <main>
      <Hero
        eyebrow="Reusable section"
        title="About"
        caption="A full viewport hero with a background image, a strong title, and supporting copy you can reuse on any route."
        backgroundImage="/images/itsnice.jpg"
      />

      <section className="page">
        <section className="panel">
          <h2>About ready</h2>
          <p>
            Use this page as a starting point for new content, layouts, or
            experiments in your project.
          </p>
        </section>
      </section>
    </main>
  )
}
