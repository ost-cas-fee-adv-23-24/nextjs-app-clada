import { DEFAULT_PAGE_URL, login } from '@/__tests__/helpers/utilities';
import test, { expect } from '@playwright/test';

const TAGS_URL = DEFAULT_PAGE_URL + 'tags';

test.describe('Tabs Page', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto(TAGS_URL);
    });
    test('has no tag entered', async ({ page }) => {
        await expect(page.locator('p:has-text("Kein Tag angegeben")')).toBeVisible();
    });
    test('has only #starwars tag', async ({ page }) => {
        const searchInput = await page.getByPlaceholder('Suche nach Tags')

        await searchInput.fill('starwars');
        await searchInput.press('Enter');

        await expect(page).toHaveURL(`${TAGS_URL}?tag=starwars`)
    });
    test('has #starwars tag and adds a second', async ({ page }) => {
        const searchInput = await page.getByPlaceholder('Suche nach Tags')

        await searchInput.fill('starwars');
        await searchInput.press('Enter');

        await expect(page).toHaveURL(`${TAGS_URL}?tag=starwars`)

        await searchInput.fill('starwars test');
        await searchInput.press('Enter');

        await expect(page).toHaveURL(`${TAGS_URL}?tag=starwars&tag=test`)
    });
});
