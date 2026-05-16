import React, { useState } from 'react';

export default function LoginPage({ onLogin }) {
  const [isSignup, setIsSignup]     = useState(false);
  const [name, setName]             = useState('');
  const [email, setEmail]           = useState('');
  const [password, setPassword]     = useState('');
  const [showPass, setShowPass]     = useState(false);
  const [error, setError]           = useState('');
  const [loading, setLoading]       = useState(false);

  function validate() {
    if (isSignup && !name.trim())         return "Entrez votre prénom.";
    if (!email.includes('@'))             return "Adresse e-mail invalide.";
    if (password.length < 4)             return "Mot de passe trop court (min. 4 caractères).";
    return null;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const err = validate();
    if (err) { setError(err); return; }
    setError('');
    setLoading(true);
    await new Promise(r => setTimeout(r, 900)); // fake loading
    setLoading(false);
    onLogin({ name: name || email.split('@')[0], email });
  }

  return (
    <div style={{ minHeight: '100dvh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1.5rem', position: 'relative', zIndex: 1 }}>

      {/* ambient bg already in App, but add extra glow for login */}
      <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', background: 'radial-gradient(ellipse 70% 60% at 50% 40%, rgba(0,240,255,0.06) 0%, transparent 70%), radial-gradient(ellipse 50% 50% at 80% 80%, rgba(192,132,252,0.07) 0%, transparent 60%)' }} />

      <div style={{ width: '100%', maxWidth: 420 }}>

        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 64, height: 64, borderRadius: '1rem', background: 'linear-gradient(135deg, rgba(0,240,255,0.15), rgba(192,132,252,0.15))', border: '1px solid rgba(0,240,255,0.2)', marginBottom: '1.25rem', boxShadow: '0 0 30px rgba(0,240,255,0.15)' }}>
            <span className="material-symbols-outlined" style={{ fontSize: 32, background: 'linear-gradient(135deg,#00F0FF,#C084FC)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>checkroom</span>
          </div>
          <h1 style={{ fontFamily: '"Noto Serif", serif', fontStyle: 'italic', fontWeight: 700, fontSize: '2rem', letterSpacing: '0.15em', textTransform: 'uppercase', background: 'linear-gradient(135deg, #00F0FF 0%, #C084FC 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', marginBottom: '0.4rem' }}>
            Vestis
          </h1>
          <p style={{ fontSize: '0.75rem', color: '#8A87A0', letterSpacing: '0.1em', textTransform: 'uppercase', fontWeight: 600 }}>
            Votre Dressing Intelligent
          </p>
        </div>

        {/* Card */}
        <div className="glass-bright" style={{ borderRadius: '1.25rem', padding: '2rem', boxShadow: '0 0 40px rgba(0,240,255,0.06)' }}>

          {/* Tab switcher */}
          <div style={{ display: 'flex', background: 'rgba(255,255,255,0.04)', borderRadius: '0.75rem', padding: '0.25rem', marginBottom: '1.75rem' }}>
            {['Connexion', 'Inscription'].map((label, i) => (
              <button
                key={label}
                onClick={() => { setIsSignup(i === 1); setError(''); }}
                style={{ flex: 1, padding: '0.6rem', borderRadius: '0.5rem', border: 'none', cursor: 'pointer', fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', fontFamily: 'inherit', transition: 'all 0.2s',
                  background: isSignup === (i === 1) ? 'linear-gradient(135deg, rgba(0,240,255,0.15), rgba(192,132,252,0.15))' : 'transparent',
                  color: isSignup === (i === 1) ? '#00F0FF' : '#8A87A0',
                  boxShadow: isSignup === (i === 1) ? '0 0 12px rgba(0,240,255,0.1)' : 'none',
                }}
              >
                {label}
              </button>
            ))}
          </div>

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>

            {/* Name field (signup only) */}
            {isSignup && (
              <div>
                <label style={{ display: 'block', fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#8A87A0', marginBottom: '0.5rem' }}>Prénom</label>
                <div style={{ position: 'relative' }}>
                  <span className="material-symbols-outlined" style={{ position: 'absolute', left: '0.875rem', top: '50%', transform: 'translateY(-50%)', fontSize: 18, color: '#8A87A0', pointerEvents: 'none' }}>person</span>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="Votre prénom"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    style={{ paddingLeft: '2.5rem' }}
                  />
                </div>
              </div>
            )}

            {/* Email */}
            <div>
              <label style={{ display: 'block', fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#8A87A0', marginBottom: '0.5rem' }}>Adresse e-mail</label>
              <div style={{ position: 'relative' }}>
                <span className="material-symbols-outlined" style={{ position: 'absolute', left: '0.875rem', top: '50%', transform: 'translateY(-50%)', fontSize: 18, color: '#8A87A0', pointerEvents: 'none' }}>mail</span>
                <input
                  type="email"
                  className="form-input"
                  placeholder="vous@exemple.com"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  style={{ paddingLeft: '2.5rem' }}
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label style={{ display: 'block', fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#8A87A0', marginBottom: '0.5rem' }}>Mot de passe</label>
              <div style={{ position: 'relative' }}>
                <span className="material-symbols-outlined" style={{ position: 'absolute', left: '0.875rem', top: '50%', transform: 'translateY(-50%)', fontSize: 18, color: '#8A87A0', pointerEvents: 'none' }}>lock</span>
                <input
                  type={showPass ? 'text' : 'password'}
                  className="form-input"
                  placeholder="••••••••"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  style={{ paddingLeft: '2.5rem', paddingRight: '3rem' }}
                />
                <button
                  type="button"
                  onClick={() => setShowPass(p => !p)}
                  style={{ position: 'absolute', right: '0.875rem', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: '#8A87A0', padding: 0 }}
                >
                  <span className="material-symbols-outlined" style={{ fontSize: 18 }}>{showPass ? 'visibility_off' : 'visibility'}</span>
                </button>
              </div>
            </div>

            {/* Error */}
            {error && (
              <div style={{ background: 'rgba(255,77,77,0.08)', border: '1px solid rgba(255,77,77,0.25)', borderRadius: '0.6rem', padding: '0.6rem 0.875rem', fontSize: '0.75rem', color: '#ff6b6b', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span className="material-symbols-outlined" style={{ fontSize: 15 }}>error</span>
                {error}
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              className="btn-primary"
              disabled={loading}
              style={{ marginTop: '0.25rem', opacity: loading ? 0.7 : 1 }}
            >
              {loading
                ? <><span className="spinner" style={{ width: 16, height: 16, borderWidth: 2 }} />{isSignup ? 'Création...' : 'Connexion...'}</>
                : <><span className="material-symbols-outlined" style={{ fontSize: 16, color: '#08080F' }}>{isSignup ? 'person_add' : 'login'}</span>{isSignup ? 'Créer mon compte' : 'Se connecter'}</>
              }
            </button>

          </form>

          {/* Divider */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', margin: '1.25rem 0' }}>
            <div style={{ flex: 1, height: 1, background: 'rgba(255,255,255,0.07)' }} />
            <span style={{ fontSize: '0.65rem', color: '#8A87A0', letterSpacing: '0.08em', textTransform: 'uppercase' }}>ou</span>
            <div style={{ flex: 1, height: 1, background: 'rgba(255,255,255,0.07)' }} />
          </div>

          {/* Guest access */}
          <button
            onClick={() => onLogin({ name: 'Invité', email: '' })}
            style={{ width: '100%', background: 'transparent', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '9999px', padding: '0.75rem', cursor: 'pointer', color: '#8A87A0', fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', fontFamily: 'inherit', transition: 'all 0.2s', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}
            onMouseOver={e => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.25)'}
            onMouseOut={e => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'}
          >
            <span className="material-symbols-outlined" style={{ fontSize: 16 }}>person_outline</span>
            Continuer en tant qu'invité
          </button>
        </div>

        {/* Footer */}
        <p style={{ textAlign: 'center', fontSize: '0.65rem', color: '#8A87A0', marginTop: '1.5rem', lineHeight: 1.6 }}>
          En continuant, vous acceptez les conditions d'utilisation de Vestis.
        </p>
      </div>
    </div>
  );
}