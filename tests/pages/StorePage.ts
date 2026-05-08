import { expect, Locator, Page } from "playwright/test";
import { BasePage } from "./BasePage";

export class StorePage extends BasePage {
  // === Couche 1 : LOCATORS PRIVÉS (à venir) ===
  private readonly heading: Locator;
  private readonly productWrappers: Locator;
  private readonly productPrices: Locator;
  private readonly productTitles: Locator;

  // public readonly page: Page
  // constructor(page: Page) {
  //   this.page = page;
  // }

  constructor(public readonly page: Page) {
    super(page);
    this.heading = page.getByRole("heading", { name: /Tous les produits/i });
    this.productWrappers = page.getByTestId("product-wrapper");
    this.productPrices = page.getByTestId("price");
    this.productTitles = page.getByTestId("product-title");
  }

  // === Couche 2 : NAVIGATION (à venir) ===
  async goto(): Promise<void> {
    await this.page.goto("/fr/store");
    await this.attendPageToBeVisible();
    await this.expectUrlEqual("/fr/store");
    await this.expectTitleTobeViisible();
  }

  isOnStorePage(): boolean {
    return this.ActualUrl().includes("/fr/store");
  }

  // === Couche 3 : ACTIONS (à venir) ===
  async clickOnFirstProduct(): Promise<void> {
    await this.productWrappers.first().click();
    await this.page.waitForURL(/\/fr\/products\/[a-z0-9-]+/);
  }

  async getFirstProductPrice(): Promise<number> {
    const priceText = await this.productPrices.first().textContent();
    if (priceText === null) {
      throw new Error("Prix introuvable");
    }
    return parseFloat(priceText.replace("€", "").trim());
  }
  // === Couche 4 : ASSERTIONS (à venir) ===
  async expectOneProductIsVisible(): Promise<void> {
    await expect(this.productWrappers.first()).toBeVisible();
  }

  async expectFirstProductPriceToBe(expectedPrice: number): Promise<void> {
    const actualPrice = await this.getFirstProductPrice();
    expect(actualPrice).toBe(expectedPrice);
  }

  async expectPositivePrice(): Promise<void> {
    const price = await this.getFirstProductPrice();
    expect(price).toBeGreaterThan(0);
  }
}
