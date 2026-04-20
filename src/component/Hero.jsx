export default function Hero({
  title,
  caption,
  backgroundImage,
  eyebrow,
  className = '',
  minHeight = '80svh',
  children,
}) {
  const heroClassName = ['hero', className].filter(Boolean).join(' ')
  const style = {
    minHeight,
  }

  if (backgroundImage) {
    style.backgroundImage = `linear-gradient(180deg, rgba(5, 8, 13, 0.18) 0%, rgba(5, 8, 13, 0.42) 45%, rgba(5, 8, 13, 0.92) 100%), url("${backgroundImage}")`
  }

  return (
    <section className={heroClassName} style={style}>
      <div className="hero__inner">
        <div className="hero__content">
          {eyebrow ? <span className="hero__eyebrow">{eyebrow}</span> : null}
          <h1>{title}</h1>
          {caption ? <p>{caption}</p> : null}
          {children}
        </div>
      </div>
    </section>
  )
}
