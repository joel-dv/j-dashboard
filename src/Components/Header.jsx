import { useState } from 'react'
import { NavLink } from 'react-router'

const navItems = [
  { label: 'Main page', to: '/' },
  { label: 'Inspo page', to: '/inspo' },
]

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)

  function handleToggle() {
    setMenuOpen((prev) => !prev)
  }

  function handleClose() {
    setMenuOpen(false)
  }

  return (
    <header className="site-header">
      <div className="site-header__inner">
        <NavLink to="/" className="site-logo" onClick={handleClose}>
          News Grid
        </NavLink>

        <button
          type="button"
          className={`menu-toggle ${menuOpen ? 'is-open' : ''}`}
          aria-label="Toggle navigation menu"
          aria-expanded={menuOpen}
          aria-controls="site-nav"
          onClick={handleToggle}
        >
          <span />
          <span />
          <span />
        </button>

        <nav
          id="site-nav"
          className={`site-nav ${menuOpen ? 'is-open' : ''}`}
        >
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === '/'}
              className={({ isActive }) =>
                `site-nav__link ${isActive ? 'is-active' : ''}`
              }
              onClick={handleClose}
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
      </div>
    </header>
  )
}