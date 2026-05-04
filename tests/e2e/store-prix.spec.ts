import { test, expect } from "@playwright/test";
import { getPrix } from "../helpers/prix";
// Helper non typé : page n'a pas de type, retour pas typé

test("le store affiche un prix positif - VERSION JS", async ({ page }) => {
  const { prix, devise } = await getPrix(page);

  expect(prix).toBeGreaterThan(0);
  expect(devise).toBe("EUR");
});
