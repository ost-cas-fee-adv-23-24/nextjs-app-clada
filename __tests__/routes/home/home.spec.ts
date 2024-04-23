import { MumbleTestIds } from '@/__tests__/helpers/selectors';
import { expect, test } from '@playwright/test';

const url = 'http://localhost:3000/'

test.describe('Homepage Posts', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(url)
  })
  test('has title', async ({ page }) => {
    await expect(page).toHaveTitle(/Mumble/);
  });

  test('has h1', async ({ page }) => {
    const heading1 = await page.getByTestId(MumbleTestIds.H1);
    const innerText = await heading1.innerText();

    await expect(innerText).toEqual('Willkommen bei Mumble!');
  })
  
  test('has initially 10 posts', async ({ page }) => {
    const items = page.getByTestId(MumbleTestIds.Post);
    expect(await items.count()).toBe(10);
  });
  
  // TODO: shall be updated in a later stage
  test('loads 10 more on page scroll to bottom', async ({ page }) => {
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  
    await page
      .getByTestId('post-list-loading-indicator')
      .scrollIntoViewIfNeeded();
  
    const updatedItems = page.getByTestId(MumbleTestIds.Post);
    expect(await updatedItems.count()).toBe(20);
  });
  
  test('is not in logged in state', async ({ page }) => {
    const loginButtonIsVisible = await page
      .getByTestId(MumbleTestIds.LoginButton)
      .isVisible();
  
    expect(loginButtonIsVisible).toBeTruthy();
  });  
})