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
