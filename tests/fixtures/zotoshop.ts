import { test as base } from '@playwright/test';
import { HomePage } from '@pages/HomePage';
import { StorePage } from '@pages/StorePage';
import { ProductPage } from '@pages/ProductPage';
import { CartPage } from '@pages/CartPage';

type ZotoFixtures = {
  homePage: HomePage;
  storePage: StorePage;
  productPage: ProductPage;
  cartPage: CartPage;
};

export const test = base.extend<ZotoFixtures>({
  homePage: async ({ page }, use) => use(new HomePage(page)),
  storePage: async ({ page }, use) => use(new StorePage(page)),
  productPage: async ({ page }, use) => use(new ProductPage(page)),
  cartPage: async ({ page }, use) => use(new CartPage(page)),
});

export { expect } from '@playwright/test';
