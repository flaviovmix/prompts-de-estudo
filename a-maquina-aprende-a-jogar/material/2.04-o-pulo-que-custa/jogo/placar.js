// O placar: tudo o que se lê por cima do jogo. Os números grandes, os recados, o painel da
// entrada (o que o robô enxerga) e, no treino, o gráfico com o melhor de cada geração.

const MARGEM = 48;
const VAO_ENTRE_NUMEROS = 170;
const CAIXA_DA_ENTRADA = { x: 892, y: 36, largura: 340 };
const CAIXA_DO_GRAFICO = { x: 540, y: 36, largura: 324, altura: 176 };
const CORES_DA_ENTRADA = [CORES.coral, CORES.ambar, CORES.menta];
const GERACOES_NO_GRAFICO = 30;
const LETRA_DO_ROTULO = { letra: LETRAS.codigo, tamanho: 18, cor: CORES.cinza, espaco: 4, estilo: 'bold' };

/** O placar de quando é você que joga. */
function desenhaPlacarDaPartida(ctx, partida, recorde, estaNaLargada) {
  const corredor = partida.corredores[0];
  desenhaNumeroGrande(ctx, 'CAIXOTES', corredor.caixotesPulados, 0);
  desenhaNumeroGrande(ctx, 'RECORDE', recorde, 1);
  desenhaNumeroGrande(ctx, 'ENERGIA', Math.floor(corredor.energia), 2);
  if (estaNaLargada) desenhaRecado(ctx, 'ESPAÇO PRA COMEÇAR', 'o robô pula com ESPAÇO ou com a seta pra cima', CORES.papel);
  if (corredor.bateu) desenhaRecado(ctx, 'BATEU!', 'ENTER pra recomeçar', CORES.coral);
}

/** O placar de quando a máquina treina. */
function desenhaPlacarDoTreino(ctx, treino, pressa) {
  const dePe = treino.partida.corredores.filter((corredor) => !corredor.bateu).length;
  desenhaNumeroGrande(ctx, 'GERAÇÃO', treino.geracao, 0);
  desenhaNumeroGrande(ctx, 'DE PÉ', dePe, 1);
  desenhaNumeroGrande(ctx, 'CAIXOTES', caixotesDoMelhor(treino.partida), 2);
  escreve(ctx, `TREINO ${pressa}×`, MARGEM, 204, { ...LETRA_DO_ROTULO, cor: CORES.ambar });
  desenhaGraficoDasGeracoes(ctx, treino.melhorDeCadaGeracao);
}

/** Um número grande com o nome em cima. `coluna` é a ordem dele, da esquerda pra direita. */
function desenhaNumeroGrande(ctx, rotulo, valor, coluna) {
  const x = MARGEM + coluna * VAO_ENTRE_NUMEROS;
  escreve(ctx, rotulo, x, 64, LETRA_DO_ROTULO);
  escreve(ctx, String(valor), x, 156, { tamanho: 96, cor: CORES.papel });
}

function desenhaRecado(ctx, grande, pequeno, cor) {
  escreve(ctx, grande, TELA.largura / 2, 340, { tamanho: 92, cor, alinhamento: 'center', espaco: 2 });
  escreve(ctx, pequeno, TELA.largura / 2, 384, { letra: LETRAS.codigo, tamanho: 22, cor: CORES.papel, alinhamento: 'center', alfa: 0.8 });
}

/** O painel da entrada: os números que os olhos (treinamento/olhos.js) entregam agora. */
function desenhaPainelDaEntrada(ctx, partida) {
  const corredor = partida.corredores.find((candidato) => !candidato.bateu) ?? partida.corredores[0];
  const entrada = olha(partida, corredor);
  const caixa = { ...CAIXA_DA_ENTRADA, altura: 62 + entrada.length * 38 };
  pintaCaixa(ctx, caixa.x, caixa.y, caixa.largura, caixa.altura, { raio: 16, fundo: 'rgba(13, 10, 9, 0.85)', borda: CORES.papel });
  escreve(ctx, 'ENTRADA', caixa.x + 24, caixa.y + 38, { ...LETRA_DO_ROTULO, cor: CORES.papel });
  entrada.forEach((numero, indice) => {
    const y = caixa.y + 84 + indice * 38;
    const cor = CORES_DA_ENTRADA[indice % CORES_DA_ENTRADA.length];
    escreve(ctx, NOMES_DA_ENTRADA[indice], caixa.x + 24, y, { letra: LETRAS.codigo, tamanho: 22, cor: CORES.papel });
    escreve(ctx, comVirgula(numero), caixa.x + caixa.largura - 24, y, { letra: LETRAS.codigo, tamanho: 26, cor, alinhamento: 'right', estilo: 'bold' });
  });
}

/** O número com duas casas e vírgula, como a gente escreve. */
function comVirgula(numero) {
  return numero.toFixed(2).replace('.', ',');
}

/** Uma barra pra cada geração que já acabou: a altura é quantos caixotes o melhor pulou. */
function desenhaGraficoDasGeracoes(ctx, melhorDeCadaGeracao) {
  const caixa = CAIXA_DO_GRAFICO;
  const ultimas = melhorDeCadaGeracao.slice(-GERACOES_NO_GRAFICO);
  const maior = Math.max(10, ...ultimas);
  const larguraDaBarra = (caixa.largura - 48) / GERACOES_NO_GRAFICO;
  const base = caixa.y + caixa.altura - 22;
  pintaCaixa(ctx, caixa.x, caixa.y, caixa.largura, caixa.altura, { raio: 16, fundo: 'rgba(13, 10, 9, 0.85)', borda: CORES.cinzaEscuro });
  escreve(ctx, 'O MELHOR DE CADA GERAÇÃO', caixa.x + 24, caixa.y + 38, { ...LETRA_DO_ROTULO, tamanho: 14, espaco: 1 });
  ultimas.forEach((caixotes, indice) => {
    const altura = Math.max(2, (caixotes / maior) * (caixa.altura - 84));
    ctx.fillStyle = caixotes >= CAIXOTES_PRA_ZERAR ? CORES.menta : CORES.ambar;
    ctx.fillRect(caixa.x + 24 + indice * larguraDaBarra, base - altura, larguraDaBarra - 3, altura);
  });
  if (ultimas.length > 0) escreve(ctx, String(ultimas[ultimas.length - 1]), caixa.x + caixa.largura - 24, caixa.y + 40, { letra: LETRAS.codigo, tamanho: 20, cor: CORES.coral, alinhamento: 'right', estilo: 'bold' });
}
