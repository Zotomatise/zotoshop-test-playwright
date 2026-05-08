import { test, expect } from "@playwright/test";

test("le store affiche au moins un produit", async ({ page }) => {
  await page.goto("/fr/store");
  await expect(page.getByTestId("product-wrapper").first()).toBeVisible();
  await expect(page.getByTestId("price").first()).toBeVisible();
});

test("le premier produit a un prix positif", async ({ page }) => {
  await page.goto("/fr/store");
  await expect(page.getByTestId("product-wrapper").first()).toBeVisible();
  const priceText = await page.getByTestId("price").first().textContent();
  if (priceText === null) throw new Error("Prix introuvable");
  const prix = parseFloat(priceText.replace("€", "").trim());
  expect(prix).toBeGreaterThan(0);
});

test("cliquer sur un produit ouvre la page produit", async ({ page }) => {
  await page.goto("/fr/store");
  await expect(page.getByTestId("product-wrapper").first()).toBeVisible();
  await page.getByTestId("product-wrapper").first().click();
  await expect(page.locator("h1").first()).toBeVisible();
  await expect(page.getByTestId("product-price").first()).toBeVisible();
});

test("ajouter un produit au panier", async ({ page }) => {
  await page.goto("/fr/store");
  await expect(page.getByTestId("product-wrapper").first()).toBeVisible();
  await page.getByTestId("product-wrapper").first().click();
  await page
    .getByRole("button", { name: /add to cart|ajouter au panier/i })
    .click();
  await page.goto("/fr/cart");
  await expect(page).toHaveURL(/\/fr\/cart/);
});
