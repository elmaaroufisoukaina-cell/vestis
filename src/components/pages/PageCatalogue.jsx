import React, { useState } from 'react';
import { CATALOGUE_ITEMS } from "../../data/catalogueItems.js";

const CATS = ['tous', 'hauts', 'bas', 'robes', 'vestes', 'chaussures', 'accessoires'];

export default function PageCatalogue({ garments = [], onAddToDressing }) {
  // ✅ FIX: garments defaults to [] — eliminates TypeError when store hasn't loaded yet.
  const [catFilter, setCatFilter] = useState('tous');
  const [selected, setSelected] = useState(new Set());

  const filtered = catFilter === 'tous'
    ? CATALOGUE_ITEMS
    : CATALOGUE_ITEMS.filter(i => i.category === catFilter);

  function toggle(id) {
    setSelected(prev => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  }

  function addToDressing() {
    if (!selected.size) return;

    // ✅ FIX: safe Set of already-added catalogueIds — no crash if garments is empty
    const existingCatalogueIds = new Set(
      (garments || []).map(g => g.catalogueId).filter(Boolean)
    );

    let addedCount = 0;
    selected.forEach(id => {
      // Skip if already in dressing
      if (existingCatalogueIds.has(id)) return;

      const item = CATALOGUE_ITEMS.find(i => i.id === id);
      if (!item) return;

      // onAddToDressing is addGarment from useStore — handles dedup internally too
      onAddToDressing({
        catalogueId: id,
        name:        item.name,
        category:    item.category,
        color:       item.color || '#1a1a2e',
        img:         item.src,
      });
      addedCount++;
    });

    if (addedCount === 0) {
      // All selected were already in the dressing
      alert('Ces pièces sont déjà dans votre Dressing.');
      return;
    }

    // Visual feedback on the button
    const btn = document.getElementById('catalogueAddBtn');
    if (btn) {
      const orig = btn.innerHTML;
      btn.innerHTML = '<span class="material-symbols-outlined" style="font-size:17px;color:#fff;">check</span> Ajouté !';
      setTimeout(() => { if (btn) btn.innerHTML = orig; }, 2000);
    }

    // Clear selection after adding
    setSelected(new Set());
  }

  const n = selected.size;

  return (
    <div className="page active" id="page-catalogue">
      <div className="page-inner">
        <div className="animate-up" style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1.5rem', marginBottom: '2.5rem' }}>
          <div>
            <p style={{ fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#8A87A0', marginBottom: '0.5rem' }}>Sélection de Pièces</p>
            <h2 className="section-title">Catalogue</h2>
            <div className="section-line" />
            <p style={{ marginTop: '0.875rem', fontSize: '0.8rem', color: '#8A87A0', lineHeight: 1.6 }}>Cliquez sur les pièces pour les ajouter à votre Dressing.</p>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '0.75rem' }}>
            {n > 0 && (
              <div className="catalogue-counter">
                <span className="material-symbols-outlined" style={{ fontSize: 16 }}>check_circle</span>
                <span>{n} sélectionné{n > 1 ? 's' : ''}</span>
              </div>
            )}
            <button
              id="catalogueAddBtn"
              className="btn-purple"
              onClick={addToDressing}
              disabled={n === 0}
            >
              <span className="material-symbols-outlined" style={{ fontSize: 17, color: '#fff' }}>add_shopping_cart</span>
              Ajouter au Dressing
            </button>
          </div>
        </div>

        <div className="animate-up chips">
          {CATS.map(c => (
            <button
              key={c}
              className={`chip${catFilter === c ? ' active' : ''}`}
              onClick={() => setCatFilter(c)}
            >
              {c.charAt(0).toUpperCase() + c.slice(1)}
            </button>
          ))}
        </div>

        <div className="animate-up catalogue-grid">
          {filtered.map(item => {
            const sel = selected.has(item.id);
            const alreadyAdded = (garments || []).some(g => g.catalogueId === item.id);
            return (
              <div
                key={item.id}
                className={`catalogue-card${sel ? ' selected' : ''}${alreadyAdded ? ' already-added' : ''}`}
                onClick={() => !alreadyAdded && toggle(item.id)}
                title={alreadyAdded ? 'Déjà dans votre Dressing' : item.name}
              >
                <div className="cat-img-wrap">
                  <img src={item.src} alt={item.name} loading="lazy" />
                  {/* Checkmark badge when selected */}
                  <div className="check-badge">{alreadyAdded ? '✓' : '+'}</div>
                </div>
                <div className="cat-info">
                  <div style={{ fontSize: '0.6rem', fontWeight: 700, letterSpacing: '0.09em', textTransform: 'uppercase', color: alreadyAdded ? '#8A87A0' : '#E4E1EA', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {item.name}
                    {alreadyAdded && ' ✓'}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}