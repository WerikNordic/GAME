import re
s=open('src/game.js',encoding='utf-8').read()
def rep(a,b,c=1):
    global s
    assert s.count(a)==c,(a[:70],s.count(a))
    s=s.replace(a,b)
# 1. rename Missão -> Quest
for a,b in [('Miss\\xF5es','Quests'),('miss\\xF5es','quests'),('Miss\\xE3o','Quest'),('miss\\xE3o','quest')]:
    s=s.replace(a,b)
# 2. cosmetic items
items=[
 ("gorro_la","Gorro de L\\xE3","headTop","beanie","common","Cabe\\xE7a (topo): gorro de l\\xE3 vermelho. Apenas visual."),
 ("guirlanda","Guirlanda de Folhas","headTop","wreath","common","Cabe\\xE7a (topo): coroa de folhas e frutos. Apenas visual."),
 ("bandana_escarlate","Bandana Escarlate","headTop","bandana","common","Cabe\\xE7a (topo): faixa vermelha amarrada. Apenas visual."),
 ("elmo_chifres","Elmo de Chifres","headTop","horns","uncommon","Cabe\\xE7a (topo): elmo de chifres cerimonial. Apenas visual."),
 ("asas_valquiria","Asas de Valqu\\xEDria","headTop","wings","rare","Cabe\\xE7a (topo): tiara com asas brancas. Apenas visual."),
 ("tiara_runica","Tiara R\\xFAnica","headTop","circlet","uncommon","Cabe\\xE7a (topo): aro de prata com gema. Apenas visual."),
 ("chapeu_pena","Chap\\xE9u de Pena","headTop","feathercap","uncommon","Cabe\\xE7a (topo): chap\\xE9u de bardo com pena. Apenas visual."),
 ("coroa_bronze","Coroa de Bronze","headTop","crown","rare","Cabe\\xE7a (topo): coroa dos jarls. Apenas visual."),
 ("olhos_ouro","Olhos Dourados","headMid","eye_gold","uncommon","Olhos: \\xEDris dourada. Apenas visual."),
 ("olhos_gelo","Olhos de Gelo","headMid","eye_ice","uncommon","Olhos: \\xEDris azul-gelo. Apenas visual."),
 ("olhos_brasa","Olhos de Brasa","headMid","eye_ember","uncommon","Olhos: \\xEDris cor de brasa. Apenas visual."),
 ("olhos_violeta","Olhos Violeta","headMid","eye_violet","rare","Olhos: \\xEDris violeta m\\xEDstica. Apenas visual."),
 ("olhos_esmeralda","Olhos Esmeralda","headMid","eye_green","uncommon","Olhos: \\xEDris verde-esmeralda. Apenas visual."),
 ("oculos_forja","\\xD3culos de Forja","headMid","goggles","uncommon","Olhos: \\xF3culos de ferreiro an\\xE3o. Apenas visual."),
 ("lenco_viagem","Len\\xE7o de Viagem","headLow","scarf","common","Cabe\\xE7a (baixo): len\\xE7o no pesco\\xE7o. Apenas visual."),
 ("mascara_caca","M\\xE1scara de Ca\\xE7a","headLow","mask","uncommon","Cabe\\xE7a (baixo): m\\xE1scara de couro. Apenas visual."),
 ("barba_trancada","Barba Tran\\xE7ada","headLow","beard","uncommon","Cabe\\xE7a (baixo): barba de guerreiro. Apenas visual."),
]
code='  var QCOS = [\n'+''.join(f'    {{ id: "{i}", name: "{n}", kind: "{k}", headStyle: "{h}", rarity: "{r}", reqLevel: 1, stack: 1, sell: 1, desc: "{d}", cosmetic: true }},\n' for i,n,k,h,r,d in items)+'  ];\n  for (let e of QCOS) Wa[e.id] = e;\n'
rep('  for (let e of M8) Wa[e.id] = e;\n',code+'  for (let e of M8) Wa[e.id] = e;\n')
# 3. quests defs + logic (after Ey)
RQ=[
 ("exp_lobo","exp","Peles para o Inverno","Entregue peles e presas para as tecel\\xF5es de Midgard.",[("pele_lobo",15),("presa_javali",10)],0.25),
 ("exp_goblin","exp","Sucata para a Forja","Brokk paga em experi\\xEAncia por ferro velho e gemas.",[("sucata_goblin",20),("gema_azul",5)],0.35),
 ("exp_ervas","exp","Cesto do Herbalista","Ervas para as po\\xE7\\xF5es de Eir.",[("erva_vermelha",10),("erva_azul",10),("erva_espinhosa",5)],0.20),
 ("exp_gelo","exp","Despojos da Geada","Presas e ossos do norte congelado.",[("presa_gelo",15),("osso_gelido",10)],0.40),
 ("exp_yeti","exp","Tributo do Yeti","Um tributo digno de um jarl.",[("pelo_yeti",5),("coracao_de_gelo",1)],0.60),
 ("vis_gorro","look","Um Gorro Quentinho","",[("pele_lobo",10),("erva_vermelha",5)],"gorro_la"),
 ("vis_guirlanda","look","Guirlanda da Primavera","",[("erva_vermelha",10),("erva_azul",10),("erva_espinhosa",5)],"guirlanda"),
 ("vis_bandana","look","Faixa de Saqueador","",[("sucata_goblin",8),("presa_javali",5)],"bandana_escarlate"),
 ("vis_lenco","look","Len\\xE7o de Estrada","",[("pele_lobo",6)],"lenco_viagem"),
 ("vis_mascara","look","M\\xE1scara do Ca\\xE7ador","",[("presa_javali",8),("sucata_goblin",3)],"mascara_caca"),
 ("vis_barba","look","Barba de Guerreiro","",[("pelo_yeti",4)],"barba_trancada"),
 ("vis_oculos","look","Oficina de \\xD3culos","",[("sucata_goblin",10),("gema_azul",2)],"oculos_forja"),
 ("vis_chifres","look","Elmo dos Antigos","",[("presa_gelo",15),("osso_gelido",5)],"elmo_chifres"),
 ("vis_pena","look","Chap\\xE9u do Bardo","",[("pelo_yeti",6),("pele_lobo",10)],"chapeu_pena"),
 ("vis_tiara","look","Tiara das V\\xF6lvas","",[("runa_vigor",2),("gema_azul",2)],"tiara_runica"),
 ("vis_asas","look","Asas Emprestadas","",[("pelagem_lunar",3),("runa_forca",1)],"asas_valquiria"),
 ("vis_coroa","look","Coroa do Jarl","",[("runa_egide",1),("runa_mente",1),("coracao_de_gelo",1)],"coroa_bronze"),
 ("vis_ouro","look","Olhar de Ouro","",[("gema_azul",4),("runa_forca",2)],"olhos_ouro"),
 ("vis_gelo","look","Olhar de Gelo","",[("osso_gelido",6),("coracao_de_gelo",1)],"olhos_gelo"),
 ("vis_brasa","look","Olhar de Brasa","",[("sucata_goblin",6),("erva_espinhosa",3)],"olhos_brasa"),
 ("vis_violeta","look","Olhar M\\xEDstico","",[("runa_mente",2)],"olhos_violeta"),
 ("vis_esmeralda","look","Olhar da Floresta","",[("erva_azul",12),("erva_espinhosa",4)],"olhos_esmeralda"),
]
def tojs(q):
    i,k,n,d,need,r=q
    nd=','.join(f'["{a}",{b}]' for a,b in need)
    rr=f'pct: {r}' if k=='exp' else f'reward: "{r}"'
    return f'    {{ id: "{i}", kind: "{k}", name: "{n}", desc: "{d}", need: [{nd}], {rr} }},'
