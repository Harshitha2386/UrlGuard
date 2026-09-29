import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { Menu, ShieldCheck, X } from 'lucide-react'

const navItems = [
  { label: 'Home', to: '/' },
  { label: 'Scan History', to: '/history' },
  { label: 'How It Works', to: '/how-it-works' },
  { label: 'About', to: '/about' },
]

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header className="topbar">
      <nav className="navbar container" aria-label="Main navigation">
        <Link to="/" className="brand" aria-label="URLGuard home">
          <span className="brand-icon"><ShieldCheck size={18} /></span>
          <span>URLGuard</span>
        </Link>

        <div className={`nav-links ${menuOpen ? 'open' : ''}`}>
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === '/'}
              className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
              onClick={() => setMenuOpen(false)}
            >
              {item.label}
            </NavLink>
          ))}
        </div>

        <div className="nav-status">
          <span className="status-dot" aria-hidden="true" />
          <span>System Ready</span>
        </div>

        <button
          type="button"
          className="menu-toggle"
          aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          onClick={() => setMenuOpen((prev) => !prev)}
        >
          {menuOpen ? <X size={18} /> : <Menu size={18} />}
        </button>
      </nav>
    </header>
  )
}
