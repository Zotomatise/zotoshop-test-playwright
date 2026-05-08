import { StorePage } from "@pages/StorePage";
import test from "playwright/test";

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

  test("cliquer sur un produit ouvre la page produit", async ({ page }) => {
    const storePage = new StorePage(page);
    await storePage.goto();
    await storePage.clickOnFirstProduct();
    // Assertions à faire sur la page produit (à implémenter dans ProductPage)
  });
});
