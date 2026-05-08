import { expect, Page } from "playwright/test";

export abstract class BasePage {
  constructor(protected readonly page: Page) {}

  async attendPageToBeVisible(): Promise<void> {
    await this.page.waitForLoadState("domcontentloaded");
  }

  async expectUrlEqual(expectedUrl: string): Promise<void> {
    await expect(this.page).toHaveURL(expectedUrl);
  }

  async expectTitleTobeViisible(): Promise<void> {
    await expect(this.page.locator("h1").first()).toBeVisible();
  }

  ActualUrl(): string {
    return this.page.url();
  }

  async waitAndVerifyUrl(expectedUrl: string): Promise<void> {
    await this.attendPageToBeVisible();
    await this.expectUrlEqual(expectedUrl);
  }
}
