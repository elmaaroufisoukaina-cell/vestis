import React, { useState } from 'react'
import { useStore } from './hooks/useStore.js'
import LoginPage     from './components/pages/LoginPage.jsx'
import Navbar         from './components/Navbar.jsx'
import MobileNav      from './components/MobileNav.jsx'
import PageCatalogue  from './components/pages/PageCatalogue.jsx'
import PageDressing   from './components/pages/PageDressing.jsx'
import PageCreer      from './components/pages/PageCreer.jsx'
import PageTenues     from './components/pages/PageTenues.jsx'
import PageSuggestions from './components/pages/PageSuggestions.jsx'
import PageUnivers    from './components/pages/PageUnivers.jsx'
import AddModal       from './components/modals/AddModal.jsx'
import ProfilModal    from './components/modals/ProfilModal.jsx'
import SaveTenueModal from './components/modals/SaveTenueModal.jsx'

export default function App() {
  const [loggedIn, setLoggedIn] = useState(false)
  const [page, setPage] = useState('dressing')

  const {
    garments,
    outfits,
    addGarment,
    deleteGarment,
    addOutfit,
    deleteOutfit,
    toggleLikeOutfit,
    uploadImage,
  } = useStore()

  const [showAddModal,       setShowAddModal]       = useState(false)
  const [showProfilModal,    setShowProfilModal]     = useState(false)
  const [showSaveTenueModal, setShowSaveTenueModal] = useState(false)
  const [pendingTenue,       setPendingTenue]       = useState(null)

  const [profile, setProfile] = useState(() => ({
    name:   localStorage.getItem('vestis_name')  || 'Moi',
    handle: '@VESTIS_USER',
    bio:    localStorage.getItem('vestis_bio')   || 'Passionnée de mode & style unique.',
    email:  localStorage.getItem('vestis_email') || 'user@vestis.app',
  }))

  function handleLogin({ name, email }) {
    if (name) {
      localStorage.setItem('vestis_name', name)
      setProfile(prev => ({ ...prev, name, email }))
    }
    setLoggedIn(true)
  }

  function handleLogout() {
    localStorage.removeItem('vestis_loggedin')
    setLoggedIn(false)
    setPage('dressing')
  }

  const openSaveTenue = (aiText, photos) => {
    setPendingTenue({ aiText, photos })
    setShowSaveTenueModal(true)
  }

  const confirmSaveTenue = (name, occasion) => {
    addOutfit({
      name,
      occasion,
      aiText: pendingTenue?.aiText || '',
      photos: (pendingTenue?.photos || []).slice(0, 4),
      liked:  false,
      date:   new Date().toLocaleDateString('fr-FR'),
    })
    setPendingTenue(null)
    setShowSaveTenueModal(false)
    alert('Tenue sauvegardée !')
  }

  const saveProfile = (updates) => {
    const next = { ...profile, ...updates }
    setProfile(next)
    localStorage.setItem('vestis_name',  next.name)
    localStorage.setItem('vestis_bio',   next.bio)
    localStorage.setItem('vestis_email', next.email)
  }

  // ── Show login page if not logged in ──────────────────────────────────────
  if (!loggedIn) {
    return (
      <>
        <div className="ambient-bg" />
        <LoginPage onLogin={handleLogin} />
      </>
    )
  }

  return (
    <>
      <div className="ambient-bg" />
      <Navbar activePage={page} onNav={setPage} onLogout={handleLogout} />

      {page === 'catalogue' && (
        <PageCatalogue
          garments={garments}
          onAddToDressing={addGarment}
        />
      )}

      {page === 'dressing' && (
        <PageDressing
          garments={garments}
          outfits={outfits}
          onDelete={deleteGarment}
          onOpenAdd={() => setShowAddModal(true)}
          uploadImage={uploadImage}
        />
      )}

      {page === 'creer' && (
        <PageCreer
          garments={garments}
          onSaveTenue={openSaveTenue}
        />
      )}

      {page === 'tenues' && (
        <PageTenues
          outfits={outfits}
          onDelete={deleteOutfit}
          onToggleLike={toggleLikeOutfit}
        />
      )}

      {page === 'suggestions' && (
        <PageSuggestions garments={garments} />
      )}

      {page === 'univers' && (
        <PageUnivers
          garments={garments}
          outfits={outfits}
          profile={profile}
          onEditProfile={() => setShowProfilModal(true)}
        />
      )}

      <MobileNav activePage={page} onNav={setPage} />

      {showAddModal && (
        <AddModal
          onClose={() => setShowAddModal(false)}
          onSave={(g) => { addGarment(g); setShowAddModal(false) }}
        />
      )}

      {showProfilModal && (
        <ProfilModal
          profile={profile}
          onClose={() => setShowProfilModal(false)}
          onSave={saveProfile}
        />
      )}

      {showSaveTenueModal && (
        <SaveTenueModal
          onClose={() => setShowSaveTenueModal(false)}
          onSave={(name, occasion) => confirmSaveTenue(name, occasion)}
        />
      )}
    </>
  )
}