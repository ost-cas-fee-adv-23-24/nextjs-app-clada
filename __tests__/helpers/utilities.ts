import { Page, expect } from '@playwright/test';
import { MumbleTestIds } from './selectors';

export const DEFAULT_PAGE_URL = 'http://localhost:3000/';

export const login = async (page: Page, url?: string) => {
  await page.goto(url ?? DEFAULT_PAGE_URL);

  if (await page.getByTestId(MumbleTestIds.LoginButton).isHidden()) return;

  await page.getByTestId(MumbleTestIds.LoginButton).click();
  if (!process.env.TEST_USER_NAME || !process.env.TEST_USER_PASSWORD) {
    throw new Error('env variables missing for e2e!');
  }

  await page.locator('#loginName').fill(process.env.TEST_USER_NAME);
  await page.locator('#submit-button').click();
  await page.locator('#password').fill(process.env.TEST_USER_PASSWORD);
  await page.locator('#submit-button').click();
  await page.goto(url ?? DEFAULT_PAGE_URL);

  const logoutButtonIsVisible = await page
    .getByTestId(MumbleTestIds.LogoutButton)
    .isVisible();

  expect(logoutButtonIsVisible).toBeTruthy();
};

export const createMumbleText = `abbf932a-46b9-487c-9563-2684696b44e6 Created mumble from test. #test #team-clada-rocks`;
