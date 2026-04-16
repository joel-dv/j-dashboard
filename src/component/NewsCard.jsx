export default function NewsCard({ name, url, image, description }) {
  return (
    <a className="card" loading="lazy" decoding="async" href={url} target="_blank" rel="noreferrer" aria-label="open">
      
      <div className="overlay" />
      <div className="content">
        <span className="tag">Portal</span>
        <h2>{name}</h2>
        <p>{description}</p>
      </div>
    </a>
  )
}