import { expect, Page } from "playwright/test";
import { Currency } from "../types/zotoshop";

export async function getPrix(
  page: Page,
): Promise<{ prix: number; devise: Currency }> {
  await page.goto("/fr/store");
  // const priceText = await page.getByTestId("price").first().textContent();
  const priceText = await page.getByTestId("price").first();
  await expect(priceText).toBeVisible();

  const text = await priceText.textContent();

  if (text === null) {
    throw new Error("Prix introuvable sur la page boutique ZotoShop");
  }

  const montant = parseFloat(text.replace("€", ""));
  const devise: Currency = "EUR"; // On suppose que la boutique affiche toujours en euros
  return { prix: montant, devise };
}
