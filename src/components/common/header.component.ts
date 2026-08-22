import { Page, Locator } from '@playwright/test';

export class HeaderComponent {
  readonly page: Page;
  readonly signInLink: Locator;
  readonly dropdownMenuButton: Locator;
  readonly accountMenuLink: Locator;
  readonly favoritesLink: Locator;

  constructor(page: Page) {
    this.page = page;
    this.signInLink = page.getByTestId('nav-sign-in');
    this.dropdownMenuButton = page.getByTestId('nav-menu');
    this.accountMenuLink =
      this.dropdownMenuButton.getByTestId('nav-my-account');
    this.favoritesLink =
      this.dropdownMenuButton.getByTestId('nav-my-favorites');
  }
}
