// @ts-check

// npx playwright test

import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
  await page.goto('http://localhost:4173/');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Marketplace/);
});

test('get navigation links', async ({ page }) => {
  await page.goto('http://localhost:4173/');

  // Click the upload link.
  await page.getByRole('link', { name: 'Upload' }).click();

  // Click the profile link.
  await page.getByRole('link', { name: 'Profile' }).click();
});
