import { test, expect } from "@playwright/test";

// ✅ Fix 1 + 2 — Type explicite + tous les chemins retournent (noImplicitAny + noImplicitReturns)
type UserRole = "vip" | "client" | "admin";

function calculateDiscount(role: UserRole): number {
  if (role === "vip") return 20;
  if (role === "admin") return 15;
  return 0; // client → pas de remise
}

// ✅ Fix 3 — Tous les case retournent (noFallthroughCasesInSwitch)
function getStatusLabel(status: string): string {
  switch (status) {
    case "pending":
      return "En attente";
    case "paid":
      return "Payée";
    case "shipped":
      return "Expédiée";
    default:
      return "Inconnu";
  }
}

test("démo des options strictes (version propre)", async ({ page }) => {
  await page.goto("https://zotoshop.vercel.app/fr/store");

  // ✅ Fix 4 — Gestion null explicite (strictNullChecks)
  const priceText = await page.getByTestId("price").first().textContent();
  if (priceText === null) {
    throw new Error("Prix introuvable sur la page boutique");
  }
  // priceText format : "€69.00" → on enlève le symbole pour parseFloat
  const price = parseFloat(priceText.replace("€", "").trim());

  // ✅ Fix 5 — Vérification tableau non vide (noUncheckedIndexedAccess)
  const products = await page.getByTestId("product-wrapper").all();
  const firstProductName = products[0]
    ? ((await products[0].getByTestId("product-title").textContent()) ??
      "Sans nom")
    : "Aucun produit";

  // Usage typé fort
  const discount: number = calculateDiscount("client");
  const label: string = getStatusLabel("pending");

  console.log({ price, firstProductName, discount, label });

  expect(price).toBeGreaterThan(0);
  expect(firstProductName).not.toBe("Aucun produit");
});
