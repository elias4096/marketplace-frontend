import { test as setup } from '@playwright/test';

const authFile = 'playwright/.auth/user.json';

// Todo: use getByTestId()

setup('authenticate', async ({ page }) => {
    // Signup
    await page.goto('http://localhost:5173/signup');
    await page.getByRole('textbox').nth(0).fill('test');
    await page.getByRole('textbox').nth(1).fill('test@mail.com');
    await page.getByRole('textbox').nth(2).fill('password123');
    await page.getByRole('button').click();

    // Login
    await page.goto('http://localhost:5173/login');
    await page.getByRole('textbox').nth(0).fill('test@mail.com');
    await page.getByRole('textbox').nth(1).fill('password123');
    await page.getByRole('button', { name: "Log in" }).click();

    // Save cookies
    await page.waitForURL('http://localhost:5173/profile');
    await page.context().storageState({ path: authFile });

    // Upload item
    await page.goto('http://localhost:5173/upload');
    await page.getByPlaceholder("Enter item title").fill('Test item');
    await page.getByPlaceholder("Describe your item in detail").fill('Test item description.');
    await page.locator('input[type="file"]').setInputFiles('src/assets/react.svg');
    await page.getByRole('button', { name: "Upload" }).click();
});
