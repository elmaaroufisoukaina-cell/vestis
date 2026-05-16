import React from 'react';
import SidebarProfile from '../univers/SidebarProfile';
import FeedGrid       from '../univers/FeedGrid';
import StoriesBar     from '../univers/StoriesBar';
import { useStore }   from '../../hooks/useStore';

export default function PageUnivers() {
  const { garments, outfits } = useStore();

  return (
   
    <div className="page active" style={{ paddingTop: 64 }}>
      <div className="univers-root">

        {/* ── Sidebar gauche ── */}
        <div className="univers-sidebar">
          <SidebarProfile
            garmentCount={garments.length}
            outfitCount={outfits.length}
          />
        </div>

        {/* ── Feed principal ── */}
        <div className="univers-main">

          {/* Stories */}
          <StoriesBar />

          {/* En-tête feed */}
          <div style={{
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            marginBottom: 16, padding: '0 2px'
          }}>
            
            
          </div>

          {/* Grille masonry */}
          <FeedGrid />

        </div>
      </div>
    </div>
  );
}