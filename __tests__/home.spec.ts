import { MumbleTestIds } from '@/__tests__/helpers/selectors';
import {
  DEFAULT_PAGE_URL,
  createMumbleText,
  login,
} from '@/__tests__/helpers/utilities';
import { expect, test } from '@playwright/test';

test.describe('Homepage', () => {
  test.describe('Initial View', () => {
    test.beforeEach(async ({ page }) => {
      await page.goto(DEFAULT_PAGE_URL);
    });

    test('is not in logged in state', async ({ page }) => {
      const loginButtonIsVisible = await page
        .getByTestId(MumbleTestIds.LoginButton)
        .isVisible();

      expect(loginButtonIsVisible).toBeTruthy();
    });

    test('has title', async ({ page }) => {
      await expect(page).toHaveTitle(/Mumble/);
    });

    test('has h1', async ({ page }) => {
      const heading1 = await page.getByTestId(MumbleTestIds.H1);
      const innerText = await heading1.innerText();

      await expect(innerText).toEqual('Willkommen bei Mumble!');
    });

    test('has initially 10 posts', async ({ page }) => {
      const items = page.getByTestId(MumbleTestIds.Post);
      expect(await items.count()).toBe(10);
    });

    test('loads 10 more on page scroll to bottom', async ({ page }) => {
      await expect(page.getByTestId(MumbleTestIds.Post)).toHaveCount(10);

      await page
        .getByTestId('post-list-loading-indicator')
        .scrollIntoViewIfNeeded();
      // custom waiting
      await page.waitForTimeout(5000);

      await expect(page.getByTestId(MumbleTestIds.Post)).toHaveCount(20);
    });
  });

  test.describe('Header', () => {
    test.beforeEach(async ({ page }) => {
      await login(page);
    });

    test('has user image', async ({ page }) => {
      const userImageButton = page.getByTestId(
        MumbleTestIds.HeaderUserImageButton
      );

      await expect(userImageButton).toBeVisible();
    });
    test('has settings modal', async ({ page }) => {
      const settingsModalButton = page.getByTestId(
        MumbleTestIds.HeaderSettingsModalButton
      );

      await expect(settingsModalButton).toBeVisible();
    });
    test('has user information in settings modal', async ({ page }) => {
      const settingsModalButton = page.getByTestId(
        MumbleTestIds.HeaderSettingsModalButton
      );
      await settingsModalButton.click();

      await expect(
        page.getByLabel('Name', { exact: true }),
        'Name Input'
      ).toHaveValue('User');
      await expect(
        page.getByLabel('Vorname', { exact: true }),
        'Firstname Input'
      ).toHaveValue('Test');
      await expect(
        page.getByLabel('Benutzername', { exact: true }),
        'Username Input'
      ).toHaveValue('CladaTestUser');
    });
  });
});
