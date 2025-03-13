import { test } from "@playwright/test";
import { SmallLoanPage } from "../page-objects/pages/SmallLoanPage";

test.describe("Loan App mock Tests", async () => {
  test("TL-21-1 positive test", async ({ page }) => {
    const expectedMonthlyAmount = 100005;
    const smallLoanPage = new SmallLoanPage(page);

    await page.route("**/api/loan-calc*", async (request) => {
      const responseBody = { paymentAmountMonthly: expectedMonthlyAmount };
      await request.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify(responseBody),
      });
    });

    const loanCalcResponse = page.waitForResponse("**/api/loan-calc*");
    await smallLoanPage.open();
    await loanCalcResponse;
    await smallLoanPage.checkMonthlyAmount(expectedMonthlyAmount);
  });

  test("TL-21-2 status 500 with no body", async ({ page }) => {
    const smallLoanPage = new SmallLoanPage(page);

    await page.route("**/api/loan-calc*", async (request) => {
      await request.fulfill({
        status: 500,
        contentType: "application/json",
      });
    });

    const loanCalcResponse = page.waitForResponse("**/api/loan-calc*");
    await smallLoanPage.open();
    await loanCalcResponse;
    await smallLoanPage.checkErrorMessageOoops();
  });

  test("TL-21-3 status 200 with no body", async ({ page }) => {
    const smallLoanPage = new SmallLoanPage(page);

    await page.route("**/api/loan-calc*", async (request) => {
      await request.fulfill({
        status: 200,
        contentType: "application/json",
      });
    });

    const loanCalcResponse = page.waitForResponse("**/api/loan-calc*");
    await smallLoanPage.open();
    await loanCalcResponse;
    await smallLoanPage.checkPaymentUndefined();
  });

  test("TL-21-4 status 200 incorr key", async ({ page }) => {
    const smallLoanPage = new SmallLoanPage(page);
    await page.route("**/api/loan-calc*", async (request) => {
      const responseBody = { incorrKey: 101 };
      await request.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify(responseBody),
      });
    });

    const loanCalcResponse = page.waitForResponse("**/api/loan-calc*");
    await smallLoanPage.open();
    await loanCalcResponse;
    await smallLoanPage.checkPaymentUndefined();
  });
});
