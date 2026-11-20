// A evolução: a turma inteira joga junta, e quem
// vai mais longe vira o molde da próxima geração.
// Ninguém ensina a pular. A gente só mede quem
// foi melhor, copia e muda um pouquinho.

const TAMANHO_DA_TURMA = 500;
const QUANTOS_MELHORES_FICAM = 25;
const TAMANHO_DA_MUTACAO = 0.2;
const CAIXOTES_PRA_ZERAR = 100;
const SEMENTE_DO_TREINO = 12;
const ESPALHAMENTO_DA_TURMA = 130;
const PAUSA_ENTRE_GERACOES = 45;
const CORES_DA_TURMA = [
  CORES.creme, CORES.coral, CORES.menta, CORES.ambar,
  '#9fb7ff', '#d9a6ff', '#ff9fc3', '#a8e27a',
];

/** O treino começa na geração 1, com quinhentos
 *  cérebros sorteados. */
function comecaTreino() {
  const sorteia = criaSorteio(SEMENTE_DO_TREINO);
  const turma = sorteiaTurma(sorteia);
  const treino = {
    sorteia,
    geracao: 1,
    turma,
    partida: null,
    melhorDeCadaGeracao: [],
  };
  treino.partida = poeATurmaNaPista(treino);
  return treino;
}

function sorteiaTurma(sorteia) {
  const turma = [];
  for (let qual = 0; qual < TAMANHO_DA_TURMA; qual++) {
    const cerebro = sorteiaCerebro(sorteia);
    turma.push(cerebro);
  }
  return turma;
}

/** Uma partida nova com um robô pra cada cérebro,
 *  espalhados pra aparecerem como multidão. */
function poeATurmaNaPista(treino) {
  const turma = treino.turma;
  const sorteia = treino.sorteia;
  const espalha = ESPALHAMENTO_DA_TURMA;
  const cores = CORES_DA_TURMA;
  const corredores = [];
  for (let qual = 0; qual < turma.length; qual++) {
    const desvio = sorteiaEntre(sorteia, -espalha, espalha);
    const lugar = LUGAR_DO_ROBO + desvio;
    const cor = cores[qual % cores.length];
    const corredor = criaCorredor(lugar, cor);
    corredor.cerebro = turma[qual];
    corredores.push(corredor);
  }
  return criaPartida(treino.geracao, corredores);
}

/** Um passo do treino: a turma decide, o jogo anda
 *  e, quando a geração acaba, nasce a próxima. */
function avancaTreino(treino) {
  turmaDecide(treino.partida);
  avancaPartida(treino.partida);
  if (acabouAGeracao(treino.partida)) {
    comecaProximaGeracao(treino);
  }
}

/** A geração acaba quando o último robô bate, ou
 *  quando alguém pula todos os caixotes. */
function acabouAGeracao(partida) {
  const parados = partida.passosParada;
  const todosBateram = parados >= PAUSA_ENTRE_GERACOES;
  const caixotes = caixotesDoMelhor(partida);
  const alguemZerou = caixotes >= CAIXOTES_PRA_ZERAR;
  return todosBateram || alguemZerou;
}

function comecaProximaGeracao(treino) {
  const caixotes = caixotesDoMelhor(treino.partida);
  treino.melhorDeCadaGeracao.push(caixotes);
  const corredores = treino.partida.corredores;
  const melhores = escolheOsMelhores(corredores);
  const sorteia = treino.sorteia;
  treino.turma = criaProximaTurma(melhores, sorteia);
  treino.geracao += 1;
  treino.partida = poeATurmaNaPista(treino);
}

/** Cada robô de pé lê os sensores, pensa e, se o
 *  cérebro mandar, pula. */
function turmaDecide(partida) {
  for (const corredor of partida.corredores) {
    if (corredor.bateu) continue;
    const numeros = leOsSensores(partida, corredor);
    const cerebro = corredor.cerebro;
    const querPular = decidePular(cerebro, numeros);
    if (querPular) mandaPular(corredor);
  }
}

/** Os cérebros de quem foi mais longe, do melhor
 *  pro pior. */
function escolheOsMelhores(corredores) {
  const fila = [...corredores];
  fila.sort((um, outro) => outro.posicao - um.posicao);
  const quantos = QUANTOS_MELHORES_FICAM;
  const primeiros = fila.slice(0, quantos);
  return primeiros.map((corredor) => corredor.cerebro);
}

/** A turma nova: os melhores continuam como são, e
 *  o resto são cópias deles com mutação. */
function criaProximaTurma(melhores, sorteia) {
  const turma = [...melhores];
  while (turma.length < TAMANHO_DA_TURMA) {
    const vez = turma.length % melhores.length;
    const molde = melhores[vez];
    const copia = copiaComMutacao(molde, sorteia);
    turma.push(copia);
  }
  return turma;
}

/** A cópia de um cérebro, com um empurrãozinho
 *  sorteado em cada peso e em cada limite. */
function copiaComMutacao(cerebro, sorteia) {
  const meio = [];
  for (const neuronio of cerebro.meio) {
    const mudado = mudaUmPouco(neuronio, sorteia);
    meio.push(mudado);
  }
  const saida = mudaUmPouco(cerebro.saida, sorteia);
  return { meio, saida };
}

function mudaUmPouco(neuronio, sorteia) {
  const pesos = [];
  for (const peso of neuronio.pesos) {
    const mudado = empurraUmPouco(peso, sorteia);
    pesos.push(mudado);
  }
  const limite = empurraUmPouco(neuronio.limite, sorteia);
  return { pesos, limite };
}

/** O número mais um empurrão sorteado,
 *  de -0,2 a 0,2. */
function empurraUmPouco(numero, sorteia) {
  const maximo = TAMANHO_DA_MUTACAO;
  const empurrao = sorteiaEntre(sorteia, -maximo, maximo);
  return numero + empurrao;
}
