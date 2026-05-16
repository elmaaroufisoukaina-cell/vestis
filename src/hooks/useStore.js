import { useState, useEffect } from 'react';

export function useStore() {
  const [garments, setGarments] = useState(() => {
    const saved = localStorage.getItem('vestis_garments');
    return saved ? JSON.parse(saved) : [];
  });

  const [outfits, setOutfits] = useState(() => {
    const saved = localStorage.getItem('vestis_outfits');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('vestis_garments', JSON.stringify(garments));
    localStorage.setItem('vestis_outfits',  JSON.stringify(outfits));
  }, [garments, outfits]);

  const addGarment = (item) => {
    const newG = { ...item, id: `g_${Date.now()}`, category: item.category || 'hauts' };
    setGarments(prev => [newG, ...prev]);
    return newG;
  };

  const deleteGarment = (id) => setGarments(prev => prev.filter(g => g.id !== id));

  const uploadImage = async (file) => (file ? URL.createObjectURL(file) : null);

  // ── Outfits ────────────────────────────────────────────────────────────────

  const addOutfit = (outfit) => {
    const newO = { ...outfit, id: `o_${Date.now()}` };
    setOutfits(prev => [newO, ...prev]);
    return newO;
  };

  const deleteOutfit = (id) => setOutfits(prev => prev.filter(o => o.id !== id));

  const toggleLikeOutfit = (id) =>
    setOutfits(prev => prev.map(o => o.id === id ? { ...o, liked: !o.liked } : o));

  const generateAISuggestion = () => {
    if (garments.length < 2) return null;
    const tops    = garments.filter(g => g.category.includes('haut'));
    const bottoms = garments.filter(g => g.category.includes('bas'));
    const sTop    = tops[Math.floor(Math.random() * tops.length)]       || garments[0];
    const sBottom = bottoms[Math.floor(Math.random() * bottoms.length)] || garments[1];
    return { id: `ai_${Date.now()}`, items: [sTop, sBottom] };
  };

  return {
    garments,
    outfits,
    addGarment,
    deleteGarment,
    uploadImage,
    addOutfit,
    deleteOutfit,
    toggleLikeOutfit,
    generateAISuggestion,
  };
}