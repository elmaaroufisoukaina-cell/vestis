import React, { useState } from 'react'

export default function AddModal({ onClose, onSave }) {
  const [name, setName] = useState('')
  const [category, setCategory] = useState('hauts')
  const [color, setColor] = useState('#1a1a2e')
  const [img, setImg] = useState(null)

  const SWATCHES = [
    { c:'#1a1a2e' }, { c:'#ffffff', border:true }, { c:'#00F0FF' }, { c:'#C084FC' },
    { c:'#FF6B9D' }, { c:'#E8C4A0' }, { c:'#4a4a6a' }, { c:'#A8D5BA' }, { c:'#C0392B' }
  ]

  const handleFile = (e) => {
    const file = e.target.files[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = ev => setImg(ev.target.result)
    reader.readAsDataURL(file)
  }

  const handleSave = () => {
    if (!name.trim()) { alert('Veuillez entrer un nom pour ce vêtement'); return }
    onSave({ id: 'g' + Date.now(), name: name.trim(), category, color, img })
    onClose()
  }

  return (
    <div className="modal-overlay" onClick={e => e.target.classList.contains('modal-overlay') && onClose()}>
      <div className="modal-box">
        <h3>Ajouter un Vêtement</h3>
        <div style={{marginBottom:'1rem'}}>
          <div className="upload-zone" style={{padding:'1.5rem'}} onClick={() => document.getElementById('fileInputReact').click()}>
            <input type="file" id="fileInputReact" accept="image/*" style={{display:'none'}} onChange={handleFile} />
            {img
              ? <img src={img} style={{width:'100%',maxHeight:180,objectFit:'cover',borderRadius:'0.5rem'}} alt="preview" />
              : (
                <div style={{textAlign:'center'}}>
                  <div style={{width:48,height:48,borderRadius:'50%',background:'rgba(0,240,255,0.1)',display:'flex',alignItems:'center',justifyContent:'center',margin:'0 auto 0.75rem'}}>
                    <span className="material-symbols-outlined" style={{color:'#00F0FF',fontSize:24}}>add_photo_alternate</span>
                  </div>
                  <div style={{fontSize:'0.7rem',fontWeight:700,letterSpacing:'0.1em',textTransform:'uppercase',color:'#8A87A0'}}>Choisir une photo</div>
                </div>
              )
            }
          </div>
        </div>
        <div style={{marginBottom:'0.875rem'}}>
          <label className="form-label">Nom du vêtement</label>
          <input type="text" className="form-input" placeholder="Ex: Blazer Oversize Crème" value={name} onChange={e => setName(e.target.value)} />
        </div>
        <div style={{marginBottom:'0.875rem'}}>
          <label className="form-label">Catégorie</label>
          <select className="form-select" value={category} onChange={e => setCategory(e.target.value)}>
            {['hauts','bas','robes','vestes','chaussures','accessoires'].map(c =>
              <option key={c} value={c}>{c.charAt(0).toUpperCase()+c.slice(1)}</option>
            )}
          </select>
        </div>
        <div style={{marginBottom:'1.25rem'}}>
          <label className="form-label">Couleur principale</label>
          <div style={{display:'flex',flexWrap:'wrap',gap:'0.6rem',marginTop:'0.5rem'}}>
            {SWATCHES.map(s => (
              <div key={s.c} className={`color-swatch${color===s.c?' active':''}`}
                style={{background:s.c, border:s.border?'1px solid rgba(255,255,255,0.2)':undefined}}
                onClick={() => setColor(s.c)} />
            ))}
          </div>
        </div>
        <div style={{display:'flex',gap:'0.75rem'}}>
          <button className="btn-secondary" onClick={onClose}>Annuler</button>
          <button className="btn-primary" onClick={handleSave}>
            <span className="material-symbols-outlined" style={{fontSize:16,color:'#08080F'}}>add</span>
            Ajouter
          </button>
        </div>
      </div>
    </div>
  )
}