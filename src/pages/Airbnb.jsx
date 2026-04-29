const productTabs = [
  { name: 'Homes', icon: 'H', active: true },
  { name: 'Experiences', icon: 'E', active: false, badge: 'New' },
  { name: 'Services', icon: 'S', active: false, badge: 'New' },
]

const stays = [
  {
    title: 'Clifftop guesthouse in Madeira',
    meta: 'Ocean views · 2 nights · Superhost',
    price: '$420 night',
    image: '/images/bgnews2.jpg',
  },
  {
    title: 'Design cabin with cedar sauna',
    meta: 'Forest stay · 4 guests · Guest favorite',
    price: '$315 night',
    image: '/images/bgnews.jpg',
  },
  {
    title: 'Editorial loft near the old town',
    meta: 'City break · Walkable core · Rare find',
    price: '$280 night',
    image: '/images/itsnice.jpg',
  },
]

const offers = [
  'Lake access',
  'Dedicated workspace',
  'Indoor fireplace',
  'Chef kitchen',
  'Fast wifi',
  'Airport pickup',
]

const cityLinks = [
  ['Barcelona', 'Apartment rentals'],
  ['Porto', 'Design stay inspiration'],
  ['Tulum', 'Beach house rentals'],
  ['Milan', 'Fashion week stays'],
  ['Kyoto', 'Garden homes'],
  ['Copenhagen', 'Cabin rentals'],
  ['Marrakesh', 'Riads and courtyards'],
  ['Reykjavik', 'Northern escapes'],
]

const rules = [
  {
    title: 'House rules',
    body: 'Check-in after 4:00 PM. No parties, pets on request, quiet hours after 10:00 PM.',
  },
  {
    title: 'Safety and property',
    body: 'Carbon monoxide alarm, lakefront stairs, and optional concierge arrival support.',
  },
  {
    title: 'Cancellation policy',
    body: 'Free cancellation for 48 hours. Partial refund available up to 7 days before arrival.',
  },
]

