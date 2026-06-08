import React from 'react'

const TABS = [
  { id: 'catalogue',   label: 'Catalogue' },
  { id: 'dressing',    label: 'Dressing' },
  { id: 'creer',       label: 'Créer' },
  { id: 'tenues',      label: 'Tenues' },
  { id: 'suggestions', label: 'Suggestions' },
  { id: 'univers',     label: 'Mon Univers' },
]

export default function Navbar({ activePage, onNav }) {
  return (
    <nav className="main-nav">
      <div className="nav-inner">
        <div className="nav-logo cyber-text">VESTIS</div>

        {/* Desktop tabs — hidden via CSS on mobile */}
        <div className="nav-tabs">
          {TABS.map(t => (
            <button
              key={t.id}
              className={`nav-tab${activePage === t.id ? ' active' : ''}`}
              onClick={() => onNav(t.id)}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* Desktop-only actions — hidden on mobile via CSS */}
        <div className="nav-actions">
          <span
            className="material-symbols-outlined"
            style={{ color: '#8A87A0', cursor: 'pointer', transition: 'color 0.2s' }}
          >
            search
          </span>
          <span
            className="material-symbols-outlined"
            style={{ color: '#8A87A0', cursor: 'pointer', transition: 'color 0.2s' }}
            onClick={() => onNav('univers')}
          >
            account_circle
          </span>
        </div>
      </div>
    </nav>
  )
}