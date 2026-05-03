import { expect, type Page } from "@playwright/test";

export async function goToStore(
  page: Page,
  locale: string = "fr",
): Promise<void> {
  await page.goto(`/${locale}/store`);
  await expect(page).toHaveURL(new RegExp(`/${locale}/store`));
}
