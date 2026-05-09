import { test, expect } from "../fixtures/page.fixture";

test.describe("Store page - POM", () => {
  test("le store affiche au moins un produit", async ({ storePage }) => {
    await storePage.goto();
    await storePage.expectOneProductIsVisible();
  });

  test("le premier produit a un prix positif", async ({ storePage }) => {
    await storePage.goto();
    await storePage.expectPositivePrice();
  });

  test("cliquer sur un produit ouvre la page produit", async ({
    storePage,
    page,
  }) => {
    await storePage.goto();
    await storePage.clickOnFirstProduct();
    expect(storePage.isOnStorePage()).toBe(false);
    // On vérifie qu'on est sur une page produit avec un slug (ex: /fr/products/zotopad-controller)
    expect(page).toHaveURL(/\/fr\/products\/[a-z0-9-]+/);
    // Assertions à faire sur la page produit (à implémenter dans ProductPage)
  });

  test("on est bien sur la page store", async ({ storePage }) => {
    await storePage.goto();
    const isOnStorePage = storePage.isOnStorePage();
    expect(isOnStorePage).toBe(true);
  });

  test("le store affiche au moins un produit avec un prix positif", async ({
    storePage,
  }) => {
    await storePage.goto();
    await storePage.expectOneProductIsVisible();
    await storePage.expectPositivePrice();
  });

  test("le store affiche au moin 3 produits", async ({ storePage, page }) => {
    await storePage.goto();
    await storePage.expectOneProductIsVisible();

    const productWrappers = page.getByTestId("product-wrapper");
    const productCount = await productWrappers.count();
    expect(productCount).toBeGreaterThanOrEqual(3);
  });
});
