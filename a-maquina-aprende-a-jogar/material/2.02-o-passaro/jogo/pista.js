// A pista: a fila de caixotes que vem na direção do robô e o chão que corre.
// Cada caixote tem um lugar fixo no mundo. O que anda é a rolagem (quantos pixels o mundo já
// andou). Na tela, um caixote aparece em: posição dele menos a rolagem.

const CHAO = 560;
const PRIMEIRO_CAIXOTE = 1100;
const PASSOS_ENTRE_CAIXOTES = { minimo: 60, maximo: 105 };
const CAIXOTES_PRONTOS_A_FRENTE = 4000;
const CAIXOTES_GUARDADOS_ATRAS = 400;

function criaPista(semente) {
  return { sorteia: criaSorteio(semente), caixotes: [], proximaPosicao: PRIMEIRO_CAIXOTE, proximoNumero: 1 };
}

/** Um obstáculo novo: caixote baixo e largo, alto e estreito (3 em cada 10) ou um pássaro no ar, de 100 a 160 do chão (2 em cada 10). */
function sorteiaCaixote(pista) {
  const tipo = pista.sorteia();
  const ehAlto = tipo < 0.3;
  const ehPassaro = tipo > 0.8;
  const caixote = {
    numero: pista.proximoNumero,
    posicao: pista.proximaPosicao,
    largura: ehAlto ? 46 : Math.round(sorteiaEntre(pista.sorteia, 44, 60)),
    altura: ehPassaro ? 160 : ehAlto ? Math.round(sorteiaEntre(pista.sorteia, 100, 130)) : Math.round(sorteiaEntre(pista.sorteia, 52, 70)),
    base: ehPassaro ? 100 : 0,
  };
  pista.proximoNumero += 1;
  return caixote;
}

/**
 * Põe caixotes novos lá na frente e joga fora os que já ficaram pra trás. O vão entre dois
 * caixotes cresce junto com a velocidade, pra sempre dar tempo de pousar e pular de novo.
 */
function renovaCaixotes(pista, rolagem, velocidade) {
  while (pista.proximaPosicao < rolagem + CAIXOTES_PRONTOS_A_FRENTE) {
    pista.caixotes.push(sorteiaCaixote(pista));
    const passosAteOProximo = sorteiaEntre(pista.sorteia, PASSOS_ENTRE_CAIXOTES.minimo, PASSOS_ENTRE_CAIXOTES.maximo);
    pista.proximaPosicao += Math.round(velocidade * passosAteOProximo);
  }
  while (pista.caixotes[0].posicao < rolagem - CAIXOTES_GUARDADOS_ATRAS) pista.caixotes.shift();
}

/** O primeiro caixote que ainda não ficou pra trás do ponto `posicaoNoMundo`. */
function proximoCaixote(pista, posicaoNoMundo) {
  return pista.caixotes.find((caixote) => caixote.posicao + caixote.largura > posicaoNoMundo);
}

/** A linha do chão e os risquinhos que correm pra esquerda, pra dar a sensação de velocidade. */
function desenhaChao(ctx, rolagem) {
  ctx.fillStyle = CORES.cinza;
  ctx.fillRect(0, CHAO, TELA.largura, 3);
  ctx.fillStyle = 'rgba(141, 133, 124, 0.45)';
  const passo = 90;
  const deslize = rolagem % passo;
  for (let x = -deslize; x < TELA.largura; x += passo) {
    ctx.fillRect(x, CHAO + 16, 26, 3);
    ctx.fillRect(x + 48, CHAO + 32, 12, 3);
  }
}

/** Os caixotes que estão dentro da tela agora. */
function desenhaCaixotes(ctx, pista, rolagem) {
  for (const caixote of pista.caixotes) {
    const x = caixote.posicao - rolagem;
    const estaNaTela = x < TELA.largura && x + caixote.largura > 0;
    if (estaNaTela) desenhaCaixote(ctx, x, caixote);
  }
}

const COR_DA_ASA = '#3f9c83';

/**
 * O pássaro: o corpo ocupa o lugar dele no ar (de `base` até `altura`, contados do chão), a cabeça e
 * o bico do lado de onde vem o robô, a asa batendo conforme ele anda pela tela e a sombra no chão,
 * pra mostrar o vão embaixo. Tudo dentro da largura dele, que é o que conta na batida.
 */
function desenhaPassaro(ctx, x, passaro) {
  const meio = CHAO - (passaro.altura + passaro.base) / 2;
  const batidaDaAsa = Math.sin(x / 18);
  ctx.save();
  ctx.fillStyle = 'rgba(74, 68, 64, 0.55)';
  ctx.beginPath();
  ctx.ellipse(x + passaro.largura / 2, CHAO - 2, passaro.largura / 2, 4, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = CORES.menta;
  ctx.beginPath();
  ctx.ellipse(x + passaro.largura / 2 + 3, meio + 6, passaro.largura / 2 - 3, 13, 0, 0, Math.PI * 2);
  ctx.arc(x + 15, meio, 10, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = CORES.ambar;
  ctx.beginPath();
  ctx.moveTo(x + 7, meio - 4);
  ctx.lineTo(x, meio + 1);
  ctx.lineTo(x + 7, meio + 5);
  ctx.fill();
  ctx.fillStyle = CORES.tinta;
  ctx.beginPath();
  ctx.arc(x + 12, meio - 2, 2.5, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = COR_DA_ASA;
  ctx.beginPath();
  ctx.moveTo(x + passaro.largura / 2 - 6, meio + 4);
  ctx.lineTo(x + passaro.largura / 2 + 16, meio + 4);
  ctx.lineTo(x + passaro.largura / 2 + 8, meio + 4 - 24 * batidaDaAsa);
  ctx.fill();
  ctx.restore();
}

/** O obstáculo da vez: o caixote no chão ou, quando ele tem vão embaixo (`base`), o pássaro. */
function desenhaCaixote(ctx, x, caixote) {
  if (caixote.base) {
    desenhaPassaro(ctx, x, caixote);
    return;
  }
  const y = CHAO - caixote.altura;
  pintaCaixa(ctx, x, y, caixote.largura, caixote.altura, { raio: 5, fundo: '#3b2a1f', borda: CORES.ambar, espessura: 3 });
  ctx.save();
  ctx.strokeStyle = 'rgba(230, 180, 80, 0.55)';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(x + 6, y + 6);
  ctx.lineTo(x + caixote.largura - 6, CHAO - 6);
  ctx.moveTo(x + caixote.largura - 6, y + 6);
  ctx.lineTo(x + 6, CHAO - 6);
  ctx.stroke();
  ctx.restore();
}
