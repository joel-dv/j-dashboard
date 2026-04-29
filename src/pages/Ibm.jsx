const benefitSections = [
  {
    eyebrow: 'For startups',
    title: 'Launch faster with one command center for product, growth, and delivery',
    description:
      'Early teams need speed without losing operational clarity. Your dashboard gives founders, product leads, and marketers one place to track priorities, content, references, and execution signals.',
    points: [
      'Replace scattered links, docs, and visual references with a single structured workspace.',
      'Create a shared weekly rhythm for launch planning, campaign assets, and editorial updates.',
      'Reduce context switching so small teams can act faster with fewer handoffs.',
    ],
  },
  {
    eyebrow: 'For scale-up operations',
    title: 'Standardize reporting before complexity slows the team down',
    description:
      'As teams grow, the issue is rarely lack of data. It is inconsistent visibility. The dashboard creates a repeatable layer for reporting, content oversight, and design coordination.',
    points: [
      'Turn ad hoc updates into a consistent reporting surface with shared structure.',
      'Give product, brand, and operations teams a common view of what matters now.',
      'Make stakeholder reviews easier by keeping metrics, references, and status in one system.',
    ],
  },
  {
    eyebrow: 'For medium enterprises',
    title: 'Support cross-functional governance without making the experience feel heavy',
    description:
      'Medium-sized organizations need more rigor than a startup, but they still need interfaces people will actually use. This dashboard balances clarity, flexibility, and role-based usefulness.',
    points: [
      'Organize multiple streams of work without forcing every team into the same dense enterprise tool.',
      'Present curated signals and reference material in a format that is easy to scan during reviews.',
      'Create an operational layer that feels polished enough for leadership yet practical enough for daily contributors.',
    ],
  },
  {
    eyebrow: 'For leadership',
    title: 'Give decision-makers a cleaner line of sight into momentum, quality, and risk',
    description:
      'Executives do not need every detail. They need the right level of synthesis. The dashboard can surface signals, priorities, and changes in a way that shortens review cycles and improves decision quality.',
    points: [
      'Highlight the key initiatives, dependencies, and blockers that need attention this week.',
      'Make design, content, and delivery quality more visible without building extra slide decks.',
      'Improve confidence in planning because leadership sees the same source of truth as the delivery teams.',
    ],
  },
]

const featureTiles = [
  {
    label: 'Unified visibility',
    body: 'Bring references, metrics, priorities, and links into one carbon-clean working view.',
  },
  {
    label: 'Structured execution',
    body: 'Use consistent sections and surfaces so every team update follows the same logic.',
  },
  {
    label: 'Enterprise-ready clarity',
    body: 'Present information with strong hierarchy, minimal noise, and confident decision support.',
  },
]

const stats = [
  ['8px grid', 'Predictable spacing and alignment'],
  ['Single accent', 'Blue 60 keeps interactions disciplined'],
  ['4 benefit areas', 'Covers startup to medium-enterprise needs'],
]

export default function Ibm() {
  return (
    <main className="ibm-page">
      <section className="ibm-shell">
        <header className="ibm-masthead">
          <div className="ibm-masthead__brand">IBM</div>
          <nav className="ibm-masthead__nav" aria-label="Section navigation">
            <a href="#benefits">Benefits</a>
            <a href="#platform">Platform</a>
            <a href="#leaders">Leadership</a>
          </nav>
          <a className="ibm-masthead__cta" href="#contact">
            Request a demo
          </a>
        </header>

        <section className="ibm-hero">
          <div className="ibm-hero__content">
            <span className="ibm-kicker">Dashboard system</span>
            <h1>Operational clarity for startups and medium enterprises</h1>
            <p>
              Built in an IBM-inspired Carbon style, this page positions your dashboard
              as a structured operating surface for teams that need better visibility,
              stronger execution habits, and cleaner leadership reporting.
            </p>
            <div className="ibm-hero__actions">
              <a className="ibm-button ibm-button--primary" href="#benefits">
                Explore benefits
              </a>
              <a className="ibm-button ibm-button--ghost" href="#platform">
                See platform structure
              </a>
            </div>
          </div>

          <div className="ibm-hero__panel">
            <div className="ibm-code-card">
              <div className="ibm-code-card__header">Dashboard operational model</div>
              <pre className="ibm-code-card__content">
                <code>{`surface.startups = "speed + alignment"
surface.scaleups = "structure + reporting"
surface.sme = "governance + usability"
surface.leadership = "clarity + confidence"`}</code>
              </pre>
            </div>
          </div>
        </section>

        <section id="platform" className="ibm-band">
          <div className="ibm-section-heading">
            <span>Platform value</span>
            <h2>A calmer system for teams that have outgrown scattered workflows</h2>
            <p>
              The app can act as a practical layer between raw operational detail and
              executive visibility, giving teams one coherent place to coordinate.
            </p>
          </div>

          <div className="ibm-tile-grid">
            {featureTiles.map((tile) => (
              <article key={tile.label} className="ibm-tile">
                <h3>{tile.label}</h3>
                <p>{tile.body}</p>
              </article>
            ))}
          </div>
        </section>

        <section id="benefits" className="ibm-benefits">
          {benefitSections.map((section, index) => (
            <section
              key={section.title}
              className={`ibm-benefit ${index % 2 === 1 ? 'is-muted' : ''}`}
            >
              <div className="ibm-benefit__intro">
                <span>{section.eyebrow}</span>
                <h2>{section.title}</h2>
                <p>{section.description}</p>
              </div>

              <div className="ibm-benefit__list">
                {section.points.map((point) => (
                  <div key={point} className="ibm-point">
                    <strong>01</strong>
                    <p>{point}</p>
                  </div>
                ))}
              </div>
            </section>
          ))}
        </section>

        <section id="leaders" className="ibm-band ibm-band--tight">
          <div className="ibm-section-heading">
            <span>Leadership snapshot</span>
            <h2>Why this style works for enterprise-facing messaging</h2>
            <p>
              IBM-inspired visual language gives your dashboard proposition more
              credibility when the audience is operational leaders, transformation
              teams, and growing organizations evaluating internal tools.
            </p>
          </div>

          <div className="ibm-stats-grid">
            {stats.map(([value, label]) => (
              <article key={value} className="ibm-stat">
                <strong>{value}</strong>
                <span>{label}</span>
              </article>
            ))}
          </div>
        </section>

        <section id="contact" className="ibm-cta-band">
          <div className="ibm-cta-band__content">
            <span>Next step</span>
            <h2>Turn the dashboard into a system teams can adopt with confidence</h2>
            <p>
              The strongest next move is to connect this theme to real product
              screenshots, role-based workflows, and measurable outcomes for founders,
              operations leads, and department heads.
            </p>
          </div>
          <a className="ibm-button ibm-button--primary" href="mailto:hello@example.com">
            Contact sales
          </a>
        </section>
      </section>
    </main>
  )
}
