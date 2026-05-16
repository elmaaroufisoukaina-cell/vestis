import React, { useState } from 'react'

export default function SaveTenueModal({ onClose, onSave }) {
  const [name, setName] = useState('')
  const [occasion, setOccasion] = useState('casual')

  const handleSave = () => {
    if (!name.trim()) { alert('Entrez un nom pour la tenue'); return }
    onSave(name.trim(), occasion)
    onClose()
  }

  return (
    <div className="modal-overlay" onClick={e => e.target.classList.contains('modal-overlay') && onClose()}>
      <div className="modal-box">
        <h3>Nommer cette Tenue</h3>
        <div style={{marginBottom:'0.875rem'}}>
          <label className="form-label">Nom de la tenue</label>
          <input 
            type="text" 
            className="form-input" 
            placeholder="Ex: Look Soirée Mystique" 
            value={name} 
            onChange={e => setName(e.target.value)} 
          />
        </div>
        <div style={{marginBottom:'1.25rem'}}>
          <label className="form-label">Occasion</label>
          <select className="form-select" value={occasion} onChange={e => setOccasion(e.target.value)}>
            {['casual','business','soiree','sport','voyage','date night'].map(o =>
              <option key={o} value={o}>{o.charAt(0).toUpperCase()+o.slice(1)}</option>
            )}
          </select>
        </div>
        <div style={{display:'flex',gap:'0.75rem'}}>
          <button className="btn-secondary" onClick={onClose}>Annuler</button>
          <button className="btn-primary" onClick={handleSave}>
            <span className="material-symbols-outlined" style={{fontSize:16,color:'#08080F'}}>bookmark</span>
            Sauvegarder
          </button>
        </div>
      </div>
    </div>
  )
}