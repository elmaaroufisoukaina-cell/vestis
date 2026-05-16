import React from 'react'

const TABS = [
  { id: 'catalogue',   icon: 'grid_view',     label: 'Catalogue' },
  { id: 'dressing',    icon: 'checkroom',     label: 'Dressing' },
  { id: 'creer',       icon: 'auto_awesome',  label: 'Créer' },
  { id: 'tenues',      icon: 'style',         label: 'Tenues' },
  { id: 'suggestions', icon: 'shopping_bag',  label: 'Idées' },
  { id: 'univers',     icon: 'person',        label: 'Univers' },
]

export default function MobileNav({ activePage, onNav }) {
  return (
    <nav className="mobile-nav">
      {TABS.map(t => (
        <button
          key={t.id}
          className={`mob-tab${activePage === t.id ? ' active' : ''}`}
          onClick={() => onNav(t.id)}
        >
          <span className="material-symbols-outlined">{t.icon}</span>
          <span className="mob-label">{t.label}</span>
        </button>
      ))}
    </nav>
  )
}