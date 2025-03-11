import {expect, Locator, Page} from "@playwright/test";

export class Button {
    readonly dataTestId: string
    readonly page: Page

    constructor(page:Page, dataTestId: string) {
        this.page = page
        this.dataTestId = dataTestId

    }

    get button(): Locator {
        return this.page.getByTestId(this.dataTestId)

    }

    async buttonVisible (): Promise<void> {
        await expect (this.button).toBeVisible()
    }

    async click(): Promise<void> {
        await this.button.click();
    }

}