import { test, expect } from '@playwright/test';

test.describe('Smoke ZotoShop', () => {
  test('homepage répond avec un statut 200', async ({ page }) => {
    const response = await page.goto('/fr');
    expect(response?.status()).toBeLessThan(400);
  });

  test('le titre de la page contient "ZotoShop"', async ({ page }) => {
    await page.goto('/fr');
    await expect(page).toHaveTitle(/ZotoShop/i);
  });

  test('le hero "Bienvenue sur ZotoShop" est visible', async ({ page }) => {
    await page.goto('/fr');
    await expect(
      page.getByRole('heading', { name: /Bienvenue sur ZotoShop/i })
    ).toBeVisible();
  });

  test('la page store est accessible', async ({ page }) => {
    const response = await page.goto('/fr/store');
    expect(response?.status()).toBeLessThan(400);
    await expect(page).toHaveURL(/\/fr\/store/);
  });

  test('le CTA "Découvrir nos produits" mène au store', async ({ page }) => {
    await page.goto('/fr');
    await page.getByRole('link', { name: /Découvrir nos produits/i }).click();
    await expect(page).toHaveURL(/\/fr\/store/);
  });

  test('le panier est accessible', async ({ page }) => {
    await page.goto('/fr/cart');
    await expect(page).toHaveURL(/\/cart/);
  });

  test('le footer mentionne ZotoShop ou Zotomatise', async ({ page }) => {
    await page.goto('/fr');
    const footer = page.locator('footer');
    await expect(footer).toBeVisible();
    await expect(footer).toContainText(/Zotomatise|ZotoShop/i);
  });
});
