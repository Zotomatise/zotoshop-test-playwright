import { test, expect } from "../fixtures/page.fixture";

test("le store affiche un produit avec un prix (sans POM)", async ({
  storePage,
}) => {
  // Navigation manuelle dans chaque test
  // await page.goto("/fr/store");
 await storePage.goto();
  // Sélecteurs en dur, dupliqués test après test
  // const produits = page.getByTestId("product-card");
  // await expect(produits.first()).toBeVisible();

  await storePage.expectOneProductIsVisible();

  // Logique de récupération du prix dupliquée
  // const priceText = page.getByTestId("price").first();
  // await expect(priceText).toBeVisible();
  // const text = await priceText.textContent();
  // if (text === null) throw new Error("Prix introuvable");
  // const montant = parseFloat(text.replace("€", ""));

  // // Assertion finale
  // expect(montant).toBeGreaterThan(0);
  await storePage.expectPositivePrice();
});
