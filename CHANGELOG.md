# v177
- Auditoria geral. Corrigido: habilidade lançada com clique em um monstro lançava erro (alvo era somente-leitura) e falhava.
- Corrigido: restrição de armas por classe agora segue exatamente as armas que cada classe pode usar (antes a dica mostrava classes que não podiam equipar).
- Verificado sem problemas: referências de itens/monstros/NPCs/missões, 98 mapas x 7 classes, painéis, salvar/carregar, stats sem NaN, portais.

# v176
- Deserto das Estrelas Mortas: música própria, lenta e triste (menor, flauta solitária, bordão grave).
- Cidades: bancos reduzidos a no máx. 4, só perto de fonte/poço/igreja/estátua.
- Falcão: agora exige a habilidade Adestrar Falcão (nível 10, 1 ponto, aba Habilidades) e falar com Hrafn, Adestrador de Falcões, no nordeste da Cidade de Midgard.
- Guildas por classe com Mestre da Guilda: Arqueiros em Midgard, Espadachins em Kharnheim, Mercadores em Handelsvik, Magos em Isenborg, Noviços em Gladsheim, Gatunos em Eldvik, Thays em Helvik. Registro dá 500 Zeny; treino diário dá +10% ataque e +5% crítico por 10 min.

# v175
- Mapas de caça maiores (4200x2800, +25%) com densidade de monstros ~+27%.
- Portais com spawn dinâmico; 3 retornos de cidade que caíam dentro de obstáculos (Eldvik, Solvik, Gladsheim) corrigidos.

# v174
- Casamento validado pelo servidor: os dois noivos confirmam no Supabase (trade_commit) e so casam quando o servidor registra AMBOS; some a situacao de um casar e o outro nao.
- Armas por classe: cada tipo de arma agora so pode ser usado pelas classes certas (espada: Berserker/Mercador/Valquiria/Thay; machado: Berserker/Mercador; arco: Cacador/Skald; cajado: Volva/Valquiria/Skald; lanca: Berserker/Valquiria/Cacador; adaga: Thay/Cacador/Mercador/Skald; luvas: Thay/Valquiria/Berserker; maca: Mercador/Valquiria/Berserker). Antes qualquer classe usava qualquer arma.

# v173
- Troca com liquidacao pelo servidor: depois que os dois confirmam, cada lado registra o compromisso no Supabase (tabela mp_trades + RPC trade_commit); so aplica a troca quando o servidor confirma que AMBOS confirmaram. Evita o caso de um lado concluir e o outro nao, e deixa registro auditavel da oferta. Limite: o servidor nao guarda o inventario, entao a checagem de posse continua no cliente.

# v172
- Capa com fisica propria: a barra da capa agora balanca separada do corpo (mola amortecida: puxa para tras ao correr e oscila ao parar, mais brisa leve parado). O corpo quase nao inclina mais quando ha capa equipada.

# v171
- HP do grupo: cada jogador publica sua vida (novo campo hpf em mp_presence + RPCs mp_hp e mp_hps no Supabase). Barra de vida real acima dos outros jogadores (vermelha abaixo de 30%) e porcentagem de vida de cada membro no painel do Grupo (Alt+Z).
- Casamento: Vestido de Noiva deixa o personagem de branco; Smoking do Noivo, de preto.
- Ferreiro: +8% de sucesso no refino, 30% de chance do item resistir a uma falha, /afiar (ataque +20%) e /reforcar (defesa +25%) por 8 min (150 Zens + 1 Sucata de Goblin).
- Painel Caminho das Classes (/classes): evolucao de cada classe (Aprendiz > 1a > 2a), caminhos e regras de nivel de classe 10/50 e renascimento.

# v170
- Monstros maiores: +22% no tamanho visual dos monstros comuns e +12% nos chefes (so visual; hitbox e alcance iguais). Mapas de caca ja tem 3360x2240 (1,75x o original); nao foram ampliados de novo para nao quebrar portais.

# v169
- Organizacao dos NPCs: todas as cidades passam por uma checagem ao carregar; NPC dentro de predio/pilar/torre ou colado em outro e movido para o ponto livre mais proximo. Antes havia 12 casos em 8 dias simulados (Aeronave em Gladsheim, Bruna em Skogvik, Torvald em Isenborg); agora 0.

# v168
- NPCs de historia (drama e terror), cada um com ramificacoes e varios finais; recompensa unica de EXP + Zeny por NPC (reler gratis, sem recompensa): Viuva Solveig (Midgard, A Carta Que Nao Chegou), Menino Eirik (Ravnhaven, O Barco do Pai), Torgrim o Escaldo Cego (Kharnheim, A Ultima Cancao), Coveiro Ragnvald (Helvik, Os Sussurros da Cripta), Velha Hulda (Skogvik, A Casa Que Respira).
- CORRECAO IMPORTANTE: o salvamento descartava campos novos do personagem (caminho Ferreiro/Alquimista, homunculo, carrinho, bebe, casamento, montaria, falcao, historias etc.) ao recarregar. Agora esses campos sao preservados.

