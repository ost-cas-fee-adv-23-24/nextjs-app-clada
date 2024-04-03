import { expect, test } from '@playwright/test';

test('has title', async ({ page }) => {
  await page.goto('http://localhost:3000/');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Mumble/);
});

test('has initially 10 posts', async ({ page }) => {
  await page.goto('http://localhost:3000/');

  const items = page.getByTestId('single-post');

  expect(await items.count()).toBe(10);
});

test('loads 10 more on page scroll to bottom', async ({ page }) => {
  await page.goto('http://localhost:3000/');
  await page.evaluate(() => {
    window.scrollTo(0, document.body.scrollHeight);
  });

  await page
    .getByTestId('post-list-loading-indicator')
    .scrollIntoViewIfNeeded();

  const updatedItems = page.getByTestId('single-post');
  expect(await updatedItems.count()).toBe(20);
});

test('is not in logged in state', async ({ page }) => {
  await page.goto('http://localhost:3000/');

  const loginButtonIsVisible = page.getByTestId('login-button').isVisible();

  expect(loginButtonIsVisible).toBeTruthy();
});
