s=open('src/game.js',encoding='utf-8').read()
def rep(a,b,c=1):
    global s
    assert s.count(a)==c,(a[:70],s.count(a))
    s=s.replace(a,b)
panel='''  function QuestsPanel() {
    let t = ge().player, [a, n] = (0, xo.useState)("exp");
    if (!t) return null;
    let o = t.rqDone ?? [], r = RQ.filter((i) => i.kind === a);
    return (0, Ye.jsxs)(Yt, { id: "quests", title: "Quests", onClose: () => j.closePanel(), wide: true, children: [(0, Ye.jsx)("p", { className: "muted", children: "Quests de itens: junte o que se pede e entregue. Escolha entre ganhar EXP (repet\\xEDvel) ou conquistar um visual novo (chap\\xE9u, gorro, olhos\\u2026 sem b\\xF4nus, s\\xF3 apar\\xEAncia)." }), (0, Ye.jsxs)("div", { className: "row wrap", children: [(0, Ye.jsx)("button", { className: `btn btn-small${a === "exp" ? " btn-primary" : ""}`, onClick: () => n("exp"), children: "Quests de EXP" }), (0, Ye.jsx)("button", { className: `btn btn-small${a === "look" ? " btn-primary" : ""}`, onClick: () => n("look"), children: "Quests de Visual" })] }), (0, Ye.jsx)("div", { className: "refine-list", children: r.map((i) => {
      let l = i.kind === "look" ? $(i.reward) : null, c = i.need.every(([f, u]) => It(t.inventory, f) >= u), d = i.kind === "look" && o.includes(i.id);
      return (0, Ye.jsxs)("div", { className: "eq-row", children: [l ? (0, Ye.jsx)(Aa, { id: l.id, size: 32 }) : null, (0, Ye.jsxs)("div", { children: [(0, Ye.jsx)("b", { children: i.name }), l ? (0, Ye.jsxs)("small", { children: ["Recompensa: ", l.name, " (visual)"] }) : (0, Ye.jsxs)("small", { children: ["Recompensa: ", Math.round(i.pct * 100), "% do EXP do n\\xEDvel atual \\xB7 ", i.desc] }), i.need.map(([f, u]) => (0, Ye.jsxs)("small", { style: { color: It(t.inventory, f) >= u ? "#1c7a2e" : "#8a2d2d" }, children: [$(f)?.name, ": ", Math.min(It(t.inventory, f), u), "/", u] }, f))] }), (0, Ye.jsx)("button", { className: "btn btn-primary btn-small", disabled: !c || d, onClick: () => j.doQuest(i.id), children: d ? "Conclu\\xEDda" : "Entregar" })] }, i.id);
    }) })] });
  }
'''
rep('  function u5() {',panel+'  function u5() {')
rep('e.panel === "stylist" && (0, pt.jsx)(u5, {}),','e.panel === "stylist" && (0, pt.jsx)(u5, {}), e.panel === "quests" && (0, pt.jsx)(QuestsPanel, {}),')
rep('this.panel === "stylist" || this.panel === "feitos") {','this.panel === "stylist" || this.panel === "quests" || this.panel === "feitos") {')
rep('    warpRespawn(t) {','''    doQuest(t) {
      if (!this.ps) return;
      let a = rqDo(this.ps, t);
      this.toast(a.msg, a.ok ? "good" : "bad"), a.ok && (a.gain && (a.gain.levels > 0 && this.toast(`N\\xEDvel ${this.ps.level}!`, "good"), a.gain.jobLevels > 0 && this.toast(`N\\xEDvel de classe ${this.ps.jobLevel}!`, "good")), this.pushLog(a.msg, "system", "good"), this.saveGameQuiet()), this.refresh();
    }
    warpRespawn(t) {''')
# NPC
rep('"cronista", "checkpoint", ...e]','"cronista", "checkpoint", "questor", ...e]')
rep('        case "checkpoint":\n          return { x: d - 560, y: k - 130 };','        case "checkpoint":\n          return { x: d - 560, y: k - 130 };\n        case "questor":\n          return { x: d + 680, y: k - 210 };')
rep('checkpoint: { id: "checkpoint", name:','questor: { id: "questor", name: "Hild", title: "Mestra das Quests", color: 12611584, blocks: [{ lines: ["Cada saco de pele e cada gema que voc\\xEA traz vira algo nos meus registros. Trago experi\\xEAncia para quem junta, e vestes e olhares novos para quem tem gosto.", "Escolha: uma quest de EXP, ou uma de visual. Visuais n\\xE3o d\\xE3o b\\xF4nus nenhum, s\\xF3 beleza."], action: { type: "panel", panel: "quests", label: "Ver as Quests" } }] }, checkpoint: { id: "checkpoint", name:')
rep('    checkpoint: { skin: fo,','    questor: { skin: 14197884, hair: 11559462, hairStyle: "long", tunic: 12611584, trim: 16181444, pants: 3811930, boots: 2890314, gear: "none", head: "none", cape: 6965802 },\n    checkpoint: { skin: fo,') if False else None
open('src/game.js','w',encoding='utf-8').write(s)
