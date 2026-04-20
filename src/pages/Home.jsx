import { Link } from 'react-router-dom'
import { lazy, Suspense } from 'react'

const shaderVariants = {
  dotGrid: lazy(() => import('../component/InspoDotGridShader')),
  line: lazy(() => import('../component/InspoLineShader')),
  color: lazy(() => import('../component/InspoShader')),
  p5: lazy(() => import('../component/InspoLineP5')),
  rectangles: lazy(() => import('../component/InspoRectangles.jsx')),
}

// Swap the key here if you want to preview another study.
const ActiveShader = shaderVariants.rectangles

const inspoLinks = [
  {
    title: 'News page',
    to: '/news',
    description:
      'Jump back to the dashboard grid to browse your saved design and typography portals.',
  },
  {
    title: 'About page',
    to: '/about',
    description:
      'Open the about section to turn it into a project note, manifesto, or process page.',
  },
]

export default function Inspo() {
  return (
    <main className="inspo-page">
      <section className="inspo-page__hero">
        <div className="inspo-page__shader">
           <Suspense fallback={<div className="inspo-page__shader-fallback" />}>
            <ActiveShader />
          </Suspense>
        </div>

        <div className="inspo-page__content">
          <span className="inspo-page__eyebrow">Generative study</span>
          <h1>A simple dashboard with style</h1>
          <p>
            A restrained fullscreen dot grid that gently contracts around your
            cursor, then eases back into place as the motion clears.
          </p>
        </div>
      </section>

      <section className="inspo-links">
        <div className="inspo-links__intro">
          <span className="inspo-links__kicker">Continue exploring</span>
          <h2>Two places to land next</h2>
          <p>
            These quick links keep the psychedelic hero intact while giving the
            page some useful onward navigation.
          </p>
        </div>

        <div className="inspo-links__grid">
          {inspoLinks.map((link) => (
            <Link key={link.to} to={link.to} className="inspo-link-card">
              <span className="inspo-link-card__tag">Internal page</span>
              <h3>{link.title}</h3>
              <p>{link.description}</p>
            </Link>
          ))}
        </div>
      </section>
    </main>
  )
}
