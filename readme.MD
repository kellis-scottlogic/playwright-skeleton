# Playwright Skeleton
This is the skeleton Playwright framework for use with  internal Scott Logic projects

1. Start by placing/copying this folder/file structure in the `UI` directory of the main project repo.

2. You will also need to install the following Node packages in the `UI` directory:
    `npm i -D dotenv`
    `npm i -D @playwright/test`
    `npm i -D totp-generator`
    `npm i -D cross-env`

3. We also recommend you add the following scripts to your existing `package.json`

`"test:e2e": "playwright test"`
`"test:e2e-debug": "cross-env PWDEBUG=1 playwright test --project=chromium"`


## Configuring the totp generator for automated E2E test login

This guide will walk you through configuring the totp-generator to handle the MFA steps during an automated login flow

## Contents:
* Create the `.env.playwright` file
* Getting the totp-key from your MS profile
* Adding the totp-generator to your approved authentication methods

## Create the `.env.playwright` file
1. In the Summit Explorer UI directory, create a file name `.env.playwright` 
2. Add 4 variables to this file:

```bash
testUsername = your SL username
testPassword = your SL password
user = First and Last name (i.e. Kieran Ellis)
totpKey = leave this blank
```

![image](https://user-images.githubusercontent.com/91476997/203593045-227e7b5d-10fe-48e3-b636-e5579bda9523.png)

3. Please remember to add the `.env.playwright` file to your `gitignore` as it may contain sensitive credentials

## Getting the totp-key from your MS profile

1. Got to https://mysignins.microsoft.com/security-info
2. Add new sign-in method
3. Select Authenticator app
4. Click on the link "I want to use a different authenticator app"
5. Click on Next and you should see a QR code
6. Click on "Can't Scan Image"
7. Copy the "Secret Key" - do not close this window

## Adding the totp-generator to your approved authentication methods
1. Add the Secret Key to your `.env.playwright` file as the `totpKey` value
2. From the UI directory, run `npm run generate-totp` - this should output a 6 digit code, make a copy of this
3. Back to the Authenticator setup in your browser, click Next and enter the 6 digit code
4. Click Next to complete the setup

This has now added the `totp-generator` as a valid form of MFA for your Scott Logic account
## Contents:
* Create the `.env.playwright` file
* Getting the totp-key from your MS profile
* Adding the totp-generator to your approved authentication methods

## Create the `.env.playwright` file
1. In the Summit Explorer UI directory, create a file name `.env.playwright` (this is already listed in .gitignore so won't get committed)
2. Add 4 variables to this file:

```bash
testUsername = your SL username
testPassword = your SL password
user = First and Last name (i.e. Kieran Ellis)
totpKey = leave this blank
```

![image](https://user-images.githubusercontent.com/91476997/203593045-227e7b5d-10fe-48e3-b636-e5579bda9523.png)

## Getting the totp-key from your MS profile

1. Got to https://mysignins.microsoft.com/security-info
2. Add new sign-in method
3. Select Authenticator app
4. Click on the link "I want to use a different authenticator app"
5. Click on Next and you should see a QR code
6. Click on "Can't Scan Image"
7. Copy the "Secret Key" - do not close this window

## Adding the totp-generator to your approved authentication methods
1. Add the Secret Key to your `.env.playwright` file as the `totpKey` value
2. From the UI directory, run `npm run generate-totp` - this should output a 6 digit code, make a copy of this
3. Back to the Authenticator setup in your browser, click Next and enter the 6 digit code
4. Click Next to complete the setup

This has now added the `totp-generator` as a valid form of MFA for your Scott Logic account