# v167
- Falcao do Cacador: a partir do nivel 10 o Cacador ganha um falcao que sobrevoa o personagem e mergulha sozinho a cada 5 s no monstro mais proximo (dano ~110% do ataque + atordoa 0,45 s). /falcao liga/desliga. Nao ataca em zona segura.

# v166
- 3 mapas iniciais encadeados a partir dos Campos de Midgard (portal no topo): Prado dos Aprendizes (Nv1-2), Vale dos Cogumelos (Nv2-3), Colina dos Goblins Mirins (Nv3-4). 4 monstros fracos novos (Gosma Verde, Javali Filhote, Broto Andante, Goblin Mirim) e 3 materiais (Gel Verde, Cogumelo Rubro, Pelo Macio), respawn rapido e agressividade baixa.

# v165
- Isenborg: presentes (giftpile) embaixo da arvore de Natal central, de cada arvore de neve e ao redor da Casa do Papai Noel (fabrica de brinquedos).
- Kharnheim e Eldvik: duas fontes secas e rachadas (sem agua) ladeando a praca.
- Ajuste de NPCs: barqueiro/aeronave subiram um pouco (sobreposicao com cronista) e Pai dos Homunculos saiu de cima de uma muralha.

# v164
- Fisica basica: mola amortecida no personagem (inclina com a inercia ao andar/parar; capa balanca mais e com brisa leve parado). Sem efeito sentado.

# v163
- Trilha de Quests: encomendas de Zeny repetiveis (20 materiais), 9 Grandes Expedicoes unicas (3 materiais -> EXP + Zeny + equipamento raro) e 14 Trofeus de MVP unicos (drops do chefe -> EXP + Zeny + equipamento raro). Painel de Quests com abas EXP / Zeny / Dificeis / MVP / Visual.

# v162
- NOVO sistema de casamento: Irma Eldrid (cerimonialista) na Capela de Midgard. Ambos nivel 99 + Alianca de Ouro, pedido/aceite entre jogadores online, fogos de confete; loja da capela (alianca, vestido, smoking, buque); adocao de bebe (segue o casal, +2% EXP); /bencao da familia (15 s de agilidade, cura 25%, tambem no conjuge); divorcio.

# v161
- Caminhos do Mercador viram Ferreiro (+10% ataque) e Alquimista (+20% vida). SO o Alquimista tem Homunculo: Pai dos Homunculos (NPC escondido num canto de Isenborg) cria (5000 Zeny + materiais); 4 tipos (Vitalis cura, Granito +vida, Faisca rapido, Caos imprevisivel); luta ao lado, ganha EXP, renomeia, evolui com Pedra de Evolucao (cai de MVPs, nivel 30). Comando /homun.

# v160
- Mercador: Carrinho (Alt+W, +1500 de peso, 10 cores e 7 enfeites) e Loja pessoal /trade com balao sobre a cabeca; clientes NPC compram enquanto voce fica parado numa cidade.

# v159
- Armaduras geradas agora tem requisito de classe (ex.: Placas so Espadachim/Mercador; Tunica e Manto para Mago/Novico) e um atributo da funcao da peca.

# v158
- Catalogo gigante: +10.560 equipamentos gerados (armas dos 8 tipos, armaduras, acessorios, chapeus; 33 faixas de nivel x 10 qualidades) e +189 especies de monstros (255 no total), 3 novas por mapa, cada uma com drops proprios. Equipamentos gerados nao poluem o provador.

# v157
- Ilhas com chao de areia e grama rala, agua turquesa e palmeiras.

# v156
- NOVAS ILHAS (3 mapas tropicais com palmeiras): Ilha dos Corais (Nv 18-20), Costa dos Naufragios (Nv 28-32), Ilha do Kraken (Nv 38-40, com MVP Capitao Hvalgrim). 9 monstros novos, 10 itens novos (conchas, perolas, sabre/arco/cajado, casaco, colar). Barqueiro Sigmund em todas as cidades e nas ilhas (viagem paga, VIP paga metade).

# v155
- NOVO NPC Capitao Brynjar (Dirigivel) em todas as cidades: voo pago com cena de viagem para qualquer cidade ou trilha de cacada ate 5 niveis acima do seu. VIP paga metade.

# v154
- NOVA janela de Troca entre jogadores (clique direito > Trocar): ate 8 tipos de item + Zeny, os dois confirmam; itens vinculados (ex. chapeu Poring) nao entram. Usa o canal de sussurro como transporte.

