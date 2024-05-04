import { MumbleTestIds } from '@/__tests__/helpers/selectors';
import { DEFAULT_PAGE_URL, createMumbleText, login } from '@/__tests__/helpers/utilities';
import { expect, test } from '@playwright/test';

test.describe('Homepage', () => {
  test.describe('Unauthenticated', () => {
    test.beforeEach(async ({ page }) => {
      await page.goto(DEFAULT_PAGE_URL)
    })

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

      await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));

      await page
        .getByTestId('post-list-loading-indicator')
        .scrollIntoViewIfNeeded();
      // custom waiting
      await page.waitForTimeout(5000);

      await expect(page.getByTestId(MumbleTestIds.Post)).toHaveCount(20);
    });
  })

  test.describe('Authenticated', () => {
    test.beforeEach(async ({ page }) => {
      await login(page);
    })
    test.describe('Header', () => {
      test('has user image', async ({ page }) => {
        const userImageButton = page.getByTestId(MumbleTestIds.HeaderUserImageButton);

        await expect(userImageButton).toBeVisible();
      })
      test('has settings modal', async ({ page }) => {
        const settingsModalButton = page.getByTestId(MumbleTestIds.HeaderSettingsModalButton);

        await expect(settingsModalButton).toBeVisible();
      })
      test('has user information in settings modal', async ({ page }) => {
        const settingsModalButton = page.getByTestId(MumbleTestIds.HeaderSettingsModalButton);
        await settingsModalButton.click();

        await expect(page.getByLabel('Name', { exact: true }), 'Name Input').toHaveValue('User');
        await expect(page.getByLabel('Vorname', { exact: true }), 'Firstname Input').toHaveValue('Test');
        await expect(page.getByLabel('Benutzername', { exact: true }), 'Username Input').toHaveValue('CladaTestUser');
      })
    })

    test.describe('Posts', () => {
      test.describe.configure({ mode: 'serial'})

      test('has create content form visible', async ({ page }) => {
        await expect(page.getByTestId(MumbleTestIds.CreateContentCard)).toBeVisible();
      })
      test('create a mumble', async ({ page }) => {
        await page.getByPlaceholder('Deine Meinung zählt!').click();
        await page.getByPlaceholder('Deine Meinung zählt!').fill(createMumbleText);
        await page.getByRole('button', { name: 'Absenden' }).click();
  
        await expect(page.locator(MumbleTestIds.CreatePostTextArea), 'has reseted text area').toHaveValue('');
  
        const createdMumble = page.locator(`[data-testid="single-post"]:has-text("${createMumbleText}")`)
  
        await expect(createdMumble, 'is visible').toBeVisible();
      })
      test('copy a link of a mumble and check if it is valid', async ({ page }) => {
        const createdMumble = page.locator(`[data-testid="single-post"]:has-text("${createMumbleText}")`);
        const copyLinkButton = createdMumble.locator(`[data-testid="single-post-copy-link"]`)
  
        await copyLinkButton.click();
  
        const clipboardText = await page.evaluate("navigator.clipboard.readText()");
  
        await page.goto(clipboardText as string);
        await expect(page, 'page is the correct url').toHaveURL(clipboardText as string);
  
        const openedMumble = await page.locator(`[data-testid="single-post-content"]:has-text("${createMumbleText}")`);
  
        await expect(openedMumble, 'correct mumble is open').toBeVisible();
      })
      test('like and unlike a post', async({ page }) => {
        const createdMumble = page.locator(`[data-testid="single-post"]:has-text("${createMumbleText}")`);
        const likeButton = createdMumble.locator(`[data-testid="single-post-like"]`)
  
        await likeButton.click();
  
        await expect(likeButton, 'ensures that has one like').toHaveText('1 Like');
  
        await likeButton.click();
  
        await expect(likeButton, 'ensures that has one like').toHaveText('Like');
      })
      test('delete the created post', async({ page }) => {
        const createdMumble = page.locator(`[data-testid="single-post"]:has-text("${createMumbleText}")`);
        const deleteButton = createdMumble.locator(`[data-testid="single-post-delete"]`)
  
        await deleteButton.click();
  
        await expect(page.locator(`[data-testid="single-post"]:has-text("${createMumbleText}")`), 'ensures that no element is present').toHaveCount(0);
      })
    })
  })
})