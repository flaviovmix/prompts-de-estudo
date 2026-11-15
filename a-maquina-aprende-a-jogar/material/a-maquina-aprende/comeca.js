// Liga tudo: guarda quem está jogando (você ou a máquina), roda o jogo 60 passos por segundo e
// manda desenhar. É o último arquivo que a página carrega, porque usa todos os outros.

const PASSOS_POR_SEGUNDO = 60;
const MAIS_SEGUNDOS_POR_QUADRO = 0.1;

const tela = document.querySelector('.jogo-tela');
const ctx = tela.getContext('2d');
const botoesDeModo = document.querySelectorAll('.modos-botao');
const botoesDePressa = document.querySelectorAll('.pressa-botao');

const jogo = {
  modo: 'eu',
  partida: null,
  estaNaLargada: true,
  recorde: 0,
  treino: null,
  pressa: 1,
  passosDevidos: 0,
  ultimoQuadro: null,
};

// ---------- quem joga ----------

function comecaPartidaMinha() {
  jogo.modo = 'eu';
  jogo.partida = criaPartida(Date.now(), [criaCorredor(LUGAR_DO_ROBO, CORES.creme)]);
  jogo.estaNaLargada = true;
  marcaBotoes();
}

/** O treino começa na primeira vez; depois, voltar pra ele continua de onde parou. */
function mostraOTreino() {
  jogo.modo = 'maquina';
  if (jogo.treino === null) jogo.treino = comecaTreino();
  marcaBotoes();
}

function pulaOuLarga() {
  if (jogo.modo !== 'eu') return;
  if (jogo.estaNaLargada) jogo.estaNaLargada = false;
  else mandaPular(jogo.partida.corredores[0]);
}

function recomeca() {
  if (jogo.modo === 'eu') comecaPartidaMinha();
}

function mudaPressa(pressa) {
  jogo.pressa = pressa;
  marcaBotoes();
}

// ---------- os botões da página ----------

function marcaBotoes() {
  for (const botao of botoesDeModo) botao.setAttribute('aria-pressed', String(botao.dataset.modo === jogo.modo));
  for (const botao of botoesDePressa) botao.setAttribute('aria-pressed', String(Number(botao.dataset.pressa) === jogo.pressa));
}

/** Depois do clique o botão solta o foco, pra tecla ESPAÇO voltar a ser só do pulo. */
function ligaBotoes() {
  for (const botao of botoesDeModo) {
    botao.addEventListener('click', () => {
      if (botao.dataset.modo === 'eu') comecaPartidaMinha();
      else mostraOTreino();
      botao.blur();
    });
  }
  for (const botao of botoesDePressa) {
    botao.addEventListener('click', () => {
      mudaPressa(Number(botao.dataset.pressa));
      botao.blur();
    });
  }
}

// ---------- o laço do jogo ----------

function avancaUmPasso() {
  if (jogo.modo === 'maquina') {
    avancaTreino(jogo.treino);
    return;
  }
  if (jogo.estaNaLargada) return;
  avancaPartida(jogo.partida);
  jogo.recorde = Math.max(jogo.recorde, jogo.partida.corredores[0].caixotesPulados);
}

function desenhaQuadro() {
  const partida = jogo.modo === 'maquina' ? jogo.treino.partida : jogo.partida;
  desenhaCena(ctx, partida);
  if (jogo.modo === 'maquina') desenhaPlacarDoTreino(ctx, jogo.treino, jogo.pressa);
  else desenhaPlacarDaPartida(ctx, partida, jogo.recorde, jogo.estaNaLargada);
  desenhaPainelDaEntrada(ctx, partida);
}

/**
 * Um quadro da tela. O jogo não anda "um passo por quadro": ele conta quanto tempo passou e dá
 * os passos que cabem nesse tempo. Assim a corrida tem a mesma velocidade em qualquer monitor.
 */
function rodaQuadro(agora) {
  const segundos = jogo.ultimoQuadro === null ? 0 : Math.min(MAIS_SEGUNDOS_POR_QUADRO, (agora - jogo.ultimoQuadro) / 1000);
  const pressa = jogo.modo === 'maquina' ? jogo.pressa : 1;
  jogo.ultimoQuadro = agora;
  jogo.passosDevidos += segundos * PASSOS_POR_SEGUNDO * pressa;
  while (jogo.passosDevidos >= 1) {
    avancaUmPasso();
    jogo.passosDevidos -= 1;
  }
  desenhaQuadro();
  requestAnimationFrame(rodaQuadro);
}

ligaTeclado({
  pular: pulaOuLarga,
  recomecar: recomeca,
  euJogo: comecaPartidaMinha,
  aMaquinaTreina: mostraOTreino,
  pressa1: () => mudaPressa(1),
  pressa4: () => mudaPressa(4),
  pressa16: () => mudaPressa(16),
});
ligaBotoes();
comecaPartidaMinha();
requestAnimationFrame(rodaQuadro);
