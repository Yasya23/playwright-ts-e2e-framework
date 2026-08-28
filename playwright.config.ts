import 'dotenv/config';
import { defineConfig, devices } from '@playwright/test';
import { CONFIG } from '@/config/config';

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,

  retries: process.env.CI ? 1 : 2,
  /* Opt out of parallel tests. */
  workers: 2,

  reporter: [
    ['list'], // console output, prints each test as it runs
    [
      'html',
      {
        outputFolder: 'playwright-report/html',
        open: 'never', // don't auto-open browser after run; use report:open script instead
      },
    ],
  ],

  use: {
    baseURL: CONFIG.BASE_URL,
    headless: !!process.env.CI,
    trace: 'on-first-retry',
    testIdAttribute: 'data-test',
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'setup db',
      testMatch: /global\.setup\.ts/,
    },
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
      dependencies: ['setup db'],
    },

    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
      dependencies: ['setup db'],
    },

    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
      dependencies: ['setup db'],
    },
  ],
});
