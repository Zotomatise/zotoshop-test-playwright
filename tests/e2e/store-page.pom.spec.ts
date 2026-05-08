import { StorePage } from "@pages/StorePage";
import test, { expect } from "playwright/test";

test.describe("Store page - POM", () => {
  test("le store affiche au moins un produit", async ({ page }) => {
    const storePage = new StorePage(page);
    await storePage.goto();
    await storePage.expectOneProductIsVisible();
  });

  test("le premier produit a un prix positif", async ({ page }) => {
    const storePage = new StorePage(page);
    await storePage.goto();
    await storePage.expectPositivePrice();
  });

  test.only("cliquer sur un produit ouvre la page produit", async ({
    page,
  }) => {
    const storePage = new StorePage(page);
    await storePage.goto();
    await storePage.clickOnFirstProduct();
    expect(storePage.isOnStorePage()).toBe(false);
    // On vérifie qu'on est sur une page produit avec un slug (ex: /fr/products/zotopad-controller)
    expect(page).toHaveURL(/\/fr\/products\/[a-z0-9-]+/);
    // Assertions à faire sur la page produit (à implémenter dans ProductPage)
  });

  test("on est bien sur la page store", async ({ page }) => {
    const storePage = new StorePage(page);
    await storePage.goto();
    const isOnStorePage = storePage.isOnStorePage();
    expect(isOnStorePage).toBe(true);
  });
});
