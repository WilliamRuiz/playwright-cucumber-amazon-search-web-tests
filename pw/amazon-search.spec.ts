import { test, expect } from '@playwright/test';

test('buscar notebook na Amazon BR', async ({ page }) => {
  await page.goto('https://www.amazon.com.br');
  // tenta aceitar cookies se aparecer
  const accept = page.locator('#sp-cc-accept');
  if (await accept.isVisible().catch(() => false)) {
    await accept.click().catch(() => {});
  }
  await page.fill('#twotabsearchtextbox', 'notebook');
  const submit = page.locator('#nav-search-submit-button');
  if (await submit.isVisible()) {
    await submit.click();
  } else {
    await page.keyboard.press('Enter');
  }
  await page.waitForSelector('[data-component-type="s-search-result"]', { timeout: 15000 });
  const body = (await page.textContent('body')) || '';
  expect(body.toLowerCase()).toContain('notebook');
});