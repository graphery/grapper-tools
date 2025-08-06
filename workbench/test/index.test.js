import { opendir }      from 'node:fs/promises';
import { join }         from 'node:path';
import { test, expect } from '@playwright/test';
import getName          from '../helpers/getname.js';
import wait             from '../helpers/wait.js';

const IMPORT = '/test/assets/script.js';
const URL    = '/test/cases/';
const FOLDER = '.' + URL;

const dir = await opendir(FOLDER);
for await (const dirent of dir) {
  const file = dirent.name;
  const code = file.replace('.js', '');
  const name = await getName(join(process.cwd(), FOLDER, file));
  test.describe(name, () => {

    test.beforeEach(async ({page}) => {
      await page.goto(`/load.html?case=${ URL }${ dirent.name }&imp=${ IMPORT }`);
      await wait(1000);
    });

    test('compare image', async ({page}) => {
      const show = page.locator('#case');
      await expect(show).toHaveScreenshot()
    });

  });
}
