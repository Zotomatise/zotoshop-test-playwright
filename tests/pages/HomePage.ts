import { Page, Locator, expect } from '@playwright/test';

export class HomePage {
  readonly page: Page;
  readonly hero: Locator;
  readonly navStore: Locator;
  readonly navAccount: Locator;
  readonly navCart: Locator;

  constructor(page: Page) {
    this.page = page;
    this.hero = page.getByRole('heading', { name: /Bienvenue sur ZotoShop/i });
    this.navStore = page.getByRole('link', { name: /store/i }).first();
    this.navAccount = page.getByRole('link', { name: /account|compte/i }).first();
    this.navCart = page.getByRole('link', { name: /cart|panier/i }).first();
  }

  async goto() {
    await this.page.goto('/fr');
  }

  async expectLoaded() {
    await expect(this.page).toHaveTitle(/ZotoShop/i);
  }
}
