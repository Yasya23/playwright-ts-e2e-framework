import { Page, Locator } from '@playwright/test';

export class ToastComponent {
  readonly page: Page;
  readonly toastContainer: Locator;

  constructor(page: Page) {
    this.page = page;
    this.toastContainer = page.locator('.toast-container, .alert');
  }
}
