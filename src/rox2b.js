  // ---------- pose ----------
  // fam: 'p' (pesado), 'a' (ágil), 'm' (místico). kind de ataque: slash, quick, cast, stab, shoot, punch
  function pose(anim, t, fam, kind) {
    const o = { bob: 0, lz: 0, leg: [{ z: 0, l: 0 }, { z: 0, l: 0 }], arm: [{ x: 9.6, y: 15, z: 1.5 }, { x: 9.6, y: 15, z: 1.5 }], mood: 0, armed: false, sx: 0, lean: 0, hx: 0, hz: 0, hy: 0, marks: [] };
    const S = Math.sin, C = Math.cos, PA = fam === "p", AS = fam === "a", MG = fam === "m"; const pick = (a, b, c) => PA ? a : AS ? b : c;
    const br = S(t * 2.618);
    if (anim === 0) {
      o.bob = .35 + .35 * br;
      if (PA) { o.lean = -.5; o.arm[0] = { x: 10.2, y: 14 + br * .3, z: 2.6 }; o.arm[1] = { x: 8.6, y: 14.6, z: 1.2 }; o.hx = S(t * 2.618) * .9; o.hz = -.2; o.leg[0].x = 1.1; o.leg[1].x = 1.1; }
      else if (AS) { o.lean = 1.5 + br * .2; o.sx = S(t * 2.618) * 1.1; o.leg[0].z = -1.6; o.leg[1].z = 1.8; o.leg[0].x = .6; o.leg[1].x = 1.2; o.arm[0] = { x: 6, y: 14, z: 6.2 }; o.arm[1] = { x: 6.2, y: 14.2, z: 6 }; o.hx = S(t * 2.618) * 1.3; o.hy = .5 + S(t * .8) * .3; o.hz = .8; }
      else { o.lean = .4; o.sx = S(t * 2.618) * .5; o.arm[1] = { x: 3.4, y: 3.6 + S(t * 2.618) * .9, z: 6.6 }; o.arm[0] = { x: 7.2, y: 13.4, z: -2.6 }; o.hx = S(t * 2.618) * 1.1; o.hy = .3; o.leg[0].x = .5; o.leg[1].x = .5; o.bob += .3; }
    } else if (anim === 1 || anim === 8) {
      const run = anim === 8; const per = run ? pick(.62, .46, .72) : pick(1.0, .78, 1.4), ph = t / per * TAU;
      const A = run ? pick(8, 8, 6) : pick(5.2, 4.6, 3.4), L = run ? pick(5, 6, 4) : pick(3, 4, 2), Bm = run ? pick(2.4, 2, 1.5) : pick(1.5, 1.1, .8);
      o.bob = Math.abs(S(ph)) * Bm; o.sx = S(ph) * (run ? pick(.5, .6, 1.2) : pick(.4, 1, .9)); o.lean = run ? pick(1.2, 3.8, 2.2) : pick(-.3, 1.8, .6); o.hx = -S(ph) * .5; o.hy = C(ph * 2) * .25;
      for (let i = 0; i < 2; i++) { const p = ph + (i ? Math.PI : 0); o.leg[i].z = S(p) * A; o.leg[i].l = Math.max(0, C(p)) * L; o.leg[i].x = AS ? .4 : .8; }
      for (let i = 0; i < 2; i++) {
        const p = ph + (i ? Math.PI : 0);
        if (PA) { const sw = run ? 7 : 5 * (i ? 1 : .4); o.arm[i] = { x: 9.6, y: run ? 11 : 15, z: -S(p) * sw + (i ? 0 : 1.5) }; }
        else if (AS) { const sw = run ? 3.2 : 3; o.arm[i] = { x: run ? 8 : 7.4, y: run ? 10.5 : 13, z: -S(p) * sw + (run ? -4 : 2) }; }
        else { if (run) o.arm[i] = { x: 10.5, y: 9, z: -S(p) * 8 }; else o.arm[i] = { x: 6, y: 14.2, z: -4.2 + S(p) * .7 }; }
      }
    } else if (anim === 2) {
      o.armed = true; o.mood = 1;
      const per = { slash: 1.5, quick: 1.1, cast: 1.6, stab: 1.3, shoot: 1.4, punch: 1.0 }[kind] || 1.5, u = (t % per) / per;
      if (kind === "slash") {
        o.arm[1] = kf3(u, [[0, 8, 12, 4], [.12, 7.5, 2, 0], [.22, 6, -16, -5], [.3, 6, -17, -5.5], [.33, 6, -14, -3], [.41, 7.5, 16, 12], [.46, 7.5, 17, 12.5], [.6, 7.8, 14, 8], [.8, 8, 12, 5], [1, 8, 12, 4]]);
        o.wd = ((th) => [0, -Math.cos(th), Math.sin(th)])(kf(u, [[0, 140], [.12, 60], [.22, 0], [.3, -28], [.33, -30], [.37, 30], [.41, 100], [.44, 142], [.6, 140], [1, 140]]) * Math.PI / 180);
        o.arm[0] = kf3(u, [[0, 9.6, 15, 1.5], [.2, 10, 10, 6], [.4, 10, 9, 7], [.7, 9.8, 13, 3], [1, 9.6, 15, 1.5]]);
        o.lean = kf(u, [[0, 0], [.22, -2.8], [.32, -3], [.41, 4.2], [.48, 3.6], [.7, 1], [1, 0]]); o.gz = kf(u, [[0, 0], [.22, -3], [.32, -3], [.41, 5], [.52, 5], [.8, 1.5], [1, 0]]);
        o.bob = kf(u, [[0, 0], [.22, 1], [.32, 1.2], [.4, -2.2], [.5, -1.6], [.75, -.2], [1, 0]]);
        o.leg[1].z = kf(u, [[0, 0], [.3, -2], [.41, 8], [.6, 8], [1, 0]]); o.leg[0].z = kf(u, [[0, 0], [.3, -4], [.41, -5], [.6, -4], [1, 0]]); o.leg[0].x = o.leg[1].x = 1.4;
      } else if (kind === "quick") {
        o.gz = kf(u, [[0, 0], [.16, -2], [.22, -2], [.3, 15], [.44, 17], [.6, 16], [.85, 4], [1, 0]]);
        o.bob = kf(u, [[0, 0], [.16, -3.6], [.22, -3.6], [.28, -1], [.4, -2.2], [.6, -2.4], [.72, 1.4], [.85, .2], [1, 0]]); o.lean = kf(u, [[0, 1.5], [.16, 4.5], [.3, 3.8], [.5, 2.4], [.85, 1.6], [1, 1.5]]);
        o.arm[1] = kf3(u, [[0, 9, 12, 3], [.16, 11, 5, -8], [.22, 11, 4, -9], [.28, 2.5, 6, 13], [.34, 3, 6, 12], [.4, 11.5, 4, 5], [.46, 10, 5, 10], [.6, 9.5, 9, 8], [.85, 9, 12, 4], [1, 9, 12, 3]]);
        o.arm[0] = kf3(u, [[0, 9, 12, 3], [.16, 11, 7, -7], [.24, 11, 6, -8], [.32, 3, 4, 13], [.38, 3, 5, 12], [.44, 11.5, 6, 6], [.5, 10, 6, 11], [.62, 9.5, 9, 8], [.85, 9, 12, 4], [1, 9, 12, 3]]);
        o.sx = kf(u, [[0, 0], [.28, -1.4], [.4, 1.4], [.5, 0], [1, 0]]); o.leg[0].z = kf(u, [[0, -2], [.16, -5], [.3, -6], [.6, -6], [1, -2]]); o.leg[1].z = kf(u, [[0, 2], [.16, 6], [.3, 8], [.6, 8], [1, 2]]); o.leg[0].x = o.leg[1].x = 2.2; o.hx = 1;
      } else if (kind === "cast") {
        o.arm[1] = kf3(u, [[0, 9.6, 15, 1.5], [.1, 8, 8, 5], [.2, 8, 6, 5.2], [.26, 9, -8, 2], [.32, 5, -12, 9], [.38, 2, -12, 3], [.44, 6, -10, -3], [.5, 8, 3, 12], [.54, 7, 4, 15], [.6, 7, 4, 15], [.8, 8, 10, 7], [1, 9.6, 15, 1.5]]);
        o.arm[0] = kf3(u, [[0, 9.6, 15, 1.5], [.1, 8, 3, 6], [.3, 8, 2, 6], [.5, 8, 8, 11], [.6, 8, 8, 11], [.85, 9, 13, 3], [1, 9.6, 15, 1.5]]);
        o.lean = kf(u, [[0, 0], [.2, -.8], [.3, -1.4], [.5, 2.8], [.6, 2.4], [.85, .4], [1, 0]]); o.bob = kf(u, [[0, 0], [.2, -.6], [.3, 1.8], [.5, .6], [.6, .4], [1, 0]]); o.gz = kf(u, [[0, 0], [.5, 1.5], [.7, 1.5], [1, 0]]);
        o.leg[0].z = -2; o.leg[1].z = kf(u, [[0, 0], [.5, 2.5], [1, 0]]); o.leg[0].x = o.leg[1].x = 1.2;
        o.wd = ((th) => [0, -Math.cos(th), Math.sin(th)])(kf(u, [[0, 165], [.2, 165], [.26, 200], [.34, 300], [.42, 400], [.5, 450], [.6, 450], [.8, 490], [1, 525]]) * Math.PI / 180);
      } else if (kind === "stab") {
        o.arm[1] = kf3(u, [[0, 9, 12, 3], [.2, 8, 9, -6], [.3, 7, 8, 2], [.38, 6, 7, 15], [.46, 6, 7, 16], [.7, 8, 11, 7], [1, 9, 12, 3]]);
        o.arm[0] = kf3(u, [[0, 9, 12, 3], [.2, 6, 9, 2], [.38, 5.4, 8, 10], [.5, 5.6, 8, 11], [.75, 8, 11, 5], [1, 9, 12, 3]]);
        o.wd = ((th) => [0, -Math.cos(th), Math.sin(th)])(kf(u, [[0, 40], [.2, 62], [.38, 86], [.5, 84], [.8, 50], [1, 40]]) * Math.PI / 180);
        o.lean = kf(u, [[0, 0], [.2, -2], [.38, 4], [.5, 3.4], [.8, .8], [1, 0]]); o.gz = kf(u, [[0, 0], [.2, -2.4], [.38, 6], [.55, 5.6], [.85, 1.2], [1, 0]]);
        o.bob = kf(u, [[0, 0], [.2, 1], [.38, -2], [.55, -1.4], [1, 0]]); o.leg[1].z = kf(u, [[0, 0], [.3, -1], [.4, 9], [.6, 9], [1, 0]]); o.leg[0].z = kf(u, [[0, 0], [.3, -4], [.4, -6], [.6, -5], [1, 0]]); o.leg[0].x = o.leg[1].x = 1.6;
      } else if (kind === "shoot") {
        o.arm[0] = kf3(u, [[0, 9, 12, 3], [.22, 6.6, 4, 10], [.5, 6.2, 3, 12], [.62, 6.2, 3.4, 11.4], [.85, 8, 10, 5], [1, 9, 12, 3]]);
        o.arm[1] = kf3(u, [[0, 9, 12, 3], [.22, 6.4, 4, 6], [.46, 4.4, 3.6, -1.4], [.52, 6.8, 5, 4], [.62, 7.8, 8, 6], [.85, 8.4, 11, 5], [1, 9, 12, 3]]);
        o.draw = kf(u, [[0, 0], [.2, 0], [.46, 1], [.5, 1], [.52, 0], [1, 0]]); o.lean = kf(u, [[0, 0], [.22, -.4], [.48, -1.4], [.54, .6], [1, 0]]);
        o.sx = kf(u, [[0, 0], [.3, -.8], [.5, -1.2], [.6, 0], [1, 0]]); o.bob = kf(u, [[0, 0], [.3, -.8], [.5, -1.2], [.6, -.3], [1, 0]]);
        o.leg[0].z = -3; o.leg[1].z = 3.4; o.leg[0].x = o.leg[1].x = 1.8; o.hx = kf(u, [[0, 0], [.3, -1.2], [.5, -1.6], [1, 0]]);
      } else {
        o.arm[1] = kf3(u, [[0, 9, 12, 3], [.16, 8, 13, -3], [.3, 7, 6, 15], [.4, 7, 6, 16], [.62, 8, 11, 6], [1, 9, 12, 3]]);
        o.arm[0] = kf3(u, [[0, 9, 12, 3], [.16, 8, 9, 5], [.3, 7, 8, 3], [.5, 7, 9, 7], [1, 9, 12, 3]]);
        o.lean = kf(u, [[0, 0], [.16, -2], [.3, 4], [.42, 3.4], [.7, 1], [1, 0]]); o.gz = kf(u, [[0, 0], [.16, -1.6], [.3, 5], [.5, 4.4], [.85, 1], [1, 0]]);
        o.bob = kf(u, [[0, 0], [.16, 1], [.3, -1.8], [.5, -1.2], [1, 0]]); o.leg[1].z = kf(u, [[0, 0], [.3, 8], [.6, 8], [1, 0]]); o.leg[0].z = kf(u, [[0, 0], [.3, -5], [.6, -4], [1, 0]]); o.leg[0].x = o.leg[1].x = 1.8; o.sx = kf(u, [[0, 0], [.16, 1], [.3, -1.2], [1, 0]]);
      }
    } else if (anim === 5) {
      o.bob = -8 + (PA ? 0 : MG ? 1.2 + 1.2 * S(t * 2.618) : 0) + br * .25;
      if (PA) { o.lean = -.4; o.leg[0] = { z: 8.5, l: 0, ky: 6.5, kz: .6, x: 1.4, kx: .4 }; o.leg[1] = { z: 8.5, l: 0, ky: 6.5, kz: .6, x: 1.4, kx: .4 }; o.arm[0] = { x: 8.4, y: 9.2, z: 5.6 }; o.arm[1] = { x: 8.4, y: 9.2, z: 5.6 }; o.hx = S(t * 2.618) * 1; o.hz = -.2; }
      else if (AS) { o.lean = -1.6; o.sx = -.6; o.leg[0] = { z: 13, l: 0, x: 1.4 }; o.leg[1] = { z: 5.4, l: 0, ky: 10, kz: -1.2, x: 1.6, kx: .6 }; o.arm[1] = { x: 8.6, y: 9.4, z: 3.6 }; o.arm[0] = { x: 12, y: 20, z: -3.4 }; o.hy = .8 + S(t * 2.618) * .4; o.hx = S(t * 2.618) * 1.6; o.hz = 1; }
      else { o.lean = .2; o.leg[0] = { z: 6, l: 0, ky: 1.2, kz: 2.6, x: -2.6, kx: 5 }; o.leg[1] = { z: 6, l: 0, ky: 1.2, kz: 2.6, x: -2.6, kx: 5 }; o.arm[0] = { x: 10.8, y: 18.6, z: 5 }; o.arm[1] = { x: 10.8, y: 18.6, z: 5 }; o.hy = .4 + S(t * 2.618) * .4; o.mood = 0; }
    }
    return o;
  }
  function bend(out, P) {
    const w = (y) => clamp((56 - y) / 36, 0, 1); const hd = (y) => y <= 30 ? 1 : 0;
    const sh = (x, y, z) => { const k = w(y); return [x + P.sx * k + (hd(y) ? P.hx : 0), y + (hd(y) ? P.hy : 0), z + P.lean * k + (hd(y) ? P.hz : 0) + (P.gz || 0)]; };
    for (const [kk, o] of out) { if (kk === "e") { const r = sh(o.x, o.y, o.z); o.x = r[0]; o.y = r[1]; o.z = r[2]; } else o.pts = o.pts.map((p) => sh(p[0], p[1], p[2])); }
  }
  const HS = 1.1, LS = .7, NECK = 32, HB = 29.5;
  const ty = (y) => y <= HB ? NECK - (NECK - y) * HS : y >= 55 ? 74 - (74 - y) * LS : y;
  function chibi(out) {
    for (const [k, o] of out) {
      if (k === "e") { if (o.y <= HB) { o.x *= HS; o.z *= HS; o.rx *= HS; o.ry *= HS; o.rz *= HS; o.y = ty(o.y); } else if (o.y >= 55) { o.y = ty(o.y); o.ry *= LS; } }
      else { const head = o.pts[0][1] <= HB && o.pts[o.pts.length - 1][1] <= HB + 6; o.pts = o.pts.map((p) => p[1] <= HB ? [p[0] * HS, ty(p[1]), p[2] * HS] : [p[0], ty(p[1]), p[2]]); if (head && o.w !== undefined) { o.w = Array.isArray(o.w) ? o.w.map((v) => v * HS) : o.w * HS; } }
    }
  }
  const FEATURES = (cfg) => (mx, my, mz, X, Y, Z) => {
    if (mz < .1) return 0; const az = Math.atan2(mx, mz), el = Math.asin(clamp(my, -1, 1));
    if (cfg.faceExtra) { const x = cfg.faceExtra(az, el, mx, my, mz); if (x) return x; }
    for (const s of [-1, 1]) {
      const dx = (az - s * .40) / .18, dy = (el - .2) / .22, r = dx * dx + dy * dy;
      if (r < 1) {
        if (dy < -.62) return [26, 16, 30]; if (dy > .78) return dk(cfg.skin, .78);
        if (Math.abs(dx) < .66) { const hx_ = (dx * -s) > .05 && dy < -.05 && dy > -.5 && Math.abs(dx) > .12; if (hx_) return [255, 255, 255]; if (dy > .35) return cfg.eyeL; if (dy < -.25) return dk(cfg.eye, .55); return cfg.eye; }
        return [246, 244, 250];
      }
      if (Math.abs(az - s * .4) < .25 && el > .42 && el < .5) return 0;
      if (Math.abs(az - s * .38) < .25 && el > -.18 && el < -.1) return dk(cfg.hair, .55);
      if (cfg.blush && Math.abs(az - s * .78) < .16 && el > .5 && el < .64) return mix(cfg.skin, [255, 110, 120], .5);
    }
    if (Math.abs(az) < .06 && el > .42 && el < .56) return dk(cfg.skin, .82);
    if (Math.abs(az) < .04 && el > .5 && el < .56) return mix(cfg.skin, [255, 255, 255], .35);
    if (Math.abs(az) < .12 && el > .78 && el < .86) return cfg.mood === 2 ? [130, 30, 40] : [170, 76, 80];
    if (cfg.paint && Math.abs(Math.abs(az) - .78) < .05 && el > .15 && el < .5) return cfg.paint;
    return 0;
  };
  const strand = (az, el, base, k = 13) => { const v = Math.sin(az * k + el * 3); return v > .72 ? mix(base, [255, 240, 210], .25) : v < -.8 ? dk(base, .78) : 0; };
  const hairCap = (cfg, style) => (mx, my, mz) => {
    const az = Math.atan2(mx, mz), el = Math.asin(clamp(my, -1, 1)); let cover;
    if (mz < .02) cover = el < (style.back ?? .9);
    else { const line = -.1 + (style.bangs ? style.bangs(az) : 0); cover = el < line || (Math.abs(az) > 1.12 && el < (style.side ?? .35)); }
    return cover ? (strand(az, el, cfg.hair) || cfg.hair) : null;
  };
  function build(cfg, P, out, t) {
    const E = (o) => out.push(["e", o]), S = (o) => out.push(["s", o]);
    const bob = -P.bob, lz = P.lz, sk = cfg.skin; cfg.mood = P.mood;
    for (const i of [0, 1]) {
      const sg = i ? 1 : -1; const lg = P.leg[i];
      const hip = [sg * 3.7, 54 + bob, lg.z * .2], kn = [sg * (3.7 + (lg.kx || 0)), 62 + bob * .5 - lg.l * .5 - (lg.ky || 0), lg.z * .6 + 1.5 + (lg.kz || 0)], an = [sg * (3.7 + (lg.x || 0)), 68 - lg.l, lg.z];
      if (!cfg.robe) S({ pts: [hip, kn, [an[0], an[1] - 3, an[2]]], w: 6.2, col: cfg.pants, metal: cfg.metalLimb });
      S({ pts: [[an[0], an[1] - 6, an[2]], [an[0], an[1] - .8, an[2] + .2]], w: 5.6, col: cfg.boots, metal: cfg.metalLimb });
      E({ x: an[0] + sg * .8, y: an[1] + .4, z: an[2] + 2.8, rx: 2.9, ry: 2, rz: 5.4, p: 2.5, col: cfg.boots, metal: cfg.metalLimb });
      E({ x: an[0] + sg * 2.2, y: an[1] + 1, z: an[2] + 6.6, rx: 2.5, ry: 1.5, rz: 2.2, col: mix(cfg.boots, [255, 255, 255], .12), metal: cfg.metalLimb, bias: .2 });
      E({ x: an[0] + sg * 1.1, y: an[1] + 2.2, z: an[2] + 2.8, rx: 3.1, ry: .8, rz: 6.6, p: 2.6, col: dk(cfg.boots, .38) });
      E({ x: an[0], y: an[1] + 1.6, z: an[2] - 1.6, rx: 2.7, ry: 1.2, rz: 1.4, col: dk(cfg.boots, .55) });
      if (cfg.greaves) S({ pts: [[an[0], an[1] - 8, an[2]], [an[0], an[1] - 3, an[2]]], w: 7.2, col: cfg.greaves });
    }
    const tz = lz, bk = cfg.bulk || 1;
    if (cfg.robe) E({ x: 0, y: 48 + bob, z: tz, rx: 10.5 * (cfg.hipw || 1), ry: 20, rz: 7, p: 2.6, col: cfg.robeCol, tex: cfg.robeTex });
    E({ x: 0, y: 43 + bob, z: tz, rx: 8.8 * bk, ry: 10.2, rz: 5.8 * bk, p: 3, col: cfg.top, tex: cfg.topTex, metal: cfg.metalTop });
    if (cfg.skirt) E({ x: 0, y: 54 + bob, z: tz, rx: 9.5 * (cfg.hipw || 1), ry: 5, rz: 6.4, p: 2.4, col: cfg.skirt, tex: cfg.skirtTex });
    E({ x: 0, y: 51.6 + bob, z: tz, rx: 9 * (cfg.hipw || 1), ry: 1.9, rz: 6, p: 3, col: cfg.belt });
    E({ x: 0, y: 32.5 + bob, z: tz, rx: 3, ry: 3, rz: 3, col: sk });
    const hands = [null, null];
    for (const i of [0, 1]) {
      const sg = i ? 1 : -1, a = P.arm[i];
      const sh = [sg * 9.4 * bk, 37 + bob, tz], h = [sg * a.x * bk, 37 + a.y + bob, tz + a.z], m = [(sh[0] + h[0]) / 2 + sg * 1.2, (sh[1] + h[1]) / 2, (sh[2] + h[2]) / 2 - 1.5];
      S({ pts: [sh, m, h], w: [5.2, 4.4], col: (tt) => tt < .62 ? cfg.sleeve : (cfg.bracer && tt < .95 ? cfg.bracer : (cfg.sleeveLong ? cfg.sleeve : sk)), metal: cfg.metalLimb });
      E({ x: h[0], y: h[1] + 1, z: h[2] + .3, rx: 2.5, ry: 2.5, rz: 2.5, col: cfg.glove || sk }); hands[i] = { h: [h[0], h[1] + 1, h[2] + .3], m };
    }
    if (cfg.wpn) cfg.wpn(E, S, { R: hands[1], L: hands[0], P, t, tz, bob, unarmed: !P.armed });
    const hy = 22 + bob, hz = tz;
    E({ x: 0, y: hy, z: hz, rx: 8, ry: 10.4, rz: 8.4, p: 3.1, col: sk, soft: 1, tex: FEATURES(cfg) });
    for (const sg of [-1, 1]) E({ x: sg * 8.2, y: hy + 1.5, z: hz, rx: 1.6, ry: 2.6, rz: 1.8, col: sk });
    E({ x: 0, y: hy + 4.4, z: hz - .8, rx: 6.2, ry: 6.4, rz: 6.6, p: 3, col: sk, soft: 1 });
    if (cfg.hairFn) cfg.hairFn(E, S, { hy, hz, bob, tz, t, P });
    if (cfg.deco) cfg.deco(E, S, { hy, hz, bob, tz, t, P });
  }
  //__RENDER__