# v153
- Clique direito em outro jogador abre menu: Sussurrar, Convidar para o grupo, Adicionar/Remover amigo, Inspecionar (classe e nivel), Bloquear/Desbloquear (esconde o chat da pessoa).

# v152
- NOVO: NPC Sala VIP em todas as cidades. Passe VIP (7 dias 15.000 / 30 dias 50.000 Zens). Regalias: loja VIP 35% mais barata com itens exclusivos, montaria gratis, bencao (cura + agilidade), cores neon/metalicas de cabelo e roupa e cortes de ambos os generos no estilista. ADM sempre VIP.

# v151
- Comandos de ADM no chat (conta admin): @ajuda, @lvlup 0-99, @joblv, @statpts, @skillpts, @zeny, @heal, @god, @goto, @item, @ban/@unban (e-mail). Aura dourada e coroa + nome [ADM].

# v78
- Sprites no estilo Ragnarok: proporcao mais realista, paleta terrosa/apagada, dithering, cabelo e rosto menores e detalhados; cenario menos saturado.

# v77
- NOVO ESTILO: sprites de personagem desenhados em pixel-art 2D de verdade (proporcao chibi, cabeca grande, olhos, cabelo, equipamentos, 5 direcoes, caminhada, ataque, sentado). Desligar: localStorage eldvar.sp=0.

# v76
- Sombreamento em faixas (cel-shading) em sprites e cenario, personagens maiores, textura de grama pixelada no chao.

# v75
- Pixel-art tambem em arvores, casas e objetos (visual consistente).

# v74
- Caminhada mais natural: 12 quadros por ciclo, inclinacao do tronco, torcao ombros/quadril, balanco lateral.
- Estrelinhas brilhantes nos efeitos de habilidade (nova, cura, buff).

# v73
- Visual pixel-art estilo Ragnarok: personagens, NPCs e monstros agora em pixels nitidos com contorno escuro, cores mais vivas (desligar: localStorage eldvar.px=0).

# v72
- Mensagens globais agora aparecem como faixa de texto (igual a entrada em cidades), sem pop-up.
- Dirigivel voa pelo mapa todo em rota aleatoria, com sombra no chao.
- Munin (teletransporte) e Sigrun (troca de classe) fixos ao lado da fonte em todas as cidades.

# v71
- Login/contas na nuvem reativados (saves da conta, inclusive WERIK).

# v70
- Multiplayer real: jogadores de outros navegadores aparecem no mapa, chat geral do mapa com balão, mensagem privada (/w nome msg) com janela, AFK visível a todos.

# v53
- Check Point: Guardiao do Marco em toda cidade; morte revive no mapa marcado.
- Quests de itens (EXP repetivel ou visuais sem bonus) com a NPC Hild; 17 itens visuais (gorros, guirlanda, bandana, olhos, etc.).
- Habilidades: Novato 1, 2a classe 15, 3a classe 30 por linha de classe (buffs com velocidade/critico).
- Cidades em escala real (palacio, castelo, estatuas, casas) e casas com variacoes.
- Sentado: clicar so vira o personagem. Chat: Geral/Privado/Grupo/Guilda. Moeda: Zens.
- /guilda, /g, /grupo, /p, /amigo (locais; sem servidor de jogo ainda).
- ESC nao pausa; tela de entrada nordica; novos efeitos sonoros; sem visual inicial de classe.

## v150
- Bosses viram "[MVP] Nome" (Nidhwerikr segue como boss mundial). Nascem em ponto aleatório do mapa (longe da entrada e da zona segura) e renascem em 1 a 3 h (2 h ±1 h), também em local aleatório.

## v149
- Mapa-múndi (M): janela grande; 70 pontos para os mapas reais de caça, agrupados por reino. Passar o mouse mostra nome do mapa, nível recomendado e os monstros (com nível e ★ para boss).

## v148
- Pesos lógicos por item (automáticos por tipo/material: ferro/aço pesado, algodão/seda leve, poções e flechas quase nada; peso sobe um pouco com o nível). Capacidade de carga ajustada (300 + FOR*25 + nível*8).
- Conferido: aprendiz que muda de classe já recebe a arma inicial da classe; itens exigem nível e tipo de arma da classe.

## v147
- Estátua do boss mundial (Nidh-WERIK-r) refeita: serpente de pedra enrolada sobre pedestal, com pescoço erguido e olhos brilhantes (substitui o colosso na variante da serpente).

## v146
- Pet: menor (80%), agora entra na ordenação de profundidade (fica atrás do personagem quando está atrás) e Shift+botão direito no chão manda o pet para lá (ele fica até você se afastar).

## v145
- Animais das cidades maiores e só em algumas (cães/gatos/corvos/abutres por cidade, 6 por cidade); abutre novo (Eldvik/Helvik). Pássaros da fonte raros e aleatórios. Bancos em grupos de 2–3 ao redor do centro.

