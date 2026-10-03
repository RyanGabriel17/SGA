# Registro técnico das alterações

Data: 02/10/2026. Escopo: correções de cadastro e perfil, padronização das páginas internas e adequação do diário ao cenário acadêmico solicitado.

Este documento descreve o resultado final das alterações. A aplicação continua sendo um frontend em HTML, CSS e JavaScript com armazenamento local.

## 1. Correção do primeiro cadastro

**Arquivo:** `cadastro.js`.

Quando não existia a chave `usuarios`, a leitura retornava `null`. A chamada seguinte a `.find()` falhava porque esse método pertence a uma lista.

```js
const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
```

O `|| []` fornece uma lista vazia no primeiro acesso. Assim, o código pode procurar e-mails repetidos e adicionar o primeiro usuário. A validação de confirmação de senha e o redirecionamento após cadastro foram mantidos.

## 2. Atualização do perfil sem perder dados de login

**Arquivo:** `meuperfil.js`.

O salvamento atualiza tanto `usuarioAtual`, utilizado na interface, quanto o registro correspondente em `usuarios`, utilizado pelo login. O registro é localizado pelo e-mail anterior, permitindo que o próprio e-mail seja alterado.

Antes de salvar, o código verifica campos vazios e procura outro usuário com o novo e-mail. O objeto atualizado combina os dados anteriores com os novos campos:

```js
const dadosAtualizados = {
    ...(indice !== -1 ? usuarios[indice] : {}),
    ...usuarioAtual,
    nome: nome,
    email: email,
    disciplina: disciplina
};
```

O operador `...` copia propriedades do objeto. Isso preserva a senha ao editar nome, e-mail e disciplina. Os campos escritos depois das cópias substituem os valores antigos. A variável `usuarioAtual` passou a usar `let`, pois recebe o objeto atualizado após salvar.

## 3. Foto no perfil e na barra lateral

**Arquivos:** `meuperfil.js`, `meuperfil.html`, `meuperfil.css`, `menu.js` e páginas internas.

O fluxo de seleção utiliza `FileReader.readAsDataURL()`: o navegador lê o arquivo e produz uma representação textual da imagem. Ao terminar a leitura, essa imagem é exibida no círculo principal e no avatar lateral, e armazenada na chave `fotoPerfil`.

Foi acrescentada a referência `fotoLateral` para atualizar os dois locais juntos. Ao abrir novamente o perfil, a imagem salva também preenche os dois avatares. `menu.js` lê a mesma chave para apresentar a foto em Minhas turmas e no diário.

O CSS ajusta a imagem ao espaço do avatar. A foto é salva imediatamente após a seleção; o botão de salvar o formulário cuida dos dados de texto.

**Limites:** a chave é compartilhada entre usuários do mesmo navegador. Não há redução do arquivo ou tratamento de falta de espaço no armazenamento; imagens grandes podem exceder a cota disponível.

## 4. Logo e ícones de navegação

**Arquivos:** `imagens/logo-faculdade.png` e HTML/CSS de menu, perfil e diário.

A letra F foi substituída pela imagem fornecida. O elemento `img` aponta para um arquivo dentro do projeto, com texto alternativo. A logo ocupa 40 × 40 pixels dentro do contêiner de 48 × 48 pixels, usando `object-fit: contain` para preservar suas proporções.

Os marcadores dos links foram substituídos por SVGs de livro, usuário e saída. Os SVGs usam `currentColor`, acompanhando a cor do link. Os textos ficam em elementos com a classe `nav-label`; isso permite ocultá-los quando o menu está recolhido.

Os links possuem nomes acessíveis e títulos. Os SVGs decorativos usam `aria-hidden="true"`.

## 5. Barra lateral consistente e recolhível

**Arquivos:** os três HTML/CSS internos e os novos `sidebar-toggle.css` e `sidebar-toggle.js`.

A largura expandida foi padronizada em 225 pixels. As margens e larguras do conteúdo foram ajustadas para acompanhar a barra. As páginas utilizam o mesmo padrão de cores, logo, navegação e identificação do docente.

O botão de recolher altera a classe `sidebar-collapsed` no `body`. O CSS compartilhado reduz a barra para 72 pixels, centraliza os ícones e oculta os textos. O conteúdo principal passa a ocupar o espaço liberado.

```js
localStorage.setItem("sidebarCollapsed", String(collapsed));
```

A preferência é recuperada ao navegar entre páginas. O script também atualiza `aria-expanded`, o título e o rótulo do botão. Em telas de até 750 pixels, o recolhimento é desativado e o botão fica oculto para acompanhar o layout móvel.

Os arquivos compartilhados são carregados depois dos estilos e scripts específicos de cada página. Os estilos de base ainda existem nos três CSS; o comportamento de recolhimento está centralizado.

## 6. Padronização do diário

**Arquivos:** `turmaES.html` e `turmaES.css`.

