import {Page} from '@playwright/test'
import { HelperBase } from './helperBase'

export class FormLayoutPage extends HelperBase{  
    
    constructor(page: Page){
        super(page)
    }

    async submitUsingTheGridFormWithCredentialAndSelectOption(email: string, password: string, optionText: string){
        const usingTheGridForm = this.page.locator('nb-card', {hasText: "Using the Grid"})
        await usingTheGridForm.getByRole('textbox', {name: "Email"}).fill(email)
        await usingTheGridForm.getByRole('textbox', {name: "Password"}).fill(password)
        await usingTheGridForm.getByRole('radio', {name: optionText}).check({force: true})
        await usingTheGridForm.getByRole('button').click()
    }
    // Ovo sluzi da mozemo da napisemo sta je sta i onda kad uradim hover tamo gde sam ih koristio da mi tacno kaze sta je sta i gde sam ga koristio
    /**
     * This method fill out the Inline form with user detail
     * @param name - should be first and last name
     * @param email - valid email for thest user
     * @param rememberMe - true or fales if user session is saved
     */
    async submitInLineFormWithNameEmailAndCheckBox(name: string, email: string, rememberMe: boolean){
        const inlineFrom = this.page.locator('nb-card', {hasText: "Inline form"})
        await inlineFrom.getByRole('textbox', {name: "Jane Doe"}).fill(name)
        await inlineFrom.getByRole('textbox', {name: "Email"}).fill(email)
        if(rememberMe)
            await inlineFrom.getByRole('checkbox').check({force: true})
        await inlineFrom.getByRole('button').click()

    }
}