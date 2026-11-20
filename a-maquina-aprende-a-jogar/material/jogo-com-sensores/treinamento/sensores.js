// Os sensores: o que o robô mede do jogo.
// Ele não vê a tela como a gente. A cada passo,
// os sensores medem três coisas, e é só com
// esses três números que o cérebro decide.
// Até a aula 2.05 este arquivo se chamava
// olhos.js. O que ele faz é o mesmo.

const NOMES_DOS_SENSORES = [
  'distância',
  'altura',
  'velocidade',
];

/** Os três números que o cérebro recebe. */
function leOsSensores(partida, corredor) {
  const pista = partida.pista;
  const caixote = caixoteDaVez(corredor, pista);
  const metadeDoRobo = ROBO.largura / 2;
  const frente = corredor.posicao + metadeDoRobo;
  const falta = caixote.posicao - frente;
  const distancia = Math.max(0, falta);
  // Cada número é dividido pra ficar perto
  // de 1: assim nenhum manda só por ser grande.
  return [
    distancia / 1000,
    caixote.altura / 100,
    partida.velocidade / 10,
  ];
}
