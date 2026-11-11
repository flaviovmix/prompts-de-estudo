# Java para a Web, aula 1.05: Ligar o banco · material

O que a aula manda copiar, na ordem em que aparece no vídeo. Cada bloco tem o botão de copiar no canto de cima, à direita.

## A conexão

Escreva as sete linhas da conexão, uma de cada vez. Se preferir, copie pelo botão de copiar (no canto do bloco) e cole na linha 2 com Ctrl+V.

```jsp
<%@ page import="java.sql.*" %>
<%
  Class.forName("org.postgresql.Driver");
  Connection conexao = DriverManager.getConnection(
      "jdbc:postgresql://localhost:5432/labapp", "postgres", "SUA_SENHA");
  Statement consulta = conexao.createStatement();
%>
```

## As abertas e o laço

A seção inteira fica assim. Se preferir, copie pelo botão de copiar (no canto do bloco) e cole por cima da seção das Abertas do jeito que ela estava, da linha 36 à 64.

```jsp
    <section class="lista-de-tarefas" aria-labelledby="titulo-abertas">
      <h2 id="titulo-abertas">Abertas</h2>
      <ul>
<%
  ResultSet abertas = consulta.executeQuery("SELECT * FROM tarefas WHERE concluida = false;");
  while (abertas.next()) {
    int id = abertas.getInt("id");
    String titulo = abertas.getString("titulo");
    int prioridade = abertas.getInt("prioridade");
    String nomeDaPrioridade = "baixa";
    if (prioridade == 1) nomeDaPrioridade = "alta";
    if (prioridade == 2) nomeDaPrioridade = "media";
%>
        <li class="cartao-da-tarefa prioridade-<%= nomeDaPrioridade %>">
          <form method="get" class="marcar-feita">
            <input type="hidden" name="acao" value="concluir">
            <input type="hidden" name="id" value="<%= id %>">
            <button type="submit" class="marca-de-feita" aria-label="Concluir: <%= titulo %>"></button>
          </form>
          <span class="titulo-da-tarefa"><%= titulo %></span>
          <div class="acoes-da-tarefa">
            <button type="button" class="botao botao-pequeno" data-abre="janela-editar" data-id="<%= id %>" data-titulo="<%= titulo %>" data-prioridade="<%= prioridade %>">Editar</button>
            <button type="button" class="botao botao-pequeno botao-perigo" data-abre="janela-excluir" data-id="<%= id %>" data-titulo="<%= titulo %>">Excluir</button>
          </div>
        </li>
<% } %>
      </ul>
    </section>
```

## As concluídas e o fechamento

A seção inteira fica assim. Se preferir, copie pelo botão de copiar (no canto do bloco) e cole por cima da seção das Concluídas do jeito que ela estava, da linha 65 à 81.

```jsp
    <section class="lista-de-tarefas" aria-labelledby="titulo-concluidas">
      <h2 id="titulo-concluidas">Concluídas</h2>
      <ul>
<%
  ResultSet concluidas = consulta.executeQuery("SELECT * FROM tarefas WHERE concluida = true;");
  while (concluidas.next()) {
    int id = concluidas.getInt("id");
    String titulo = concluidas.getString("titulo");
    int prioridade = concluidas.getInt("prioridade");
    String nomeDaPrioridade = "baixa";
    if (prioridade == 1) nomeDaPrioridade = "alta";
    if (prioridade == 2) nomeDaPrioridade = "media";
%>
        <li class="cartao-da-tarefa prioridade-<%= nomeDaPrioridade %> feita">
          <form method="get" class="marcar-feita">
            <input type="hidden" name="acao" value="reabrir">
            <input type="hidden" name="id" value="<%= id %>">
            <button type="submit" class="marca-de-feita" aria-label="Reabrir: <%= titulo %>"></button>
          </form>
          <span class="titulo-da-tarefa"><%= titulo %></span>
          <div class="acoes-da-tarefa">
            <button type="button" class="botao botao-pequeno" data-abre="janela-editar" data-id="<%= id %>" data-titulo="<%= titulo %>" data-prioridade="<%= prioridade %>">Editar</button>
            <button type="button" class="botao botao-pequeno botao-perigo" data-abre="janela-excluir" data-id="<%= id %>" data-titulo="<%= titulo %>">Excluir</button>
          </div>
        </li>
<% } %>
      </ul>
    </section>
```
