import test, { expect } from '@playwright/test';
import { MumbleTestIds } from './helpers/selectors';
import { DEFAULT_PAGE_URL, login } from './helpers/utilities';

const CLADA_TEST_USER_PAGE_URL = DEFAULT_PAGE_URL + 'user/264067342156206727';

test.describe('User Page', () => {
  test.describe('Logged out', () => {
    test.beforeEach(async ({ page }) => {
      await page.goto(CLADA_TEST_USER_PAGE_URL);
    });
    test('has basic elements', async ({ page }) => {
      await expect(page.locator('h1')).toHaveText('CladaTestUser');
    });
    test('ensure that profile image is not editable', async ({ page }) => {
      await expect(
        page.locator(`[data-testid="${MumbleTestIds.UserAvatarNotEditable}"]`)
      ).toBeVisible();
    });
  });
  test.describe('Logged In', () => {
    test.beforeEach(async ({ page }) => {
      await login(page, CLADA_TEST_USER_PAGE_URL);
    });
    test('has basic elements', async ({ page }) => {
      const tabs = page.getByTestId('user-tabs');

      await expect(tabs).toBeVisible();

      await expect(
        tabs.locator('button:has-text("Deine Mumbles")')
      ).toBeVisible();
      await expect(
        tabs.locator('button:has-text("Deine Likes")')
      ).toBeVisible();
      await expect(
        tabs.locator('button:has-text("Deine Freunde")')
      ).toBeVisible();
    });
    test('ensure that profile image is editable', async ({ page }) => {
      await expect(
        page.locator(`[data-testid="${MumbleTestIds.UserAvatarEditable}"]`)
      ).toBeVisible();
    });
  });
});
