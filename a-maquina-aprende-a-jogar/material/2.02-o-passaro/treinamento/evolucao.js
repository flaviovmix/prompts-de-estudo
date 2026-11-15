// A evolução: a turma inteira joga junta, e quem vai mais longe vira o molde da próxima geração.
// Ninguém ensina a pular. A gente só mede quem foi melhor, copia e muda um pouquinho.

const TAMANHO_DA_TURMA = 500;
const QUANTOS_MELHORES_FICAM = 25;
const TAMANHO_DA_MUTACAO = 0.2;
const CAIXOTES_PRA_ZERAR = 100;
const SEMENTE_DO_TREINO = 12;
const ESPALHAMENTO_DA_TURMA = 130;
const PAUSA_ENTRE_GERACOES = 45;
const CORES_DA_TURMA = [CORES.creme, CORES.coral, CORES.menta, CORES.ambar, '#9fb7ff', '#d9a6ff', '#ff9fc3', '#a8e27a'];

/** O treino começa na geração 1, com quinhentos cérebros sorteados. */
function comecaTreino() {
  const sorteia = criaSorteio(SEMENTE_DO_TREINO);
  const treino = { sorteia, geracao: 1, turma: sorteiaTurma(sorteia), partida: null, melhorDeCadaGeracao: [] };
  treino.partida = poeATurmaNaPista(treino);
  return treino;
}

function sorteiaTurma(sorteia) {
  const turma = [];
  for (let indice = 0; indice < TAMANHO_DA_TURMA; indice++) {
    turma.push(sorteiaCerebro(sorteia));
  }
  return turma;
}

/** Uma partida nova com um robô pra cada cérebro da turma, espalhados pra aparecerem como multidão. */
function poeATurmaNaPista(treino) {
  const corredores = treino.turma.map((cerebro, indice) => {
    const lugar = LUGAR_DO_ROBO + sorteiaEntre(treino.sorteia, -ESPALHAMENTO_DA_TURMA, ESPALHAMENTO_DA_TURMA);
    const corredor = criaCorredor(lugar, CORES_DA_TURMA[indice % CORES_DA_TURMA.length]);
    corredor.cerebro = cerebro;
    return corredor;
  });
  return criaPartida(treino.geracao, corredores);
}

/** Um passo do treino: a turma decide, o jogo anda e, quando a geração acaba, nasce a próxima. */
function avancaTreino(treino) {
  turmaDecide(treino.partida);
  avancaPartida(treino.partida);
  if (acabouAGeracao(treino.partida)) comecaProximaGeracao(treino);
}

/** A geração acaba quando o último robô bate, ou quando alguém pula todos os caixotes da pista. */
function acabouAGeracao(partida) {
  const todosBateram = partida.passosParada >= PAUSA_ENTRE_GERACOES;
  const alguemZerou = caixotesDoMelhor(partida) >= CAIXOTES_PRA_ZERAR;
  return todosBateram || alguemZerou;
}

function comecaProximaGeracao(treino) {
  treino.melhorDeCadaGeracao.push(caixotesDoMelhor(treino.partida));
  treino.turma = criaProximaTurma(escolheOsMelhores(treino.partida.corredores), treino.sorteia);
  treino.geracao += 1;
  treino.partida = poeATurmaNaPista(treino);
}

/** Cada robô de pé olha o jogo, pensa e, se o cérebro mandar, pula. */
function turmaDecide(partida) {
  for (const corredor of partida.corredores) {
    if (corredor.bateu) continue;
    const entrada = olha(partida, corredor);
    if (decidePular(corredor.cerebro, entrada)) mandaPular(corredor);
  }
}

/** Os cérebros de quem foi mais longe, do melhor pro pior. */
function escolheOsMelhores(corredores) {
  const doMelhorProPior = [...corredores].sort((um, outro) => outro.posicao - um.posicao);
  return doMelhorProPior.slice(0, QUANTOS_MELHORES_FICAM).map((corredor) => corredor.cerebro);
}

/** A turma nova: os melhores continuam como são, e o resto são cópias deles com mutação. */
function criaProximaTurma(melhores, sorteia) {
  const turma = [...melhores];
  while (turma.length < TAMANHO_DA_TURMA) {
    const molde = melhores[turma.length % melhores.length];
    turma.push(copiaComMutacao(molde, sorteia));
  }
  return turma;
}

/** A cópia de um cérebro, com um empurrãozinho sorteado em cada peso e em cada limite. */
function copiaComMutacao(cerebro, sorteia) {
  return {
    meio: cerebro.meio.map((neuronio) => mudaUmPouco(neuronio, sorteia)),
    saida: mudaUmPouco(cerebro.saida, sorteia),
  };
}

function mudaUmPouco(neuronio, sorteia) {
  const empurra = (numero) => numero + sorteiaEntre(sorteia, -TAMANHO_DA_MUTACAO, TAMANHO_DA_MUTACAO);
  return { pesos: neuronio.pesos.map(empurra), limite: empurra(neuronio.limite) };
}
