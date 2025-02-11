import { Locator, Page } from "@playwright/test"
import { HelperBase } from "./helperBase"

export class NavigationPage extends HelperBase{

    readonly fromLayoutsMenuItem: Locator
    readonly datePickerMenuItem: Locator
    readonly taostrMenuItem: Locator
    readonly toolTipMenuItem: Locator

    constructor(page: Page){
        super(page)

    }

    async formLayoutsPage(){
        await this.selectGroupMenuItem('Forms')
        await this.page.getByText('Form Layouts').click()
    }

    async datePickerPage(){
        await this.selectGroupMenuItem('Forms')
        await this.page.getByText('Datepicker').click()
        await this.waitForNumberOfSeconds(2)

    }

    async smartTablePage(){
        await this.selectGroupMenuItem('Tables & Data')

        await this.page.getByText('Smart Table').click()
    }

    async toastrPage(){
        await this.selectGroupMenuItem('Modal & Overlays')
        await this.page.getByText('Toastr').click()
    }

    async toolTipPage(){
        await this.selectGroupMenuItem('Modal & Overlays')
        await this.page.getByText('Tooltip').click()
    }

    private async selectGroupMenuItem(groupItemTitle: string){
        const groupMenuItem = this.page.getByTitle(groupItemTitle)
        const expendedState = await groupMenuItem.getAttribute('aria-expanded')
        if(expendedState == "false")
            await groupMenuItem.click()
    }
}