export default function Airbnb() {
  return (
    <main className="airbnb-page">
      <section className="airbnb-shell">
        <header className="airbnb-topbar">
          <div className="airbnb-wordmark">airbnb</div>
          <nav className="airbnb-product-tabs" aria-label="Product categories">
            {productTabs.map((tab) => (
              <button
                key={tab.name}
                type="button"
                className={`airbnb-product-tab ${tab.active ? 'is-active' : ''}`}
              >
                <span className="airbnb-product-tab__icon">{tab.icon}</span>
                <span className="airbnb-product-tab__label">{tab.name}</span>
                {tab.badge ? (
                  <span className="airbnb-product-tab__badge">{tab.badge}</span>
                ) : null}
              </button>
            ))}
          </nav>
          <div className="airbnb-topbar__actions">
            <a href="#inspiration">Inspiration</a>
            <button type="button" className="airbnb-icon-button">
              Menu
            </button>
          </div>
        </header>

        <section className="airbnb-search">
          <div className="airbnb-search__segment">
            <span className="airbnb-search__label">Where</span>
            <span className="airbnb-search__value">Search destinations</span>
          </div>
          <div className="airbnb-search__segment">
            <span className="airbnb-search__label">When</span>
            <span className="airbnb-search__value">Add dates</span>
          </div>
          <div className="airbnb-search__segment">
            <span className="airbnb-search__label">Who</span>
            <span className="airbnb-search__value">Add guests</span>
          </div>
          <button type="button" className="airbnb-search__button">
            Search
          </button>
        </section>

        <section className="airbnb-hero">
          <div className="airbnb-hero__content">
            <span className="airbnb-kicker">Airbnb design study</span>
            <h1>Magazine-like travel UI with one unmistakable coral accent</h1>
            <p>
              This page translates your `DESIGN.md` notes into a working theme:
              bright white canvas, 4:3 photography, hairline dividers, circular
              controls, sticky booking chrome, and restrained use of Rausch.
            </p>
            <div className="airbnb-hero__actions">
              <a href="#stays" className="airbnb-button airbnb-button--primary">
                Explore stays
              </a>
              <a href="#details" className="airbnb-button airbnb-button--secondary">
                See detail pattern
              </a>
            </div>
          </div>

          <div className="airbnb-hero__media">
            <div className="airbnb-photo-grid">
              <div
                className="airbnb-photo-grid__primary"
                style={{ backgroundImage: 'url("/images/bgnews2.jpg")' }}
              />
              <div
                className="airbnb-photo-grid__secondary"
                style={{ backgroundImage: 'url("/images/bgnews.jpg")' }}
              />
              <div
                className="airbnb-photo-grid__secondary"
                style={{ backgroundImage: 'url("/images/itsnice.jpg")' }}
              />
            </div>
          </div>
        </section>

        <section id="stays" className="airbnb-section">
          <div className="airbnb-section__header">
            <h2>Inspiration for future getaways</h2>
            <p>Large image-led listing cards with almost no chrome.</p>
          </div>

          <div className="airbnb-stay-grid">
            {stays.map((stay) => (
              <article key={stay.title} className="airbnb-stay-card">
                <div
                  className="airbnb-stay-card__image"
                  style={{ backgroundImage: `url("${stay.image}")` }}
                >
                  <button type="button" className="airbnb-icon-button airbnb-icon-button--heart">
                    Save
                  </button>
                </div>
                <div className="airbnb-stay-card__body">
                  <h3>{stay.title}</h3>
                  <p>{stay.meta}</p>
                  <strong>{stay.price}</strong>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="details" className="airbnb-section airbnb-detail-layout">
          <div className="airbnb-detail-main">
            <div className="airbnb-section__header">
              <h2>Listing detail rhythm</h2>
              <p>Full-bleed image lead, amenity list, rating lockup, and calm disclosure blocks.</p>
            </div>

            <section className="airbnb-award">
              <div className="airbnb-award__score">4.81</div>
              <div className="airbnb-award__meta">
                <strong>Guest favorite</strong>
                <span>One of the most loved homes on Airbnb, based on ratings, reviews, and reliability.</span>
              </div>
            </section>

            <section className="airbnb-amenities">
              <h3>What this place offers</h3>
              <div className="airbnb-amenities__grid">
                {offers.map((offer) => (
                  <div key={offer} className="airbnb-amenity">
                    <span className="airbnb-amenity__icon" aria-hidden="true">
                      +
                    </span>
                    <span>{offer}</span>
                  </div>
                ))}
              </div>
            </section>

            <section id="inspiration" className="airbnb-inspiration">
              <h3>Inspiration for future getaways</h3>
              <div className="airbnb-city-grid">
                {cityLinks.map(([city, label]) => (
                  <a key={city} className="airbnb-city-link" href="#top">
                    <strong>{city}</strong>
                    <span>{label}</span>
                  </a>
                ))}
              </div>
            </section>

            <section className="airbnb-rules">
              {rules.map((rule) => (
                <article key={rule.title} className="airbnb-rule-card">
                  <h4>{rule.title}</h4>
                  <p>{rule.body}</p>
                  <a href="#top">Show more</a>
                </article>
              ))}
            </section>
          </div>

          <aside className="airbnb-booking-card">
            <div className="airbnb-booking-card__price">
              <strong>$520</strong>
              <span>night</span>
            </div>

            <div className="airbnb-booking-card__field">
              <span>Dates</span>
              <strong>May 16 - 20</strong>
            </div>
            <div className="airbnb-booking-card__field">
              <span>Guests</span>
              <strong>2 guests</strong>
            </div>

            <button type="button" className="airbnb-button airbnb-button--primary airbnb-button--block">
              Reserve
            </button>
            <p className="airbnb-booking-card__footnote">You won&apos;t be charged yet</p>
          </aside>
        </section>
      </section>
    </main>
  )
}
