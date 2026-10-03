# SGA — Sistema de Gestão Acadêmica

Protótipo acadêmico de uma interface para docentes, desenvolvido com HTML, CSS e JavaScript, sem framework ou etapa de compilação.

## Funcionalidades atuais

- Cadastro e login locais.
- Edição de nome, e-mail e disciplina principal.
- Seleção de foto de perfil, exibida também na barra lateral.
- Uma turma correspondente à disciplina principal do perfil.
- Diário com quatro alunos fixos de exemplo.
- Barra lateral com logo da faculdade, ícones e opção de recolher.
- Preferência de recolhimento e dados do perfil preservados no navegador.

## Executar localmente

Abra a pasta do projeto no VS Code e execute `index.html` com a extensão Live Server.

Como alternativa, com Python instalado, execute na pasta do projeto:

```sh
python -m http.server 5500
```

Depois acesse `http://localhost:5500/index.html`. Não há dependências de aplicação para instalar. Use sempre o mesmo endereço e porta para acessar os mesmos dados locais.

## Organização

| Arquivos | Responsabilidade |
| --- | --- |
| `index.html`, `login.css`, `login.js` | Tela e validação de login |
| `cadastro.html`, `cadastro.css`, `cadastro.js` | Cadastro local de docentes |
| `menu.html`, `menu.css`, `menu.js` | Minhas turmas e dados da barra lateral |
| `meuperfil.html`, `meuperfil.css`, `meuperfil.js` | Edição do perfil e seleção da foto |
| `turmaES.html`, `turmaES.css`, `turma.js` | Diário e título da disciplina |
| `sidebar-toggle.css`, `sidebar-toggle.js` | Comportamento compartilhado de recolher a barra |
| `imagens/logo-faculdade.png` | Logo usada nas páginas internas |
| `docs/ALTERACOES.md` | Registro técnico das alterações e roteiro de verificação |

## Dados locais

O projeto utiliza `localStorage`, que armazena texto no navegador:

| Chave | Conteúdo |
| --- | --- |
| `usuarios` | Lista JSON de usuários com nome, e-mail, disciplina e senha |
| `usuarioAtual` | Objeto JSON do usuário utilizado pela interface |
| `fotoPerfil` | Imagem convertida para Data URL |
| `sidebarCollapsed` | Texto `true` ou `false` para a preferência do menu |

## Limitações

Este projeto é um protótipo de estudo. Não há servidor de autenticação nem banco de dados. As senhas são armazenadas em texto simples no navegador; esta implementação não é adequada para contas reais em produção.

Os quatro alunos são exemplos fixos, utilizados em qualquer disciplina. Não há cadastro de matérias ou alunos. Os campos de notas permitem edição visual, mas ainda não salvam alterações nem recalculam médias ou situações.

Limpar os dados do navegador remove os cadastros e preferências. A foto usa uma chave compartilhada, sem separação por usuário. O link Sair abre a tela de login, mas não apaga `usuarioAtual`.

Consulte o [registro técnico](docs/ALTERACOES.md) para entender como as mudanças foram implementadas.
