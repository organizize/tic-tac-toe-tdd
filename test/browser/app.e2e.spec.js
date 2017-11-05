import {expect} from 'chai';
import 'babel-polyfill';
import puppeteer from 'puppeteer';
import {beforeAndAfter} from '../environment';
import {testBaseUrl, eventually} from '../test-common';

let browser, page;

const navigate = () => page.goto(testBaseUrl);

const clickACellAt = async index => {
  const cells = await page.$$('[data-hook="cell"]');
  return cells[index].click();
};

const getCellTextAt = index =>
  page.$$eval(
    '[data-hook="cell"]',
    (cells, index) => cells[index].innerHTML, index
  );

const getStatusMessage = () =>
  page.$eval(
    '[data-hook="status-message"]',
    elem => elem.innerText
  );

const isStatusMessageVisible = async () =>
  (await page.$('[data-hook="status-message"]')) !== null;

const save = async () => (await page.$('[data-hook="save"]')).click();

const load = async () => (await page.$('[data-hook="load"]')).click();

describe('React application', () => {
  beforeAndAfter();

  before(async () => {
    browser = await puppeteer.launch({headless: true});
    page = await browser.newPage();
  });

  after(() => {
    browser.close();
  });

  it('should have an "X" after first user click', async () => {
    await navigate();
    await clickACellAt(0);
    expect(await getCellTextAt(0)).to.equal('X');
  });

  it('"X" player should win the game', async () => {
    await navigate();
    expect(await isStatusMessageVisible(), 'is winner message visible').to.equal(false);
    await clickACellAt(0);
    await clickACellAt(3);
    await clickACellAt(1);
    await clickACellAt(4);
    await clickACellAt(2);
    expect(await getStatusMessage()).to.equal('X Wins!');
  });

  it('should load a saved game', async () => {
    await navigate();
    await clickACellAt(0);
    await save();
    await navigate();
    await load();

    return eventually(async () =>
      expect(await getCellTextAt(0)).to.equal('X'));
  });
});
