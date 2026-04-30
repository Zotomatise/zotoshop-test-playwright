import { Page, Locator, expect } from '@playwright/test';

export class StorePage {
  readonly page: Page;
  readonly productCards: Locator;

  constructor(page: Page) {
    this.page = page;
    this.productCards = page.locator('[data-testid="product-wrapper"], a[href*="/products/"]');
  }

  async goto() {
    await this.page.goto('/fr/store');
  }

  async openProductByName(name: string | RegExp) {
    await this.page.getByRole('link', { name }).first().click();
  }

  async expectAtLeastOneProduct() {
    await expect(this.productCards.first()).toBeVisible();
  }
}