- Substituição do fundo colorido por tons claros compatíveis com as outras páginas.
- Barra lateral com o mesmo azul escuro, navegação e cartão de perfil.
- Remoção da identificação fixa de outro docente; nome e foto vêm do armazenamento local por `menu.js`.
- Tabela em cartão branco, com borda, arredondamento e sombra.
- Definição de larguras para as nove colunas, alinhamento das notas e quebra de nomes longos.
- Campos numéricos compactos e remoção visual das setas de incremento.
- Largura mínima de 640 pixels e rolagem horizontal quando o espaço é insuficiente.
- Remoção dos links de edição com lápis e da coluna que ficou vazia.
- Alteração do rótulo de situação para “PROVA FINAL”.
- Remoção da paginação, pois a tabela agora contém apenas quatro alunos.

A pequena barra decorativa abaixo do cabeçalho de Minhas turmas também foi removida em `menu.css`. A decoração do cabeçalho do perfil permanece.

## 7. Disciplina principal no cartão e no diário

**Arquivos:** `menu.html`, `menu.js` e novo `turma.js`.

O cartão deixou de ter um título fixo no HTML. `menu.js` lê `usuarioAtual.disciplina`, cria o cartão com `document.createElement()` e insere os textos com `textContent`. Essa propriedade exibe o nome como texto, sem interpretar HTML digitado pelo usuário.

O link transporta a disciplina na URL:

```js
link.href = `turmaES.html?disciplina=${encodeURIComponent(nome)}`;
```

`encodeURIComponent()` prepara espaços e caracteres especiais para a URL. `turma.js` usa `URLSearchParams` para recuperar o nome e atualizar o título da página, o cabeçalho e o resumo.

Existe somente uma disciplina principal. Sem uma disciplina disponível, o exemplo padrão é Engenharia de Software. O cadastro de novas matérias não faz parte do resultado final.

## 8. Quatro alunos fixos

**Arquivo:** `turmaES.html`.

Foram reutilizados quatro alunos que já existiam na tabela:

| Matrícula | Nome |
| --- | --- |
| 2023104521 | Beatriz Andrade Souza |
| 2023104522 | Carlos Eduardo Lima |
| 2023104523 | Daniela Ferreira Costa |
| 2023104524 | Eduardo Nascimento |

As outras linhas foram removidas. O cartão e o resumo informam “4 alunos de exemplo”. Esses alunos são os mesmos em todas as disciplinas. Não há formulário de inclusão ou exclusão de alunos.

As notas, médias e situações exibidas são dados de exemplo. Alterar uma nota no campo não recalcula os demais valores e não persiste a edição. Nenhuma regra de avaliação nova foi implementada.

## 9. Verificação

Durante o desenvolvimento foram realizadas verificações de sintaxe JavaScript, revisão de diferenças com Git e inspeções visuais em navegador de desktop e em largura reduzida. Foram inspecionados o diário com quatro alunos, os estados expandido e recolhido da barra, a navegação entre páginas e a preservação dos dados de perfil durante a edição.

Na preparação do commit, a sintaxe de todos os arquivos JavaScript foi verificada novamente com `node --check`, junto com `git diff --check`. Essas verificações não substituem testes completos de autenticação ou de segurança.

### Roteiro manual de regressão

Use um perfil de navegador de teste e mantenha o mesmo endereço do servidor durante o roteiro:

1. Cadastre o primeiro usuário e confirme o redirecionamento para Minhas turmas.
2. Tente cadastrar o mesmo e-mail e confirme a mensagem de duplicidade.
3. No perfil, altere nome, e-mail e disciplina; salve e confirme o nome lateral.
4. Volte ao login e entre com o novo e-mail e a senha original.
5. Selecione uma imagem pequena; confira os dois avatares e recarregue a página.
6. Abra Minhas turmas e confirme o nome da disciplina e os quatro alunos de exemplo.
7. Abra o diário e confirme o título, as quatro linhas e a ausência de lápis e paginação.
8. Recolha o menu, navegue ao perfil e confirme a preservação da preferência.
9. Expanda o menu e reduza a janela para conferir o layout móvel e a rolagem da tabela.

## 10. Limitações e manutenção

- Não há backend, banco de dados ou sincronização entre dispositivos.
- As senhas ficam em texto simples no `localStorage`; a autenticação é apenas uma demonstração local.
- Os dados dependem do navegador e da origem utilizada, incluindo a porta. Limpar o armazenamento remove os dados.
- Sair abre `index.html`, mas não limpa o objeto `usuarioAtual`.
- A foto ainda não é individual por conta e não possui controle de tamanho.
- Notas e situações ainda não possuem cálculo ou salvamento.
- As páginas dependem de recursos de navegadores modernos, como SVG, optional chaining e `matchMedia`.

Para futuras alterações, mantenha os nomes das chaves de armazenamento consistentes, carregue os estilos compartilhados após os estilos da página e confira as três páginas internas ao alterar a barra lateral.
