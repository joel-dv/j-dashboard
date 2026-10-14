import { useState } from 'react'
import { Link } from 'react-router-dom'
import { portals } from '../data/portals'
import { tools } from '../data/tools'
import { portfolios } from '../data/portfolios'

const collections = [
  { name: 'Design news', to: '/news', items: portals, description: 'News and inspo from the creative world' },
  { name: 'Creative tools', to: '/tools', items: [...new Map(tools.map((tool) => [tool.url, tool])).values()], description: 'Typefaces, assets, images, and other tools' },
  { name: 'Portfolios', to: '/portfolios', items: portfolios, description: 'Studios and designers' },
]

const resources = collections.flatMap((collection) =>
  collection.items.map((item) => ({ ...item, category: collection.name }))
)

function Arrow({ external = false }) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {external ? <path d="M7 17 17 7M7 7h10v10" /> : <path d="M5 12h14m-6-6 6 6-6 6" />}
    </svg>
  )
}

export default function Home() {
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState('All')
  const [showAll, setShowAll] = useState(false)
  const search = query.trim().toLowerCase()
  const filteredResources = resources.filter((resource) =>
    (category === 'All' || resource.category === category) &&
    `${resource.name} ${resource.description} ${resource.category}`.toLowerCase().includes(search)
  )
  const visibleResources = showAll || search || category !== 'All'
    ? filteredResources
    : filteredResources.slice(0, 6)

  return (
    <main className="page dashboard">
      <header className="dashboard__intro">
        <div className="page-intro">
          <span className="dashboard__eyebrow"></span>
          <h1>J-Dashboard</h1>
          <p></p>
        </div>
        <Link className="dashboard-button" to="/news">Explore design news <Arrow /></Link>
      </header>

      <section className="dashboard__collections" aria-label="Your collections">
        {collections.map((collection, index) => (
          <Link className="panel dashboard-collection" key={collection.to} to={collection.to}>
            <div className="dashboard-collection__top">
              <span className="dashboard__eyebrow">Collection / 0{index + 1}</span>
              <Arrow />
            </div>
            <span className="dashboard-collection__count">{collection.items.length.toString().padStart(2, '0')}</span>
            <h2>{collection.name}</h2>
            <p>{collection.description}</p>
          </Link>
        ))}
      </section>

      <div className="dashboard__workspace">
        <section className="panel dashboard-library" aria-labelledby="resource-heading">
          <div className="dashboard__section-heading">
            <div>
              <span className="dashboard__eyebrow">Section widget</span>
              <h2 id="resource-heading">Resource library</h2>
            </div>
            <span className="dashboard__meta">{resources.length} links</span>
          </div>

          <label className="dashboard-search">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
              <circle cx="10.5" cy="10.5" r="6.5" /><path d="m16 16 5 5" />
            </svg>
            <span className="dashboard__sr-only">Search resources</span>
            <input type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search news, tools, and portfolios…" />
          </label>

          <div className="dashboard__filters" role="group" aria-label="Filter resources by collection">
            {['All', ...collections.map((collection) => collection.name)].map((name) => (
              <button className={`dashboard-button${category === name ? ' is-active' : ''}`} type="button" key={name} aria-pressed={category === name} onClick={() => setCategory(name)}>{name}</button>
            ))}
          </div>

          <p className="dashboard__result-count" role="status">Showing {visibleResources.length} of {filteredResources.length} links</p>
          <div className="dashboard__resources">
            {visibleResources.map((resource) => (
              <a className="dashboard-resource" key={`${resource.category}-${resource.url}`} href={resource.url} target="_blank" rel="noreferrer">
                <span className="dashboard-resource__initial" aria-hidden="true">{resource.name.slice(0, 1).toUpperCase()}</span>
                <span className="dashboard-resource__body">
                  <span className="dashboard-resource__name">{resource.name}</span>
                  <span className="dashboard-resource__description">{resource.description || new URL(resource.url).hostname.replace(/^www\./, '')}</span>
                  <span className="dashboard-resource__category">{resource.category}</span>
                </span>
                <span className="dashboard-resource__arrow"><Arrow external /></span>
                <span className="dashboard__sr-only"> (opens in a new tab)</span>
              </a>
            ))}
          </div>

          {filteredResources.length === 0 && (
            <div className="dashboard__empty">
              <h3>No matching resources</h3>
              <p>Try a different search or explore another collection.</p>
              <button className="dashboard-button" type="button" onClick={() => { setQuery(''); setCategory('All'); setShowAll(false) }}>Reset filters</button>
            </div>
          )}
          {!search && category === 'All' && filteredResources.length > 6 && (
            <button className="dashboard-button dashboard-library__more" type="button" onClick={() => setShowAll((previous) => !previous)}>{showAll ? 'Show fewer links' : 'View all resources'} <Arrow /></button>
          )}
        </section>

        <aside className="dashboard__aside" aria-label="More to explore">
          <section className="panel dashboard-shortcuts">
            <span className="dashboard__eyebrow">Links widget</span>
            <h2>Quick links</h2>
            {collections.map((collection) => (
              <Link className="dashboard-shortcut" to={collection.to} key={collection.to}><span>{collection.name}</span><Arrow /></Link>
            ))}
            <Link className="dashboard-shortcut" to="/about"><span>About this project</span><Arrow /></Link>
          </section>

          <section className="panel dashboard-studies">
            <div className="dashboard-studies__art" aria-hidden="true"><span /><span /><span /><span /><span /></div>
            <span className="dashboard__eyebrow">Experiments</span>
            <h2>Step out</h2>
            <p>Visual study of the day</p>
            <Link className="dashboard-button" to="/inspo">Open inspiration <Arrow /></Link>
          </section>
        </aside>
      </div>
    </main>
  )
}
