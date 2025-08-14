# 🛠️ Automação de Testes - Playwright + Cucumber (Amazon Search)

## 📌 Visão Geral
Este projeto implementa testes automatizados de interface utilizando **[Playwright](https://playwright.dev/)** e **[Cucumber](https://cucumber.io/)**, aplicando o padrão **Page Object Model (POM)**.  
O cenário de exemplo realiza uma **pesquisa de produtos na Amazon Brasil** e valida os resultados.

## 🎯 Objetivos
- Demonstrar boas práticas em automação de testes web com Playwright.
- Utilizar BDD (**Behavior Driven Development**) para melhor comunicação entre equipes.
- Implementar Page Object Model para facilitar a manutenção e escalabilidade dos testes.
- Fornecer exemplo funcional pronto para execução local e integração em pipelines CI/CD.

---

## 📂 Estrutura do Projeto
```bash
tests/
│
├── features/ # Cenários BDD
│ ├── amazon_search.feature
│
├── steps/ # Step Definitions do Cucumber
│ ├── amazonSteps.ts
│
├── pages/ # Page Objects
│ ├── AmazonHomePage.ts
│
├── support/ # Contexto, Hooks e Configurações
│ ├── world.ts
│ ├── hooks.ts
│
├── cucumber.js # Configuração do Cucumber
└── package.json
```

---

## 🚀 Tecnologias Utilizadas
- **[Playwright](https://playwright.dev/)** → Automação de navegadores.
- **[Cucumber](https://cucumber.io/)** → BDD (Behavior Driven Development).
- **TypeScript** → Tipagem estática e melhor manutenção do código.
- **Page Object Model (POM)** → Separação da lógica de testes da lógica de interação com a página.

---

## 📋 Pré-requisitos
Certifique-se de ter instalado:
- [Node.js](https://nodejs.org/) (versão 18 ou superior)
- [npm](https://www.npmjs.com/) ou [yarn](https://yarnpkg.com/)

---

## ⚙️ Instalação
```bash
# 1. Clone este repositório
git clone https://github.com/WilliamRuiz/automacao-playwright-cucumber.git

# 2. Acesse o diretório do projeto
cd automacao-playwright-cucumber

# 3. Instale as dependências
npm install

# 4. Instale os browsers do Playwright
npx playwright install
```
---

## ▶️ Executando os Testes
```bash
# Executar todos os testes
npx cucumber-js
```
Por padrão, os testes rodam em modo headless.
Para rodar com navegador visível, altere no arquivo world.ts:
```
Feature: Pesquisa na Amazon

  Scenario: Pesquisar um produto
    Given que estou na página inicial da Amazon
    When eu pesquiso por "notebook"
    Then devo ver resultados relacionados a "notebook"
```

---

## 📊 Relatórios
Este projeto pode ser integrado com Allure Reports ou relatórios HTML do próprio Cucumber.

Exemplo com Allure:
```
# Instalar
npm install allure-commandline allure-playwright --save-dev

# Gerar relatório
npx allure generate ./allure-results --clean
npx allure open
```

---

## 🛡️ Boas Práticas Implementadas
BDD: Cenários descritivos para facilitar entendimento de negócio.

Page Object Model: Separação clara entre testes e interações de página.

Reuso de Código: Steps genéricos e reutilizáveis.

Configuração Centralizada: Facilita manutenção.

Facilidade de Integração: Estrutura pronta para pipelines CI/CD.

---

## 📌 Próximos Passos
Adicionar mais cenários para outras funcionalidades da Amazon.

Implementar execução paralela.

Configurar Allure Reports por padrão.

Criar pipeline no GitHub Actions para execução automática.

---

## 👨‍💻 Autor
William Ceroni Ruiz
QA Automation Engineer | Especialista em Testes E2E 
