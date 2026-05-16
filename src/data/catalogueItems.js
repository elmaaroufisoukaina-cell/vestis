// src/data/catalogueItems.js

export const DEMO_GARMENTS = [
  { id: 'g1', name: 'Veste Cuir Noir',   category: 'vestes',      color: '#1a1a2e', img: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400&q=80' },
  { id: 'g2', name: 'Robe Soie Midi',    category: 'robes',       color: '#C084FC', img: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400&q=80' },
  { id: 'g3', name: 'Chemise Oversize',  category: 'hauts',       color: '#ffffff', img: 'https://images.unsplash.com/photo-1564257631407-4deb1f99d992?w=400&q=80' },
  { id: 'g4', name: 'Jean Slim Bleu',    category: 'bas',         color: '#4a4a6a', img: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=400&q=80' },
  { id: 'g5', name: 'Bottines Chelsea',  category: 'chaussures',  color: '#1a1a2e', img: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=400&q=80' },
  { id: 'g6', name: 'Blazer Camel',      category: 'vestes',      color: '#E8C4A0', img: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=400&q=80' },
  { id: 'g7', name: 'Sac Structuré',     category: 'accessoires', color: '#1a1a2e', img: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=400&q=80' },
  { id: 'g8', name: 'Top Crop Noir',     category: 'hauts',       color: '#1a1a2e', img: 'https://images.unsplash.com/photo-1586363104862-3a5e2ab60d99?w=400&q=80' },
];

export const CATALOGUE_ITEMS = [
  // ── HAUTS ──
  { id: 'cat_h8',  name: 'Blouse à Volants Ciel',           category: 'hauts',       src: 'hauts-items/Blouse-a-Volants-Ciel.png' },
  { id: 'cat_h9',  name: 'Top Péplum Sculptural',           category: 'hauts',       src: 'hauts-items/Top-Peplum-Sculptural.png' },
  { id: 'cat_h10', name: 'Top Sophistiqué Bordeaux',        category: 'hauts',       src: 'hauts-items/Top-Sophistique-Bordeaux.png' },
  { id: 'cat_h1',  name: 'Cardigan Marine',                 category: 'hauts',       src: 'hauts-items/haut_cardigan_marine.png' },
  { id: 'cat_h2',  name: 'Top Drapé Marron',                category: 'hauts',       src: 'hauts-items/haut_top_drappe_marron.png' },
  { id: 'cat_h3',  name: 'Chemisier Violet',                category: 'hauts',       src: 'hauts-items/haut_chemisier_violet.png' },
  { id: 'cat_h4',  name: 'Cardigan Mauve',                  category: 'hauts',       src: 'hauts-items/haut_cardigan_mauve.png' },
  { id: 'cat_h5',  name: 'T-Shirt Gris',                    category: 'hauts',       src: 'hauts-items/haut_tshirt_gris.png' },
  { id: 'cat_h6',  name: 'Chemise Blanc',                   category: 'hauts',       src: 'hauts-items/haut_chemise_blanc.png' },
  { id: 'cat_h7',  name: 'Pull Noir Dentelle',              category: 'hauts',       src: 'hauts-items/haut_pull_noir_dentelle.png' },
  // ── BAS ──
  { id: 'cat_b9',  name: 'Jupe Midi Plissée Bleue Marine',  category: 'bas',         src: 'bas-items/Jupe-Midi-Plissee-bleuemarine.png' },
  { id: 'cat_b10', name: 'Jupe Portefeuille Drapée',        category: 'bas',         src: 'bas-items/Jupe-Portefeuille-Drapee.png' },
  { id: 'cat_b1',  name: 'Jupe Blanche',                    category: 'bas',         src: 'bas-items/bas-jupe-blanche.png' },
  { id: 'cat_b2',  name: 'Jupe Satin',                      category: 'bas',         src: 'bas-items/bas-jupe-satin.png' },
  { id: 'cat_b3',  name: 'Jean Large Clair',                category: 'bas',         src: 'bas-items/bas_jean_large_clair.png' },
  { id: 'cat_b4',  name: 'Pantalon Beige',                  category: 'bas',         src: 'bas-items/bas_pantalon_beige.png' },
  { id: 'cat_b5',  name: 'Pantalon Cargo',                  category: 'bas',         src: 'bas-items/bas_pantalon_cargo.png' },
  { id: 'cat_b6',  name: 'Pantalon Gris',                   category: 'bas',         src: 'bas-items/bas_pantalon_gris.png' },
  { id: 'cat_b7',  name: 'Pantalon Noir',                   category: 'bas',         src: 'bas-items/bas_pantalon_noir.png' },
  { id: 'cat_b8',  name: 'Jean Bleu',                       category: 'bas',         src: 'bas-items/bas_jean_bleu.png' },
  // ── ROBES ──
  { id: 'cat_r8',  name: 'Robe de Soirée Émeraude',         category: 'robes',       src: 'robes et ensembles/Robe-de-Soiree-Emeraude.png' },
  { id: 'cat_r3',  name: 'Robe Black & White',              category: 'robes',       src: 'robes et ensembles/robe-black&white.png' },
  { id: 'cat_r10', name: 'Robe Longue Bleue Ciel',          category: 'robes',       src: 'robes et ensembles/Robe-Longue-Bleueciel.png' },
  { id: 'cat_r1',  name: 'Ensemble Blanc',                  category: 'robes',       src: 'robes et ensembles/ensemble-blanc.png' },
  { id: 'cat_r2',  name: 'Ensemble Bleu Marine',            category: 'robes',       src: 'robes et ensembles/ensemble-bleumarine.png' },
  { id: 'cat_r9',  name: 'Robe de Gala Monoépaule',         category: 'robes',       src: 'robes et ensembles/Robe-de-Gala-Monopaule.png' },
  { id: 'cat_r4',  name: 'Robe Longue Bordeaux',            category: 'robes',       src: 'robes et ensembles/robe_longue_bordeaux.png' },
  { id: 'cat_r5',  name: 'Combinaison Beige',               category: 'robes',       src: 'robes et ensembles/tenue_combinaison_beige.png' },
  { id: 'cat_r6',  name: 'Robe Cocktail Violet',            category: 'robes',       src: 'robes et ensembles/robe_cocktail_violet.png' },
  { id: 'cat_r7',  name: 'Robe Satin Bleue',                category: 'robes',       src: 'robes et ensembles/robe_satin_bleu.png' },
  // ── VESTES ──
  { id: 'cat_v9',  name: 'Veste de Tailleur Structurée',    category: 'vestes',      src: 'veste et manteaux/Veste-de-Tailleur-Structuree.png' },
  { id: 'cat_v10', name: 'Blazer Croisé Rose Poudré',       category: 'vestes',      src: 'veste et manteaux/Blazer-Croise-Rose-Poudre.png' },
  { id: 'cat_v1',  name: 'Veste Fourrure Bordeaux',         category: 'vestes',      src: 'veste et manteaux/veste_fourrure_bordeaux.png' },
  { id: 'cat_v2',  name: 'Veste Cuir Bordeaux',             category: 'vestes',      src: 'veste et manteaux/veste_cuir_bordeaux.png' },
  { id: 'cat_v3',  name: 'Veste Aviateur Gris',             category: 'vestes',      src: 'veste et manteaux/veste_aviateur_gris.png' },
  { id: 'cat_v4',  name: 'Blazer Bleu',                     category: 'vestes',      src: 'veste et manteaux/veste_blazer_bleu.png' },
  { id: 'cat_v5',  name: 'Hoodie Gris',                     category: 'vestes',      src: 'veste et manteaux/haut_hoodie_gris.png' },
  { id: 'cat_v6',  name: 'Trench Beige',                    category: 'vestes',      src: 'veste et manteaux/manteau_trench_beige.png' },
  { id: 'cat_v7',  name: 'Manteau Noir',                    category: 'vestes',      src: 'veste et manteaux/manteau_noir.png' },
  { id: 'cat_v8',  name: 'Perfecto Noir',                   category: 'vestes',      src: 'veste et manteaux/veste_perfecto_noir.png' },
  // ── CHAUSSURES ──
  { id: 'cat_c7',  name: 'Sandales Dorées Nœud Marin',      category: 'chaussures',  src: 'chaussures/Sandales-Dorees-Noeud-Marin.png' },
  { id: 'cat_c8',  name: 'Mules H Rose Dragée',             category: 'chaussures',  src: 'chaussures/Mules-H-Rose-Dragee.png' },
  { id: 'cat_c9',  name: 'Baskets Montantes Classiques',    category: 'chaussures',  src: 'chaussures/Baskets-Montantes-Classiques.png' },
  { id: 'cat_c10', name: 'Escarpins Bordeaux Stiletto',     category: 'chaussures',  src: 'chaussures/Escarpins-bordeaux-Stiletto.png' },
  { id: 'cat_c1',  name: 'Mary Jane Bordeaux',              category: 'chaussures',  src: 'chaussures/chaussure_maryjane_bordeaux.png' },
  { id: 'cat_c2',  name: 'Talon Noir',                      category: 'chaussures',  src: 'chaussures/chaussure_talon_noir.png' },
  { id: 'cat_c3',  name: 'Escarpin Beige',                  category: 'chaussures',  src: 'chaussures/chaussure_escarpin_beige.png' },
  { id: 'cat_c4',  name: 'Basket Blanc',                    category: 'chaussures',  src: 'chaussures/chaussure_basket_blanc.png' },
  { id: 'cat_c5',  name: 'Basket Noir',                     category: 'chaussures',  src: 'chaussures/chaussure_basket_noir.png' },
  { id: 'cat_c6',  name: 'Bottine Noir',                    category: 'chaussures',  src: 'chaussures/chaussure_bottine_noir.png' },
  // ── ACCESSOIRES ──
  { id: 'cat_a8',  name: 'Pochette Nuage Argent Métallisé', category: 'accessoires', src: 'accessoires/Pochette-Nuage-Argent-Metallise.png' },
  { id: 'cat_a9',  name: 'Carré de Soie Rayé Marine',       category: 'accessoires', src: 'accessoires/Carre-de-Soie-Raye-Marine.png' },
  { id: 'cat_a10', name: 'Montre Octogonale Or et Rose',    category: 'accessoires', src: 'accessoires/Montre-Octogonale-Or-et-Rose.png' },
  { id: 'cat_a1',  name: 'Bracelets',                       category: 'accessoires', src: 'accessoires/bracelets.png' },
  { id: 'cat_a5',  name: 'Sac Hobo Rouge',                  category: 'accessoires', src: 'accessoires/accessoire_sac_hobo_rouge.png' },
  { id: 'cat_a3',  name: 'Ceinture Cuir',                   category: 'accessoires', src: 'accessoires/accessoire_ceintures_cuir.png' },
  { id: 'cat_a4',  name: 'Lunettes Noir',                   category: 'accessoires', src: 'accessoires/accessoire_lunettes_noir.png' },
  { id: 'cat_a2',  name: "Boucles d'Oreilles",              category: 'accessoires', src: "accessoires/boucles-d'oreilles.png" },
  { id: 'cat_a6',  name: 'Sac Marron',                      category: 'accessoires', src: 'accessoires/accessoire_sac_marron.png' },
  { id: 'cat_a7',  name: 'Montre Noir',                     category: 'accessoires', src: 'accessoires/accessoire_montre_noir.png' },
];

export const UNIVERS_USERS = [
  { id:'u1', initials:'GH', grad:'linear-gradient(135deg,#00F0FF,#C084FC)', nameColor:'#00F0FF', username:'ghita_style',  caption:'Dilemme du soir : Bleumarine ou Bordeaux ?',          h:306, img:'photo1.png',  likes:47,  comments:12 },
  { id:'u2', initials:'AD', grad:'linear-gradient(135deg,#7C3AED,#00F0FF)', nameColor:'#C084FC', username:'adam_looks',   caption:'Blanc et beige, le confort avant tout.',              h:256, img:'photo2.jpeg', likes:31,  comments:8  },
  { id:'u3', initials:'IN', grad:'linear-gradient(135deg,#C084FC,#FF6B9D)', nameColor:'#FF6B9D', username:'ines_maroc',   caption:'Détails dorés pour rehausser le blazer. Chic & Pro.', h:340, img:'photo3.jpeg', likes:82,  comments:21 },
  { id:'u4', initials:'LY', grad:'linear-gradient(135deg,#00F0FF,#7C3AED)', nameColor:'#00F0FF', username:'lyna.mode',    caption:"L'uniforme parfait : Blazer, sneakers et café.",       h:304, img:'photo4.jpeg', likes:63,  comments:15 },
  { id:'u5', initials:'AN', grad:'linear-gradient(135deg,#C084FC,#00F0FF)', nameColor:'#C084FC', username:'anis_benali',  caption:'Streetstyle du jour. Simple & Clean.',                h:368, img:'photo5.jpeg', likes:29,  comments:6  },
  { id:'u6', initials:'YA', grad:'linear-gradient(135deg,#FF6B9D,#C084FC)', nameColor:'#FF6B9D', username:'yasmine.art',  caption:'Une touche de rouge pour réveiller le bleu.',         h:272, img:'photo6.jpeg', likes:95,  comments:33 },
  { id:'u7', initials:'NH', grad:'linear-gradient(135deg,#7C3AED,#C084FC)', nameColor:'#C084FC', username:'nour_huda',    caption:'Coup de cœur pour ce sac bleu ciel !',               h:416, img:'photo7.jpeg', likes:118, comments:44 },
  { id:'u8', initials:'RY', grad:'linear-gradient(135deg,#00F0FF,#FF6B9D)', nameColor:'#00F0FF', username:'rym.fashion',  caption:"Le cuir noir, l'indémodable de mes soirées.",         h:312, img:'photo8.jpeg', likes:74,  comments:19 },
  { id:'u9', initials:'SV', grad:'linear-gradient(135deg,#FF6B9D,#7C3AED)', nameColor:'#FF6B9D', username:'sarah_v',      caption:'Beige addict. La veste parfaite existe.',             h:344, img:'photo9.jpeg', likes:42,  comments:11 },
];

export const STORIES = [
  { username: 'adam_looks', initials: 'AD', img: 'adam.jpeg',  grad: 'linear-gradient(135deg,#00C6FF,#0072FF)', isMale: true  },
  { username: 'ines_maroc', initials: 'IN', img: 'ines.jpeg',  grad: 'linear-gradient(135deg,#FF6B9D,#C084FC)', isMale: false },
  { username: 'lyna.mode',  initials: 'LY', img: 'lyna.jpeg',  grad: 'linear-gradient(135deg,#C084FC,#FF6B9D)', isMale: false },
];

export const WEATHER_ICONS = {
  0:'☀️', 1:'🌤', 2:'⛅', 3:'☁️', 45:'🌫', 48:'🌫',
  51:'🌦', 61:'🌧', 71:'❄️', 80:'🌧', 95:'⛈',
};
export const WEATHER_DESC = {
  0:'Ciel dégagé', 1:'Peu nuageux', 2:'Partiellement nuageux', 3:'Couvert',
  45:'Brouillard', 51:'Bruine légère', 61:'Pluie légère',
  71:'Neige', 80:'Averses', 95:'Orage',
};