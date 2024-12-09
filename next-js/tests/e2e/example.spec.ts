import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
  await page.goto('http://localhost:3100');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle("Create Next App");
});

test('get started link', async ({ page }) => {
  await page.goto('http://localhost:3100');

  await expect(page.getByTestId('home-page-container')).toHaveText([
    '|__:)__/'
  ]);
});
