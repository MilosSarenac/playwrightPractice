import { test, expect } from '@playwright/test';
import { exec } from 'child_process';



// ne koristi se cesto
// test.beforeAll(()=>{

// })



// before hook
test.beforeEach(async({page})=>{
    await page.goto('/') // ako komanda vraca promise mora se koristiti await (da ne bi doslo do race condition)
    await page.getByText('Forms').click()
    await page.getByText('Form Layouts').click()
})

test('Locator syntax rules' ,async({page})=>{
    // by tag name
    await page.locator('input').first().click()

    // by ID
    page.locator('#inputEmail1')

    // by Class value
    page.locator('.shape-rectangle')

    // bt attribute
    page.locator('[placeholder="Email"]')

    // by class value (full)
    page.locator('[class="input-full-width size-medium status-basic shape-rectangle nb-transition"]')

    // combine different selectors
    page.locator('input[placeholder="Email"][nbinput]')

    // by xpath (NOT RECOMENDED)
    page.locator('//*[@id="inputEmail1"]')

    // by partial text match
    page.locator(':text("Using")')

    // by exact text match
    page.locator(':text-is("Using the Grid")')
})

// ova dva nisu dobra praksa
// test.afterEach()
// test.afterAll() // recimo za b

test('User facing locators', async({page}) => {
    await page.getByRole('textbox', {name: "Email"}).first().click()
    await page.getByRole('button', {name: "Sign in"}).first().click()

    await page.getByLabel('Email').first().click()

    await page.getByPlaceholder('Jane Doe').click()

    await page.getByText('Using the Grid').click()

    // await page.getByTitle('IoT Dashboard').click()

    // This is not rlly user facing locator
    await page.getByTestId('SignIn').click()
})

test('Locating child elements', async({page}) => {
    await page.locator('nb-card nb-radio :text-is("Option 1")').click()
    await page.locator('nb-card').locator('nb-radio').locator(':text-is("Option 2")').click()

    await page.locator('nb-card').getByRole('button', {name: "Sign in"}).first().click()

    // least preferable approach (ako nisu skroz isti elementi onda bi moralo da ide ovako)
    await page.locator('nb-card').nth(3).getByRole('button').click()

    
})

test('Locating parent elements', async({page}) => {
    await page.locator('nb-card', {hasText: "Using the Grid"}).getByRole('textbox', {name: "Email"}).click()
    await page.locator('nb-card', {has: page.locator('#inputEmail1')}).getByRole('textbox', {name: "Email"}).click()

    await page.locator('nb-card').filter({hasText: "Basic form"}).getByRole('textbox', {name: "Email"}).click()
    await page.locator('nb-card').filter({has: page.locator('.status-danger')}).getByRole('textbox', {name: "Password"}).click()

    await page.locator('nb-card').filter({has: page.locator('nb-checkbox')}).filter({hasText: "Sign in"}).getByRole('textbox', {name: "Email"}).click()

    // not recomended (zato sto je '..' xpath)
    await page.locator(':text-is("Using the Grid")').locator('..').getByRole('textbox', {name: "Email"}).click()
})

test('Reusing locators', async({page}) => {
    const basicForm = page.locator('nb-card').filter({hasText: "Basic form"})
    const emailField = basicForm.getByRole('textbox', {name: "Email"})

    await emailField.fill("test@test.com")
    await basicForm.getByRole('textbox', {name: "Password"}).fill("Wlecome123")
    await basicForm.locator('nb-checkbox').click()
    await basicForm.getByRole('button').click()

    await expect(emailField).toHaveValue('test@test.com')
})

test('extracting values', async({page}) => {
    // singe text value
    const basicForm = page.locator('nb-card').filter({hasText: "Basic form"})
    const buttonText = await basicForm.locator('button').textContent()
    expect(buttonText).toEqual('Submit')

    // all text values
    const allRadioButtonsLabes = await page.locator('nb-radio').allTextContents()
    expect(allRadioButtonsLabes).toContain("Option 1")

    // input value (da se cuva text u polju ili da li je text u polju)
    const emailField1 = basicForm.getByRole('textbox', {name: "Email"})
    await emailField1.fill('test@test.com')
    const emailValue = await emailField1.inputValue()
    expect(emailValue).toEqual('test@test.com')

    const placeholderValue = await emailField1.getAttribute('placeholder')
    expect(placeholderValue).toEqual('Email')
})

test('assertions', async({page}) => {
    const basicFormButton = page.locator('nb-card').filter({hasText: "Basic form"}).locator('button')

    // General assertions (generic assertions)
    const value = 5
    expect(value).toEqual(5)

    const text = await basicFormButton.textContent()
    expect(text).toEqual("Submit")

    // locator assertion
    await expect(basicFormButton).toHaveText('Submit')

    // Soft assertion (znaci da ce nastaviti test posle nego sto je test pukao)
    await expect.soft(basicFormButton).toHaveText('Submit')
    await basicFormButton.click()
})

