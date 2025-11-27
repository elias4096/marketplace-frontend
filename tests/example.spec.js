// @ts-check

// npx playwright test

import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
  await page.goto('http://localhost:5173/');
  await expect(page).toHaveTitle(/Marketplace/);
});

test('get navigation links', async ({ page }) => {
  await page.goto('http://localhost:5173/');
  await page.getByRole('link', { name: "Upload" }).click();
  await page.getByRole('link', { name: "Profile" }).click();
});

test('get authentication links', async ({ page }) => {
  await page.goto('http://localhost:5173/profile');
  await page.getByRole('link', { name: "Don't have an account?" }).click();
  await page.getByRole('link', { name: "Already have an account?" }).click();
});

test('get home link', async ({ page }) => {
  await page.goto('http://localhost:5173/profile');
  await page.getByRole('link', { name: "Marketplace" }).click();
});
