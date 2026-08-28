import { Page, Locator } from '@playwright/test';
import { BasePage } from '@/pages/base.page';
import { ROUTES } from '@/constants/routes';

export class ProductPage extends BasePage {
  readonly addToFavoritesButton: Locator;
  readonly productTitle: Locator;

  constructor(page: Page) {
    super(page);
    this.addToFavoritesButton = page.getByTestId('add-to-favorites');
    this.productTitle = page.getByTestId('product-title');
  }

  async navigate(productID: string): Promise<void> {
    await this.page.goto(ROUTES.PRODUCT(productID));
  }
}