logic='''  var RQ = [
'''+'\n'.join(tojs(q) for q in RQ)+'''
  ];
  var EYEC = { eye_gold: 15122688, eye_ice: 8442111, eye_ember: 16729344, eye_violet: 11556095, eye_green: 3586875 };
  function rqDo(e, t) {
    let a = RQ.find((l) => l.id === t);
    if (!a) return { ok: false, msg: "Quest desconhecida." };
    e.rqDone || (e.rqDone = []);
    if (a.kind === "look" && e.rqDone.includes(a.id)) return { ok: false, msg: "Voc\\xEA j\\xE1 concluiu esta quest." };
    for (let [l, c] of a.need) if (It(e.inventory, l) < c) return { ok: false, msg: "Itens insuficientes." };
    let n = ip(e.inventory);
    for (let [l, c] of a.need) if (!Ea(n, l, c)) return { ok: false, msg: "Itens insuficientes." };
    if (a.kind === "look") {
      if (He(n, a.reward, 1) !== 0) return { ok: false, msg: "Invent\\xE1rio cheio. Libere espa\\xE7o." };
      e.inventory = n, e.rqDone.push(a.id);
      return { ok: true, msg: `Quest conclu\\xEDda: ${$(a.reward).name}! (visual)` };
    }
    e.inventory = n;
    let o = Yu(e, Math.max(1, Math.round(tr(e.level) * a.pct)));
    return { ok: true, msg: `Quest conclu\\xEDda: ${a.name}`, gain: o };
  }
'''
rep('  function Fu(e, t) {',logic+'  function Fu(e, t) {')
# sanitize
rep('typeof e.checkpoint == "string" && en(e.checkpoint) && (w.checkpoint = e.checkpoint);','typeof e.checkpoint == "string" && en(e.checkpoint) && (w.checkpoint = e.checkpoint), Array.isArray(e.rqDone) && (w.rqDone = [...new Set(e.rqDone.filter((M) => typeof M == "string" && RQ.some((T) => T.id === M)))]);')
# R4 eyes
rep('    return e.hair !== void 0 && !Number.isNaN(e.hair) && (t.hair = xh[e.hair % xh.length])','    if (e.mid && e.mid.startsWith("eye_")) { t.eye = EYEC[e.mid]; e = { ...e, mid: void 0 }; }\n    return e.hair !== void 0 && !Number.isNaN(e.hair) && (t.hair = xh[e.hair % xh.length])')
# hair hidden with beanie
rep('q = ["helm", "horns", "hood", "goblincap", "feathercap"].includes(e.head)','q = ["helm", "horns", "hood", "goblincap", "feathercap", "beanie"].includes(e.head)')
# 3D styles
new3d='''      case "beanie": {
        H(11018804, 0.57, 0.06, at), Xt(a, I(0, 0.1, 0), 0.55, 0.06, 15790320, { seg: 18, ring: 6 }), L(a, I(0, 0.62, 0), 0.1, 0.1, 0.1, 15790320, { seg: 10 });
        break;
      }
      case "wreath": {
        Xt(a, I(0, 0.26, 0).mul(A.RX(-0.1)), 0.5, 0.04, 3715130, { seg: 20, ring: 5 });
        for (let C = 0; C < 9; C++) {
          let B = C / 9 * Math.PI * 2;
          L(a, I(Math.sin(B) * 0.5, 0.29, Math.cos(B) * 0.5), 0.055, 0.055, 0.055, C % 3 === 0 ? 13840175 : 5164884, { seg: 8 });
        }
        break;
      }
      case "bandana": {
        Xt(a, I(0, 0.2, 0).mul(A.RX(-0.08)), 0.51, 0.06, 11674146, { seg: 20, ring: 6 }), L(a, I(0.1, 0.2, -0.55), 0.1, 0.1, 0.06, 11674146, { seg: 8 }), F(a, I(0.12, 0.1, -0.58).mul(A.RX(2.9)), 0.07, 0, 0.3, 11674146, { seg: 6 });
        break;
      }
'''
rep('      case "goblincap": {\n        H(8147504, 0.56, 0)',new3d+'      case "goblincap": {\n        H(8147504, 0.56, 0)')
open('src/game.js','w',encoding='utf-8').write(s)
