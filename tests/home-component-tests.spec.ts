import { test, expect } from '@playwright/test';

test.beforeEach(async ({page}) => {
    await page.goto('http://localhost:4200');
});

test('should show login componenent', async ({page}) => {
    await expect(page.locator('app-login')).toBeVisible();
});

test('should show register component', async({page})=> {
    await page.getByTestId('register-btn').click();
    await expect(page.locator('app-register')).toBeVisible();
});

test('should register user, show and alert and then return to login page', async({page}) => {
    // go to register page
    await page.getByTestId('register-btn').click();
    await expect(page.locator('app-register')).toBeVisible();

    // fill the form
    await page.locator('input#name').fill('João');
    await page.locator('input#surname').fill('Silva');
    await page.locator('input#email').fill('joao@email.com');
    await page.locator('input#password').fill('123456');

    // submit form
    await page.locator('button[type="submit"]').click();

    // check if alert is correct
    page.once('dialog', async (dialog) => {
        expect(dialog.message()).toBe('User registered.');
        await dialog.accept();
    });

    // show login component again
    await expect(page.locator('app-login')).toBeVisible();
});

test('should show allert and return to login page when logging in with non existent user', async({page}) => {
    // fill the form without creating user
    await page.locator('input#email').fill('joao@email.com');
    await page.locator('input#password').fill('123456');

    // submit form
    await page.locator('button[type="submit"]').click();

    // check if alert is correct
    page.once('dialog', async (dialog) => {
        expect(dialog.message()).toBe('Invalid login data..');
        await dialog.accept();
    });

    // show login component again
    await expect(page.locator('app-login')).toBeVisible();
});

test('should register user, login, show user info then logout and show login component', async({page})=> {
    // go to register page
    await page.getByTestId('register-btn').click();
    await expect(page.locator('app-register')).toBeVisible();

    // fill the form
    await page.locator('input#name').fill('João');
    await page.locator('input#surname').fill('Silva');
    await page.locator('input#email').fill('joao@email.com');
    await page.locator('input#password').fill('123456');

    // submit form
    await page.locator('button[type="submit"]').click();

    // check if alert is correct
    page.once('dialog', async (dialog) => {
        expect(dialog.message()).toBe('User registered.');
        await dialog.accept();
    });

    // show login component again
    await expect(page.locator('app-login')).toBeVisible();

    // Fill login form
    await page.locator('input#email').fill('joao@email.com');
    await page.locator('input#password').fill('123456');
    await page.locator('button[type="submit"]').click();

    // should show user details
    await expect(page.locator('app-user-home')).toBeVisible();
    await expect(page.locator('h1')).toHaveText('Welcome João');
    await expect(page.locator('p')).toHaveText('Your Details:');
    await expect(page.locator('ul li')).toContainText(['Full name: João Silva', 'Email: joao@email.com']);
    
    // should click logout button and show login component
    await page.locator('button').click();
    await expect(page.locator('app-login')).toBeVisible();
});

test('should show alert and return to login page when logging in with non existent user', async({page}) => {
    // fill the form without creating user
    await page.locator('input#email').fill('joao@email.com');
    await page.locator('input#password').fill('123456');

    // submit form
    await page.locator('button[type="submit"]').click();

    // check if alert is correct
    page.once('dialog', async (dialog) => {
        expect(dialog.message()).toBe('Invalid login data..');
        await dialog.accept();
    });

    // show login component again
    await expect(page.locator('app-login')).toBeVisible();
});

test('should not register user and show alert when registerig with invalid data', async({page})=> {
    // go to register page
    await page.getByTestId('register-btn').click();
    await expect(page.locator('app-register')).toBeVisible();

    // fill the form
    await page.locator('input#name').fill('João');
    await page.locator('input#surname').fill('Silva');
    await page.locator('input#email').fill('joao');
    await page.locator('input#password').fill('123456');

    // submit form
    await page.locator('button[type="submit"]').click();

    // check if alert is correct
    page.once('dialog', async (dialog) => {
        expect(dialog.message()).toBe('Invalid user data');
        await dialog.accept();
    });

    // show register component again
    await expect(page.locator('app-register')).toBeVisible();
});
