  var SKSPEC = {
    berserker: { magic: false, colors: [16742970, 16760928, 16734762, 16726570, 16750950], t1: [
      "Machadada Dupla|cone|2|4|Dois golpes seguidos em arco amplo.|arc=140,r=72",
      "Grito de Guerra|buff|2|18|+25% de ataque e +10% de velocidade por 14s.|atk=.25,spd=.1,dur=14",
      "Pele de Urso|buff|2|22|+35% de defesa por 12s.|def=.35,dur=12",
      "Arremesso de Machado|projectile|3|6|Machado girat\xF3rio de m\xE9dio alcance.|r=270",
      "Ruptura|cone|3|8|Golpe pesado que atordoa quem estiver \xE0 frente.|arc=90,r=75,stun=800",
      "Pis\xE3o do Gigante|nova|3|10|Esmaga o ch\xE3o e atordoa os vizinhos.|rad=100,stun=700",
      "Sede de Sangue|buff|3|26|+30% de ataque e +10% de cr\xEDtico por 14s.|atk=.3,crit=.1,dur=14",
      "Corrente de L\xE2minas|chain|3|9|L\xE2mina que salta entre inimigos pr\xF3ximos.|jumps=3,r=200",
      "Investida Selvagem|line|3|7|Avan\xE7a derrubando tudo no caminho.|dash=170,w=60",
      "Cura de Batalha|heal|2|30|Recupera 25% da vida m\xE1xima.|heal=.25",
      "Tremor da Terra|meteor|4|12|Abalo que explode ap\xF3s um instante.|rad=85,delay=600,r=200"
    ], t2: [
      "L\xE2mina do Ragnar\xF6k|cone|5|9|Corte devastador em arco enorme.|arc=160,r=88",
      "Berserk Supremo|buff|5|40|+55% de ataque e +20% de velocidade por 16s.|atk=.55,spd=.2,dur=16",
      "F\xFAria de Fenrir|nova|4|12|Explos\xE3o de f\xFAria que desacelera inimigos.|rad=130,slow=2000",
      "Machado Meteoro|meteor|5|14|Machado gigante cai do c\xE9u.|rad=110,delay=800,r=240",
      "Trov\xE3o de Thor|chain|5|13|Raio que salta por at\xE9 5 alvos.|jumps=5,r=240",
      "Quebra-Cr\xE2nios|cone|4|11|Pancada que atordoa por muito tempo.|arc=70,r=80,stun=1600",
      "Armadura de Ferro R\xFAnico|buff|5|40|+60% de defesa por 18s.|def=.6,dur=18",
      "Salto Devastador|line|5|12|Salto colossal que esmaga e atordoa.|dash=220,w=80,stun=900",
      "Ira de Odin|buff|4|45|+40% de ataque e +25% de cr\xEDtico por 14s.|atk=.4,crit=.25,dur=14",
      "Sangue Fervente|heal|4|45|Recupera 45% da vida m\xE1xima.|heal=.45",
      "Rugido do Ulfhednar|nova|3|16|Rugido que atordoa todos ao redor.|rad=160,stun=1300",
      "Chuva de Machados|volley|3|10|Cinco machados em leque.|cnt=5,r=300",
      "Terremoto de J\xF6rmungandr|nova|5|20|Terremoto de grande raio.|rad=150",
      "Golpe Mortal|cone|5|15|Golpe preciso de dano enorme.|arc=60,r=92",
      "Chama de Valhalla|meteor|5|24|Chama divina que arrasa uma \xE1rea.|rad=140,delay=900,r=260"
    ] },
    escudeiro: { magic: false, colors: [9423103, 10473727, 6990079, 16769162, 12123135], t1: [
      "Bater de Escudo|cone|2|4|Golpe curto que empurra e atordoa.|arc=90,r=62,stun=900",
      "Postura Firme|buff|2|20|+40% de defesa por 12s.|def=.4,dur=12",
      "Lan\xE7a de Vigia|projectile|3|6|Arremessa uma lan\xE7a curta.|r=260",
      "Barreira de Gelo|nova|3|11|Onda gelada que desacelera.|rad=110,slow=2500",
      "Contra-Ataque|cone|3|8|Revida em arco largo.|arc=130,r=70",
      "Cura do Escudo|heal|2|28|Recupera 25% da vida m\xE1xima.|heal=.25",
      "Lamento do Guardi\xE3o|nova|3|12|Grito que atordoa os pr\xF3ximos.|rad=105,stun=900",
      "Estandarte de Tyr|buff|3|26|+20% de ataque e defesa por 14s.|atk=.2,def=.2,dur=14",
      "Carga de Aço|line|3|8|Corre com o escudo \xE0 frente.|dash=160,w=64,stun=700",
      "Martelo do Juiz|meteor|4|12|Martelo que desce depois de um instante.|rad=80,delay=600,r=180",
      "Muralha Viva|buff|4|30|+50% de defesa e +10% de velocidade por 10s.|def=.5,spd=.1,dur=10"
    ], t2: [
      "Fortaleza de Asgard|buff|5|45|+75% de defesa por 14s.|def=.75,dur=14",
      "Sentença de Tyr|nova|5|18|Onda sagrada com atordoamento longo.|rad=150,stun=1800",
      "Ruptura de Escudo|cone|5|10|Quebra a guarda de tudo \xE0 frente.|arc=110,r=80,stun=1400",
      "Eco do Juramento|buff|4|40|+35% de ataque e +35% de defesa por 16s.|atk=.35,def=.35,dur=16",
      "Lan\xE7a de Gungnir|line|5|13|Lan\xE7a longa que atravessa fileiras.|w=50,dash=0",
      "Santu\xE1rio|heal|4|45|Recupera 50% da vida m\xE1xima.|heal=.5",
      "Terra Santa|nova|4|14|Pulso que desacelera e fere.|rad=140,slow=2500",
      "Bastilha|buff|5|50|+60% de defesa e +20% de cr\xEDtico por 12s.|def=.6,crit=.2,dur=12",
      "Marcha dos Mortos de Pedra|meteor|5|16|Pilares de pedra emergem.|rad=120,delay=800,r=230",
      "Investida do Aeg\xEDs|line|4|11|Investida longa que atordoa.|dash=210,w=80,stun=1100",
      "Golpe do Trov\xE3o|chain|4|12|Fa\xEDsca que salta entre alvos.|jumps=4,r=220",
      "Aura de Forseti|buff|4|36|+30% de defesa e +15% de velocidade por 18s.|def=.3,spd=.15,dur=18",
      "Muro de Escudos|cone|4|9|Avan\xE7o de escudos em arco amplo.|arc=150,r=75,stun=700",
      "Grito de Batalha|nova|3|15|Grito que atordoa todos ao redor.|rad=165,stun=1200",
      "Queda de Bifr\xF6st|meteor|5|24|Luz do arco-\xEDris que castiga a \xE1rea.|rad=145,delay=1000,r=250"
    ] },
    cacador: { magic: false, colors: [16773296, 9429247, 12582864, 8978312, 16764006], t1: [
      "Tiro Duplo|volley|2|5|Duas flechas simult\xE2neas.|cnt=2,r=320",
      "Flecha de Fogo|meteor|3|9|Flecha que explode no alvo.|rad=70,delay=400,r=300",
      "Passo de Sombra|buff|2|20|+25% de velocidade e +10% de cr\xEDtico por 12s.|spd=.25,crit=.1,dur=12",
      "Rede de Ca\xE7a|meteor|3|11|Rede que desacelera a \xE1rea.|rad=90,delay=300,slow=3000,r=260,vfx=frost",
      "Olho de Falc\xE3o|buff|3|26|+30% de ataque e +15% de cr\xEDtico por 14s.|atk=.3,crit=.15,dur=14",
      "Flecha Rel\xE2mpago|chain|3|9|Flecha el\xE9trica que salta.|jumps=3,r=240",
      "Salto Acrob\xE1tico|line|2|7|Salta para a frente atirando.|dash=150,w=40",
      "Disparo Atordoante|projectile|3|8|Flecha pesada que atordoa.|r=320,stun=900",
      "Cura da Mata|heal|2|30|Recupera 25% da vida m\xE1xima.|heal=.25",
      "Chuva de Flechas|volley|3|10|Cinco flechas em leque.|cnt=5,r=300",
      "Armadilha de Estacas|nova|3|10|Estacas ao redor que atordoam.|rad=95,stun=700"
    ], t2: [
      "Tempestade de Skadi|volley|4|12|Sete flechas em leque.|cnt=7,r=320",
      "Flecha de Fenrir|projectile|5|10|Flecha colossal de longo alcance.|r=400",
      "Sentido de Predador|buff|5|40|+45% de ataque e +30% de cr\xEDtico por 16s.|atk=.45,crit=.3,dur=16",
      "Chuva Meteorica|meteor|5|16|Flechas em chamas do c\xE9u.|rad=125,delay=800,r=300",
      "Flecha Perfurante+|line|5|11|Atravessa tudo em linha reta.|w=50",
      "Armadilha Glacial|meteor|4|12|Gelo que prende a \xE1rea.|rad=110,delay=400,slow=3500,r=280,vfx=frost",
      "Vento do Norte|buff|4|34|+35% de velocidade por 18s.|spd=.35,dur=18",
      "Raio de Ullr|chain|5|13|Flecha que salta por 5 alvos.|jumps=5,r=260",
      "Tiro Fantasma|projectile|4|9|Flecha que ignora a dist\xE2ncia.|r=420",
      "Emboscada|line|4|10|Salto e disparo em linha.|dash=190,w=60,stun=800",
      "Ora\xE7\xE3o do Bosque|heal|4|45|Recupera 45% da vida m\xE1xima.|heal=.45",
      "Campo de Estacas|nova|4|14|Estacas em c\xEDrculo amplo.|rad=150,stun=1100",
      "Ca\xE7a Sem Fim|volley|4|13|Dez flechas girando.|cnt=9,r=300",
      "Pele de Lobo|buff|4|36|+30% de defesa e +15% de velocidade por 16s.|def=.3,spd=.15,dur=16",
      "Julgamento de Skadi|meteor|5|24|Uma flecha de gelo que arrasa.|rad=150,delay=1000,r=300,vfx=frost"
    ] },
    volva: { magic: true, colors: [8378623, 13154559, 10124031, 16747050, 12648447], t1: [
      "Bola de Fogo|projectile|3|5|Esfera \xEDgnea de m\xE9dio alcance.|r=300",
      "Chicote de Gelo|cone|2|4|Lufada gelada que desacelera.|arc=100,r=110,slow=2500",
      "Escudo de Runas|buff|2|24|+40% de defesa por 14s.|def=.4,dur=14",
      "Nuvem de Veneno|nova|3|10|N\xE9voa t\xF3xica ao redor.|rad=110",
      "Cura de Eir|heal|2|26|Recupera 30% da vida m\xE1xima.|heal=.3",
      "Foco Arcano|buff|3|28|+30% de ataque m\xE1gico e +10% de cr\xEDtico por 14s.|atk=.3,crit=.1,dur=14",
      "Rel\xE2mpago Duplo|chain|3|7|Rel\xE2mpago que salta 4 vezes.|jumps=4,r=260",
      "Pris\xE3o de Gelo|meteor|3|12|Bloco de gelo que prende a \xE1rea.|rad=95,delay=500,slow=3500,r=280,vfx=frost",
      "Corrente de Mimir|line|3|9|Raio cont\xEDnuo em linha.|w=48",
      "Passo Et\xE9reo|buff|2|22|+25% de velocidade por 12s.|spd=.25,dur=12",
      "Chuva de Fa\xEDscas|volley|3|9|Cinco fa\xEDscas em leque.|cnt=5,r=290"
    ], t2: [
      "Apocalipse de Surtr|meteor|5|26|Cataclismo de fogo em grande \xE1rea.|rad=170,delay=1100,r=320",
      "Tempestade de Gelo|nova|5|16|Nevasca que desacelera todos.|rad=165,slow=3000",
      "Cadeia de Odin|chain|5|13|Raio que salta por 6 alvos.|jumps=6,r=280",
      "Eclipse|buff|5|45|+50% de ataque m\xE1gico e +25% de cr\xEDtico por 16s.|atk=.5,crit=.25,dur=16",
      "Aura de Cura|heal|4|45|Recupera 55% da vida m\xE1xima.|heal=.55",
      "Lan\xE7a de Mimir|projectile|5|9|Lan\xE7a m\xE1gica de longo alcance.|r=400",
      "Barreira de Aurora|buff|5|40|+65% de defesa por 14s.|def=.65,dur=14",
      "Meteoro Cadente|meteor|5|18|Meteoro r\xE1pido.|rad=130,delay=700,r=300",
      "Fogo Fatuo|volley|4|11|Sete chamas em leque.|cnt=7,r=300",
      "Raio Divino|line|5|12|Raio que atravessa tudo.|w=60",
      "Pulso Glacial|cone|4|10|Rajada congelante em arco.|arc=140,r=130,slow=3000",
      "Selo de Runas|nova|4|14|Selo que atordoa quem toca.|rad=140,stun=1500",
      "Tempo Dilatado|buff|4|36|+30% de velocidade e +20% de ataque por 16s.|spd=.3,atk=.2,dur=16",
      "Ruptura Arcana|nova|5|20|Explos\xE3o arcana colossal.|rad=185",
      "Ragnar\xF6k|meteor|5|32|Chuva final de fogo e gelo.|rad=190,delay=1200,r=340"
    ] },
    valquiria: { magic: false, colors: [16773808, 16775376, 10158e3, 12576511, 16767400], t1: [
      "Lan\xE7a Girat\xF3ria|nova|3|8|Gira a lan\xE7a ao redor.|rad=100",
      "Arremesso de Lan\xE7a|projectile|3|6|Lan\xE7a de longo alcance.|r=300",
      "B\xEAn\xE7\xE3o das Valqu\xEDrias|buff|2|26|+20% de ataque e defesa por 14s.|atk=.2,def=.2,dur=14",
      "Pluma de Luz|heal|2|24|Recupera 25% da vida m\xE1xima.|heal=.25",
      "Estocada R\xE1pida|cone|2|4|Estocadas r\xE1pidas \xE0 frente.|arc=45,r=100",
      "Mergulho do Falc\xE3o|line|3|7|Mergulho veloz que atordoa.|dash=180,w=52,stun=600",
      "Asas Protetoras|buff|3|28|+45% de defesa por 12s.|def=.45,dur=12",
      "Raio de Gungnir|chain|3|10|Raio de luz que salta.|jumps=3,r=230",
      "Chuva de Penas|volley|3|9|Cinco penas cortantes.|cnt=5,r=260",
      "Veredito|cone|3|9|Golpe sagrado que atordoa.|arc=80,r=95,stun=900",
      "Descida Celestial|meteor|4|12|Lan\xE7a de luz do c\xE9u.|rad=85,delay=600,r=220"
    ], t2: [
      "Ceifadora de Valhalla|cone|5|9|Golpe em arco amplo com lan\xE7a.|arc=140,r=105",
      "Comando de Odin|buff|5|45|+40% de ataque e +30% de velocidade por 16s.|atk=.4,spd=.3,dur=16",
      "Luz Redentora|heal|5|40|Recupera 60% da vida m\xE1xima.|heal=.6",
      "Voo da Tempestade|line|5|11|Voo longo que fere tudo no caminho.|dash=240,w=70",
      "Lan\xE7a Divina+|projectile|5|8|Lan\xE7a lum\xEDnica de longo alcance.|r=420",
      "Coro de Asas|nova|4|14|Onda de asas que atordoa.|rad=145,stun=1300",
      "Armadura Celestial|buff|5|42|+70% de defesa por 14s.|def=.7,dur=14",
      "Bifr\xF6st|chain|5|13|Arco-\xEDris que salta por 5 alvos.|jumps=5,r=260",
      "Tempestade de Penas|volley|4|11|Nove penas em leque.|cnt=9,r=300",
      "Julgamento Final|meteor|5|22|Pilar de luz devastador.|rad=145,delay=1000,r=260",
      "Gl\xF3ria Eterna|buff|4|40|+35% de ataque e +25% de cr\xEDtico por 16s.|atk=.35,crit=.25,dur=16",
      "Gr\xE2o de Luz|heal|3|28|Recupera 35% da vida m\xE1xima.|heal=.35",
      "Estocada da Aurora|cone|4|7|Golpe fort\xEDssimo e estreito.|arc=40,r=115",
      "Giro Celeste|nova|4|13|Giro que afasta e fere.|rad=135,stun=800",
      "Lan\xE7a do Fim dos Tempos|meteor|5|30|Lan\xE7a colossal que cai do c\xE9u.|rad=170,delay=1200,r=300"
    ] },
    skald: { magic: true, colors: [16760954, 11599808, 16765040, 16738890, 12648447], t1: [
      "Acorde de Choque|chain|3|7|Acorde que salta entre inimigos.|jumps=3,r=240",
      "Melodia de Vigor|buff|2|26|+25% de velocidade e +10% de ataque por 16s.|spd=.25,atk=.1,dur=16",
      "Hino de Prote\xE7\xE3o|buff|2|26|+40% de defesa por 14s.|def=.4,dur=14",
      "Corda Estridente|cone|2|5|Som cortante \xE0 frente.|arc=100,r=120,stun=500",
      "Eco Trovejante|nova|3|10|Ondas sonoras ao redor.|rad=115,stun=800",
      "Can\xE7\xE3o de Ninar|meteor|3|13|Ac\xFAstica que desacelera.|rad=100,delay=300,slow=3500,r=240,vfx=frost",
      "Verso do Valente|buff|3|30|+30% de ataque por 16s.|atk=.3,dur=16",
      "Balada Curativa|heal|3|24|Recupera 35% da vida m\xE1xima.|heal=.35",
      "Nota Perfurante|projectile|3|6|Nota afiada de longo alcance.|r=330",
      "Chuva de Notas|volley|3|9|Cinco notas em leque.|cnt=5,r=290",
      "Crescendo|line|3|9|Onda sonora em linha.|w=52"
    ], t2: [
      "Sinfonia do Ragnar\xF6k|nova|5|18|Sinfonia devastadora ao redor.|rad=170,stun=1000",
      "Hino de Odin|buff|5|45|+40% de ataque e defesa por 18s.|atk=.4,def=.4,dur=18",
      "Can\xE7\xE3o do Renascimento|heal|5|40|Recupera 60% da vida m\xE1xima.|heal=.6",
      "Cadeia Harm\xF4nica|chain|5|12|Acorde que salta por 6 alvos.|jumps=6,r=280",
      "Tempestade Sonora|volley|4|11|Nove notas em leque.|cnt=9,r=300",
      "Marcha de Guerra|buff|4|36|+30% de velocidade e +25% de ataque por 16s.|spd=.3,atk=.25,dur=16",
      "Aria do Gelo|meteor|4|14|Aria que congela a \xE1rea.|rad=130,delay=600,slow=3500,r=280,vfx=frost",
      "Solo Final|projectile|5|8|Nota colossal de longo alcance.|r=420",
      "Coro dos Einherjar|buff|5|44|+60% de defesa por 16s.|def=.6,dur=16",
      "Dissonância Mortal|nova|4|13|Dissonância que atordoa.|rad=145,stun=1500",
      "Raio Musical|line|5|11|Raio sonoro que atravessa.|w=64",
      "Eco do Valhalla|cone|4|8|Grande onda sonora em arco.|arc=140,r=135",
      "Verso de Odin|buff|4|38|+25% de ataque e +30% de cr\xEDtico por 16s.|atk=.25,crit=.3,dur=16",
      "Balada dos Mortos|heal|4|35|Recupera 45% da vida m\xE1xima.|heal=.45",
      "Fim da Can\xE7\xE3o|meteor|5|28|Nota final que destr\xF3i a \xE1rea.|rad=170,delay=1100,r=300"
    ] }
  };
  (function () {
    const num = (v) => parseFloat(v);
    const slug = (s) => s.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, "_").replace(/^_|_$/g, "");
    for (let line of Object.keys(SKSPEC)) {
      let L = Ce[line], spec = SKSPEC[line], out = L.skills;
      // novato: apenas 1 habilidade (a 1a); as demais passam para a 2a classe
      for (let i = 1; i < out.length; i++) out[i].tier = Math.max(out[i].tier, 1);
      let seq = 0;
      for (let tier of [1, 2]) for (let str of tier === 1 ? spec.t1 : spec.t2) {
        let [name, kind, pw, cd, desc, ex] = str.split("|"), x = {};
        (ex || "").split(",").filter(Boolean).forEach((kv) => { let [k, v] = kv.split("="); x[k] = k === "vfx" ? v : num(v); });
        pw = num(pw), cd = num(cd);
        let tm = tier === 1 ? 1 : 1.45, id = line.slice(0, 3) + "_" + slug(name), sk = { id, name, tier, kind, cooldown: Math.round(cd * 1e3), light: spec.colors[seq++ % spec.colors.length], desc, range: 0, radius: 0 };
        if (spec.magic) sk.magic = true;
        if (kind === "buff") {
          sk.mp = Math.round((8 + cd * 0.45) * (tier === 1 ? 1 : 1.6)), sk.mult = 0, sk.buff = { ms: (x.dur ?? 12) * 1e3 };
          for (let k of ["atk", "def", "spd", "crit"]) x[k] && (sk.buff[k] = x[k]);
        } else if (kind === "heal") {
          sk.mp = Math.round((10 + (x.heal ?? 0.3) * 40) * (tier === 1 ? 1 : 1.5)), sk.mult = 0, sk.heal = x.heal ?? 0.3;
        } else {
          let km = { nova: 0.85, meteor: 0.9, projectile: 1.1, line: 1.05, chain: 0.95, volley: 0.55, cone: 1 }[kind] ?? 1;
          sk.mult = +((1.1 + 0.32 * pw) * tm * km).toFixed(2), sk.mp = Math.round((5 + pw * 2.6 + cd * 0.9) * (tier === 1 ? 1 : 1.8));
          x.r && (sk.range = x.r), x.rad && (sk.radius = x.rad), x.arc && (sk.arc = x.arc), x.stun && (sk.stunMs = x.stun), x.slow && (sk.slowMs = x.slow), x.cnt && (sk.count = x.cnt), x.jumps && (sk.jumps = x.jumps), x.dash !== void 0 && (sk.dash = x.dash), x.w && (sk.width = x.w), x.delay && (sk.delay = x.delay), x.vfx && (sk.vfx = x.vfx);
          kind === "line" && sk.dash === void 0 && (sk.dash = 0);
        }
        out.push(sk);
      }
    }
  })();
