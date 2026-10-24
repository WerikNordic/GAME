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
