// O sorteio que sempre sai igual: a mesma semente dá os mesmos números, na mesma ordem, em
// qualquer computador. É por isso que o treino da sua casa sai igual ao da aula.

/** Devolve uma função que, a cada chamada, dá um número de 0 a 1 (a conta se chama mulberry32). */
function criaSorteio(semente) {
  let estado = semente >>> 0;
  return function sorteia() {
    estado = (estado + 0x6d2b79f5) >>> 0;
    let mistura = estado;
    mistura = Math.imul(mistura ^ (mistura >>> 15), mistura | 1);
    mistura ^= mistura + Math.imul(mistura ^ (mistura >>> 7), mistura | 61);
    return ((mistura ^ (mistura >>> 14)) >>> 0) / 4294967296;
  };
}

/** Um número entre `minimo` e `maximo`. */
function sorteiaEntre(sorteia, minimo, maximo) {
  return minimo + (maximo - minimo) * sorteia();
}
