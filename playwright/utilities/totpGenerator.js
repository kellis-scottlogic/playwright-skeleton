/* eslint-disable @typescript-eslint/no-var-requires */
const totp = require("totp-generator");
require('dotenv').config({ path: 'C:/DEV/summit-explorer/ui/.env.playwright' });

const token = totp(`${process.env.totpKey}`);
console.log(token);