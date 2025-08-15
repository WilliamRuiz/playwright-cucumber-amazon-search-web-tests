import { Given, When, Then } from "@cucumber/cucumber";
import { PWWorld } from "../support/world";

Given("que estou na página inicial da Amazon", async function (this: PWWorld) {
  await this.pages.amazonHome.open(this.baseURL);
});

When("eu pesquiso por {string}", async function (this: PWWorld, termo: string) {
  await this.pages.amazonHome.searchProduct(termo);
});

Then(
  "devo ver resultados relacionados a {string}",
  async function (this: PWWorld, esperado: string) {
    const ok = await this.pages.amazonHome.hasResultsContaining(esperado);
    if (!ok) throw new Error(`Não encontrei "${esperado}" nos resultados`);
  },
);
