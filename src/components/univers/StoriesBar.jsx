import React from 'react';
import { STORIES } from '../../data/universUsers.js';

/* Cercle story individuel ------------------------------------------------- */
function StoryCircle({ avatar, username, gradient, isMe = false }) {
  return (
    <div style={{ flexShrink: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 0, cursor: 'pointer' }}>
      {/* Anneau dégradé — flex pas inline-block pour éviter le gap vertical */}
      <div style={{
        background: gradient,
        padding: '2.5px',
        borderRadius: '50%',
        display: 'flex',          /* ← clé : flex, pas inline-block */
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
      }}>
        <div style={{
          background: '#08080F',   /* même couleur que le fond de la page */
          borderRadius: '50%',
          padding: '2px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          <img
            src={avatar}
            alt={username}
            style={{
              width: 52, height: 52,
              borderRadius: '50%',
              objectFit: 'cover',
              display: 'block',    /* jamais inline */
              opacity: 1,
              visibility: 'visible',
            }}
            onError={e => { e.target.onerror = null; e.target.src = `https://ui-avatars.com/api/?name=${username}&background=111118&color=fff&size=52`; }}
          />
        </div>
      </div>

      {/* Nom — 8px, très discret */}
      <span style={{
        fontSize: 8,
        color: isMe ? '#E4E1EA' : '#8A87A0',
        fontWeight: isMe ? 700 : 500,
        marginTop: 3,
        lineHeight: 1.3,
        maxWidth: 62,
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        textAlign: 'center',
        display: 'block',
      }}>
        {isMe ? 'Moi' : username}
      </span>
    </div>
  );
}

/* Barre complète ----------------------------------------------------------- */
export default function StoriesBar() {
  return (
    <div style={{ marginBottom: 20, paddingBottom: 16, borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
      <div style={{
        display: 'flex',
        gap: 14,
        overflowX: 'auto',
        /* masque la scrollbar */
        scrollbarWidth: 'none',
        msOverflowStyle: 'none',
        paddingBottom: 2,          /* petit espace pour que le nom ne soit pas coupé */
      }}>
        

        {/* ── Stories des autres ── */}
        {STORIES.map(s => (
          <StoryCircle
            key={s.id}
            avatar={s.avatar}
            username={s.username}
            gradient={s.gradient}
          />
        ))}
      </div>
    </div>
  );
}