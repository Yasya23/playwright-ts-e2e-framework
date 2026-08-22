import { test, expect } from '@/fixtures/fixtures';
import { MESSAGES } from '@/constants/messages';

test.describe('Feature: Actions with Chosen Product', () => {
  test('Logged-in user adds a product to favorites', async ({
    authenticatedPage,
    cleanupFavoritesAfterTestViaApi,
    productPage,
    testProductData,
  }) => {
    await productPage.navigate(testProductData.id);
    await productPage.addToFavoritesButton.click();

    await expect(productPage.toast.toastContainer).toBeVisible();
    await expect(productPage.toast.toastContainer).toContainText(
      MESSAGES.PRODUCT_PAGE.PRODUCT_ADDED_TO_FAVORITES,
    );
  });

  test('Guest user cannot add products to favorites', async ({
    productPage,
    testProductData,
  }) => {
    await productPage.navigate(testProductData.id);
    await productPage.addToFavoritesButton.click();

    await expect(productPage.toast.toastContainer).toBeVisible();
    await expect(productPage.toast.toastContainer).toContainText(
      MESSAGES.PRODUCT_PAGE.ERRORS.UNAUTHORIZED_TO_ADD_TO_FAVORITES,
    );
  });
});
