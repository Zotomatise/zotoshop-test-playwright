import { test as base } from "@playwright/test";
import { StorePage } from "../pages/StorePage";

// Type des fixtures qu'on ajoute (typage fort)
type MyFixtures = {
  storePage: StorePage;
};

// On étend le test natif Playwright avec nos fixtures
export const test = base.extend<MyFixtures>({
  storePage: async ({ page }, use) => {
    const store = new StorePage(page);
    await use(store);
  },
});

// On ré-exporte expect pour que les tests n'aient qu'un seul import
export { expect } from "@playwright/test";
