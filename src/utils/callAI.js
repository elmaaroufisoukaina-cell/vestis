// src/utils/callAI.js
// ✅ Version prototype — génération locale sans API
// Picks outfits from saved dressing items (falls back to catalogue if empty)

import { CATALOGUE_ITEMS } from '../data/catalogueItems.js';

// ── helpers ───────────────────────────────────────────────────────────────────

function pick(arr) {
  if (!arr || !arr.length) return null;
  return arr[Math.floor(Math.random() * arr.length)];
}

// Pick from saved garments for a category.
// Falls back to full catalogue if the user has nothing saved in that category.
function byCat(cat, garments) {
  const saved = (garments || []).filter(i => i.category === cat);
  if (saved.length) return saved;
  return CATALOGUE_ITEMS.filter(i => i.category === cat);
}

// Filter a category by regex, pick random match, fallback to any in category
function pickFrom(cat, garments, regex) {
  const pool = byCat(cat, garments);
  const matched = pool.filter(i => regex.test((i.src || i.img || i.name || '').toLowerCase()));
  return pick(matched.length ? matched : pool);
}

function buildOutfit({ haut, bas, veste, chaussures, accessoire, description }) {
  return { haut, bas, veste, chaussures, accessoire, description };
}

// ── Mood ──────────────────────────────────────────────────────────────────────

function outfitForMood(mood, garments) {
  const g = garments;
  switch (mood) {
    case 'Casual':
      return buildOutfit({
        haut:       pickFrom('hauts',       g, /cardigan|tshirt|chemise|top/),
        bas:        pickFrom('bas',         g, /jean|cargo/),
        veste:      pickFrom('vestes',      g, /hoodie|blazer|perfecto/),
        chaussures: pickFrom('chaussures',  g, /basket/),
        accessoire: pickFrom('accessoires', g, /bracelets|lunettes/),
        description: "Un look casual décontracté ☕ — confort et style au quotidien. Parfait pour une journée en ville ou entre amis.",
      });
    case 'Business':
      return buildOutfit({
        haut:       pickFrom('hauts',       g, /chemise|chemisier|sophistique/),
        bas:        pickFrom('bas',         g, /pantalon/),
        veste:      pickFrom('vestes',      g, /blazer|tailleur/),
        chaussures: pickFrom('chaussures',  g, /escarpin|talon|stiletto/),
        accessoire: pickFrom('accessoires', g, /montre|ceinture/),
        description: "Un look business élégant 💼 — autorité et raffinement. Idéal pour les réunions, présentations ou journées au bureau.",
      });
    case 'Soirée':
      return buildOutfit({
        haut:       pickFrom('robes',       g, /soiree|gala|satin|cocktail/),
        bas:        null,
        veste:      pickFrom('vestes',      g, /blazer|croise|rose|tailleur/),
        chaussures: pickFrom('chaussures',  g, /stiletto|talon|escarpin/),
        accessoire: pickFrom('accessoires', g, /pochette|montre|boucles/),
        description: "Un look soirée sublime 🌙 — glamour et mystère. Pour briller lors d'un dîner, une soirée ou un événement spécial.",
      });
    case 'Sport':
      return buildOutfit({
        haut:       pickFrom('hauts',       g, /tshirt/),
        bas:        pickFrom('bas',         g, /jean|cargo|pantalon/),
        veste:      pickFrom('vestes',      g, /hoodie/),
        chaussures: pickFrom('chaussures',  g, /basket/),
        accessoire: pickFrom('accessoires', g, /bracelets/),
        description: "Un look sport dynamique ⚽ — mobilité et style. Parfait pour le sport, une promenade ou un look streetwear.",
      });
    case 'Voyage':
      return buildOutfit({
        haut:       pickFrom('hauts',       g, /cardigan|chemise|blouse/),
        bas:        pickFrom('bas',         g, /pantalon_beige|jean/),
        veste:      pickFrom('vestes',      g, /trench|aviateur|hoodie/),
        chaussures: pickFrom('chaussures',  g, /basket|montantes/),
        accessoire: pickFrom('accessoires', g, /sac|carre/),
        description: "Un look voyage pratique ✈️ — style et confort sur la route. Léger, polyvalent, parfait pour explorer.",
      });
    default:
      return outfitForMood('Casual', garments);
  }
}

// ── Weather ───────────────────────────────────────────────────────────────────

