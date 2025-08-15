import { Page } from 'playwright';

export class AmazonHomePage {
  constructor(private page: Page) {}

  async open(baseURL: string) {
    await this.page.goto(baseURL);
  }

  async searchProduct(term: string) {
    await this.page.fill('#twotabsearchtextbox', term);
    await this.page.keyboard.press('Enter');
  }

  async hasResultsContaining(text: string) {
    await this.page.waitForSelector('[data-component-type="s-search-result"]');
    const body = await this.page.textContent('body');
    return body?.toLowerCase().includes(text.toLowerCase());
  }
}