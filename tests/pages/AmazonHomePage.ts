import { Page } from "playwright";

export class AmazonHomePage {
  constructor(private page: Page) {}

  async open(baseURL: string) {
    await this.page.goto(baseURL, { waitUntil: "domcontentloaded" });
    await this.acceptCookiesIfPresent();
  }

  private async acceptCookiesIfPresent() {
    // Amazon pode mostrar consent banner. Tente aceitar se existir.
    const candidates = [
      "#sp-cc-accept", // comum na Amazon
      'input[name="accept"]',
      "input#sp-cc-accept",
      'input[name="accept"]',
      'button[name="accept"]',
      'button:has-text("Aceitar")',
      'input[type="submit"][name="accept"]',
    ];
    for (const sel of candidates) {
      const el = this.page.locator(sel);
      if (
        await el
          .first()
          .isVisible()
          .catch(() => false)
      ) {
        await el
          .first()
          .click()
          .catch(() => {});
        break;
      }
    }
  }

  async searchProduct(term: string) {
    // Vários seletores possíveis para o campo de busca
    const searchInput = this.page.locator("#twotabsearchtextbox");
    const altByPlaceholder = this.page.getByPlaceholder(/Pesquisar|Search/i);

    // Aguarda o campo ficar visível (qualquer um dos dois)
    await Promise.race([
      searchInput.waitFor({ state: "visible", timeout: 8000 }),
      altByPlaceholder.waitFor({ state: "visible", timeout: 8000 }),
    ]).catch(() => {
      /* ignora se um deles já aparecer */
    });

    const input = (await searchInput.isVisible())
      ? searchInput
      : altByPlaceholder;

    await input.fill(term);
    // Preferir clicar no botão de buscar para evitar race com sugestões
    const submitBtn = this.page.locator("#nav-search-submit-button");
    if (await submitBtn.isVisible().catch(() => false)) {
      await submitBtn.click();
    } else {
      await this.page.keyboard.press("Enter");
    }
  }

  async hasResultsContaining(text: string) {
    // Aguarda pelo primeiro resultado de busca aparecer
    await this.page.waitForSelector('[data-component-type="s-search-result"]', {
      timeout: 15000,
    });
    const body = await this.page.textContent("body");
    return body?.toLowerCase().includes(text.toLowerCase());
  }
}