function outfitForWeather(temp, description, garments) {
  const g = garments;
  const isCold  = temp < 10;
  const isCool  = temp >= 10 && temp < 18;
  const isWarm  = temp >= 18 && temp < 25;
  const isRainy = /pluie|bruine|averse|orage/i.test(description);

  if (isCold || isRainy) return buildOutfit({
    haut:       pickFrom('hauts',       g, /cardigan|pull|chemisier/),
    bas:        pickFrom('bas',         g, /pantalon/),
    veste:      pickFrom('vestes',      g, /manteau|trench|fourrure|aviateur/),
    chaussures: pickFrom('chaussures',  g, /bottine|maryjane|talon/),
    accessoire: pickFrom('accessoires', g, /carre|ceinture/),
    description: `Par ${temp}°C${isRainy ? ' et ' + description.toLowerCase() : ''} 🧥 — on mise sur les couches chaudes. Manteau, pull et bottines pour affronter la météo avec style.`,
  });

  if (isCool) return buildOutfit({
    haut:       pickFrom('hauts',       g, /cardigan|chemisier|chemise/),
    bas:        pickFrom('bas',         g, /jean|pantalon/),
    veste:      pickFrom('vestes',      g, /blazer|perfecto|hoodie/),
    chaussures: pickFrom('chaussures',  g, /bottine|basket|talon/),
    accessoire: pickFrom('accessoires', g, /bracelets|montre/),
    description: `${temp}°C — une veste légère suffit 🌤 Blazer ou perfecto sur un jean, look urbain parfait pour cette journée fraîche.`,
  });

  if (isWarm) return buildOutfit({
    haut:       pickFrom('hauts',       g, /blouse|top|tshirt/),
    bas:        pickFrom('bas',         g, /jupe|jean/),
    veste:      null,
    chaussures: pickFrom('chaussures',  g, /sandales|mules|escarpin/),
    accessoire: pickFrom('accessoires', g, /boucles|lunettes|bracelets/),
    description: `${temp}°C et ${description.toLowerCase()} ☀️ — temps idéal ! Top léger avec une jupe et des sandales pour profiter de cette belle journée.`,
  });

  return buildOutfit({
    haut:       pickFrom('hauts',       g, /blouse|top|tshirt/),
    bas:        pickFrom('bas',         g, /jupe/),
    veste:      null,
    chaussures: pickFrom('chaussures',  g, /sandales|mules/),
    accessoire: pickFrom('accessoires', g, /lunettes|boucles/),
    description: `${temp}°C — il fait chaud ! 🌞 On mise sur la légèreté : top aéré, jupe fluide et sandales. Lunettes de soleil obligatoires !`,
  });
}

// ── Colors ────────────────────────────────────────────────────────────────────

const COLOR_KEYWORDS = {
  'noir profond':    ['noir', 'black', 'perfecto', 'pull', 'talon', 'montre'],
  'blanc':           ['blanc', 'white', 'chemise', 'basket_blanc'],
  'cyan électrique': ['bleu', 'marine', 'ciel', 'jean'],
  'violet lavande':  ['violet', 'mauve', 'cardigan_mauve', 'chemisier_violet'],
  'rose vif':        ['rose', 'poudre', 'dragee', 'blazer_croise'],
  'beige camel':     ['beige', 'camel', 'trench', 'combinaison'],
  'gris ardoise':    ['gris', 'aviateur', 'hoodie', 'pantalon_gris'],
  'vert sauge':      ['vert', 'sauge'],
  'jaune miel':      ['jaune', 'miel'],
  'rouge bordeaux':  ['bordeaux', 'rouge', 'fourrure', 'cuir', 'longue_bordeaux', 'maryjane'],
};

function outfitForColors(selectedColors, garments) {
  const keywords = selectedColors.flatMap(c => COLOR_KEYWORDS[c] || []);
  function matchCat(cat) {
    const pool = byCat(cat, garments);
    const matched = pool.filter(i =>
      keywords.some(k => (i.src || i.img || i.name || '').toLowerCase().includes(k))
    );
    return pick(matched.length ? matched : pool);
  }
  return buildOutfit({
    haut:       matchCat('hauts'),
    bas:        matchCat('bas'),
    veste:      matchCat('vestes'),
    chaussures: matchCat('chaussures'),
    accessoire: matchCat('accessoires'),
    description: `Une palette ${selectedColors.join(', ')} 🎨 — harmonie des teintes et jeu de matières pour un look cohérent et personnel.`,
  });
}

// ── Constructeur ──────────────────────────────────────────────────────────────

