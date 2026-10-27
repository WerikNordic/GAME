  // ---------- render ----------
  function render(cfg, kdir, anim, t, kind, fam, o) {
    const SC = o.S, w = o.w, h = o.h, gy = o.gy; const K = Ctx(kdir * Math.PI / 4);
    const mk = (a2, t2) => { const P_ = pose(a2, t2, fam, kind); if (cfg.tweak) cfg.tweak(P_, a2, t2, kind); return P_; };
    const prep = (P_, t_) => {
      const out = []; P_.marks = []; build(cfg, P_, out, t_); bend(out, P_); chibi(out);
      const trf = (p) => [p[0] * SC, (p[1] - 74) * SC + gy, p[2] * SC];
      for (const [kk, q] of out) { if (kk === "e") { q.x *= SC; q.z *= SC; q.rx *= SC; q.ry *= SC; q.rz *= SC; q.y = (q.y - 74) * SC + gy; } else { q.pts = q.pts.map(trf); q.w = Array.isArray(q.w) ? q.w.map((v) => v * SC) : q.w * SC; } }
      const mp = (p) => { const kk = clamp((56 - p[1]) / 36, 0, 1), hd = p[1] <= 30; let x = p[0] + P_.sx * kk + (hd ? P_.hx : 0), y = p[1] + (hd ? P_.hy : 0), z = p[2] + P_.lean * kk + (hd ? P_.hz : 0) + (P_.gz || 0); if (y <= HB) { x *= HS; z *= HS; y = ty(y); } else y = ty(y); x *= SC; z *= SC; y = (y - 74) * SC + gy; return [K.P(x, z) + w / 2, y]; };
      P_.mk = P_.marks.map((q) => ({ n: q.n, col: q.col, a: mp(q.a), b: mp(q.b) })); return out;
    };
    const I = new Img(w, h); const P = mk(anim, t); const out = prep(P, t);
    for (const [k2, q] of out) { if (k2 === "e") ellipsoid(I, K, q); else strip(I, K, q); }
    outline(I, 200);
    const px = (x, y, c) => { x = Math.round(x); y = Math.round(y); put(I, x, y, 1e9, c, 255); };
    if (P.armed) {
      const N = 4, dt = .028, hist = [P.mk];
      for (let j = 1; j <= N; j++) { const Pj = mk(anim, t - j * dt); prep(Pj, t - j * dt); hist.push(Pj.mk); }
      for (const m of P.mk) {
        const col = m.col;
        for (let j = 0; j < N; j++) {
          const A = hist[j].find((q) => q.n === m.n), B = hist[j + 1].find((q) => q.n === m.n); if (!A || !B) continue;
          const mv = Math.hypot(A.b[0] - B.b[0], A.b[1] - B.b[1]); if (mv < 3) continue;
          const L = Math.ceil(Math.hypot(A.b[0] - A.a[0], A.b[1] - A.a[1]));
          for (let s = 0; s <= L; s++) {
            const ks = s / (L || 1); const p0 = [A.a[0] + (A.b[0] - A.a[0]) * ks, A.a[1] + (A.b[1] - A.a[1]) * ks], p1 = [B.a[0] + (B.b[0] - B.a[0]) * ks, B.a[1] + (B.b[1] - B.a[1]) * ks];
            const n = Math.ceil(Math.hypot(p1[0] - p0[0], p1[1] - p0[1])) + 1;
            for (let v = 0; v <= n; v++) { const kv = v / n, f = 1 - (j + kv) / N; if (f > .12 && ks > .55) { const l2 = f > .66 ? .85 : f > .38 ? .45 : .1; px(p0[0] + (p1[0] - p0[0]) * kv, p0[1] + (p1[1] - p0[1]) * kv, [col[0] + (255 - col[0]) * l2, col[1] + (255 - col[1]) * l2, col[2] + (255 - col[2]) * l2]); } }
          }
        }
      }
    }
    return I.d;
  }
  // ---------- cabelo ----------
  const HX = { pony: 1, ponyhigh: 1, twin: 1, twinhigh: 1, lowtwin: 1, braid: 1, braidc: 1, dbraid: 1, bun: 1, buns: 1, lowbun: 1, topknot: 1, mohawk: 1, spikes: 1, curl: 1, bob: 1, wave: 1, halfup: 1, mane: 1, hime: 1 };
  const FRINGE = [() => -.32, (az) => .12 * Math.abs(Math.sin(az * 5)), (az) => .2 + .16 * az, (az) => .2 - .16 * az, (az) => .24 * Math.abs(Math.sin(az * 2)), (az) => .16 * Math.abs(Math.sin(az * 7)), (az) => .04, (az) => -.08, (az) => .3];
  function hairSpec(e) {
    const hv = e.hvp; let st = e.hairStyle || "short", L, F, T, X;
    if (hv) { L = hv.L; F = hv.F; T = hv.T; X = hv.X || ""; }
    else {
      L = st === "long" ? 3 : st === "mane" ? 3 : st === "ponytail" || st === "braid" ? 1 : 0; F = st === "fringe" ? 2 : st === "crop" ? 7 : 1; T = 1; X = st === "ponytail" ? "pony" : st === "braid" ? "braid" : st === "topknot" ? "topknot" : st === "mane" ? "mane" : "";
    }
    return { bald: st === "bald" && !hv, L, F, T, X };
  }
  function hairFn(e, hc, cover) {
    const hs = hairSpec(e); if (hs.bald) return () => { };
    return (E, S, o) => {
      const { hy, hz } = o, tt = o.t, L = hs.L, X = hs.X; const T = [.92, 1, 1.07, 1.2][clamp(hs.T, 0, 3)];
      const hc2 = hc, hl = mix(hc, [255, 236, 190], .22), hd = dk(hc, .8);
      const sw = (i, a = 1) => Math.sin(tt * 2.4 + i) * .5 * a;
      if (!cover) {
        const mo = X === "mohawk";
        E({ x: 0, y: hy - 1.6, z: hz - .8, rx: 9.6 * T, ry: 11.4 * (X === "bun" || X === "buns" ? 1 : 1), rz: 9.8 * T, col: hc, tex: hairCap({ hair: hc }, { bangs: mo ? () => -.5 : FRINGE[clamp(hs.F, 0, 8)], side: mo ? -.2 : L >= 1 ? .62 : .32, back: mo ? .45 : L >= 1 ? .95 : .82 }) });
        if (X === "curl" || hs.T === 3) for (let i = 0; i < 9; i++) { const a = i / 9 * TAU; E({ x: Math.cos(a) * 9, y: hy - 6 + (i % 3), z: hz - 1 + Math.sin(a) * 8.4, rx: 2.8, ry: 2.8, rz: 2.8, col: i % 2 ? hc : hl }); }
      }
      if (L >= 1 && X !== "bob") { // massa de cabelo atrás
        const len = [0, 12, 22, 32, 44][L];
        for (let i = -1; i <= 1; i++) S({ pts: [[i * 3.6, hy + 2, hz - 8], [i * 4.2, hy + len * .5, hz - 9.6 + sw(i)], [i * 3.6 + sw(i + 2), hy + len, hz - 8.6]], w: [4.4, i ? 2.4 : 3.2], col: (q) => (Math.floor(q * 8) & 1) ? hc : hl });
        if (L >= 2 && !cover) for (const sg of [-1, 1]) S({ pts: [[sg * 9.2, hy + 3, hz + 2], [sg * 9.8, hy + len * .45, hz + 3 + sw(sg)], [sg * 8.6, hy + len * .8, hz + 3.4]], w: [3.4, 2.2], col: (q) => (Math.floor(q * 8) & 1) ? hc : hl });
      }
      const tail = (x, y0, len, wd0, sg0) => S({ pts: [[x, y0, hz - 9], [x * 1.2, y0 + len * .35, hz - 13.6 + sw(1)], [x * 1.5 + sg0 * sw(2, 2), y0 + len, hz - 12.4 + sw(3)]], w: [wd0, 1.8], col: (q) => (Math.floor(q * 9) & 1) ? hc : hl });
      if (X === "pony") tail(0, hy - 3, 16, 5.4, 1); else if (X === "ponyhigh") tail(0, hy - 9, 18, 5, 1);
      else if (X === "twin" || X === "twinhigh" || X === "lowtwin") for (const sg of [-1, 1]) { const y0 = X === "twinhigh" ? hy - 7 : X === "lowtwin" ? hy + 4 : hy - 2; S({ pts: [[sg * 9.4, y0, hz - 2], [sg * 12.6, y0 + 8, hz - 3 + sw(sg)], [sg * 12 + sw(sg + 3), y0 + 17, hz - 2.4]], w: [4.6, 1.8], col: (q) => (Math.floor(q * 9) & 1) ? hc : hl }); }
      else if (X === "braid" || X === "braidc" || X === "dbraid") { const xs = X === "braidc" ? [0] : X === "dbraid" ? [-8.4, 8.4] : [8]; for (const x of xs) { const zz = X === "braidc" ? hz - 9.6 : hz + 3; S({ pts: [[x, hy + 3, zz], [x * 1.08, hy + 14, zz + (X === "braidc" ? -.8 : .6) + sw(x)], [x * 1.1 + sw(x + 2), hy + 25, zz + 0.4]], w: [3.8, 2.4], col: (q) => (Math.floor(q * 12) & 1) ? hc : hd }); } }
      if (X === "bun" || X === "topknot") { E({ x: 0, y: hy - 12.4, z: hz - 2.4, rx: X === "bun" ? 4.6 : 3.4, ry: X === "bun" ? 4.2 : 3.4, rz: X === "bun" ? 4.4 : 3.4, col: hc, tex: (mx, my) => Math.abs(Math.sin(mx * 7 + my * 5)) < .14 ? hd : 0 }); if (X === "topknot") S({ pts: [[0, hy - 13, hz - 3], [-2, hy - 17, hz - 5], [-5, hy - 16, hz - 8.4]], w: [3, 1.4], col: hc }); }
      if (X === "buns") for (const sg of [-1, 1]) E({ x: sg * 6.4, y: hy - 11.4, z: hz - 2, rx: 3.8, ry: 3.8, rz: 3.8, col: hc });
      if (X === "lowbun" || X === "halfup") E({ x: 0, y: hy + (X === "halfup" ? -5 : 5), z: hz - 10.6, rx: 4, ry: 3.8, rz: 3.6, col: hc });
      if (X === "mohawk") S({ pts: [[0, hy - 8, hz + 6], [0, hy - 14, hz + 1], [0, hy - 13, hz - 6], [0, hy - 5, hz - 10]], w: [3.4, 3.8, 3.4, 2.4], col: hc });
      if (X === "spikes") for (let i = 0; i < 6; i++) { const a = -1 + i * .4; S({ pts: [[Math.sin(a) * 6, hy - 9, hz + Math.cos(a) * 5 - 2], [Math.sin(a) * 9, hy - 14 - (i % 2) * 2, hz + Math.cos(a) * 6 - 3], [Math.sin(a) * 12, hy - 17 - (i % 2) * 3, hz + Math.cos(a) * 6 - 4]], w: [4.2, .8], col: hc }); }
      if (X === "mane") for (let i = 0; i < 6; i++) { const x = -7 + i * 2.8; S({ pts: [[x, hy - 9, hz + 2], [x * 1.2, hy - 15 - (i % 2) * 2, hz - 4], [x * 1.4, hy - 13 + i * 1.4, hz - 11]], w: [4.4, 1.2], col: hc }); }
      if (X === "bob") E({ x: 0, y: hy + 3.6, z: hz - 1.6, rx: 10.4, ry: 6.8, rz: 9.6, col: hc, tex: (mx, my, mz) => (mz > .1 && my < .4) ? null : (Math.sin(mx * 14) > .7 ? hl : 0) });
      if (X === "hime") for (const sg of [-1, 1]) S({ pts: [[sg * 8.2, hy + 1, hz + 5], [sg * 8.8, hy + 12, hz + 5.6], [sg * 8.2, hy + 24, hz + 5]], w: [3.6, 2.6], col: hc });
    };
  }
  // ---------- cabeça: itens ----------
  function headMain(kind, E, S, o, e, C) {
    const { hy, hz } = o, tt = o.t;
    const G = C.gold, G2 = dk(C.gold, .75), st = C.steel, st2 = C.steel2;
    if (kind === "hat") { // chapéu de mago
      const cl = C.hatC, cl2 = dk(cl, .8), tp = C.tier >= 1 ? 1 : .82;
      E({ x: 0, y: hy - 6.4, z: hz, rx: 11.6 * tp + .6, ry: 1.7, rz: 10.6 * tp + .6, col: cl2, tex: (mx, my, mz) => Math.hypot(mx, mz) > .9 ? G : 0 });
      S({ pts: [[0, hy - 7, hz - .6], [0, hy - 14 * tp, hz - 2], [-2, hy - 20 * tp, hz - 4], [-6, hy - 23 * tp + Math.sin(tt * 3) * .6, hz - 5]], w: [11.4, 8, 4.4, 1.6], col: (q) => Math.sin(q * 30) > .6 ? lt(cl, .18) : cl });
      for (const [x, y, z] of [[-3, -11, 5], [3, -15, 4], [-2, -19, 3]]) if (C.tier >= 1) E({ x, y: hy + y * tp, z: hz + z, rx: 1.4, ry: 1.4, rz: .8, col: hx(0xffe890), bias: .9 });
      E({ x: 0, y: hy - 8.2, z: hz, rx: 9.6, ry: 1.5, rz: 9.4, col: G, metal: 1 }); E({ x: 0, y: hy - 8.2, z: hz + 9.2, rx: 2.2, ry: 1.8, rz: .8, col: hx(0xfff4c0), metal: 1, bias: .4 });
    } else if (kind === "helm" || kind === "helmH") { // elmo angular, sem asas
      E({ x: 0, y: hy - 5, z: hz - .2, rx: 9.8, ry: 8.8, rz: 9.8, p: 3.6, col: st, metal: 1, tex: (mx, my, mz) => { if (mz > 0 && my > .3) return null; if (my > .2 && mz <= 0) return null; if (Math.abs(mx) < .07) return st2; if (my > -.05 && my < .3 && mz > 0) return G; return 0; } });
      E({ x: 0, y: hy - 6.2, z: hz + .2, rx: 10.2, ry: 1.1, rz: 10.4, p: 3.6, col: G, metal: 1 });
      S({ pts: [[0, hy - 11.5, hz + 9], [0, hy - 17.5, hz + 1], [0, hy - 15, hz - 9]], w: [2.2, 3.4, 2], col: C.crest, metal: 1 });
      S({ pts: [[0, hy - 6, hz + 9.4], [0, hy + 2.6, hz + 9.6]], w: 1.7, col: st, metal: 1 });
      for (const sg of [-1, 1]) { E({ x: sg * 8.6, y: hy + 1.2, z: hz + 1, rx: 1.7, ry: 4.8, rz: 5.4, p: 3.2, col: st, metal: 1, tex: (mx, my) => Math.abs(my) > .86 ? G : 0 }); }
      if (kind === "helmH") for (const sg of [-1, 1]) S({ pts: [[sg * 9.6, hy - 7, hz], [sg * 14.2, hy - 9, hz], [sg * 15.6, hy - 14, hz], [sg * 13.6, hy - 19, hz]], w: [4.4, 1.2], col: hx(0xf0e6c8) });
    } else if (kind === "hood" || kind === "furhood") { // capuz
      const cl = kind === "hood" ? C.hoodC : hx(0x8a8e96);
      E({ x: 0, y: hy - 1, z: hz - .8, rx: 9.7, ry: 11.2, rz: 9.7, p: 3.4, col: cl, tex: (mx, my, mz) => { const az = Math.atan2(mx, mz), el = Math.asin(clamp(my, -1, 1)); if (mz > 0 && Math.abs(mx) < .64 && my > -.36 && my < .6) return null; if (mz > .2 && Math.abs(az) < 1.12 && el > -.42 && el < 1 && (Math.abs(az) > .94 || el < -.3)) return C.hoodTrim; return kind === "hood" ? (Math.sin(az * 10 + el * 3) > .72 ? lt(cl, .14) : (Math.sin(az * 7) < -.8 ? dk(cl, .6) : 0)) : (Math.sin(az * 14 + my * 10) > .4 ? hx(0xb0b4bc) : (Math.sin(az * 9) < -.6 ? hx(0x62666e) : 0)); } });
      if (kind === "hood") { S({ pts: [[0, hy - 9, hz - 1], [0, hy - 14, hz - 4], [-2, hy - 16.5, hz - 9], [-7, hy - 15, hz - 15]], w: [8, 5, 2.4, .5], col: cl }); }
      else for (const sg of [-1, 1]) { S({ pts: [[sg * 6, hy - 9, hz - 2], [sg * 7.4, hy - 13, hz - 2], [sg * 7, hy - 17, hz - 2]], w: [5, 1.6], col: cl }); S({ pts: [[sg * 6.2, hy - 9.4, hz - 1], [sg * 7, hy - 12.6, hz - 1]], w: [2.4, 1], col: hx(0xd8a0a0) }); }
    } else if (kind === "hood2") {
      E({ x: 0, y: hy - 1, z: hz - .8, rx: 10, ry: 11.4, rz: 10, p: 3.4, col: hx(0x4f6e3c), tex: (mx, my, mz) => { if (mz > 0 && Math.abs(mx) < .64 && my > -.36 && my < .6) return null; return Math.sin(Math.atan2(mx, mz) * 9) > .7 ? hx(0x62854a) : 0; } });
    } else if (kind === "band") { // faixa simples na testa
      E({ x: 0, y: hy - 4.4, z: hz, rx: 9.8, ry: 1.6, rz: 9.2, col: C.trim, tex: (mx, my, mz) => (mz < -.3) ? 0 : 0 });
      if (o.tailBand) S({ pts: [[-2, hy - 4.4, hz - 9], [-4, hy + 2, hz - 11.4 + Math.sin(tt * 3)], [-5 + Math.sin(tt * 2), hy + 11, hz - 11.6]], w: [2.6, 1.4], col: C.trim });
    } else if (kind === "beanie") {
      E({ x: 0, y: hy - 6.6, z: hz - .2, rx: 10, ry: 7.4, rz: 9.8, col: hx(0xc23a3a), tex: (mx, my, mz) => my > .5 ? hx(0xe8dcc4) : (Math.sin(mx * 18) > .8 ? hx(0xa42c2c) : 0) });
      E({ x: 0, y: hy - 13.4, z: hz - .2, rx: 2.8, ry: 2.8, rz: 2.8, col: hx(0xf4eddc) });
    } else if (kind === "wreath") {
      for (let i = 0; i < 16; i++) { const a = i / 16 * TAU; E({ x: Math.cos(a) * 9.6, y: hy - 6.4 + Math.sin(a) * .4, z: hz - .6 + Math.sin(a) * 8.8, rx: i % 4 === 1 ? 1.5 : 2.3, ry: i % 4 === 1 ? 1.5 : 1.7, rz: 1.8, col: i % 4 === 1 ? hx(0xd23a3a) : (i % 2 ? hx(0x3f8a3a) : hx(0x5aa84a)) }); }
    } else if (kind === "bandana") {
      E({ x: 0, y: hy - 4.8, z: hz, rx: 9.9, ry: 2.4, rz: 9.4, col: hx(0xb81e1e), tex: (mx, my) => my > .5 ? hx(0xd23a3a) : 0 });
      S({ pts: [[-3, hy - 4.6, hz - 9], [-5, hy + 2, hz - 11.4 + Math.sin(tt * 3)], [-6, hy + 10, hz - 11.6]], w: [3.4, 1.4], col: hx(0xb81e1e) });
    } else if (kind === "feathercap") {
      E({ x: 0, y: hy - 6.6, z: hz - .2, rx: 10, ry: 7, rz: 9.8, col: hx(0x3f7a3a) }); E({ x: 0, y: hy - 3.8, z: hz, rx: 12.6, ry: 1.5, rz: 11.4, col: hx(0x2f5a2c) });
      S({ pts: [[7, hy - 10, hz + 1], [13, hy - 17, hz - 3], [18, hy - 24, hz - 6]], w: [2.4, .8], col: hx(0xf0e8d6) });
    } else if (kind === "crown" || kind === "crowngold") {
      const m = kind === "crown" ? hx(0xc88a3a) : hx(0xf4c840);
      E({ x: 0, y: hy - 7.6, z: hz, rx: 9.6, ry: 2.1, rz: 9.2, col: m, metal: 1 });
      for (let i = 0; i < 6; i++) { const a = i / 6 * TAU + .5; S({ pts: [[Math.cos(a) * 8.6, hy - 8.6, hz + Math.sin(a) * 8.2], [Math.cos(a) * 9, hy - 13.4, hz + Math.sin(a) * 8.6]], w: [3.2, 1], col: m, metal: 1 }); E({ x: Math.cos(a) * 9, y: hy - 14, z: hz + Math.sin(a) * 8.6, rx: 1, ry: 1, rz: 1, col: i % 2 ? hx(0xff6a8a) : hx(0x8ae8ff), bias: .6 }); }
    } else if (kind === "santa") {
      E({ x: 0, y: hy - 7.4, z: hz - .6, rx: 10, ry: 7.4, rz: 9.8, col: hx(0xc4202a) }); E({ x: 0, y: hy - 5.2, z: hz, rx: 10.4, ry: 2.2, rz: 10, col: hx(0xf6f2ea) });
      S({ pts: [[0, hy - 12, hz - 3], [-2, hy - 15, hz - 9], [-5, hy - 14, hz - 14]], w: [6, 3], col: hx(0xc4202a) }); E({ x: -5, y: hy - 12, z: hz - 14.6, rx: 2.6, ry: 2.6, rz: 2.6, col: hx(0xf6f2ea) });
    }
  }
  function headExtra(kind, E, S, o, e, C) { // ornamentos que se somam
    const { hy, hz } = o;
    if (kind === "circlet") { E({ x: 0, y: hy - 4.4, z: hz, rx: 9.8, ry: 1.2, rz: 9.4, col: C.gold, metal: 1 }); E({ x: 0, y: hy - 4.6, z: hz + 9.2, rx: 1.6, ry: 1.8, rz: 1, col: hx(0xbff0ff), bias: .8, metal: 1 }); }
    else if (kind === "wings") { // tiara + auréola (sem asas)
      E({ x: 0, y: hy - 4.4, z: hz, rx: 9.8, ry: 1.2, rz: 9.4, col: C.gold, metal: 1 }); E({ x: 0, y: hy - 6.2, z: hz + 9.4, rx: 1.4, ry: 2.2, rz: 1, col: hx(0xff7a9a), bias: .8, metal: 1 });
      for (let i = 0; i < 24; i++) { const a = i / 24 * TAU; E({ x: Math.cos(a) * 6.6, y: hy - 13.6 + Math.sin(a) * 1.1, z: hz - 3.2, rx: .65, ry: .65, rz: .65, col: hx(0xfff0a0), bias: 1 }); }
    } else if (kind === "halo") { for (let i = 0; i < 24; i++) { const a = i / 24 * TAU; E({ x: Math.cos(a) * 6.6, y: hy - 13.6 + Math.sin(a) * 1.1, z: hz - 3.2, rx: .65, ry: .65, rz: .65, col: hx(0xfff0a0), bias: 1 }); } }
  }
  function lowItems(low, E, S, o, e, C) {
    const { hy, hz, bob, tz } = o;
    if (low === "scarf" || low === "scarf2") { const c = low === "scarf" ? hx(0xb04a2a) : hx(0x5a7aa8); E({ x: 0, y: tz + 33.4 + bob, z: tz + .6, rx: 7, ry: 3.2, rz: 5.4, col: c, tex: (mx) => Math.sin(mx * 22) > .5 ? lt(c, .16) : 0 }); S({ pts: [[3, tz + 35 + bob, tz + 4], [6 + Math.sin(o.t * 2), tz + 44 + bob, tz + 3], [7 + Math.sin(o.t * 2 + 1), tz + 52 + bob, tz + 1]], w: [4, 2.2], col: c }); }
    else if (low === "mask") { E({ x: 0, y: hy + 6.4, z: hz + 3.2, rx: 7.4, ry: 4.2, rz: 5.6, col: hx(0x6a4a2e), tex: (mx, my, mz) => (mz > 0 && my < -.5) ? null : (Math.abs(my - .2) < .1 ? hx(0x8a6a44) : 0) }); }
    else if (low === "beard") { const b = hx(e.hair); S({ pts: [[0, hy + 8, hz + 5], [0, hy + 15, hz + 6.4], [0, hy + 25, hz + 5.6]], w: [10, 8, 2.6], col: (q) => Math.sin(q * 28) > .55 ? lt(b, .16) : b }); for (const sg of [-1, 1]) S({ pts: [[sg * 3, hy + 8, hz + 4], [sg * 5, hy + 14, hz + 5], [sg * 3.4, hy + 20, hz + 4.6]], w: [4.4, 1.6], col: b }); }
  }
  function midItems(mid, E, S, o, e) {
    const { hy, hz } = o;
    if (mid === "goggles") { for (const sg of [-1, 1]) { E({ x: sg * 3.6, y: hy - .4, z: hz + 7.6, rx: 3.2, ry: 2.8, rz: 1.8, col: hx(0xb88a3a), metal: 1, tex: (mx, my, mz, X, Y) => Math.hypot(X, Y) < .62 ? hx(0x9ad8e8) : 0 }); } S({ pts: [[-9, hy - .6, hz + 2], [0, hy - .6, hz + 8.6], [9, hy - .6, hz + 2]], w: 1.4, col: hx(0x5a3a22) }); }
    else if (mid === "eyepatch") { E({ x: -3.4, y: hy - .4, z: hz + 7.4, rx: 3, ry: 2.8, rz: 1.8, col: hx(0x1a1a22) }); S({ pts: [[-9, hy - 3, hz + 2], [-4, hy - 2, hz + 8], [8, hy + 1, hz + 6]], w: 1, col: hx(0x1a1a22) }); }
  }
  // ---------- itens de costas ----------
  function backItems(E, S, o, e, C) {
    const { bob, tz, t } = o; const cw = (e.cw || 0) * 3;
    if (e.cape != null && !C.noCape) {
      const cc = hx(e.cape), c2 = dk(cc, .84);
      for (let i = 0; i < 4; i++) { const x = -7.5 + i * 5; S({ pts: [[x, tz + 37 + bob, tz - 5.6], [x * 1.1 + cw * .4, tz + 52 + bob, tz - 8.5 + Math.sin(t * 2 + i) * .8], [x * 1.2 + cw, tz + (C.capeL || 64) + bob, tz - 9 + Math.sin(t * 2 + i + 1) * 1.2]], w: [5.6, 6.6], col: i % 2 ? cc : c2, bias: -.1 }); }
      if (C.capeTrim) { S({ pts: [[-9, tz + 37 + bob, tz - 5.6], [-10.5 + cw * .4, tz + 52 + bob, tz - 8.5], [-11 + cw, tz + (C.capeL || 64) + bob, tz - 9]], w: 1.2, col: C.capeTrim }); S({ pts: [[9, tz + 37 + bob, tz - 5.6], [10.5 + cw * .4, tz + 52 + bob, tz - 8.5], [11 + cw, tz + (C.capeL || 64) + bob, tz - 9]], w: 1.2, col: C.capeTrim }); }
    }
    if (e.quiver) {
      S({ pts: [[-4, tz + 34 + bob, tz - 7], [-3, tz + 54 + bob, tz - 8]], w: [5.4, 5], col: hx(0x6a4a2a), bias: -.05 });
      for (let i = 0; i < 3; i++) { S({ pts: [[-5 + i * 2, tz + 34 + bob, tz - 7.5], [-6 + i * 2.4, tz + 28 + bob, tz - 8.5]], w: 1.4, col: hx(0xe8e0c8) }); E({ x: -6 + i * 2.4, y: tz + 27.4 + bob, z: tz - 8.5, rx: 1.8, ry: 1.6, rz: 1, col: i % 2 ? hx(0xd04830) : hx(0xf0e8d0) }); }
      S({ pts: [[-6, tz + 36 + bob, tz - 2], [6, tz + 50 + bob, tz + 4]], w: 1.5, col: hx(0x4a3220) });
    }
    if (e.wingsBack) {
      const wa = hx(e.wingsBack[0]), wb = hx(e.wingsBack[1]); const WT = [[13, -18], [19, -12], [22, -4], [21, 5], [17, 12]];
      for (const sg of [-1, 1]) for (let L = 1; L >= 0; L--) WT.forEach((w, i) => { const k = L ? .72 : 1, rt = [sg * 4, tz + 37 + bob, tz - 5.5 - L * .6], tp = [sg * (4 + w[0] * k), tz + 37 + bob + w[1] * k + (L ? 3 : 0) + Math.sin(t * 3 + i) * .5, tz - 7 - L]; S({ pts: [rt, [(rt[0] + tp[0]) / 2, (rt[1] + tp[1]) / 2 + 2, rt[2] - .5], tp], w: [5.2, 1.6], col: L ? wb : wa, bias: -.05 }); });
    }
  }
  //__DESIGNS__