## v144
- Montaria agora é habilidade passiva na janela de Habilidades (Alt+S), concedida automaticamente a Espadachins; botão Montar/Desmontar ali. NPC Montaria só entrega a montaria (sem gastar ponto).

## v143
- Isenborg: novos modelos de trenó e renas (nariz vermelho brilhante) nos quarteirões de gelo/brinquedos; NPC Papai Noel (Guardião do Inverno) na praça.

## v142
- Eldvik: sem chuva, sem palmeiras, árvores mortas, sem oásis (cidade devastada). Freyrhain: sem pavimento, só grama, sem postes/estandartes/bancos.

## v141
- Cada cidade com centro próprio (só Midgard mantém a fonte): Ravnhaven farol, Isenborg árvore de Natal gigante, Eldvik monumento, Kharnheim torre do relógio, Freyrhain totem, Gladsheim torre de mago, Skogvik pagode, Handelsvik obelisco, Solvik ombrelone, Helvik cripta. Bancos acompanham o tamanho do centro.
- Isenborg: árvores de Natal removidas das ruas/quarteirões.

## v140
- Cidades: removidos postes/carroças/feno/bancos/braseiros e árvores/pedras que ficavam sobrepostos a casas, forjas, tendas, etc. ou em cima de NPCs (~150 sobreposições a menos por cidade).

## v139
- Portais de mapas de caça: lado de retorno (topo/direita) e de seguir viagem (baixo/direita) variam por mapa, com chegada alinhada ao portal do mapa vizinho. Corrigida a chegada em Brumaforte/Passo de Jötunheim (x errado).

## v138
- Mapas de monstros: sem estátuas/monumentos/colossos/castelos/igrejas/casas (segredos e mundial intactos); árvores 1,15–1,65x com variação por posição.

## v137
- Escala: personagem/NPCs/pet a 74%; monstros por tamanho (pequeno 0.62, médio 0.78, grande 0.96, gigante 1.2), bosses 1.5x+ (Jormungand inalterado). Árvores e cenário passam a ser bem maiores que o personagem.

## v136
- Alt+Z: janela do grupo (criador ★, nível, sua vida; membros com mapa/próximo/offline; criar, sair, expulsar, dissolver).
- NPC Utilidades (todas as cidades, abaixo da praça): Poção Vermelha 20%, Laranja 35% (nv12), Branca 55% (nv30), Azul 30% mana (nv10), Asa de Mosca, Asa de Borboleta, flechas (ferro, prata, fogo, vento, gelo, pedra), hidromel e infusão. Compra e venda de qualquer item.
- Asa de Mosca: teletransporta no mapa; Asa de Borboleta: volta ao Check Point. Morango (restaura mana) dropa de alguns monstros de floresta.
- Curandeira (Midgard): cura 100% de vida e mana, Bênção (+15% DES) e Agilidade (+50% velocidade) por 10 min; recarga de 3 min.
- Elemento Vento adicionado (forte contra terra).

## v135 (visuais)
- Todos os 34 visuais de cabeça/rosto/boca agora aparecem no personagem e no provador (gorro, guirlanda, bandana, chapéu de pena, coroas, óculos, tapa-olho, lenço/cachecol, máscaras, barba, capuz).
- Gelatina Saltitante continua visível sentado e aparece (animada) no provador.

## v134 (interface)
- Barra de habilidades F1–F9 no topo (vazia até você colocar algo); F11 abre/fecha 2ª barra (teclas 1–0, abaixo da principal); F10 esconde/mostra o chat; F12 esconde/mostra missões; Alt+V esconde/mostra informações básicas.
- Vida dos monstros: barrinha verde embaixo do monstro com o número em branco no meio, diminui ao tomar dano.
- Alt+Q: sem botão Remover; equipamentos ao redor do personagem (duplo clique desequipa); opção "mostrar meus equipamentos a outros jogadores".
- Alt+E: abas Consumíveis / Equipáveis / Outros. Alt+S: habilidades em grade horizontal.
- Drops: cartas 0,01–0,02%, equipamentos 0,1–1%, comuns 5–25%, teto 90%. EXP base 1x.
- Sem avisos de clima/dia/noite; nome da cidade/mapa só na primeira visita.

## v133
- Tela de título (e de login) com fundo estilo anime: lua, aurora, ponte Bifrost arco-íris, ilha de Asgard, barco viking, Yggdrasil luminosa, folhas, vaga-lumes, estrela cadente e parallax com o mouse. Respeita "reduzir movimento".

