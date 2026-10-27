  // ===== COSMETICOS EXTRAS (cabeca, rosto, boca, costas) — 40+ por categoria =====
  const COSX = { top: {}, topCover: {}, mid: {}, low: {}, back: {}, eyes: {}, marks: {} }, CAT = { top: [], mid: [], low: [], back: [], eyes: [] };
  const C3 = (v) => hx(v);
  const regT = (id, name, rar, fn, cover) => { COSX.top[id] = fn; COSX.topCover[id] = !!cover; CAT.top.push([id, name, rar]); };
  const regL = (id, name, rar, fn, mark) => { COSX.low[id] = fn; if (mark) COSX.marks[id] = mark; CAT.low.push([id, name, rar]); };
  const regM = (id, name, rar, fn, mark) => { COSX.mid[id] = fn; if (mark) COSX.marks[id] = mark; CAT.mid.push([id, name, rar]); };
  const regB = (id, name, rar, fn, flags) => { COSX.back[id] = { fn, ...(flags || {}) }; CAT.back.push([id, name, rar]); };
  const regE = (id, name, rar, col, pat, col2) => { COSX.eyes[id] = { col, pat: pat || 0, col2: col2 == null ? null : col2 }; CAT.eyes.push([id, name, rar]); };
  // ---------- CABEÇA (topo) ----------
  const dome = (E, S, o, c, c2, trim, extra = {}) => { // elmo nórdico: calota, aro, nasal e bochechas
    const { hy, hz } = o;
    E({ x: 0, y: hy - 5, z: hz - .2, rx: 9.4, ry: 8.2, rz: 9.4, p: 3.6, col: c, metal: 1, tex: (mx, my, mz) => { if (mz > 0 && my > .3) return null; if (my > .2 && mz <= 0) return null; if (Math.abs(mx) < .07) return c2; if (my > -.05 && my < .3 && mz > 0) return trim; return Math.sin(mx * 14 + my * 6) > .93 ? c2 : 0; } });
    E({ x: 0, y: hy - 6, z: hz + .2, rx: 9.9, ry: 1, rz: 10, p: 3.6, col: trim, metal: 1 });
    S({ pts: [[0, hy - 5.6, hz + 9], [0, hy + 2.4, hz + 9.6]], w: 1.6, col: c, metal: 1 });
    for (const sg of [-1, 1]) E({ x: sg * 8.2, y: hy + 1, z: hz + 1, rx: 1.5, ry: 4.4, rz: 5, p: 3.2, col: c, metal: 1, tex: (mx, my) => Math.abs(my) > .86 ? trim : 0 });
    if (extra.crest) S({ pts: [[0, hy - 11, hz + 8], [0, hy - 16.5, hz + 1], [0, hy - 14, hz - 8]], w: [2.2, 3.4, 2], col: extra.crest, metal: 1 });
  };
  const horn = (S, o, col, big = 1) => { const { hy, hz } = o; for (const sg of [-1, 1]) S({ pts: [[sg * 9, hy - 6, hz], [sg * 13.2, hy - 8, hz], [sg * 14.6 * big, hy - 13 * big, hz + .5], [sg * 12.4 * big, hy - 18 * big, hz + 1]], w: [4.2, 1], col }); };
  const vh = (id, name, rar, c, c2, trim, crest, hornC) => regT(id, name, rar, (E, S, o) => { dome(E, S, o, C3(c), C3(c2), C3(trim), { crest: crest ? C3(crest) : null }); if (hornC) horn(S, o, C3(hornC)); }, 1);
  vh("xt_elmo_aco", "Elmo de Aço Nórdico", "uncommon", 0xcfd6e2, 0x9aa6bc, 0xc8a850, null);
  vh("xt_elmo_ouro", "Elmo Dourado do Jarl", "epic", 0xf0cc58, 0xc89a28, 0xfff0a8, 0xc83030);
  vh("xt_elmo_obsidiana", "Elmo de Obsidiana", "epic", 0x3a3a48, 0x24242e, 0x8a4ac8, 0x8a4ac8);
  vh("xt_elmo_gelo", "Elmo de Gelo Eterno", "epic", 0xbfe8ff, 0x7ab8e8, 0xeaf8ff, 0xeaf8ff);
  vh("xt_elmo_brasa", "Elmo de Brasa Viva", "epic", 0x6a2a20, 0x3a1410, 0xff8a28, 0xff6a20);
  vh("xt_chifres_bronze", "Elmo de Chifres de Bronze", "rare", 0xb8844a, 0x8a5e30, 0xe8c070, null, 0xf0e6c8);
  vh("xt_chifres_gelo", "Elmo de Chifres Boreal", "rare", 0xa8c8e8, 0x6a8ab8, 0xe8f6ff, null, 0xd8f0ff);
  vh("xt_chifres_negro", "Elmo de Chifres Sombrios", "epic", 0x2a2a34, 0x16161e, 0xb83a3a, 0xb83a3a, 0x6a2a2a);
  // chapéus de mago
  const wiz = (id, name, rar, cl, band, star) => regT(id, name, rar, (E, S, o) => { const { hy, hz, t } = o, c = C3(cl), c2 = dk(c, .78), bd = C3(band);
    E({ x: 0, y: hy - 6.2, z: hz, rx: 12.4, ry: 1.4, rz: 11.6, p: 3, col: c2 }); E({ x: 0, y: hy - 6.8, z: hz, rx: 9.2, ry: 1.2, rz: 9, p: 3, col: bd, metal: 1 });
    S({ pts: [[0, hy - 7, hz - .6], [0, hy - 14, hz - 2], [-2, hy - 20, hz - 4], [-6, hy - 22.4 + Math.sin(t * 3) * .5, hz - 5]], w: [10.4, 7.6, 4, 1.4], col: (q) => Math.sin(q * 26) > .7 ? lt(c, .16) : c });
    if (star) for (const [x, y, z] of [[-3.4, -10, 7.2], [3.4, -14, 6.2], [-1.4, -18, 4.6], [4, -8.4, 6]]) E({ x, y: hy + y, z: hz + z, rx: 1.3, ry: 1.3, rz: .7, col: C3(star), bias: .9 });
    E({ x: 0, y: hy - 7, z: hz + 9, rx: 2, ry: 1.7, rz: .8, col: C3(star || 0xfff0a0), metal: 1, bias: .4 }); });
  wiz("xt_mago_azul", "Chapéu do Mago Estrelado", "rare", 0x2a4a9a, 0xe8c040, 0xfff0a0);
  wiz("xt_mago_roxo", "Chapéu do Feiticeiro Rúnico", "rare", 0x5a2a8a, 0xc8a0ff, 0xd8b8ff);
  wiz("xt_mago_verde", "Chapéu da Bruxa da Floresta", "uncommon", 0x2a6a3a, 0xc8b858, 0xb8f0a0);
  wiz("xt_mago_carmesim", "Chapéu do Alquimista Carmesim", "epic", 0x9a2a2a, 0xe8c040, 0xffd0a0);
  // coroas
  const crownS = (id, name, rar, m, gem, n = 7, tall = 7) => regT(id, name, rar, (E, S, o) => { const { hy, hz } = o, c = C3(m);
    E({ x: 0, y: hy - 7.6, z: hz, rx: 9.2, ry: 1.9, rz: 8.8, p: 3.4, col: c, metal: 1 });
    for (let i = 0; i < n; i++) { const a = i / n * TAU + .4, x = Math.cos(a) * 8.4, z = Math.sin(a) * 8, h = i % 2 ? tall : tall * .72; S({ pts: [[x, hy - 8.4, hz + z], [x * 1.04, hy - 8.4 - h, hz + z * 1.04]], w: [3, .8], col: c, metal: 1 }); E({ x: x * 1.04, y: hy - 9.4 - h, z: hz + z * 1.04, rx: .9, ry: .9, rz: .9, col: C3(gem[i % gem.length]), bias: .7 }); }
    E({ x: 0, y: hy - 7.8, z: hz + 8.6, rx: 1.8, ry: 1.5, rz: 1, col: C3(gem[0]), bias: .8 }); });
  crownS("xt_coroa_jarl", "Coroa do Jarl", "epic", 0xf2c448, [0xff5a7a, 0x7ae8ff]);
  crownS("xt_coroa_prata", "Coroa de Prata Lunar", "epic", 0xdfe6f4, [0x9ad0ff, 0xffffff], 6, 9);
  crownS("xt_coroa_rubi", "Coroa de Rubis e Obsidiana", "legendary", 0x34343e, [0xff3a4a, 0xff7a3a], 8, 8);
  regT("xt_cervo", "Coroa de Galhos do Cervo", "epic", (E, S, o) => { const { hy, hz } = o, w = C3(0x7a5a34), w2 = C3(0xb89868);
    E({ x: 0, y: hy - 6.6, z: hz, rx: 9.6, ry: 1.4, rz: 9.2, p: 3, col: w });
    for (const sg of [-1, 1]) { S({ pts: [[sg * 6, hy - 7, hz - 1], [sg * 10, hy - 13, hz - 2], [sg * 11.4, hy - 20, hz - 2], [sg * 9, hy - 26, hz - 2]], w: [3, 1], col: w2 }); for (const [a, b] of [[.34, 5], [.62, 4.4], [.86, 3.4]]) S({ pts: [[sg * (6 + a * 5), hy - 7 - a * 19, hz - 2], [sg * (6 + a * 5 + b), hy - 11 - a * 19 - b * 1.2, hz - 1]], w: [1.8, .6], col: w2 }); } });
  regT("xt_cervo_espectral", "Galhos Espectrais", "legendary", (E, S, o) => { const { hy, hz, t } = o, w = C3(0x9ae8ff);
    for (const sg of [-1, 1]) { S({ pts: [[sg * 6, hy - 7, hz - 1], [sg * 10, hy - 13, hz - 2], [sg * 11.4, hy - 20, hz - 2], [sg * 9, hy - 27 + Math.sin(t * 2) * .6, hz - 2]], w: [2.6, .8], col: w, bias: .8 }); for (const [a, b] of [[.34, 5], [.62, 4.4], [.86, 3.4]]) S({ pts: [[sg * (6 + a * 5), hy - 7 - a * 20, hz - 2], [sg * (6 + a * 5 + b), hy - 11 - a * 20 - b * 1.2, hz - 1]], w: [1.5, .5], col: w, bias: .8 }); }
    for (let i = 0; i < 5; i++) { const u = (t * .5 + i * .2) % 1; E({ x: Math.sin(i * 3) * 8, y: hy - 8 - u * 16, z: hz - 2, rx: .7, ry: .7, rz: .7, col: C3(0xd8f8ff), bias: 1 }); } });
  regT("xt_coroa_gelo", "Coroa de Cristais de Gelo", "legendary", (E, S, o) => { const { hy, hz } = o; E({ x: 0, y: hy - 7.4, z: hz, rx: 9.2, ry: 1.4, rz: 8.8, p: 3, col: C3(0xa8d8f8), metal: 1 });
    for (let i = 0; i < 7; i++) { const a = i / 7 * TAU, x = Math.cos(a) * 8.4, z = Math.sin(a) * 8, h = 6 + (i % 3) * 3.4; S({ pts: [[x, hy - 8, hz + z], [x * 1.08, hy - 8 - h, hz + z * 1.08]], w: [3.2, .5], col: i % 2 ? C3(0xeaf8ff) : C3(0xa8d8f8), metal: 1 }); } });
  regT("xt_coroa_chama", "Coroa de Chamas", "legendary", (E, S, o) => { const { hy, hz, t } = o; E({ x: 0, y: hy - 7.4, z: hz, rx: 9.2, ry: 1.3, rz: 8.8, p: 3, col: C3(0x5a2a20), metal: 1 });
    for (let i = 0; i < 8; i++) { const a = i / 8 * TAU, x = Math.cos(a) * 8.4, z = Math.sin(a) * 8, h = 6 + Math.abs(Math.sin(t * 5 + i * 1.7)) * 5; S({ pts: [[x, hy - 8, hz + z], [x * 1.05 + Math.sin(t * 3 + i) * .8, hy - 8 - h, hz + z * 1.05]], w: [3.2, .6], col: (q) => q > .6 ? C3(0xffe070) : C3(0xff6a20), bias: .9 }); } });
  // louro e flores
  const wreathX = (id, name, rar, leaf, berry) => regT(id, name, rar, (E, S, o) => { const { hy, hz } = o; for (let i = 0; i < 22; i++) { const a = i / 22 * TAU, x = Math.cos(a) * 9.6, z = Math.sin(a) * 8.8; if (a > 1.2 && a < 1.95) continue; S({ pts: [[x, hy - 6.4, hz - .6 + z], [x * 1.12, hy - 7.6 + (i % 2) * -1, hz - .6 + z * 1.12]], w: [3, .6], col: i % 2 ? C3(leaf[0]) : C3(leaf[1]) }); } if (berry) for (let i = 0; i < 5; i++) { const a = 2.4 + i * .5; E({ x: Math.cos(a) * 10, y: hy - 6.6, z: hz - .6 + Math.sin(a) * 9.2, rx: 1.2, ry: 1.2, rz: 1.2, col: C3(berry), bias: .2 }); } });
  wreathX("xt_louro_ouro", "Louros Dourados", "epic", [0xf0c848, 0xc89a28], null);
  wreathX("xt_louro_verde", "Coroa de Louros", "uncommon", [0x4a9a3a, 0x6ac04a], 0xd23a3a);
  const flowers = (id, name, rar, cols) => regT(id, name, rar, (E, S, o) => { const { hy, hz } = o; for (let i = 0; i < 14; i++) { const a = i / 14 * TAU, x = Math.cos(a) * 9.5, z = Math.sin(a) * 8.8; E({ x, y: hy - 6.4, z: hz - .4 + z, rx: 1.7, ry: 1.3, rz: 1.7, p: 3, col: i % 3 === 0 ? C3(0x4a9a3a) : C3(cols[i % cols.length]) }); if (i % 3 !== 0) E({ x, y: hy - 7.2, z: hz - .4 + z, rx: .8, ry: .6, rz: .8, p: 3, col: C3(0xfff0a0), bias: .3 }); } });
  flowers("xt_flores_prado", "Coroa de Flores do Prado", "uncommon", [0xff9ac0, 0xffd860, 0xffffff, 0xff7a7a]);
  flowers("xt_flores_noite", "Coroa de Flores da Noite", "rare", [0x9ab8ff, 0xd8a0ff, 0xffffff, 0x7ad8ff]);
  // orelhas e chifrinhos
  regT("xt_gato", "Tiara de Orelhas de Gato", "rare", (E, S, o) => { const { hy, hz } = o; E({ x: 0, y: hy - 5.6, z: hz, rx: 9.6, ry: 1.2, rz: 9.2, p: 3, col: C3(0x2a2a34) }); for (const sg of [-1, 1]) { S({ pts: [[sg * 5, hy - 6, hz - 1], [sg * 6.4, hy - 12.4, hz - 2]], w: [5.4, .8], col: C3(0x3a3a46) }); S({ pts: [[sg * 5.2, hy - 6.6, hz - .4], [sg * 6, hy - 10.6, hz - 1.4]], w: [2.8, .5], col: C3(0xff9ab0) }); } });
  regT("xt_coelho", "Tiara de Orelhas de Coelho", "rare", (E, S, o) => { const { hy, hz, t } = o; E({ x: 0, y: hy - 5.6, z: hz, rx: 9.6, ry: 1.2, rz: 9.2, p: 3, col: C3(0xf4f0f0) }); for (const sg of [-1, 1]) { S({ pts: [[sg * 4, hy - 6, hz - 1], [sg * 5, hy - 15, hz - 2], [sg * 5.6 + Math.sin(t * 2) * .6, hy - 22, hz - 3]], w: [4, 2.8, 1.2], col: C3(0xf4f0f0) }); S({ pts: [[sg * 4.1, hy - 8, hz - .6], [sg * 5, hy - 15, hz - 1.4]], w: [1.8, 1.2], col: C3(0xffb0c0) }); } });
  regT("xt_diabrete", "Tiara de Chifrinhos Diabólicos", "rare", (E, S, o) => { const { hy, hz } = o; E({ x: 0, y: hy - 5.6, z: hz, rx: 9.6, ry: 1.2, rz: 9.2, p: 3, col: C3(0x2a1418) }); for (const sg of [-1, 1]) S({ pts: [[sg * 5, hy - 6, hz - 1], [sg * 7.4, hy - 10, hz - 1], [sg * 6, hy - 14, hz]], w: [3.4, .6], col: C3(0xc02a2a), metal: 1 }); });
  regT("xt_aureola", "Auréola das Plumas", "epic", (E, S, o) => { const { hy, hz, t } = o; for (let i = 0; i < 26; i++) { const a = i / 26 * TAU; E({ x: Math.cos(a) * 6.8, y: hy - 14.4 + Math.sin(a) * 1.1, z: hz - 3 + Math.sin(a) * 6.8, rx: .7, ry: .7, rz: .7, col: C3(0xfff0a0), bias: 1 }); }
    for (const sg of [-1, 1]) for (let i = 0; i < 4; i++) S({ pts: [[sg * 9, hy - 3 - i * .4, hz - 1], [sg * (13 + i * 2.4), hy - 6 - i * 2.6 + Math.sin(t * 3 + i) * .5, hz - 2], [sg * (16 + i * 2.8), hy - 3 - i * 3, hz - 3]], w: [3, .8], col: i % 2 ? C3(0xffffff) : C3(0xe8eef8) }); });
  // peles e capuzes
  regT("xt_gorro_lobo", "Gorro de Pele de Lobo", "rare", (E, S, o) => { const { hy, hz } = o, c = C3(0x8a8e98); E({ x: 0, y: hy - 5.4, z: hz - .4, rx: 10, ry: 7.2, rz: 10, p: 3, col: c, tex: (mx, my, mz) => Math.sin(mx * 20 + my * 9 + mz * 7) > .55 ? C3(0xc4c8d2) : (Math.sin(mx * 9 + mz * 11) < -.7 ? C3(0x62666e) : 0) }); E({ x: 0, y: hy - 3.4, z: hz, rx: 10.6, ry: 2.4, rz: 10.2, p: 3, col: C3(0xdcdce4) }); for (const sg of [-1, 1]) S({ pts: [[sg * 6, hy - 9, hz - 1], [sg * 7.4, hy - 14, hz - 1.4]], w: [4.6, 1], col: c }); }, 1);
  regT("xt_gorro_neve", "Gorro de Pele Branca", "uncommon", (E, S, o) => { const { hy, hz } = o; E({ x: 0, y: hy - 5.4, z: hz - .4, rx: 10, ry: 7.2, rz: 10, p: 3, col: C3(0xeef0f4), tex: (mx, my, mz) => Math.sin(mx * 20 + my * 9 + mz * 7) > .5 ? C3(0xffffff) : (Math.sin(mx * 9 + mz * 11) < -.7 ? C3(0xc4ccd8) : 0) }); for (const sg of [-1, 1]) S({ pts: [[sg * 8.6, hy - 2, hz + 1], [sg * 9.6, hy + 4, hz + 1.4]], w: [4, 2.4], col: C3(0xeef0f4) }); }, 1);
  const hoodX = (id, name, rar, c, trim, ears, beak) => regT(id, name, rar, (E, S, o) => { const { hy, hz } = o, cl = C3(c);
    E({ x: 0, y: hy - 1, z: hz - .8, rx: 9.8, ry: 11.2, rz: 9.8, p: 3.4, col: cl, tex: (mx, my, mz) => { const az = Math.atan2(mx, mz), el = Math.asin(clamp(my, -1, 1)); if (mz > 0 && Math.abs(mx) < .64 && my > -.36 && my < .6) return null; if (mz > .2 && Math.abs(az) < 1.12 && el > -.42 && el < 1 && (Math.abs(az) > .94 || el < -.3)) return C3(trim); return Math.sin(az * 12 + el * 4) > .74 ? lt(cl, .14) : 0; } });
    if (ears === 1) for (const sg of [-1, 1]) { S({ pts: [[sg * 6, hy - 8.4, hz - 1.4], [sg * 7.2, hy - 15, hz - 1.8]], w: [5, .8], col: cl }); S({ pts: [[sg * 6.1, hy - 9, hz - .6], [sg * 7, hy - 13.4, hz - 1]], w: [2.4, .5], col: C3(trim) }); }
    if (ears === 2) for (const sg of [-1, 1]) E({ x: sg * 6.8, y: hy - 9.6, z: hz - 1.6, rx: 2.8, ry: 2.4, rz: 1.6, p: 3, col: cl });
    if (beak) { S({ pts: [[0, hy - 7, hz + 8.6], [0, hy - 5, hz + 13.4], [0, hy - 2.4, hz + 12.6]], w: [3.6, .7], col: C3(0x14141a), metal: 1 }); for (let i = 0; i < 6; i++) S({ pts: [[(i - 2.5) * 2, hy - 10, hz - 2], [(i - 2.5) * 2.8, hy - 16 - (i % 2) * 2, hz - 4]], w: [2.6, .6], col: cl }); } }, 1);
  hoodX("xt_capuz_lobo", "Capuz do Lobo Cinzento", "rare", 0x6a6e78, 0xc8ccd6, 1);
  hoodX("xt_capuz_urso", "Capuz de Pele de Urso", "rare", 0x6a4a30, 0xb89868, 2);
  hoodX("xt_capuz_corvo", "Capuz do Corvo de Odin", "epic", 0x1e1c2c, 0x4a4a8a, 0, 1);
  hoodX("xt_capuz_sombra", "Capuz das Sombras", "rare", 0x2a2a3a, 0x6a4aa8, 0);
  // chapéus clássicos
  regT("xt_tricornio", "Tricórnio do Capitão", "epic", (E, S, o) => { const { hy, hz } = o; E({ x: 0, y: hy - 6.4, z: hz, rx: 12.8, ry: 1.4, rz: 11.6, p: 3.4, col: C3(0x2a2430) }); E({ x: 0, y: hy - 9.4, z: hz, rx: 8.4, ry: 3.6, rz: 8.2, p: 3.4, col: C3(0x2a2430) }); for (const [a, b] of [[0, 12.2], [1, 11.6], [-1, 11.6]]) E({ x: a * 8.4, y: hy - 8, z: hz + (a === 0 ? b - 1 : 0), rx: a === 0 ? 4 : 1.4, ry: 3.6, rz: a === 0 ? 1.4 : 5, p: 3, col: C3(0x2a2430) }); E({ x: 0, y: hy - 7, z: hz + 11, rx: 3.6, ry: 1, rz: .8, col: C3(0xe8c040), metal: 1 }); S({ pts: [[8, hy - 10, hz], [13, hy - 16, hz - 3], [16, hy - 20, hz - 6]], w: [2.6, .8], col: C3(0xc83030) }); });
  regT("xt_palha", "Chapéu de Palha do Viajante", "common", (E, S, o) => { const { hy, hz } = o; E({ x: 0, y: hy - 5.6, z: hz, rx: 14, ry: 1.2, rz: 13.4, p: 2.8, col: C3(0xd8b868), tex: (mx, my, mz) => Math.sin(Math.hypot(mx, mz) * 30) > .6 ? C3(0xb8964a) : 0 }); E({ x: 0, y: hy - 9, z: hz, rx: 8.2, ry: 4.2, rz: 8, p: 3, col: C3(0xd8b868) }); E({ x: 0, y: hy - 6.6, z: hz, rx: 8.6, ry: 1.2, rz: 8.4, p: 3, col: C3(0xb83a3a) }); });
  regT("xt_pena_bardo", "Chapéu do Bardo Viajante", "rare", (E, S, o) => { const { hy, hz } = o; E({ x: 0, y: hy - 6, z: hz - .2, rx: 9.8, ry: 6.4, rz: 9.6, p: 3.2, col: C3(0x6a3a8a) }); E({ x: 0, y: hy - 3.8, z: hz, rx: 13, ry: 1.4, rz: 11.6, p: 3, col: C3(0x4a2a66) }); S({ pts: [[6, hy - 9, hz + 1], [13, hy - 17, hz - 3], [19, hy - 24, hz - 7], [22, hy - 22, hz - 9]], w: [2.6, .8], col: C3(0xf4e0a0) }); S({ pts: [[6.4, hy - 9.4, hz + 1], [12, hy - 15, hz - 2]], w: [2, .8], col: C3(0xff7a9a) }); });
  regT("xt_valquiria", "Elmo Alado da Valquíria", "legendary", (E, S, o) => { const { hy, hz, t } = o; dome(E, S, o, C3(0xeef2fa), C3(0xb8c4dc), C3(0xf6d060), { crest: C3(0xf6d060) });
    for (const sg of [-1, 1]) for (let i = 0; i < 5; i++) S({ pts: [[sg * 9.6, hy - 3, hz], [sg * (13 + i * 2.2), hy - 6 - i * 2.2 + Math.sin(t * 2.4 + i) * .5, hz - 1], [sg * (15.6 + i * 2.8), hy - 3 - i * 2.8, hz - 2]], w: [3.2, .8], col: i % 2 ? C3(0xffffff) : C3(0xdce6f6) }); }, 1);
  regT("xt_circlet_safira", "Tiara de Safira", "rare", (E, S, o) => { const { hy, hz } = o; E({ x: 0, y: hy - 4.6, z: hz, rx: 9.8, ry: 1.1, rz: 9.4, p: 3, col: C3(0xdfe6f4), metal: 1 }); E({ x: 0, y: hy - 6, z: hz + 9.2, rx: 1.8, ry: 2.4, rz: 1, col: C3(0x4a8aff), bias: .8, metal: 1 }); for (const sg of [-1, 1]) E({ x: sg * 5.4, y: hy - 4.8, z: hz + 8, rx: 1, ry: 1.2, rz: .8, col: C3(0x9ad0ff), bias: .7 }); });
  regT("xt_circlet_rubi", "Tiara de Rubi", "rare", (E, S, o) => { const { hy, hz } = o; E({ x: 0, y: hy - 4.6, z: hz, rx: 9.8, ry: 1.1, rz: 9.4, p: 3, col: C3(0xf2c448), metal: 1 }); E({ x: 0, y: hy - 6, z: hz + 9.2, rx: 1.8, ry: 2.4, rz: 1, col: C3(0xff3a5a), bias: .8, metal: 1 }); });
  regT("xt_runas", "Faixa das Runas Brilhantes", "epic", (E, S, o) => { const { hy, hz, t } = o; E({ x: 0, y: hy - 4.6, z: hz, rx: 9.8, ry: 1.7, rz: 9.4, p: 3, col: C3(0x2a2438) }); for (let i = 0; i < 5; i++) { const a = -.7 + i * .35; E({ x: Math.sin(a) * 9.6, y: hy - 4.6, z: hz + Math.cos(a) * 9, rx: .8, ry: 1.1, rz: .5, col: C3(0x7ae8ff), bias: .6 + Math.sin(t * 3 + i) * .3 }); } });
  // ---------- BOCA / ROSTO INFERIOR ----------
  const beardX = (id, name, rar, col, kind, col2) => regL(id, name, rar, (E, S, o, e) => { const { hy, hz } = o, b = col === "hair" ? hx(e.hair) : C3(col), b2 = col2 ? C3(col2) : lt(b, .16);
    const fur2 = (q) => Math.sin(q * 28) > .55 ? b2 : b;
    if (kind === "long") S({ pts: [[0, hy + 8, hz + 5], [0, hy + 16, hz + 6.4], [0, hy + 28, hz + 5.6]], w: [10, 8, 2.6], col: fur2 });
    if (kind === "fork") { S({ pts: [[0, hy + 8, hz + 5], [0, hy + 14, hz + 6.2]], w: [10, 7], col: fur2 }); for (const sg of [-1, 1]) S({ pts: [[sg * 2, hy + 13, hz + 6], [sg * 4.6, hy + 22, hz + 5.6], [sg * 6, hy + 28, hz + 4.6]], w: [5, 1], col: fur2 }); }
    if (kind === "braid") { S({ pts: [[0, hy + 8, hz + 5], [0, hy + 13, hz + 6.2]], w: [9, 6], col: fur2 }); for (const sg of [-1, 1]) S({ pts: [[sg * 2.4, hy + 12, hz + 6], [sg * 2.8, hy + 20, hz + 6.2], [sg * 2.4, hy + 28, hz + 5.6]], w: [3, 2.2], col: (q) => Math.sin(q * 34) > .1 ? b : b2 }); E({ x: 0, y: hy + 28.4, z: hz + 5.6, rx: 2, ry: 1.2, rz: 1.6, col: C3(0xf2c448), metal: 1 }); }
    if (kind === "stache") { for (const sg of [-1, 1]) S({ pts: [[sg * 1, hy + 6.8, hz + 7.4], [sg * 4.4, hy + 7.6, hz + 6.6], [sg * 7.6, hy + 5.4, hz + 4.6]], w: [3.4, 1.2], col: b }); }
    if (kind === "goat") { S({ pts: [[0, hy + 8.4, hz + 6.4], [0, hy + 13.4, hz + 6.8], [0, hy + 17, hz + 6]], w: [4.4, 1.6], col: b }); S({ pts: [[-3, hy + 6.8, hz + 7.2], [3, hy + 6.8, hz + 7.2]], w: 2, col: b }); }
    if (kind === "full") { E({ x: 0, y: hy + 6.6, z: hz + 3.6, rx: 7.8, ry: 5.2, rz: 5.8, p: 3, col: b, tex: (mx, my, mz) => (mz > 0 && my < -.35) ? null : (Math.sin(mx * 22 + my * 8) > .7 ? b2 : 0) }); S({ pts: [[0, hy + 10, hz + 5], [0, hy + 15.6, hz + 5.6]], w: [8, 5], col: b }); }
    if (kind === "stubble") E({ x: 0, y: hy + 6.4, z: hz + 3.6, rx: 7.6, ry: 4.6, rz: 5.6, p: 3, col: b, tex: (mx, my, mz) => (mz > 0 && my < -.3) ? null : (Math.sin(mx * 60 + my * 45) > .1 ? b : null) });
    if (kind === "flame") { S({ pts: [[0, hy + 8, hz + 5], [0, hy + 16, hz + 6.4], [0, hy + 24, hz + 5.6]], w: [10, 8, 2.6], col: (q) => q > .6 ? C3(0xffe070) : C3(0xff6a20), bias: .8 }); }
  });
  beardX("xl_barba_viking", "Barba Viking Longa", "uncommon", "hair", "long");
  beardX("xl_barba_bifurcada", "Barba Bifurcada", "rare", "hair", "fork");
  beardX("xl_barba_trancas", "Barba de Tranças com Anéis", "epic", "hair", "braid");
  beardX("xl_bigode", "Bigode de Guerreiro", "common", "hair", "stache");
  beardX("xl_cavanhaque", "Cavanhaque Afiado", "common", "hair", "goat");
  beardX("xl_barba_cheia", "Barba Cheia", "common", "hair", "full");
  beardX("xl_barba_rala", "Barba por Fazer", "common", "hair", "stubble");
  beardX("xl_barba_branca", "Barba do Ancião", "rare", 0xeaeaf0, "long", 0xffffff);
  beardX("xl_barba_gelo", "Barba de Gelo", "epic", 0xbfe8ff, "full", 0xeaf8ff);
  beardX("xl_barba_fogo", "Barba de Fogo", "legendary", 0xff6a20, "flame");
  beardX("xl_barba_ruiva", "Barba Ruiva Trançada", "rare", 0xb4501c, "braid", 0xd8742c);
  const scarfX = (id, name, rar, c, c2) => regL(id, name, rar, (E, S, o) => { const { hy, hz, bob, tz } = o, cc = C3(c), cd = C3(c2); E({ x: 0, y: tz + 33.4 + bob, z: tz + .6, rx: 7, ry: 3.2, rz: 5.4, p: 3, col: cc, tex: (mx, my) => Math.sin(mx * 22) > .5 ? lt(cc, .16) : (Math.abs(my) < .15 ? cd : 0) }); S({ pts: [[3, tz + 35, tz + 4], [6 + Math.sin(o.t * 2), tz + 44 + bob, tz + 3], [7 + Math.sin(o.t * 2 + 1), tz + 52 + bob, tz + 1]], w: [4, 2.2], col: (q) => (q > .78 ? cd : cc) }); });
  scarfX("xl_cachecol_vermelho", "Cachecol Vermelho de Lã", "common", 0xb83a2a, 0xe8d8b8);
  scarfX("xl_cachecol_azul", "Cachecol Azul do Norte", "common", 0x3a5aa8, 0xe8f0ff);
  scarfX("xl_cachecol_verde", "Cachecol da Floresta", "common", 0x3a7a4a, 0xd8e8a8);
  scarfX("xl_cachecol_negro", "Cachecol da Noite", "uncommon", 0x24242e, 0x8a4ac8);
  scarfX("xl_cachecol_real", "Cachecol Real Bordado", "epic", 0x5a2a8a, 0xf2c448);
  const maskX = (id, name, rar, fn) => regL(id, name, rar, fn);
  maskX("xl_mascara_pano", "Máscara de Pano Negro", "uncommon", (E, S, o) => { const { hy, hz } = o; E({ x: 0, y: hy + 6.2, z: hz + 3.2, rx: 7.4, ry: 4.4, rz: 5.6, p: 3, col: C3(0x24242e), tex: (mx, my, mz) => (mz > 0 && my < -.45) ? null : 0 }); });
  maskX("xl_mascara_lobo", "Meia Máscara de Lobo", "rare", (E, S, o) => { const { hy, hz } = o; E({ x: 0, y: hy + 6, z: hz + 3.6, rx: 7.2, ry: 4.2, rz: 5.6, p: 3, col: C3(0xc4c8d2), tex: (mx, my, mz) => (mz > 0 && my < -.45) ? null : (Math.sin(mx * 26) > .7 ? C3(0x8a8e98) : 0) }); S({ pts: [[0, hy + 4, hz + 8.6], [0, hy + 6.6, hz + 12.4]], w: [4, 2], col: C3(0xc4c8d2) }); E({ x: 0, y: hy + 6.4, z: hz + 12.4, rx: 1.4, ry: 1, rz: 1, col: C3(0x14101a) }); for (const sg of [-1, 1]) S({ pts: [[sg * 3, hy + 8, hz + 9], [sg * 3, hy + 11, hz + 9.6]], w: [1.6, .6], col: C3(0xf4f0e0) }); });
  maskX("xl_mascara_caveira", "Mandíbula de Caveira", "epic", (E, S, o) => { const { hy, hz } = o; E({ x: 0, y: hy + 7.6, z: hz + 3.4, rx: 6.4, ry: 3, rz: 5, p: 3, col: C3(0xeee4cc), tex: (mx, my, mz) => (mz > .1 && Math.sin(mx * 24) > .6) ? C3(0x2a2420) : 0 }); });
  maskX("xl_mascara_peste", "Máscara de Bico do Médico", "legendary", (E, S, o) => { const { hy, hz } = o; E({ x: 0, y: hy + 5.8, z: hz + 4, rx: 6.6, ry: 4.4, rz: 5, p: 3, col: C3(0x3a3028) }); S({ pts: [[0, hy + 4.6, hz + 7], [0, hy + 8, hz + 14], [0, hy + 12.4, hz + 18]], w: [5.4, 3, .8], col: C3(0x4a3a2c) }); });
  maskX("xl_veu", "Véu de Seda Lunar", "rare", (E, S, o) => { const { hy, hz } = o; E({ x: 0, y: hy + 6.4, z: hz + 3.4, rx: 7.2, ry: 4.4, rz: 5.4, p: 3, col: C3(0xe8e0f8), tex: (mx, my, mz) => (mz > 0 && my < -.5) ? null : (Math.sin(mx * 30 + my * 20) > .5 ? C3(0xc8bce8) : 0) }); S({ pts: [[-5, hy + 8, hz + 4], [-6, hy + 14, hz + 3], [-5, hy + 19, hz + 2]], w: [2.2, 1], col: C3(0xe8e0f8) }); });
  maskX("xl_respirador", "Respirador de Mineiro Anão", "rare", (E, S, o) => { const { hy, hz } = o; E({ x: 0, y: hy + 6, z: hz + 4.4, rx: 5.6, ry: 3.8, rz: 3.4, p: 3, col: C3(0x6a6a74), metal: 1 }); for (const sg of [-1, 1]) E({ x: sg * 3.4, y: hy + 6.6, z: hz + 7.4, rx: 1.8, ry: 1.8, rz: 1.2, p: 3, col: C3(0xb88a3a), metal: 1 }); S({ pts: [[-8, hy + 2, hz + 2], [0, hy + 3, hz + 7], [8, hy + 2, hz + 2]], w: 1.2, col: C3(0x3a3028) }); });
  maskX("xl_presas", "Presas de Vampiro", "rare", (E, S, o) => { const { hy, hz } = o; for (const sg of [-1, 1]) S({ pts: [[sg * 1.6, hy + 8.6, hz + 8.2], [sg * 1.6, hy + 11.6, hz + 8.4]], w: [1.8, .5], col: C3(0xffffff) }); });
  maskX("xl_bandagem", "Bandagem de Batalha", "uncommon", (E, S, o) => { const { hy, hz } = o; E({ x: 0, y: hy + 6.6, z: hz + 3.4, rx: 7.4, ry: 4.2, rz: 5.4, p: 3, col: C3(0xe8dcc0), tex: (mx, my, mz) => (mz > 0 && my < -.4) ? null : (Math.sin(my * 24 + mx * 6) > .3 ? C3(0xc8b890) : 0) }); });
  // pinturas de guerra (marcas no rosto)
  const paint = (id, name, rar, fn, col) => regL(id, name, rar, () => { }, (az, el) => fn(az, el, col));
  paint("xl_pintura_vermelha", "Pintura de Guerra Vermelha", "uncommon", (az, el, c) => (Math.abs(Math.abs(az) - .66) < .035 && el > -.2 && el < .5) || (Math.abs(Math.abs(az) - .78) < .035 && el > -.1 && el < .45) ? c : 0, [190, 40, 40]);
  paint("xl_pintura_azul", "Pintura de Guerra Azul", "uncommon", (az, el, c) => (el > .02 && el < .09 && Math.abs(az) > .15 && Math.abs(az) < .95) ? c : 0, [60, 100, 200]);
  paint("xl_pintura_caveira", "Pintura de Caveira", "epic", (az, el, c) => (Math.abs(az) < .05 && el > -.4 && el < .1) || (el > -.5 && el < -.35 && Math.abs(az) < .5 && Math.sin(az * 70) > 0) ? c : 0, [240, 240, 232]);
  paint("xl_pintura_runas", "Runas de Guerreiro", "epic", (az, el, c) => (Math.abs(az - .62) < .03 && el > -.1 && el < .3) || (Math.abs(az + .62) < .03 && el > -.1 && el < .3) || (Math.abs(Math.abs(az) - .62) < .1 && Math.abs(el - .1) < .03) ? c : 0, [100, 230, 255]);
  // ---------- ROSTO (olhos e óculos) ----------
  const EC = [["gold", "Dourados", 0xf0b800, "uncommon"], ["ice", "de Gelo", 0x80e0ff, "uncommon"], ["ember", "de Brasa", 0xff5a20, "uncommon"], ["violet", "Violeta", 0xb070ff, "rare"], ["green", "Esmeralda", 0x38d078, "uncommon"], ["sapphire", "de Safira", 0x3a70ff, "uncommon"], ["ruby", "de Rubi", 0xe0204a, "rare"], ["amber", "de Âmbar", 0xe8902a, "common"], ["silver", "de Prata", 0xc8d0e0, "uncommon"], ["rose", "Rosados", 0xff80b0, "common"], ["turq", "Turquesa", 0x30d8c8, "uncommon"], ["lime", "de Lima", 0xa8e830, "common"], ["onyx", "de Ônix", 0x3a3a48, "rare"], ["hazel", "Castanhos Claros", 0x9a6a38, "common"], ["storm", "de Tempestade", 0x7088a8, "rare"]];
  for (const [k, n, c, r] of EC) regE("eye_" + k, "Olhos " + n, r, c, 0);
  regE("eye_cat", "Olhos de Gato Dourados", "epic", 0xf0c000, "slit");
  regE("eye_wolf", "Olhos de Lobo", "epic", 0xe8c020, "slit");
  regE("eye_dragon", "Olhos de Dragão Rubro", "legendary", 0xff3010, "slit");
  regE("eye_snake", "Olhos de Serpente", "epic", 0x80e030, "slit");
  regE("eye_star", "Olhos Estelares", "legendary", 0xa0a0ff, "star");
  regE("eye_rune", "Olhos Rúnicos", "legendary", 0x60f0ff, "rune");
  regE("eye_hetero", "Olhos Heterocromáticos", "epic", 0x3a8aff, "hetero", 0xf0b800);
  regE("eye_void", "Olhos do Vazio", "legendary", 0xd070ff, "void");
  regE("eye_fire", "Olhos de Chama", "legendary", 0xffa020, "glow");
  regE("eye_odin", "Olhar de Odin", "legendary", 0x90c0ff, "hetero", 0xeeeeee);
  regM("xm_oculos_forja", "Óculos de Forja Anã", "uncommon", (E, S, o) => { const { hy, hz } = o; for (const sg of [-1, 1]) E({ x: sg * 3.6, y: hy - .4, z: hz + 7.6, rx: 3.2, ry: 2.8, rz: 1.8, p: 3, col: C3(0xb88a3a), metal: 1, tex: (mx, my, mz, X, Y) => Math.hypot(X, Y) < .62 ? C3(0x9ad8e8) : 0 }); S({ pts: [[-9, hy - .6, hz + 2], [0, hy - .6, hz + 8.6], [9, hy - .6, hz + 2]], w: 1.4, col: C3(0x5a3a22) }); });
  regM("xm_tapa_olho", "Tapa-olho de Pirata", "uncommon", (E, S, o) => { const { hy, hz } = o; E({ x: -3.4, y: hy - .4, z: hz + 7.4, rx: 3, ry: 2.8, rz: 1.8, p: 3, col: C3(0x1a1a22) }); S({ pts: [[-9, hy - 3, hz + 2], [-4, hy - 2, hz + 8], [8, hy + 1, hz + 6]], w: 1, col: C3(0x1a1a22) }); });
  regM("xm_monoculo", "Monóculo Dourado", "rare", (E, S, o) => { const { hy, hz } = o; for (let i = 0; i < 12; i++) { const a = i / 12 * TAU; E({ x: 3.5 + Math.cos(a) * 3, y: hy - .3 + Math.sin(a) * 3, z: hz + 8.2, rx: .6, ry: .6, rz: .6, col: C3(0xf2c448), metal: 1 }); } S({ pts: [[6, hy + 2.4, hz + 8], [8, hy + 9, hz + 7], [6, hy + 16, hz + 4]], w: .8, col: C3(0xf2c448), metal: 1 }); });
  regM("xm_oculos_redondos", "Óculos de Estudioso", "common", (E, S, o) => { const { hy, hz } = o; for (const sg of [-1, 1]) for (let i = 0; i < 10; i++) { const a = i / 10 * TAU; E({ x: sg * 3.6 + Math.cos(a) * 2.9, y: hy - .2 + Math.sin(a) * 2.7, z: hz + 8, rx: .5, ry: .5, rz: .5, col: C3(0x3a2a22), metal: 1 }); } S({ pts: [[-.8, hy - .4, hz + 8.2], [.8, hy - .4, hz + 8.2]], w: .8, col: C3(0x3a2a22) }); S({ pts: [[-6.6, hy - .4, hz + 6.4], [-9, hy - .2, hz + 2]], w: .8, col: C3(0x3a2a22) }); S({ pts: [[6.6, hy - .4, hz + 6.4], [9, hy - .2, hz + 2]], w: .8, col: C3(0x3a2a22) }); });
  regM("xm_dominó", "Máscara de Baile Dourada", "rare", (E, S, o) => { const { hy, hz } = o; E({ x: 0, y: hy - .4, z: hz + 5.4, rx: 8.6, ry: 3.2, rz: 3.4, p: 3, col: C3(0xf2c448), metal: 1, tex: (mx, my, mz) => (mz > .3 && (Math.abs(Math.abs(mx) - .38) < .22) && Math.abs(my) < .35) ? null : 0 }); });
  regM("xm_visor_runico", "Visor Rúnico", "epic", (E, S, o) => { const { hy, hz, t } = o; E({ x: 0, y: hy - .4, z: hz + 6.6, rx: 8.2, ry: 2.4, rz: 2.2, p: 3, col: C3(0x4ad8ff), bias: .5 + Math.sin(t * 3) * .2, metal: 1 }); });
  regM("xm_cicatriz", "Cicatriz de Batalha", "uncommon", () => { }, (az, el) => (Math.abs((az - .4) - (el - .2) * .9) < .035 && el > -.2 && el < .62 && az > .1) ? [150, 60, 60] : 0);
  regM("xm_tatuagem_runa", "Tatuagem de Runa", "rare", () => { }, (az, el) => (Math.abs(Math.abs(az) - .48) < .03 && el > .0 && el < .12) || (Math.abs(Math.abs(az) - .55) < .03 && el > -.16 && el < .0) ? [70, 190, 255] : 0);
  regM("xm_sardas", "Sardas do Sol", "common", () => { }, (az, el) => (Math.abs(Math.abs(az) - .46) < .22 && el > -.2 && el < -.02 && Math.sin(az * 90) * Math.sin(el * 110) > .7) ? [160, 96, 64] : 0);
  // ---------- COSTAS ----------
  const capeX = (id, name, rar, c, trim, fur) => regB(id, name, rar, (E, S, o, e) => { const { bob, tz, t } = o, cc = C3(c), c2 = dk(cc, .84), tr = trim != null ? C3(trim) : null;
    for (let i = 0; i < 5; i++) { const x = -9 + i * 4.5; S({ pts: [[x, tz + 37 + bob, tz - 5.6], [x * 1.1, tz + 52 + bob, tz - 8.5 + Math.sin(t * 2 + i) * .8], [x * 1.22, tz + 66 + bob, tz - 9 + Math.sin(t * 2 + i + 1) * 1.2]], w: [5.6, 6.6], col: i % 2 ? cc : c2, bias: -.1 }); }
    if (tr) for (const sg of [-1, 1]) S({ pts: [[sg * 11, tz + 37 + bob, tz - 5.6], [sg * 12.6, tz + 52 + bob, tz - 8.5], [sg * 13.4, tz + 66 + bob, tz - 9]], w: 1.4, col: tr });
    if (fur) E({ x: 0, y: tz + 36.4 + bob, z: tz - 4, rx: 10.6, ry: 2.4, rz: 5.4, p: 3, col: C3(fur), tex: (mx, my, mz) => Math.sin(mx * 24 + mz * 8) > .5 ? lt(C3(fur), .22) : 0 }); }, { cape: 1 });
  capeX("xb_capa_guerreiro", "Capa de Guerreiro", "uncommon", 0x8a2a2a, 0xe8c070);
  capeX("xb_capa_lobo", "Capa de Pele de Lobo", "rare", 0x6a6e78, 0xc8ccd6, 0xb8bcc6);
  capeX("xb_capa_jarl", "Manto do Jarl", "epic", 0x5a2a8a, 0xf2c448, 0xe8e0d0);
  capeX("xb_capa_sombras", "Manto das Sombras", "epic", 0x1e1c2c, 0x6a4aa8);
  capeX("xb_capa_real", "Capa Real Escarlate", "epic", 0xb8202a, 0xf2c448, 0xf4f0e8);
  capeX("xb_capa_azul", "Capa do Mar Gélido", "rare", 0x2a5a9a, 0xc8e8ff);
  capeX("xb_capa_floresta", "Capa da Floresta Viva", "uncommon", 0x2a6a3a, 0xc8d898);
  capeX("xb_capa_neve", "Capa de Neve", "rare", 0xeef2f8, 0x9ab8d8, 0xffffff);
  capeX("xb_capa_ouro", "Manto Dourado de Asgard", "legendary", 0xe8b838, 0xfff0a8);
  capeX("xb_capa_urso", "Capa de Pele de Urso", "rare", 0x6a4a30, 0xb89868, 0x8a6a48);
  // asas naturais (penas em camadas, curvas)
  const wingX = (id, name, rar, c1, c2, c3, kind) => regB(id, name, rar, (E, S, o) => { const { bob, tz, t } = o, a = C3(c1), b = C3(c2), d = C3(c3), fl = Math.sin(t * 2.2) * .8;
    for (const sg of [-1, 1]) {
      const root = [sg * 3.6, tz + 38 + bob, tz - 6];
      if (kind === "bat") { // dragão/morcego: ossos + membrana
        const tip = [sg * 30, tz + 20 + bob + fl * 2, tz - 9], el = [sg * 16, tz + 24 + bob, tz - 8];
        S({ pts: [root, el, tip], w: [3, 1.2], col: b });
        for (let i = 0; i < 4; i++) { const u = .35 + i * .22, p2 = [sg * (16 + u * 14), tz + 24 + bob + u * 26 + fl, tz - 8 - i * .4]; S({ pts: [el, p2], w: [1.8, .6], col: b }); S({ pts: [L3a(root, tip, i / 3), p2], w: [4.4, 2.2], col: a, bias: -.1 }); }
      } else if (kind === "fairy") {
        for (let L = 0; L < 2; L++) { const sgn = L ? 1 : -1; S({ pts: [root, [sg * 12, tz + 28 + bob + fl, tz - 7.5], [sg * (19 + L * 3), tz + 20 + bob + L * 20 + fl, tz - 8 - L]], w: [7.4, 1.6], col: a, bias: .3 }); S({ pts: [root, [sg * 9, tz + 40 + bob, tz - 7], [sg * (14 + L * 3), tz + 52 + bob + L * 4, tz - 8]], w: [5.4, 1.6], col: d, bias: .3 }); }
      } else { // asa natural: osso em arco + fileiras de penas largas e arredondadas caindo
        const P = (u) => { const a1 = 1 - u; return [sg * (a1 * a1 * 3.6 + 2 * a1 * u * 11 + u * u * 21), tz + 38 + bob - (a1 * a1 * 0 + 2 * a1 * u * 18 + u * u * 14) + fl * u * .6, tz - 6.4]; };
        const row = (n, len, z, w, col, th0, th1, u0, u1) => { for (let i = 0; i < n; i++) { const k = n > 1 ? i / (n - 1) : 0, u = u0 + (u1 - u0) * k, p0 = P(u), th = th0 + (th1 - th0) * k, ln = len * (1 - .12 * Math.abs(k - .45)), dx = sg * Math.sin(th), dy = Math.cos(th);
          const mid = [p0[0] + dx * ln * .5 + sg * .8, p0[1] + dy * ln * .5, z + .2], tip = [p0[0] + dx * ln + sg * (1 + k * 2), p0[1] + dy * ln + fl * k * 1.5, z - .2];
          S({ pts: [[p0[0], p0[1], z], mid, tip], w: [w, w * .55], col: i % 2 ? col : mix(col, d, .18), bias: .02 * (n - i) }); } };
        row(8, 34, tz - 8.4, 5.4, b, .05, .62, .96, .3);
        row(7, 24, tz - 7.6, 5.6, a, .1, .5, .9, .22);
        row(6, 14, tz - 6.9, 5, mix(a, d, .3), .12, .4, .82, .12);
        S({ pts: [P(0), P(.5), P(1)], w: [3.4, 2.4], col: d, bias: .2 }); }
    } }, { wings: 1 });
  function L3a(a, b, k) { return [a[0] + (b[0] - a[0]) * k, a[1] + (b[1] - a[1]) * k, a[2] + (b[2] - a[2]) * k]; }
  wingX("xb_asas_anjo", "Asas de Anjo", "legendary", 0xffffff, 0xe8eef8, 0xcfd8ea);
  wingX("xb_asas_corvo", "Asas de Corvo Real", "epic", 0x2a2838, 0x1a1824, 0x4a4a8a);
  wingX("xb_asas_aguia", "Asas de Águia Dourada", "epic", 0x8a6a3a, 0x6a4e28, 0xe8d8b0);
  wingX("xb_asas_coruja", "Asas de Coruja Nevada", "rare", 0xe8e4dc, 0xc4bcae, 0x8a8070);
  wingX("xb_asas_cisne", "Asas de Cisne", "rare", 0xf8f8ff, 0xdce4f0, 0xb8c4d8);
  wingX("xb_asas_fenix", "Asas de Fênix", "legendary", 0xff8a2a, 0xe0401c, 0xffe070);
  wingX("xb_asas_dragao", "Asas de Dragão Jovem", "legendary", 0x6a2a2a, 0x3a1414, 0xb83a3a, "bat");
  wingX("xb_asas_fada", "Asas de Fada Luminosa", "epic", 0xbff0ff, 0xd8c0ff, 0xffd0f0, "fairy");
  wingX("xb_asas_borboleta", "Asas de Borboleta Real", "epic", 0xff9ac8, 0x7a4ac8, 0xffe070, "fairy");
  // espadas nas costas
  const blade = (E, S, o, p) => { const { bob, tz } = o, ang = p.ang ?? .5, cx = p.cx ?? 0, base = [cx - Math.sin(ang) * 2, tz + 52 + bob, tz - 7.6], gripTop = [cx + Math.sin(ang) * 6, tz + 44 + bob, tz - 7.8], tip = [cx + Math.sin(ang) * (p.len ?? 38), tz + 48 + bob - (p.len ?? 38) * Math.cos(ang) + 2, tz - 8.2 - (p.z || 0)];
    const g0 = [cx + Math.sin(ang) * 3.4, tz + 47 + bob, tz - 7.8], g1 = [cx + Math.sin(ang) * 11, tz + 42 + bob, tz - 8];
    S({ pts: [[cx - Math.sin(ang) * 3, tz + 54 + bob, tz - 7.4], g0], w: 2.2, col: C3(p.grip || 0x4a3220) });
    S({ pts: [[g0[0] - 4 * Math.cos(ang), g0[1] + 4 * Math.sin(ang), g0[2] - .2], [g0[0] + 4 * Math.cos(ang), g0[1] - 4 * Math.sin(ang), g0[2] - .2]], w: 2, col: C3(p.guard || 0xc8a850), metal: 1 });
    S({ pts: [g0, tip], w: [p.w || 4.4, 1.2], col: C3(p.blade || 0xdce4f2), metal: 1, bias: .05 });
    if (p.edge) S({ pts: [L3a(g0, tip, .08), L3a(g0, tip, .9)], w: .9, col: C3(p.edge), bias: .9 });
    E({ x: cx - Math.sin(ang) * 3.2, y: tz + 54.6 + bob, z: tz - 7.4, rx: 1.8, ry: 1.6, rz: 1.6, p: 3, col: C3(p.pommel || 0xc8a850), metal: 1 });
    S({ pts: [[-6, tz + 38 + bob, tz - 4.6], [6, tz + 50 + bob, tz - 4.8]], w: 1.4, col: C3(0x4a3220) }); };
  const swordX = (id, name, rar, p) => regB(id, name, rar, (E, S, o) => { blade(E, S, o, p); if (p.twin) blade(E, S, o, { ...p, ang: -(p.ang ?? .5), cx: 0, z: .4 }); if (p.wings) for (const sg of [-1, 1]) for (let i = 0; i < 3; i++) S({ pts: [[Math.sin(p.ang ?? .5) * 3.4, o.tz + 47 + o.bob, o.tz - 8], [sg * (5 + i * 3), o.tz + 44 + o.bob - i * 1.6, o.tz - 8.6], [sg * (8 + i * 4.4), o.tz + 46 + o.bob - i * 2.4, o.tz - 9]], w: [2.6, .7], col: C3(0xffffff) }); }, { sword: 1 });
  swordX("xb_espada_montante", "Montante de Aço Real", "epic", { len: 42, w: 5, blade: 0xe4eaf6, guard: 0xd8b050, grip: 0x4a2a1a });
  swordX("xb_espada_dourada", "Lâmina Dourada de Asgard", "legendary", { len: 40, w: 4.6, blade: 0xf6d870, guard: 0xfff0a8, edge: 0xfff8d0, pommel: 0xff5a7a });
  swordX("xb_espada_chama", "Espada de Chama Eterna", "legendary", { len: 40, w: 4.6, blade: 0xff7a28, guard: 0x3a1a14, edge: 0xffe070, pommel: 0xff4a1a });
  swordX("xb_espada_gelo", "Lâmina de Cristal Gélido", "legendary", { len: 40, w: 4.8, blade: 0xa8e0ff, guard: 0xdff4ff, edge: 0xffffff, pommel: 0x7ad0ff });
  swordX("xb_espada_runica", "Espada das Runas Violeta", "legendary", { len: 40, w: 4.6, blade: 0x4a3a78, guard: 0xb890ff, edge: 0xd8b0ff, pommel: 0xb890ff });
  swordX("xb_espadas_gemeas", "Par de Lâminas Cruzadas", "epic", { len: 32, w: 3.8, ang: .62, blade: 0xd0d8e6, guard: 0x8a6a3a, twin: 1 });
  swordX("xb_espada_celeste", "Espada Celeste de Valquíria", "legendary", { len: 40, w: 4.4, blade: 0xffffff, guard: 0xf6d060, edge: 0xcfe8ff, pommel: 0xf6d060, wings: 1 });
  swordX("xb_espada_osso", "Lâmina de Osso Ancestral", "rare", { len: 36, w: 4.4, blade: 0xe8dfc8, guard: 0x8a7a5a, grip: 0x5a3a2a, pommel: 0xd8c8a0 });
  regB("xb_machado_batalha", "Machado de Batalha Nórdico", "epic", (E, S, o) => { const { bob, tz } = o; S({ pts: [[-5, tz + 56 + bob, tz - 7.8], [5, tz + 36 + bob, tz - 8]], w: 2.4, col: C3(0x5a3a22) }); for (const sg of [-1, 1]) S({ pts: [[4.4, tz + 38 + bob, tz - 8.4], [4.4 + 5 * sg * .6 + 3, tz + 34 + bob - sg * 4, tz - 8.8], [4.4 + 6, tz + 38 + bob + sg * 3, tz - 8.8]], w: [3, 2.6], col: C3(0xd8dee8), metal: 1 }); S({ pts: [[-6, tz + 38 + bob, tz - 4.6], [6, tz + 50 + bob, tz - 4.8]], w: 1.4, col: C3(0x4a3220) }); }, { sword: 1 });
  regB("xb_martelo_trovao", "Martelo do Trovão", "legendary", (E, S, o) => { const { bob, tz } = o; S({ pts: [[-5, tz + 56 + bob, tz - 7.8], [5, tz + 38 + bob, tz - 8]], w: 2.2, col: C3(0x5a3a22) }); E({ x: 5.4, y: tz + 36 + bob, z: tz - 8.2, rx: 4.6, ry: 3.2, rz: 3, p: 3.4, col: C3(0xc4ccdc), metal: 1, tex: (mx, my) => Math.abs(my) > .8 ? C3(0x7ad0ff) : 0 }); S({ pts: [[-6, tz + 38 + bob, tz - 4.6], [6, tz + 50 + bob, tz - 4.8]], w: 1.4, col: C3(0x4a3220) }); }, { sword: 1 });
  // mochilas personalizadas
  const packBase = (E, S, o, c, c2, w = 6.8, h = 8.4) => { const { bob, tz } = o; E({ x: 0, y: tz + 45 + bob, z: tz - 8.4, rx: w, ry: h, rz: 3.8, p: 3, col: c, tex: (mx, my, mz) => { if (mz < 0 && Math.abs(my - .25) < .06) return c2; return Math.sin(mx * 14 + my * 3) > .85 ? lt(c, .12) : 0; } }); for (const sg of [-1, 1]) S({ pts: [[sg * 5, tz + 37 + bob, tz - 5.2], [sg * 6.6, tz + 42 + bob, tz + 3.2], [sg * 5, tz + 50 + bob, tz - 4.4]], w: 1.8, col: c2 }); };
  const packX = (id, name, rar, fn) => regB(id, name, rar, fn, { pack: 1 });
  packX("xb_mochila_viajante", "Mochila de Viajante com Cobertor", "common", (E, S, o) => { const { bob, tz } = o; packBase(E, S, o, C3(0x8a5a30), C3(0x5a3a1e)); E({ x: 0, y: tz + 35.4 + bob, z: tz - 8, rx: 7.4, ry: 2.6, rz: 2.8, p: 3, col: C3(0xc8b888), tex: (mx) => Math.sin(mx * 16) > .6 ? C3(0xa89868) : 0 }); S({ pts: [[-6, tz + 53.6 + bob, tz - 9], [6, tz + 53.6 + bob, tz - 9]], w: 3, col: C3(0xc8b888) }); });
  packX("xb_mochila_erudito", "Alforje do Erudito com Pergaminhos", "uncommon", (E, S, o) => { const { bob, tz } = o; packBase(E, S, o, C3(0x5a3a22), C3(0x3a2414)); for (let i = 0; i < 3; i++) S({ pts: [[-5 + i * 4.6, tz + 36 + bob, tz - 9], [-4 + i * 4.4, tz + 29 + bob, tz - 9.8]], w: [2.4, 2.6], col: C3(0xeee0b8) }); E({ x: 0, y: tz + 46 + bob, z: tz - 12.4, rx: 2, ry: 2.4, rz: .8, p: 3, col: C3(0xc8a850), metal: 1 }); });
  packX("xb_mochila_alquimista", "Mochila do Alquimista com Frascos", "rare", (E, S, o) => { const { bob, tz, t } = o; packBase(E, S, o, C3(0x3a5a4a), C3(0x24382e)); for (let i = 0; i < 3; i++) { const c = [0xff5a7a, 0x5ad0ff, 0x90ff60][i]; S({ pts: [[-5 + i * 4.6, tz + 42 + bob, tz - 11.6], [-5 + i * 4.6, tz + 48 + bob, tz - 11.6]], w: [3.4, 3], col: C3(c), bias: .4 + Math.sin(t * 2 + i) * .15 }); E({ x: -5 + i * 4.6, y: tz + 41 + bob, z: tz - 11.6, rx: 1, ry: .8, rz: 1, col: C3(0xb8a070) }); } });
  packX("xb_mochila_lanterna", "Mochila com Lanterna Mágica", "rare", (E, S, o) => { const { bob, tz, t } = o; packBase(E, S, o, C3(0x6a4a3a), C3(0x42281c)); S({ pts: [[0, tz + 36 + bob, tz - 9], [0, tz + 28 + bob, tz - 9]], w: 1.2, col: C3(0x3a3a44) }); E({ x: 0, y: tz + 25.6 + bob, z: tz - 9, rx: 2.8, ry: 3.4, rz: 2.8, p: 3, col: C3(0xffe8a0), bias: .8 + Math.sin(t * 4) * .15 }); E({ x: 0, y: tz + 22.6 + bob, z: tz - 9, rx: 3, ry: .8, rz: 3, p: 3, col: C3(0x3a3a44), metal: 1 }); });
  packX("xb_mochila_minerador", "Mochila do Minerador com Picareta", "uncommon", (E, S, o) => { const { bob, tz } = o; packBase(E, S, o, C3(0x6a6a74), C3(0x3a3a44)); S({ pts: [[-6, tz + 56 + bob, tz - 11], [6, tz + 36 + bob, tz - 11.4]], w: 1.8, col: C3(0x5a3a22) }); S({ pts: [[2, tz + 36 + bob, tz - 11.6], [6.4, tz + 34 + bob, tz - 11.8], [10, tz + 38 + bob, tz - 11.8]], w: [2.4, .8], col: C3(0xc4ccdc), metal: 1 }); });
  packX("xb_mochila_peles", "Mochila de Peles com Chifres", "rare", (E, S, o) => { const { bob, tz } = o; packBase(E, S, o, C3(0x6a5038), C3(0x3a2a1c), 7.6, 8.8); E({ x: 0, y: tz + 36 + bob, z: tz - 7, rx: 8.4, ry: 2.4, rz: 4, p: 3, col: C3(0xc8b898), tex: (mx, my, mz) => Math.sin(mx * 24 + mz * 8) > .5 ? C3(0xeee4d0) : 0 }); for (const sg of [-1, 1]) S({ pts: [[sg * 6, tz + 36 + bob, tz - 8], [sg * 9, tz + 30 + bob, tz - 8.4], [sg * 8.6, tz + 26 + bob, tz - 8.6]], w: [3, .8], col: C3(0xf0e6c8) }); });
  packX("xb_mochila_pesca", "Mochila de Pescador com Vara", "uncommon", (E, S, o) => { const { bob, tz, t } = o; packBase(E, S, o, C3(0x3a6a8a), C3(0x24485e)); S({ pts: [[6, tz + 56 + bob, tz - 11], [-8, tz + 26 + bob + Math.sin(t * 2) * .4, tz - 12]], w: [1.6, .6], col: C3(0x8a5a30) }); S({ pts: [[-8, tz + 26 + bob, tz - 12], [-9, tz + 36 + bob, tz - 12]], w: .5, col: C3(0xe8f0f8) }); E({ x: -9, y: tz + 37 + bob, z: tz - 12, rx: .8, ry: 1, rz: .8, col: C3(0xff7a3a) }); });
  packX("xb_mochila_runica", "Bolsa das Runas Brilhantes", "epic", (E, S, o) => { const { bob, tz, t } = o; packBase(E, S, o, C3(0x2a2438), C3(0x14101e)); for (let i = 0; i < 3; i++) E({ x: (i - 1) * 3.6, y: tz + 44 + bob + (i % 2) * 3, z: tz - 12.4, rx: .9, ry: 1.6, rz: .5, col: C3(0x7ae8ff), bias: .6 + Math.sin(t * 3 + i) * .3 }); });
  packX("xb_mochila_cacador", "Mochila de Caça com Troféus", "uncommon", (E, S, o) => { const { bob, tz } = o; packBase(E, S, o, C3(0x5a6a3a), C3(0x38442a)); for (const sg of [-1, 1]) S({ pts: [[sg * 3, tz + 36 + bob, tz - 9], [sg * 4, tz + 30 + bob, tz - 9.6]], w: [3, 1.6], col: C3(0xc8683a) }); });
  // aljavas
  const quivX = (id, name, rar, c, fl) => regB(id, name, rar, (E, S, o) => { const { bob, tz } = o; S({ pts: [[-4, tz + 34 + bob, tz - 7], [-3, tz + 54 + bob, tz - 8]], w: [5.4, 5], col: C3(c), bias: -.05 }); for (let i = 0; i < 4; i++) { S({ pts: [[-5 + i * 1.8, tz + 34 + bob, tz - 7.5], [-6 + i * 2.2, tz + 27 + bob, tz - 8.5]], w: 1.2, col: C3(0xe8e0c8) }); E({ x: -6 + i * 2.2, y: tz + 26.4 + bob, z: tz - 8.5, rx: 1.6, ry: 1.6, rz: .8, p: 3, col: C3(fl[i % fl.length]) }); } S({ pts: [[-6, tz + 36 + bob, tz - 2], [6, tz + 50 + bob, tz + 4]], w: 1.5, col: C3(0x4a3220) }); }, { quiver: 1 });
  quivX("xb_aljava_couro", "Aljava de Couro Batido", "common", 0x6a4a2a, [0xd04830, 0xf0e8d0]);
  quivX("xb_aljava_prata", "Aljava de Prata Élfica", "epic", 0xc8d0e0, [0x7ae8ff, 0xffffff]);
  quivX("xb_aljava_falcao", "Aljava do Falcoeiro", "rare", 0x4a5a3a, [0xe8d8b0, 0x8a6a3a]);
