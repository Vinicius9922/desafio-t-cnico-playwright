# Desafio Técnico: QA Automation

Automação de testes E2E do fluxo de compra do [Sauce Demo](https://www.saucedemo.com/), usando **Playwright** (JavaScript) e o padrão **Page Object Model**.

## Tecnologias

- [Playwright Test](https://playwright.dev/)
- JavaScript (CommonJS)
- Node.js

## Pré-requisitos

- Node.js 18 ou superior
- npm

## Instalação

```bash
# 1. Clone o repositório
git clone <URL-DO-REPOSITORIO>
cd <NOME-DO-REPOSITORIO>

# 2. Instale as dependências
npm install

# 3. Instale os navegadores do Playwright
npx playwright install
```

## Como executar os testes

```bash
# Todos os testes
npx playwright test

# Um arquivo específico
npx playwright test tests/Login.spec.js

# Um teste específico pelo nome
npx playwright test -g "Login valido"

# Com o navegador visível
npx playwright test --headed

# Modo UI (depuração interativa)
npx playwright test --ui

# Repetir cada teste N vezes (checagem de estabilidade)
npx playwright test --repeat-each=5
```

### Relatório de execução

```bash
# Executa e gera o relatório HTML
npx playwright test --reporter=html

# Abre o relatório
npx playwright show-report
```

## Estrutura do projeto

```
.
├── pages/                      # Page Objects
│   ├── BasePage.js             # Elementos comuns: sidebar, carrinho e rodapé
│   ├── LoginPage.js            # Tela de login
│   ├── InventoryPage.js        # Listagem de produtos e ordenação
│   ├── ProductDetailsPage.js   # Detalhes do produto
│   └── CartPage.js             # Carrinho e etapas do checkout
├── tests/                      # Specs
│   ├── Login.spec.js
│   ├── inventory.spec.js
│   ├── Cart.spec.js
│   └── Checkout.spec.js
├── playwright.config.js
└── package.json
```

## Decisões técnicas

- **Page Object Model:** a interação com a tela fica em `pages/`, e os specs ficam focados no cenário e nas asserções.
- **Herança com `BasePage`:** elementos presentes na maioria das telas (menu lateral, ícone e contador do carrinho, rodapé) ficam centralizados, e as páginas herdam deles. O `LoginPage` não herda, porque a tela de login não tem header nem menu.
- **Seletores estáveis:** prioridade para atributos `data-test`, que são menos sujeitos a quebrar com mudanças visuais do que classes CSS. Classes só são usadas onde não há `data-test` adequado (ex.: `.cart_item`).
- **Sem esperas fixas:** nenhum `waitForTimeout`. Os testes dependem das asserções com *auto-wait* do Playwright (`toBeVisible`, `toHaveURL`, `toHaveText` etc.).
- **Asserções sobre o conteúdo, não só sobre a existência:**
  - a ordenação lê os nomes e preços da tela e compara com uma **cópia ordenada em memória**, em vez de só conferir o valor do `<select>`;
  - o carrinho é comparado com os nomes e preços lidos na listagem;
  - o checkout valida itens, subtotal, mensagem de confirmação e carrinho vazio ao final;
  - os erros de validação conferem o texto exato da mensagem.
- **Estabilidade em SPA:** o Sauce Demo é uma SPA e a URL pode mudar antes de a tela terminar de renderizar. Por isso, ao navegar para os detalhes do produto, o teste espera um elemento exclusivo daquela tela (`Back to Products`) antes de validar o conteúdo.
- **Independência entre testes:** cada teste faz login no `beforeEach` e não depende do estado deixado por outro.
- **Método reutilizável `addProductToCart(slug)`:** adiciona qualquer produto pelo seu identificador (ex.: `sauce-labs-backpack`), sem criar um locator fixo por produto.
- **Dados de teste:** as credenciais são as públicas, disponíveis na página de login do site.

## Cobertura dos requisitos obrigatórios

| Requisito | Situação | Onde |
|---|---|---|
| 1. Login: credenciais válidas e inválidas | Coberto (ver pendência de senha incorreta) | `Login.spec.js` |
| 2. Navegação e listagem: ordenação e detalhes do produto | Coberto | `inventory.spec.js` |
| 3. Adição ao carrinho e validação do conteúdo | Coberto | `Cart.spec.js`, `inventory.spec.js` |
| 4. Finalização da compra: dados, revisão e confirmação | Coberto (ver pendência de total e imposto) | `Checkout.spec.js` |

## Cenários cobertos (26 testes)

### Login (`Login.spec.js`): 6 testes
- Login válido
- Login com usuário bloqueado (`locked_out_user`)
- Login com usuário inválido
- Login com campo de usuário vazio
- Login com campo de senha vazio
- Login com usuário e senha vazios

### Navegação e listagem de produtos (`inventory.spec.js`): 6 testes
- Exibição da lista de produtos
- Adicionar produto ao carrinho (contador do carrinho)
- Remover produto do carrinho
- Acessar os detalhes de um produto, validando que o nome corresponde ao produto clicado
- Ordenar por nome (A-Z e Z-A), validando a ordem real da lista
- Ordenar por preço (menor→maior e maior→menor), validando a ordem real da lista

### Carrinho (`Cart.spec.js`): 7 testes
- Acessar o carrinho vazio
- Adicionar vários produtos e validar quantidade, nomes e preços contra a listagem
- Acessar o carrinho com produto
- Acessar os detalhes de um produto a partir do carrinho
- Remover produto do carrinho
- Avançar para o checkout
- Voltar para a lista de produtos

### Checkout (`Checkout.spec.js`): 7 testes
- Compra finalizada com sucesso: item, preço, subtotal, mensagem "Thank you for your order!" e carrinho vazio
- Cancelar o checkout na tela de revisão
- Voltar à listagem a partir do carrinho
- Erro com todos os campos vazios
- Erro com nome vazio
- Erro com sobrenome vazio
- Erro com CEP vazio

## Cenários pendentes e como serão abordados

| Cenário | Abordagem |
|---|---|
| **Menu lateral (sidebar):** abrir e fechar, All Items, About, Logout, Reset App State e Dynamic Catalog | Os locators já estão mapeados no `BasePage`. Falta criar o spec. Logout: validar o retorno à tela de login. Reset App State: adicionar um produto e validar o carrinho vazio. About: validar o `href` em vez de navegar para o site externo. Dynamic Catalog: explorar o comportamento antes de definir a asserção. |
| **Links do rodapé (X, Facebook, LinkedIn)** | Validar apenas `href` e `target="_blank"`, sem navegar. Os sites externos têm login wall e bloqueio de bot e gerariam testes instáveis. |
| **Login com senha incorreta para um usuário válido** | Adicionar o caso com `standard_user` e senha errada, validando a mensagem de erro. Validar também que a URL permanece na tela de login. |
| **Usuários especiais** (`problem_user`, `performance_glitch_user`, `error_user`, `visual_user`) | Specs separados, já que cada um simula um comportamento defeituoso diferente. O `performance_glitch_user` exige timeouts maiores. |
| **Checkout: valores de imposto e total** | Hoje o total só é validado quanto ao formato. Validar o imposto e que o total é igual ao subtotal mais o imposto. |
| **Checkout com múltiplos produtos** | Adicionar 2 ou mais itens, finalizar a compra e validar que o subtotal é a soma dos preços. |
| **Remover um produto entre vários no carrinho** | Adicionar 2 itens, remover 1 e validar que sobrou o correto. O locator de remoção precisa ser parametrizado pelo produto. |
| **Fixtures** | Criar fixtures com `test.extend` para instanciar os Page Objects e autenticar, eliminando o `beforeEach` repetido nos 4 specs. Avaliar `storageState` para não logar a cada teste. |
| **Dados de teste desacoplados** | Mover usuários, mensagens de erro e dados de checkout para arquivos JSON em `data/`. |
| **`baseURL` e múltiplos navegadores** | Configurar `baseURL` no `playwright.config.js` para remover as URLs completas repetidas nos testes. Adicionar `projects` para Chromium, Firefox e WebKit. |
| **Refatoração dos Page Objects** | Separar um `CheckoutPage` (informações, revisão e conclusão) do `CartPage`. Remover locators duplicados (`inventoryItem` e `inventoryItemName`, `inventoryItemDescription` e `inventoryDesc`) e as asserções dentro dos Page Objects, mantendo-as nos specs. |
| **Integração contínua** | Pipeline no GitHub Actions executando a suíte a cada push e publicando o relatório HTML como artefato. |