## v58 — Boss mundial, NPCs livres e marcos
- **Jörmungandr (boss mundial)**: evento mensal (dia 15, 20h, local), dura 5h. 10 min antes aparece aviso; 20s antes começa rock pesado, a tela treme cada vez mais e uma bola de fogo desce do céu; no impacto: clarão, onda de choque, tremor forte em qualquer mapa e título "JÖRMUNGANDR DESPERTOU". Banner no topo com HP compartilhado e botão grátis "Ir até Jörmungandr" para a Cratera.
- HP compartilhado via Supabase (`wb_sync`, soma o dano de todos + "Einherjar" simulados); sem internet vira HP local.
- Arena `wb_cratera` (oculta) com serpente 3D procedural, ataques e recompensas.
- NPCs de cidade andam de forma aleatória (alvos, pausas e velocidades próprias) dentro das ruas.
- Novos marcos 3D: igreja, castelo, monumento rúnico, forja grande, colosso/estátua, dirigível — em ~30 mapas e nas 7 cidades.
- Debug: `?debug` → `__wb.forceIn(segundos)` dispara o evento.

## v54
- Cada habilidade tem som próprio: altura e timbre variam conforme a cor/efeito da skill.

## v55
- 3s de calma ao entrar num mapa antes de os monstros atacarem.
- Fonte das cidades gigante, com água caindo, ondas e pássaros que voam e bebem.
- Braseiros, fogueiras e forjas acendem à noite como os postes; cruzes das lápides viradas para cima.
- Eventos aleatórios: um por janela de 5h, em horário aleatório.
- Botão direito numa habilidade (painel L) mostra seus bônus.
- Novo slot "Costas": capas, aljavas e asas só aparecem quando equipadas (9 itens, obtidos em quests de visual).

## v56
- Login/conta por e-mail e senha (conta local do navegador; a 1ª conta herda os saves antigos). Saves separados por conta.
- Criação de personagem com sexo masculino/feminino (feminino: cabelo longo e silhueta mais fina).
- Sem neblina no clima.
- Cidades com layouts diferentes (espelhamento, praças, muralhas, ruas e bairros temáticos), mesmas dimensões.
- Painéis (inventário, atributos, habilidades, etc.) compactos e organizados.
- Barra de vida sobre a cabeça removida.

## v57
- Contas na nuvem (Supabase): cadastro com e-mail e senha, aprovação pelo administrador (1ª conta = admin), progresso salvo na conta e disponível em qualquer aparelho.
- Menu "Administração" para aprovar/bloquear contas.

## v57.1
- Se o servidor não responder, a tela de login oferece "Jogar offline (sem conta)".

## v57.2
- Login pausado (AUTH_ON = false em src/game.js). Código, conta e banco continuam prontos para reativar.

## v59
- 7 classes (Espadachim, Mercador, Arqueiro, Mago, Noviço, Gatuno, Thay), estátuas aleatórias (anjo, Bafomé, Morroc, serpente), cidades reorganizadas, NPCs desviam da fonte, iluminação sem escurecer
- @afk nas cidades principais, Ctrl+C abre janela de mensagem privada

## v60
- Estruturas fixas ao girar a câmera
- Bancos maiores, clique para sentar
- Casas maiores com modelos diferentes (ala, torre, varanda, 2º andar)
- NPCs andam de forma aleatória o tempo todo
- Visual por classe e por evolução (ombreiras, capas, asas, aura, elmos)

## v61
- Custo dos atributos oculto
- Cidades preenchidas: ferrarias, mercados, casas, jardins e acampamentos nos espaços vazios
- Barracas e caixas dentro das casas removidas

## v62
- Câmera travada em visão reta: casas, barracas e chão alinhados e fixos (sem rotação)

## v63
- Câmera volta a girar; casas, barracas e objetos ficam retos e com orientação fixa

## v64
- Giro 360 da câmera: construções giram junto com o chão, ancoradas no próprio centro

## v65
- Casas de 2 e 3 andares, mais espaço entre casas, barracas removidas da frente das casas

## v66
- Muralhas e torres gigantes; bancos menores com ponto de sentar (sem sentar automático); menos barracas; casas em grade regular

## v67
- Runas de Werik (5 cidades, conquista e título), partículas ambientais por tema, torres translúcidas quando ocultam o personagem, ajuda de comandos

## v68
- Câmera (giro, inclinação e zoom) lembrada ao sair e voltar
- Nível 99: aura ÉPICA (anéis, pilares de luz, orbes, halo, asas de luz, brilho dourado e faíscas)

## v69
- Estátuas variadas (anjo, Bafomé, Morroc, serpente) espalhadas nas cidades com lore
- Mercador com maça/martelo próprios
- Ferreiros com brasas e faíscas, moradores comentam clima e hora

## v79 (teste 3D toon)
- Sprites agora renderizados em GL com sombra em faixas, contorno limpo, cores vivas e sem filtro pixel.
- Voltar ao estilo anterior: abra com ?old ou localStorage eldvar.t3=0.

