import { setWorldConstructor, World, IWorldOptions } from '@cucumber/cucumber';
import { Browser, BrowserContext, Page } from 'playwright';
import { AmazonHomePage } from '../pages/AmazonHomePage';

export class PWWorld extends World {
  browser!: Browser;
  context!: BrowserContext;
  page!: Page;
  baseURL: string;
  // opcional: agrupar POs
  pages!: {
    amazonHome: AmazonHomePage;
  };

  constructor(opts: IWorldOptions) {
    super(opts);
    this.baseURL = (opts.parameters as any)?.baseURL ?? 'https://www.amazon.com.br';
  }
}

setWorldConstructor(PWWorld);