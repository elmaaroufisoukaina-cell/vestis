import React, { useState } from 'react';
import { WEATHER_ICONS, WEATHER_DESC } from "../../data/catalogueItems.js";
import { callAI } from "../../utils/callAI.js";

const SLOT_DEFS = [
  { key: 'haut',       label: 'Haut',        icon: 'checkroom' },
  { key: 'bas',        label: 'Bas',         icon: 'straighten' },
  { key: 'veste',      label: 'Veste',       icon: 'dry_cleaning' },
  { key: 'chaussures', label: 'Chaussures',  icon: 'steps' },
  { key: 'accessoire', label: 'Accessoire',  icon: 'diamond' },
];

const MOODS = [
  { emoji: '☕', label: 'Casual' },
  { emoji: '💼', label: 'Business' },
  { emoji: '🌙', label: 'Soirée' },
  { emoji: '⚽', label: 'Sport' },
  { emoji: '✈️', label: 'Voyage' },
];

const COLOR_SWATCHES = [
  { bg: '#1a1a2e', name: 'noir profond' },
  { bg: '#ffffff', name: 'blanc', extra: { border: '1px solid rgba(255,255,255,0.2)' } },
  { bg: '#00F0FF', name: 'cyan électrique' },
  { bg: '#C084FC', name: 'violet lavande' },
  { bg: '#FF6B9D', name: 'rose vif' },
  { bg: '#E8C4A0', name: 'beige camel' },
  { bg: '#4a4a6a', name: 'gris ardoise' },
  { bg: '#A8D5BA', name: 'vert sauge' },
  { bg: '#F7DC6F', name: 'jaune miel' },
  { bg: '#C0392B', name: 'rouge bordeaux' },
];

const CATS_ALL = ['tous', 'hauts', 'bas', 'robes', 'vestes', 'chaussures', 'accessoires'];

// Which categories are valid for each slot
const SLOT_ALLOWED_CATS = {
  haut:        ['hauts', 'robes'],
  bas:         ['bas'],
  veste:       ['vestes'],
  chaussures:  ['chaussures'],
  accessoire:  ['accessoires'],
};

// Default category filter when opening a slot picker
const SLOT_DEFAULT_CAT = {
  haut:        'hauts',
  bas:         'bas',
  veste:       'vestes',
  chaussures:  'chaussures',
  accessoire:  'accessoires',
};

// ── Outfit result display ─────────────────────────────────────────────────────

function OutfitDisplay({ outfit }) {
  if (!outfit) return null;
  const pieces = [
    { key: 'haut', label: 'Haut' },
    { key: 'bas', label: 'Bas' },
    { key: 'veste', label: 'Veste' },
    { key: 'chaussures', label: 'Chaussures' },
    { key: 'accessoire', label: 'Accessoire' },
  ].filter(p => outfit[p.key]);

  return (
    <div>
      {/* Images grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(80px, 1fr))', gap: '0.5rem', marginBottom: '1rem' }}>
        {pieces.map(p => {
          const item = outfit[p.key];
          const imgSrc = item.src ? `/${item.src}` : item.img;
          return (
            <div key={p.key} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.25rem' }}>
              <div style={{ width: 72, height: 88, borderRadius: '0.5rem', overflow: 'hidden', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)' }}>
                {imgSrc
                  ? <img src={imgSrc} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  : <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem' }}>👗</div>
                }
              </div>
              <span style={{ fontSize: '0.55rem', color: '#8A87A0', textAlign: 'center', lineHeight: 1.2 }}>{item.name}</span>
            </div>
          );
        })}
      </div>
      {/* Description */}
      <div style={{ background: 'rgba(0,240,255,0.05)', borderRadius: '0.75rem', padding: '0.875rem', border: '1px solid rgba(0,240,255,0.1)' }}>
        <p style={{ fontSize: '0.8rem', lineHeight: 1.7, color: '#E4E1EA', margin: 0 }}>
          {outfit.description}
        </p>
      </div>
    </div>
  );
}

