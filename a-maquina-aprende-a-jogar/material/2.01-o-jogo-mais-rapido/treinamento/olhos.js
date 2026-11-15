// Os olhos: o que o robô enxerga do jogo.
// Ele não vê a tela como a gente. A cada passo ele recebe três números, e é só com eles que o
// cérebro decide se pula. Cada número é dividido pra ficar perto de 1: assim nenhum pesa mais
// que os outros só por ser grande.

const NOMES_DA_ENTRADA = ['distância', 'altura', 'velocidade'];

/** A entrada do cérebro: a distância até o caixote, a altura dele e a velocidade. */
function olha(partida, corredor) {
  const caixote = caixoteDaVez(corredor, partida.pista);
  const frenteDoRobo = corredor.posicao + ROBO.largura / 2;
  const distancia = Math.max(0, caixote.posicao - frenteDoRobo);
  return [distancia / 1000, caixote.altura / 100, partida.velocidade / 10];
}
