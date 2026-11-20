// O cérebro: uma rede neural pequena.
// Por dentro ela só multiplica e soma.
// Os números dos sensores passam por uma camada
// de neurônios no meio e chegam num neurônio de
// saída, que responde uma coisa só: pula ou não.

const NEURONIOS_NO_MEIO = 4;

/** Um neurônio novo: um peso pra cada número
 *  que ele recebe, e o limite dele. */
function sorteiaNeuronio(quantosRecebe, sorteia) {
  const pesos = [];
  for (let qual = 0; qual < quantosRecebe; qual++) {
    const peso = sorteiaEntre(sorteia, -1, 1);
    pesos.push(peso);
  }
  const limite = sorteiaEntre(sorteia, -1, 1);
  return { pesos, limite };
}

/** Um cérebro novo, tudo sorteado: não sabe nada. */
function sorteiaCerebro(sorteia) {
  const quantosSensores = NOMES_DOS_SENSORES.length;
  const noMeio = NEURONIOS_NO_MEIO;
  const meio = [];
  for (let qual = 0; qual < noMeio; qual++) {
    const novo = sorteiaNeuronio(quantosSensores, sorteia);
    meio.push(novo);
  }
  const saida = sorteiaNeuronio(noMeio, sorteia);
  return { meio, saida };
}

/** Multiplica cada número pelo peso e soma tudo.
 *  Passou do limite, acende (1). */
function acende(neuronio, numeros) {
  let soma = 0;
  for (let qual = 0; qual < numeros.length; qual++) {
    const peso = neuronio.pesos[qual];
    const parcela = numeros[qual] * peso;
    soma += parcela;
  }
  if (soma > neuronio.limite) return 1;
  return 0;
}

/** A decisão: os números passam pelo meio, e o
 *  neurônio de saída diz se o robô pula. */
function decidePular(cerebro, numeros) {
  const respostasDoMeio = [];
  for (const neuronio of cerebro.meio) {
    const resposta = acende(neuronio, numeros);
    respostasDoMeio.push(resposta);
  }
  const saida = acende(cerebro.saida, respostasDoMeio);
  return saida === 1;
}
