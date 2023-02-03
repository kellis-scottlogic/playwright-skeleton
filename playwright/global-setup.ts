import {chromium} from '@playwright/test';
import * as fs from 'fs';
import {env} from 'process';
import {waitOnPage} from './utilities/generalHelper';
import totp from 'totp-generator';

const testUsername = `${env.testUsername}`;
const testPassword = `${env.testPassword}`;
const totpKey = `${env.totpKey}`;

async function globalSetup() {
  // Log into the application
  const totpToken = totp(totpKey);
  const browser = await chromium.launch({channel: 'msedge'});
  const context = await browser.newContext({
    ignoreHTTPSErrors: true,
    baseURL: 'http://localhost:3000',
  });
  const page = await context.newPage();
  await page.goto('/');
  await page.locator('button:has-text("Sign in")').click();
  await page.locator('input#i0116').fill(testUsername);
  await page.locator('text = Next').click();
  await waitOnPage(2);
  await page.locator('#i0118').fill(testPassword);
  await page.locator('text=Sign in').click();
  const noApp = page.getByText(
    "I can't use my Microsoft Authenticator app right now"
  );
  const useCode = page.getByText('Use a verification code');
  await Promise.race([noApp.waitFor(), useCode.waitFor()]);
  if (await noApp.isVisible()) {
    await noApp.click();
    await useCode.click();
  } else {
    await useCode.click();
  }
  await page.getByPlaceholder('Code').fill(totpToken);
  await page.getByText('Verify').click();

  // Capture the token from the oath response
  // First step waits for the email.scope token to generate as we don't need this
  await Promise.all([
    page.waitForResponse('**/oauth2/v2.0/token'),
    page.getByText('Yes').click(),
  ]);
  const response = await page.waitForResponse('**/oauth2/v2.0/token');
  const token = (await response.json()).access_token;

  // Set it as a env variable and save it in a json file

  env.API_TOKEN = token;
  const auth = {
    bearer: token,
  };
  const jsonAuth = JSON.stringify(auth);
  fs.writeFile('auth.json', jsonAuth, (err) => {
    if (err) throw err;
    console.log('The token has been saved!');
  });
  await page.waitForLoadState('networkidle');

  // Save local storage data (cookies and origins) as a json

  await page.context().storageState({path: 'storageState.json'});

  await page.context().close();
}

export default globalSetup;
