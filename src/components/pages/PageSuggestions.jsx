import React, { useState } from 'react';
import { callAI } from '../../utils/callAI.js';

export default function PageSuggestions({ garments }) {
  const [activeTab, setActiveTab] = useState('shopping');
  const [shoppingResult, setShoppingResult] = useState(null);
  const [shoppingLoading, setShoppingLoading] = useState(false);
  const [dest, setDest] = useState('');
  const [days, setDays] = useState(7);
  const [temp, setTemp] = useState(22);
  const [valiseResult, setValiseResult] = useState(null);
  const [valiseLoading, setValiseLoading] = useState(false);
  const [error, setError] = useState(null);

  async function generateShopping() {
    setShoppingLoading(true);
    setShoppingResult(null);
    setError(null);
    try {
      const r = await callAI({ __type: 'shopping', garments });
      setShoppingResult(r);
    } catch (e) {
      setError("Erreur : " + e.message);
    }
    setShoppingLoading(false);
  }

  async function generateValise() {
    if (!dest.trim()) { alert('Entrez une destination'); return; }
    setValiseLoading(true);
    setValiseResult(null);
    setError(null);
    try {
      const r = await callAI({ __type: 'valise', dest, days: Number(days), temp: Number(temp) });
      setValiseResult(r);
    } catch (e) {
      setError("Erreur : " + e.message);
    }
    setValiseLoading(false);
  }

  return (
    <div className="page active" id="page-suggestions">
      <div className="page-inner">
        <div className="animate-up" style={{ marginBottom: '2rem' }}>
          <p style={{ fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#8A87A0', marginBottom: '0.5rem' }}>Intelligence Artificielle</p>
          <h2 className="section-title">Suggestions IA</h2>
          <div className="section-line" />
        </div>

        {error && (
          <div style={{ background: 'rgba(255,77,77,0.1)', border: '1px solid rgba(255,77,77,0.3)', borderRadius: '0.75rem', padding: '0.75rem 1rem', marginBottom: '1rem', fontSize: '0.8rem', color: '#ff6b6b' }}>
            {error}
          </div>
        )}

        <div className="animate-up sub-tabs">
          <button className={`sub-tab${activeTab === 'shopping' ? ' active' : ''}`} onClick={() => setActiveTab('shopping')}>🛍 Shopping</button>
          <button className={`sub-tab${activeTab === 'valise' ? ' active' : ''}`} onClick={() => setActiveTab('valise')}>🧳 Valise</button>
        </div>

        {activeTab === 'shopping' && (
          <div>
            <div className="glass-bright" style={{ borderRadius: '1rem', padding: '1.5rem', marginBottom: '1.25rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1rem' }}>
                <span className="material-symbols-outlined" style={{ color: '#C084FC' }}>shopping_bag</span>
                <span style={{ fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#E4E1EA' }}>Analyser mon Dressing</span>
              </div>
              <p style={{ fontSize: '0.8rem', color: '#8A87A0', lineHeight: 1.6, marginBottom: '1.25rem' }}>
                Analyse de votre garde-robe pour identifier les pièces manquantes.
              </p>
              {garments.length === 0 && (
                <p style={{ fontSize: '0.75rem', color: '#ff6b6b', marginBottom: '1rem' }}>⚠️ Votre dressing est vide. Ajoutez des pièces pour obtenir une analyse.</p>
              )}
              <button className="btn-primary" onClick={generateShopping} disabled={garments.length === 0 || shoppingLoading}>
                <span className="material-symbols-outlined" style={{ fontSize: 18, color: '#08080F' }}>auto_awesome</span>
                {shoppingLoading ? 'Analyse en cours...' : 'Analyser mon Dressing'}
              </button>
            </div>

            {shoppingLoading && (
              <div style={{ padding: '1rem', textAlign: 'center' }}>
                <div className="spinner" style={{ margin: 'auto' }} />
                <p style={{ fontSize: '0.75rem', color: '#8A87A0', marginTop: '0.75rem' }}>Analyse en cours...</p>
              </div>
            )}

            {shoppingResult && !shoppingLoading && (
              <div className="result-panel">
                <div style={{ padding: '1.25rem', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                  <p style={{ fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#00F0FF' }}>Analyse de votre Dressing</p>
                </div>
                <div className="ai-result" style={{ margin: 0, borderRadius: 0, border: 'none', padding: '1.25rem' }}>
                  <p style={{ fontSize: '0.875rem', lineHeight: 1.7 }} dangerouslySetInnerHTML={{ __html: shoppingResult.replace(/\n/g, '<br/>') }} />
                </div>
              </div>
            )}
          </div>
        )}

        {activeTab === 'valise' && (
          <div>
            <div className="glass-bright" style={{ borderRadius: '1rem', padding: '1.5rem', marginBottom: '1.25rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1.25rem' }}>
                <span className="material-symbols-outlined" style={{ color: '#00F0FF' }}>luggage</span>
                <span style={{ fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#E4E1EA' }}>Valise Intelligente</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.875rem', marginBottom: '1.25rem' }}>
                <div>
                  <label className="form-label">Destination</label>
                  <input type="text" className="form-input" placeholder="Paris, Tokyo, Marrakech..." value={dest} onChange={e => setDest(e.target.value)} />
                </div>
                <div>
                  <label className="form-label">Nombre de jours</label>
                  <input type="number" className="form-input" value={days} min={1} max={30} onChange={e => setDays(e.target.value)} />
                </div>
                <div>
                  <label className="form-label">Température sur place : {temp}°C</label>
                  <input type="range" min={0} max={45} value={temp} onChange={e => setTemp(e.target.value)} />
                </div>
              </div>
              <button className="btn-primary" onClick={generateValise} disabled={valiseLoading}>
                <span className="material-symbols-outlined" style={{ fontSize: 18, color: '#08080F' }}>luggage</span>
                {valiseLoading ? 'Préparation...' : 'Préparer ma Valise'}
              </button>
            </div>

            {valiseLoading && (
              <div style={{ padding: '1rem', textAlign: 'center' }}>
                <div className="spinner" style={{ margin: 'auto' }} />
                <p style={{ fontSize: '0.75rem', color: '#8A87A0', marginTop: '0.75rem' }}>Préparation de votre valise...</p>
              </div>
            )}

            {valiseResult && !valiseLoading && (
              <div className="result-panel">
                <div style={{ padding: '1.25rem', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                  <p style={{ fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#00F0FF' }}>Votre Valise pour {dest}</p>
                </div>
                <div className="ai-result" style={{ margin: 0, borderRadius: 0, border: 'none', padding: '1.25rem' }}>
                  <p style={{ fontSize: '0.875rem', lineHeight: 1.7 }} dangerouslySetInnerHTML={{ __html: valiseResult.replace(/\n/g, '<br/>') }} />
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}