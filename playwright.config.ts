import { defineConfig } from '@playwright/test';

export default defineConfig({
  timeout: 45_000,
  use: {
    headless: true,
    trace: 'retain-on-failure',
    video: 'retain-on-failure',
    screenshot: 'only-on-failure'
  },
  reporter: [
    ['list'],
    ['junit', { outputFile: 'reports/junit-results.xml' }]
  ]
});