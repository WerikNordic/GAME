// ===== ROX2: visual pixel-art novo (partes 3D -> pixel, z-buffer, 4 tons, contorno) =====
var ROX2 = (() => {
  const TAU = Math.PI * 2, clamp = (v, a, b) => Math.max(a, Math.min(b, v));
  const hx = (c) => [(c >> 16) & 255, (c >> 8) & 255, c & 255];
  const mix = (a, b, t) => a.map((v, i) => v + (b[i] - v) * t);
  const dk = (c, f) => c.map((v) => v * f);
  const lt = (c, t) => mix(c, [255, 255, 255], t);
  const tones = (c) => [mix(dk(c, .5), [30, 20, 70], .25), mix(dk(c, .76), [60, 40, 110], .14), c, mix(c, [255, 246, 220], .3)];
  const LV = (() => { const l = [-.55, -.75, .6], m = Math.hypot(...l); return l.map((v) => v / m); })();
  let SOFT = false, METAL = false;
  function Ctx(a) { const c = Math.cos(a), s = Math.sin(a); return { c, s, P: (x, z) => x * c + z * s, D: (x, z) => z * c - x * s }; }
  class Img { constructor(w, h) { this.w = w; this.h = h; this.d = new Uint8ClampedArray(w * h * 4); this.z = new Float32Array(w * h).fill(-1e9); } }
  function put(I, x, y, z, col, a = 255) { if (x < 0 || y < 0 || x >= I.w || y >= I.h) return; const i = y * I.w + x; if (z < I.z[i]) return; I.z[i] = z; const j = i * 4; I.d[j] = col[0]; I.d[j + 1] = col[1]; I.d[j + 2] = col[2]; I.d[j + 3] = a; }
  function tone(nx, ny, nz, base, bias = 0) {
    const v = nx * LV[0] + ny * LV[1] + nz * LV[2] + bias;
    const T = SOFT ? [mix(dk(base, .74), [190, 90, 110], .22), mix(dk(base, .88), [230, 130, 130], .12), base, mix(base, [255, 250, 235], .22)] : tones(base);
    if (METAL) { const T2 = [mix(dk(base, .38), [20, 20, 70], .3), mix(dk(base, .62), [50, 50, 110], .18), base, mix(base, [255, 255, 255], .38), [255, 255, 255]]; return v > .92 ? T2[4] : v > .62 ? T2[3] : v > .18 ? T2[2] : v > -.3 ? T2[1] : T2[0]; }
    return v > .7 ? T[3] : v > .3 ? T[2] : v > -.12 ? T[1] : T[0];
  }
  function ellipsoid(I, K, o) {
    const { c, s, P, D } = K; const cx = P(o.x, o.z) + I.w / 2, cy = o.y, zc = D(o.x, o.z);
    const rxp = Math.max(.8, Math.hypot(o.rx * c, o.rz * s)), rzp = Math.hypot(o.rx * s, o.rz * c) || 1, p = o.p || 2;
    for (let y = Math.floor(cy - o.ry); y <= Math.ceil(cy + o.ry); y++) for (let x = Math.floor(cx - rxp); x <= Math.ceil(cx + rxp); x++) {
      const dx = (x + .5 - cx) / rxp, dy = (y + .5 - cy) / o.ry; const r = Math.pow(Math.pow(Math.abs(dx), p) + Math.pow(Math.abs(dy), p), 1 / p); if (r > 1) continue;
      const q = Math.min(1, Math.hypot(dx, dy)); const nz = Math.sqrt(Math.max(0, 1 - q * q));
      const X = dx, Y = dy, Z = nz; const mx = X * c - Z * s, mz = X * s + Z * c, my = Y;
      let col = o.col; if (o.tex) { const t = o.tex(mx, my, mz, X, Y, Z); if (t === null) continue; if (t) col = t; }
      METAL = !!o.metal; SOFT = !!o.soft; put(I, x, y, zc + Z * rzp, tone(X, Y, Z, col, o.bias || 0)); METAL = false; SOFT = false;
    }
  }
  function strip(I, K, o) {
    const { P, D } = K; const pr = o.pts.map((q) => [P(q[0], q[2]) + I.w / 2, q[1], D(q[0], q[2])]); const n = pr.length - 1;
    for (let i = 0; i < n; i++) {
      const a = pr[i], b = pr[i + 1]; const w0 = Array.isArray(o.w) ? o.w[0] + (o.w[1] - o.w[0]) * i / n : o.w, w1 = Array.isArray(o.w) ? o.w[0] + (o.w[1] - o.w[0]) * (i + 1) / n : o.w; const rm = Math.max(w0, w1) / 2 + 1;
      const minx = Math.floor(Math.min(a[0], b[0]) - rm), maxx = Math.ceil(Math.max(a[0], b[0]) + rm), miny = Math.floor(Math.min(a[1], b[1]) - rm), maxy = Math.ceil(Math.max(a[1], b[1]) + rm);
      const vx = b[0] - a[0], vy = b[1] - a[1], L2 = vx * vx + vy * vy || 1e-6;
      for (let y = miny; y <= maxy; y++) for (let x = minx; x <= maxx; x++) {
        const px = x + .5 - a[0], py = y + .5 - a[1]; const tt = clamp((px * vx + py * vy) / L2, 0, 1); const ex = px - vx * tt, ey = py - vy * tt; const w = (w0 + (w1 - w0) * tt) / 2; const d2 = (ex * ex + ey * ey) / (w * w); if (d2 > 1) continue;
        const X = ex / w, Y = ey / w, Z = Math.sqrt(Math.max(0, 1 - d2)); const tg = (i + tt) / n; let col = typeof o.col === "function" ? o.col(tg, X) : o.col; if (!col) continue;
        METAL = !!o.metal; put(I, x, y, a[2] + (b[2] - a[2]) * tt + Z * w, tone(X, Y, Z, col, o.bias || 0)); METAL = false;
      }
    }
  }
  function outline(I, minA = 200) {
    const H = I.h, W = I.w, B = I.d, o = new Uint8ClampedArray(B);
    for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) {
      const i = (y * W + x) * 4; if (B[i + 3] >= minA) continue; let best = -1, bl = 999;
      for (const [dx, dy] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) { const xx = x + dx, yy = y + dy; if (xx < 0 || yy < 0 || xx >= W || yy >= H) continue; const j = (yy * W + xx) * 4; if (B[j + 3] >= minA) { const l = B[j] + B[j + 1] + B[j + 2]; if (l < bl) { bl = l; best = j; } } }
      if (best >= 0) { o[i] = B[best] * .26 + 8; o[i + 1] = B[best + 1] * .22 + 4; o[i + 2] = B[best + 2] * .28 + 14; o[i + 3] = 255; }
    }
    B.set(o);
  }
  const SM = (x) => x * x * (3 - 2 * x);
  function kf(u, k) { if (u <= k[0][0]) return k[0][1]; for (let i = 1; i < k.length; i++) if (u <= k[i][0]) { const a = k[i - 1], b = k[i]; return a[1] + (b[1] - a[1]) * SM((u - a[0]) / (b[0] - a[0] || 1)); } return k[k.length - 1][1]; }
  function kf3(u, k) { return { x: kf(u, k.map((r) => [r[0], r[1]])), y: kf(u, k.map((r) => [r[0], r[2]])), z: kf(u, k.map((r) => [r[0], r[3]])) }; }
  // dedupe: permite hoisting
  const add = (a, b, k = 1) => [a[0] + b[0] * k, a[1] + b[1] * k, a[2] + b[2] * k];
  const nrm = (v) => { const l = Math.hypot(v[0], v[1], v[2]) || 1; return [v[0] / l, v[1] / l, v[2] / l]; };
  const wd = (H, P) => P.wd ? nrm(P.wd) : P.mood === 1 ? nrm([(H.h[0] - H.m[0]) * .5, (H.h[1] - H.m[1]) * .5 - 3, (H.h[2] - H.m[2]) * .9 + 2]) : P.mood === 2 ? [0, -1, .1] : nrm([.18, -1, .3]);
  const lerp = (a, b, k) => a.map((v, i) => v + (b[i] - v) * k);
  //__POSE__
