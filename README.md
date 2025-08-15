# Playwright + Cucumber + TypeScript — Amazon Search E2E Tests

Projeto de testes E2E integrando **Playwright** e **Cucumber (BDD)** em **TypeScript**, aplicando **Page Object Model (POM)**.  
Cenário demonstrativo: busca de produtos na Amazon Brasil.

---

## 📦 Setup

```bash
# Instalar dependências
npm install

# Instalar navegadores do Playwright
npx playwright install --with-deps
```

---

## 🚀 Execução dos testes

### 🔹 1) Cucumber (BDD)

```bash
npm run test:bdd
```

- Features em `tests/features`
- Steps em `tests/steps`
- Hooks/World em `tests/support`

> Use Cucumber quando quiser cenários legíveis por negócio (BDD), com steps reutilizáveis.

---

### 🔹 2) Playwright Test Runner (opcional)

```bash
npm run test:pw         # executa testes nativos (.spec/.test)
npx playwright test --ui
```

- Testes nativos em `pw/` (ou pasta definida no `playwright.config.ts`)
- Útil para grandes suítes com paralelismo, retries e relatórios embutidos.

---

## 📊 Reports

### ✅ Cucumber

- **Console**: `progress` (padrão)
- **JSON**: `reports/cucumber.json` (para consumo por HTML reporters e Allure)
- **Allure**: `reports/allure-results` (ver seção Allure)

#### 📄 multiple-cucumber-html-reporter (HTML bonito com gráficos)

**Instalação:**
```bash
npm i -D multiple-cucumber-html-reporter
```

**Geração:**
```bash
npm run report:cucumber
```

**Scripts (package.json):**
```jsonc
{
  "scripts": {
    "test:bdd": "cucumber-js \"tests/features/**/*.feature\" --require-module ts-node/register --require \"tests/steps/**/*.ts\" --require \"tests/support/**/*.ts\" --format progress --format json:reports/cucumber.json",
    "report:cucumber": "node reports/cucumber-html-report.js"
  }
}
```

**Config do reporter:** `reports/cucumber-html-report.js`
```js
/* reports/cucumber-html-report.js */
const report = require('multiple-cucumber-html-reporter');
const path = require('path');

report.generate({
  jsonDir: path.join(__dirname, './'),                 // pasta onde fica cucumber.json (ajuste se necessário)
  reportPath: path.join(__dirname, './cucumber-report'),
  reportName: 'Cucumber BDD Report',
  pageTitle: 'Cucumber Report',
  metadata: {
    browser: { name: 'chromium', version: 'Playwright' },
    device: 'Local',
    platform: { name: process.platform, version: process.version }
  },
  customData: {
    title: 'Run Info',
    data: [
      { label: 'Project', value: 'Playwright + Cucumber + TS' },
      { label: 'Release', value: '1.0.0' },
      { label: 'Execution Start', value: new Date().toLocaleString() }
    ]
  },
});
```

> O `cucumber-js` precisa gerar o `reports/cucumber.json`. O script `test:bdd` acima já faz isso.

---

### ✅ Playwright

- **HTML Report**:
  ```bash
  npx playwright show-report
  ```
- **Trace Viewer**:
  ```bash
  npx playwright show-trace trace.zip
  ```
- Configure `trace`, `video`, `screenshot` no `playwright.config.ts` (ex.: `trace: 'retain-on-failure'`).

---

### ✅ Allure (Cucumber + Playwright)

**Instalação:**
```bash
npm i -D allure-commandline @shelex/cucumber-allure allure-playwright
```

**Gerando resultados com Cucumber:**
- Adicione o formatter do Allure:
```jsonc
"test:bdd": "cucumber-js \"tests/features/**/*.feature\" --require-module ts-node/register --require \"tests/steps/**/*.ts\" --require \"tests/support/**/*.ts\" --format progress --format json:reports/cucumber.json --format @shelex/cucumber-allure:reports/allure-results"
```

**Gerar e abrir relatório Allure:**
```bash
npx allure generate reports/allure-results -o reports/allure-report
npx allure open reports/allure-report
```

**Playwright nativo com Allure (opcional):**
- No `playwright.config.ts`:
```ts
reporter: [
  ['list'],
  ['allure-playwright']
]
```

---

## 📂 Estrutura do projeto

```
tests/
  features/        # .feature (BDD)
  steps/           # step definitions
  pages/           # page objects
  support/         # world, hooks, configs
pw/                # (opcional) testes nativos do Playwright (.spec/.test)
reports/           # artefatos de reports (cucumber.json, allure-results, html gerado)
playwright.config.ts
cucumber.js        # (opcional) config centralizada do Cucumber
tsconfig.json
package.json
```

---

## 🔧 Scripts úteis

```bash
npm run test:bdd        # Executa Cucumber (gera reports/cucumber.json)
npm run report:cucumber # Gera HTML do multiple-cucumber-html-reporter em reports/cucumber-report
npm run test:pw         # Executa testes nativos do Playwright
npx playwright show-report
npx playwright show-trace trace.zip
```

---

## 💡 Boas práticas

- **BDD/Cucumber** para cenários de negócio legíveis; **Playwright runner** para suites grandes e rápidas.
- Use **Page Objects** para reutilização e manutenção dos seletores.
- Ative **trace/vídeo/screenshot** para facilitar debug de falhas.

---

## 📌 Requisitos

- Node.js ≥ 20 (recomendado LTS)  
- NPM ≥ 9  
- Playwright browsers instalados

---

## 📝 Autor

Criado por [William Ruiz](https://github.com/WilliamRuiz).