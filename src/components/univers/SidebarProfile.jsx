// src/components/univers/SidebarProfile.jsx
import React from 'react';
import { useStore } from '../../hooks/useStore';

export default function SidebarProfile({ onEditProfil }) {
  const { garments, outfits, profil } = useStore();

  // Extraction des données avec forçage de l'avatar sur profil.jpeg
  const name = profil?.name || 'Moi';
  const handle = profil?.handle || '@VESTIS_USER';
  const bio = profil?.bio || 'Passionnée de mode & style unique. Capsule wardrobe · pièces intemporelles.';
  const email = profil?.email || 'user@vestis.app';
  
  // FIX : On force l'image locale profil.jpeg
  const avatar = '/profil.jpeg'; 

  return (
    <aside
      style={{
        background: '#111118',
        borderRight: '1px solid rgba(255,255,255,0.07)',
        padding: '22px 16px',
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
        minHeight: 'calc(100vh - 64px)',
      }}
    >
      {/* ── SECTION PROFIL (AVATAR FIXÉ) ────────────────────────────────────── */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '11px', padding: '6px 0' }}>
        <div
          style={{
            width: '62px',
            height: '62px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #00F0FF, #C084FC, #FF6B9D)',
            padding: '2.5px',
            flexShrink: 0,
          }}
        >
          <div
            style={{
              background: '#111118',
              borderRadius: '50%',
              padding: '2px',
              width: '100%',
              height: '100%',
            }}
          >
            {/* Affichage de la photo profil.jpeg */}
            <img
              src={avatar}
              alt="Mon profil"
              style={{ 
                width: '100%', 
                height: '100%', 
                borderRadius: '50%', 
                objectFit: 'cover', 
                display: 'block' 
              }}
              onError={(e) => {
                // Fallback si l'image est manquante dans public/
                e.target.style.display = 'none';
                e.target.parentNode.style.background = 'linear-gradient(135deg, #00F0FF, #C084FC)';
                e.target.parentNode.innerText = name.charAt(0).toUpperCase();
                e.target.parentNode.style.display = 'flex';
                e.target.parentNode.style.alignItems = 'center';
                e.target.parentNode.style.justifyContent = 'center';
                e.target.parentNode.style.color = '#08080F';
                e.target.parentNode.style.fontWeight = '800';
              }}
            />
          </div>
        </div>

        <div>
          <div style={{ fontSize: '.95rem', fontWeight: 700, color: '#E4E1EA' }}>{name}</div>
          <div style={{ fontSize: '.62rem', color: '#8A87A0', letterSpacing: '.08em', textTransform: 'uppercase', marginTop: '2px' }}>
            {handle}
          </div>
        </div>
      </div>

      {/* ── BIO ──────────────────────────────────────────────────────────── */}
      <div style={{ fontSize: '.68rem', color: '#8A87A0', lineHeight: 1.55 }}>
        {bio}
      </div>

      {/* ── STATISTIQUES ─────────────────────────────────────────────────── */}
      <div
        style={{
          display: 'flex',
          border: '1px solid rgba(255,255,255,0.07)',
          borderRadius: '9px',
          overflow: 'hidden',
        }}
      >
        {[
          { num: garments?.length ?? 12, label: 'Pièces', grad: 'linear-gradient(135deg, #00F0FF, #C084FC)' },
          { num: outfits?.length ?? 5, label: 'Tenues', grad: 'linear-gradient(135deg, #C084FC, #7C3AED)' },
          { num: 124, label: 'Abonnés', grad: 'linear-gradient(135deg, #FF6B9D, #FF9A8B)' },
        ].map((s, idx) => (
          <div
            key={s.label}
            style={{
              flex: 1,
              textAlign: 'center',
              padding: '9px 4px',
              borderRight: idx !== 2 ? '1px solid rgba(255,255,255,0.07)' : 'none',
              background: 'rgba(255,255,255,0.015)',
            }}
          >
            <div
              style={{
                fontSize: '.95rem',
                fontWeight: 800,
                background: s.grad,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              {s.num}
            </div>
            <div style={{ fontSize: '.5rem', color: '#8A87A0', letterSpacing: '.1em', textTransform: 'uppercase', marginTop: '1px' }}>
              {s.label}
            </div>
          </div>
        ))}
      </div>

      {/* ── PRÉFÉRENCES ──────────────────────────────────────────────────── */}
      <div style={{ marginTop: '10px' }}>
        <div style={{ fontSize: '.56rem', fontWeight: 700, letterSpacing: '.12em', textTransform: 'uppercase', color: '#8A87A0', marginBottom: '7px' }}>
          Préférences
        </div>
        {[
          { label: 'Notifications', sub: 'Alertes tenues', defaultChecked: true },
          { label: 'Profil public', sub: 'Visible dans Découvrir', defaultChecked: true },
        ].map((pref) => (
          <div
            key={pref.label}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '6px 0',
              borderBottom: '1px solid rgba(255,255,255,0.04)',
            }}
          >
            <div>
              <div style={{ fontSize: '.68rem', color: '#E4E1EA' }}>{pref.label}</div>
              <div style={{ fontSize: '.56rem', color: '#8A87A0', marginTop: '1px' }}>{pref.sub}</div>
            </div>
            <div style={{ width: '32px', height: '18px', background: pref.defaultChecked ? '#00F0FF' : '#333', borderRadius: '10px', position: 'relative' }}>
                <div style={{ width: '14px', height: '14px', background: '#fff', borderRadius: '50%', position: 'absolute', right: pref.defaultChecked ? '2px' : '16px', top: '2px' }} />
            </div>
          </div>
        ))}
      </div>

      {/* ── COMPTE ───────────────────────────────────────────────────────── */}
      <div style={{ marginTop: '10px' }}>
        <div style={{ fontSize: '.56rem', fontWeight: 700, letterSpacing: '.12em', textTransform: 'uppercase', color: '#8A87A0', marginBottom: '7px' }}>
          Compte
        </div>
        <div style={{ fontSize: '.58rem', color: '#8A87A0', marginBottom: '2px' }}>Email</div>
        <div style={{ fontSize: '.72rem', color: '#E4E1EA', marginBottom: '9px' }}>{email}</div>
        <div style={{ fontSize: '.58rem', color: '#8A87A0', marginBottom: '2px' }}>Membre depuis</div>
        <div style={{ fontSize: '.72rem', color: '#E4E1EA' }}>Mai 2026</div>
      </div>

      {/* ── BOUTON MODIFIER ──────────────────────────────────────────────── */}
      <button
        onClick={onEditProfil}
        style={{
          width: '100%',
          padding: '10px',
          borderRadius: '999px',
          border: '1px solid rgba(0, 240, 255, 0.35)',
          background: 'transparent',
          color: '#00F0FF',
          fontSize: '.6rem',
          fontWeight: 700,
          letterSpacing: '.1em',
          textTransform: 'uppercase',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '5px',
          marginTop: 'auto',
        }}
      >
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
          <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
        </svg>
        Modifier le profil
      </button>
    </aside>
  );
}