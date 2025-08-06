import { defineConfig } from '@playwright/test';

const port    = process.env.PORT || 9002;
const options = process.env.options || '-t ./test/cases';

const webServer = port ? {
  command             : `node ./src/index.js ${ options } -p ${ port }`,
  url                 : `http://localhost:${ port }/`,
  timeout             : 120000,
  reuseExistingServer : !process.env.CI,
} : undefined;


/**
 * @see https://playwright.dev/docs/test-configuration
 */
export default defineConfig({
  testDir       : './test',
  fullyParallel : true,
  forbidOnly    : !!process.env.CI,
  retries       : process.env.CI ? 2 : 0,
  workers       : process.env.CI ? 1 : undefined,
  reporter      : 'list',
  use           : {
    trace    : 'on-first-retry',
    browsers : ['chromium'],
    viewport : {width : 1280, height : 720},
    baseURL  : `http://localhost:${ port }/`,
  },

  webServer
});

