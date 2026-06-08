import React, { useState, useEffect } from 'react'

const TABS = [
  { id: 'catalogue',   icon: 'grid_view',     label: 'Catalogue' },
  { id: 'dressing',    icon: 'checkroom',     label: 'Dressing' },
  { id: 'creer',       icon: 'auto_awesome',  label: 'Créer' },
  { id: 'tenues',      icon: 'style',         label: 'Tenues' },
  { id: 'suggestions', icon: 'shopping_bag',  label: 'Idées' },
  { id: 'univers',     icon: 'person',        label: 'Univers' },
]

export default function MobileNav({ activePage, onNav }) {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 767)

  useEffect(() => {
    const handler = () => setIsMobile(window.innerWidth <= 767)
    window.addEventListener('resize', handler)
    return () => window.removeEventListener('resize', handler)
  }, [])

  if (!isMobile) return null

  return (
    <nav style={{
      position: 'fixed',
      bottom: 0,
      left: 0,
      right: 0,
      zIndex: 99999,
      height: '64px',
      background: 'rgba(8,8,15,0.97)',
      backdropFilter: 'blur(20px)',
      WebkitBackdropFilter: 'blur(20px)',
      borderTop: '1px solid rgba(255,255,255,0.07)',
      display: 'flex',
      justifyContent: 'space-around',
      alignItems: 'center',
      padding: '0 0.5rem',
    }}>
      {TABS.map(t => (
        <button
          key={t.id}
          onClick={() => onNav(t.id)}
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '2px',
            cursor: 'pointer',
            padding: '0.5rem 0.25rem',
            borderRadius: '0.5rem',
            flex: 1,
            color: activePage === t.id ? '#00F0FF' : '#8A87A0',
            background: 'transparent',
            border: 'none',
            fontFamily: '"Plus Jakarta Sans", sans-serif',
            transition: 'color 0.2s',
          }}
        >
          <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>{t.icon}</span>
          <span style={{ fontSize: '0.55rem', fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase' }}>
            {t.label}
          </span>
        </button>
      ))}
    </nav>
  )
}