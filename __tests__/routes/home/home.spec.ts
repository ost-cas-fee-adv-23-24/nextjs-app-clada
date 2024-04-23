import { MumbleTestIds } from '@/__tests__/helpers/selectors';
import { DEFAULT_PAGE_URL, getCreateMumbleText, login } from '@/__tests__/helpers/utilities';
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
      await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    
      await page
        .getByTestId('post-list-loading-indicator')
        .scrollIntoViewIfNeeded();
    
      const updatedItemsCount = await page.getByTestId(MumbleTestIds.Post).count();
      expect(updatedItemsCount).toBe(20);
    });
  })

  test.describe('Authenticated', () => {
    let createMumbleText: string = ''

    test.beforeAll( () => {
      createMumbleText = getCreateMumbleText()
    })
    test.beforeEach(async ({ page }) => {
      await login(page);
    })
    test('has create content form visible', async ({ page }) => {
      const formVisible = await page
        .getByTestId(MumbleTestIds.CreateContentCard)
        .isVisible();
    
      expect(formVisible).toBeTruthy();
    })
    test('create and delete a mumble', async ({ page }) => {
      await page.getByPlaceholder('Deine Meinung zählt!').click();
      await page.getByPlaceholder('Deine Meinung zählt!').fill(createMumbleText);
      await page.getByRole('button', { name: 'Absenden' }).click();

      // TODO: set test id to text area (update design system)
      await expect(page.locator(MumbleTestIds.CreatePostTextArea), 'has reseted text area').toHaveValue('');
      await expect(page.locator(`[data-testid="single-post"]:has-text("${createMumbleText}")`)).toBeVisible()
    })
  })
})