  // ---------- classes ----------
  const GOLD0 = hx(0xe8b838), STEEL = hx(0xdce4f2), STEEL2 = hx(0xb4c0d8), WOOD = hx(0x6a4220);
  const rv = (mx, my, x, y, r = .075) => Math.hypot(mx - x, my - y) < r;
  const cuff = (S, H, col, col2, w = 5.6) => { if (!H) return; S({ pts: [lerp(H.h, H.m, .42), lerp(H.h, H.m, .2)], w, col, metal: 1 }); S({ pts: [lerp(H.h, H.m, .44), lerp(H.h, H.m, .4)], w: w + .8, col: col2, metal: 1 }); S({ pts: [lerp(H.h, H.m, .22), lerp(H.h, H.m, .18)], w: w + .6, col: col2, metal: 1 }); };
  const ball = (E, p, r, col, o2 = {}) => E({ x: p[0], y: p[1], z: p[2], rx: r, ry: r, rz: r, col, ...o2 });
  function palette(e, T) {
    const trim = hx(e.trim ?? 0xe8b838);
    return { gold: trim, steel: STEEL, steel2: STEEL2, trim, tier: T, wood: WOOD, hatC: hx(e.tunic), hoodC: dk(hx(e.tunic), .9), hoodTrim: hx(e.trim ?? 0x6a1e34), crest: lt(trim, .35), capeTrim: trim };
  }
  function common(e, T, cls, extra) {
    const skin = hx(e.skin), hc = hx(e.hair), fem = !!e.slim;
    const eye = hx(e.eye ?? extra.eye), c = {
      skin, hair: hc, eye, eyeL: lt(eye, .5), blush: fem ? 1 : 0, bulk: fem ? .9 : 1, hipw: fem ? 1.08 : 1,
      top: hx(e.tunic), sleeve: hx(e.tunic), belt: hx(e.trim ?? 0x6a4220), pants: hx(e.pants), boots: hx(e.boots), cls,
    };
    const { eye: _e, ...rest } = extra; return Object.assign(c, rest);
  }
  const ATK = { berserker: "slash", escudeiro: "slash", cacador: "shoot", volva: "cast", valquiria: "stab", skald: "quick", thay: "punch", aprendiz: "quick" };
  const FAM = { berserker: "p", escudeiro: "p", cacador: "a", volva: "m", valquiria: "m", skald: "a", thay: "a", aprendiz: "a" };
  function headPlan(e, cls, T) {
    let h = e.head || "none"; const por = h === "poring"; const xt = !!COSX.top[h]; if (!xt && !/^(circlet|wings|horns|helm|hood|hood2|beanie|wreath|bandana|feathercap|crown|crowngold|santa)$/.test(h)) h = "none"; const SIG = "none";
    let main = SIG, extra = null;
    if (h === "none") { } else if (h === "circlet" || h === "wings") extra = h; else if (h === "horns") main = "helmH"; else if (h === "helm") main = "helm"; else if (h === "hood") main = (SIG === "hood" || SIG === "furhood") ? SIG : "hood"; else main = h;
    if (xt) main = "x:" + h;
    if (por) main = "none";
    return { main, extra, cover: (xt && COSX.topCover[h]) || main === "helm" || main === "helmH" || main === "hood" || main === "furhood" || main === "hood2" };
  }
  function finish(cfg, e, T, cls, C, deco) {
    const hp = headPlan(e, cls, T), hf = hairFn(e, hx(e.hair), hp.cover);
    { const mk = [COSX.marks[e.low], COSX.marks[e.mid]].filter(Boolean); if (mk.length) cfg.faceExtra = (az, el) => { for (const f of mk) { const r = f(az, el); if (r) return r; } return 0; }; if (e.eyePat) cfg.eyePat = e.eyePat; if (e.eye2 != null) cfg.eye2 = hx(e.eye2); }
    cfg.hairFn = (E, S, o) => hf(E, S, o);
    cfg.deco = (E, S, o) => {
      deco(E, S, o); backItems(E, S, o, e, C);
      if (hp.main !== "none") headMain(hp.main, E, S, Object.assign(o, { tailBand: cls === "thay" || cls === "aprendiz" }), e, C);
      if (hp.extra) headExtra(hp.extra, E, S, o, e, C);
      if (e.low) lowItems(e.low, E, S, o, e, C); if (e.mid && !String(e.mid).startsWith("eye_")) midItems(e.mid, E, S, o, e);
    };
    return cfg;
  }
  // tecido de costas / capas por classe
  const DES = {};
  // ===== ESCUDEIRO (Mercador) — armadura de aço + tabardo + escudo =====
  DES.escudeiro = (e, T) => {
    const C = palette(e, T); C.pack = true;
    const  tun = hx(e.tunic), GD = C.gold, sh = T >= 1;
    const cfg = common(e, T, "escudeiro", {
      eye: 0x3a8aff, metalTop: 1, metalLimb: 1, bulk: (e.slim ? .9 : 1.1), top: STEEL, sleeve: hx(0xc4d0e4), belt: dk(hx(0x6a4220), 1), pants: STEEL2, boots: hx(0xd0daea), bracer: GD, glove: GD, skirt: tun, greaves: STEEL,
      topTex: (mx, my, mz) => { if (my < -.82) return GD; if (mz < 0) return my > .55 ? GD : 0; if (Math.abs(mx) < .045) return hx(0xffffff); if (Math.abs(mx) > .9) return GD; if (Math.abs(Math.abs(mx) * .62 - my - .28) < .045) return hx(0x6a7ca0); if (Math.abs(my - .62) < .05) return GD; if (Math.abs(mx) < .16 && my > -.66 && my < .18) return GD; if (Math.abs(my + .32) < .1 && Math.abs(mx) < .5) return GD; if (rv(mx, my, 0, -.2, .1)) return hx(0x4aa8ff); for (const sx of [-1, 1]) for (const [x, y] of [[.72, -.62], [.74, .1], [.56, .42], [.38, -.74]]) if (rv(mx, my, sx * x, y)) return hx(0xfff4c0); return 0; },
      skirtTex: (mx, my, mz) => { if (my > .62) return GD; if (mz > 0 && Math.abs(mx) < .12) return lt(tun, .3); if (mz > 0 && Math.abs(Math.abs(mx) - .5) < .03) return GD; return Math.sin(mx * 14 + my * 3) > .7 ? lt(tun, .12) : 0; },
      wpn: (E, S, o) => {
        const H = o.R, Lh = o.L; cuff(S, H, STEEL, GD); cuff(S, Lh, STEEL, GD);
        if (H && !o.unarmed) { const d = wd(H, o.P), h = H.h; S({ pts: [add(h, d, -3), add(h, d, 17)], w: 2, col: WOOD }); for (let i = 0; i < 4; i++) { const c = add(h, d, 1 + i * 3.8); S({ pts: [add(c, [-1.4, 0, 0]), add(c, [1.4, 0, 0])], w: 2.6, col: GD, metal: 1 }); }
          const t = add(h, d, 20); o.P.marks.push({ n: "h", a: add(h, d, 4), b: t, col: [255, 232, 150] });
          E({ x: t[0], y: t[1], z: t[2], rx: 4.6, ry: 4, rz: 4, col: STEEL, metal: 1, tex: (mx, my) => { const k = Math.abs(mx) > .8 || Math.abs(my) > .84 ? GD : 0; if (k) return k; if (Math.abs(mx) < .12 || Math.abs(my) < .12) return hx(0x6ae8ff); return 0; } });
          for (const sg of [-1, 1]) S({ pts: [add(t, [sg * 4.2, 0, 0]), add(t, [sg * 6.2, 0, 0])], w: [3.4, 1.4], col: STEEL, metal: 1 }); S({ pts: [add(t, d, 5), add(t, d, 10)], w: [3.2, .8], col: STEEL, metal: 1 }); }
        if (Lh) { const h = Lh.h; E({ x: h[0] - 2.6, y: h[1] - 3, z: h[2] + 3.4, rx: 5.8, ry: 8.4, rz: 1.8, p: 2.6, col: hx(0xe8eefa), metal: 1, tex: (mx, my, mz, X, Y) => { const r = Math.max(Math.abs(X), Math.abs(Y) * .7); if (r > .86) return GD; if (r > .78) return dk(GD, .75); const q = Math.hypot(X, Y + .1); if (q < .22) return hx(0xfff4c0); const a = Math.atan2(Y + .1, X); if (q < .62 && Math.abs(Math.sin(a * 5)) < .14) return GD; return Math.abs(X) < .06 && Y > .5 ? lt(tun, .35) : 0; } }); }
      },
      tweak: (P, a) => { if (a === 0) { P.arm[0] = { x: 9, y: 11, z: 5 }; } },
    });
    return finish(cfg, e, T, "escudeiro", C, (E, S, o) => {
      const b = o.bob, tz = o.tz, hy = o.hy;
      E({ x: 0, y: tz + 60 + b, z: tz + 5.6, rx: 3.6, ry: 7.6, rz: .9, p: 2.4, col: tun, tex: (mx, my) => { if (my > .82) return GD; if (my < -.8) return GD; if (Math.abs(mx) > .86) return dk(GD, .75); if (Math.abs(mx) < .14 && my < .5) return hx(0xfff4c0); if (Math.abs(my + .1) < .12 && Math.abs(mx) < .62) return hx(0xfff4c0); return 0; } });
      for (let i = 0; i < 3; i++) E({ x: 0, y: tz + 39.5 + b + i * 2.7, z: tz + .4, rx: 8.2 - i * .5, ry: 1.5, rz: 5.9, p: 3, col: hx(0xd2dcee), metal: 1, tex: (mx, my, mz) => mz > 0 && my > .5 ? dk(GD, .75) : (mz > 0 && Math.abs(mx) < .06 ? hx(0x8a9ac0) : 0) });
      E({ x: 0, y: tz + 35.2 + b, z: tz + 4.6, rx: 2.3, ry: 2.3, rz: 1.2, col: GD, metal: 1, tex: (mx, my) => Math.hypot(mx, my) < .45 ? hx(0x4aa8ff) : 0 });
      if (sh) { S({ pts: [[-8.6, tz + 51 + b, tz + .5], [-10.4, tz + 58 + b, tz - 1.6], [-11.6, tz + 68 + b, tz - 4.4]], w: 2.8, col: hx(0x4a3020) }); E({ x: -8.2, y: tz + 48.4 + b, z: tz + .6, rx: 1.5, ry: 1.5, rz: 1.5, col: GD, metal: 1 }); }
      E({ x: 0, y: tz + 34 + b, z: tz, rx: 7, ry: 2.6, rz: 5.2, col: STEEL, metal: 1, tex: (mx, my) => Math.abs(my - .1) < .18 && Math.abs(Math.sin(mx * 20)) < .1 ? hx(0x6a7ca0) : 0 });
      for (const [x, y, w] of [[0, 57, 3.6], [-5.2, 56, 3], [5.2, 56, 3], [-8, 54, 2.2], [8, 54, 2.2]]) E({ x, y: tz + y + b, z: tz + 5.4 - Math.abs(x) * .25, rx: w, ry: 3.4, rz: 1.6, col: hx(0xdde5f2), metal: 1, tex: (mx, my) => my > .6 ? GD : (Math.abs(mx) < .08 ? hx(0x8a9ac0) : 0) });
      for (const sg of [-1, 1]) E({ x: sg * 3.7, y: tz + 64 + b * .5, z: tz + 3.4 + (o.P.leg[sg > 0 ? 1 : 0].z) * .6, rx: 3.8, ry: 2.6, rz: 2.2, col: GD, metal: 1 });
      E({ x: 0, y: tz + 52.2 + b, z: tz + 5.6, rx: 2.8, ry: 2.4, rz: 1.2, col: GD, metal: 1, tex: (mx, my) => Math.hypot(mx, my) < .35 ? hx(0x4aa8ff) : 0 });
      if (T >= 2) for (let i = 0; i < 5; i++) { const u = (o.t * .6 + i * .2) % 1; E({ x: Math.sin(i * 6 + o.t) * 13, y: 78 - u * 50, z: Math.cos(i * 3) * 6, rx: .8, ry: .8, rz: .8, col: hx(0xfff4b0), bias: 1 }); }
    });
  };
  // ===== BERSERKER (Espadachim / Cavaleiro de Midgard) — couro, pele e machado =====
  DES.berserker = (e, T) => {
    const C = palette(e, T), tun = hx(e.tunic), TR = C.gold, fur = hx(0xe2d8c2), furD = hx(0xb8ab92), iron = hx(0x9aa2b4);
    C.capeL = 60;
    const cfg = common(e, T, "berserker", {
      eye: 0xc8702a, bulk: (e.slim ? .92 : 1.14), top: tun, sleeve: dk(tun, .7), belt: hx(0x4a3320), pants: hx(e.pants), boots: hx(e.boots), bracer: iron, glove: hx(0x5a4a3a), metalLimb: 0, skirt: dk(hx(e.pants), .9),
      topTex: (mx, my, mz) => { if (my < -.8) return furD; if (mz > 0 && Math.abs(mx - my * .55 - .12) < .08 && my > -.6) return hx(0x4a3320); if (mz > 0 && rv(mx, my, 0, 0, .12)) return iron; if (mz > 0 && my > -.4 && my < .5 && Math.abs(mx) < .1 && ((Math.floor(my * 12)) & 1)) return hx(0xd8c8a0); if (mz > 0 && T >= 1 && Math.abs(Math.abs(mx) - .55) < .1 && my > -.4 && my < .2) return iron; if (mz > 0 && ((Math.floor(mx * 9) + Math.floor(my * 9)) & 1) && my > -.5) return lt(tun, .08); return 0; },
      skirtTex: (mx, my, mz) => { if (my > .62) return hx(0x4a3320); if (mz > 0 && my < -.3 && (Math.floor(mx * 7) & 1)) return furD; return 0; },
      wpn: (E, S, o) => {
        cuff(S, o.R, iron, hx(0x6a7284), 5.8); cuff(S, o.L, iron, hx(0x6a7284), 5.8);
        const H = o.R; if (!H || o.unarmed) return; const d = wd(H, o.P), h = H.h;
        S({ pts: [add(h, d, -4), add(h, d, 24)], w: 2.2, col: WOOD }); for (let i = 0; i < 3; i++) S({ pts: [add(h, d, 1 + i * 4), add(h, d, 2.4 + i * 4)], w: 3, col: hx(0x4a3320) });
        const t = add(h, d, 21), B = nrm([.6, .8 * d[2], -.8 * d[1]]);
        S({ pts: [add(t, d, 3), add(add(t, d, 0), B, 7), add(add(t, d, -8), B, 6.6), add(t, d, -10)], w: [4.6, 4.2], col: iron, metal: 1 });
        S({ pts: [add(t, d, -2), add(add(t, d, -2), B, -3.4)], w: 2.6, col: hx(0x6a7284), metal: 1 }); S({ pts: [add(t, d, 2), add(t, d, 7)], w: [2, .8], col: lt(iron, .2), metal: 1 });
        S({ pts: [add(add(t, d, -2), B, 5.4), add(add(t, d, -6), B, 5.2)], w: 1, col: hx(0xffffff), bias: .9 });
        o.P.marks.push({ n: "h", a: add(t, d, -8), b: add(add(t, d, 0), B, 7), col: [255, 190, 130] });
      },
      tweak: (P, a) => { if (a === 0) { P.arm[0] = { x: 11, y: 14, z: 2 }; P.arm[1] = { x: 11, y: 14, z: 2 }; P.lean = .4; P.hy = -.3; } else if (a === 1) { P.sx *= 1.6; } },
    });
    return finish(cfg, e, T, "berserker", C, (E, S, o) => {
      const b = o.bob, tz = o.tz, hy = o.hy;
      E({ x: 0, y: tz + 34.8 + b, z: tz, rx: 9.4, ry: 2.7, rz: 6.4, col: fur, tex: (mx) => Math.sin(mx * 24) > .45 ? furD : 0 });
      for (let i = 0; i < 7; i++) { const x = -9 + i * 3; S({ pts: [[x, tz + 52 + b, tz + 5], [x * 1.04, tz + 57 + b + (i % 2), tz + 5.6], [x * 1.06, tz + 62 + b + (i % 2) * 2, tz + 5.2]], w: [3.2, 1.2], col: i % 2 ? hx(0x5a4030) : hx(0x4a3320) }); }
      E({ x: 0, y: tz + 52 + b, z: tz + 5.8, rx: 3, ry: 2.4, rz: 1.2, col: hx(0xd8b040), metal: 1, tex: (mx, my) => Math.hypot(mx, my) < .4 ? hx(0xc8421e) : 0 });
      for (const sg of [-1, 1]) { E({ x: sg * 3.7, y: 66 + b * .3, z: (o.P.leg[sg > 0 ? 1 : 0].z) + 0.4, rx: 4.2, ry: 2.2, rz: 4.2, col: fur, tex: (mx) => Math.sin(mx * 18) > .4 ? furD : 0 }); }
      if (T >= 1) { for (const sg of [-1, 1]) E({ x: sg * 4.6, y: tz + 41 + b, z: tz + 5.4, rx: 3.6, ry: 3.8, rz: 1.1, p: 2.6, col: iron, metal: 1, tex: (mx, my) => Math.abs(my) > .8 || Math.abs(mx) > .8 ? hx(0x6a7284) : 0 }); }
      if (T >= 2) { for (let i = 0; i < 6; i++) { const u = (o.t * .7 + i * .17) % 1; E({ x: Math.sin(i * 5.1 + o.t * 2) * 11, y: 64 - u * 44, z: Math.cos(i * 3.3) * 6, rx: .9, ry: .9, rz: .9, col: hx(0xff7a3a), bias: 1 }); } }
      if (T >= 1 && !e.slim && !e.low) { E({ x: 0, y: hy + 8.4, z: o.hz + 4.8, rx: 6, ry: 4.4, rz: 3.4, col: hx(e.hair), tex: (mx, my, mz) => mz > 0 && my < -.5 ? null : (Math.sin(mx * 16) > .6 ? lt(hx(e.hair), .2) : 0) }); S({ pts: [[0, hy + 11, o.hz + 5], [0, hy + 16, o.hz + 5.4]], w: [3.6, 2], col: hx(e.hair) }); E({ x: 0, y: hy + 17, z: o.hz + 5.4, rx: 1.5, ry: 1.2, rz: 1.5, col: hx(0xf0c040) }); }
    });
  };
  // ===== CAÇADOR (Arqueiro) — couro verde, manto de pele, arco =====
  DES.cacador = (e, T) => {
    const C = palette(e, T), tun = hx(e.tunic), lea = hx(0x8a6a40), fur = hx(0x9a9ea8), TR = C.gold;
    C.hoodTrim = dk(hx(0xd8d8de), 1); C.capeL = 58;
    const cfg = common(e, T, "cacador", {
      eye: 0x2f9a4a, top: tun, sleeve: dk(tun, .85), belt: hx(0x4a3220), pants: hx(e.pants), boots: hx(e.boots), bracer: lea, glove: lea, metalLimb: 0,
      topTex: (mx, my, mz) => { if (mz > 0 && Math.abs(mx - my * .6) < .07 && my < .5) return hx(0x4a3220); if (my < -.78) return hx(0x6a4a2a); if (mz > 0 && my > .25 && Math.abs(mx) < .5 && Math.floor(mx * 9) % 2 === 0 && my < .45) return lt(tun, .16); if (mz > 0 && Math.abs(mx) < .05) return dk(tun, .6); return 0; },
      wpn: (E, S, o) => {
        cuff(S, o.R, lea, dk(lea, .7), 5.2); cuff(S, o.L, lea, dk(lea, .7), 5.2);
        const H = o.L; if (!H || o.unarmed) return; const h = H.h, x = h[0] + 1;
        const top = [x, h[1] - 22, h[2] - 4], mid = [x, h[1], h[2] + 3.2], bot = [x, h[1] + 22, h[2] - 4];
        S({ pts: [top, [x, h[1] - 11, h[2] + 1.8], mid, [x, h[1] + 11, h[2] + 1.8], bot], w: [2.4, 2.4], col: (q) => (Math.floor(q * 10) & 1) ? hx(0x7a4a24) : hx(0x93602e) });
        S({ pts: [[x, h[1] - 3, h[2] + 2.6], [x, h[1] + 3, h[2] + 2.6]], w: 3.2, col: hx(0x3a2a1a) });
        const Rh = o.R; const dr = o.P.draw || 0; const str = Rh && dr > 0 ? [Rh.h[0], Rh.h[1] - 1, Rh.h[2] - 1] : null;
        S({ pts: str ? [top, str, bot] : [top, bot], w: .9, col: hx(0xf0ead8) });
        if (Rh && dr > .2) { const a0 = [Rh.h[0], Rh.h[1] - 1, Rh.h[2]], a1 = [mid[0], mid[1] - 1, mid[2] + 11]; S({ pts: [a0, a1], w: 1.2, col: hx(0xe8e0c8) }); S({ pts: [add(a1, [0, 0, 0]), add(a1, [0, 0, 3.4])], w: [2.4, .6], col: hx(0xc8d0dc), metal: 1 }); S({ pts: [a0, add(a0, [0, 0, 3])], w: 2.6, col: hx(0xd04830) }); }
      },
      tweak: (P, a) => { if (a === 0) { P.arm[1] = { x: 9.8, y: 20, z: -1 }; P.lean = 1; P.leg[0].z = -1.4; P.leg[1].z = 2.2; } },
    });
    return finish(cfg, e, T, "cacador", C, (E, S, o) => {
      const b = o.bob, tz = o.tz;
      E({ x: 0, y: tz + 34.8 + b, z: tz, rx: 10.4, ry: 3, rz: 6.8, col: fur, tex: (mx, my) => Math.sin(mx * 24 + my * 8) > .4 ? hx(0xc4c8d0) : 0 });
      for (const sg of [-1, 1]) E({ x: sg * 7.8, y: tz + 55 + b, z: tz + 3.4, rx: 2.8, ry: 3.2, rz: 2, col: hx(0x6a4a2a), tex: (mx, my) => my < -.4 ? lt(hx(0x6a4a2a), .2) : 0 });
      E({ x: 0, y: tz + 52 + b, z: tz + 5.8, rx: 2.2, ry: 2, rz: 1, col: TR, metal: 1 });
      for (const sg of [-1, 1]) { E({ x: sg * 3.7, y: 66 + b * .3, z: o.P.leg[sg > 0 ? 1 : 0].z + .4, rx: 4, ry: 2.4, rz: 4, col: fur, tex: (mx) => Math.sin(mx * 18) > .4 ? hx(0xc4c8d0) : 0 }); for (let i = 0; i < 3; i++) E({ x: sg * 3.7, y: tz + 57 + b + i * 1.8, z: o.P.leg[sg > 0 ? 1 : 0].z * .3, rx: 3.5, ry: .6, rz: 3.5, col: lea }); }
      if (T >= 1) S({ pts: [[-6, tz + 36 + b, tz - 2], [6, tz + 50 + b, tz + 4]], w: 1.5, col: hx(0x4a3220) });
      if (T >= 2) for (let i = 0; i < 4; i++) { const u = (o.t * .6 + i * .25) % 1; E({ x: Math.sin(i * 5 + o.t) * 12, y: 70 - u * 46, z: Math.cos(i * 3) * 6, rx: .8, ry: .8, rz: .8, col: hx(0x8aff9a), bias: 1 }); }
    });
  };
  // ===== MAGO (Völva) — manto, chapéu, cajado =====
  DES.volva = (e, T) => {
    const C = palette(e, T), tun = hx(e.tunic), TR = C.gold, rob = dk(tun, .78), hl = hx(e.hair);
    C.hatC = rob; C.capeTrim = TR; C.noCape = true;
    const cfg = common(e, T, "volva", {
      eye: 0x4a6aff, robe: 1, robeCol: rob, top: tun, sleeve: dk(tun, .92), belt: TR, pants: dk(tun, .5), boots: hx(e.boots), bracer: TR, hipw: e.slim ? 1.12 : 1,
      robeTex: (mx, my, mz) => { if (my > .9) return TR; if (mz > 0) { if (Math.abs(mx) < .09 && my > -.2) return hx(0xe8f0ff); if (Math.abs(Math.abs(mx) - .1) < .03 && my > -.2) return TR; if (Math.abs(my - .74) < .05) return TR; const g = Math.sin(mx * 11 + my * 3); if (T >= 1 && Math.abs(mx) > .2 && Math.abs(mx) < .45 && my > .3 && my < .7 && Math.abs(Math.sin(my * 40 + mx * 9)) < .15) return hx(0x8ae8ff); if (((Math.floor(mx * 8) * 7 + Math.floor(my * 9) * 5) % 13) === 0) return hx(0xffe890); if (g > .7) return lt(rob, .14); if (g < -.8) return dk(rob, .72); } return Math.sin(mx * 13) > .72 ? lt(rob, .14) : 0; },
      topTex: (mx, my, mz) => { if (my < -.8) return TR; if (mz > 0 && Math.abs(mx) < .1) return hx(0xe8f0ff); return Math.sin(mx * 16 + my * 5) > .75 ? lt(tun, .12) : 0; },
      wpn: (E, S, o) => {
        cuff(S, o.R, tun, TR); cuff(S, o.L, tun, TR); const H = o.R; if (!H || o.unarmed) return;
        const h = H.h, d = o.P.mood === 1 ? wd(H, o.P) : [.05, -1, .05];
        S({ pts: [add(h, d, -8), add(h, d, 26), add(h, d, 35)], w: [2, 2.3, 1.8], col: (q) => Math.sin(q * 38) > .6 ? hx(0x5a3a20) : hx(0x7a5030) });
        for (const q of [.15, .5]) S({ pts: [add(h, d, -4 + q * 60), add(add(h, d, -4 + q * 60), [1, 0, 0], .01)], w: 3.4, col: TR, metal: 1 });
        const tp = add(h, d, 38), oc = lt(hx(e.trim ?? 0x58e0ff), .2); o.P.marks.push({ n: "s", a: add(h, d, 30), b: tp, col: [140, 240, 255] });
        for (let i = 0; i < 3; i++) { const a = i / 3 * TAU + Math.PI / 2; S({ pts: [add(tp, [0, -5, 0]), add(tp, [Math.cos(a) * 5, -1, Math.sin(a) * 3]), add(tp, [Math.cos(a) * 5.4, 5, Math.sin(a) * 3])], w: [1.8, 1], col: TR, metal: 1 }); }
        E({ x: tp[0], y: tp[1], z: tp[2], rx: 4.4, ry: 4.8, rz: 4.4, col: hx(0x58e0ff), bias: .9, tex: (mx, my, mz, X, Y, Z) => { if (Z > .45 && Math.hypot(X + .2, Y + .3) < .3) return hx(0xffffff); return Math.abs(Math.sin(mx * 4 + my * 3)) < .1 ? hx(0xd8fbff) : 0; } });
        for (let i = 0; i < 4; i++) { const a = o.t * 2 + i * TAU / 4; E({ x: tp[0] + Math.cos(a) * 8, y: tp[1] + Math.sin(a * 1.3) * 3, z: tp[2] + Math.sin(a) * 7, rx: .8, ry: 1.2, rz: .6, col: hx(0xb0f4ff), bias: 1 }); }
        if (o.L) { const l = o.L.h; E({ x: l[0], y: l[1] - 2, z: l[2] + 1.4, rx: 2.4, ry: 2.4, rz: 2.4, col: hx(0x58e0ff), bias: 1 }); }
      },
    });
    return finish(cfg, e, T, "volva", C, (E, S, o) => {
      const b = o.bob, t = o.t, tz = o.tz, hy = o.hy, hz = o.hz;
      S({ pts: [[-8, tz + 37 + b, tz + 5.4], [0, tz + 43 + b, tz + 6.2], [8, tz + 51 + b, tz + 5.6]], w: 2.8, col: (t2) => Math.sin(t2 * 34) > .3 ? TR : hx(0xfff4c0), metal: 1 });
      E({ x: 0, y: tz + 42.6 + b, z: tz + 7, rx: 2, ry: 2.4, rz: 1, col: hx(0x58e0ff), bias: .5, tex: (mx, my) => Math.hypot(mx, my) > .8 ? TR : (Math.hypot(mx + .3, my + .3) < .25 ? hx(0xffffff) : 0) });
      E({ x: 8.4, y: tz + 53 + b, z: tz + 4.4, rx: 3.2, ry: 4.2, rz: 1.8, col: hx(0x7a2a2a), tex: (mx, my, mz) => mz > .3 && (Math.abs(mx) < .1 || Math.abs(my) > .86 || Math.abs(mx) > .86) ? TR : (mz > .3 && Math.hypot(mx, my) < .22 ? hx(0x6ae8ff) : 0) });
      E({ x: -8, y: tz + 54 + b, z: tz + 4, rx: 1.8, ry: 2.6, rz: 1.8, col: hx(0x58c8ff), bias: .4, tex: (mx, my) => my < -.5 ? hx(0x7a5030) : 0 });
      E({ x: 0, y: tz + 34.4 + b, z: tz, rx: 10, ry: 3.2, rz: 6.6, col: hx(0xe8e4f0), tex: (mx) => Math.sin(mx * 30) > .4 ? hx(0xc0b8d0) : 0 });
      E({ x: 0, y: tz + 51.6 + b, z: tz + 5.6, rx: 2.6, ry: 2.4, rz: 1.1, col: TR, metal: 1, tex: (mx, my) => Math.hypot(mx, my) < .4 ? hx(0x6ae8ff) : 0 });
      if (T >= 2 && !e.slim && !e.low) { S({ pts: [[0, hy + 8, hz + 5], [0, hy + 16, hz + 6.6], [0, hy + 27, hz + 5.6]], w: [10, 8, 2.6], col: (t2) => Math.sin(t2 * 28) > .55 ? hx(0xdcdcee) : hx(0xf8f8ff) }); }
      if (T >= 1) for (let i = 0; i < 5; i++) { const a = t * 1.2 + i * TAU / 5; E({ x: Math.cos(a) * 17, y: tz + 38 + Math.sin(a * 1.6 + i) * 6 + b, z: Math.sin(a) * 13, rx: 1.1, ry: 1.8, rz: .8, col: hx(0x8ae8ff), bias: 1 }); }
    });
  };
  // ===== SACERDOTE (Noviço / Valquíria) — túnica clara, auréola, lança =====
  DES.valquiria = (e, T) => {
    const C = palette(e, T), tun = hx(e.tunic), TR = C.gold, ac = hx(e.cape ?? 0xe03a3a);
    C.noCape = true;
    const cfg = common(e, T, "valquiria", {
      eye: 0x4aa6ff, blush: 1, robe: 1, robeCol: tun, top: lt(tun, .06), sleeve: lt(tun, .12), belt: TR, pants: hx(e.pants), boots: hx(e.boots), bracer: TR, glove: lt(tun, .2), hipw: e.slim ? .98 : .94,
      robeTex: (mx, my, mz) => { if (my > .9) return TR; if (mz > 0) { if (Math.abs(mx) < .1 && my > -.1) return ac; if (Math.abs(Math.abs(mx) - .1) < .025 && my > -.1) return TR; if (my > .84) return TR; if (Math.abs(my + .5) < .03) return TR; if (Math.abs(mx) > .4 && Math.abs(mx) < .46 && my > -.4) return lt(tun, .3); } return Math.sin(mx * 12 + my * 2) > .78 ? lt(tun, .16) : (Math.sin(mx * 9) < -.82 ? dk(tun, .88) : 0); },
      topTex: (mx, my, mz) => { if (my < -.78) return TR; if (mz > 0 && Math.abs(mx) < .12 && my > -.7) return ac; if (mz > 0 && my > -.1 && my < .08 && Math.abs(mx) > .2 && Math.abs(mx) < .6) return TR; return 0; },
      wpn: (E, S, o) => {
        cuff(S, o.R, lt(tun, .15), TR); cuff(S, o.L, lt(tun, .15), TR); const H = o.R; if (!H || o.unarmed) return;
        const d = o.P.mood === 1 ? wd(H, o.P) : [.04, -1, .08], h = H.h;
        S({ pts: [add(h, d, -9), add(h, d, 36)], w: 1.9, col: hx(0xe8dcc0) }); for (const q of [0, 14]) S({ pts: [add(h, d, q), add(h, d, q + .6)], w: 3, col: TR, metal: 1 });
        S({ pts: [add(h, d, 35), add(h, d, 45)], w: [3.8, .9], col: STEEL, metal: 1 }); S({ pts: [add(h, d, 36), add(add(h, d, 36), [-3, -.4, 0], 1)], w: [2, .7], col: TR, metal: 1 }); S({ pts: [add(h, d, 36), add(add(h, d, 36), [3, -.4, 0], 1)], w: [2, .7], col: TR, metal: 1 });
        S({ pts: [add(h, d, 31), add(add(h, d, 29), [Math.sin(o.t * 5) * 2.4, 0, 1.4], 1), add(add(h, d, 22), [Math.sin(o.t * 5 + 1) * 3, 0, 2], 1)], w: [2.6, 1], col: ac });
        o.P.marks.push({ n: "s", a: add(h, d, 30), b: add(h, d, 45), col: [200, 230, 255] });
      },
      tweak: (P, a) => { if (a === 0) { P.arm[0] = { x: 4, y: 10, z: 7 }; P.arm[1] = { x: 4, y: 10.4, z: 7 }; } },
    });
    return finish(cfg, e, T, "valquiria", C, (E, S, o) => {
      const b = o.bob, t = o.t, tz = o.tz;
      E({ x: 0, y: tz + 35 + b, z: tz, rx: 8.4, ry: 2.6, rz: 5.4, col: lt(tun, .18), tex: (mx) => Math.sin(mx * 20) > .5 ? TR : 0 });
      S({ pts: [[-5, tz + 36 + b, tz + 5], [0, tz + 51 + b, tz + 6.4], [5, tz + 36 + b, tz + 5]], w: 1.2, col: TR });
      E({ x: 0, y: tz + 41 + b, z: tz + 6.2, rx: 2, ry: 2, rz: 1, col: TR, metal: 1, tex: (mx, my) => Math.hypot(mx, my) < .5 ? ac : 0 });
      E({ x: 6.8, y: tz + 54 + b, z: tz + 4, rx: 2.8, ry: 3.4, rz: 1.6, col: hx(0xb88a50), tex: (mx, my) => my < -.4 ? TR : 0 });
      if (T >= 1) for (let i = 0; i < 4; i++) { const u = (t * .5 + i * .25) % 1; E({ x: Math.sin(i * 4 + t) * 12, y: 76 - u * 48, z: Math.cos(i * 3) * 6, rx: .8, ry: .8, rz: .8, col: hx(0xfff4b0), bias: 1 }); }
    });
  };
  // ===== SOMBRA (Gatuno / Skald) — capuz, adagas =====
  DES.skald = (e, T) => {
    const C = palette(e, T), tun = hx(e.tunic), AC = hx(e.trim ?? 0x8a2c48), ac2 = dk(AC, .8), ST = lt(dk(tun, 1), .12);
    C.hoodC = dk(tun, .95); C.hoodTrim = ac2; C.capeTrim = AC; C.capeL = 60;
    const cfg = common(e, T, "skald", {
      eye: 0xff3a58, top: tun, sleeve: dk(tun, .92), belt: ac2, pants: dk(tun, .8), boots: hx(e.boots), bracer: lt(tun, .22), glove: hx(e.boots), skirt: dk(tun, .92), metalLimb: 0,
      faceExtra: false ? (az, el) => (Math.abs(az) < 1.25 && el > .3) ? (Math.abs(az) < .04 ? lt(tun, .16) : dk(tun, .9)) : 0 : null,
      topTex: (mx, my, mz) => { if (my < -.82) return lt(tun, .22); if (mz > 0) { if ((Math.abs(mx - my * .95) < .07 || Math.abs(mx + my * .95) < .07) && my > -.75) return ac2; if (rv(mx, my, 0, 0, .13)) return hx(0xc8a848); if (Math.abs(my - .42) < .07) return dk(AC, .8); if (Math.abs(mx) < .04) return dk(tun, .6); if (Math.sin(mx * 26 + my * 9) > .8) return lt(tun, .1); } return Math.sin(mx * 18 + my * 5) > .8 ? lt(tun, .1) : 0; },
      skirtTex: (mx, my, mz) => (my > .5 && Math.abs(mx) > .28 && mz > 0) ? null : (my > .7 ? ac2 : 0),
      wpn: (E, S, o) => {
        cuff(S, o.R, lt(tun, .22), AC, 5.4); cuff(S, o.L, lt(tun, .22), AC, 5.4);
        for (const [H, sg] of [[o.R, 1], [o.L, -1]]) { if (!H || o.unarmed) continue; const d = wd(H, o.P), h = H.h; o.P.marks.push({ n: "d" + sg, a: add(h, d, 3), b: add(h, d, 13.5), col: [255, 96, 120] });
          S({ pts: [h, add(h, d, 3)], w: 2, col: hx(0x3a2230) }); S({ pts: [add(h, d, 3), add(h, d, 10), add(add(h, d, 13.5), [sg * 2, 0, 0])], w: [3, .8], col: hx(0xe0e6f4), metal: 1 }); S({ pts: [add(h, d, 3.4), add(h, d, 9.4)], w: 1, col: hx(0xff3a58), bias: .9 }); S({ pts: [add(add(h, d, 3), [-3, 0, 0]), add(add(h, d, 3), [3, 0, 0])], w: 1.8, col: hx(0xc8a848), metal: 1 }); }
      },
    });
    return finish(cfg, e, T, "skald", C, (E, S, o) => {
      const b = o.bob, t = o.t, tz = o.tz, hy = o.hy;
      for (let i = 0; i < 4; i++) { const x = -5 + i * 3.1, y = tz + 37.6 + b + i * 3.2; E({ x, y, z: tz + 6, rx: .9, ry: 2.1, rz: .7, col: hx(0xe0e6f4), metal: 1 }); E({ x, y: y + 2.6, z: tz + 6, rx: 1.2, ry: .8, rz: .8, col: hx(0xc8a848), metal: 1 }); }
      if (T >= 1) for (let i = 0; i < 6; i++) { const x = -9 + i * 3.6, L = 14 + ((i * 7) % 5) * 3; S({ pts: [[x, tz + 50 + b, tz - 6.2], [x * 1.12, Math.min(tz + 50 + L * .55 + b, 64), tz - 8 + Math.sin(t * 2 + i) * .8], [x * 1.2, Math.min(tz + 50 + L + b, 66.5), tz - 8.6 + Math.sin(t * 2 + i + 1)]], w: [3.4, 1.2], col: i % 2 ? dk(tun, .9) : dk(tun, .7) }); }
      E({ x: 0, y: tz + 33.8 + b, z: tz, rx: 6.6, ry: 2.8, rz: 5.2, col: dk(tun, .95), tex: (mx) => Math.sin(mx * 22) > .4 ? lt(tun, .16) : 0 });
      E({ x: 0, y: tz + 52 + b, z: tz + 5.8, rx: 2.4, ry: 2.2, rz: 1, col: hx(0xc8a848), metal: 1 });
      for (const sg of [-1, 1]) { E({ x: sg * 7.4, y: tz + 55 + b, z: tz + 3.4, rx: 2.6, ry: 3.2, rz: 2.2, col: hx(0x4a3a2a), tex: (mx, my) => my < -.3 ? hx(0xc8a848) : 0 }); for (let i = 0; i < 3; i++) E({ x: sg * 3.7, y: tz + 57 + b + i * 1.7, z: tz + (o.P.leg[sg > 0 ? 1 : 0].z) * .3, rx: 3.5, ry: .7, rz: 3.5, col: ac2 }); for (let i = 0; i < 3; i++) E({ x: sg * 3.7, y: 68 - i * 1.4, z: o.P.leg[sg > 0 ? 1 : 0].z, rx: 3.8, ry: .6, rz: 3.8, col: lt(tun, .2) }); }
      if (T >= 1) S({ pts: [[-3, tz + 35 + b, tz + 4], [-8 + Math.sin(t * 2), tz + 45 + b, tz + 3], [-12 + Math.sin(t * 2 + 1) * 2, tz + 58 + b, tz - 2 + Math.sin(t * 3)]], w: [4.4, 2], col: AC });
      if (T >= 1) for (let i = 0; i < 2; i++) S({ pts: [[3, hy + 7, o.hz - 8], [11 + Math.sin(t * 3 + i), hy + 11 + i * 3, o.hz - 12], [19 + Math.sin(t * 3 + 1 + i) * 2, hy + 9 + i * 5 + Math.sin(t * 4), o.hz - 14]], w: [3.6 - i, 1], col: i ? ac2 : AC });
      if (T >= 2) for (let i = 0; i < 3; i++) { const a = t * 1.6 + i * 2.1; E({ x: Math.cos(a) * 14, y: tz + 40 + Math.sin(a * 1.7) * 5 + b, z: Math.sin(a) * 10, rx: 1.1, ry: 1.7, rz: .8, col: hx(0xff3a58), bias: 1 }); }
    });
  };
  // ===== THAY (monge de punhos) =====
  DES.thay = (e, T) => {
    const C = palette(e, T), tun = hx(e.tunic), TR = C.gold, skin = hx(e.skin), wrap = hx(0xe8dcc0);
    C.capeTrim = TR;
    const cfg = common(e, T, "thay", {
      eye: 0xe8a030, top: tun, sleeve: tun, belt: dk(TR, .9), pants: dk(hx(e.pants), 1), boots: hx(e.boots), bracer: wrap, glove: wrap, metalLimb: 0, sleeveLong: false,
      topTex: (mx, my, mz) => { if (my < -.78) return TR; if (mz > 0 && Math.abs(mx) < .34 + my * .22 && my < .12 && my > -.7) return skin; if (mz > 0 && Math.abs(Math.abs(mx) - (.36 + my * .22)) < .06 && my < .12) return TR; if (mz > 0 && my > .3 && my < .38) return dk(TR, .8); return Math.sin(mx * 14 + my * 4) > .8 ? lt(tun, .12) : 0; },
      wpn: (E, S, o) => {
        cuff(S, o.R, wrap, TR, 5.4); cuff(S, o.L, wrap, TR, 5.4);
        if (!o.unarmed) for (const [H, sg] of [[o.R, 1], [o.L, -1]]) { if (!H) continue; ball(E, add(H.h, [0, 0, 1]), 3.1, wrap); ball(E, add(H.h, [0, 0, 3.6]), 1.8, hx(0xffd890), { bias: .9 }); }
        if (!o.unarmed && o.R) o.P.marks.push({ n: "f", a: o.R.h, b: add(o.R.h, [0, 0, 6]), col: [255, 200, 120] });
      },
      tweak: (P, a) => { if (a === 0) { P.arm[0] = { x: 7.4, y: 8, z: 7 }; P.arm[1] = { x: 7.4, y: 8, z: 7 }; P.lean = 1.2; P.leg[0].z = -2.2; P.leg[1].z = 2.6; P.leg[0].x = P.leg[1].x = 1.8; } else if (a === 5) { P.lean = -2; } },
    });
    return finish(cfg, e, T, "thay", C, (E, S, o) => {
      const b = o.bob, t = o.t, tz = o.tz;
      E({ x: 0, y: tz + 51.8 + b, z: tz, rx: 9.4, ry: 2.6, rz: 6.4, p: 3, col: TR, tex: (mx, my, mz) => (mz > 0 && Math.abs(mx - .3) < .1) ? dk(TR, .7) : 0 });
      for (let i = 0; i < 2; i++) S({ pts: [[5 + i * 2, tz + 52 + b, tz + 5.4], [7 + i * 3 + Math.sin(t * 2 + i), tz + 60 + b, tz + 5], [8 + i * 3, tz + 66 + b, tz + 4 + Math.sin(t * 3)]], w: [3.2, 1.4], col: i ? dk(TR, .8) : TR });
      for (const sg of [-1, 1]) for (let i = 0; i < 3; i++) E({ x: sg * 3.7, y: 63 + i * 1.7 - 0.5, z: o.P.leg[sg > 0 ? 1 : 0].z * .8 + 1, rx: 3.6, ry: .6, rz: 3.6, col: wrap });
      E({ x: 0, y: tz + 34 + b, z: tz, rx: 6.6, ry: 2.4, rz: 5, col: dk(tun, .9), tex: (mx) => Math.sin(mx * 18) > .5 ? lt(tun, .12) : 0 });
      if (T >= 1) for (const sg of [-1, 1]) { E({ x: sg * 4, y: tz + 41 + b, z: tz + 5.4, rx: 3.4, ry: 3.4, rz: 1, col: TR, metal: 1, tex: (mx, my) => Math.hypot(mx, my) < .5 ? hx(0xff7a2a) : 0 }); }
      if (T >= 2) for (let i = 0; i < 5; i++) { const u = (t * .7 + i * .2) % 1; E({ x: Math.sin(i * 5 + t * 2) * 12, y: 66 - u * 46, z: Math.cos(i * 3) * 6, rx: .9, ry: .9, rz: .9, col: hx(0xff9a30), bias: 1 }); }
    });
  };
  // ===== APRENDIZ =====
  DES.aprendiz = (e, T) => {
    const C = palette(e, T); C.pack = true;
    const  tun = hx(e.tunic), TR = hx(e.trim ?? 0xe8b838); C.trim = TR; C.capeTrim = TR;
    const cfg = common(e, T, "aprendiz", {
      eye: 0x3d7bd0, blush: 1, top: tun, sleeve: tun, belt: hx(0x6a4426), pants: hx(e.pants), boots: hx(e.boots), bracer: hx(0x6a4426), metalLimb: 0,
      topTex: (mx, my, mz) => { const az = Math.atan2(mx, mz); if (my < -.78) return hx(0xefe6d0); if (my < -.7 && mz > 0 && (Math.floor(az * 12) & 1)) return hx(0xd8cbb0); if (mz > 0 && my < .2 && Math.abs((mx - my * .9) + .2) < .1) return hx(0x5a3a22); if (mz > 0 && my > .1 && my < .3 && Math.abs(mx - .2) < .2 && Math.abs(my - .22) < .1) return hx(0x6a4426); return 0; },
      wpn: (E, S, o) => { const H = o.R; if (!H || o.unarmed) return; const d = wd(H, o.P), h = H.h; o.P.marks.push({ n: "d", a: add(h, d, 3), b: add(h, d, 13.5), col: [220, 230, 255] }); S({ pts: [h, add(h, d, 3)], w: 2, col: hx(0x3a2a22) }); S({ pts: [add(h, d, 3), add(h, d, 13.5)], w: [3, .9], col: hx(0xd8dce8), metal: 1 }); S({ pts: [add(add(h, d, 3), [-3, 0, 0]), add(add(h, d, 3), [3, 0, 0])], w: 1.8, col: hx(0x9a8a60), metal: 1 }); },
      tweak: (P, a) => { if (a === 0) { P.arm[0] = { x: 7, y: 14, z: -2 }; P.arm[1] = { x: 7.2, y: 14, z: -2 }; } },
    });
    return finish(cfg, e, T, "aprendiz", C, (E, S, o) => {
      S({ pts: [[-6, o.tz + 37 + o.bob, o.tz + 3], [0, o.tz + 44 + o.bob, o.tz + 6], [7, o.tz + 52 + o.bob, o.tz + 3]], w: 1.6, col: hx(0x5a3a22) });
      E({ x: 0, y: o.tz + 34 + o.bob, z: o.tz, rx: 6.4, ry: 2, rz: 5, col: dk(tun, .9) });
    });
  };
  // ===== NPC genérico (mesmo padrão visual) =====
  function gearItem(g, E, S, o, C) {
    const H = o.R; if (!H || !g || g === "none") return; const h = H.h, d = nrm([.12, -1, .22]);
    if (g === "staff") { S({ pts: [add(h, d, -8), add(h, d, 30)], w: 1.9, col: hx(0x7a5030) }); const t2 = add(h, d, 32); ball(E, t2, 2.8, hx(0x7ad8ff), { bias: .8 }); S({ pts: [add(t2, [0, 3, 0]), add(t2, [3, 0, 0]), add(t2, [0, -3, 0])], w: 1, col: C.gold, metal: 1 }); }
    else if (g === "club" || g === "mace") { S({ pts: [add(h, d, -4), add(h, d, 16)], w: 2.2, col: hx(0x6a4220) }); E({ x: add(h, d, 18)[0], y: add(h, d, 18)[1], z: add(h, d, 18)[2], rx: 3.6, ry: 4, rz: 3.6, col: hx(0x7a5a38), tex: (mx, my) => Math.sin(mx * 12 + my * 9) > .7 ? hx(0xb0b4c0) : 0 }); }
    else if (g === "axe") { S({ pts: [add(h, d, -4), add(h, d, 22)], w: 2.1, col: hx(0x6a4220) }); const t2 = add(h, d, 19); S({ pts: [add(t2, d, 2), add(add(t2, d, 0), [6, 0, 0]), add(add(t2, d, -7), [5.4, 0, 0]), add(t2, d, -9)], w: [4, 3.6], col: C.steel2, metal: 1 }); }
    else if (g === "sword") { S({ pts: [h, add(h, d, 3)], w: 2, col: hx(0x5a3a22) }); S({ pts: [add(add(h, d, 3), [-3.4, 0, 0]), add(add(h, d, 3), [3.4, 0, 0])], w: 1.8, col: C.gold, metal: 1 }); S({ pts: [add(h, d, 3), add(h, d, 22)], w: [3, 1.4], col: C.steel, metal: 1 }); }
    else if (g === "spear") { S({ pts: [add(h, d, -8), add(h, d, 38)], w: 1.8, col: hx(0x7a5430) }); S({ pts: [add(h, d, 37), add(h, d, 45)], w: [3.4, .9], col: C.steel, metal: 1 }); }
    else if (g === "dagger") { S({ pts: [h, add(h, d, 2)], w: 2, col: hx(0x3a2a22) }); S({ pts: [add(h, d, 2), add(h, d, 11)], w: [2.8, .9], col: C.steel, metal: 1 }); }
    else if (g === "bow") { const x = h[0] + 1; S({ pts: [[x, h[1] - 20, h[2] - 3], [x, h[1], h[2] + 3], [x, h[1] + 20, h[2] - 3]], w: 1.9, col: hx(0x7a4a24) }); S({ pts: [[x, h[1] - 20, h[2] - 3], [x, h[1] + 20, h[2] - 3]], w: .8, col: hx(0xf0ead8) }); }
  }
  DES.npc = (e, T) => {
    const C = palette(e, T), tun = hx(e.tunic), TR = hx(e.trim ?? 0xe8b838), fem = !!e.slim, belly = !!e.belly, robe = !!e.robe;
    const cfg = common(e, T, e.cls, {
      eye: 0x4a3a2a, robe: robe ? 1 : 0, robeCol: dk(tun, .9), top: tun, sleeve: tun, belt: dk(TR, .85), pants: hx(e.pants), boots: hx(e.boots), bracer: dk(TR, .7), metalLimb: 0, bulk: belly ? 1.36 : fem ? .9 : 1.04, hipw: fem ? 1.06 : 1,
      robeTex: (mx, my, mz) => my > .9 ? TR : (mz > 0 && Math.abs(mx) < .08 && my > -.2 ? lt(tun, .35) : (Math.sin(mx * 12 + my * 3) > .75 ? lt(tun, .12) : 0)),
      topTex: (mx, my, mz) => { if (my < -.8) return TR; if (mz > 0 && Math.abs(mx) < .06 && my > -.6) return dk(tun, .6); if (mz > 0 && my > .3 && my < .4) return dk(TR, .8); return Math.sin(mx * 16 + my * 5) > .78 ? lt(tun, .1) : 0; },
      skirt: (fem && !robe) ? dk(tun, .92) : null, skirtTex: (mx, my) => my > .6 ? TR : 0,
      wpn: (E, S, o) => { cuff(S, o.R, tun, TR, 5.2); cuff(S, o.L, tun, TR, 5.2); gearItem(e.gear, E, S, o, C); },
      tweak: (P, a) => { if (a === 0) { P.leg[0].x = P.leg[1].x = 1; P.hx = 0; if (e.gear && e.gear !== "none") { P.arm[1] = { x: 10, y: 14, z: 3 }; } } },
    });
    if (e.pointyEars) cfg.pointy = true;
    return finish(cfg, e, T, e.cls, C, (E, S, o) => {
      const b = o.bob, tz = o.tz, hy = o.hy;
      E({ x: 0, y: tz + 34.2 + b, z: tz, rx: 6.8, ry: 2.4, rz: 5.2, col: dk(tun, .92), tex: (mx) => Math.sin(mx * 18) > .55 ? lt(tun, .14) : 0 });
      E({ x: 0, y: tz + 51.8 + b, z: tz + 5.8, rx: 2.4, ry: 2.2, rz: 1, col: TR, metal: 1 });
      if (belly) E({ x: 0, y: tz + 45 + b, z: tz + 5.4, rx: 8.6, ry: 7.4, rz: 4.4, col: tun });
      if (!robe) E({ x: -8, y: tz + 54 + b, z: tz + 3.6, rx: 2.4, ry: 3, rz: 2, col: dk(hx(e.boots), 1.1) });
      if (e.pointyEars) for (const sg of [-1, 1]) S({ pts: [[sg * 8.6, hy + 1, o.hz], [sg * 12.4, hy - 2.4, o.hz], [sg * 14.4, hy - 5, o.hz]], w: [3.2, .8], col: hx(e.skin) });
    });
  };
  // ---------- entrada ----------
  const KIND_BY_STYLE = { slash: "slash", quick: "quick", cast: "cast", stab: "stab", shoot: "shoot", punch: "punch", nova: "cast", bolt: "shoot", dash: "quick" };
  const ATKU = { slash: [.2, .41, .56], quick: [.16, .3, .46], cast: [.3, .5, .62], stab: [.22, .4, .54], shoot: [.34, .48, .6], punch: [.16, .3, .46] };
  const PERS = { slash: 1.5, quick: 1.1, cast: 1.6, stab: 1.3, shoot: 1.4, punch: 1.0 };
  const KDIR = { down: 0, dq: 1, side: 2, uq: 3, up: 4 };
  const WALK = { p: 1.0, a: .78, m: 1.4 };
  const SCALE = 2.1, CW = 300, GYY = 275, KS = 0.656;
  function ROX2(e, dir, frame, lvl, style) {
    const cls = e.cls, D = DES[cls] || DES.npc; if (!D) return null;
    if (DES[cls]) { e = { ...e, head: e.eqHead || "none" }; if (!e.eqBack) { e.cape = undefined; e.quiver = false; e.wingsBack = undefined; } }
    const T = e.ti || 0, fam = FAM[cls] || (e.gear === "club" ? "p" : "a"); if (!ATK[cls]) { ATK[cls] = "slash"; } const cfg = D(e, T);
    let anim, t, kind = ATK[cls];
    if (lvl > 0) { anim = 2; t = ATKU[kind][Math.min(3, lvl) - 1] * PERS[kind]; }
    else if (frame === -2) { anim = 5; t = 0; } else if (frame < 0) { anim = 0; t = 0; }
    else { anim = 1; t = frame / (typeof ea === "number" ? ea : 8) * WALK[fam]; }
    const d = render(cfg, KDIR[dir] ?? 0, anim, t, kind, fam, { S: SCALE, w: CW, h: CW, gy: GYY });
    const cv = document.createElement("canvas"); cv.width = CW; cv.height = CW;
    const cx = cv.getContext("2d"); cx.putImageData(new ImageData(d, CW, CW), 0, 0);
    return { cv, ax: CW / 2 * KS, ay: GYY * KS, k: KS };
  }
  ROX2.COSX = COSX; ROX2.CAT = CAT;
  ROX2.eng = { hx, mix, dk, TAU, clamp, Ctx, Img, put, ellipsoid, strip, outline };
  return ROX2;
})();
