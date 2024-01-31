import { test, expect } from '@playwright/test';
import { setupServer } from 'msw/node';
import { beforeEach } from 'node:test';
import { HttpResponse, http } from 'msw'

const server = setupServer()

beforeEach(() => {
  server.listen();
})

test('has title', async ({ page }) => {
  server.use(http.get('/resource', () => {
    return HttpResponse.json({
      id: '15d42a4d-1948-4de4-ba78-b8a893feaf45',
      firstName: 'John',
    })
  }))
  await page.goto('http://localhost:3000/');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Create Next App/);
});
