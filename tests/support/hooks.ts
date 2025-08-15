import { Before, After, setDefaultTimeout } from "@cucumber/cucumber";
import { chromium } from "playwright";
import { PWWorld } from "./world";
import { AmazonHomePage } from "../pages/AmazonHomePage";

setDefaultTimeout(60_000);

Before(async function (this: PWWorld) {
  this.browser = await chromium.launch({ headless: true });
  this.context = await this.browser.newContext();
  this.page = await this.context.newPage();
  this.pages = { amazonHome: new AmazonHomePage(this.page) };
});

After(async function (this: PWWorld, scenario) {
  if (scenario.result?.status === "FAILED") {
    await this.page.screenshot({
      path: `reports/screenshots/${Date.now()}.png`,
    });
  }
  await this.context?.close();
  await this.browser?.close();
});
