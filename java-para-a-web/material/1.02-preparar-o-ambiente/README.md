# Java para a Web, aula 1.02: Preparar o ambiente · material

O que a aula manda escrever ou copiar, na ordem em que aparece no vídeo. Cada bloco tem o botão de copiar no canto de cima, à direita.

## O endereço do Java

Tecla do Windows, escreva **variáveis de ambiente** e escolha **Editar as variáveis de ambiente para sua conta**. Na parte de cima, **Novo...**, e no nome da variável, tudo maiúsculo, com o sublinhado:

```text
JAVA_HOME
```

No valor, **Procurar no Diretório...** até a pasta que começa com **jdk-25** (não a **bin** de dentro dela). Fica assim:

```text
C:\Program Files\Eclipse Adoptium\jdk-25.0.5.8-hotspot
```

Pra conferir, num terminal novo (o que estava aberto não sabe da variável):

```powershell
echo $env:JAVA_HOME
```

## Baixar e ligar o Tomcat

Em **tomcat.apache.org**, **Download**, **Tomcat 11**, na linha **Core**, o **Windows zip**. No terminal, que começa na sua pasta de usuário. O número depois do 11 muda: escreva o do arquivo que você baixou (a tecla Tab completa o nome).

```powershell
tar -xf Downloads\apache-tomcat-11.0.27-windows-x64.zip
cd apache-tomcat-11.0.27\bin
.\startup.bat
```

Com a janela Tomcat aberta, no navegador:

```text
http://localhost:8080
```

**No Mac e no Linux** o Tomcat acha o Java sozinho e o passo do JAVA_HOME não precisa: baixe o **tar.gz** da mesma linha Core, descompacte e ligue com `./startup.sh`, na pasta `bin`.

## Olá, mundo no navegador

No VS Code, a pasta do Tomcat aberta, dentro de `webapps` a pasta `labapp` e nela o arquivo `index.jsp`, com as duas linhas (o **á** do Olá com acento). Salve com Ctrl+S.

```jsp
<%@ page pageEncoding="UTF-8" %>
<% out.println("Olá, mundo!"); %>
```

```text
http://localhost:8080/labapp/
```

## Desligar e ligar de novo

No terminal, na pasta `bin` do Tomcat (ou feche a janela Tomcat):

```powershell
.\shutdown.bat
```

```powershell
.\startup.bat
```
