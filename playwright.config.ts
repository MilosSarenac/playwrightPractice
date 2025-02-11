import { base } from '@faker-js/faker/.';
import { defineConfig, devices } from '@playwright/test';
import type { TestOptions } from './test-options';


// import dotenv from 'dotenv';
// import path from 'path';
// dotenv.config({ path: path.resolve(__dirname, '.env') });
require('dotenv').config();


export default defineConfig<TestOptions>({
  // ovo je kako postavljamo timeout kako mi hocemo
  // timeout: 10000,
  // globaltime
  // globalTimeout: 60000,
  // expect: {
  //   timeout: 2000,
  // },




  reporter: [
    ['html']
  ],
  use: {

    // baseURL: 'http://localhost:4200/',
    globalsQaURL: 'https://www.globalsqa.com/demo-site/draganddrop/',
    baseURL: process.env.DEV ==='1' ? 'http://localhost:4200/'
        :process.env.STAGING ==='1' ? 'http://localhost:4200/'
        :'http://localhost:4200/',


    trace: 'on-first-retry',
    // actionTimeout:  5000,
    navigationTimeout: 5000,
    video: {
      mode: 'on',
      size: {width: 1920, height:1080},
    }
  },


  projects: [
    {
      name: 'dev',
      use: { 
        ...devices['Desktop Chrome'],
        baseURL: 'http://localhost:4200/', //ovde moze da se stavljaju razliciti baseURL
      },
    },
    {
      name: 'staging',
      use: { 
        ...devices['Desktop Chrome'],
        baseURL: 'http://localhost:4200/',
       },
    },
    {
      name: 'chromium',
    },

    {
      name: 'firefox',
      use: { 
        browserName: 'firefox' },
    },
    {
      name: 'mobile',
      testMatch: 'testMobile.spec.ts',
      use: {
        ...devices['iPhone 13 Pro'],
        baseURL: 'http://localhost:4200/',
      }
    },
  ],

  webServer: {
    command: 'npm run start',
    url: 'http://localhost:4200/'
  }
});
