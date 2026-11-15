// O cérebro: uma rede neural pequena. Por dentro ela só multiplica e soma.
// Os números da entrada passam por uma camada de neurônios no meio e chegam num neurônio de
// saída, que responde uma coisa só: pula ou não pula.

const NEURONIOS_NO_MEIO = 4;

/** Um neurônio novo: um peso sorteado pra cada número que ele recebe, e o limite dele. */
function sorteiaNeuronio(quantosNumerosRecebe, sorteia) {
  const pesos = [];
  for (let indice = 0; indice < quantosNumerosRecebe; indice++) {
    pesos.push(sorteiaEntre(sorteia, -1, 1));
  }
  return { pesos, limite: sorteiaEntre(sorteia, -1, 1) };
}

/** Um cérebro novo, com tudo sorteado: ele ainda não sabe nada. */
function sorteiaCerebro(sorteia) {
  const meio = [];
  for (let indice = 0; indice < NEURONIOS_NO_MEIO; indice++) {
    meio.push(sorteiaNeuronio(NOMES_DA_ENTRADA.length, sorteia));
  }
  return { meio, saida: sorteiaNeuronio(NEURONIOS_NO_MEIO, sorteia) };
}

/** Multiplica cada número pelo peso e soma tudo. Passou do limite, acende (1). */
function acende(neuronio, numeros) {
  let soma = 0;
  for (let indice = 0; indice < numeros.length; indice++) {
    soma += numeros[indice] * neuronio.pesos[indice];
  }
  return soma > neuronio.limite ? 1 : 0;
}

/** A decisão: a entrada passa pelos neurônios do meio, e o de saída diz se o robô pula. */
function decidePular(cerebro, entrada) {
  const respostasDoMeio = cerebro.meio.map((neuronio) => acende(neuronio, entrada));
  return acende(cerebro.saida, respostasDoMeio) === 1;
}
