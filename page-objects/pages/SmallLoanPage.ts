import {Locator, Page} from "@playwright/test";
import {Button} from "../atoms/Button";
import {Input} from "../atoms/Input";

const url = "https://loan-app.tallinn-learning.ee/small-loan";

export class SmallLoanPage {
    readonly page: Page;
    readonly applyButton: Button;
    readonly applyIMage1: Button
    readonly applyImage2: Button
    readonly amountInput: Input
    readonly periodSelect: Locator
    readonly periodOptions: Locator
    readonly userNameInput: Input
    readonly passwordInput: Input
    readonly continueButton: Button
    readonly amountSlider: Locator
    readonly periodSlider: Locator
    readonly monthlyPayment: Locator


    constructor(page:Page) {
        this.page = page;
        this.applyButton = new Button(page, "id-small-loan-calculator-field-apply")
        this.applyIMage1 = new Button(page, "id-image-element-button-image-1")
        this.applyImage2 = new Button(page, "id-image-element-button-image-2")
        this.amountInput = new Input(page, "id-small-loan-calculator-field-amount")
        this.periodSelect = page.getByTestId("ib-small-loan-calculator-field-period")
        this.periodOptions = this.periodSelect.locator("option")
        this.userNameInput = new Input(page, "login-popup-username-input")
        this.passwordInput = new Input(page, "login-popup-password-input")
        this.continueButton = new Button(page, "login-popup-continue-button")
        this.amountSlider = page.getByTestId("id-small-loan-calculator-field-amount-slider")
        this.periodSlider = page.getByTestId("ib-small-loan-calculator-field-period-slider")
        this.monthlyPayment = page.getByTestId("ib-small-loan-calculator-field-monthlyPayment")

    }

    async open(): Promise<void> {
        await this.page.goto(url)
    }

    async getFirstPeriodOption(): Promise<string> {
        const allOptions = await this.periodOptions.all()
        return await allOptions[0].innerText()
    }

    async login(): Promise<void> {
        await this.userNameInput.fill('test')
        await this.passwordInput.fill('test')
        await this.continueButton.click()
    }

    async getMonthlyPayment(): Promise<string> {
        const text = await this.monthlyPayment.innerText()
        return text.split(" ")[0]
    }

    async getPeriodCurrentValue(): Promise<string> {
        return await this.periodSlider.inputValue();

    }

    // async choosePeriodFromSelect(innerText:string): Promise<void> {
    //     await this.periodSelect.click()
    //     await this.periodOptions.locator("option", {hasText: innerText}).hover()
    //     await this.periodOptions.locator("option", {hasText: innerText}).click()
    //
    // }

}