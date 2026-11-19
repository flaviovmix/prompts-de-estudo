// O pincel: o tamanho da tela, as cores, as letras e os desenhos básicos que o jogo inteiro usa.
// São as mesmas cores das aulas: fundo de noite, coral, menta e âmbar.

const TELA = { largura: 1280, altura: 720 };

const CORES = {
  noite: '#0d0a09',
  brasa: '#2a1410',
  creme: '#efe9dd',
  tinta: '#191513',
  coral: '#e2614b',
  menta: '#63d2b0',
  ambar: '#e6b450',
  cinza: '#8d857c',
  cinzaEscuro: '#4a4440',
  papel: '#f4efe6',
};

const LETRAS = {
  titulo: '"Bebas Neue", Impact, sans-serif',
  codigo: '"Cascadia Mono", Consolas, monospace',
};

/** Segura um valor entre o mínimo e o máximo. */
function limita(valor, minimo = 0, maximo = 1) {
  return Math.min(maximo, Math.max(minimo, valor));
}

/** Escreve um texto. `opcoes`: letra, tamanho, cor, alinhamento, espaco (entre letras), alfa, estilo. */
function escreve(ctx, texto, x, y, opcoes = {}) {
  const { letra = LETRAS.titulo, tamanho = 60, cor = CORES.papel } = opcoes;
  const { alinhamento = 'left', espaco = 0, alfa = 1, estilo = '' } = opcoes;
  if (alfa <= 0) return;
  ctx.save();
  ctx.globalAlpha *= alfa;
  ctx.font = `${estilo} ${tamanho}px ${letra}`.trim();
  ctx.letterSpacing = `${espaco}px`;
  ctx.textAlign = alinhamento;
  ctx.textBaseline = 'alphabetic';
  ctx.fillStyle = cor;
  ctx.fillText(texto, x, y);
  ctx.restore();
}

/** Uma caixa de cantos redondos. `opcoes`: raio, fundo, borda, espessura. */
function pintaCaixa(ctx, x, y, largura, altura, opcoes = {}) {
  const { raio = 12, fundo = null, borda = null, espessura = 2 } = opcoes;
  ctx.beginPath();
  ctx.roundRect(x, y, largura, altura, raio);
  if (fundo) {
    ctx.fillStyle = fundo;
    ctx.fill();
  }
  if (borda) {
    ctx.strokeStyle = borda;
    ctx.lineWidth = espessura;
    ctx.stroke();
  }
}

/** O fundo escuro com um calor de brasa no meio e a grade fina por cima. */
function pintaFundo(ctx) {
  ctx.fillStyle = CORES.noite;
  ctx.fillRect(0, 0, TELA.largura, TELA.altura);
  const calor = ctx.createRadialGradient(640, 420, 40, 640, 420, 760);
  calor.addColorStop(0, CORES.brasa);
  calor.addColorStop(1, 'rgba(13, 10, 9, 0)');
  ctx.fillStyle = calor;
  ctx.fillRect(0, 0, TELA.largura, TELA.altura);
  pintaGrade(ctx);
}

function pintaGrade(ctx) {
  const passo = 64;
  ctx.save();
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.03)';
  ctx.lineWidth = 1;
  ctx.beginPath();
  for (let x = passo; x < TELA.largura; x += passo) {
    ctx.moveTo(x + 0.5, 0);
    ctx.lineTo(x + 0.5, TELA.altura);
  }
  for (let y = passo; y < TELA.altura; y += passo) {
    ctx.moveTo(0, y + 0.5);
    ctx.lineTo(TELA.largura, y + 0.5);
  }
  ctx.stroke();
  ctx.restore();
}
