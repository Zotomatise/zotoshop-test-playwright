import { Page, Locator, expect } from '@playwright/test';

export class ProductPage {
  readonly page: Page;
  readonly addToCartButton: Locator;
  readonly title: Locator;
  readonly price: Locator;

  constructor(page: Page) {
    this.page = page;
    this.title = page.locator('h1').first();
    this.price = page.locator('[data-testid="product-price"]').first();
    this.addToCartButton = page.getByRole('button', { name: /add to cart|ajouter au panier/i });
  }

  async addToCart() {
    await this.addToCartButton.click();
  }

  async expectVisible() {
    await expect(this.title).toBeVisible();
    await expect(this.addToCartButton).toBeVisible();
  }
}
