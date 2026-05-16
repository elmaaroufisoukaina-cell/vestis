import React, { useState } from 'react';

const CATS  = ['tous', 'casual', 'business', 'soiree', 'sport', 'voyage'];
const EMOJIS = ['👗', '👖', '👟', '👜'];

function TenueModal({ tenue, onClose, onDelete, onToggleLike }) {
  const photos = tenue.photos || [];

  return (
    <div
      className="modal-overlay"
      onClick={e => e.target.classList.contains('modal-overlay') && onClose()}
      style={{ zIndex: 1000 }}
    >
      <div className="modal-box" style={{ maxWidth: 480, width: '90vw', maxHeight: '85vh', overflowY: 'auto', padding: 0 }}>

        {/* Header */}
        <div style={{ padding: '1.25rem 1.25rem 0.75rem', borderBottom: '1px solid rgba(255,255,255,0.07)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <p style={{ fontSize: '0.6rem', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#00F0FF', marginBottom: '0.25rem' }}>Ma Tenue</p>
            <h3 style={{ fontFamily: '"Noto Serif",serif', fontSize: '1.1rem', fontWeight: 700, color: '#E4E1EA', margin: 0 }}>{tenue.name}</h3>
          </div>
          <button onClick={onClose} style={{ background: 'rgba(255,255,255,0.06)', border: 'none', borderRadius: '50%', width: 32, height: 32, cursor: 'pointer', color: '#8A87A0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span className="material-symbols-outlined" style={{ fontSize: 18 }}>close</span>
          </button>
        </div>

        {/* Tags row */}
        <div style={{ padding: '0.75rem 1.25rem', display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
          <span className="tag" style={{ background: 'rgba(0,240,255,0.08)', color: '#00F0FF', fontSize: '0.6rem' }}>{tenue.occasion}</span>
          <span style={{ fontSize: '0.65rem', color: '#8A87A0' }}>{tenue.date}</span>
        </div>

        {/* Photos grid */}
        {photos.length > 0 && (
          <div style={{ padding: '0 1.25rem 1rem' }}>
            <p style={{ fontSize: '0.6rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#8A87A0', marginBottom: '0.75rem' }}>Pièces de la tenue</p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(90px, 1fr))', gap: '0.6rem' }}>
              {photos.map((src, i) => (
                <div key={i} style={{ borderRadius: '0.6rem', overflow: 'hidden', aspectRatio: '3/4', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}>
                  <img src={src} alt={`pièce ${i + 1}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* AI description */}
        {tenue.aiText && (
          <div style={{ margin: '0 1.25rem 1rem', background: 'rgba(0,240,255,0.04)', borderRadius: '0.75rem', padding: '0.875rem', border: '1px solid rgba(0,240,255,0.1)' }}>
            <p style={{ fontSize: '0.6rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#00F0FF', marginBottom: '0.5rem' }}>✨ Note du Styliste IA</p>
            <p style={{ fontSize: '0.8rem', lineHeight: 1.7, color: '#E4E1EA', margin: 0 }}>{tenue.aiText}</p>
          </div>
        )}

        {/* Actions */}
        <div style={{ padding: '0.75rem 1.25rem 1.25rem', display: 'flex', gap: '0.5rem', borderTop: '1px solid rgba(255,255,255,0.07)' }}>
          <button
            onClick={() => onToggleLike(tenue.id)}
            style={{ flex: 1, background: tenue.liked ? 'rgba(0,240,255,0.1)' : 'transparent', border: '1px solid rgba(0,240,255,0.2)', borderRadius: '0.5rem', cursor: 'pointer', color: tenue.liked ? '#00F0FF' : '#8A87A0', padding: '0.5rem', fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase' }}
          >
            {tenue.liked ? '❤️ Aimé' : '🤍 Aimer'}
          </button>
          <button
            onClick={() => alert(`Tenue "${tenue.name}" partagée !`)}
            style={{ flex: 1, background: 'transparent', border: '1px solid rgba(192,132,252,0.25)', borderRadius: '0.5rem', cursor: 'pointer', color: '#C084FC', padding: '0.5rem', fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase' }}
          >
            Partager
          </button>
          <button
            onClick={() => { onDelete(tenue.id); onClose(); }}
            style={{ background: 'transparent', border: '1px solid rgba(255,100,100,0.2)', borderRadius: '0.5rem', cursor: 'pointer', color: '#FF6B6B', padding: '0.5rem' }}
          >
            <span className="material-symbols-outlined" style={{ fontSize: 16 }}>delete</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default function TenuesPage({ outfits, onDelete, onToggleLike }) {
  const [filter,       setFilter]       = useState('tous');
  const [selectedTenue, setSelectedTenue] = useState(null);

  const filtered = filter === 'tous' ? outfits : outfits.filter(t => t.occasion === filter);

  return (
    <div className="page active" id="page-tenues">
      <div className="page-inner">

        <div className="animate-up" style={{ marginBottom: '2.5rem' }}>
          <p style={{ fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#8A87A0', marginBottom: '0.5rem' }}>Ma Collection</p>
          <h2 className="section-title">Mes Tenues</h2>
          <div className="section-line" />
        </div>

        <div className="animate-up chips">
          {CATS.map(c => (
            <button key={c} className={`chip${filter === c ? ' active' : ''}`} onClick={() => setFilter(c)}>
              {c.charAt(0).toUpperCase() + c.slice(1)}
            </button>
          ))}
        </div>

        <div className="animate-up tenues-grid">
          {!filtered.length ? (
            <div style={{ gridColumn: '1/-1', textAlign: 'center', padding: '4rem 2rem', color: '#8A87A0' }}>
              <span className="material-symbols-outlined" style={{ fontSize: 48, opacity: 0.3, display: 'block', marginBottom: '1rem' }}>style</span>
              <p style={{ fontSize: '0.875rem' }}>Aucune tenue {filter !== 'tous' ? 'pour cette occasion' : 'sauvegardée'}</p>
              <p style={{ fontSize: '0.75rem', marginTop: '0.5rem' }}>Créez des tenues dans l'Atelier IA</p>
            </div>
          ) : filtered.map(t => {
            const photos = t.photos || [];
            return (
              <div
                key={t.id}
                className="tenue-card"
                onClick={() => setSelectedTenue(t)}
                style={{ cursor: 'pointer' }}
              >
                <div className="tenue-photos">
                  {[0, 1, 2, 3].map(i => photos[i]
                    ? <img key={i} src={photos[i]} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    : <div key={i} className="placeholder">{EMOJIS[i]}</div>
                  )}
                </div>
                <div style={{ padding: '1rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                    <h3 style={{ fontFamily: '"Noto Serif",serif', fontSize: '0.9rem', fontWeight: 600 }}>{t.name}</h3>
                    <span className="tag" style={{ background: 'rgba(0,240,255,0.08)', color: '#00F0FF' }}>{t.occasion}</span>
                  </div>
                  <div style={{ fontSize: '0.7rem', color: '#8A87A0', marginBottom: '0.75rem' }}>{t.date}</div>
                  <div style={{ fontSize: '0.65rem', color: '#8A87A0', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                    <span className="material-symbols-outlined" style={{ fontSize: 13 }}>touch_app</span>
                    Appuyer pour voir les détails
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>

      {selectedTenue && (
        <TenueModal
          tenue={selectedTenue}
          onClose={() => setSelectedTenue(null)}
          onDelete={(id) => { onDelete(id); setSelectedTenue(null); }}
          onToggleLike={(id) => { onToggleLike(id); setSelectedTenue(t => ({ ...t, liked: !t.liked })); }}
        />
      )}
    </div>
  );
}