## v80
- Estilo antigo (v78) volta a ser o padrao. Toon GL fica opcional com ?t3.

## v81
- Modo realista 2.5D (iluminacao suave, sem faixas, contorno discreto) como padrao; ?old = v78, ?toon = desenho animado.

## v82
- Estilo HD-2D (Octopath): sprites pixel, desfoque tilt-shift, bloom, grade quente/frio. ?old = v78 puro.

## v83
- Volta ao codigo da v72 (visual anterior aos filtros pixel/HD-2D). v82 guardada na tag v82-hd2d.

## v84
- Armas so aparecem ao atacar; arco fica nas costas do cacador; mercador usa mochila.

## v85
- Novo desenhista de personagens pixel-art detalhado (5 direcoes, andar, ataque). ?old = sprites antigos.
- v86: teletransporte gratuito e apenas para cidades.
- v87: cabelo espetado largo, placa de aco no peito, cores mais vivas nos sprites.
- v88: sem espetos; cada classe com penteado, porte e jeito de sentar proprios.
- v89: visual evolui por classe: novato simples, 2a classe com couro/ombreiras, final com placa de aco, dourado e capa.
- v90: NPCs com visual proprio: ferreiros (avental, barba, martelo), mercadora (saco, avental, lenco), Munin (orbe e corvo), guardas (lanca e escudo), cronista, arauto, questora, estilista, Sigrun.
- v91: Aprendiz sem classe; Lider de Classe nas 7 cidades (escolha de classe no job 10, evolucao no job 50); renascimento no nivel 99 (volta ao 1, tiers 3-5, job 10 e 50 de novo). Barba do ferreiro menor.
- v92: NPCs com nome da funcao; minimapa com icones e legenda por funcao; Teletransportador gratis com lista das 7 cidades; visual especial do renascido (aureola, gema, asas, brilho).
- v93: asas de pena no renascido; ciclo de andar corrigido; monstros (lobos, javali, yeti, gosma, Hati) em pixel art no mesmo estilo dos personagens.
- v94: login desligado temporariamente (AUTH_ON=false) para testes.
- v95: Aprendiz começa com Faca de Aprendiz + Camisa de Algodão; efeito de anjo abençoando + pop-up ao subir de nível (base e classe); ao morrer renasce no centro da cidade mais próxima (Check Point não define mais o respawn de morte).
- v96: NPCs andantes removidos (só fixos); bonecos ~42% menores; cabeças em formato oval natural (nem redondas nem quadradas); cidades preenchidas com casas alinhadas, monumentos, estátuas, chafarizes, jardins, bancos, lampiões e árvores; legenda do minimapa removida (ícones dos NPCs ficam no mapa).
- v97: 11 cidades principais com identidade própria: Midgard (capital), Ravnhaven (porto + Arena), Gladsheim (Torre Arcana), Skogvik (vila das copas, pagodes), Eldvik (deserto: pirâmide e esfinge), Handelsvik (porto mercante, docas e navios), Kharnheim (relógio e canais), Solvik (praia tropical e festas), Freyrhain (selva tribal, totens e cabanas), Isenborg (vila de inverno, árvores de Natal e fábrica de brinquedos), Helvik (cidade dos mortos, criptas). 19 monumentos 3D novos, 4 temas novos (areia, tropical, madeira, mortos), 4 cidades novas ligadas aos mapas e ao teleporte.
- v98: monstros humanoides/bosses (goblin, draugr, cinder, autômato, silvano, prisma, sentinela, voidling, jotun) redesenhados em pixel-art 3D.
- v99: personagens sentam de verdade no chão (quadril no solo, pernas à frente, por classe).
- v100: Ultimate de classe no nível 99 (tecla U / botão ★): 5 ondas de impacto + nova final, 90s de recarga, invulnerável 2,4s; nome próprio por classe.
- v101: minigames nas cidades (/dados, /corrida, /pescar+/puxar), pet seguidor (/pet), montaria de lobo +40% velocidade (/montaria); ajuda atualizada.
- v102: montaria visual (personagem montado no lobo, tecla V); serpente com espinhos dorsais; ultimate com padrão próprio por classe.
- v103: pet ataca monstros próximos (a cada 1,8s); juba do Berserker com mechas e topo arredondado; mapa-múndi conferido.
- v104: catálogo de monstros (/catalogo, marcos 10/50/100/500, +5% dano aos 100); eventos Yule (dezembro) e Caçada Selvagem (noite); clima com efeito (neblina +5% EXP, chuva +5% drops); tutorial inicial em 4 passos (/tutorial); cães, gatos e corvos nas cidades; som de ultimate.
- v105: janela dos minigames (/jogos: dados, corrida animada, pesca, cozinha); pesca dá peixes e /cozinhar faz pratos de cura; /casar (+3% EXP), /abracar /brindar /danca; /caminho (nível 70, 2 especializações por classe); 12 monstros novos espalhados pelos mapas de caça.
- v106: NPC Mestre dos Jogos (abre a janela dos minigames) e NPC Montaria (nordeste de toda cidade; só Berserker adota o lobo e monta/desmonta); menu do pet com botão direito (atributos, renomear 1 vez, brincar com animação); lobo de guerra com nível/EXP/ataque; visual montado com o lobo à frente nas 5 direções; mensagens dessas funções só no chat; removidos /pet, /montaria e a tecla V.
- v107: emotes viram ícones pixel-art (37, /emotes); montaria agora é um GRIFO (asas, bico, garras); estátuas de Bafomé trocadas por Jesus Cristo (braços abertos, auréola).
- v108: nome do pet só ao passar o mouse (sem nível); telhados na cor da casa; NPC Montaria entrega a montaria (grifo); visual inicial Gelatina Saltitante (não descartável/vendável); clicar no NPC abre o diálogo de qualquer distância; estátuas refeitas (figuras humanas: guerreiro, rei nórdico, anjo, Cristo).
- v109: pet (lobo, NPC Mestre dos Jogos) e montaria (grifo, NPC Montaria, só Berserker) separados; montaria ataca junto (dano só do personagem); cenário dos mapas de caça alinhado em pomares com corredores; aviso de item (ícone + nome) no topo da tela.
- v110: Gelatina Saltitante agora pula continuamente na cabeça (animada).
- v111: /montar, /desmontar e /pet; montaria e pet permanecem até o comando (inclusive após sair do jogo).
- v112: Gelatina Saltitante 28% menor.
- v113: gelatina no topo da cabeça e acompanha a câmera (frente/lado/costas); estátuas Morroc e guerreiro refeitas no mesmo estilo.
- v114: montaria agora é o Corvo de Guerra (ave gigante nórdica, design original); gelatina ajustada.

