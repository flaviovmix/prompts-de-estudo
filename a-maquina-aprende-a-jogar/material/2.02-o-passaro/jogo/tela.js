// A tela: desenha um quadro do jogo, do fundo pra frente: o fundo, o chão, os caixotes e os robôs.

const MAIS_ROBOS_QUE_DESENHO = 150;
const ESCALA_NA_TURMA = 0.82;
const PASSOS_PRA_SUMIR = 130;

function desenhaCena(ctx, partida) {
  pintaFundo(ctx);
  desenhaChao(ctx, partida.rolagem);
  desenhaCaixotes(ctx, partida.pista, partida.rolagem);
  desenhaCorredores(ctx, partida);
}

/** Quem caiu vai por baixo e quem está de pé vai por cima. Numa turma grande, só uma parte aparece. */
function desenhaCorredores(ctx, partida) {
  const ehTurma = partida.corredores.length > 1;
  const caidos = partida.corredores.filter((corredor) => corredor.bateu && aindaAparece(corredor, partida, ehTurma));
  const dePe = partida.corredores.filter((corredor) => !corredor.bateu).slice(0, MAIS_ROBOS_QUE_DESENHO);
  for (const corredor of [...caidos, ...dePe]) desenhaCorredor(ctx, corredor, partida, ehTurma);
}

/** Na turma, quem bateu fica pra trás e some aos poucos. Sozinho, o robô caído fica na tela. */
function aindaAparece(corredor, partida, ehTurma) {
  const estaNaTela = corredor.posicao - partida.rolagem > -80;
  return estaNaTela && (!ehTurma || corredor.passosCaido < PASSOS_PRA_SUMIR);
}

function desenhaCorredor(ctx, corredor, partida, ehTurma) {
  const tombo = limita(corredor.passosCaido / PASSOS_DO_TOMBO);
  const sumico = ehTurma ? corredor.passosCaido / PASSOS_PRA_SUMIR : 0;
  desenhaRobo(ctx, {
    x: corredor.posicao - partida.rolagem,
    chao: CHAO,
    altura: corredor.altura * (1 - tombo),
    noAr: corredor.passosNoAr !== null,
    caiu: tombo,
    tempo: partida.passos / 60,
    cor: corredor.cor,
    escala: ehTurma ? ESCALA_NA_TURMA : 1,
    alfa: (ehTurma ? 0.85 : 1) * (1 - sumico),
  });
}
