import { useEffect, useRef, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { appRoutes } from '../data/routes'

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const headerRef = useRef(null)

  useEffect(() => {
    if (!menuOpen) {
      return undefined
    }

    function handlePointerDown(event) {
      if (headerRef.current?.contains(event.target)) {
        return
      }

      setMenuOpen(false)
    }

    function handleKeyDown(event) {
      if (event.key === 'Escape') {
        setMenuOpen(false)
      }
    }

    document.addEventListener('pointerdown', handlePointerDown)
    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.removeEventListener('pointerdown', handlePointerDown)
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [menuOpen])

  function handleToggle() {
    setMenuOpen((prev) => !prev)
  }

  function handleClose() {
    setMenuOpen(false)
  }

  return (
    <header ref={headerRef} className="site-header">
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
          {appRoutes
            .filter((route) => route.showInNav)
            .map((route) => (
              <NavLink
                key={route.path}
                to={route.path}
                end={route.path === '/'}
                className={({ isActive }) =>
                  `site-nav__link ${isActive ? 'is-active' : ''}`
                }
                onClick={handleClose}
              >
                {route.label}
              </NavLink>
            ))}
        </nav>
      </div>
    </header>
  )
}
