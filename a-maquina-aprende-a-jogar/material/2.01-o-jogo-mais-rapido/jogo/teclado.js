// O teclado: quais teclas o jogo escuta e o que cada uma pede.
// Quem decide o que fazer com o pedido é o comeca.js; aqui só se traduz tecla em pedido.

const PEDIDO_DA_TECLA = {
  Space: 'pular',
  ArrowUp: 'pular',
  Enter: 'recomecar',
  KeyJ: 'euJogo',
  KeyT: 'aMaquinaTreina',
  Digit1: 'pressa1',
  Digit2: 'pressa4',
  Digit3: 'pressa16',
};

/** `pedidos` tem uma função pra cada pedido da lista de cima. */
function ligaTeclado(pedidos) {
  window.addEventListener('keydown', (evento) => {
    const pedido = PEDIDO_DA_TECLA[evento.code];
    if (!pedido) return;
    evento.preventDefault();
    pedidos[pedido]();
  });
}
