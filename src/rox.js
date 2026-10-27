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
    thay: { k: 1.3, wx: 1, tw: 1.02, lg: 1, hair: "topknot", sit: "perch2" },
    aprendiz: { k: 1.26, wx: .98, tw: .96, lg: .96, hair: "", sit: "" }
  };
  const NPP = {
    brokk: { t: 0, k: 1.4, wx: 1.2, tw: 1.26, lg: 1.2 }, torvald: { t: 0, k: 1.38, wx: 1.18, tw: 1.22, lg: 1.18 },
    bruna: { t: 0, k: 1.3, wx: 1.06, tw: 1.04, lg: 1 }, munin: { t: 0, k: 1.2, wx: .9, tw: .86, lg: .9 },
    sigrun: { t: 0, k: 1.22, wx: .9, tw: .86, lg: .9 }, cronista: { t: 0, k: 1.22, wx: .92, tw: .9, lg: .9 },
    arauto: { t: 1, k: 1.34, wx: 1.04, tw: 1.04, lg: 1 }, questor: { t: 0, k: 1.28, wx: .96, tw: .94, lg: .94 },
    ottar: { t: 1, k: 1.4, wx: 1.16, tw: 1.2, lg: 1.14 }, checkpoint: { t: 2, k: 1.42, wx: 1.18, tw: 1.24, lg: 1.16 },
    eira: { t: 1, k: 1.3, wx: .96, tw: .94, lg: .96 }, ylva: { t: 0, k: 1.26, wx: .94, tw: .9, lg: .92 },
    lider: { t: 2, k: 1.4, wx: 1.1, tw: 1.1, lg: 1.06 }, estilista: { t: 0, k: 1.26, wx: .9, tw: .86, lg: .9 }
  };
  return function ROX(e, dir, frame, lvl, style) {
    const NP = NPP[e.cls];
    const T = CP[e.cls] ? (e.ti || 0) : NP ? NP.t : 1;
    const RB = CP[e.cls] ? Math.max(0, (e.ti || 0) - 2) : 0;
    const ACC = { berserker: 0xff5a3a, escudeiro: 0xffc040, cacador: 0x4adf7a, volva: 0xb070ff, valquiria: 0x6ad0ff, skald: 0x9a7aff, thay: 0xff7a2a }[e.cls] || 0xffd860;
    const prof = CP[e.cls] || NP || { k: 1.3, wx: 1, tw: 1, lg: 1, hair: "", sit: "" };
    const QK = { wolf: 1.6, frostwolf: 1.6, hati: 2.5, boar: 1.7, yeti: 1.6, blob: 2.0, goblin: 1.6, draugr: 1.5, cinder: 1.75, automaton: 1.65, sylvan: 1.6, prism: 1.7, sentinel: 1.65, voidling: 1.7, jotun: 2.1, grifo: 2.0, corvo: 2.3 };
    const FEM = !!e.slim && !e.quad, TW = prof.tw * (FEM ? .84 : 1), AR = FEM ? .86 : 1;
    const SZ = .58, K = (e.quad ? (QK[e.quad] ?? 1.3) : prof.k) * SZ, WX = prof.wx, hsty = prof.hair;
    const yawT = { down: 0, dq: Math.PI / 4, side: Math.PI / 2, uq: Math.PI * 3 / 4, up: Math.PI };
    const th = yawT[dir] ?? 0, cth = Math.cos(th), sth = Math.sin(th);
    const walking = frame >= 0, sit = frame === -2;
    const ph = walking ? (frame / (typeof ea === "number" ? ea : 12)) * Math.PI * 2 : 0;
    const buf = new Array(SW * SH).fill(null);
    const put = (x, y, c) => { x |= 0; y |= 0; if (x < 0 || y < 0 || x >= SW || y >= SH) return; buf[y * SW + x] = c; };
    const sx = (x, z) => AX + (x * cth * WX + z * sth) * K;
    const SO = e.cls === "papainoel" ? 5 : 21, sy = (y) => AY + (y - 98) * K + (sit ? SO * K : 0);
    const dp = (x, z) => z * cth - x * sth;
    const parts = [];
    let add = (d, fn) => parts.push({ d, fn });
    const cls = e.cls;
    const P = (h) => ramp(h);
    const hairR = (h) => { const b = hexc(h), lum = (b[0] * .3 + b[1] * .59 + b[2] * .11) / 255, s2 = lum < .3 ? 1.6 : 1.22; const bb = b.map((v) => Math.min(255, v * s2)); return [mixc(bb, [60, 20, 40], .5), mixc(bb, [60, 20, 40], .26), bb, mixc(bb, [255, 236, 170], .3), mixc(bb, [255, 250, 210], .6)]; }, skinR = (h) => { const b = hexc(h), sh = [150, 70, 80], hi = [255, 240, 220]; return [mixc(b, sh, .42), mixc(b, sh, .2), mixc(b, [255,220,200], .06), mixc(b, hi, .35), mixc(b, hi, .6)]; }, skin = skinR(e.skin ?? 15780008), hair = hairR(e.hair ?? 9058850), tunic = P(e.tunic ?? 9054758), trim = P(e.trim ?? 15254090), pants = P(((e.pants ?? 5914414) & 0xfefefe) / 2 + 0x606060 | 0), boots = P(e.boots ?? 3876120);
    const accR = (() => { const a = hexc(ACC); return [mixc(a, [20, 10, 50], .55), mixc(a, [20, 10, 50], .25), a, mixc(a, [255, 255, 255], .45), mixc(a, [255, 255, 255], .85)]; })();
    const cape = RB ? accR : e.cape ? P(e.cape) : null, metal = P(0xaab4c8), gold = P(0xe8b43a), leather = P(0x7a4e2c);
    const pauld = RB ? P(0xffd860) : e.pauld ? P(e.pauld) : null, hv = e.hvp ?? null, hairStyle = e.head === "hood2" ? "bald" : hv ? "short" : (e.hairStyle ?? "short"), longH = hv ? hv.L >= 2 : hairStyle === "long", Lh = hv ? [0, 12, 22, 32, 44][hv.L] : 34;
    const bodyW = (rx, rz) => Math.hypot(rx * cth, rz * sth) * K;
    // primitivas em pixels (espaço tela)
    function ellS(cx, cy, rx, ry, rm, bias = 0, sd = 1) {
      rx = Math.max(.6, rx); ry = Math.max(.6, ry);
      for (let y = Math.floor(cy - ry - 1); y <= cy + ry + 1; y++) for (let x = Math.floor(cx - rx - 1); x <= cx + rx + 1; x++) {
        const nx = (x + .5 - cx) / rx, ny = (y + .5 - cy) / ry, r2 = nx * nx + ny * ny; if (r2 > 1) continue;
        put(x, y, rm[shade(nx * sd, ny, Math.sqrt(1 - r2), x, y, bias)]);
      }
    }
    function eggS(cx, cy, rx, ry, rm, bias = 0) {
      for (let y = Math.floor(cy - ry - 1); y <= cy + ry + 1; y++) for (let x = Math.floor(cx - rx - 1); x <= cx + rx + 1; x++) {
        const ny = (y + .5 - cy) / ry, nx = (x + .5 - cx) / (rx * (ny > 0 ? 1 - .3 * ny * ny - .1 * ny : 1)), r2 = nx * nx + ny * ny; if (r2 > 1) continue;
        put(x, y, rm[shade(nx, ny, Math.sqrt(1 - r2), x, y, bias)]);
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
    // ---------- QUADRÚPEDES / CRIATURAS (monstros) ----------
    if (e.quad) {
      const QD = e.quad, col = e.col ?? 0x808080, lt = (c, t) => { const m = mixc(hexc(c), [255, 255, 255], t); return (m[0] << 16 | m[1] << 8 | m[2]) | 0; };
      const fur = P(col), furL = P(lt(col, .4)), furD = P((col >> 1) & 0x7f7f7f), dark = P(0x2a2028), white = P(0xffffff), eyeR = P(e.eye ?? 0xffc040), paw = P(0x40343c);
      const atkq = lvl > 0, hz = atkq ? 5 : 0, wob = walking ? Math.abs(Math.cos(ph)) * 1.2 : 0, wag = walking ? Math.sin(ph * 2) * 3 : 0;
      const quadLegs = (len, thick, zs, lx) => { for (const zi of zs) for (const side of [-1, 1]) { const p2 = ph + (side * zi > 0 ? 0 : Math.PI), swq = walking ? Math.sin(p2) * 7 : 0, lf = walking ? Math.max(0, -Math.cos(p2)) * 4 : 0, x = side * lx; C3(x, 98 - len, zi, x, 97 - lf, zi + swq, thick, thick * .7, fur); E3(x, 98 - lf, zi + swq + 1.5, thick * .9, 2, thick * 1.1, paw); if (zi < 0) E3(x, 98 - len + 1, zi, thick * 1.3, len * .5, thick * 1.5, fur); } };
      if (QD === "wolf" || QD === "frostwolf" || QD === "hati") {
        E3(0, 80 - wob, -1, 8.6, 8.8, 15, fur); E3(0, 79 - wob, 8, 7.8, 8.6, 8, fur, .05); E3(0, 83 - wob, -9, 7.2, 7.2, 7, fur, -.04); E3(0, 86 - wob, 1, 5.2, 3.4, 11, furL);
        if (QD === "hati") E3(0, 76 - wob, 11, 9.4, 9, 5.4, furL, .06);
        quadLegs(15, 3.6, [9, -9], 5.4);
        C3(0, 78 - wob, 10, 0, 71, 16 + hz * .6, 6.2, 5.4, fur); E3(0, 69.5, 18 + hz, 6.4, 5.9, 6.5, fur);
        C3(0, 72, 21 + hz, 0, 73, 29 + hz, 4.3, 3, furL); E3(0, 72, 29.8 + hz, 2.1, 1.8, 1.8, dark);
        if (atkq) { C3(0, 74.8, 22 + hz, 0, 78.4, 28 + hz, 2.5, 1.6, dark); for (const sd of [-1, 1]) E3(sd * 1.8, 75, 28.4 + hz, .7, 1.2, .7, white); }
        for (const sd of [-1, 1]) { E3(sd * 3.9, 67.6, 22.8 + hz, 1.5, 1.3, 1.1, eyeR, .25); POLY3([[sd * 2.4, 63, 16 + hz], [sd * 7.2, 63, 17 + hz], [sd * 5.6, 53.5 - (QD === "hati" ? 3 : 0), 15 + hz]], (x, y) => rampAt(fur, .6 + (BAY[y & 3][x & 3]) * .12), .3); POLY3([[sd * 3.4, 62.5, 16.6 + hz], [sd * 6, 62.5, 17 + hz], [sd * 5.2, 57, 16 + hz]], (x, y) => rampAt(P(0xd08a90), .5), .32); }
        C3(0, 77, -14, wag * .5, 71, -25, 3.2, 1.9, fur); E3(wag, 70, -27, 2.6, 2.6, 3.8, furL);
        for (let i = 0; i < 6; i++) { const z = 11 - i * 4.4, sp = QD === "frostwolf" ? P(0xcfeaff) : furL, h = QD === "frostwolf" ? 9 : 6; POLY3([[-2, 72, z], [2, 72, z], [0, 72 - h, z - 2.4]], (x, y) => rampAt(sp, .7 - (y - sy(72 - h)) * .02), .4); }
        if (e.id === "cao_magma") add(dp(0, 0) + .45, () => { for (const [a1, b1, a2, b2] of [[-8, 76, 4, 80], [-3, 84, 6, 74], [2, 80, 8, 86]]) lineS(sx(a1 * .6, a2 - 6), sy(b1), sx(a2 * .6, a2 - 2), sy(b2), [255, 150, 40]); });
      } else if (QD === "grifo") {
        const gold = P(0xc98f3e), goldL = P(0xeec070), fea = P(0xf6f1e4), feaD = P(0xb9b2a2), beak = P(0xffc02c), brn = P(0x6e4220), blu = P(0x7fb4ff);
        const lift = walking ? Math.sin(ph) * 9 : Math.sin(ph) * 2 + 3, wy = 84 - wob;
        E3(0, 82 - wob, -1, 8.8, 8.6, 15, gold); E3(0, 81 - wob, -10, 8, 8.6, 8, gold, -.04); E3(0, 84 - wob, 8, 8.4, 9.6, 8, fea, .05); E3(0, 88 - wob, 1, 5.4, 3.2, 11, goldL);
        for (const sd of [-1, 1]) for (let i = 0; i < 5; i++) E3(sd * 3.2, 80 - wob + i * 1.4, 12 - i * 2.6, 2.6, 2.8, 2.6, i % 2 ? fea : feaD, .1);
        quadLegs(15, 4, [-9], 5.6);
        for (const side of [-1, 1]) { const p2 = ph + (side > 0 ? 0 : Math.PI), swq = walking ? Math.sin(p2) * 7 : 0, lf = walking ? Math.max(0, -Math.cos(p2)) * 4 : 0, x = side * 5; C3(x, 79, 9, x, 96 - lf, 9 + swq, 3.8, 2.2, fea); E3(x, 97 - lf, 9 + swq + 2.4, 3, 1.8, 4.2, beak); for (const t of [-1.6, 0, 1.6]) E3(x + t, 98 - lf, 9 + swq + 6, .8, .8, 2.2, dark); }
        for (const sd of [-1, 1]) {
          const rt = [sd * 6, wy - 4, -1], tp = [[sd * 14, wy - 20 - lift, -4], [sd * 34, wy - 28 - lift * 1.4, -7], [sd * 54, wy - 24 - lift * 1.9, -10], [sd * 62, wy - 12 - lift * 1.3, -12], [sd * 56, wy + 2 - lift * .6, -12], [sd * 44, wy + 8, -10], [sd * 24, wy + 10, -6]];
          for (let k = 0; k < tp.length - 1; k++) POLY3([rt, tp[k], tp[k + 1]], (x, y) => rampAt(k % 2 ? fea : gold, .55 + BAY[y & 3][x & 3] * .1 + k * .035), .2 - k * .02);
          for (let k = 2; k < tp.length; k++) POLY3([[sd * 30, wy - 2, -6], [tp[k][0], tp[k][1], tp[k][2]], [tp[k][0] - sd * 6, tp[k][1] + 12, tp[k][2]]], (x, y) => rampAt(feaD, .5 + k * .04), .1);
          C3(sd * 6, wy - 4, -1, sd * 34, wy - 28 - lift * 1.4, -7, 2.2, 1.6, brn);
        }
        C3(0, 80, 11, 0, 66, 17 + hz * .6, 6.8, 5.4, fea); for (let i = 0; i < 4; i++) E3(0, 78 - i * 3.6, 12 + i * 1.6, 5.6 - i * .4, 2.6, 3, i % 2 ? feaD : fea);
        E3(0, 61, 20 + hz, 5.4, 5.2, 6, fea); E3(0, 57, 17 + hz, 4.4, 2.6, 4, goldL);
        for (let i = 0; i < 4; i++) POLY3([[-3 + i * 2, 58, 15 + hz], [-2 + i * 2, 52 - i % 2 * 2, 10 + hz - i], [-1 + i * 2, 58, 17 + hz]], (x, y) => rampAt(fea, .8 - (y & 3) * .05), .4);
        C3(0, 62, 24 + hz, 0, 64.5, 31 + hz, 3.6, 1.4, beak); E3(0, 66.2, 31.4 + hz, 1.3, 2.6, 1.7, beak, .2); if (atkq) C3(0, 66, 28 + hz, 0, 70, 31 + hz, 2, 1.2, dark);
        for (const sd of [-1, 1]) E3(sd * 3.8, 59.4, 23 + hz, 1.3, 1.3, 1.1, eyeR, .25);
        C3(0, 80, -15, wag * .5, 74, -27, 2.6, 1.8, gold); E3(wag * .8, 72, -29, 2.8, 3.8, 3.2, brn);
      } else if (QD === "corvo") {
        const plm = P(0x2b3446), plL = P(0x56688a), chs = P(0xb9c6da), bk = P(0x8d929e), bkD = P(0x4a4e58), rune = P(0x58e8d4), gl = P(0xd8b04a), lift = walking ? Math.abs(Math.sin(ph)) * 5 : 0, spread = atkq ? 9 : 0;
        for (const sd of [-1, 1]) { const p2 = ph + (sd > 0 ? 0 : Math.PI), swq = walking ? Math.sin(p2) * 8 : 0, lf = walking ? Math.max(0, -Math.cos(p2)) * 6 : 0, x = sd * 5; E3(x, 70, 0, 4.2, 6, 6.5, plm); C3(x, 72, 1, x, 84, 2 + swq * .5, 2.2, 1.7, bk); C3(x, 84, 2 + swq * .5, x, 96 - lf, swq, 1.7, 1.5, bk); for (const t of [-2.2, 0, 2.2]) { C3(x, 97.4 - lf, swq, x + t, 98 - lf, swq + 5.5, 1.1, .5, bkD); } C3(x, 97 - lf, swq, x, 96 - lf, swq - 3.4, 1, .4, bkD); }
        E3(0, 62 - lift * .4, -2, 9.4, 10.4, 15, plm); E3(0, 66 - lift * .4, 8, 8.2, 9.6, 7.5, chs, .05); E3(0, 55 - lift * .4, -3, 8, 3.4, 11, plL);
        for (let i = 0; i < 4; i++) E3(0, 61 + i * 2.6 - lift * .4, 14.6 - i * .2, 5.6 - i * .5, 2.4, 2.8, i % 2 ? chs : P(0x8fa0bc), .1);
        for (const sd of [-1, 1]) { const wy = 60 - lift * .4; E3(sd * 10.2, wy, -2, 2.6, 9.6, 14, plm); for (let i = 0; i < 5; i++) POLY3([[sd * 12, wy - 4 + i * 2.2, 6 - i * 4.6], [sd * (12.6 + spread * .35), wy + 4 + i * 2, -3 - i * 4.6], [sd * (11 + spread * .3), wy + 13 + i * 2.4, 2 - i * 4.8]], (x, y) => rampAt(i % 2 ? plL : plm, .55 + BAY[y & 3][x & 3] * .1), .2); }
        C3(0, 58, 10, 0, 44, 17 + hz * .6, 6.4, 5, chs); E3(0, 50, 14, 5.4, 3, 3.4, chs);
        E3(0, 40, 19 + hz, 4.8, 4.6, 5.6, plm); E3(0, 36, 17 + hz, 3.6, 2, 3.8, plL);
        for (let i = 0; i < 3; i++) POLY3([[-2.4 + i * 2.4, 36, 15 + hz], [-2 + i * 2.4, 29 - (i % 2) * 2, 9 + hz - i], [-1 + i * 2.4, 36, 18 + hz]], (x, y) => rampAt(plL, .8 - (y & 3) * .05), .4);
        C3(0, 41, 23 + hz, 0, 43.4, 34 + hz, 3, .9, bk); E3(0, 45, 34 + hz, 1, 2.2, 1.8, bkD, .25); if (atkq) C3(0, 43, 26 + hz, 0, 47, 33 + hz, 2, 1, bkD);
        for (const sd of [-1, 1]) { E3(sd * 3.9, 38, 21.4 + hz, 1.3, 1.3, 1.1, gl, .25); E3(sd * 4.2, 38, 21.7 + hz, .5, .5, .4, dark, .25); }
        for (let i = -2; i <= 2; i++) C3(0, 58, -13, i * 4.2, 66 - Math.abs(i) * 1.2, -32 - (2 - Math.abs(i)) * 2, 2.4, .6, i % 2 ? plL : plm);
        add(dp(0, 0) + .55, () => { for (const sd of [-1, 1]) lineS(sx(sd * 10.8, 2), sy(58), sx(sd * 10.8, -6), sy(66), [88, 232, 212]); });
      } else if (QD === "boar") {
        E3(0, 78 - wob, 0, 10.6, 10.6, 14, fur); E3(0, 72 - wob, 6, 8.4, 6.2, 7.6, furD); E3(0, 86 - wob, 1, 6.4, 3.6, 10, furL);
        quadLegs(12, 4.2, [8, -8], 6.4);
        E3(0, 76, 17 + hz, 8, 7.6, 7.6, fur); E3(0, 78, 24 + hz, 4.8, 4.2, 3, P(0xd9a0a0)); for (const sd of [-1, 1]) { E3(sd * 1.8, 78, 26.6 + hz, .8, .9, .6, dark); C3(sd * 4.2, 79, 23 + hz, sd * 5.4, 73.5, 26 + hz, 1.3, .5, white); E3(sd * 4.8, 72.5, 20 + hz, 1.2, 1.1, 1, P(0xff5a4a), .2); POLY3([[sd * 3, 68.5, 15 + hz], [sd * 7.4, 69, 16 + hz], [sd * 6.6, 62, 15 + hz]], (x, y) => rampAt(furD, .5), .3); }
        for (let i = 0; i < 6; i++) { const z = 9 - i * 3.6; POLY3([[-2.4, 70 - wob, z], [2.4, 70 - wob, z], [0, 63, z - 2]], (x, y) => rampAt(dark, .8 - (y - sy(63)) * .03), .4); }
        C3(0, 76, -13, 2 + wag * .3, 72, -17, 1.6, 1, furD);
      } else if (QD === "yeti") {
        const lf = (sd) => walking ? Math.max(0, -Math.cos(ph + (sd > 0 ? 0 : Math.PI))) * 4 : 0, sw1 = (sd) => walking ? Math.sin(ph + (sd > 0 ? 0 : Math.PI)) * 6 : 0;
        for (const sd of [-1, 1]) { C3(sd * 6.4, 76, 0, sd * 6.8, 96 - lf(sd), sw1(sd), 6.8, 5.2, fur); E3(sd * 6.8, 97 - lf(sd), sw1(sd) + 3, 6.6, 3.2, 7.6, furD); }
        E3(0, 58 - wob, 0, 15.6, 19.6, 11.6, fur); E3(0, 62 - wob, 5, 10, 12, 6, furL, .08);
        for (const sd of [-1, 1]) { const ax2 = atkq ? 12 : -sw1(sd) * .9, ay2 = atkq ? 44 : 70; C3(sd * 15.6, 46, 0, sd * 21, ay2 - 8, ax2 * .5, 6.2, 5.4, fur); C3(sd * 21, ay2 - 8, ax2 * .5, sd * 21.4, ay2, ax2, 5.6, 5.8, fur); E3(sd * 21.4, ay2 + 3, ax2, 6.2, 5.6, 6, furL, .05); for (let k = -1; k <= 1; k++) E3(sd * 21.4 + k * 3, ay2 + 8, ax2 + 1, 1.2, 2.4, 1.2, white); POLY3([[sd * 10, 44, 3], [sd * 20, 44, 3], [sd * 15, 36, 2]], (x, y) => rampAt(furL, .7), .3); }
        E3(0, 38, 3 + hz * .4, 11.4, 10, 10.4, fur); E3(0, 39.5, 10.6 + hz * .4, 7.2, 6.2, 3, P(0x8ec8e8)); for (const sd of [-1, 1]) { E3(sd * 3.2, 37.4, 12.6 + hz * .4, 1.5, 1.3, 1, P(0xff4040), .25); C3(sd * 2.6, 44, 12 + hz * .4, sd * 3, 47, 12.4 + hz * .4, .8, .5, white); } C3(-6, 34.6, 11.2, 6, 34.6, 11.2, 1.8, 1.8, furD); E3(0, 44, 12 + hz * .4, 3.6, 1.1, 1.4, dark);
        for (const sd of [-1, 1]) POLY3([[sd * 9.6, 30, 2], [sd * 12.6, 31, 2], [sd * 12, 22, 1]], (x, y) => rampAt(P(0xe8e0d0), .6), .35);
      } else if (QD === "blob") {
        const sq = walking ? Math.sin(ph * 2) * .6 : 0;
        E3(0, 88 - wob, 0, 16 + sq, 12 - sq, 16 + sq, fur); E3(0, 90, 2, 12, 5, 13, furL, -.1);
        for (let i = 0; i < 7; i++) { const an = i / 7 * Math.PI * 2, bx = Math.cos(an) * 8, bz = Math.sin(an) * 8; POLY3([[bx - 2.4, 80, bz], [bx + 2.4, 80, bz], [bx * 1.2, 70 - (i % 2) * 3, bz * 1.2]], (x, y) => rampAt(furL, .8 - (y - sy(70)) * .04), .5); }
        for (const sd of [-1, 1]) { E3(sd * 5.4, 85, 13, 3.4, 3.8, 2.6, white); E3(sd * 5.4, 85.6, 14.8, 1.7, 2, 1.1, dark); }
        E3(0, 92, 14, 5, 1.2, 1.4, dark); if (atkq) E3(0, 93, 14.4, 4.2, 2.4, 1.4, dark);
      } else {
        const sg = (sd) => walking ? Math.sin(ph + (sd > 0 ? 0 : Math.PI)) : 0, lfg = (sd) => walking ? Math.max(0, -Math.cos(ph + (sd > 0 ? 0 : Math.PI))) * 4 : 0;
        const legs2 = (lx, hip, th, c, ft) => { for (const sd of [-1, 1]) { C3(sd * lx, hip, 0, sd * lx, 96 - lfg(sd), sg(sd) * 6, th, th * .8, c); E3(sd * lx, 97 - lfg(sd), sg(sd) * 6 + 2, th * 1.1, 2, th * 1.6, ft ?? dark); } };
        const arms2 = (sx0, shY, len, th, c, hand) => { for (const sd of [-1, 1]) { const az = atkq ? 11 : -sg(sd) * 6, ay = atkq ? shY + len * .5 : shY + len; C3(sd * sx0, shY, 0, sd * (sx0 + 2), ay, az, th, th * .8, c); E3(sd * (sx0 + 2), ay + 1, az + 1, th * .9, th * .9, th * .9, hand ?? furL); } };
        const eyes2 = (y, z, sp, r) => { for (const sd of [-1, 1]) E3(sd * sp, y, z, r * 1.2, r, r * .8, eyeR, .1); };
        const bd = -wob;
        if (QD === "goblin") {
          legs2(3.4, 82, 2.6, furD); E3(0, 72 + bd, 0, 6.4, 8.6, 5.6, fur); E3(0, 76 + bd, 3, 5, 6, 3, furL); arms2(7.4, 66, 12, 2, fur);
          E3(0, 55 + bd, 2 + hz * .3, 7.6, 7, 7, fur); E3(0, 58 + bd, 8 + hz * .3, 3, 2.4, 2.6, furL); eyes2(54 + bd, 8.4 + hz * .3, 3.6, 1.5); E3(0, 62 + bd, 8.4, 3.4, .9, 1, dark);
          for (const sd of [-1, 1]) { POLY3([[sd * 6, 53 + bd, 2], [sd * 6, 57 + bd, 2], [sd * 15, 48 + bd, 0]], (x, y) => rampAt(fur, .62 + BAY[y & 3][x & 3] * .1), .3); }
          C3(7.4, 76, 11 + hz * .4, 7.4, 63, 15 + hz * .4, 1.7, 1.4, P(0x7a4e2c)); E3(7.4, 60.5, 15.6 + hz * .4, 2.8, 3.8, 2.8, P(0x6a4224));
        } else if (QD === "draugr") {
          const bn = P(0xcfd6c8); legs2(3.8, 76, 2.4, P(0x5a6a60)); E3(0, 64 + bd, 0, 8, 13, 5.6, P(0x4a5a5e)); for (let i = 0; i < 4; i++) E3(0, 56 + i * 4 + bd, 4.6, 6.2 - i * .4, .7, .8, bn);
          E3(0, 70, 0, 9, 4, 6.4, P(0x3a4446)); arms2(9.8, 54, 18, 2, P(0x6a7a70), bn);
          E3(0, 43 + bd, 3 + hz * .3, 5.6, 6.2, 5.8, bn); E3(0, 47 + bd, 7 + hz * .3, 3.4, 2.4, 2.6, bn); eyes2(42 + bd, 8.2 + hz * .3, 2.4, 1.4);
          for (const sd of [-1, 1]) C3(sd * 5, 41 + bd, 2, sd * 9.4, 32 + bd, 2, 1.4, .6, bn); E3(0, 36 + bd, 3, 6.4, 2.4, 6, P(0x6a6a74));
          C3(11, 68, 8 + hz * .6, 11, 42, 12 + hz * .8, 1.1, .9, P(0x8a8a96)); E3(11, 70, 8, 2.6, .8, 1.6, P(0x7a5a2a));
        } else if (QD === "cinder") {
          const hot = P(0xffa030), rock = P(0x3a2a28); legs2(5, 80, 4, rock, furD); E3(0, 64 + bd, 0, 12.6, 16, 9.6, rock); E3(0, 66 + bd, 5.6, 7, 9, 4, fur);
          for (let i = 0; i < 5; i++) C3(-6 + i * 3, 52 + i % 2 * 5 + bd, 8.6, -4 + i * 3.2, 62 + i * 3 + bd, 9.4, .9, .6, hot);
          arms2(14.2, 54, 24, 4.4, rock, fur); E3(0, 44 + bd, 2 + hz * .3, 7.4, 7, 7, rock); eyes2(43 + bd, 8 + hz * .3, 3.2, 1.5);
          for (let i = -2; i <= 2; i++) POLY3([[i * 3 - 2, 39 + bd, 2], [i * 3 + 2, 39 + bd, 2], [i * 3.6, 24 - Math.abs(i) * 3 + bd - (walking ? Math.sin(ph * 2 + i) * 2 : 0), 2]], (x, y) => rampAt(hot, .9 - (y - sy(24)) * .02), .6);
        } else if (QD === "automaton") {
          const st2 = P(0x8a98a8), st3 = P(0x586470); legs2(5, 78, 4, st3, furD); E3(0, 62 + bd, 0, 11, 15, 8, st2); E3(0, 62 + bd, 7, 7, 6, 2.4, st3); E3(0, 62 + bd, 8.6, 2.6, 2.6, 1.2, eyeR);
          for (const sd of [-1, 1]) { E3(sd * 13, 48 + bd, 0, 5.4, 4.4, 5.4, furD); POLY3([[sd * 6, 70, 8], [sd * 10, 70, 8], [sd * 8, 78, 8]], () => st3[1], .5); }
          arms2(14.6, 50, 22, 3.6, st3, furD); E3(0, 41 + bd, 2 + hz * .3, 6.4, 5.8, 6, st2); E3(0, 41 + bd, 8 + hz * .3, 5, 1.4, .8, dark); E3(0, 41 + bd, 8.6 + hz * .3, 3.6, .9, .6, eyeR);
          C3(0, 36 + bd, 2, 0, 28 + bd, 2, .7, .5, st3); E3(0, 27 + bd, 2, 1.6, 1.6, 1.6, eyeR);
        } else if (QD === "sylvan") {
          const bark = fur, lf = P(0x4ea84a), lf2 = P(0x86d060); legs2(4.6, 80, 3.8, furD); C3(0, 86, 0, 0, 52 + bd, 0, 10, 8, bark); for (let i = 0; i < 5; i++) C3(-6 + i * 3, 80 - i * 5, 8, -6 + i * 3 + 1, 74 - i * 5, 8.4, .6, .4, furD);
          arms2(10, 56, 24, 3.2, bark, lf); for (const sd of [-1, 1]) { C3(sd * 8, 52, 0, sd * 16, 38 + bd, 2, 2, 1.2, bark); E3(sd * 16, 36 + bd, 2, 5, 3.4, 5, lf); }
          E3(0, 46 + bd, 3 + hz * .3, 7, 7.4, 6.6, bark); eyes2(45 + bd, 8.8 + hz * .3, 2.8, 1.4);
          E3(0, 36 + bd, 0, 13, 6, 12, lf); E3(0, 31 + bd, 0, 9, 5, 8.6, lf2); E3(-7, 34 + bd, 4, 4, 3, 4, lf2); E3(7, 35 + bd, -3, 4, 3, 4, lf2);
        } else if (QD === "prism") {
          const fl = walking ? Math.sin(ph * 2) * 2 : -1, c1 = P(col), c2 = P(lt(col, .55)), c3 = P(0xffffff);
          const fac = (pts, k) => POLY3(pts, (x, y) => rampAt(k % 2 ? c2 : c1, .55 + ((x * 3 + y * 5 + k * 7) % 5) * .08), .2);
          fac([[0, 36 + fl, 0], [-12, 62 + fl, 0], [0, 62 + fl, 10]], 0); fac([[0, 36 + fl, 0], [0, 62 + fl, 10], [12, 62 + fl, 0]], 1); fac([[0, 90 + fl, 0], [-12, 62 + fl, 0], [0, 62 + fl, 10]], 2); fac([[0, 90 + fl, 0], [0, 62 + fl, 10], [12, 62 + fl, 0]], 3);
          fac([[0, 36 + fl, 0], [-12, 62 + fl, 0], [0, 62 + fl, -10]], 4); fac([[0, 36 + fl, 0], [0, 62 + fl, -10], [12, 62 + fl, 0]], 5);
          E3(0, 62 + fl, 8, 2.8, 2.8, 1.6, eyeR); E3(-2, 52 + fl, 6, 1.2, 4, .8, c3);
          for (let i = 0; i < 4; i++) { const an = ph + i * 1.6; E3(Math.cos(an) * 17, 62 + fl + Math.sin(an * 1.3) * 5, Math.sin(an) * 10, 2.2, 3, 2.2, i % 2 ? c2 : c1); }
        } else if (QD === "sentinel") {
          const st2 = P(0x9a9aa4), st3 = P(0x60606c), gl = P(0xffc860); legs2(5.2, 78, 4.4, st3); E3(0, 64 + bd, 0, 12, 16, 8.6, st2); E3(0, 60 + bd, 7, 5, 8, 2, st3); E3(0, 58 + bd, 8.6, 1.6, 4, 1, gl);
          for (const sd of [-1, 1]) E3(sd * 13.6, 48 + bd, 0, 6, 5, 6, st3); arms2(15, 50, 22, 4, st2, st3);
          E3(0, 40 + bd, 2 + hz * .3, 6, 6.6, 6, st2); E3(0, 38 + bd, 7.6 + hz * .3, 4, .9, .6, gl); E3(0, 33 + bd, 2, 2, 5, 2, st3);
          E3(-15, 64, 6 + hz * .5, 2, 12, 9, st3); E3(-15.8, 64, 6 + hz * .5, 1, 8, 6, gl);
        } else if (QD === "voidling") {
          const fl = walking ? Math.sin(ph * 2) * 2 : Math.sin(0) , vd = P(col), vl = P(lt(col, .5));
          E3(0, 60 + fl, 0, 12, 16, 11, vd); E3(0, 52 + fl, 3, 8, 8, 8, vl, .1);
          for (let i = 0; i < 6; i++) { const an = i / 6 * 6.28 + ph * .5, bx = Math.cos(an) * 8, bz = Math.sin(an) * 7; C3(bx, 70 + fl, bz, bx * 1.6, 88 + Math.sin(an * 2 + ph) * 3, bz * 1.6, 3.2, .8, vd); }
          for (const [ex, ey, er] of [[-4.6, 52, 2.8], [4.6, 52, 2.8], [0, 46, 2.2], [-7, 60, 1.6], [7, 60, 1.6]]) { E3(ex, ey + fl, 9.4, er, er, 1.4, white); E3(ex, ey + fl, 10.6, er * .5, er * .6, .8, eyeR); }
        } else {
          const ic = P(0xc8e4f4), hi = P(0xeef8ff); legs2(6.4, 76, 6, fur, furD); E3(0, 56 + bd, 0, 16, 21, 11, fur); E3(0, 52 + bd, 8.4, 10, 12, 3, furL); arms2(19.6, 44, 30, 5.6, fur, ic);
          E3(0, 30 + bd, 3 + hz * .3, 9.4, 9, 8.6, fur); E3(0, 22 + bd, 4, 10.4, 5.8, 9, ic); for (const sd of [-1, 1]) { POLY3([[sd * 8, 24 + bd, 4], [sd * 10, 26 + bd, 4], [sd * 15, 8 + bd, 3]], () => hi[3], .4); }
          E3(0, 30 + bd, 11 + hz * .3, 5.6, 4.6, 2.4, ic); eyes2(27 + bd, 12.6 + hz * .3, 3.2, 1.5); for (let i = -2; i <= 2; i++) E3(i * 3.2, 38 + bd, 10, 1.6, 2.4, 1.2, hi);
        }
      }
      add = () => {};
    }
    const front = cth > 0.12, back = cth < -0.12;
    const sw = walking ? Math.sin(ph) : 0, bob = walking ? Math.abs(Math.cos(ph)) * 1.2 : 0;
    const atk = lvl > 0 ? lvl : 0;
    // ---------- RENASCIDO: asas, auréola, brilho ----------
    if (RB) {
      const wn = RB >= 3 ? 5 : RB === 2 ? 4 : 3, wsw = walking ? Math.sin(ph) * 1.5 : 0;
      if (RB >= 2) for (const side of [-1, 1]) for (let row = 0; row < 2; row++) for (let i = 0; i < wn; i++) {
        const t = i / (wn - 1), ang = (-12 + t * 100) * Math.PI / 180, L = (row ? 30 : 40) * K + (RB - 2) * 12 * K + Math.sin(t * 3.1) * 10 * K * (row ? .6 : 1), W = (row ? 6 : 7.4) * K;
        const rm = row ? accR : i === wn - 1 ? accR : i % 2 ? P(0xfff0c0) : P(0xf4f4ff);
        add(dp(side * 7, -13) - 4 - row * .01 + i * .001, () => {
          const X0 = sx(side * 8, -13), Y0 = sy(44 - row * 2), cx = side * Math.cos(ang), cy = -Math.sin(ang), nx = -cy, ny = cx, wv = walking ? Math.sin(ph) * .05 : 0;
          const px = (u, v) => [X0 + (cx * u + nx * v) * 1, Y0 + (cy * u + ny * v)];
          const pts = [px(0, -W * .35), px(L * .3, -W), px(L * .72, -W * .75), px(L * (1 + wv), 0), px(L * .72, W * .75), px(L * .3, W), px(0, W * .35)];
          polyS(pts, (x, y) => { const q = ((x - X0) * cx + (y - Y0) * cy) / L; return rampAt(rm, .86 - q * .22 + (BAY[y & 3][x & 3]) * .1 - (i === wn - 1 ? 0 : 0)); });
          lineS(X0, Y0, X0 + cx * L * .96, Y0 + cy * L * .96, rm[2]);
        });
      }
      add(dp(0, 0) + .995, () => { const X = sx(0, -1), Y = sy(hdY - 25), rx = 12.5 * K * (.55 + .45 * Math.abs(cth)), ry = 3.4 * K; for (let a = 0; a < 90; a++) { const an = a / 90 * Math.PI * 2, c = Math.cos(an), sn = Math.sin(an); put(X + c * rx, Y + sn * ry, gold[3]); put(X + c * (rx - 1), Y + sn * (ry - .7), gold[4]); put(X + c * (rx + 1), Y + sn * (ry + .7), gold[1]); } if (RB >= 3) for (let a = 0; a < 90; a++) { const an = a / 90 * Math.PI * 2; put(X + Math.cos(an) * (rx + 4), Y + Math.sin(an) * (ry + 2) - 2, accR[3]); } });
      add(dp(0, 8) + .57, () => { if (!front) return; const X = sx(0, 8), Y = sy(51); ellS(X, Y, 3.6 * K * Math.abs(cth) + 1, 3.8 * K, accR, .1); put(X - 1, Y - 2, [255, 255, 255]); if (RB >= 2) { lineS(X - 8 * K * cth, sy(46), X - 2 * K, sy(52), gold[4]); lineS(X + 8 * K * cth, sy(46), X + 2 * K, sy(52), gold[4]); } });
      add(1.5, () => { const sp = [[-30, 20], [32, 34], [-26, 70], [30, 60], [0, -6], [-40, 48], [40, 10]]; for (let k = 0; k < (RB >= 3 ? 7 : RB === 2 ? 5 : 3); k++) { const X = Math.round(AX + sp[k][0] * K * .8), Y = Math.round(AY - 100 * K + 20 + sp[k][1] * K * .9), c = k % 2 ? [255, 255, 255] : [255, 236, 150]; put(X, Y, c); put(X - 1, Y, c); put(X + 1, Y, c); put(X, Y - 1, c); put(X, Y + 1, c); put(X, Y - 2, c); put(X, Y + 2, c); } });
    }
    // ---------- CAPA ----------
    if (cape) {
      const sway = (walking ? Math.sin(ph + 1) * 3 : 0) + (e.cw || 0) * 4;
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
        const ss = prof.sit; hipY = 70; kneeY = 62; footY = 75; kz = 13; fz = 22; kx = side * 6.4; fx = side * 6.4;
        if (ss === "spread") { kx = side * 11; fx = side * 15; kz = 12; fz = 24; kneeY = 64; }
        else if (ss === "guard") { kneeY = 58; fz = 16; kz = 14; kx = side * 6; fx = side * 6.6; }
        else if (ss === "cross") { kx = side * 13; fx = -side * 4; kz = 8; fz = 14; kneeY = 70; footY = 75; }
        else if (ss === "kneel") { if (side > 0) { kx = 8; fx = 8; kz = 15; fz = 20; kneeY = 61; footY = 75; } else { kx = -10; fx = -3; kz = 8; fz = 2; kneeY = 72; footY = 75; } }
        else if (ss === "perch") { if (side > 0) { kx = 8; fx = 8; kz = 14; fz = 9; kneeY = 55; footY = 75; } else { kx = -9; fx = -7; kz = 10; fz = 18; kneeY = 70; footY = 75; } }
        else if (ss === "lean") { kx = side * 6; fx = side * 8; kz = 18; fz = 30; kneeY = 66; footY = 75; }
        else if (e.cls === "papainoel") { hipY = 70; kneeY = 71; footY = 93; kz = 17; fz = 17; kx = side * 8; fx = side * 8; }
        else if (ss === "perch2") { if (side < 0) { kx = -8; fx = -8; kz = 14; fz = 9; kneeY = 55; footY = 75; } else { kx = 9; fx = 7; kz = 10; fz = 18; kneeY = 70; footY = 75; } }
      }
      C3(lx, hipY, 0, kx, kneeY, kz, 5.2 * lg * (FEM ? .92 : 1), 4.7 * lg * (FEM ? .9 : 1), pants);
      C3(kx, kneeY, kz, fx, footY - 3, fz, 4.8 * lg, 4.4 * lg, T >= 2 ? P(RB ? 0xf0d890 : 0x9aa4bc) : P(e.boots ?? 3876120), .04);
      add(dp(fx, fz + 2) + .1, () => { const X = sx(fx, fz), Y = sy(footY); capS(X, Y - 5 * K, X, Y - 1.5 * K, 5.2 * K * lg, 5 * K * lg, boots); ellS(X + sth * 2.2 * K, Y + 1.6 * K, bodyW(6.2 * lg, 8.4) + .8, 3.6 * K, boots); if (T >= 1) lineS(X - 3, Y - 4 * K, X + 3, Y - 4 * K, trim[3]); });
    }
    // ---------- TRONCO ----------
    if (robe) {
      POLY3([[-12, 50, 0], [12, 50, 0], [20, sit ? 75 : 94, 0], [-20, sit ? 75 : 94, 0]], (x, y) => { let t = .55 - ((x - AX) * cth) * .014 + (((x - AX) + 99) % 7 < 1 ? -.14 : 0); return rampAt(tunic, t); }, 0.2);
      E3(0, 52, 0, 13.4, 11.4, 8, tunic);
      add(dp(0, 4) + .3, () => { for (let x = -20; x <= 20; x++) put(sx(x, 0), sy(sit ? 74 : 93), trim[3]); });
    } else {
      for (let k = -4; k <= 4; k++) POLY3([[k * 3.4 - 1.9, 60, 0], [k * 3.4 + 1.9, 60, 0], [k * 3.9 + 1.6, 71 - bob * .5, 0], [k * 3.9 - 1.6, 71 - bob * .5, 0]], (x, y) => rampAt(leather, .5 - (y - sy(60)) * .03 + (k < 0 ? .04 : -.04)), 0.4);
      E3(0, 52, 0, 13.4 * TW, 11.4 * (FEM ? .96 : 1), 8, T >= 1 ? P(e.tunic ?? 9054758) : tunic);
      if (e.belly) { E3(0, 58, 4.5, 21, 16, 12.5, tunic, .06); add(dp(0, 12) + .45, () => { if (!front) return; const cx = sx(0, 14), lt = P(0xe05a5a), bl = [70, 10, 16]; lineS(cx, sy(44), cx, sy(74), lt[2]); lineS(cx + 1, sy(44), cx + 1, sy(74), lt[3]); for (let d = 0; d < 4; d++) lineS(sx(-21 * cth, 10), sy(60 + d), sx(21 * cth, 10), sy(60 + d), bl); ellS(cx, sy(61.5), 4 * K, 3.4 * K, P(0xf0c040), .05); ellS(cx, sy(61.5), 2 * K, 1.8 * K, P(0x6a4a10), .02); }); }
      if (FEM) {
        // cintura marcada, quadril e saia
        E3(0, 63, 0, 11.2, 5, 7.4, tunic);
        const sk = T >= 1 ? P(e.tunic ?? 9054758) : tunic, hemC = T >= 2 ? P(0xf0e0a0) : P(0xe46a96);
        POLY3([[-9.5, 62, 0], [9.5, 62, 0], [T >= 1 ? 19 : 16.5, T >= 1 ? 86 : 79, 0], [T >= 1 ? -19 : -16.5, T >= 1 ? 86 : 79, 0]], (x, y) => rampAt(sk, .55 - ((x - AX) * cth) * .012 + ((((x - AX) + 99) % 5 < 1) ? -.12 : 0) - (y - sy(62)) * .004), 0.3);
        add(dp(0, 6) + .55, () => { const yb = sy(T >= 1 ? 85.5 : 78.5), hw = (T >= 1 ? 19 : 16.5) * K * Math.abs(cth) + (T >= 1 ? 19 : 16.5) * K * Math.abs(sth) * .4; for (let x = -Math.round(hw); x <= Math.round(hw); x++) { put(Math.round(sx(0, 0)) + x, Math.round(yb), hemC[3]); put(Math.round(sx(0, 0)) + x, Math.round(yb) - 1, hemC[2]); } });
        // busto discreto
        if (cth > -.2) for (const sd of [-1, 1]) E3(sd * 4.6, 49.5, 5.4, 4.4, 4.0, 3.2, tunic, .1);
      }
      // peitoral
      if (T >= 1) E3(0, 52, 5.5, 9.6 * prof.tw, 9.8, 3.6, T >= 2 ? P(RB ? 0xfff0d0 : 0xbcc6e0) : P((e.tunic ?? 9054758) & 0xfefefe | 0x202020), .12);
      if (T >= 2) add(dp(0, 8) + .5, () => { if (!front) return; const cx = sx(0, 8), pm = P(RB ? 0xfff0d0 : 0xbcc6e0); lineS(cx, sy(45), cx, sy(61), pm[1]); lineS(cx - 9 * K * cth, sy(45), cx - 8 * K * cth, sy(60), pm[4]); for (const [yy, w] of [[48, 6], [53, 6.4], [58, 5.4]]) lineS(cx - w * K * cth, sy(yy), cx + w * K * cth, sy(yy), pm[2]); ellS(cx, sy(51), 2.6 * K * Math.abs(cth) + .6, 2.8 * K, gold); put(cx, sy(51), gold[4]); for (const [x, y] of [[-7, 46], [7, 46], [-6, 58], [6, 58]]) put(cx + x * K * cth, sy(y), gold[4]); });
    }
    // cinto
    add(dp(0, 6) + .6, () => { polyS([[sx(FEM ? -9 : -11, 0) - 0, sy(60)], [sx(FEM ? 9 : 11, 0), sy(60)], [sx(FEM ? 9 : 11, 0), sy(FEM ? 63 : 64)], [sx(FEM ? -9 : -11, 0), sy(FEM ? 63 : 64)]], (x, y) => rampAt(leather, .5 - (y - sy(60)) * .08)); if (front && T >= 1) ellS(sx(0, 8), sy(62), 2.6 * K, 2.4 * K, gold); });
    if (T >= 1) add(dp(11, 3) + .62, () => { if (cth < -.3) return; const X = sx(11, 3), Y = sy(67); ellS(X, Y, 3.4 * K, 4 * K, leather); lineS(X - 3 * K, Y - 3 * K, X + 3 * K, Y - 3 * K, gold[3]); });
    // ---------- BRAÇOS ----------
    for (const side of [-1, 1]) {
      const ax_ = side * (FEM ? 15.2 : 17.5), sw2 = walking ? Math.sin(ph + (side > 0 ? Math.PI : 0)) : 0;
      let hz = sw2 * 8, hy = 69 - bob * .3, ez = hz * .5;
      const weaponHand = side === 1;
      if (atk && weaponHand) { const p = [0, -4, 12, 6][atk] ?? 0; hz = p; hy = [69, 52, 64, 68][atk]; ez = hz * .6; }
      if (sit) { hz = 11; hy = 60; ez = 5; }
      C3(ax_, 47, 0, ax_ + side * 1.6, 58, ez, 4.6 * AR, 4.1 * AR, tunic);
      C3(ax_ + side * 1.6, 57, ez, ax_ + side * 1.8, hy - 4, hz, 4.8 * AR, 4.4 * AR, T >= 2 ? P(0xaab0c6) : tunic, .04);
      C3(ax_ + side * 1.7, hy - 12, hz * .8, ax_ + side * 1.8, hy - 4, hz, 4.9 * AR, 4.6 * AR, T >= 2 ? (pauld || P(0xa8b0c8)) : T === 1 ? leather : tunic, .06);
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
      const X = sx(0, 0), Y = sy(hdY), rx = bodyW(FEM ? 13.4 : 14.6, FEM ? 11.8 : 12.6), ry = (FEM ? 16.8 : 17.4) * K; eggS(X, Y, rx, ry, skin, .16);
      // orelhas
      for (const side of [-1, 1]) { const ez = 0; const ex = sx(side * 14.6, ez); if (Math.abs(side * 14.6 * cth) > 4 || !front) ellS(ex, sy(hdY + 3), 2 * K + .4, 3 * K, skin); }
    });
    // cabelo traseiro / volume
    const hairBack = hairStyle !== "bald";
    if (hairBack) {
      add(dp(0, -4) + .55, () => ellS(sx(0, -4), sy(hdY - 8), bodyW(15, 13.4), 11.5 * K, hair, .02));
      if (hv ? (hv.L >= 1 && !["pony","ponyhigh","twin","twinhigh","buns","bun","topknot","lowtwin","dbraid","crown","mohawk","spikes","lowbun"].includes(hv.X)) : hairStyle === "long") { add(dp(0, -9), () => { const X = sx(0, -9), Y = sy(hdY + 6); polyS([[X - bodyW(17, 9), Y - 6], [X + bodyW(17, 9), Y - 6], [X + bodyW(19, 10), Y + Lh * K], [X + bodyW(9, 5), Y + (Lh + 6) * K + (walking ? Math.sin(ph) * 2 : 0)], [X, Y + Lh * K], [X - bodyW(9, 5), Y + (Lh + 6) * K], [X - bodyW(19, 10), Y + Lh * K]], (x, y) => rampAt(hair, .46 + (x - X) * .01 * cth - (y - Y) * .004 + (BAY[y & 3][x & 3] * .1))); }); }
      if (hv && hv.T === 3) add(dp(0, -2) + .52, () => ellS(sx(0, -2), sy(hdY - 4), bodyW(22, 20), 21 * K, hair, .02));
      if (hv && (hv.X === "curl" || hv.X === "wave") && hv.L >= 1) for (const sd of [-1, 1]) for (let i = 0; i < 4; i++) add(dp(sd * 15, -6) + .2, () => ellS(sx(sd * (15 + (i % 2) * 2), -6), sy(hdY + 4 + i * (Lh / 4.2)), 4.6 * K * (hv.X === "curl" ? 1 : .7), 4.2 * K, hair, .06 * (i % 2 ? 1 : -1)));
    }
    // rosto
    if (hairStyle !== "bald" || true) add(dp(0, 14) + .6, () => {
      if (cth < -0.2) return;
      const eyeC = e.eye ? hexc(e.eye) : null;
      for (const side of [-1, 1]) {
        const ex = sx(side * 6.2, 12), vis = dp(side * 6.2, 12) > 1; if (!vis) continue;
        const w = Math.max(2, Math.round(4.6 * K * (.35 + .65 * Math.abs(cth)))), eh = Math.max(3, Math.round((FEM ? 5.8 : 5) * K)), x0 = Math.round(ex - w / 2), y0 = Math.round(sy(hdY + 2));
        const iris = eyeC ? [mixc(eyeC, [10, 10, 30], .6), mixc(eyeC, [10, 10, 30], .3), eyeC, mixc(eyeC, [255, 255, 255], .4), mixc(eyeC, [255, 255, 255], .7)] : [[40, 30, 70], [40, 74, 154], [74, 120, 208], [106, 168, 240], [154, 212, 255]];
        for (let y = 0; y < eh; y++) for (let x = 0; x < w; x++) put(x0 + x, y0 + y, iris[Math.min(4, Math.floor(y * 5 / eh))]);
        put(x0, y0, [255, 255, 255]); if (w > 2) put(x0 + 1, y0, [255, 255, 255]); put(x0, y0 + 1, [225, 238, 255]);
        for (let x = -1; x <= w; x++) put(x0 + x, y0 - 1, [42, 28, 46]);
        for (let x = 0; x < w; x++) { put(x0 + x, y0 - 2, hair[1]); put(x0 + x, y0 - 3, hair[2]); } put(x0 - 1, y0 - 2, hair[1]); put(x0 + w, y0 - 2, hair[1]);
        put(x0 + w - 1, y0 + eh - 2, [220, 244, 255]);
        if (FEM) { const ox = side > 0 ? x0 + w : x0 - 1; put(ox, y0 - 2, [42, 28, 46]); put(ox + (side > 0 ? 1 : -1), y0 - 3, [42, 28, 46]); put(ox, y0 - 3, [42, 28, 46]); }
      }
      const mx = sx(sth * 2, 15) , my = sy(hdY + 13);
      const lipC = FEM ? [206, 70, 100] : [168, 62, 72]; put(mx - 1, my, lipC); put(mx, my, lipC); put(mx + 1, my, lipC); put(mx, my + 1, FEM ? [236, 120, 134] : [210, 110, 96]);
      put(sx(0, 16) + sth * 3, sy(hdY + 9), skin[1]);
      for (const side of [-1, 1]) { if (dp(side * 9.4, 12) > 0) { const bx = sx(side * 9.4, 12); put(bx, sy(hdY + 8), [245, 154, 138]); put(bx + 1, sy(hdY + 8), [245, 154, 138]); } }
    });
    if (hairStyle !== "bald") add(0.715, () => { ellS(sx(0, -1), sy(hdY - 10.5), bodyW(15.6, 13.6), 11.2 * K, hair, .06); });
    if (hairStyle !== "bald") add(0.72, () => {
      const Xc = sx(0, 0), Yc = sy(hdY), rx = bodyW(14.8, 12.8), ry = 17.6 * K;
      for (let y = Math.floor(Yc - ry - 6); y <= Yc + ry + 2; y++) for (let x = Math.floor(Xc - rx - 2); x <= Xc + rx + 2; x++) {
        const ny = (y + .5 - Yc) / (ry + .6), nx = (x + .5 - Xc) / ((rx + .6) * (ny > 0 ? 1 - .3 * ny * ny - .1 * ny : 1)), r2 = nx * nx + ny * ny; if (r2 > 1) continue;
        const wave = Math.sin((x - Xc) * .85) * 1.6 + Math.sin((x - Xc) * .37) * 1.4;
        let inside;
        if (cth < -0.2) inside = y < Yc + ry * .5 + wave * .5;
        else { const bang = y < Yc - ry * .34 + wave + (longH ? 1 : 0); const side = Math.abs(nx) > .78 && y < Yc + ry * (longH ? .9 : .3); inside = bang || side; if (Math.abs(cth) < .5 && sth > 0) inside = inside || (x < Xc + rx * .1 && y < Yc + ry * .6); }
        if (!inside) continue;
        const nz = Math.sqrt(1 - r2); let t = shade(nx, ny, nz, x, y, .12);
        let c = hair[t];
        if (((x - Xc + 1000) | 0) % 4 === 0 && hashn(x, y >> 1, 9) > .35) c = hair[Math.max(0, t - 1)];
        if (hashn(x, y, 11) > .93) c = hair[Math.min(4, t + 1)];
        put(x, y, c);
      }
    });
    if (hv && hv.T >= 2 && hairStyle !== "bald") { if (hv.T === 2) add(dp(0, 6) + .93, () => { if (cth < -.3) return; ellS(sx(0, 6), sy(hdY - 17), bodyW(12, 10), 7 * K, hair, .1); }); else add(dp(0, 0) + .93, () => ellS(sx(0, 0), sy(hdY - 15), bodyW(20, 18), 11 * K, hair, .08)); }
    // franja + mechas (anel de espetos em 3D)
    if (hairStyle !== "bald") {
      const sw3 = walking ? Math.sin(ph) * 3 : 0;
      if (hsty === "mane" && (!hv || hv.X === "mane")) {
        add(dp(0, -9) + .05, () => { const X = sx(0, -9), Y = sy(hdY - 2); polyS([[X - bodyW(19, 13), Y - 10 * K], [X - bodyW(12, 8), Y - 15 * K], [X, Y - 17 * K], [X + bodyW(12, 8), Y - 15 * K], [X + bodyW(19, 13), Y - 10 * K], [X + bodyW(24, 16), Y + 20 * K], [X + bodyW(15, 9), Y + 30 * K + sw3], [X + bodyW(8, 5), Y + 24 * K], [X, Y + 34 * K - sw3], [X - bodyW(8, 5), Y + 25 * K], [X - bodyW(15, 9), Y + 30 * K + sw3], [X - bodyW(24, 16), Y + 20 * K]], (x, y) => rampAt(hair, .56 + (y - Y) * .003 + (BAY[y & 3][x & 3] * .12) + (hashn(x >> 1, y >> 2, 4) - .5) * .16)); });
        add(dp(0, -9) + .06, () => { const X = sx(0, -9), Y = sy(hdY - 2); for (let i = -3; i <= 3; i++) capS(X + i * bodyW(5.6, 4), Y + 2 * K, X + i * bodyW(6.6, 4.6) + sw3 * .4, Y + (24 + (Math.abs(i) % 2 ? 9 : 2) + (i === 0 ? 4 : 0)) * K, 3.6 * K, 1.2 * K, hair, .1 * (i % 2 ? 1 : -1)); });
        for (const side of [-1, 1]) add(dp(side * 16, 6) + .3, () => { if (Math.abs(cth) < .15 && side * sth < 0) return; const X = sx(side * 16.5, 6), Y = sy(hdY + 2); capS(X, Y, X + side * 1.5, Y + 16 * K, 3.8 * K, 2 * K, hair, .08); });
      } else if (hv && !["mane", "braid", "topknot"].includes(hv.X)) {
        const X0 = hv.X, behind = (fn, z = -13, o = .02) => add(dp(0, z) + o, fn), sideP = (sd, fn, o = .3) => add(dp(sd * 16, 6) + o, () => { if (Math.abs(cth) < .15 && sd * sth < 0) return; fn(sd); });
        if (X0 === "pony" || X0 === "ponyhigh") { const hi = X0 === "ponyhigh"; behind(() => { const X = sx(0, -13), Y = sy(hdY - (hi ? 16 : 6)); capS(X, Y, X + sw3 * .6 - sth * 4, Y + (hi ? 10 : 14) * K, 4.8 * K, 3.8 * K, hair, .04); capS(X + sw3 * .6 - sth * 4, Y + (hi ? 9 : 13) * K, X + sw3 - sth * 6, Y + (hi ? 28 : 32) * K, 3.8 * K, 1.4 * K, hair, .1); ellS(X, Y + 1, 3.4 * K, 2.2 * K, gold, 0); }); }
        else if (X0 === "twin" || X0 === "lowtwin" || X0 === "twinhigh") { const hi = X0 === "twinhigh", lo = X0 === "lowtwin"; for (const sd of [-1, 1]) sideP(sd, (q) => { const X = sx(q * 15, 2), Y = sy(hdY + (hi ? -12 : lo ? 8 : -2)); capS(X, Y, X + q * (hi ? 7 : 1.5) + sw3 * .3, Y + (hi ? 15 : lo ? 24 : 22) * K, 3.8 * K, 1.8 * K, hair, .08); ellS(X, Y, 3 * K, 2.2 * K, gold, 0); }); }
        else if (X0 === "buns") { for (const sd of [-1, 1]) add(dp(sd * 9, 0) + .93, () => { const X = sx(sd * 10, -1), Y = sy(hdY - 20); ellS(X, Y, 5.6 * K, 5.2 * K, hair, .1); ellS(X, Y + 4 * K, 4.2 * K, 1.4 * K, gold, 0); }); }
        else if (X0 === "bun") { add(dp(0, 0) + .93, () => { const X = sx(0, -2), Y = sy(hdY - 22); ellS(X, Y, 7 * K, 6.4 * K, hair, .1); ellS(X, Y + 5 * K, 5 * K, 1.4 * K, gold, 0); }); }
        else if (X0 === "lowbun") { behind(() => { const X = sx(0, -14), Y = sy(hdY + 9); ellS(X, Y, 6.4 * K, 6 * K, hair, .06); ellS(X, Y - 5 * K, 4 * K, 1.3 * K, gold, 0); }, -14, .03); }
        else if (X0 === "halfup") { add(dp(0, 0) + .93, () => { const X = sx(0, -3), Y = sy(hdY - 21); ellS(X, Y, 4.6 * K, 4.2 * K, hair, .1); ellS(X, Y + 3 * K, 3.4 * K, 1.1 * K, gold, 0); }); }
        else if (X0 === "mohawk") { add(dp(0, 0) + .94, () => { const X = sx(0, 0); capS(X, sy(hdY - 11), X, sy(hdY - 32), (2.6 + 5 * Math.abs(sth)) * K, 1.6 * K, hair, .1); }); }
        else if (X0 === "spikes") { add(dp(0, 0) + .94, () => { for (let i = -3; i <= 3; i++) capS(sx(i * 4.4, 0), sy(hdY - 13), sx(i * 5.6, 0), sy(hdY - 25 - (i % 2 ? 0 : 5)), 3.2 * K, .5 * K, hair, .1); }); }
        else if (X0 === "bob") { for (const sd of [-1, 1]) sideP(sd, (q) => { const X = sx(q * 15, 2), Y = sy(hdY - 4); capS(X, Y, X + q * 1.5, Y + 15 * K, 4.2 * K, 3.4 * K, hair, .06); }); }
        else if (X0 === "dbraid") { for (const sd of [-1, 1]) sideP(sd, (q) => { for (let i = 0; i < 6; i++) ellS(sx(q * 14.5 + (i % 2 ? 1 : -1), 7), sy(hdY + 8 + i * 5.2), 3 * K, 3.2 * K, hair, i % 2 ? .1 : -.05); ellS(sx(q * 14.5, 7), sy(hdY + 8 + 6 * 5.2), 2.2 * K, 1.8 * K, gold, 0); }, .4); }
        else if (X0 === "braidc") { behind(() => { const X = sx(0, -13), Y = sy(hdY - 4); for (let i = 0; i < 8; i++) ellS(X + (i % 2 ? 1.3 : -1.3) + sw3 * .02 * i, Y + 4 * K + i * 4.6 * K, 3.4 * K, 3 * K, hair, i % 2 ? .1 : -.05); ellS(X, Y + 4 * K + 8 * 4.6 * K, 2.4 * K, 1.8 * K, gold, 0); }); }
        else if (X0 === "crown") { for (let i = 0; i < 12; i++) { const g = i / 12 * 6.283; add(dp(Math.cos(g) * 12, Math.sin(g) * 10) + .9, () => ellS(sx(Math.cos(g) * 13, Math.sin(g) * 10), sy(hdY - 12 - Math.sin(g) * 1), 3.2 * K, 3 * K, hair, i % 2 ? .1 : -.05)); } }
        else if (X0 === "dread") { behind(() => { for (let i = -4; i <= 4; i++) capS(sx(i * 3.4, -8), sy(hdY - 6), sx(i * 3.8, -9) + sw3 * .3, sy(hdY + 26 + (i % 2) * 7), 2.4 * K, 1.4 * K, hair, .06 * (i % 2 ? 1 : -1)); }, -9, .03); }
        else if (X0 === "hime") { for (const sd of [-1, 1]) sideP(sd, (q) => { const X = sx(q * 14.5, 6), Y = sy(hdY - 6); capS(X, Y, X + q * .8, Y + 26 * K, 3.8 * K, 2.4 * K, hair, .06); }); }
      } else if (hsty === "ponytail" && !hv) {
        add(dp(0, -13) + .02, () => { const X = sx(0, -13), Y = sy(hdY - 6); capS(X, Y, X + sw3 * .6 + sth * -4, Y + 14 * K, 4.8 * K, 3.8 * K, hair, .04); capS(X + sw3 * .6 - sth * 4, Y + 13 * K, X + sw3 - sth * 6, Y + 30 * K, 3.8 * K, 1.4 * K, hair, .1); ellS(X, Y + 1, 3.4 * K, 2.2 * K, gold, 0); });
      } else if (hsty === "braid" && (!hv || hv.X === "braid")) {
        add(dp(-12, 8) + .4, () => { const side = -1; for (let i = 0; i < 7; i++) { const X = sx(side * 13.5 + (i % 2 ? 1.2 : -1.2), 7), Y = sy(hdY + 10 + i * 5.6); ellS(X, Y, 3.2 * K, 3.4 * K, hair, i % 2 ? .1 : -.05); } ellS(sx(-13.5, 7), sy(hdY + 10 + 7 * 5.6), 2.4 * K, 2 * K, gold, 0); });
        add(dp(0, -13) + .02, () => { const X = sx(0, -13), Y = sy(hdY - 4); capS(X, Y, X + sw3 * .5, Y + 26 * K, 4.4 * K, 2 * K, hair, .04); });
      } else if (hsty === "topknot" && (!hv || hv.X === "topknot")) {
        add(dp(0, 0) + .93, () => { const X = sx(0, -2), Y = sy(hdY - 21); ellS(X, Y, 6.4 * K, 5.8 * K, hair, .1); lineS(X - 5 * K, Y + 5 * K, X + 5 * K, Y + 5 * K, gold[3]); lineS(X - 4 * K, Y + 6 * K, X + 4 * K, Y + 6 * K, gold[2]); });
      } else if (hsty === "fringe" && !hv) {
        add(dp(0, 14) + .78, () => { if (cth < -.1) return; const f = sth >= 0 ? 1 : -1; polyS([[sx(-14, 10), sy(hdY - 11)], [sx(14, 10), sy(hdY - 11)], [sx(15, 10) + f * 1, sy(hdY + 3)], [sx(9 * f, 14), sy(hdY + 9 * K / K)], [sx(3 * f, 14), sy(hdY + 2)], [sx(-6 * f, 12), sy(hdY - 3)]], (x, y) => rampAt(hair, .66 - (y - sy(hdY - 11)) * .02 + (BAY[y & 3][x & 3] * .1) + (hashn(x, y >> 1, 6) - .5) * .12)); });
      }
      // mechas da franja caindo sobre a testa
      if (!hv || hv.F !== 0) [-12, -6, 0, 6, 12].forEach((x0, i) => { const z0 = 12.4 - Math.abs(x0) * .3, y0 = hdY - 10; let len = hsty === "crop" ? 5 : hsty === "fringe" ? 4 : longH ? 12 : 8 + hashn(i, 7) * 3, sl = (x0 < 0 ? -1.4 : 1.4) * (i == 2 ? 0 : 1) + (i == 2 ? 1.2 : 0);
        if (hv) { const F = hv.F; if (F === 1) { sl = 0; len = 9; } else if (F === 2 || F === 3) { const dr = F === 2 ? -1 : 1; sl = dr * 4.5; len = 5 + (dr < 0 ? 4 - i : i) * 1.7; } else if (F === 5) { sl = 0; len = 4 + (i % 2) * 3.5; } else if (F === 6) { len = i === 0 || i === 4 ? 20 : i === 1 || i === 3 ? 13 : 3; sl = (x0 < 0 ? -1 : 1) * 1.2; } else if (F === 7) { sl = 0; len = 4; } else if (F === 8) { sl = 0; len = 9; } }
        const pts = [[x0 - 4.6, y0, z0], [x0 + 4.6, y0, z0], [x0 + sl, y0 + len, z0 + 1]];
        add(dp(x0, z0) + .75, () => { if (cth < -0.1) return; polyS(pts.map((p) => [sx(p[0], p[2]), sy(p[1])]), (x, y) => rampAt(hair, .78 - (y - sy(y0)) * .03 + (hashn(x, y, 5) - .5) * .06)); lineS(sx(x0, z0), sy(y0 + 1), sx(pts[2][0], pts[2][2]), sy(y0 + len - 2), hair[1]); lineS(sx(x0 - 1.4, z0), sy(y0 + 2), sx(pts[2][0] - .6, pts[2][2]), sy(y0 + len - 4), hair[4]); }); });
      add(dp(0, 14) + .8, () => { if (cth < -.1) return; for (const [x0, y0, x1, y1] of [[-9, 4, -6, 9], [0, 3, 2, 8], [8, 4, 10, 9]]) lineS(sx(x0, 12), sy(hdY - y0 - 4), sx(x1, 12), sy(hdY - y1 - 4), hair[4]); });
    }
    // ---------- props e visual próprio dos NPCs ----------
    if (NP) {
      const id = e.cls, wd = P(0x8a5a30), steelP = P(0xb4bed2), parch = P(0xe8dcc0), dk = P(0x3a2416), hy0 = 69 - bob * .3;
      const hand = (sd) => [sx(sd * 19.3, 0), sy(hy0)];
      const apron = (rm, y0, y1, w) => add(dp(0, 10) + .66, () => { if (cth < -.2) return; polyS([[sx(-w, 8), sy(y0)], [sx(w, 8), sy(y0)], [sx(w + 2, 8), sy(y1)], [sx(-w - 2, 8), sy(y1)]], (x, y) => rampAt(rm, .55 - (y - sy(y0)) * .004 + BAY[y & 3][x & 3] * .12)); lineS(sx(-w + 1, 8), sy(y0), sx(-13, 2), sy(44), rm[1]); lineS(sx(w - 1, 8), sy(y0), sx(13, 2), sy(44), rm[1]); });
      if (id === "papainoel") {
        add(dp(19.3, 6) + .5, () => { const [X, Y] = hand(1), sk = P(0x9a6a3a), rd = P(0xc4202a); ellS(X + 3 * K, Y + 9 * K, 10 * K, 13 * K, sk, .06); lineS(X - 5 * K, Y + 6 * K, X + 11 * K, Y + 12 * K, sk[1]); lineS(X - 3 * K, Y + 12 * K, X + 9 * K, Y + 17 * K, sk[1]); ellS(X + 3 * K, Y - 2 * K, 5 * K, 3 * K, rd, .05); ellS(X - 1 * K, Y - 7 * K, 3.6 * K, 3.4 * K, P(0xb07a48), .05); ellS(X - 3 * K, Y - 10 * K, 1.5 * K, 1.5 * K, P(0xb07a48)); ellS(X + 1 * K, Y - 10 * K, 1.5 * K, 1.5 * K, P(0xb07a48)); ellS(X + 6 * K, Y - 6 * K, 3 * K, 3 * K, P(0xe03030), .05); polyS([[X + 2 * K, Y - 9 * K], [X + 8 * K, Y - 9 * K], [X + 8 * K, Y - 4 * K], [X + 2 * K, Y - 4 * K]], () => P(0x3a7ad8)[3]); lineS(X + 5 * K, Y - 9 * K, X + 5 * K, Y - 4 * K, [255, 240, 120]); });
      } else if (id === "brokk" || id === "torvald") {
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
      } else if (id === "lider") {
        add(dp(0, -16) + .1, () => { const X = sx(0, -16), Y = sy(40); const cols = [0xc0392b, 0x8a6a30, 0x3a8a3a, 0x6a3aaa, 0xe8e0f0, 0x3a3a46, 0xd0701a]; for (let i = 0; i < 7; i++) { const cx = X + (i - 3) * 5.4 * K * Math.max(.4, Math.abs(cth)); polyS([[cx - 2.7 * K, Y], [cx + 2.7 * K, Y], [cx + 2.7 * K, Y + 26 * K], [cx, Y + 31 * K], [cx - 2.7 * K, Y + 26 * K]], (x, y) => rampAt(P(cols[i]), .55 - (y - Y) * .004 + BAY[y & 3][x & 3] * .1)); } lineS(X - 20 * K, Y, X + 20 * K, Y, gold[3]); });
        add(dp(19.3, 3) + .5, () => { const [X, Y] = hand(1); capS(X, Y + 22 * K, X + 1.2 * K, Y - 60 * K, 1.6 * K, 1.5 * K, gold); ellS(X + 1.2 * K, Y - 64 * K, 5 * K, 5 * K, P(0xb890ff), .2); ellS(X + 1.2 * K, Y - 64 * K, 2.6 * K, 2.6 * K, P(0xffffff), .3); });
      } else if (id === "estilista") {
        add(dp(8, 4) + .98, () => { const X = sx(11, 2), Y = sy(hdY - 15), pk = P(0xf070a8); ellS(X - 5 * K, Y, 5.6 * K, 4 * K, pk, .04); ellS(X + 5 * K, Y, 5.6 * K, 4 * K, pk, .04); ellS(X, Y, 2.4 * K, 2.4 * K, P(0xc84a84), 0); });
        add(dp(19.3, 3) + .5, () => { const [X, Y] = hand(1), sv = P(0xd4dae8); lineS(X, Y - 3 * K, X - 5 * K, Y - 17 * K, sv[4]); lineS(X + 1, Y - 3 * K, X + 6 * K, Y - 17 * K, sv[3]); ellS(X - 2 * K, Y - 2 * K, 2.2 * K, 2.2 * K, gold); ellS(X + 3 * K, Y - 2 * K, 2.2 * K, 2.2 * K, gold); });
      }
    }
    // acessórios de cabeça
    const hd = e.head;
    if (hd === "horns") for (const side of [-1, 1]) add(dp(side * 14, 0) + .9, () => { const X = sx(side * 14, 0), Y = sy(hdY - 6); capS(X, Y, X + side * 7 * K, Y - 8 * K, 3.1 * K, 1.0, P(0xf0e6c8)); });
    if (hd === "helm") add(dp(0, 8) + .9, () => { const X = sx(0, 2), Y = sy(hdY - 6); ellS(X, Y, bodyW(18.6, 16.4), 12.4 * K, metal, .05); lineS(X - bodyW(18, 15), sy(hdY - 1), X + bodyW(18, 15), sy(hdY - 1), metal[1]); if (front) capS(sx(0, 16), sy(hdY - 6), sx(0, 16), sy(hdY + 7), 1.5, 1.5, metal); });
    if (hd === "hood") add(dp(0, -2) + .975, () => { const X = sx(0, 0), Y = sy(hdY - 3); ellS(X, Y, bodyW(19.4, 17), 15 * K, tunic, .0); if (front) ellS(sx(0, 14), sy(hdY + 3), bodyW(10.5, 5), 8 * K, skin); });
    if (hd === "hood2") add(dp(0, -2) + .9, () => { const X = sx(0, 0), Y = sy(hdY - 3); ellS(X, Y, bodyW(20.2, 18), 17 * K, P(0x4f6e3c), .0); if (front) ellS(sx(0, 14), sy(hdY + 3), bodyW(10.5, 5), 8 * K, skin); });
    if (hd === "circlet") add(dp(0, 14) + .95, () => { lineS(sx(-15, 8), sy(hdY - 5), sx(15, 8), sy(hdY - 5), gold[3]); lineS(sx(-15, 8), sy(hdY - 4), sx(15, 8), sy(hdY - 4), gold[2]); if (front) ellS(sx(0, 15), sy(hdY - 5), 2, 2.2, P(0xbff0ff)); });
    if (hd === "wings") for (const side of [-1, 1]) add(dp(side * 16, 0) + .9, () => { const X = sx(side * 16, 0), Y = sy(hdY - 3); for (let i = 0; i < 4; i++) capS(X, Y - i * 1.2, X + side * (6 + i * 3) * K * (.5 + .5 * Math.abs(cth)), Y - (10 - i * 1.5) * K, 2.1, 0.8, i % 2 ? P(0xf8f4ff) : P(0xe0e8ff)); });
    if (hd === "poringX") add(dp(0, 0) + .97, () => { const bn = walking ? Math.abs(Math.sin(ph)) * 4 : 0, sq = walking ? 1 - bn * .02 : 1, X = sx(0, 0), Y = sy(hdY - 23) - bn * K, rx = bodyW(11.5, 10) * (2 - sq), ry = 9.2 * K * sq, jel = P(0xff9cb8), jl2 = P(0xffd0dc); ellS(X, Y, rx, ry, jel, .02); ellS(X - rx * .35, Y - ry * .35, rx * .3, ry * .24, jl2, 0); if (front) { const dk = P(0x2a2028); ellS(X - rx * .38, Y + ry * .1, 1.6, 2.2, dk); ellS(X + rx * .38, Y + ry * .1, 1.6, 2.2, dk); lineS(X - 2, Y + ry * .55, X + 2, Y + ry * .55, dk[1]); } });
    // ---------- visuais de cabeça (topo / meio / baixo) ----------
    if (hd === "beanie") add(dp(0, 8) + .9, () => { const X = sx(0, 2), Y = sy(hdY - 9), red = P(0xc23a3a); ellS(X, Y, bodyW(17, 15), 10.5 * K, red, .05); lineS(X - bodyW(16.4, 14), sy(hdY - 3), X + bodyW(16.4, 14), sy(hdY - 3), P(0xe8dcc4)[2]); lineS(X - bodyW(16.4, 14), sy(hdY - 2), X + bodyW(16.4, 14), sy(hdY - 2), P(0xe8dcc4)[3]); ellS(X, sy(hdY - 21 * K * .86), 3.2 * K, 3.2 * K, P(0xf4efe4), .05); });
    if (hd === "santa") {
      add(dp(0, -8) + .5, () => { const red = P(0xc4202a), wh = P(0xf6f2ea); capS(sx(0, -6), sy(hdY - 14), sx(0, -22), sy(hdY + 4), 8 * K, 4.2 * K, red); capS(sx(0, -22), sy(hdY + 4), sx(0, -27), sy(hdY + 18), 4.4 * K, 3 * K, red); ellS(sx(0, -27), sy(hdY + 20), 4.6 * K, 4.6 * K, wh, .05); });
      add(dp(0, 12) + .99, () => { const X = sx(0, -2), Y = sy(hdY - 13), red = P(0xc4202a), wh = P(0xf6f2ea); ellS(X, Y, bodyW(17, 15), 9.5 * K, red, .05); ellS(X, sy(hdY - 7), bodyW(18.4, 16.4), 3.6 * K, wh, .05); });
    }
    if (hd === "wreath") for (let i = 0; i < 16; i++) { const g = i / 16 * 6.2832, x = Math.cos(g) * 14.8, z = Math.sin(g) * 12; add(dp(x, z) + .975, () => { const berry = i % 4 === 1; ellS(sx(x, z), sy(hdY - 8 - z * .06), (berry ? 2.3 : 3.6) * K, (berry ? 2.3 : 2.6) * K, berry ? P(0xd23a3a) : P(i % 2 ? 0x3f8a3a : 0x5aa84a), .05); }); }
    if (hd === "bandana") add(dp(0, 14) + .97, () => { const red = P(0xb81e1e); polyS([[sx(-16.5, 0) - 1, sy(hdY - 7)], [sx(16.5, 0) + 1, sy(hdY - 7)], [sx(16.5, 0) + 1, sy(hdY - 2)], [sx(-16.5, 0) - 1, sy(hdY - 2)]], (x, y) => rampAt(red, .6 - (y - sy(hdY - 7)) * .1)); if (!front || Math.abs(sth) > .3) { const kx = sx(-sth * 16.5 - (front ? 0 : 0), -6); capS(kx, sy(hdY - 5), kx - 5 * K, sy(hdY + 6), 2.4 * K, 1.4 * K, red); capS(kx, sy(hdY - 5), kx + 2 * K, sy(hdY + 8), 2.2 * K, 1.2 * K, red); } });
    if (hd === "feathercap") add(dp(0, 8) + .9, () => { const X = sx(0, 2), g = P(0x3f7a3a); ellS(X, sy(hdY - 9), bodyW(17.6, 15.6), 9 * K, g, .05); ellS(X, sy(hdY - 3), bodyW(22, 19), 3.2 * K, P(0x2f5a2c), .02); capS(sx(9, 2), sy(hdY - 13), sx(19, -4), sy(hdY - 28), 1.9 * K, .5 * K, P(0xf0e8d6)); lineS(sx(9, 2), sy(hdY - 13), sx(18, -3), sy(hdY - 26), P(0xc03a3a)[2]); });
    if (hd === "crown" || hd === "crowngold") add(dp(0, 14) + .93, () => { const m = hd === "crown" ? P(0xb87333) : P(0xf0c040), X = sx(0, 2); lineS(X - bodyW(15.5, 13), sy(hdY - 8), X + bodyW(15.5, 13), sy(hdY - 8), m[3]); lineS(X - bodyW(15.5, 13), sy(hdY - 7), X + bodyW(15.5, 13), sy(hdY - 7), m[2]); lineS(X - bodyW(15.5, 13), sy(hdY - 6), X + bodyW(15.5, 13), sy(hdY - 6), m[1]); for (let k = -2; k <= 2; k++) { const px = sx(k * 6.2, 9 * Math.cos(k * .5)); capS(px, sy(hdY - 8), px, sy(hdY - 8 - (k % 2 ? 6 : 10) * K), 2 * K, .8 * K, m); if (!(k % 2)) put(px, sy(hdY - 8 - 10 * K) - 1, [255, 245, 200]); } if (front) ellS(sx(0, 14), sy(hdY - 7), 1.8, 2, P(0xe03a3a)); });
    if (e.mid === "goggles") add(dp(0, 14) + .985, () => { if (!front && Math.abs(cth) < .3) return; for (const side of [-1, 1]) { const X = sx(side * 6.6, 13); ellS(X, sy(hdY + 4.5), 5 * K * (.5 + .5 * Math.abs(cth)) + 1, 4.6 * K, P(0xb88a3a), .05); ellS(X, sy(hdY + 4.5), 3.6 * K * (.5 + .5 * Math.abs(cth)), 3.2 * K, P(0x9ad8e8), .1); put(X - 1, sy(hdY + 3), [255, 255, 255]); } lineS(sx(-14, 6), sy(hdY + 3), sx(-11, 12), sy(hdY + 4), P(0x4a3020)[2]); lineS(sx(14, 6), sy(hdY + 3), sx(11, 12), sy(hdY + 4), P(0x4a3020)[2]); });
    if (e.mid === "eyepatch") add(dp(0, 14) + .985, () => { if (!front && Math.abs(cth) < .3) return; const X = sx(-6.4 * (sth >= 0 ? 1 : 1), 13); ellS(X, sy(hdY + 4.6), 4.2 * K * (.5 + .5 * Math.abs(cth)) + 1, 3.8 * K, P(0x1a1a22), .05); lineS(sx(-14.5, 4), sy(hdY - 3), sx(-9, 12), sy(hdY + 3), [26, 26, 34]); lineS(sx(14.5, 4), sy(hdY + 6), sx(-9, 12), sy(hdY + 3), [26, 26, 34]); });
    if (e.low === "scarf" || e.low === "scarf2") add(dp(0, 14) + .99, () => { const c = e.low === "scarf" ? P(0xb04a2a) : P(0x5a7aa8); ellS(sx(0, 3), sy(hdY + 21), bodyW(11.5, 9), 4.4 * K, c, .06); lineS(sx(-10 * cth, 3), sy(hdY + 21), sx(10 * cth, 3), sy(hdY + 21), c[3]); if (front || Math.abs(sth) > .3) capS(sx(6, 10), sy(hdY + 22), sx(8, 10), sy(hdY + 40), 3 * K, 2.2 * K, c); });
    if (e.low === "mask") add(dp(0, 14) + .99, () => { if (!front && Math.abs(cth) < .35) return; ellS(sx(0, 12), sy(hdY + 11), bodyW(10.4, 8.4), 5.6 * K, P(0x6a4a2e), .08); lineS(sx(-9 * cth, 12), sy(hdY + 8), sx(9 * cth, 12), sy(hdY + 8), P(0x6a4a2e)[3]); put(sx(-4 * cth, 14), sy(hdY + 12), [30, 20, 14]); put(sx(4 * cth, 14), sy(hdY + 12), [30, 20, 14]); });
    if (e.low === "beard") add(dp(0, 14) + .99, () => { if (!front && Math.abs(cth) < .3) return; const b = hair; const BM = e.belly ? 1.55 : 1; ellS(sx(0, 10), sy(hdY + 14), bodyW(10.2, 8.4) * BM, 6.4 * K * (e.belly ? 1.3 : 1), b, .06); capS(sx(0, 12), sy(hdY + 16), sx(0, 12), sy(hdY + 33 + (e.belly ? 9 : 0)), 4.4 * K * BM, 1.6 * K, b); lineS(sx(-1, 13), sy(hdY + 17), sx(-1, 13), sy(hdY + 31), b[1]); lineS(sx(1, 13), sy(hdY + 17), sx(1, 13), sy(hdY + 31), b[3]); put(sx(0, 13), sy(hdY + 34), [200, 150, 60]); });
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
