// O robozinho que corre: cabeça com visor e um olho, antena, corpo e duas pernas que alternam.
// É desenhado com o pé no chão: `x` é o meio dele e `chao` é a linha onde o pé pisa.

const ROBO = { largura: 52, altura: 84 };
const PASSADAS_POR_SEGUNDO = 3.2;

/**
 * `pose`: { x, chao, altura (acima do chão), tempo (move as pernas), escala, cor, noAr,
 * caiu (0 a 1), alfa }. `caiu` tomba o robô pra trás e apaga a cor.
 */
function desenhaRobo(ctx, pose) {
  const { x, chao, altura = 0, escala = 1, alfa = 1, caiu = 0 } = pose;
  if (alfa <= 0) return;
  ctx.save();
  ctx.globalAlpha *= alfa * (1 - 0.55 * caiu);
  ctx.translate(x, chao - altura);
  ctx.scale(escala, escala);
  ctx.rotate(-1.1 * limita(caiu));
  desenhaPernas(ctx, pose);
  desenhaCorpo(ctx, pose);
  desenhaCabeca(ctx, pose);
  ctx.restore();
}

function corDoCorpo(pose) {
  return pose.caiu > 0 ? CORES.cinza : (pose.cor ?? CORES.creme);
}

function desenhaPernas(ctx, pose) {
  const estaParado = pose.noAr || pose.caiu > 0;
  const balanco = estaParado ? 0.35 : Math.sin(pose.tempo * PASSADAS_POR_SEGUNDO * Math.PI * 2);
  ctx.strokeStyle = CORES.cinzaEscuro;
  ctx.lineWidth = 7;
  ctx.lineCap = 'round';
  for (const lado of [-1, 1]) {
    const passada = pose.noAr ? lado * 6 : balanco * lado * 10;
    const dobra = pose.noAr ? -8 : 0;
    ctx.beginPath();
    ctx.moveTo(lado * 9, -26);
    ctx.lineTo(lado * 9 + passada, -4 + dobra);
    ctx.stroke();
  }
}

function desenhaCorpo(ctx, pose) {
  pintaCaixa(ctx, -20, -54, 40, 30, { raio: 8, fundo: corDoCorpo(pose) });
  pintaCaixa(ctx, -8, -46, 16, 6, { raio: 3, fundo: CORES.coral });
}

function desenhaCabeca(ctx, pose) {
  desenhaAntena(ctx);
  pintaCaixa(ctx, -26, -88, 52, 34, { raio: 10, fundo: corDoCorpo(pose) });
  pintaCaixa(ctx, -18, -80, 38, 18, { raio: 6, fundo: CORES.tinta });
  ctx.fillStyle = pose.caiu > 0 ? CORES.cinzaEscuro : CORES.menta;
  ctx.beginPath();
  ctx.arc(9, -71, 5, 0, Math.PI * 2);
  ctx.fill();
}

function desenhaAntena(ctx) {
  ctx.strokeStyle = CORES.cinzaEscuro;
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(4, -86);
  ctx.lineTo(4, -98);
  ctx.stroke();
  ctx.fillStyle = CORES.coral;
  ctx.beginPath();
  ctx.arc(4, -101, 5, 0, Math.PI * 2);
  ctx.fill();
}
