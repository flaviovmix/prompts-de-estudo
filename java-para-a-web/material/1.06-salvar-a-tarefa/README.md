# Java para a Web, aula 1.06: Salvar a tarefa · material

O que a aula manda copiar, na ordem em que aparece no vídeo. Cada bloco tem o botão de copiar no canto de cima, à direita.

## A classe da conexão

Escreva a classe, uma linha de cada vez, com a sua senha no lugar do SUA_SENHA, e Ctrl+S. Se preferir, copie pelo botão de copiar (no canto do bloco) e cole no arquivo vazio com Ctrl+V.

```java
package labapp;

import java.sql.*;

public class Banco {
  public static Connection abreConexao() throws Exception {
    Class.forName("org.postgresql.Driver");
    return DriverManager.getConnection(
        "jdbc:postgresql://localhost:5432/labapp", "postgres", "SUA_SENHA");
  }
}
```

## A página pede a conexão pronta

O alto do index.jsp fica assim. Se preferir, copie pelo botão de copiar (no canto do bloco) e cole por cima das linhas 2 a 8 do jeito que elas estavam, do java.sql até o %> da conexão.

```jsp
<%@ page import="java.sql.*" %>
<%@ page import="labapp.Banco" %>
<%
  Connection conexao = Banco.abreConexao();
  Statement consulta = conexao.createStatement();
%>
```

## O que o formulário manda

No VS Code, no fim da linha do Statement, Enter, e as cinco linhas que leem o endereço, uma de cada vez. Se preferir, copie pelo botão de copiar (no canto do bloco).

```java
  String acao = request.getParameter("acao");
  if ("nova".equals(acao)) {
    String titulo = request.getParameter("titulo");
    int prioridade = Integer.parseInt(request.getParameter("prioridade"));
  }
```

## O primeiro jeito: o título colado

No fim da linha da prioridade, dentro do if, Enter, e o INSERT da aula 4 com o título e a prioridade colados no texto. Se preferir, copie pelo botão de copiar (no canto do bloco).

```java
    consulta.executeUpdate("INSERT INTO tarefas (titulo, prioridade, concluida) VALUES ('" + titulo + "', " + prioridade + ", false);");
```

## O segundo jeito: os pontos de interrogação

Selecione a linha do executeUpdate inteira e escreva no lugar as quatro linhas, uma de cada vez. Se preferir, copie pelo botão de copiar (no canto do bloco) e cole por cima da linha selecionada.

```java
    PreparedStatement insere = conexao.prepareStatement("INSERT INTO tarefas (titulo, prioridade, concluida) VALUES (?, ?, false);");
    insere.setString(1, titulo);
    insere.setInt(2, prioridade);
    insere.executeUpdate();
```

## O F5 que grava de novo

O conserto: no VS Code, no fim da linha do insere.executeUpdate();, Enter, e:

```java
    response.sendRedirect("/labapp/");
```

## O sinal de menor no título

No VS Code, nas abertas, no fim da linha String titulo = abertas.getString("titulo");, Enter, e a troca dos sinais. Se preferir, copie pelo botão de copiar (no canto do bloco).

```java
    titulo = titulo.replace("&", "&amp;").replace("<", "&lt;").replace(">", "&gt;").replace("\"", "&quot;");
```
