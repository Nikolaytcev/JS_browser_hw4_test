import puppetteer from 'puppeteer';
import { fork } from 'child_process';

jest.setTimeout(30000); // default puppeteer timeout

describe('Credit Card Validator form', () => {
  let browser = null;
  let page = null;
  let server = null;
  const baseUrl = 'http://localhost:9000';

  beforeAll(async () => {
    server = fork(`${__dirname}/e2e.server.js`);
    await new Promise((resolve, reject) => {
      server.on('error', reject);
      server.on('message', (message) => {
        if (message === 'ok') {
          resolve();
        }
      });
    });

    browser = await puppetteer.launch({
      headless: false, // show gui
      slowMo: 50,
      devtools: true, // show devTools
    });
    page = await browser.newPage();
  });

  afterAll(async () => {
    await browser.close();
    server.kill();
  });

  test('should show mastercard', async () => {
    await page.goto(baseUrl);

    await page.waitForSelector('.card-images');
    await page.waitForSelector('.card-number-form-widget');

    const form = await page.$('.card-number-form-widget');
    const input = await form.$('.card-number-input');

    await input.type('5592919644779856');
    await page.waitForSelector('.card-image.visa.uncolor');
    await page.waitForSelector('.card-image.americanexpress.uncolor');
    await page.waitForSelector('.card-image.mir.uncolor');
    await page.waitForSelector('.card-image.unionpay.uncolor');
  });

  test('should show visa', async () => {
    await page.goto(baseUrl);

    await page.waitForSelector('.card-images');
    await page.waitForSelector('.card-number-form-widget');

    const form = await page.$('.card-number-form-widget');
    const input = await form.$('.card-number-input');

    await input.type('4556396370410179');
    await page.waitForSelector('.card-image.mastercard.uncolor');
    await page.waitForSelector('.card-image.americanexpress.uncolor');
    await page.waitForSelector('.card-image.mir.uncolor');
    await page.waitForSelector('.card-image.unionpay.uncolor');
  });

  test('should show americanexpress', async () => {
    await page.goto(baseUrl);

    await page.waitForSelector('.card-images');
    await page.waitForSelector('.card-number-form-widget');

    const form = await page.$('.card-number-form-widget');
    const input = await form.$('.card-number-input');

    await input.type('342721429851692');
    await page.waitForSelector('.card-image.mastercard.uncolor');
    await page.waitForSelector('.card-image.visa.uncolor');
    await page.waitForSelector('.card-image.mir.uncolor');
    await page.waitForSelector('.card-image.unionpay.uncolor');
  });
});