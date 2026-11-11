# Java para a Web, aula 1.07: Editar, concluir e excluir · material

O que a aula manda copiar, na ordem em que aparece no vídeo. Cada bloco tem o botão de copiar no canto de cima, à direita.

## A Nova tarefa muda de casa

No fim da linha do insere.executeUpdate();, Enter e conexao.close();. Na última linha, %>. Ctrl+S. O arquivo fica assim (se preferir, copie pelo botão de copiar (no canto do bloco) e cole no arquivo vazio):

```jsp
<%@ page import="java.sql.*" %>
<%@ page import="labapp.Banco" %>
<%
  Connection conexao = Banco.abreConexao();
  String titulo = request.getParameter("titulo");
  int prioridade = Integer.parseInt(request.getParameter("prioridade"));
  PreparedStatement insere = conexao.prepareStatement("INSERT INTO tarefas (titulo, prioridade, concluida) VALUES (?, ?, false);");
  insere.setString(1, titulo);
  insere.setInt(2, prioridade);
  insere.executeUpdate();
  conexao.close();
  response.sendRedirect("/labapp/");
%>
```

## O formulário manda pro arquivo

No index.jsp, lá embaixo, a janela da Nova tarefa é um form com method="get". No fim do method="get", um espaço e action="nova.jsp". A linha fica assim:

```html
    <form method="get" action="nova.jsp">
```

## A bolinha de concluir

Na labapp, New File, concluir.jsp. Escreva, uma linha de cada vez, e pare de propósito no conexao.close();, sem a linha que manda de volta. Ctrl+S.

```jsp
<%@ page import="java.sql.*" %>
<%@ page import="labapp.Banco" %>
<%
  Connection conexao = Banco.abreConexao();
  int id = Integer.parseInt(request.getParameter("id"));
  PreparedStatement conclui = conexao.prepareStatement("UPDATE tarefas SET concluida = true WHERE id = ?;");
  conclui.setInt(1, id);
  conclui.executeUpdate();
  conexao.close();
%>
```

No index.jsp, no form da bolinha das abertas, o action="concluir.jsp" no fim do method="get"; e a linha do <input type="hidden" name="acao" value="concluir"> sai. Ctrl+S.

```html
          <form method="get" action="concluir.jsp" class="marcar-feita">
```

## A página branca

O conserto: no concluir.jsp, no fim da linha do conexao.close();, Enter, e:

```java
  response.sendRedirect("/labapp/");
```

## O Excluir

New File, excluir.jsp, e Ctrl+S:

```jsp
<%@ page import="java.sql.*" %>
<%@ page import="labapp.Banco" %>
<%
  Connection conexao = Banco.abreConexao();
  int id = Integer.parseInt(request.getParameter("id"));
  PreparedStatement exclui = conexao.prepareStatement("DELETE FROM tarefas WHERE id = ?;");
  exclui.setInt(1, id);
  exclui.executeUpdate();
  conexao.close();
  response.sendRedirect("/labapp/");
%>
```

No index.jsp, no form da janela de excluir, o action="excluir.jsp"; e a linha do <input type="hidden" name="acao" value="excluir"> sai.

```html
    <form method="get" action="excluir.jsp">
```

## O Editar

New File, editar.jsp, e Ctrl+S:

```jsp
<%@ page import="java.sql.*" %>
<%@ page import="labapp.Banco" %>
<%
  Connection conexao = Banco.abreConexao();
  int id = Integer.parseInt(request.getParameter("id"));
  String titulo = request.getParameter("titulo");
  int prioridade = Integer.parseInt(request.getParameter("prioridade"));
  PreparedStatement edita = conexao.prepareStatement("UPDATE tarefas SET titulo = ?, prioridade = ? WHERE id = ?;");
  edita.setString(1, titulo);
  edita.setInt(2, prioridade);
  edita.setInt(3, id);
  edita.executeUpdate();
  conexao.close();
  response.sendRedirect("/labapp/");
%>
```

No index.jsp, no form da janela de editar, o action="editar.jsp"; e a linha do <input type="hidden" name="acao" value="editar"> sai.

```html
    <form method="get" action="editar.jsp">
```
