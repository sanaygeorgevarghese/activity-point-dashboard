import React, { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'

export default function Navbar() {
  const { student, logout } = useAuth()
  const navigate = useNavigate()
  const [open, setOpen] = useState(false)

  if (!student) return null

  function handleLogout() {
    logout()
    navigate('/login')
  }

  const linkClass = ({ isActive }) =>
    'nav-link' + (isActive ? ' nav-link-active' : '')

  return (
    <header className="navbar">
      <div className="navbar-inner">
        <div className="navbar-brand">
          <span className="navbar-logo">🎓</span>
          <span>Activity Points MS</span>
        </div>

        <button
          className="navbar-toggle"
          onClick={() => setOpen((o) => !o)}
          aria-label="Toggle navigation"
        >
          ☰
        </button>

        <nav className={'navbar-links' + (open ? ' navbar-links-open' : '')}>
          <NavLink to="/dashboard" className={linkClass} onClick={() => setOpen(false)}>
            Dashboard
          </NavLink>
          <NavLink to="/activities" className={linkClass} onClick={() => setOpen(false)}>
            Activities
          </NavLink>
          <NavLink to="/add-activity" className={linkClass} onClick={() => setOpen(false)}>
            Add Activity
          </NavLink>
          <NavLink to="/categories" className={linkClass} onClick={() => setOpen(false)}>
            Categories
          </NavLink>
          <NavLink to="/profile" className={linkClass} onClick={() => setOpen(false)}>
            Profile
          </NavLink>
          <button className="btn btn-logout" onClick={handleLogout}>
            Logout
          </button>
        </nav>
      </div>
    </header>
  )
}
