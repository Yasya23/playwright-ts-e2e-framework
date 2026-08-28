import { test, expect } from '@/fixtures/fixtures';

test.describe('Feature: Favorite products', () => {
  test('Logged-in user sees added product in favorites list', async ({
    authenticatedPage,
    addedFavoriteProductViaApi,
    cleanupFavoritesAfterTestViaApi,
    favoritesPage,
  }) => {
    await favoritesPage.navigate();

    await expect(
      favoritesPage.getProductCardById(addedFavoriteProductViaApi.id),
    ).toBeVisible();
  });

  test('Logged-in user removes a product from favorites', async ({
    authenticatedPage,
    addedFavoriteProductViaApi,
    favoritesPage,
  }) => {
    await favoritesPage.navigate();
    await favoritesPage.deleteProductById(addedFavoriteProductViaApi.id);

    await expect(
      favoritesPage.getProductCardById(addedFavoriteProductViaApi.id),
    ).toBeHidden();
  });

  test('User views an empty favorites list', async ({
    authenticatedPage,
    authToken,
    favoritesApi,
    favoritesPage,
  }) => {
    await favoritesApi.clearFavorites(authToken);

    await favoritesPage.navigate();
    await expect(favoritesPage.emptyFavoritesMessage).toBeVisible();
  });
});
