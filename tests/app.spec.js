// @ts-check

// Note: don't forget to remove the test@mail.com user before running this test.
// npx playwright test

import { test, expect } from '@playwright/test';

test.describe('navigation', () => {
    test.beforeEach(async ({ page }) => {
        // Signup
        await page.goto('http://localhost:5173/signup');
        await page.getByTestId("displayName").fill('test');
        await page.getByTestId("email").fill('test@mail.com');
        await page.getByTestId("password").fill('password123');
        await page.getByTestId('signupButton').click();

        // Login
        await page.goto('http://localhost:5173/login');
        await page.getByTestId("loginEmail").fill('test@mail.com');
        await page.getByTestId("loginPassword").fill('password123');
        await page.getByTestId("loginButton").click();
    });

    test('upload page', async ({ page }) => {
        // Upload item
        await page.goto('http://localhost:5173/upload');
        await page.getByTestId("title").fill("Test item");
        await page.getByTestId("description").fill("Test item description");
        await page.getByTestId("imageUpload").setInputFiles('src/assets/react.svg');
        await page.getByTestId("uploadButton").click();
    });
});