## v115
- Montaria: senta junto com o personagem; exige a habilidade Montaria (NPC Montaria); portal de saída devolve ao mesmo portal de entrada.
- Estátuas só em algumas cidades; visual aparece no inventário e no Alt+Q; quests só no Alt+G; Alt+C substitui Ctrl+C.
- Cada cidade ganhou traçado e marcos próprios (anel, porto, zigue-zague, dunas, forja, espiral, colunata, jardim, feira, sol, cemitério).

## v116
- Ao falar com um NPC o personagem fica parado (sem andar/atacar/cliques de movimento) até fechar o diálogo.
- Estilista: cor da roupa também tinge a montaria; 50 cortes de cabelo (curtos e longos: coques, tranças, rabos, moicano, afro, dreads...); sobrancelhas e olhos acompanham a cor do cabelo.
- Inventário: "Largar no chão" (itens caem à frente do personagem, sem recolher na hora); duplo clique equipa (inventário) e desequipa (Alt+Q).
- Janelas Alt+Q/E/S/A/G reduzidas a 50%.
- Sons por espécie de monstro (lobo, javali, goblin, morto-vivo, gigante, gelatina, lagarto, máquina, pedra, vazio, planta): voz ociosa, ao notar o jogador, ao ser atingido e ao morrer; volume por distância.

## v132 (integridade)
- Servidor valida cada save da nuvem: rejeita nível fora de 1–99, Zens negativos/absurdos e atributos fora de 0–99; marca como suspeito (sem perder o save) orçamento de atributos impossível, EXP fora da faixa, Zens > 50M, item de tier acima do nível equipado/na mochila e salto de nível > 20 em < 1h.
- Registro de auditoria (marcos de nível, flags novas, saves rejeitados) e painel no menu de admin com saves suspeitos e últimos eventos.
- Menos consultas: multiplayer reduz a frequência quando o personagem está parado e sozinho no mapa.

## v131 (servidor estilo RO)
- Guildas e grupos agora vivem no servidor: criar, convidar, aceitar/recusar, sair, expulsar, dissolver; líder transferido ao sair; limites (guilda 30, grupo 12); chat privado /g e /p entre membros; lista com status online.
- Bônus de grupo: +10% de EXP por membro do grupo no mesmo mapa/canal (até +50%).
- Canais por mapa: até 30 jogadores por canal, divisão automática (Canal 2, 3...).
- /quem mostra jogadores online; /denunciar NOME motivo envia à moderação.
- Painel de moderação no menu de admin: denúncias, silenciar, banir, liberar; silenciados/banidos barrados no chat e presença.

