import { test, expect } from '@playwright/test';
import { timeout } from 'rxjs-compat/operator/timeout';

test.beforeEach(async({page}, testInfo) => {
    await page.goto(process.env.URL) 
    await page.getByText('Button Triggering AJAX Request').click()
    testInfo.setTimeout(testInfo.timeout + 2000) //moze i ovako da se override timeout
})

test('auto waiting', async({page}) => {
    const successButton = page.locator('.bg-success')

    // await successButton.click()

    // const  text = await successButton.textContent()

    // await successButton.waitFor({state: 'attached'})
    // const  text = await successButton.allTextContents()

    // expect(text).toContain('Data loaded with AJAX get request.')

    await expect(successButton).toHaveText('Data loaded with AJAX get request.', {timeout: 20000})
})

test.skip('alternative waits', async ({page}) => {
    const successButton = page.locator('.bg-success')

    // ___ wait for element
    // await page.waitForSelector('.bg-success')

    // ___ wait for particulare response
    await page.waitForResponse('http://uitestingplayground.com/ajaxdata')

    // ___ wait for network calls to be completed (NOT RECOMMENDED)
    await page.waitForLoadState('networkidle')

    await page.waitForTimeout(5000) // Hard code wait



    const  text = await successButton.allTextContents()
    expect(text).toContain('Data loaded with AJAX get request.')
})

test.skip('timeouts', async({page}) => {
    // test.setTimeout(10000) //ovaj test fejluje zato sto je testtimeout postavljen na 10sec iako je tamo postavljeno na 16sec
    test.slow() // ovo daje vreme x3 i daje testu vremena da se odradi
    const successButton = page.locator('.bg-success')
    await successButton.click({timeout: 16000})
})