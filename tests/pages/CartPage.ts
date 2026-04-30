import { Page, Locator, expect } from '@playwright/test';

export class CartPage {
  readonly page: Page;
  readonly checkoutButton: Locator;
  readonly lineItems: Locator;

  constructor(page: Page) {
    this.page = page;
    this.checkoutButton = page.getByRole('link', { name: /checkout|commander/i });
    this.lineItems = page.locator('[data-testid="cart-item"], tr[data-testid*="item"]');
  }

  async goto() {
    await this.page.goto('/fr/cart');
  }

  async expectHasItems(min = 1) {
    await expect(this.lineItems).toHaveCount(min, { timeout: 10_000 });
  }
}
