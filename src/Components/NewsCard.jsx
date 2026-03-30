export default function NewsCard({ name, url, image }) {
  return (
    <a className="card" href={url} target="_blank" rel="noreferrer">
      <img src={image} alt={name} />
      <div className="overlay" />
      <div className="content">
        <span className="tag">Portal</span>
        <h2>{name}</h2>
        <p>Open site</p>
      </div>
    </a>
  )
}