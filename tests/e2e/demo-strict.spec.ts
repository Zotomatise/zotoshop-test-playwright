import { test, expect } from "@playwright/test";

// Erreur 1 — paramètre sans type → noImplicitAny
function calculateDiscount(role: string): number {
  if (role === "vip") return 20;
  // par défaut, pas de remise
  return 0;
}

//  Erreur 3 — case sans break/return → noFallthroughCasesInSwitch
function getStatusLabel(status: string): string {
  switch (status) {
    case "pending":
      console.log("Commande en attente");
      return "En attente";
    case "paid":
      return "Payée";
    default:
      return "Inconnu";
  }
}

test("démo des options strictes", async ({ page }) => {
  await page.goto("https://zotoshop.vercel.app/fr/store");

  // Erreur 4 — textContent retourne string | null → strictNullChecks
  const priceText = await page.getByTestId("price").first().textContent();
  const price = priceText ? parseFloat(priceText) : 0;
  // priceText est string | null, parseFloat() exige string

  // Erreur 5 — accès tableau sans vérif → noUncheckedIndexedAccess
  const products = await page.getByTestId("product-wrapper").all();
  const firstProduct = products[0];
  const firstProductName = firstProduct ? await firstProduct.textContent() : null;
  //  products[0] peut être undefined si la page n'a pas chargé

  // Usage des fonctions définies plus haut
  const discount = calculateDiscount("client");
  // ⚠ discount peut être undefined → bug silencieux
  const label = getStatusLabel("pending");

  console.log({ price, firstProductName, discount, label });

  expect(products.length).toBeGreaterThan(0);
});
