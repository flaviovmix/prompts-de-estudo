// O corredor: um robô dentro da corrida. Ele só sabe fazer duas coisas: pular ou continuar
// correndo. Quem manda pular é o teclado (jogo/teclado.js) ou o cérebro
// (treinamento/cerebro.js); pro corredor tanto faz.
// O jogo anda em passos, 60 por segundo. Tudo aqui é contado em passos.

const LUGAR_DO_ROBO = 260;
const PULO = { passos: 37, altura: 170 };
const PASSOS_DO_TOMBO = 21;
const PASSOS_ANTES_DO_SEGUNDO_PULO = 6;

/** `lugarNaTela` é onde o robô corre, contado da beira esquerda da tela. */
function criaCorredor(lugarNaTela, cor) {
  return {
    lugarNaTela,
    cor,
    posicao: lugarNaTela,
    altura: 0,
    passosNoAr: null,
    alturaDaSaida: 0,
    usouOSegundoPulo: false,
    bateu: false,
    passosCaido: 0,
    caixotesPulados: 0,
  };
}

/** Pula do chão ou, uma vez só no ar (a partir do 6º passo do primeiro pulo), dá o segundo pulo, que sai da altura em que ele está. */
function mandaPular(corredor) {
  if (corredor.bateu) return;
  const estaNoChao = corredor.passosNoAr === null;
  if (estaNoChao) {
    corredor.passosNoAr = 0;
    corredor.alturaDaSaida = 0;
    corredor.usouOSegundoPulo = false;
  } else if (!corredor.usouOSegundoPulo && corredor.passosNoAr >= PASSOS_ANTES_DO_SEGUNDO_PULO) {
    corredor.passosNoAr = 0;
    corredor.alturaDaSaida = corredor.altura;
    corredor.usouOSegundoPulo = true;
  }
}

/** A altura do robô a cada passo do pulo: sobe, para lá em cima e desce (uma parábola). */
function alturaDoPulo(passosNoAr) {
  const progresso = passosNoAr / PULO.passos;
  return 4 * PULO.altura * progresso * (1 - progresso);
}

/** Um passo do corredor: acompanha o mundo, continua o pulo e confere se bateu. */
function avancaCorredor(corredor, partida) {
  if (corredor.bateu) {
    corredor.passosCaido += 1;
    return;
  }
  corredor.posicao = partida.rolagem + corredor.lugarNaTela;
  avancaPulo(corredor);
  const caixote = caixoteDaVez(corredor, partida.pista);
  corredor.caixotesPulados = caixote.numero - 1;
  corredor.bateu = encostouNoCaixote(corredor, caixote);
}

function avancaPulo(corredor) {
  if (corredor.passosNoAr === null) return;
  corredor.passosNoAr += 1;
  const altura = corredor.alturaDaSaida + alturaDoPulo(corredor.passosNoAr);
  const pousou = corredor.passosNoAr >= PULO.passos / 2 && altura <= 0;
  corredor.altura = pousou ? 0 : altura;
  if (pousou) corredor.passosNoAr = null;
}

/** O caixote que o robô ainda não deixou pra trás. */
function caixoteDaVez(corredor, pista) {
  const costasDoRobo = corredor.posicao - ROBO.largura / 2;
  return proximoCaixote(pista, costasDoRobo);
}

/** Bateu quando o robô está em cima do lugar do caixote e o pé dele está mais baixo que o caixote. */
function encostouNoCaixote(corredor, caixote) {
  const frenteDoRobo = corredor.posicao + ROBO.largura / 2;
  const chegouNoCaixote = frenteDoRobo > caixote.posicao;
  return chegouNoCaixote && corredor.altura < caixote.altura;
}
