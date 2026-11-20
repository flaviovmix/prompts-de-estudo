# Java para a Web, aula 1.08: Entrar com senha · material

O que a aula manda copiar, na ordem em que aparece no vídeo. Cada bloco tem o botão de copiar no canto de cima, à direita.

## A tabela de usuários

No pgAdmin, no banco labapp, Schemas, public, Tables: botão direito em Tables, Create, Table. Na aba General, o nome usuarios. Na aba Columns, o mais três vezes: id do tipo serial com Primary key ligado; nome, character varying, 40 em Length; senha, character varying, 100. Not NULL ligado nas três. Save.

Depois, botão direito em usuarios, Query Tool, e o primeiro usuário (F5 roda):

```sql
INSERT INTO usuarios (nome, senha) VALUES ('aluno', 'girassol');
```

E pra conferir (Ctrl+A, cole por cima, F5):

```sql
SELECT * FROM usuarios;
```

## A página de login

Na labapp, New File, login.jsp. O arquivo inteiro:

```jsp
<%@ page pageEncoding="UTF-8" %>
<!doctype html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>LabApp</title>
  <link rel="stylesheet" href="cores-e-letras.css">
  <link rel="stylesheet" href="botao.css">
  <link rel="stylesheet" href="janela-da-tarefa.css">
</head>
<body>
  <main class="pagina">
    <header class="topo">
      <h1>Entrar no LabApp</h1>
    </header>
    <form method="get" action="entrar.jsp" class="corpo-da-janela">
      <label class="campo">
        <span>Nome</span>
        <input type="text" name="nome" required>
      </label>
      <label class="campo">
        <span>Senha</span>
        <input type="password" name="senha" required>
      </label>
      <button type="submit" class="botao botao-verde">Entrar</button>
    </form>
  </main>
</body>
</html>
```

Com o get, a senha aparece no endereço. No form, troque o get por post. A linha fica assim:

```html
    <form method="post" action="entrar.jsp" class="corpo-da-janela">
```

## O entrar confere a senha

Na labapp, New File, entrar.jsp:

```jsp
<%@ page import="java.sql.*" %>
<%@ page import="labapp.Banco" %>
<%
  Connection conexao = Banco.abreConexao();
  String nome = request.getParameter("nome");
  String senha = request.getParameter("senha");
  PreparedStatement confere = conexao.prepareStatement("SELECT id FROM usuarios WHERE nome = ? AND senha = ?;");
  confere.setString(1, nome);
  confere.setString(2, senha);
  ResultSet usuario = confere.executeQuery();
  if (usuario.next()) {
    session.setAttribute("usuario", usuario.getInt("id"));
    response.sendRedirect("/labapp/");
  } else {
    response.sendRedirect("/labapp/login.jsp?erro=1");
  }
  conexao.close();
%>
```

No login.jsp, antes da linha do botão Entrar, o aviso que só aparece quando o endereço tem o erro:

```jsp
<% if (request.getParameter("erro") != null) { %>
      <p>Nome ou senha não conferem.</p>
<% } %>
```

## A lista só pra quem entrou

No index.jsp, no alto, no fim da linha do `<%`, Enter, e:

```java
  if (session.getAttribute("usuario") == null) {
    response.sendRedirect("/labapp/login.jsp");
    return;
  }
```

Na labapp, New File, sair.jsp:

```jsp
<%
  session.invalidate();
  response.sendRedirect("/labapp/login.jsp");
%>
```

No index.jsp, no header do alto, depois do botão Nova tarefa:

```html
      <form method="get" action="sair.jsp">
        <button type="submit" class="botao botao-azul-claro">Sair</button>
      </form>
```

## Cada arquivo é uma porta

Na labapp, New File, confere-login.jsp. As linhas do if saem do index.jsp (recorte com Ctrl+X) e vêm pra cá, entre o `<%` e o `%>`:

```jsp
<%
  if (session.getAttribute("usuario") == null) {
    response.sendRedirect("/labapp/login.jsp");
    return;
  }
%>
```

E nos seis arquivos (index.jsp, nova.jsp, concluir.jsp, excluir.jsp, editar.jsp e reabrir.jsp), embaixo da linha do labapp.Banco:

```jsp
<%@ include file="confere-login.jsp" %>
```

## A senha que se lê

No Query Tool da usuarios, a extensão que embaralha (já vem com o PostgreSQL, desligada):

```sql
CREATE EXTENSION pgcrypto;
```

A senha que já está lá, embaralhada:

```sql
UPDATE usuarios SET senha = crypt(senha, gen_salt('bf', 10));
```

E o conserto no entrar.jsp, a linha do SELECT:

```java
  PreparedStatement confere = conexao.prepareStatement("SELECT id FROM usuarios WHERE nome = ? AND senha = crypt(?, senha);");
```

## Um usuário seu, sozinho

Crie um usuário com o seu nome e uma senha sua, já embaralhada, e entre com ele. Depois de fazer, compare com o comando do vídeo, com a bia e a senha jabuticaba:

```sql
INSERT INTO usuarios (nome, senha) VALUES ('bia', crypt('jabuticaba', gen_salt('bf', 10)));
```
