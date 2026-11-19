# A máquina aprende a jogar · o jogo

O jogo do curso vem pronto num arquivo zip: [a-maquina-aprende.zip](a-maquina-aprende.zip) (uns 30 KB).
Clique nele e, na página do arquivo, no botão de baixar (Download raw file, a setinha pra baixo, em cima, à direita). Ele vai pra pasta Downloads.

Extraia o zip (botão direito no arquivo, Extrair Tudo). Dentro vem a pasta a-maquina-aprende. Pra jogar, dê dois cliques em a-maquina-aprende.html: abre no navegador, sem instalar nada.

- Barra de espaço (ou seta pra cima): o robô pula. Enter recomeça.
- Tecla J: você joga. Tecla T: a máquina treina (a turma de 500 robôs entra na pista). Os botões da página fazem o mesmo.
- Teclas 1, 2 e 3: a pressa do treino (1, 4 e 16 vezes mais rápido).

Dentro da pasta:
- jogo: os nove arquivos do jogo. Vêm prontos e o curso não mexe neles.
- treinamento: olhos.js, cerebro.js e evolucao.js. É aqui que o curso acontece.
- letras: a letra Bebas Neue, de Dharma Type, com a licença dela (OFL.txt, SIL Open Font License 1.1).

Quer só ler o código? Ele está aberto aqui, na pasta [a-maquina-aprende](a-maquina-aprende/).

O sorteio do treino sai sempre igual (semente 12): sem mexer em nada, você deve ver a mesma história das aulas. Mexeu numa conta do treinamento, a história muda.

## Módulo 2: o jogo de cada aula

No módulo 2, cada aula muda uma coisa só no jogo. O jogo de cada aula vem pronto, num zip igual ao de cima, com a mudança já feita; o resto é o mesmo jogo.

- [2.01 · O jogo mais rápido](2.01-o-jogo-mais-rapido.zip): a velocidade máxima passa de 20 pra 30, no topo de jogo/partida.js. O código aberto está na pasta [2.01-o-jogo-mais-rapido](2.01-o-jogo-mais-rapido/).
- [2.02 · O pássaro](2.02-o-passaro.zip): 2 em cada 10 obstáculos viram um pássaro, que voa de 100 a 160 do chão (jogo/pista.js, com o desenho dele), e a batida passa a olhar o vão embaixo (jogo/corredor.js). O código aberto está na pasta [2.02-o-passaro](2.02-o-passaro/).
- [2.03 · O pulo duplo](2.03-o-pulo-duplo.zip): um segundo pulo no ar, de graça, a partir do 6º passo do primeiro (jogo/corredor.js). O código aberto está na pasta [2.03-o-pulo-duplo](2.03-o-pulo-duplo/).
- [2.04 · O pulo que custa](2.04-o-pulo-que-custa.zip): em cima do pulo duplo, cada pulo gasta 25 de energia; o robô começa com 100, sem 25 não pula, e a energia volta meio ponto por passo (jogo/corredor.js). Quando é você que joga, a energia aparece no placar. O código aberto está na pasta [2.04-o-pulo-que-custa](2.04-o-pulo-que-custa/).
- [2.05 · O olho do próprio pulo](2.05-o-olho-do-proprio-pulo.zip): em cima do pulo que custa, um quarto olho em treinamento/olhos.js, a altura do próprio robô dividida por 100 (zero no chão); o cérebro ganha sozinho um peso a mais em cada neurônio do meio. A energia aparece no placar quando é você que joga. O código aberto está na pasta [2.05-o-olho-do-proprio-pulo](2.05-o-olho-do-proprio-pulo/).
