import React, { useState } from 'react'

export default function ProfilModal({ profile, onClose, onSave }) {
  const [name, setName] = useState(profile.name)
  const [bio, setBio] = useState(profile.bio)
  const [email, setEmail] = useState(profile.email)

  const handleSave = () => {
    onSave({ name, bio, email })
    onClose()
  }

  return (
    <div className="modal-overlay" onClick={e => e.target.classList.contains('modal-overlay') && onClose()}>
      <div className="modal-box">
        <h3>Modifier le Profil</h3>
        <div style={{marginBottom:'0.875rem'}}>
          <label className="form-label">Nom</label>
          <input type="text" className="form-input" value={name} onChange={e => setName(e.target.value)} />
        </div>
        <div style={{marginBottom:'0.875rem'}}>          <label className="form-label">Bio</label>
          <input type="text" className="form-input" value={bio} onChange={e => setBio(e.target.value)} />
        </div>
        <div style={{marginBottom:'1.25rem'}}>
          <label className="form-label">Email</label>
          <input type="email" className="form-input" value={email} onChange={e => setEmail(e.target.value)} />
        </div>
        <div style={{display:'flex',gap:'0.75rem'}}>
          <button className="btn-secondary" onClick={onClose}>Annuler</button>
          <button className="btn-primary" onClick={handleSave}>
            <span className="material-symbols-outlined" style={{fontSize:16,color:'#08080F'}}>save</span>
            Sauvegarder
          </button>
        </div>
      </div>
    </div>
  )
}