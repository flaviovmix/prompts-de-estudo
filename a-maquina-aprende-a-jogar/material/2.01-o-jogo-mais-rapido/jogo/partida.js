// A partida: o mundo andando. A cada passo o mundo anda `velocidade` pixels, a velocidade sobe
// um pouquinho e cada corredor dá o passo dele. Quando ninguém mais está de pé, o mundo para.

const VELOCIDADE = { inicial: 8.7, maxima: 30, aumento: 0.004 };

/** `semente` sorteia a pista; `corredores` é quem vai correr nela (um robô ou a turma inteira). */
function criaPartida(semente, corredores) {
  const partida = {
    pista: criaPista(semente),
    corredores,
    rolagem: 0,
    velocidade: VELOCIDADE.inicial,
    passos: 0,
    passosParada: 0,
  };
  renovaCaixotes(partida.pista, partida.rolagem, partida.velocidade);
  return partida;
}

function temAlguemDePe(partida) {
  return partida.corredores.some((corredor) => !corredor.bateu);
}

/** Um passo do jogo inteiro. */
function avancaPartida(partida) {
  if (temAlguemDePe(partida)) andaOMundo(partida);
  else partida.passosParada += 1;
  for (const corredor of partida.corredores) avancaCorredor(corredor, partida);
}

/** O mundo anda `velocidade` pixels, e a velocidade sobe um pouquinho, até a máxima. */
function andaOMundo(partida) {
  partida.passos += 1;
  partida.rolagem += partida.velocidade;
  partida.velocidade = Math.min(VELOCIDADE.maxima, partida.velocidade + VELOCIDADE.aumento);
  renovaCaixotes(partida.pista, partida.rolagem, partida.velocidade);
}

/** Quantos caixotes pulou o corredor que foi mais longe nesta partida. */
function caixotesDoMelhor(partida) {
  return partida.corredores.reduce((maior, corredor) => Math.max(maior, corredor.caixotesPulados), 0);
}