function TextResult({ text }) {
  return (
    <div className="ai-result">
      <p style={{ fontSize: '0.85rem', lineHeight: 1.7 }} dangerouslySetInnerHTML={{ __html: text.replace(/\n/g, '<br/>') }} />
    </div>
  );
}

function LoadingBox() {
  return (
    <div style={{ textAlign: 'center', padding: '2rem', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
      <div className="spinner" />
      <div style={{ fontSize: '0.75rem', color: '#8A87A0', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
        Styliste IA en action...
      </div>
    </div>
  );
}

function ErrorBox({ text }) {
  return (
    <div style={{ background: 'rgba(255,77,77,0.1)', border: '1px solid rgba(255,77,77,0.3)', borderRadius: '0.75rem', padding: '1rem', margin: '0.5rem 0' }}>
      <p style={{ fontSize: '0.8rem', color: '#ff6b6b', margin: 0 }}>{text}</p>
    </div>
  );
}

function ResultPanel({ title, subtitle, children, onSave }) {
  return (
    <div className="result-panel">
      <div style={{ padding: '1.25rem', borderBottom: '1px solid rgba(255,255,255,0.06)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <p style={{ fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#00F0FF', marginBottom: '0.25rem' }}>{title}</p>
          <p style={{ fontFamily: '"Noto Serif",serif', fontSize: '1rem', fontWeight: 600, color: '#E4E1EA' }}>{subtitle}</p>
        </div>
      </div>
      <div style={{ padding: '1.25rem' }}>{children}</div>
      <div style={{ padding: '0 1.25rem 1.25rem' }}>
        <button className="btn-primary" style={{ fontSize: '0.7rem', padding: '0.75rem' }} onClick={onSave}>
          <span className="material-symbols-outlined" style={{ fontSize: 16, color: '#08080F' }}>bookmark</span>
          Sauvegarder
        </button>
      </div>
    </div>
  );
}

// ── Page principale ───────────────────────────────────────────────────────────

export default function PageCreer({ garments, onSaveTenue }) {
  const [activeTab, setActiveTab] = useState('constructeur');

  // Constructeur
  const [slots, setSlots] = useState({ haut: null, bas: null, veste: null, chaussures: null, accessoire: null });
  const [pickerSlot, setPickerSlot] = useState(null);
  const [pickerCat, setPickerCat] = useState('tous');
  const [pickerSearch, setPickerSearch] = useState('');
  const [constructeurResult, setConstructeurResult] = useState(null);
  const [constructeurLoading, setConstructeurLoading] = useState(false);
  const [constructeurError, setConstructeurError] = useState(null);

  // Humeur
  const [selectedMood, setSelectedMood] = useState(null);
  const [humeurResult, setHumeurResult] = useState(null);
  const [humeurLoading, setHumeurLoading] = useState(false);
  const [humeurError, setHumeurError] = useState(null);

  // Couleurs
  const [activeColors, setActiveColors] = useState(new Set());
  const [couleursResult, setCouleursResult] = useState(null);
  const [couleursLoading, setCouleursLoading] = useState(false);
  const [couleursError, setCouleursError] = useState(null);

  // Météo
  const [weather, setWeather] = useState({
    temp: 23,
    description: 'Ciel dégagé',
    icon: '☀️',
    wind: 12,
    city: 'Marrakech',
  });
  const [weatherLoading, setWeatherLoading] = useState(false);
  const [meteoResult, setMeteoResult] = useState(null);
  const [meteoLoading, setMeteoLoading] = useState(false);
  const [meteoError, setMeteoError] = useState(null);

  const lastResults = {
    constructeur: constructeurResult,
    humeur: humeurResult,
    couleurs: couleursResult,
    meteo: meteoResult,
  };

  // ── Picker ────────────────────────────────────────────────────────────────

  const pickerItems = (() => {
    let items = pickerCat === 'tous' ? garments : garments.filter(g => g.category === pickerCat);
    if (pickerSearch) items = items.filter(g => g.name.toLowerCase().includes(pickerSearch.toLowerCase()));
    return items;
  })();

  function openPicker(slot) {
    setPickerSlot(slot);
    setPickerCat(SLOT_DEFAULT_CAT[slot] || 'tous');
    setPickerSearch('');
  }
  function closePicker() { setPickerSlot(null); }

  function selectPickerItem(garment) {
    if (!pickerSlot) return;
    const allowed = SLOT_ALLOWED_CATS[pickerSlot];
    if (allowed && !allowed.includes(garment.category)) {
      const slotLabel = SLOT_DEFS.find(s => s.key === pickerSlot)?.label || pickerSlot;
      alert(`⚠️ Veuillez sélectionner un(e) ${slotLabel}. Cet article est dans la catégorie "${garment.category}".`);
      return;
    }
    setSlots(prev => ({ ...prev, [pickerSlot]: garment }));
    closePicker();
  }

  function removeSlot(e, slot) {
    e.stopPropagation();
    setSlots(prev => ({ ...prev, [slot]: null }));
  }

  // ── Générateurs ──────────────────────────────────────────────────────────

  async function generateConstructeur() {
    const filled = Object.entries(slots).filter(([, v]) => v);
    if (!filled.length) { alert('Sélectionnez au moins une pièce'); return; }
    setConstructeurLoading(true);
    setConstructeurResult(null);
    setConstructeurError(null);
    try {
      const r = await callAI({ __type: 'constructeur', slots, garments });
      setConstructeurResult(r);
    } catch (e) {
      setConstructeurError("Erreur : " + e.message);
    }
    setConstructeurLoading(false);
  }

  async function generateHumeur() {
    if (!selectedMood) { alert('Sélectionnez une humeur'); return; }
    setHumeurLoading(true);
    setHumeurResult(null);
    setHumeurError(null);
    try {
      const r = await callAI({ __type: 'mood', mood: selectedMood, garments });
      setHumeurResult(r);
    } catch (e) {
      setHumeurError("Erreur : " + e.message);
    }
    setHumeurLoading(false);
  }

  async function generateCouleurs() {
    if (!activeColors.size) { alert('Sélectionnez au moins une couleur'); return; }
    setCouleursLoading(true);
    setCouleursResult(null);
    setCouleursError(null);
    try {
      const r = await callAI({ __type: 'colors', colors: [...activeColors], garments });
      setCouleursResult(r);
    } catch (e) {
      setCouleursError("Erreur : " + e.message);
    }
    setCouleursLoading(false);
  }

  async function fetchWeather() {
    setWeatherLoading(true);
    try {
      const locRes = await fetch('https://ipapi.co/json/');
      const loc = await locRes.json();
      const wRes = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${loc.latitude}&longitude=${loc.longitude}&current_weather=true`);
      const w = await wRes.json();
      const cw = w.current_weather;
      const code = cw.weathercode;
      setWeather({
        temp: Math.round(cw.temperature),
        description: WEATHER_DESC[code] || 'Variable',
        icon: WEATHER_ICONS[code] || '🌡',
        wind: Math.round(cw.windspeed),
        city: loc.city || loc.region || 'Votre ville',
      });
    } catch {
      // keep existing weather (default or previously fetched)
    }
    setWeatherLoading(false);
  }

  async function generateMeteo() {
    if (!weather) { alert("Chargez la météo d'abord"); return; }
    setMeteoLoading(true);
    setMeteoResult(null);
    setMeteoError(null);
    try {
      const r = await callAI({ __type: 'weather', temp: weather.temp, description: weather.description, garments });
      setMeteoResult(r);
    } catch (e) {
      setMeteoError("Erreur : " + e.message);
    }
    setMeteoLoading(false);
  }

  function handleSave(mode) {
    const result = lastResults[mode];
    if (!result) { alert("Générez d'abord une suggestion"); return; }
    let photos = [];
    if (result && typeof result === 'object') {
      photos = ['haut','bas','veste','chaussures','accessoire']
        .map(k => result[k])
        .filter(Boolean)
        .map(item => item.src ? `/${item.src}` : item.img)
        .filter(Boolean)
        .slice(0, 4);
    } else {
      photos = Object.values(slots).filter(Boolean).map(g => g.img).filter(Boolean).slice(0, 4);
    }
    const aiText = result?.description || (typeof result === 'string' ? result : '');
    onSaveTenue(aiText, photos);
  }

  const tabs = [
    { id: 'constructeur', label: '🧩 Constructeur' },
    { id: 'humeur',       label: '🌙 Humeur' },
    { id: 'couleurs',     label: '🎨 Couleurs' },
    { id: 'meteo',        label: '🌤 Météo' },
  ];

  // Helper to render result content
  function renderResult(loading, error, result, emptyIcon, emptyText) {
    if (loading) return <LoadingBox />;
    if (error)   return <ErrorBox text={error} />;
    if (result) {
      if (typeof result === 'object') return <OutfitDisplay outfit={result} />;
      return <TextResult text={result} />;
    }
    return (
      <div style={{ textAlign: 'center', padding: '2rem 1rem', color: '#8A87A0' }}>
        <span className="material-symbols-outlined" style={{ fontSize: 40, opacity: 0.3 }}>{emptyIcon}</span>
        <p style={{ fontSize: '0.8rem', marginTop: '0.75rem' }}>{emptyText}</p>
      </div>
    );
  }

  // ── Render ────────────────────────────────────────────────────────────────

  return (
    <div className="page active" id="page-creer">
      <div className="page-inner">

        <div className="animate-up" style={{ marginBottom: '2rem' }}>
          <p style={{ fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#8A87A0', marginBottom: '0.5rem' }}>Intelligence Artificielle</p>
          <h2 className="section-title">Atelier de Création</h2>
          <div className="section-line" />
        </div>

        <div className="animate-up sub-tabs">
          {tabs.map(t => (
            <button
              key={t.id}
              className={`sub-tab${activeTab === t.id ? ' active' : ''}`}
              onClick={() => setActiveTab(t.id)}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* ── CONSTRUCTEUR ── */}
        {activeTab === 'constructeur' && (
          <div className="animate-up">
            <div className="creer-layout">
              <div>
                <div className="glass-bright" style={{ borderRadius: '1rem', padding: '1.5rem', marginBottom: '1rem' }}>
                  <div style={{ fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#8A87A0', marginBottom: '1rem' }}>
                    Assemblez votre tenue
                  </div>
                  <div className="outfit-builder">
                    {SLOT_DEFS.map(s => {
                      const filled = !!slots[s.key];
                      const item = slots[s.key];
                      const imgSrc = item ? (item.src ? `/${item.src}` : item.img) : null;
                      return (
                        <div key={s.key} className={`outfit-slot${filled ? ' filled' : ''}`} onClick={() => openPicker(s.key)}>
                          {filled && imgSrc && <img src={imgSrc} alt={item.name} />}
                          {!filled && <span className="material-symbols-outlined" style={{ color: 'rgba(0,240,255,0.3)', fontSize: 28 }}>{s.icon}</span>}
                          {!filled && <span className="slot-label">{s.label}</span>}
                          {filled && (
                            <button className="slot-remove" onClick={e => removeSlot(e, s.key)}>
                              <span className="material-symbols-outlined" style={{ fontSize: 14 }}>close</span>
                            </button>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>

                {pickerSlot && (
                  <div className="picker-panel">
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                      <span style={{ fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#00F0FF' }}>
                        Choisir : {SLOT_DEFS.find(s => s.key === pickerSlot)?.label}
                      </span>
                      {pickerSlot && SLOT_ALLOWED_CATS[pickerSlot] && (
                        <span style={{ fontSize: '0.55rem', color: '#8A87A0', marginLeft: '0.5rem' }}>
                          ({SLOT_ALLOWED_CATS[pickerSlot].join(', ')})
                        </span>
                      )}
                      <button onClick={closePicker} style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: '#8A87A0' }}>
                        <span className="material-symbols-outlined" style={{ fontSize: 18 }}>close</span>
                      </button>
                    </div>
                    <div className="search-wrap" style={{ marginBottom: '0.75rem' }}>
                      <span className="material-symbols-outlined search-icon">search</span>
                      <input type="text" className="search-input" placeholder="Rechercher..." value={pickerSearch} onChange={e => setPickerSearch(e.target.value)} />
                    </div>
                    <div className="chips" style={{ marginBottom: '0.75rem' }}>
                      {CATS_ALL.map(c => (
                        <button key={c} className={`chip${pickerCat === c ? ' active' : ''}`} style={{ padding: '0.25rem 0.75rem', fontSize: '0.6rem' }} onClick={() => setPickerCat(c)}>
                          {c.charAt(0).toUpperCase() + c.slice(1)}
                        </button>
                      ))}
                    </div>
                    <div className="picker-grid" key={pickerCat}>
                      {pickerItems.map(g => {
                        const rawSrc = g.src || g.img || '';
                        const imgSrc = rawSrc ? (rawSrc.startsWith('http') ? rawSrc : `/${rawSrc.replace(/^\//, '')}`) : null;
                        return (
                          <div key={g.id} className="picker-item" onClick={() => selectPickerItem(g)}>
                            {imgSrc
                              ? <img src={imgSrc} alt={g.name} loading="lazy" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                              : <div style={{ width: '100%', height: '100%', background: `linear-gradient(135deg,${g.color || '#1a1a2e'},#222230)`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem' }}>👗</div>
                            }
                          </div>
                        );
                      })}
                      {!pickerItems.length && (
                        <div style={{ gridColumn: '1/-1', textAlign: 'center', padding: '1rem', color: '#8A87A0', fontSize: '0.75rem' }}>
                          Aucun article trouvé dans votre dressing pour cette catégorie
                        </div>
                      )}
                    </div>
                  </div>
                )}

                <button className="btn-primary" style={{ marginTop: '1rem' }} onClick={generateConstructeur} disabled={constructeurLoading}>
                  <span className="material-symbols-outlined" style={{ fontSize: 18, color: '#08080F' }}>auto_awesome</span>
                  {constructeurLoading ? 'Analyse en cours...' : 'Analyser cette Tenue'}
                </button>
              </div>

              <ResultPanel title="Analyse IA" subtitle="Votre Styliste Personnel" onSave={() => handleSave('constructeur')}>
                {renderResult(constructeurLoading, constructeurError, constructeurResult, 'style', 'Assemblez des pièces puis cliquez sur Analyser')}
              </ResultPanel>
            </div>
          </div>
        )}

        {/* ── HUMEUR ── */}
        {activeTab === 'humeur' && (
          <div className="animate-up">
            <div className="creer-layout">
              <div>
                <div className="glass-bright" style={{ borderRadius: '1rem', padding: '1.5rem', marginBottom: '1rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1.25rem' }}>
                    <span className="material-symbols-outlined" style={{ color: '#C084FC' }}>psychology</span>
                    <span style={{ fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#E4E1EA' }}>Choisir une Humeur</span>
                  </div>
                  <div className="mood-grid">
                    {MOODS.map(m => (
                      <div key={m.label} className={`mood-card${selectedMood === m.label ? ' active' : ''}`} onClick={() => setSelectedMood(m.label)}>
                        <div style={{ fontSize: '1.25rem', marginBottom: '0.4rem' }}>{m.emoji}</div>
                        <div style={{ fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' }}>{m.label}</div>
                      </div>
                    ))}
                  </div>
                </div>
                <button className="btn-primary" onClick={generateHumeur} disabled={humeurLoading}>
                  <span className="material-symbols-outlined" style={{ fontSize: 18, color: '#08080F' }}>auto_awesome</span>
                  {humeurLoading ? 'Génération...' : 'Générer la Tenue'}
                </button>
              </div>

              <ResultPanel title="Résultat IA" subtitle="Suggestion par Humeur" onSave={() => handleSave('humeur')}>
                {renderResult(humeurLoading, humeurError, humeurResult, 'psychology', 'Sélectionnez une humeur puis générez')}
              </ResultPanel>
            </div>
          </div>
        )}

        {/* ── COULEURS ── */}
        {activeTab === 'couleurs' && (
          <div className="animate-up">
            <div className="creer-layout">
              <div>
                <div className="glass-bright" style={{ borderRadius: '1rem', padding: '1.5rem', marginBottom: '1rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1.25rem' }}>
                    <span className="material-symbols-outlined" style={{ color: '#C084FC' }}>palette</span>
                    <span style={{ fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#E4E1EA' }}>Palette de Couleurs</span>
                  </div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
                    {COLOR_SWATCHES.map(s => (
                      <div
                        key={s.name}
                        className={`color-swatch${activeColors.has(s.name) ? ' active' : ''}`}
                        style={{ background: s.bg, ...(s.extra || {}) }}
                        onClick={() => setActiveColors(prev => {
                          const n = new Set(prev);
                          n.has(s.name) ? n.delete(s.name) : n.add(s.name);
                          return n;
                        })}
                      />
                    ))}
                  </div>
                </div>
                <button className="btn-primary" onClick={generateCouleurs} disabled={couleursLoading}>
                  <span className="material-symbols-outlined" style={{ fontSize: 18, color: '#08080F' }}>auto_awesome</span>
                  {couleursLoading ? 'Génération...' : 'Générer la Tenue'}
                </button>
              </div>

              <ResultPanel title="Résultat IA" subtitle="Suggestion par Palette" onSave={() => handleSave('couleurs')}>
                {renderResult(couleursLoading, couleursError, couleursResult, 'palette', 'Sélectionnez des couleurs puis générez')}
              </ResultPanel>
            </div>
          </div>
        )}

        {/* ── MÉTÉO ── */}
        {activeTab === 'meteo' && (
          <div className="animate-up">
            <div className="creer-layout">
              <div>
                <div className="glass-bright" style={{ borderRadius: '1rem', padding: '1.5rem', marginBottom: '1rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1.25rem' }}>
                    <span className="material-symbols-outlined" style={{ color: '#00F0FF' }}>partly_cloudy_day</span>
                    <span style={{ fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#E4E1EA' }}>Météo Actuelle</span>
                    <button
                      onClick={fetchWeather}
                      style={{ marginLeft: 'auto', background: 'transparent', border: '1px solid rgba(0,240,255,0.3)', borderRadius: '9999px', padding: '0.25rem 0.75rem', cursor: 'pointer', color: '#00F0FF', fontSize: '0.6rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase' }}
                    >
                      Actualiser
                    </button>
                  </div>
                  <div style={{ textAlign: 'center', padding: '1rem' }}>
                    {weatherLoading
                      ? <div className="spinner" style={{ margin: 'auto' }} />
                      : weather ? (
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
                          <div style={{ fontSize: '3rem' }}>{weather.icon}</div>
                          <div style={{ fontFamily: '"Noto Serif",serif', fontSize: '2.5rem', fontWeight: 700 }} className="cyber-text">{weather.temp}°C</div>
                          <div style={{ fontSize: '0.9rem', color: '#E4E1EA', fontWeight: 600 }}>{weather.description}</div>
                          <div style={{ fontSize: '0.75rem', color: '#8A87A0' }}>{weather.city} · Vent {weather.wind} km/h</div>
                        </div>
                      ) : (
                        <div style={{ color: '#8A87A0', fontSize: '0.8rem' }}>Chargement de la météo...</div>
                      )
                    }
                  </div>
                </div>
                <button className="btn-primary" onClick={generateMeteo} disabled={meteoLoading}>
                  <span className="material-symbols-outlined" style={{ fontSize: 18, color: '#08080F' }}>auto_awesome</span>
                  {meteoLoading ? 'Génération...' : 'Tenue pour ce Temps'}
                </button>
              </div>

              <ResultPanel title="Résultat IA" subtitle="Tenue Météo-Adaptée" onSave={() => handleSave('meteo')}>
                {renderResult(meteoLoading, meteoError, meteoResult, 'wb_sunny', 'Chargez la météo puis générez')}
              </ResultPanel>
            </div>
          </div>
        )}

      </div>


    </div>
  );
}