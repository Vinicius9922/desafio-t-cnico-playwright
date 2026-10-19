# Sauce Demo - Framework de Automação de Testes E2E (Playwright)

Uma suíte de testes End-to-End (E2E) robusta, escalável e de fácil manutenção, desenvolvida para a aplicação web [Sauce Demo](https://www.saucedemo.com/) utilizando **Playwright** e **JavaScript**, estruturada sob a arquitetura de **Page Object Model (POM)** com herança de classes.

## 📐 Arquitetura e Padrões de Projeto

### 1. Page Object Model (POM) com Herança (`BasePage`)

Para seguir o princípio **DRY (Don't Repeat Yourself)** e evitar a duplicação de código:

* **`BasePage` (Classe Mãe)**: Encapsula componentes globais e compartilhados por várias telas, como o cabeçalho, o ícone/badge do carrinho, o menu lateral (sidebar) e os links do rodapé.

* **Pages Derivadas (`InventoryPage`, `CartPage`, `ProductDetailsPage`)**: Estendem a `BasePage` e chamam `super(page)` em seus construtores para herdar automaticamente todos os seletores e interações globais.

* **`LoginPage`**: Classe independente responsável exclusivamente pela autenticação e validações de login.

### 2. Exposição Direta de Locators vs. Encapsulamento de Ações Complexas

* **Locators Diretos**: Elementos simples (botões, inputs e rótulos) são expostos diretamente nas classes Page para permitir ações e asserções declarativas e explícitas nos arquivos spec (ex: `await cartPage.cartItemRemoveButton.click()`).

* **Métodos `async` Encapsulados**: Reservados para fluxos de negócio repetitivos ou com múltiplos passos (ex: `login()`, `checkout()`, `addProductToCart(slug)`).

### 3. Locators Dinâmicos e Validações Avançadas

* Utilização de atributos nativos do Playwright (`[data-test="..."]`) para garantir seletores resilientes.

* Validação dinâmica de ordenações (ordenação numérica de preços e alfabética A-Z/Z-A) utilizando recursos nativos do JavaScript (`map`, `parseFloat`, `sort`).

## 📁 Estrutura do Projeto

```
.
├── pages/
│   ├── BasePage.js           # Page Object mãe com componentes globais (Header, Badge do Carrinho, Sidebar, Rodapé)
│   ├── LoginPage.js          # Page Object responsável pela Autenticação
│   ├── InventoryPage.js      # Page Object do Catálogo de Produtos e Filtros (Extende a BasePage)
│   ├── CartPage.js           # Page Object do Carrinho e Etapas de Checkout (Extende a BasePage)
│   └── ProductDetailsPage.js # Page Object da Tela de Detalhes do Produto (Extende a BasePage)
├── tests/
│   ├── Login.spec.js         # Suíte de testes de autenticação (válido, bloqueado, inválido e campos vazios)
│   ├── inventory.spec.js     # Lista de produtos, ordenação (Nome/Preço) e navegação para detalhes
│   ├── Cart.spec.js          # Listagem do carrinho, contadores, remoção de itens e navegação
│   └── Checkout.spec.js      # Fluxo E2E de checkout, validação de resumo do pedido e mensagens de erro
├── playwright.config.js      # Configurações do executor do Playwright
└── package.json              # Dependências do projeto e scripts npm
```

## 🧪 Resumo da Cobertura de Testes

### 1. **Módulo de Autenticação (`Login.spec.js`)**

* Login com sucesso e redirecionamento para `/inventory.html`.

* Tratamento de erro para usuário bloqueado (`locked_out_user`).

* Cenários negativos: Credenciais inválidas, ausência de usuário, ausência de senha e ambos os campos vazios.

### 2. **Catálogo de Produtos e Filtros (`inventory.spec.js`)**

* Exibição e validação da lista de produtos.

* Adição e remoção de produtos diretamente pelo catálogo.

* Ordenação alfabética de produtos (**A-Z**, **Z-A**).

* Ordenação numérica por preço (**Menor para Maior**, **Maior para Menor**).

* Navegação para a tela de detalhes do produto.

### 3. **Carrinho de Compras (`Cart.spec.js`)**

* Acesso ao carrinho em estado vazio e com itens.

* Adição dinâmica de múltiplos produtos em lote (`addProductToCart(slug)`).

* Validação dos nomes e preços dos itens listados no carrinho.

* Remoção de itens e navegação para continuar comprando.

### 4. **Fluxo de Checkout (`Checkout.spec.js`)**

* Jornada de compra ponta a ponta: Carrinho $\rightarrow$ Informações do Cliente $\rightarrow$ Resumo do Pedido $\rightarrow$ Confirmação.

* Validação do resumo de compra: Subtotal, contagem de itens, valor total e mensagem de sucesso.

* Cancelamento de checkout e retorno à navegação.

* Validação de campos obrigatórios do formulário: Nome, Sobrenome e CEP vazios.

## 🚀 Como Executar o Projeto

### Pré-requisitos

* **Node.js**: Versão `16+` instalada.

* Gerenciador de pacotes **npm** ou **yarn**.

### Instalação

1. Clone o repositório:

   ```bash
   git clone <url-do-repositorio>
   cd <pasta-do-repositorio>
   ```

2. Instale as dependências do projeto:

   ```bash
   npm install
   ```

3. Instale os navegadores suportados pelo Playwright:

   ```bash
   npx playwright install
   ```

## 🏃 Executando os Testes

### Executar todos os testes em modo Headless (sem interface gráfica)

```bash
npx playwright test
```

### Executar um arquivo de teste específico

```bash
npx playwright test tests/Checkout.spec.js
```

### Executar os testes com o navegador visível (Headed Mode)

```bash
npx playwright test --headed
```

### Executar os testes usando a Interface Gráfica do Playwright (UI Mode)

```bash
npx playwright test --ui
```

### Visualizar o Relatório de Testes (HTML Report)

```bash
npx playwright show-report
```

## 🛠️ Boas Práticas Técnicas Aplicadas

* **Conformidade com o Strict Mode**: Locators configurados para evitar ambiguidades ou erros de múltiplos elementos na página.

* **Isolamento de Estado**: Todos os testes utilizam o hook `beforeEach` para instanciar novos Page Objects, navegar e realizar o login inicial de forma limpa e independente.

* **Módulos com Caminhos Relativos**: Resolução clara e padronizada de importações da biblioteca (`@playwright/test`) e dos arquivos locais (`../pages/BasePage`).