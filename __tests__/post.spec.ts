import test, { expect } from '@playwright/test';
import { MumbleTestIds } from './helpers/selectors';
import { createMumbleText, login } from './helpers/utilities';

test.describe.configure({ mode: 'serial' });

test.describe('Posts', () => {
  test.beforeEach(async ({ page }) => {
    await login(page);
  });

  test('has create content form visible', async ({ page }) => {
    await expect(
      page.getByTestId(MumbleTestIds.CreateContentCard)
    ).toBeVisible();
  });
  test('create a mumble', async ({ page }) => {
    await page.getByPlaceholder('Deine Meinung zählt!').click();
    await page.getByPlaceholder('Deine Meinung zählt!').fill(createMumbleText);
    await page.getByRole('button', { name: 'Absenden' }).click();

    await expect(
      page.locator(MumbleTestIds.CreatePostTextArea),
      'has reseted text area'
    ).toHaveValue('');

    const createdMumble = page.locator(
      `[data-testid="single-post"]:has-text("${createMumbleText}")`
    );

    await expect(createdMumble, 'is visible').toBeVisible();
  });
  test('copy a link of a mumble and check if it is valid', async ({ page }) => {
    const createdMumble = page.locator(
      `[data-testid="single-post"]:has-text("${createMumbleText}")`
    );
    const copyLinkButton = createdMumble.locator(
      `[data-testid="single-post-copy-link"]`
    );

    await copyLinkButton.click();

    const clipboardText = await page.evaluate('navigator.clipboard.readText()');

    await page.goto(clipboardText as string);
    await expect(page, 'page is the correct url').toHaveURL(
      clipboardText as string
    );

    const openedMumble = await page.locator(
      `[data-testid="single-post-content"]:has-text("${createMumbleText}")`
    );

    await expect(openedMumble, 'correct mumble is open').toBeVisible();
  });
  test('like and unlike a post', async ({ page }) => {
    const createdMumble = page.locator(
      `[data-testid="single-post"]:has-text("${createMumbleText}")`
    );
    const likeButton = createdMumble.locator(
      `[data-testid="single-post-like"]`
    );

    await likeButton.click();

    await expect(likeButton, 'ensures that has one like').toHaveText('1 Like');

    await likeButton.click();

    await expect(likeButton, 'ensures that has one like').toHaveText('Like');
  });
  test('delete the created post', async ({ page }) => {
    const createdMumble = page.locator(
      `[data-testid="single-post"]:has-text("${createMumbleText}")`
    );
    const deleteButton = createdMumble.locator(
      `[data-testid="single-post-delete"]`
    );

    await deleteButton.click();

    await expect(
      page.locator(
        `[data-testid="single-post"]:has-text("${createMumbleText}")`
      ),
      'ensures that no element is present'
    ).toHaveCount(0);
  });
});
