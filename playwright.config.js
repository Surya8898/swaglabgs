// @ts-check
import { defineConfig, devices } from '@playwright/test';



/**
 * @see https://playwright.dev/docs/test-configuration
 */
export default defineConfig({
  testDir: './tests',
  retries:1,

  timeout: 40000,

  expect: {

    timeout: 40000,

  },

  use: {

    baseURL: 'https://www.saucedemo.com/',

    browserName: 'chromium',

    javaScriptEnabled: true,

    headless: false,

    screenshot: 'on',
    trace: 'on',
    video: 'on',
    //viewport:{width:1620,height:1080},
   

  },

  reporter:[

  ["line"], 
  
  ["allure-playwright"]


   
  ],
 
});

