import { test, expect } from '@playwright/test'

let page;
let context;

test.beforeAll(async ({ browser }) => {

    context = await browser.newContext({
        viewport: { width: 1440, height: 900 }
    })
    page = await context.newPage()
})

test.afterAll(async ({ browser }) => {


    await page.close()

})

test.describe('ScopeX Add ', async () => {

    test('Should be able to login Successfully', async () => {
        await page.goto(`${process.env.BASE_URL}/Login`);

        await page.locator('input[name="username"]').fill(process.env.EMAIL_USERNAME);

        /* 
            Example of Automation for Input Validations: Using a Wrong Password
            As part of my assessment, I have been asked to write an automation script. Due to time constraints, 
            i am not covering validation for all input fields. However to demonstrate the approach, 
            I have provided the following example
        */
        await page.locator('input[name="password"]').fill("WrongPassword");
        await page.locator('button:has-text("Log in")').click()

        // to Test that a toast message appears with the validation error
        await expect(await page.locator('.Toastify__toast-container')).toBeVisible()
        await expect(await page.locator('.Toastify__toast-container').innerText()).toContain('Username or password is incorrect!')
        await page.locator('.Toastify__toast-container').click(); // To close it

        // to verify that the user can log in successfully
        await page.locator('input[name="password"]').fill(process.env.PASSWORD);
        await page.locator('button:has-text("Log in")').click()
        await page.waitForURL(`${process.env.BASE_URL}/Dashboard`);
        await expect(await page.locator('h2:has-text("Hello, Prince")')).toBeVisible()
    })

    test('Should be able to add a recipient successfully', async () => {
        await page.locator('button:has-text("Recipients")').click();
        await page.locator('a:has-text("Add Recipient")').click();

        // to verify that the user is redirected to the Add Recipient page
        await page.waitForURL(`${process.env.BASE_URL}/Add-Recipient`);
        await expect(await page.locator('.page-title:has-text("Add Recipient")')).toBeVisible();

        const recipientNickName = `harsh${new Date().toISOString().replace(/[-:T.]/g, '').slice(0, 14)}`;
        await page.locator('input[name="recipient_name"]').fill("Harsh");
        await page.locator('input[name="recipient_nick_name"]').fill(recipientNickName);
        await page.locator('input[name="bank_account_number"]').fill(process.env.RECIPIENTS_ACCOUNT_NUMBER);
        await page.locator('input[name="ifsc_code"]').fill(process.env.RECIPIENTS_IFSC_NUMBER);
        await page.selectOption('select[name="country"]', { label: 'India' });
        await page.locator('select[name="country"]').click()
        await page.locator('button:has-text("Submit")').click()

        /*
            Example of api testing using automation 
        */
        const responsePromise = page.waitForResponse('https://api.scopex.money/misc/verify-account-number');
        const response = await responsePromise;

        // Verify that the API response returns a status code of 200 (OK)
        expect(response.status()).toBe(200);

        const jsonResponse = await response.json();
        // To verify the structure and types of the response object
        expect(jsonResponse).toMatchObject({
            account_exists: expect.any(Boolean),
            full_name: expect.any(String),
            ifsc_details: {
                bank: expect.any(String),
                branch: expect.any(String),
                city: expect.any(String),
                ifsc: expect.any(String),
            },
        });
        expect(jsonResponse.account_exists).toBe(true);
        expect(jsonResponse.ifsc_details.bank).toBe('ICICI BANK LIMITED');

        // testing if the modal is visible or not 
        const dialog = page.locator('.swal2-modal');
        await expect(dialog).toBeVisible();
        const title = dialog.locator('#swal2-title');
        await expect(title).toHaveText('Confirm recipient details');

        await page.locator('.swal2-modal button:has-text("Confirm")').click()

        //Verifying the Added recipient
        await expect(await page.locator('.Toastify__toast-container')).toBeVisible()
        await expect(await page.locator('.Toastify__toast-container').innerText()).toContain('Recipient added successfully!')
        await page.waitForURL(`${process.env.BASE_URL}/Recipient-List`);

        //Verifying the recipient added by the script in the Recipient list table
        await expect(await page.locator(`tbody tr:has-text("${recipientNickName}")`)).toBeVisible();

    })

    test('Should be able to log out successfully', async () => {
        await page.locator('button.dashboard-top-menu').click()
        await page.locator('a:has-text("Log out")').click()
        await page.waitForURL(`${process.env.BASE_URL}/#`)

        // Verifying if redirected to home page or not
        await expect(page.locator('a:has-text("Login")')).toBeVisible();
    })
})