## v130 (servidor)
- Multiplayer: presença e chat só aceitam o dono do nick (anti-personificação); limite de 1 atualização por 0,6s, coordenadas validadas, mensagens repetidas bloqueadas.
- Boss mundial: dano por chamada limitado a 0,25% da vida, 1 chamada de dano a cada 3s por jogador, janela de tempo e vida máxima validadas, simulação limitada (corrige brecha que permitia matar o boss de uma vez).
- Saves na nuvem: backup automático dos 5 últimos estados por slot (1 a cada 5 min) e validação de slot/formato.
- Aviso quando o nick do personagem já pertence a outro jogador.

## v129
- Removida a mensagem "habilidade pronta" ao armar uma skill.
- Novo NPC "Teste de Visuais" (todas as cidades): provador de cortes, cores, chapéus, rosto, boca, costas, armas e cor da roupa — só prévia, nada é equipado nem gasto.
- Nicks únicos: reservados no servidor (tabela nicks + claim_nick/release_nick); nick repetido é recusado na criação; apagar o personagem libera o nick. Offline permite criar e reserva ao reconectar.
- IA: ~30% dos monstros são agressivos e o resto passivo (só reage se atacado); ajuda em grupo agora é rara (20%) e só para o tipo "assist".

## v128
- Ícones: equipamentos de tier ganham cor própria por tier (aço, ciano, brasa, ouro, violeta...) e pontinhos de tier no canto; cartas têm 6 emblemas diferentes (olho, caveira, estrela, chama, gema, escudo) em cores variadas.

## v127
- Dificuldade nível 25–99: monstros comuns perdem até ~70% de vida e ~22% de ataque em escala (antes ~16–28s por monstro; agora ~9–10s só com ataque básico); chefes aliviados de forma mais leve.

## v123–v126
- Ofício (Alt+F): profissões de forja/alquimia/culinária com receitas e nível de ofício.
- Crônicas dos Reinos: missões encadeadas por reino, visíveis só no Alt+G.
- Alt+A: botão de distribuição automática de atributos por classe.
- Novos eventos de clima/hora; popups removidos (exceto confirmação de refino).
- Sons de ambiente por bioma/cidade/noite (vento, grilos, fogo, forja, cristais, vazio).

## v122 — Fisionomia feminina
- Personagens femininas: tronco e ombros mais estreitos, cintura marcada, saia com barra rosa, busto discreto, rosto mais fino com cílios e lábios.
- NPCs femininas (Eira, Ylva, Estilista, Bruna, Sigrún) usam o corpo feminino.
- "Novato" virou "Aprendiz".

## v120 — Seleção e criação de personagem
- Tela de seleção estilo clássico: 3 molduras com setas (10 slots), aba "Selecionado", tabela de status, del/OK/cancelar (apagar sem popup).
- Criação: prévia girando, nome, sexo, cabelo (por gênero) e cor, status iniciais.

## v119 — Interface
- Cabelos masculinos/femininos separados no estilista.
- Janelas Alt+Q/E/S/A/G 70% maiores.
- Inventário: sem painel de info ao clicar (info ao passar o mouse); arraste qualquer item para fora da janela para largar; duplo clique equipa/usa.
- Itens no chão somem em 20s.
- Habilidades dependentes ficam cinzas até liberar; lista Alt+S vertical.
- F1–F12 armam a habilidade; clique no alvo/chão conjura (botão direito/Esc cancela).
- Alt+C abre e fecha. 10 slots de personagem na horizontal (nuvem também).

## v118 — Conteúdo nível 40–99
- 4 reinos novos (20 mapas) depois do Coração da Ruptura: Jarnvid, Hvergelmir, Valhalla Caída e Vigrid.
- 16 monstros novos (4 elites) e 4 chefes: Fenrir, Garm, Surtr e Loki.
- Escada de equipamentos nível 16–96 (11 tiers × 8 armas, armadura, anel, amuleto) com bônus de conjunto (2 e 3 peças).
- 21 cartas novas, poções nobres/valhalla/yggdrasil, materiais e troféus de chefe.
- Drops de equipamento em todos os monstros, taxas baixas.

## v117
- Menu de pausa: teclado funcionando (↑/↓ + Enter, C continuar, S salvar, M voltar ao menu inicial); removido o popup de confirmação que bloqueava o botão.
- Montaria: /montar exige linhagem Espadachim/Berserker.
- Boss mundial Nidhwerikr refeito e 5× maior: massa de corpo com olhos que seguem o jogador, braços humanos, costelas/espinhos de osso, boca radial de lampreia com 3 anéis de dentes e tentáculos com olhos; arena ampliada (4000×3000) e câmera mais afastada na cratera.
- Balanceamento: monstros comuns +55% vida / +30% ataque / +12% defesa; chefes +35% vida / +25% ataque; EXP −50% (chefes −55%); zens −45%; drops −45% (chefes −20%); chance de equipamento/cartas ~−45%. Alvo: luta comum 4–9 s com ~50% da vida perdida; chefes exigem poções e habilidades.
