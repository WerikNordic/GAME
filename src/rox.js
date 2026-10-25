// ===== ROX: sprites pixel-art chibi detalhados (rig 3D -> pixels) =====
var ROX = (() => {
  const SW = 184, SH = 184, AX = 92, AY = 166, K = 1.3;
  const hexc = (h) => [(h >> 16) & 255, (h >> 8) & 255, h & 255];
  const mixc = (a, b, t) => [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t, a[2] + (b[2] - a[2]) * t];
  const rcache = new Map();
  function ramp(h) {
    let r = rcache.get(h); if (r) return r;
    const b = hexc(h), lum = (b[0] * .3 + b[1] * .59 + b[2] * .11) / 255;
    const sh = [34, 18, 62], hi = [255, 238, 190];
    r = [mixc(b, sh, .62), mixc(b, sh, .36), mixc(b, sh, .08), mixc(b, hi, .2 + (1 - lum) * .06), mixc(b, hi, .46)];
    rcache.set(h, r); return r;
  }
  const BAY = [[0, 8, 2, 10], [12, 4, 14, 6], [3, 11, 1, 9], [15, 7, 13, 5]].map((r) => r.map((v) => v / 16 - .5));
  const LX = [-.45, -.62, .64], LM = Math.hypot(...LX), LV = LX.map((v) => v / LM);
  function shade(nx, ny, nz, x, y, bias) {
    const d = Math.max(0, nx * LV[0] + ny * LV[1] + nz * LV[2]);
    const t = d * 1.05 + (bias || 0) + BAY[y & 3][x & 3] * .11;
    return Math.max(0, Math.min(4, Math.floor(t * 4.6)));
  }
  function hashn(x, y, s = 0) { let n = (x * 374761393 + y * 668265263 + s * 2147483647) | 0; n = (n ^ (n >>> 13)) * 1274126177 | 0; return ((n ^ (n >>> 16)) >>> 0) / 4294967296; }
  const CP = {
    berserker: { k: 1.36, wx: 1.12, tw: 1.14, lg: 1.12, hair: "mane", sit: "spread" },
    escudeiro: { k: 1.4, wx: 1.18, tw: 1.24, lg: 1.2, hair: "crop", sit: "guard" },
    cacador: { k: 1.26, wx: .94, tw: .9, lg: .92, hair: "ponytail", sit: "perch" },
    volva: { k: 1.2, wx: .88, tw: .84, lg: .88, hair: "long", sit: "cross" },
    valquiria: { k: 1.32, wx: .96, tw: .94, lg: .96, hair: "braid", sit: "kneel" },
    skald: { k: 1.24, wx: .9, tw: .88, lg: .86, hair: "fringe", sit: "lean" },
    thay: { k: 1.3, wx: 1, tw: 1.02, lg: 1, hair: "topknot", sit: "perch2" }
  };
  const NPP = {
    brokk: { t: 0, k: 1.4, wx: 1.2, tw: 1.26, lg: 1.2 }, torvald: { t: 0, k: 1.38, wx: 1.18, tw: 1.22, lg: 1.18 },
    bruna: { t: 0, k: 1.3, wx: 1.06, tw: 1.04, lg: 1 }, munin: { t: 0, k: 1.2, wx: .9, tw: .86, lg: .9 },
    sigrun: { t: 0, k: 1.22, wx: .9, tw: .86, lg: .9 }, cronista: { t: 0, k: 1.22, wx: .92, tw: .9, lg: .9 },
    arauto: { t: 1, k: 1.34, wx: 1.04, tw: 1.04, lg: 1 }, questor: { t: 0, k: 1.28, wx: .96, tw: .94, lg: .94 },
    ottar: { t: 1, k: 1.4, wx: 1.16, tw: 1.2, lg: 1.14 }, checkpoint: { t: 2, k: 1.42, wx: 1.18, tw: 1.24, lg: 1.16 },
    eira: { t: 1, k: 1.3, wx: .96, tw: .94, lg: .96 }, ylva: { t: 0, k: 1.26, wx: .94, tw: .9, lg: .92 },
    estilista: { t: 0, k: 1.26, wx: .9, tw: .86, lg: .9 }
  };
  return function ROX(e, dir, frame, lvl, style) {
    const NP = NPP[e.cls];
    const T = CP[e.cls] ? (e.ti || 0) : NP ? NP.t : 1;
    const prof = CP[e.cls] || NP || { k: 1.3, wx: 1, tw: 1, lg: 1, hair: "", sit: "" };
    const K = prof.k, WX = prof.wx, hsty = prof.hair;
    const yawT = { down: 0, dq: Math.PI / 4, side: Math.PI / 2, uq: Math.PI * 3 / 4, up: Math.PI };
    const th = yawT[dir] ?? 0, cth = Math.cos(th), sth = Math.sin(th);
    const walking = frame >= 0, sit = frame === -2;
    const ph = walking ? (frame / 12) * Math.PI * 2 : 0;
    const buf = new Array(SW * SH).fill(null);
    const put = (x, y, c) => { x |= 0; y |= 0; if (x < 0 || y < 0 || x >= SW || y >= SH) return; buf[y * SW + x] = c; };
    const sx = (x, z) => AX + (x * cth * WX + z * sth) * K;
    const sy = (y) => AY + (y - 98) * K - (sit ? -6 : 0);
    const dp = (x, z) => z * cth - x * sth;
    const parts = [];
    const add = (d, fn) => parts.push({ d, fn });
    const cls = e.cls;
    const P = (h) => ramp(h);
    const hairR = (h) => { const b = hexc(h), lum = (b[0] * .3 + b[1] * .59 + b[2] * .11) / 255, s2 = lum < .3 ? 1.6 : 1.22; const bb = b.map((v) => Math.min(255, v * s2)); return [mixc(bb, [60, 20, 40], .5), mixc(bb, [60, 20, 40], .26), bb, mixc(bb, [255, 236, 170], .3), mixc(bb, [255, 250, 210], .6)]; }, skinR = (h) => { const b = hexc(h), sh = [150, 70, 80], hi = [255, 240, 220]; return [mixc(b, sh, .42), mixc(b, sh, .2), mixc(b, [255,220,200], .06), mixc(b, hi, .35), mixc(b, hi, .6)]; }, skin = skinR(e.skin ?? 15780008), hair = hairR(e.hair ?? 9058850), tunic = P(e.tunic ?? 9054758), trim = P(e.trim ?? 15254090), pants = P(((e.pants ?? 5914414) & 0xfefefe) / 2 + 0x606060 | 0), boots = P(e.boots ?? 3876120);
    const cape = e.cape ? P(e.cape) : null, metal = P(0xaab4c8), gold = P(0xe8b43a), leather = P(0x7a4e2c);
    const pauld = e.pauld ? P(e.pauld) : null, hairStyle = e.hairStyle ?? "short";
    const bodyW = (rx, rz) => Math.hypot(rx * cth, rz * sth) * K;
    // primitivas em pixels (espaço tela)
    function ellS(cx, cy, rx, ry, rm, bias = 0, sd = 1) {
      rx = Math.max(.6, rx); ry = Math.max(.6, ry);
      for (let y = Math.floor(cy - ry - 1); y <= cy + ry + 1; y++) for (let x = Math.floor(cx - rx - 1); x <= cx + rx + 1; x++) {
        const nx = (x + .5 - cx) / rx, ny = (y + .5 - cy) / ry, r2 = nx * nx + ny * ny; if (r2 > 1) continue;
        put(x, y, rm[shade(nx * sd, ny, Math.sqrt(1 - r2), x, y, bias)]);
      }
    }
    function capS(x0, y0, x1, y1, r0, r1, rm, bias = 0) {
      const dx = x1 - x0, dy = y1 - y0, l2 = dx * dx + dy * dy || 1, rr = Math.max(r0, r1) + 1;
      for (let y = Math.floor(Math.min(y0, y1) - rr); y <= Math.max(y0, y1) + rr; y++) for (let x = Math.floor(Math.min(x0, x1) - rr); x <= Math.max(x0, x1) + rr; x++) {
        let t = ((x + .5 - x0) * dx + (y + .5 - y0) * dy) / l2; t = Math.max(0, Math.min(1, t));
        const cx = x0 + dx * t, cy = y0 + dy * t, r = r0 + (r1 - r0) * t, ex = x + .5 - cx, ey = y + .5 - cy, d = Math.hypot(ex, ey); if (d > r) continue;
        const nx = ex / r, ny = ey / r; put(x, y, rm[shade(nx, ny, Math.sqrt(Math.max(0, 1 - nx * nx - ny * ny)), x, y, bias)]);
      }
    }
    function polyS(pts, fn) {
      let y0 = Math.floor(Math.min(...pts.map((p) => p[1]))), y1 = Math.ceil(Math.max(...pts.map((p) => p[1])));
      for (let y = y0; y <= y1; y++) {
        const xs = [];
        for (let i = 0; i < pts.length; i++) { const a = pts[i], b = pts[(i + 1) % pts.length]; if ((a[1] <= y + .5 && b[1] > y + .5) || (b[1] <= y + .5 && a[1] > y + .5)) xs.push(a[0] + (y + .5 - a[1]) / (b[1] - a[1]) * (b[0] - a[0])); }
        xs.sort((a, b) => a - b);
        for (let k = 0; k + 1 < xs.length; k += 2) for (let x = Math.round(xs[k]); x < Math.round(xs[k + 1]); x++) { const c = fn(x, y); if (c) put(x, y, c); }
      }
    }
    const lineS = (x0, y0, x1, y1, c) => { const n = Math.ceil(Math.hypot(x1 - x0, y1 - y0)); for (let i = 0; i <= n; i++) put(x0 + (x1 - x0) * i / n, y0 + (y1 - y0) * i / n, c); };
    const rampAt = (rm, t) => rm[Math.max(0, Math.min(4, Math.floor(t * 5)))];
    // ---- 3D helpers (x lateral, y down, z forward) ----
    const E3 = (x, y, z, rx, ry, rz, rm, bias = 0) => add(dp(x, z), () => ellS(sx(x, z), sy(y), bodyW(rx, rz), ry * K, rm, bias, Math.sign(cth) || 1));
    const C3 = (x0, y0, z0, x1, y1, z1, r0, r1, rm, bias = 0) => add((dp(x0, z0) + dp(x1, z1)) / 2, () => capS(sx(x0, z0), sy(y0), sx(x1, z1), sy(y1), r0 * K, r1 * K, rm, bias));
    const POLY3 = (pts3, fn, dOff = 0) => { let d = 0; pts3.forEach((p) => d += dp(p[0], p[2])); add(d / pts3.length + dOff, () => polyS(pts3.map((p) => [sx(p[0], p[2]), sy(p[1])]), fn)); };
    const front = cth > 0.12, back = cth < -0.12;
    const sw = walking ? Math.sin(ph) : 0, bob = walking ? Math.abs(Math.cos(ph)) * 1.2 : 0;
    const atk = lvl > 0 ? lvl : 0;
    // ---------- CAPA ----------
    if (cape) {
      const sway = walking ? Math.sin(ph + 1) * 3 : 0;
      POLY3([[-17, 46, -9], [17, 46, -9], [22 + sway, 88, -12 - sway * .5], [10, 92, -12], [0, 87, -11], [-10, 92, -12], [-22 + sway, 88, -12 - sway * .5]], (x, y) => { let t = .34 + (Math.sin((x - AX) * .62) * .1) + (BAY[y & 3][x & 3] * .1) - (y - sy(46)) * .002; return rampAt(cape, t); }, -3);
    }
    // ---------- PERNAS ----------
    const robe = !!e.robe;
    for (const side of [-1, 1]) {
      const st = walking ? Math.sin(ph + (side > 0 ? 0 : Math.PI)) : 0, lg = prof.lg;
      let lx = side * 7, kx = lx, fx = lx, kz = 0, fz = st * 9;
      const lift = walking ? Math.max(0, -Math.cos(ph + (side > 0 ? 0 : Math.PI))) * 5 : 0;
      let hipY = 68 - bob, kneeY = 80 - bob - lift * .4, footY = 94 - lift - bob * .2;
      if (sit) {
        const ss = prof.sit; kneeY = 76; footY = 92; kz = 10; fz = 14;
        if (ss === "spread") { kx = side * 12; fx = side * 15; kz = 12; fz = 8; }
        else if (ss === "guard") { kx = side * 6; fx = side * 6; kz = 16; fz = 26; kneeY = 79; footY = 90; }
        else if (ss === "cross") { kx = side * 11; fx = -side * 4; kz = 10; fz = 16; footY = 91; }
        else if (ss === "kneel") { if (side > 0) { kx = 8; fx = 8; kz = 14; fz = 22; kneeY = 78; footY = 90; } else { kx = -9; fx = -9; kz = 10; fz = -8; kneeY = 90; footY = 94; } }
        else if (ss === "perch") { if (side > 0) { kx = 8; fx = 8; kz = 15; fz = 6; kneeY = 66; footY = 92; } else { kx = -7; fx = -7; kz = 12; fz = 22; kneeY = 78; footY = 90; } }
        else if (ss === "lean") { kx = side * 6; fx = side * 8; kz = 18; fz = 28; kneeY = 74; footY = 90; }
        else if (ss === "perch2") { if (side < 0) { kx = -8; fx = -8; kz = 15; fz = 6; kneeY = 66; footY = 92; } else { kx = 7; fx = 7; kz = 12; fz = 22; kneeY = 78; footY = 90; } }
      }
      C3(lx, hipY, 0, kx, kneeY, kz, 5.2 * lg, 4.7 * lg, pants);
      C3(kx, kneeY, kz, fx, footY - 3, fz, 4.8 * lg, 4.4 * lg, T >= 2 ? P(0x9aa4bc) : P(e.boots ?? 3876120), .04);
      add(dp(fx, fz + 2) + .1, () => { const X = sx(fx, fz), Y = sy(footY); capS(X, Y - 5 * K, X, Y - 1.5 * K, 5.2 * K * lg, 5 * K * lg, boots); ellS(X + sth * 2.2 * K, Y + 1.6 * K, bodyW(6.2 * lg, 8.4) + .8, 3.6 * K, boots); if (T >= 1) lineS(X - 3, Y - 4 * K, X + 3, Y - 4 * K, trim[3]); });
    }
    // ---------- TRONCO ----------
    if (robe) {
      POLY3([[-12, 50, 0], [12, 50, 0], [20, 94, 0], [-20, 94, 0]], (x, y) => { let t = .55 - ((x - AX) * cth) * .014 + (((x - AX) + 99) % 7 < 1 ? -.14 : 0); return rampAt(tunic, t); }, 0.2);
      E3(0, 52, 0, 13.4, 11.4, 8, tunic);
      add(dp(0, 4) + .3, () => { for (let x = -20; x <= 20; x++) put(sx(x, 0), sy(93), trim[3]); });
    } else {
      for (let k = -4; k <= 4; k++) POLY3([[k * 3.4 - 1.9, 60, 0], [k * 3.4 + 1.9, 60, 0], [k * 3.9 + 1.6, 71 - bob * .5, 0], [k * 3.9 - 1.6, 71 - bob * .5, 0]], (x, y) => rampAt(leather, .5 - (y - sy(60)) * .03 + (k < 0 ? .04 : -.04)), 0.4);
      E3(0, 52, 0, 13.4 * prof.tw, 11.4, 8, T >= 1 ? P(e.tunic ?? 9054758) : tunic);
      // peitoral
      if (T >= 1) E3(0, 52, 5.5, 9.6 * prof.tw, 9.8, 3.6, T >= 2 ? P(0xbcc6e0) : P((e.tunic ?? 9054758) & 0xfefefe | 0x202020), .12);
      if (T >= 2) add(dp(0, 8) + .5, () => { if (!front) return; const cx = sx(0, 8), pm = P(0xbcc6e0); lineS(cx, sy(45), cx, sy(61), pm[1]); lineS(cx - 9 * K * cth, sy(45), cx - 8 * K * cth, sy(60), pm[4]); for (const [yy, w] of [[48, 6], [53, 6.4], [58, 5.4]]) lineS(cx - w * K * cth, sy(yy), cx + w * K * cth, sy(yy), pm[2]); ellS(cx, sy(51), 2.6 * K * Math.abs(cth) + .6, 2.8 * K, gold); put(cx, sy(51), gold[4]); for (const [x, y] of [[-7, 46], [7, 46], [-6, 58], [6, 58]]) put(cx + x * K * cth, sy(y), gold[4]); });
    }
    // cinto
    add(dp(0, 6) + .6, () => { polyS([[sx(-11, 0) - 0, sy(60)], [sx(11, 0), sy(60)], [sx(11, 0), sy(64)], [sx(-11, 0), sy(64)]], (x, y) => rampAt(leather, .5 - (y - sy(60)) * .08)); if (front && T >= 1) ellS(sx(0, 8), sy(62), 2.6 * K, 2.4 * K, gold); });
    if (T >= 1) add(dp(11, 3) + .62, () => { if (cth < -.3) return; const X = sx(11, 3), Y = sy(67); ellS(X, Y, 3.4 * K, 4 * K, leather); lineS(X - 3 * K, Y - 3 * K, X + 3 * K, Y - 3 * K, gold[3]); });
    // ---------- BRAÇOS ----------
    for (const side of [-1, 1]) {
      const ax_ = side * 17.5, sw2 = walking ? Math.sin(ph + (side > 0 ? Math.PI : 0)) : 0;
      let hz = sw2 * 8, hy = 69 - bob * .3, ez = hz * .5;
      const weaponHand = side === 1;
      if (atk && weaponHand) { const p = [0, -4, 12, 6][atk] ?? 0; hz = p; hy = [69, 52, 64, 68][atk]; ez = hz * .6; }
      if (sit) { hz = 6; hy = 66; ez = 4; }
      C3(ax_, 47, 0, ax_ + side * 1.6, 58, ez, 4.6, 4.1, tunic);
      C3(ax_ + side * 1.6, 57, ez, ax_ + side * 1.8, hy - 4, hz, 4.8, 4.4, T >= 2 ? P(0xaab0c6) : tunic, .04);
      C3(ax_ + side * 1.7, hy - 12, hz * .8, ax_ + side * 1.8, hy - 4, hz, 4.9, 4.6, T >= 2 ? (pauld || P(0xa8b0c8)) : T === 1 ? leather : tunic, .06);
      add(dp(ax_ + side * 1.8, hz) + .15, () => { const X = sx(ax_ + side * 1.8, hz), Y = sy(hy); if (T >= 1) ellS(X, Y, 4.5 * K, 4.1 * K, leather); ellS(X, Y + 2.6 * K, 3.2 * K, 2.6 * K, skin); });
      // ombreira
      add(dp(ax_, 1) + .2, () => { const X = sx(ax_, 0), Y = sy(43), W = (.55 + .45 * Math.abs(cth)), pm = T >= 2 ? (pauld || metal) : T === 1 ? P(e.tunic ?? 9054758) : tunic; if (T === 0) { ellS(X, Y + K, 5.6 * K * W + 1, 4.8 * K, pm); return; } ellS(X, Y, 7.8 * K * W + 1, 6.6 * K, pm); if (T === 1) { ellS(X + side * .4, Y + 3 * K, 6.8 * K * W, 3.6 * K, pm, -.08); return; } ellS(X + side * .4, Y + 2.6 * K, 7.2 * K * W + .6, 4.6 * K, pm, -.04); ellS(X + side * .8, Y + 5 * K, 6.4 * K * W, 3 * K, pm, -.1); for (let i = -5; i <= 5; i++) { put(X + i * W, Y + 2.2 * K, pm[1]); put(X + i * W, Y + 4.6 * K, pm[1]); } put(X - side * 2 * W, Y - 3 * K, pm[4]); put(X - side * 1 * W, Y - 3.6 * K, pm[4]); if (front) put(X + side * 3 * W, Y + K, gold[4]); for (let i = -6; i <= 6; i++) put(X + i * W, Y + 6.6 * K, gold[3]); });
    }
    // ---------- ARMA (so no ataque) ----------
    const gear = e.gear;
    if (atk && gear && gear !== "none") {
      const hand = [sx(17.5 + 1.8, [0, -4, 12, 6][atk]), sy([69, 52, 64, 68][atk])];
      const hz = [0, -4, 12, 6][atk];
      const dir3 = [[0, 0], [-.4, -1], [.9, .35], [.5, .8]][atk]; // (z fwd, y down) direção da ponta
      const L = { sword: 30, axe: 26, mace: 24, dagger: 14, spear: 48, staff: 40, club: 24, bow: 26, fist: 0, lyre: 14, swordshield: 30 }[gear] ?? 24;
      const ang = [0, -.9, .55, 1.1][atk];
      const ex = hand[0] + Math.sin(ang) * cth * 0 + (dir3[0] * L * K) * sth + Math.sin(ang) * L * K * .0, ey = hand[1] - Math.cos(ang) * L * K * (atk === 1 ? 1.0 : .55) + (atk === 2 ? L * K * .35 : 0);
      const wd = dp(17.5, hz) + .6;
      add(wd, () => {
        const sx2 = hand[0] + (dir3[0] * L * K * sth) + (1 - Math.abs(sth)) * (atk === 2 ? 4 : -3) * (atk === 1 ? -1 : 1) * 0;
        const tx = hand[0] + Math.sin(ang) * L * K * (Math.abs(sth) + .35), ty = hand[1] - Math.cos(ang) * L * K * .9;
        const wc = { sword: P(0xdfe8f6), swordshield: P(0xdfe8f6), dagger: P(0xe4ecf8), axe: P(0xaab4c8), mace: P(0x9aa4b8), spear: P(0xb8c0d0), staff: P(0x7a4e2c), club: P(0x8a5a30), bow: P(0x8a5a30), lyre: gold }[gear] || metal;
        if (gear === "bow") { capS(hand[0], hand[1] - 12 * K, hand[0], hand[1] + 12 * K, 1.2, 1.2, P(0x8a5a30)); lineS(hand[0] - 2, hand[1] - 12 * K, hand[0] - 2, hand[1] + 12 * K, [250, 244, 220]); return; }
        if (gear === "fist") { ellS(hand[0], hand[1], 6, 6, P(0xffd870)); return; }
        capS(hand[0], hand[1], tx, ty, 1.5, gear === "spear" || gear === "staff" ? 1.2 : 1.7, wc);
        if (gear === "sword" || gear === "swordshield" || gear === "dagger") { capS(hand[0] - 1, hand[1] - 1, hand[0] + 4, hand[1] - 1, 1.2, 1.2, gold); }
        if (gear === "axe") ellS(tx, ty + 1, 6 * K + 2, 5 * K + 2, P(0xcbd3e2));
        if (gear === "mace") ellS(tx, ty, 4.4, 4.4, P(0x8890a4));
        if (gear === "staff") { ellS(tx, ty - 2, 3.6, 3.6, P(0x8fe0ff)); }
        if (gear === "spear") polyS([[tx - 2, ty], [tx + 2, ty], [tx + (tx - hand[0]) * .1, ty - 8]], () => P(0xe8eef8)[3]);
      });
    }
    // ---------- COSTAS: arco / aljava / mochila ----------
    if (!atk && gear === "bow") add(dp(-2, -12) - .5, () => { const X = sx(-2, -12), Y = sy(52); capS(X - 2, Y - 18 * K, X + 4 * (1), Y + 18 * K, 1.4, 1.4, P(0x8a5a30)); lineS(X - 2, Y - 18 * K, X + 4, Y + 18 * K, [250, 244, 220]); });
    if (e.quiver) add(dp(6, -11) - .4, () => { const X = sx(6, -11), Y = sy(52); capS(X, Y - 12 * K, X + 3, Y + 12 * K, 3.4 * K, 3 * K, P(0x6a4426)); for (let i = 0; i < 3; i++) lineS(X - 1 + i * 2, Y - 12 * K, X - 1 + i * 2, Y - 18 * K, [250, 240, 200]); });
    if (cls === "escudeiro") add(dp(0, -13) - .3, () => { const X = sx(0, -13), Y = sy(54); ellS(X, Y, 14 * K * (.6 + .4 * Math.abs(cth)) + 1, 16 * K, P(0xa8743a)); ellS(X, Y + 8 * K, 14 * K * (.6 + .4 * Math.abs(cth)) + 1, 7 * K, P(0xc8904a)); ellS(X, Y - 4 * K, 5 * K, 4 * K, P(0x6a4426)); });
    // ---------- PESCOÇO + CABEÇA ----------
    add(dp(0, 0) + .05, () => ellS(sx(0, 0), sy(38), 4 * K + 1, 2.6 * K + .6, skin, -.3));
    const scarf = e.low === "scarf";
    add(dp(0, 0) + .1, () => ellS(sx(0, 1), sy(40), bodyW(8.4, 6) , 3.4 * K, tunic.map ? P(e.trim ?? 15254090) : tunic));
    const hdY = 24 - bob * .5;
    add(0.5, () => {
      // cabeça
      const X = sx(0, 0), Y = sy(hdY), rx = bodyW(17.6, 15), ry = 16.2 * K; ellS(X, Y, rx, ry, skin, .16);
      // orelhas
      for (const side of [-1, 1]) { const ez = 0; const ex = sx(side * 17, ez); if (Math.abs(side * 17 * cth) > 4 || !front) ellS(ex, sy(hdY + 3), 2.2 * K + .4, 3 * K, skin); }
    });
    // cabelo traseiro / volume
    const hairBack = hairStyle !== "bald";
    if (hairBack) {
      add(dp(0, -4) + .55, () => ellS(sx(0, -4), sy(hdY - 8), bodyW(18, 16), 11.5 * K, hair, .02));
      if (hairStyle === "long") { add(dp(0, -9), () => { const X = sx(0, -9), Y = sy(hdY + 6); polyS([[X - bodyW(17, 9), Y - 6], [X + bodyW(17, 9), Y - 6], [X + bodyW(19, 10), Y + 34 * K], [X + bodyW(9, 5), Y + 40 * K + (walking ? Math.sin(ph) * 2 : 0)], [X, Y + 34 * K], [X - bodyW(9, 5), Y + 40 * K], [X - bodyW(19, 10), Y + 34 * K]], (x, y) => rampAt(hair, .46 + (x - X) * .01 * cth - (y - Y) * .004 + (BAY[y & 3][x & 3] * .1))); }); }
    }
    // rosto
    if (hairStyle !== "bald" || true) add(dp(0, 14) + .6, () => {
      if (cth < -0.2) return;
      const eyeC = e.eye ? hexc(e.eye) : null;
      for (const side of [-1, 1]) {
        const ex = sx(side * 7.4, 12), vis = dp(side * 7.4, 12) > 1; if (!vis) continue;
        const w = Math.max(2, Math.round(4.6 * K * (.35 + .65 * Math.abs(cth)))), x0 = Math.round(ex - w / 2), y0 = Math.round(sy(hdY + 2));
        const iris = eyeC ? [mixc(eyeC, [10, 10, 30], .6), mixc(eyeC, [10, 10, 30], .3), eyeC, mixc(eyeC, [255, 255, 255], .4), mixc(eyeC, [255, 255, 255], .7)] : [[40, 30, 70], [40, 74, 154], [74, 120, 208], [106, 168, 240], [154, 212, 255]];
        for (let y = 0; y < 6; y++) for (let x = 0; x < w; x++) put(x0 + x, y0 + y, iris[Math.min(4, y)]);
        put(x0, y0, [255, 255, 255]); if (w > 2) put(x0 + 1, y0, [255, 255, 255]); put(x0, y0 + 1, [225, 238, 255]);
        for (let x = -1; x <= w; x++) put(x0 + x, y0 - 1, [42, 28, 46]);
        for (let x = 0; x < w; x++) put(x0 + x, y0 - 3, hair[1]);
        put(x0 + w - 1, y0 + 4, [220, 244, 255]);
      }
      const mx = sx(sth * 2, 15) , my = sy(hdY + 13);
      put(mx - 1, my, [168, 62, 72]); put(mx, my, [168, 62, 72]); put(mx + 1, my, [168, 62, 72]); put(mx, my + 1, [210, 110, 96]);
      put(sx(0, 16) + sth * 3, sy(hdY + 9), skin[1]);
      for (const side of [-1, 1]) { if (dp(side * 11, 12) > 0) { const bx = sx(side * 11, 12); put(bx, sy(hdY + 8), [245, 154, 138]); put(bx + 1, sy(hdY + 8), [245, 154, 138]); } }
    });
    if (hairStyle !== "bald") add(0.715, () => { ellS(sx(0, -1), sy(hdY - 10.5), bodyW(19.6, 17.2), 11.4 * K, hair, .06); });
    if (hairStyle !== "bald") add(0.72, () => {
      const Xc = sx(0, 0), Yc = sy(hdY), rx = bodyW(17.8, 15.4), ry = 16.4 * K;
      for (let y = Math.floor(Yc - ry - 6); y <= Yc + ry + 2; y++) for (let x = Math.floor(Xc - rx - 2); x <= Xc + rx + 2; x++) {
        const nx = (x + .5 - Xc) / (rx + .6), ny = (y + .5 - Yc) / (ry + .6), r2 = nx * nx + ny * ny; if (r2 > 1) continue;
        const wave = Math.sin((x - Xc) * .85) * 1.6 + Math.sin((x - Xc) * .37) * 1.4;
        let inside;
        if (cth < -0.2) inside = y < Yc + ry * .5 + wave * .5;
        else { const bang = y < Yc - ry * .34 + wave + (hairStyle === "long" ? 1 : 0); const side = Math.abs(nx) > .78 && y < Yc + ry * (hairStyle === "long" ? .9 : .3); inside = bang || side; if (Math.abs(cth) < .5 && sth > 0) inside = inside || (x < Xc + rx * .1 && y < Yc + ry * .6); }
        if (!inside) continue;
        const nz = Math.sqrt(1 - r2); let t = shade(nx, ny, nz, x, y, .12);
        let c = hair[t];
        if (((x - Xc + 1000) | 0) % 4 === 0 && hashn(x, y >> 1, 9) > .35) c = hair[Math.max(0, t - 1)];
        if (hashn(x, y, 11) > .93) c = hair[Math.min(4, t + 1)];
        put(x, y, c);
      }
    });
    // franja + mechas (anel de espetos em 3D)
    if (hairStyle !== "bald") {
      const sw3 = walking ? Math.sin(ph) * 3 : 0;
      if (hsty === "mane") {
        add(dp(0, -9) + .05, () => { const X = sx(0, -9), Y = sy(hdY - 2); polyS([[X - bodyW(21, 15), Y - 12 * K], [X + bodyW(21, 15), Y - 12 * K], [X + bodyW(24, 16), Y + 20 * K], [X + bodyW(15, 9), Y + 30 * K + sw3], [X + bodyW(8, 5), Y + 24 * K], [X, Y + 34 * K - sw3], [X - bodyW(8, 5), Y + 25 * K], [X - bodyW(15, 9), Y + 30 * K + sw3], [X - bodyW(24, 16), Y + 20 * K]], (x, y) => rampAt(hair, .56 + (y - Y) * .003 + (BAY[y & 3][x & 3] * .12) + (hashn(x >> 1, y >> 2, 4) - .5) * .16)); });
        for (const side of [-1, 1]) add(dp(side * 16, 6) + .3, () => { if (Math.abs(cth) < .15 && side * sth < 0) return; const X = sx(side * 16.5, 6), Y = sy(hdY + 2); capS(X, Y, X + side * 1.5, Y + 16 * K, 3.8 * K, 2 * K, hair, .08); });
      } else if (hsty === "ponytail") {
        add(dp(0, -13) + .02, () => { const X = sx(0, -13), Y = sy(hdY - 6); capS(X, Y, X + sw3 * .6 + sth * -4, Y + 14 * K, 4.8 * K, 3.8 * K, hair, .04); capS(X + sw3 * .6 - sth * 4, Y + 13 * K, X + sw3 - sth * 6, Y + 30 * K, 3.8 * K, 1.4 * K, hair, .1); ellS(X, Y + 1, 3.4 * K, 2.2 * K, gold, 0); });
      } else if (hsty === "braid") {
        add(dp(-12, 8) + .4, () => { const side = -1; for (let i = 0; i < 7; i++) { const X = sx(side * 13.5 + (i % 2 ? 1.2 : -1.2), 7), Y = sy(hdY + 10 + i * 5.6); ellS(X, Y, 3.2 * K, 3.4 * K, hair, i % 2 ? .1 : -.05); } ellS(sx(-13.5, 7), sy(hdY + 10 + 7 * 5.6), 2.4 * K, 2 * K, gold, 0); });
        add(dp(0, -13) + .02, () => { const X = sx(0, -13), Y = sy(hdY - 4); capS(X, Y, X + sw3 * .5, Y + 26 * K, 4.4 * K, 2 * K, hair, .04); });
      } else if (hsty === "topknot") {
        add(dp(0, 0) + .93, () => { const X = sx(0, -2), Y = sy(hdY - 21); ellS(X, Y, 6.4 * K, 5.8 * K, hair, .1); lineS(X - 5 * K, Y + 5 * K, X + 5 * K, Y + 5 * K, gold[3]); lineS(X - 4 * K, Y + 6 * K, X + 4 * K, Y + 6 * K, gold[2]); });
      } else if (hsty === "fringe") {
        add(dp(0, 14) + .78, () => { if (cth < -.1) return; const f = sth >= 0 ? 1 : -1; polyS([[sx(-14, 10), sy(hdY - 11)], [sx(14, 10), sy(hdY - 11)], [sx(15, 10) + f * 1, sy(hdY + 3)], [sx(9 * f, 14), sy(hdY + 9 * K / K)], [sx(3 * f, 14), sy(hdY + 2)], [sx(-6 * f, 12), sy(hdY - 3)]], (x, y) => rampAt(hair, .66 - (y - sy(hdY - 11)) * .02 + (BAY[y & 3][x & 3] * .1) + (hashn(x, y >> 1, 6) - .5) * .12)); });
      }
      // mechas da franja caindo sobre a testa
      [-12, -6, 0, 6, 12].forEach((x0, i) => { const z0 = 12.4 - Math.abs(x0) * .3, y0 = hdY - 10, len = hsty === "crop" ? 5 : hsty === "fringe" ? 4 : hairStyle === "long" ? 12 : 8 + hashn(i, 7) * 3;
        const pts = [[x0 - 4.6, y0, z0], [x0 + 4.6, y0, z0], [x0 + (x0 < 0 ? -1.4 : 1.4) * (i == 2 ? 0 : 1) + (i == 2 ? 1.2 : 0), y0 + len, z0 + 1]];
        add(dp(x0, z0) + .75, () => { if (cth < -0.1) return; polyS(pts.map((p) => [sx(p[0], p[2]), sy(p[1])]), (x, y) => rampAt(hair, .78 - (y - sy(y0)) * .03 + (hashn(x, y, 5) - .5) * .06)); lineS(sx(x0, z0), sy(y0 + 1), sx(pts[2][0], pts[2][2]), sy(y0 + len - 2), hair[1]); lineS(sx(x0 - 1.4, z0), sy(y0 + 2), sx(pts[2][0] - .6, pts[2][2]), sy(y0 + len - 4), hair[4]); }); });
      add(dp(0, 14) + .8, () => { if (cth < -.1) return; for (const [x0, y0, x1, y1] of [[-9, 4, -6, 9], [0, 3, 2, 8], [8, 4, 10, 9]]) lineS(sx(x0, 12), sy(hdY - y0 - 4), sx(x1, 12), sy(hdY - y1 - 4), hair[4]); });
    }
    // ---------- props e visual próprio dos NPCs ----------
    if (NP) {
      const id = e.cls, wd = P(0x8a5a30), steelP = P(0xb4bed2), parch = P(0xe8dcc0), dk = P(0x3a2416), hy0 = 69 - bob * .3;
      const hand = (sd) => [sx(sd * 19.3, 0), sy(hy0)];
      const apron = (rm, y0, y1, w) => add(dp(0, 10) + .66, () => { if (cth < -.2) return; polyS([[sx(-w, 8), sy(y0)], [sx(w, 8), sy(y0)], [sx(w + 2, 8), sy(y1)], [sx(-w - 2, 8), sy(y1)]], (x, y) => rampAt(rm, .55 - (y - sy(y0)) * .004 + BAY[y & 3][x & 3] * .12)); lineS(sx(-w + 1, 8), sy(y0), sx(-13, 2), sy(44), rm[1]); lineS(sx(w - 1, 8), sy(y0), sx(13, 2), sy(44), rm[1]); });
      if (id === "brokk" || id === "torvald") {
        apron(dk, 47, 90, 9.5);
        add(dp(0, 14) + .97, () => { if (cth < -.2) return; ellS(sx(0, 10), sy(hdY + 15), bodyW(9.4, 7.5), 4.8 * K, hair, .02); lineS(sx(-6, 12), sy(hdY + 11), sx(6, 12), sy(hdY + 11), hair[3]); });
        add(dp(19.3, 3) + .5, () => { const [X, Y] = hand(1); capS(X, Y, X + 3 * K, Y - 27 * K, 1.7 * K, 1.5 * K, wd); ellS(X + 3 * K, Y - 29 * K, 7 * K, 4.4 * K, steelP); lineS(X - 4 * K, Y - 31 * K, X + 10 * K, Y - 31 * K, steelP[4]); });
      } else if (id === "bruna") {
        add(dp(0, -14) + .1, () => { const X = sx(2, -14); ellS(X, sy(56), bodyW(13, 9), 15 * K, P(0xb08a50), 0); ellS(X, sy(40), 4.4 * K, 3.2 * K, P(0xb08a50), .1); lineS(X - 3, sy(46), X + 3, sy(46), P(0x6a4a24)[1]); });
        apron(parch, 52, 91, 8.5);
        add(dp(0, 2) + .96, () => { ellS(sx(0, -1), sy(hdY - 9), bodyW(18.6, 16.8), 9.4 * K, P(0xc03a3a), .04); lineS(sx(-17, 0), sy(hdY - 3), sx(17, 0), sy(hdY - 3), P(0xc03a3a)[1]); ellS(sx(0, -16), sy(hdY - 3), 4 * K, 3.6 * K, P(0xc03a3a), .08); });
        add(dp(-14, 3) + .6, () => { ellS(sx(-12, 3), sy(66), 3.8 * K, 4.2 * K, gold, .05); put(sx(-12, 3), sy(62), gold[1]); });
      } else if (id === "munin") {
        add(dp(19.3, 6) + .5, () => { const [X, Y] = hand(1), oy = Y - 17 * K; ellS(X, oy, 9.5 * K, 9.5 * K, P(0x4a2a8a), -.1); ellS(X, oy, 7 * K, 7 * K, P(0xb890ff), .2); put(X - 2, oy - 2, [255, 255, 255]); put(X - 3, oy - 1, [235, 220, 255]); lineS(X - 2, oy + 2, X + 2, oy - 1, P(0x4a2a8a)[0]); });
        add(dp(-14, 2) + .9, () => { const X = sx(-15, 0), Y = sy(36), bl = P(0x20202c); ellS(X, Y, 6 * K, 4.6 * K, bl, .1); ellS(X + 4 * K, Y - 4 * K, 3.2 * K, 3 * K, bl, .1); capS(X + 6.4 * K, Y - 4 * K, X + 10 * K, Y - 3 * K, 1.4 * K, .5 * K, P(0xe8a040)); put(X + 5 * K, Y - 5 * K, [255, 220, 120]); capS(X - 4 * K, Y + 1, X - 10 * K, Y + 5 * K, 2.2 * K, .8 * K, bl); });
      } else if (id === "sigrun") {
        add(dp(0, 20) + .98, () => { const [X, Y] = hand(1); for (const [dx, dy] of [[-10, -22], [4, -30], [16, -18]]) { const gx = X + dx * K * .8, gy = Y + dy * K * .8; polyS([[gx, gy - 4 * K], [gx + 3 * K, gy], [gx, gy + 4 * K], [gx - 3 * K, gy]], (x, y) => rampAt(gold, .7 + (BAY[y & 3][x & 3]) * .2)); lineS(gx, gy - 2 * K, gx, gy + 2 * K, [90, 40, 10]); put(gx, gy, [255, 255, 255]); } });
      } else if (id === "cronista") {
        add(dp(-19.3, 6) + .5, () => { const [X, Y] = hand(-1); polyS([[X - 6 * K, Y - 14 * K], [X + 6 * K, Y - 14 * K], [X + 6 * K, Y], [X - 6 * K, Y]], (x, y) => rampAt(P(0x7a2a2a), .5 - (y - (Y - 14 * K)) * .01)); lineS(X + 5 * K, Y - 13 * K, X + 5 * K, Y - 1, parch[3]); lineS(X - 5 * K, Y - 13 * K, X + 5 * K, Y - 13 * K, gold[3]); ellS(X, Y - 7 * K, 1.8 * K, 1.8 * K, gold); });
        add(dp(0, 14) + .965, () => { if (cth < .1) return; for (const sd of [-1, 1]) { const X = sx(sd * 7.4, 12), Y = sy(hdY + 4.6); for (let a = 0; a < 20; a++) { const an = a / 20 * Math.PI * 2; put(X + Math.cos(an) * 4.4, Y + Math.sin(an) * 4.2, [60, 50, 40]); } } lineS(sx(-3, 12), sy(hdY + 4), sx(3, 12), sy(hdY + 4), [60, 50, 40]); });
      } else if (id === "arauto") {
        add(dp(0, 10) + .66, () => { if (cth < -.2) return; polyS([[sx(-8, 8), sy(47)], [sx(8, 8), sy(47)], [sx(10, 8), sy(88)], [sx(0, 8), sy(93)], [sx(-10, 8), sy(88)]], (x, y) => rampAt(trim, .6 - (y - sy(47)) * .004 + BAY[y & 3][x & 3] * .1)); ellS(sx(0, 9), sy(62), 3.6 * K * Math.abs(cth) + 1, 3.8 * K, gold); });
        add(dp(19.3, 3) + .5, () => { const [X, Y] = hand(1); capS(X - 5 * K, Y - 3 * K, X + 5 * K, Y - 3 * K, 2.8 * K, 2.8 * K, parch); ellS(X - 5 * K, Y - 3 * K, 2 * K, 2.8 * K, P(0xd0c098)); lineS(X - 2 * K, Y - 5 * K, X + 2 * K, Y - 5 * K, [150, 120, 90]); });
        add(dp(-12, 4) + .62, () => { const X = sx(-12, 4), Y = sy(70); capS(X, Y - 4 * K, X + 1.4 * K, Y + 5 * K, 3.6 * K, 1.4 * K, P(0xe6d4a0)); });
      } else if (id === "questor") {
        add(dp(0, 6) + .64, () => { if (cth < -.2) return; lineS(sx(-13, 3), sy(44), sx(11, 5), sy(68), leather[1]); lineS(sx(-12, 3), sy(44), sx(12, 5), sy(68), leather[3]); const X = sx(12, 5), Y = sy(70); ellS(X, Y, 5.2 * K, 4.6 * K, leather, .05); lineS(X - 4 * K, Y - 2 * K, X + 4 * K, Y - 2 * K, gold[3]); });
        add(dp(19.3, 3) + .5, () => { const [X, Y] = hand(1); capS(X - 4 * K, Y - 3 * K, X + 4 * K, Y - 3 * K, 2.4 * K, 2.4 * K, parch); ellS(X + 4 * K, Y - 3 * K, 1.8 * K, 2.4 * K, P(0xd0c098)); put(X, Y - 9 * K, [255, 211, 77]); lineS(X, Y - 14 * K, X, Y - 10 * K, [255, 211, 77]); });
      } else if (id === "ottar" || id === "checkpoint" || id === "eira") {
        add(dp(19.3, 3) + .5, () => { const [X, Y] = hand(1); capS(X, Y + 24 * K, X + 1.4 * K, Y - 56 * K, 1.5 * K, 1.4 * K, wd); polyS([[X + 1.4 * K - 3.4 * K, Y - 54 * K], [X + 1.4 * K + 3.4 * K, Y - 54 * K], [X + 1.4 * K, Y - 70 * K]], (x, y) => rampAt(steelP, .8 - (y - (Y - 70 * K)) * .01)); lineS(X + 1.4 * K - 4 * K, Y - 52 * K, X + 1.4 * K + 4 * K, Y - 52 * K, gold[3]); });
        if (id !== "eira") add(dp(-23, 4) + .55, () => { const X = sx(-22, 4), Y = sy(62); ellS(X, Y, 8.5 * K * (.5 + .5 * Math.abs(cth)) + 1, 12 * K, steelP, -.05); ellS(X, Y, 3 * K, 3 * K, gold); });
        if (id === "checkpoint") add(dp(0, 2) + .97, () => { ellS(sx(0, 0), sy(hdY - 8), bodyW(19, 17), 10.6 * K, steelP, .04); lineS(sx(-18, 0), sy(hdY - 2), sx(18, 0), sy(hdY - 2), steelP[1]); if (front) capS(sx(0, 16), sy(hdY - 7), sx(0, 16), sy(hdY + 6), 1.6, 1.6, steelP); });
      } else if (id === "estilista") {
        add(dp(8, 4) + .98, () => { const X = sx(11, 2), Y = sy(hdY - 15), pk = P(0xf070a8); ellS(X - 5 * K, Y, 5.6 * K, 4 * K, pk, .04); ellS(X + 5 * K, Y, 5.6 * K, 4 * K, pk, .04); ellS(X, Y, 2.4 * K, 2.4 * K, P(0xc84a84), 0); });
        add(dp(19.3, 3) + .5, () => { const [X, Y] = hand(1), sv = P(0xd4dae8); lineS(X, Y - 3 * K, X - 5 * K, Y - 17 * K, sv[4]); lineS(X + 1, Y - 3 * K, X + 6 * K, Y - 17 * K, sv[3]); ellS(X - 2 * K, Y - 2 * K, 2.2 * K, 2.2 * K, gold); ellS(X + 3 * K, Y - 2 * K, 2.2 * K, 2.2 * K, gold); });
      }
    }
    // acessórios de cabeça
    const hd = e.head;
    if (hd === "horns") for (const side of [-1, 1]) add(dp(side * 14, 0) + .9, () => { const X = sx(side * 14, 0), Y = sy(hdY - 6); capS(X, Y, X + side * 7 * K, Y - 8 * K, 3.1 * K, 1.0, P(0xf0e6c8)); });
    if (hd === "helm") add(dp(0, 8) + .9, () => { const X = sx(0, 2), Y = sy(hdY - 6); ellS(X, Y, bodyW(18.6, 16.4), 12.4 * K, metal, .05); lineS(X - bodyW(18, 15), sy(hdY - 1), X + bodyW(18, 15), sy(hdY - 1), metal[1]); if (front) capS(sx(0, 16), sy(hdY - 6), sx(0, 16), sy(hdY + 7), 1.5, 1.5, metal); });
    if (hd === "hood") add(dp(0, -2) + .9, () => { const X = sx(0, 0), Y = sy(hdY - 3); ellS(X, Y, bodyW(19.4, 17), 15 * K, tunic, .0); if (front) ellS(sx(0, 14), sy(hdY + 3), bodyW(10.5, 5), 8 * K, skin); });
    if (hd === "circlet") add(dp(0, 14) + .95, () => { lineS(sx(-15, 8), sy(hdY - 5), sx(15, 8), sy(hdY - 5), gold[3]); lineS(sx(-15, 8), sy(hdY - 4), sx(15, 8), sy(hdY - 4), gold[2]); if (front) ellS(sx(0, 15), sy(hdY - 5), 2, 2.2, P(0xbff0ff)); });
    if (hd === "wings") for (const side of [-1, 1]) add(dp(side * 16, 0) + .9, () => { const X = sx(side * 16, 0), Y = sy(hdY - 3); for (let i = 0; i < 4; i++) capS(X, Y - i * 1.2, X + side * (6 + i * 3) * K * (.5 + .5 * Math.abs(cth)), Y - (10 - i * 1.5) * K, 2.1, 0.8, i % 2 ? P(0xf8f4ff) : P(0xe0e8ff)); });
    // bandana padrao (trim) para classes sem head e com cabelo — pano na testa
    if (!hd || hd === "none") add(dp(0, 14) + .96, () => { if (e.hairStyle === "bald") return; polyS([[sx(-17, 0) - 1, sy(hdY - 6)], [sx(17, 0) + 1, sy(hdY - 6)], [sx(17, 0) + 1, sy(hdY - 3)], [sx(-17, 0) - 1, sy(hdY - 3)]], (x, y) => rampAt(P(e.trim ?? 15254090), .6 - (y - sy(hdY - 6)) * .12)); });
    // ---------- desenha em ordem ----------
    parts.sort((a, b) => a.d - b.d).forEach((p) => p.fn());
    // pós: contorno (sel-out), luz de contorno, sombra inferior
    const out = buf.slice();
    for (let y = 0; y < SH; y++) for (let x = 0; x < SW; x++) {
      if (buf[y * SW + x]) continue; let best = null;
      for (const [dx, dy] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) { const xx = x + dx, yy = y + dy; if (xx < 0 || yy < 0 || xx >= SW || yy >= SH) continue; const c = buf[yy * SW + xx]; if (c) { best = c; break; } }
      if (best) out[y * SW + x] = [best[0] * .26 + 14, best[1] * .26 + 8, best[2] * .26 + 24, 1];
    }
    const fin = out.slice();
    for (let y = 1; y < SH - 1; y++) for (let x = 1; x < SW - 1; x++) {
      const c = out[y * SW + x]; if (!c || c[3]) continue;
      const u = out[(y - 1) * SW + x], l = out[y * SW + x - 1], d = out[(y + 1) * SW + x], r = out[y * SW + x + 1];
      if ((!u || u[3]) || (!l || l[3])) fin[y * SW + x] = [Math.min(255, c[0] * 1.17 + 14), Math.min(255, c[1] * 1.13 + 12), Math.min(255, c[2] * 1.05 + 6)];
      else if ((!d || d[3]) || (!r || r[3])) fin[y * SW + x] = [c[0] * .82, c[1] * .82, c[2] * .92];
    }
    const cv = document.createElement("canvas"); cv.width = SW; cv.height = SH;
    const cx = cv.getContext("2d"), im = cx.createImageData(SW, SH);
    for (let i = 0; i < SW * SH; i++) { const c = fin[i]; if (c) { im.data[i * 4] = c[0]; im.data[i * 4 + 1] = c[1]; im.data[i * 4 + 2] = c[2]; im.data[i * 4 + 3] = 255; } }
    cx.putImageData(im, 0, 0);
    return { cv, ax: AX, ay: AY, k: 1 };
  };
})();