function analyzeConstructeur(slots) {
  const filled = Object.values(slots).filter(Boolean);
  const names  = filled.map(g => g.name).join(', ');
  const src    = filled.map(g => (g.src || g.img || '')).join(' ').toLowerCase();
  const occasions = [];
  if (/soiree|gala|satin|cocktail|bordeaux|stiletto/i.test(src)) occasions.push('soirée');
  if (/blazer|tailleur|chemise|pantalon/i.test(src))             occasions.push('business');
  if (/basket|hoodie|jean|cargo|tshirt/i.test(src))              occasions.push('casual');
  const occasion = occasions[0] || 'quotidien';
  return `✨ Tenue analysée : ${names}.\n\nCette combinaison est idéale pour un look ${occasion}. Les pièces se complètent bien. Pour sublimer ce look, pensez à jouer sur les accessoires — une montre élégante ou un sac structuré feront toute la différence.`;
}

// ── Shopping ──────────────────────────────────────────────────────────────────

function analyzeShopping(garments) {
  const cats = new Set(garments.map(g => g.category));
  const missing = [];
  if (!cats.has('chaussures'))  missing.push('👠 Chaussures — indispensables pour compléter chaque tenue.');
  if (!cats.has('accessoires')) missing.push('💎 Accessoires — la touche finale qui fait tout.');
  if (!cats.has('vestes'))      missing.push('🧥 Vestes/Manteaux — pour les journées fraîches et les looks superposés.');
  if (!cats.has('robes'))       missing.push('👗 Robes — pour les occasions spéciales et les soirées.');
  if (!cats.has('bas'))         missing.push('👖 Bas — pantalons et jupes pour varier les silhouettes.');
  if (!missing.length) {
    missing.push('🛍 Blazer structuré — polyvalent du dressing, parfait business ou casual.');
    missing.push('👟 Baskets blanches — la pièce incontournable du style moderne.');
    missing.push("👜 Sac neutre — beige ou noir, il s'adapte à tout.");
    missing.push('🕶 Lunettes de soleil — accessoire mode et pratique.');
    missing.push('🧣 Carré de soie — pour une touche de chic français instantanée.');
  }
  return `🔍 Analyse de votre dressing (${garments.length} pièces)\n\n**Pièces à ajouter en priorité :**\n\n${missing.slice(0, 5).join('\n\n')}`;
}

// ── Valise ────────────────────────────────────────────────────────────────────

function analyzeValise(dest, days, temp) {
  const isHot  = temp >= 22;
  const isCold = temp < 12;
  const hauts      = isHot  ? ['Top léger ×2', 'Blouse aérée ×1', 'T-shirt ×2']
                   : isCold ? ['Pull chaud ×2', 'Chemise ×1', 'Cardigan ×1']
                   :          ['T-shirt ×2', 'Chemisier ×1', 'Top ×1'];
  const bas        = ['Jean slim ×1', 'Pantalon confort ×1', days > 5 ? 'Jupe ×1' : null].filter(Boolean);
  const vestes     = isCold ? ['Manteau ×1', 'Hoodie ×1'] : ['Blazer léger ×1'];
  const chaussures = isHot  ? ['Sandales ×1', 'Baskets ×1'] : ['Bottines ×1', 'Baskets ×1'];
  const accesso    = ['Lunettes de soleil', 'Sac polyvalent', 'Bracelets', days > 7 ? 'Carré de soie' : null].filter(Boolean);
  return `🧳 Valise pour ${dest} — ${days} jours à ${temp}°C\n\n👚 Hauts : ${hauts.join(', ')}\n\n👖 Bas : ${bas.join(', ')}\n\n🧥 Vestes : ${vestes.join(', ')}\n\n👠 Chaussures : ${chaussures.join(', ')}\n\n💎 Accessoires : ${accesso.join(', ')}\n\n💡 Conseil : misez sur des pièces neutres et polyvalentes pour maximiser les combinaisons !`;
}

// ── Main export ───────────────────────────────────────────────────────────────

export async function callAI(prompt) {
  await new Promise(r => setTimeout(r, 600));
  const g = prompt.garments || [];

  if (prompt.__type === 'mood')         return outfitForMood(prompt.mood, g);
  if (prompt.__type === 'weather')      return outfitForWeather(prompt.temp, prompt.description, g);
  if (prompt.__type === 'colors')       return outfitForColors(prompt.colors, g);
  if (prompt.__type === 'constructeur') return analyzeConstructeur(prompt.slots);
  if (prompt.__type === 'shopping')     return analyzeShopping(g);
  if (prompt.__type === 'valise')       return analyzeValise(prompt.dest, prompt.days, prompt.temp);

  return 'Suggestion générée ✨';
}