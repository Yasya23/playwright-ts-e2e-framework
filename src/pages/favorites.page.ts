import { Page, Locator } from '@playwright/test';
import { BasePage } from '@/pages/base.page';
import { ROUTES } from '@/constants/routes';
import { MESSAGES } from '@/constants/messages';

export class FavoritesPage extends BasePage {
  readonly emptyFavoritesMessage: Locator;

  constructor(page: Page) {
    super(page);
    this.emptyFavoritesMessage = page.getByText(
      MESSAGES.FAVORITES_PAGE.NO_FAVORITES,
      {
        exact: false,
      },
    );
  }

  async navigate(): Promise<void> {
    await this.page.goto(ROUTES.FAVORITES);
  }

  async deleteProductById(id: string): Promise<void> {
    const product = this.getProductCardById(id);
    await product.getByTestId('delete').click();
  }

  getProductCardById(id: string): Locator {
    return this.page.getByTestId(`favorite-${id}`);
  }
}
