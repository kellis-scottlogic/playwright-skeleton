import {PlaywrightTestConfig, devices} from '@playwright/test';
import * as dotenv from 'dotenv';

/* Set test credentials an env variables */
dotenv.config({path: './.env.playwright'});

/**
 * See https://playwright.dev/docs/test-configuration.
 */

const config: PlaywrightTestConfig = {
  testDir: './playwright/tests',

  /* Maximum time one test can run for. */
  timeout: 30 * 1000,

  globalSetup: require.resolve('./playwright/global-setup'),

  expect: {
    /**
     * Maximum time expect() should wait for the condition to be met.
     * For example in `await expect(locator).toHaveText();`
     */
    timeout: 5000,
  },

  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,

  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,

  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,

  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: process.env.CI
    ? [['junit', {outputFile: 'results.xml'}], ['dot']]
    : [['html', {open: 'always'}]],

  /*Deletes the saved storageState file on completion of all the tests */
  globalTeardown: './playwright/global-teardown',

  use: {
    baseURL: 'http://localhost:3000',
    storageState: './storageState.json',
    /* Maximum time each action such as `click()` can take. Defaults to 0 (no limit). */
    actionTimeout: 0,

    ignoreHTTPSErrors: true,

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */

    screenshot: 'only-on-failure',

    trace: 'on-first-retry',
  },

  projects: [
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Edge'],
      },
    },
  ],
};
export default config;
