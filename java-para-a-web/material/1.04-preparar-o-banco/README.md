# Java para a Web, aula 1.04: Preparar o banco · material

O que a aula manda copiar, na ordem em que aparece no vídeo. Cada bloco tem o botão de copiar no canto de cima, à direita.

## As dez e o WHERE

Copie o bloco de cinco pelo botão de copiar (no canto do bloco). No Query Tool, Ctrl+A, Ctrl+V e F5. Resposta: INSERT 0 5.

```sql
INSERT INTO tarefas (titulo, prioridade, concluida) VALUES
('Instalar o VS Code', 3, true),
('Ver o Olá, mundo no navegador', 3, true),
('Instalar o PostgreSQL', 1, true),
('Criar a tabela de tarefas', 2, true),
('Ligar o LabApp ao banco', 1, false);
```

## A volta das dez

Copie o comando das dez pelo botão de copiar (no canto do bloco). No Query Tool, Ctrl+A, Ctrl+V e F5. Resposta: INSERT 0 10.

```sql
INSERT INTO tarefas (titulo, prioridade, concluida) VALUES
('Estudar Java', 1, false),
('Instalar o Tomcat', 2, true),
('Montar a interface do LabApp', 3, false),
('Instalar o Java', 1, true),
('Escrever o primeiro programa', 2, true),
('Instalar o VS Code', 3, true),
('Ver o Olá, mundo no navegador', 3, true),
('Instalar o PostgreSQL', 1, true),
('Criar a tabela de tarefas', 2, true),
('Ligar o LabApp ao banco', 1, false);
```
