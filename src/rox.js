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
  return function ROX(e, dir, frame, lvl, style) {
    const yawT = { down: 0, dq: Math.PI / 4, side: Math.PI / 2, uq: Math.PI * 3 / 4, up: Math.PI };
    const th = yawT[dir] ?? 0, cth = Math.cos(th), sth = Math.sin(th);
    const walking = frame >= 0, sit = frame === -2;
    const ph = walking ? (frame / 12) * Math.PI * 2 : 0;
    const buf = new Array(SW * SH).fill(null);
    const put = (x, y, c) => { x |= 0; y |= 0; if (x < 0 || y < 0 || x >= SW || y >= SH) return; buf[y * SW + x] = c; };
    const sx = (x, z) => AX + (x * cth + z * sth) * K;
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
      const lx = side * 7, st = walking ? Math.sin(ph + (side > 0 ? 0 : Math.PI)) : 0;
      const fz = sit ? 14 : st * 9, lift = walking ? Math.max(0, -Math.cos(ph + (side > 0 ? 0 : Math.PI))) * 5 : 0;
      const hipY = 68 - bob, kneeY = sit ? 76 : 80 - bob - lift * .4, footY = sit ? 92 : 94 - lift - bob * .2;
      C3(lx, hipY, 0, lx, kneeY, fz * .5 + (sit ? 10 : 0), 5.2, 4.7, pants);
      C3(lx, kneeY, fz * .5 + (sit ? 10 : 0), lx, footY - 3, fz, 4.8, 4.4, pauld || (e.ti || 0) >= 1 ? P(0x9aa4bc) : P(e.boots ?? 3876120), .04);
      add(dp(lx, fz + 2) + .1, () => { const X = sx(lx, fz), Y = sy(footY); capS(X, Y - 5 * K, X, Y - 1.5 * K, 5.2 * K, 5 * K, boots); ellS(X + sth * 2.2 * K, Y + 1.6 * K, bodyW(6.2, 8.4) + .8, 3.6 * K, boots); lineS(X - 3, Y - 4 * K, X + 3, Y - 4 * K, trim[3]); });
    }
    // ---------- TRONCO ----------
    if (robe) {
      POLY3([[-12, 50, 0], [12, 50, 0], [20, 94, 0], [-20, 94, 0]], (x, y) => { let t = .55 - ((x - AX) * cth) * .014 + (((x - AX) + 99) % 7 < 1 ? -.14 : 0); return rampAt(tunic, t); }, 0.2);
      E3(0, 52, 0, 13.4, 11.4, 8, tunic);
      add(dp(0, 4) + .3, () => { for (let x = -20; x <= 20; x++) put(sx(x, 0), sy(93), trim[3]); });
    } else {
      for (let k = -4; k <= 4; k++) POLY3([[k * 3.4 - 1.9, 60, 0], [k * 3.4 + 1.9, 60, 0], [k * 3.9 + 1.6, 71 - bob * .5, 0], [k * 3.9 - 1.6, 71 - bob * .5, 0]], (x, y) => rampAt(leather, .5 - (y - sy(60)) * .03 + (k < 0 ? .04 : -.04)), 0.4);
      E3(0, 52, 0, 13.4, 11.4, 8, (e.ti || 0) >= 1 || pauld ? P(e.tunic ?? 9054758) : tunic);
      // peitoral
      E3(0, 52, 5.5, 9.6, 9.8, 3.6, P(0xbcc6e0), .12);
      add(dp(0, 8) + .5, () => { if (!front) return; const cx = sx(0, 8), pm = P(0xbcc6e0); lineS(cx, sy(45), cx, sy(61), pm[1]); lineS(cx - 9 * K * cth, sy(45), cx - 8 * K * cth, sy(60), pm[4]); for (const [yy, w] of [[48, 6], [53, 6.4], [58, 5.4]]) lineS(cx - w * K * cth, sy(yy), cx + w * K * cth, sy(yy), pm[2]); ellS(cx, sy(51), 2.6 * K * Math.abs(cth) + .6, 2.8 * K, gold); put(cx, sy(51), gold[4]); for (const [x, y] of [[-7, 46], [7, 46], [-6, 58], [6, 58]]) put(cx + x * K * cth, sy(y), gold[4]); });
    }
    // cinto
    add(dp(0, 6) + .6, () => { polyS([[sx(-11, 0) - 0, sy(60)], [sx(11, 0), sy(60)], [sx(11, 0), sy(64)], [sx(-11, 0), sy(64)]], (x, y) => rampAt(leather, .5 - (y - sy(60)) * .08)); if (front) ellS(sx(0, 8), sy(62), 2.6 * K, 2.4 * K, gold); });
    add(dp(11, 3) + .62, () => { if (cth < -.3) return; const X = sx(11, 3), Y = sy(67); ellS(X, Y, 3.4 * K, 4 * K, leather); lineS(X - 3 * K, Y - 3 * K, X + 3 * K, Y - 3 * K, gold[3]); });
    // ---------- BRAÇOS ----------
    for (const side of [-1, 1]) {
      const ax_ = side * 17.5, sw2 = walking ? Math.sin(ph + (side > 0 ? Math.PI : 0)) : 0;
      let hz = sw2 * 8, hy = 69 - bob * .3, ez = hz * .5;
      const weaponHand = side === 1;
      if (atk && weaponHand) { const p = [0, -4, 12, 6][atk] ?? 0; hz = p; hy = [69, 52, 64, 68][atk]; ez = hz * .6; }
      if (sit) { hz = 6; hy = 66; ez = 4; }
      C3(ax_, 47, 0, ax_ + side * 1.6, 58, ez, 4.6, 4.1, tunic);
      C3(ax_ + side * 1.6, 57, ez, ax_ + side * 1.8, hy - 4, hz, 4.8, 4.4, pauld ? P(0xaab0c6) : tunic, .04);
      C3(ax_ + side * 1.7, hy - 12, hz * .8, ax_ + side * 1.8, hy - 4, hz, 4.9, 4.6, pauld ? pauld : P(0xa8a8b8), .06);
      add(dp(ax_ + side * 1.8, hz) + .15, () => { const X = sx(ax_ + side * 1.8, hz), Y = sy(hy); ellS(X, Y, 4.5 * K, 4.1 * K, leather); ellS(X, Y + 2.6 * K, 3.2 * K, 2.6 * K, skin); });
      // ombreira
      add(dp(ax_, 1) + .2, () => { const X = sx(ax_, 0), Y = sy(43), W = (.55 + .45 * Math.abs(cth)), pm = pauld || (e.ti >= 1 ? metal : P(e.tunic ?? 9054758)); ellS(X, Y, 7.8 * K * W + 1, 6.6 * K, pm); ellS(X + side * .4, Y + 2.6 * K, 7.2 * K * W + .6, 4.6 * K, pm, -.04); ellS(X + side * .8, Y + 5 * K, 6.4 * K * W, 3 * K, pm, -.1); for (let i = -5; i <= 5; i++) { put(X + i * W, Y + 2.2 * K, pm[1]); put(X + i * W, Y + 4.6 * K, pm[1]); } put(X - side * 2 * W, Y - 3 * K, pm[4]); put(X - side * 1 * W, Y - 3.6 * K, pm[4]); if (front) put(X + side * 3 * W, Y + K, gold[4]); });
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
      const long = hairStyle === "long", nsp = long ? 5 : 6;
      add(0.74, () => {
        const Xc = sx(0, -1), Yc = sy(hdY), rx = bodyW(19, 16.6) + 1, ry = 16.4 * K;
        for (let i = 0; i < nsp; i++) {
          const u = -1 + 2 * (i + .5) / nsp, d = Math.abs(u), sd = u < 0 ? -1 : 1;
          const bx = Xc + u * rx * .86, by = Yc - ry * Math.sqrt(Math.max(0, 1 - u * u * .8)) * .96 + 7;
          const L = (long ? 10 : 18 + (1 - d) * 9) * K * (.8 + hashn(i, 4) * .4), tx = bx + u * rx * .42 + (hashn(i, 2) - .5) * 4, ty = by - L;
          const hw = rx * 2 / nsp * .95;
          polyS([[bx - hw, by + 5], [bx + hw, by + 5], [tx, ty]], (x, y) => rampAt(hair, .66 + (by - y) / L * .26 + (sd * (tx - x) / hw) * .06 - .05 + (hashn(x, y, 3) - .5) * .08));
          lineS(bx - hw * .2, by, tx - sd * .6, ty + 4, hair[4]);
          lineS(bx + hw * .5, by + 3, tx + 1, ty + 6, hair[1]);
        }
      });
      // mechas da franja caindo sobre a testa
      [-12, -6, 0, 6, 12].forEach((x0, i) => { const z0 = 12.4 - Math.abs(x0) * .3, y0 = hdY - 10, len = hairStyle === "long" ? 12 : 9 + hashn(i, 7) * 3;
        const pts = [[x0 - 4.6, y0, z0], [x0 + 4.6, y0, z0], [x0 + (x0 < 0 ? -1.4 : 1.4) * (i == 2 ? 0 : 1) + (i == 2 ? 1.2 : 0), y0 + len, z0 + 1]];
        add(dp(x0, z0) + .75, () => { if (cth < -0.1) return; polyS(pts.map((p) => [sx(p[0], p[2]), sy(p[1])]), (x, y) => rampAt(hair, .78 - (y - sy(y0)) * .03 + (hashn(x, y, 5) - .5) * .06)); lineS(sx(x0, z0), sy(y0 + 1), sx(pts[2][0], pts[2][2]), sy(y0 + len - 2), hair[1]); lineS(sx(x0 - 1.4, z0), sy(y0 + 2), sx(pts[2][0] - .6, pts[2][2]), sy(y0 + len - 4), hair[4]); }); });
      add(dp(0, 14) + .8, () => { if (cth < -.1) return; for (const [x0, y0, x1, y1] of [[-9, 4, -6, 9], [0, 3, 2, 8], [8, 4, 10, 9]]) lineS(sx(x0, 12), sy(hdY - y0 - 4), sx(x1, 12), sy(hdY - y1 - 4), hair[4]); });
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
