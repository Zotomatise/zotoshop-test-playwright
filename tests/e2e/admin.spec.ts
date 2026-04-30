import { test, expect } from '@playwright/test';

const ADMIN_URL = process.env.ADMIN_URL ?? 'http://localhost:9000/app';
const ADMIN_EMAIL = process.env.ADMIN_EMAIL!;
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD!;

test.describe('Admin Medusa', () => {
  test.skip(!process.env.ADMIN_URL?.includes('localhost'), 'Admin uniquement en local (docker)');

  test('login admin réussi', async ({ page }) => {
    await page.goto(ADMIN_URL);
    await page.getByLabel(/email/i).fill(ADMIN_EMAIL);
    await page.getByLabel(/password|mot de passe/i).fill(ADMIN_PASSWORD);
    await page.getByRole('button', { name: /sign in|continue|connexion/i }).click();
    await expect(page).toHaveURL(/\/app(\/|$)/, { timeout: 15_000 });
  });
});
