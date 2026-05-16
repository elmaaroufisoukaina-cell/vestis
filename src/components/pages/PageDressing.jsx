import React, { useState, useRef } from 'react';

const CATS = ['tous', 'hauts', 'bas', 'robes', 'vestes', 'chaussures', 'accessoires'];

export default function PageDressing({ garments, outfits, onDelete, onOpenAdd, uploadImage }) {
  const [catFilter, setCatFilter] = useState('tous');
  const fileInputRef = useRef(null);

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const url = await uploadImage(file);
    onOpenAdd({ name: file.name.replace(/\.[^.]+$/, ''), category: 'hauts', img: url });
  };

  // ✅ Fix: normalise category — some items stored as 'haut' instead of 'hauts' etc.
  function normCat(cat) {
    if (!cat) return '';
    const c = cat.toLowerCase().trim();
    if (c === 'haut')        return 'hauts';
    if (c === 'robe')        return 'robes';
    if (c === 'veste')       return 'vestes';
    if (c === 'chaussure')   return 'chaussures';
    if (c === 'accessoire')  return 'accessoires';
    return c;
  }

  const filtered = catFilter === 'tous'
    ? garments
    : garments.filter(g => normCat(g.category) === catFilter);

  // ✅ Fix: always build correct image src (add leading / for local paths)
  function imgSrc(g) {
    const src = g.src || g.img || '';
    if (!src) return null;
    if (src.startsWith('http') || src.startsWith('blob:') || src.startsWith('/')) return src;
    return '/' + src;
  }

  return (
    <div className="page active" id="page-dressing">
      <input
        type="file"
        ref={fileInputRef}
        style={{ display: 'none' }}
        onChange={handleFileUpload}
        accept="image/*"
      />

      <div className="page-inner">
        {/* Header */}
        <div className="animate-up" style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1.5rem', marginBottom: '2.5rem' }}>
          <div>
            <p style={{ fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#8A87A0', marginBottom: '0.5rem' }}>Ma Garde-Robe</p>
            <h2 className="section-title">Mon Dressing</h2>
            <div className="section-line" />
          </div>
          <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
            <div className="stat-card">
              <div style={{ fontSize: '1.5rem', fontWeight: 700 }}>{garments.length}</div>
              <div style={{ fontSize: '0.6rem', color: '#8A87A0' }}>ARTICLES</div>
            </div>
          </div>
        </div>

        {/* Category chips */}
        <div className="animate-up chips">
          {CATS.map(c => (
            <button
              key={c}
              className={`chip${catFilter === c ? ' active' : ''}`}
              onClick={() => setCatFilter(c)}
            >
              {c.charAt(0).toUpperCase() + c.slice(1)}
              {/* show count per category */}
              {c !== 'tous' && (
                <span style={{ marginLeft: '5px', opacity: 0.6, fontSize: '0.55rem' }}>
                  {garments.filter(g => normCat(g.category) === c).length > 0
                    ? `(${garments.filter(g => normCat(g.category) === c).length})`
                    : ''}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Empty state */}
        {filtered.length === 0 && (
          <div style={{ textAlign: 'center', padding: '4rem 2rem', color: '#8A87A0' }}>
            <span className="material-symbols-outlined" style={{ fontSize: 48, opacity: 0.3, display: 'block', marginBottom: '1rem' }}>checkroom</span>
            <p style={{ fontSize: '0.875rem' }}>
              {catFilter === 'tous'
                ? 'Votre dressing est vide. Ajoutez des pièces depuis le Catalogue.'
                : `Aucun article dans la catégorie "${catFilter}".`}
            </p>
          </div>
        )}

        {/* Grid */}
        <div className="animate-up dressing-grid" key={catFilter}>
          {filtered.map(g => {
            const src = imgSrc(g);
            return (
              <div key={g.id} className="dressing-card">
                <div className="dressing-img-wrap">
                  {src
                    ? <img src={src} alt={g.name} loading="lazy" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                    : <div className="dressing-placeholder">👗</div>
                  }
                  <button
                    className="dressing-delete"
                    onClick={() => onDelete(g.id)}
                    title="Supprimer"
                  >
                    <span className="material-symbols-outlined" style={{ fontSize: 16 }}>delete</span>
                  </button>
                </div>
                <div className="dressing-card-info">
                  <span className="dressing-name">{g.name}</span>
                  <span className="dressing-cat-tag">{g.category}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Upload button — separate from grid so it never breaks card alignment */}
        <div
          className="dressing-upload"
          style={{ marginTop: '1rem', maxWidth: '200px', aspectRatio: '3/3' }}
          onClick={() => fileInputRef.current?.click()}
        >
          <span className="material-symbols-outlined" style={{ fontSize: 36, color: '#00F0FF' }}>add_a_photo</span>
          <span>Importer</span>
        </div>
      </div>
    </div>
  );
}  