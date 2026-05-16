import React, { useState } from 'react'
import { POSTS } from '../../data/universUsers.js'

function SocialCard({ user }) {
  const [followed, setFollowed] = useState(false)
  const [liked, setLiked] = useState(false)

  // Normalisation de la hauteur (prise en compte de ton augmentation de 25%)
  const photoHeight = typeof user.h === 'number' ? user.h : parseInt(user.h, 10) || 300

  return (
    <div
      className="mcard"
      style={{
        borderRadius: 11,
        overflow: 'hidden',
        background: '#111118',
        border: '1px solid rgba(255,255,255,0.06)',
        cursor: 'pointer',
        transition: 'transform .28s',
      }}
      onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-3px)'}
      onMouseLeave={e => e.currentTarget.style.transform = 'none'}
    >
      {/* Header */}
      <div style={{ padding: '10px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', minWidth: 0, gap: 8 }}>
          <div style={{
            background: user.grad,
            flexShrink: 0,
            width: 32, height: 32,
            borderRadius: '50%',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 10, fontWeight: 'bold', color: '#fff'
          }}>
            {user.initials}
          </div>
          <span style={{ color: user.nameColor || '#fff', fontSize: 12, fontWeight: 700, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
            {user.username}
          </span>
        </div>
        <button
          onClick={(e) => { e.stopPropagation(); setFollowed(p => !p); }}
          style={{
            padding: '3px 9px', borderRadius: 999,
            border: '1px solid rgba(0,240,255,0.4)',
            background: followed ? 'rgba(0,240,255,0.1)' : 'transparent',
            color: '#00F0FF', fontSize: 11, fontWeight: 700,
            letterSpacing: '0.06em', textTransform: 'uppercase',
            cursor: 'pointer', whiteSpace: 'nowrap', flexShrink: 0,
            fontFamily: 'inherit'
          }}
        >
          {followed ? 'Abonné' : 'Suivre'}
        </button>
      </div>

      {/* Photo */}
      <img
        src={user.img}
        alt={user.username}
        style={{
          display: 'block',
          width: '100%',
          height: photoHeight,
          minHeight: photoHeight,
          objectFit: 'cover',
          background: '#18181F',
          opacity: 1,
          visibility: 'visible',
        }}
        loading="lazy"
      />

      {/* Footer */}
      <div style={{ padding: '10px 10px 12px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 8 }}>
          <button
            onClick={(e) => { e.stopPropagation(); setLiked(p => !p); }}
            style={{
              display: 'flex', alignItems: 'center', gap: 5,
              background: 'none', border: 'none', padding: 0,
              cursor: 'pointer', color: liked ? '#00F0FF' : '#8A87A0'
            }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24"
              fill={liked ? '#00F0FF' : 'none'}
              stroke={liked ? '#00F0FF' : '#8A87A0'}
              strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
            </svg>
            <span style={{ fontSize: 11, fontWeight: 700 }}>
              {liked ? user.likes + 1 : user.likes}
            </span>
          </button>

          <button style={{ display: 'flex', alignItems: 'center', gap: 5, background: 'none', border: 'none', color: '#8A87A0', cursor: 'pointer' }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#8A87A0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
            </svg>
            <span style={{ fontSize: 11, fontWeight: 700 }}>{user.comments}</span>
          </button>

          <button style={{ background: 'none', border: 'none', color: '#8A87A0', marginLeft: 'auto', cursor: 'pointer' }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#8A87A0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="22" y1="2" x2="11" y2="13" />
              <polygon points="22 2 15 22 11 13 2 9 22 2" />
            </svg>
          </button>
        </div>

        <div style={{ fontSize: 11, fontWeight: 500, color: '#E4E1EA', lineHeight: 1.45 }}>
          {user.caption}
        </div>
      </div>
    </div>
  )
}

export default function FeedGrid() {
  const columns = [[], [], []]
  POSTS.forEach((post, i) => columns[i % 3].push(post))

  return (
    /* Conteneur pour supprimer le titre Exploration et coller au top */
    <div style={{ marginTop: '0px', paddingTop: '0px' }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8, alignItems: 'start' }}>
        {columns.map((col, ci) => (
          <div key={ci} style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {col.map(post => (
              <SocialCard key={post.id} user={post} />
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}