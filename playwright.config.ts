import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: 'pw',                    // pasta dos testes nativos
  use: {
    headless: true,
    trace: 'retain-on-failure',
    video: 'retain-on-failure',
    screenshot: 'only-on-failure',
  },
});