import {
  test as base,
  expect,
  Page,
  request as playwrightRequest,
} from '@playwright/test';
import { LoginPage, RegisterPage, ProductPage, FavoritesPage } from '@/pages';

import { AuthApi, FavoritesApi, ProductsApi } from '@/utils/api';

import { TEST_USERS_POOL } from '@/data/auth.data';
import { ApiAddedProduct, ProductData } from '@/types/product.type';

type PageObjects = {
  loginPage: LoginPage;
  registerPage: RegisterPage;
  productPage: ProductPage;
  favoritesPage: FavoritesPage;
  authApi: AuthApi;
  favoritesApi: FavoritesApi;
  productsApi: ProductsApi;
  authToken: string;
  authenticatedPage: Page;
  testProductData: ProductData;
  addedFavoriteProductViaApi: ApiAddedProduct;
  cleanupAddedFavoriteAfterTest: void;
};

type WorkerFixtures = {
  workerAuthToken: string;
};

export const test = base.extend<PageObjects, WorkerFixtures>({
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },

  registerPage: async ({ page }, use) => {
    await use(new RegisterPage(page));
  },

  productPage: async ({ page }, use) => {
    await use(new ProductPage(page));
  },

  favoritesPage: async ({ page }, use) => {
    await use(new FavoritesPage(page));
  },

  authApi: async ({ request }, use) => {
    await use(new AuthApi(request));
  },

  favoritesApi: async ({ request }, use) => {
    await use(new FavoritesApi(request));
  },

  productsApi: async ({ request }, use) => {
    await use(new ProductsApi(request));
  },

  // workerAuthToken: [
  //   async ({}, use, workerInfo) => {
  //     if (TEST_USERS_POOL.length < workerInfo.parallelIndex + 1) {
  //       console.warn(
  //         `[fixtures] TEST_USERS_POOL has ${TEST_USERS_POOL.length} account(s), not enough for parallel index ${workerInfo.parallelIndex}. ` +
  //           'This worker will share an account with another and can interfere with it on favorites-mutating tests. ' +
  //           'Add more accounts to TEST_USERS_POOL to fix this properly.',
  //       );
  //     }

  //     const credentials =
  //       TEST_USERS_POOL[workerInfo.parallelIndex % TEST_USERS_POOL.length];

  //     const apiContext = await playwrightRequest.newContext();
  //     const authApi = new AuthApi(apiContext);
  //     const token = await authApi.getToken(credentials);

  //     await use(token);

  //     await apiContext.dispose();
  //   },
  //   { scope: 'worker' },
  // ],

  // WORKER-SCOPED: виконується ОДИН РАЗ на весь worker-процес, а не на
  // кожен тест. Всі тести, що виконуються в межах цього worker'а,
  // отримають той самий токен - Playwright сам кешує результат і не
  // викликає цю функцію повторно, поки worker живий.
  //
  // Через це тут НЕМАЄ доступу до built-in fixture `request` (вона
  // test-scoped за дизайном Playwright - новий APIRequestContext на
  // кожен тест). Тому створюємо свій APIRequestContext вручну через
  // playwright.request.newContext() і обов'язково прибираємо його в
  // teardown через apiContext.dispose(), інакше зʼявиться memory leak на
  // рівні worker-процесу (context живе, поки worker не завершиться).
  workerAuthToken: [
    async ({}, use, workerInfo) => {
      if (TEST_USERS_POOL.length < workerInfo.workerIndex + 1) {
        console.warn(
          `[fixtures] TEST_USERS_POOL has ${TEST_USERS_POOL.length} account(s), not enough for workerIndex ${workerInfo.workerIndex}. ` +
            'Some worker processes will share an account and can interfere with each other on favorites-mutating tests. ' +
            'Increase REGISTERED_USERS_COUNT to comfortably exceed `workers` (retries can spawn extra processes beyond the base worker count).',
        );
      }

      const credentials =
        TEST_USERS_POOL[workerInfo.workerIndex % TEST_USERS_POOL.length];

      const apiContext = await playwrightRequest.newContext();
      const authApi = new AuthApi(apiContext);
      const token = await authApi.getToken(credentials);

      await use(token);
      await apiContext.dispose();
    },
    { scope: 'worker' },
  ],

  authToken: async ({ workerAuthToken }, use) => {
    await use(workerAuthToken);
  },

  authenticatedPage: async ({ page, authToken }, use) => {
    await page.addInitScript((token) => {
      localStorage.setItem('auth-token', token);
    }, authToken);

    await use(page);
  },

  testProductData: async ({ productsApi }, use) => {
    const products = await productsApi.getProducts();

    if (products.length === 0) {
      throw new Error(
        'testProductData fixture: ProductsApi.getProducts() returned an empty list.',
      );
    }

    const firstProductIndex = 0;
    const testedProduct = products[firstProductIndex];

    await use(testedProduct);
  },

  addedFavoriteProductViaApi: async (
    { favoritesApi, authToken, testProductData },
    use,
  ) => {
    const productData = await favoritesApi.addFavorite(
      testProductData.id,
      authToken,
    );

    if (productData.product_id !== testProductData.id) {
      throw new Error(
        'addedFavoriteProductViaApi fixture: FavoritesApi.addFavorite() returned an unexpected product_id.',
      );
    }

    await use(productData);
  },
  cleanupAddedFavoriteAfterTest: async (
    { favoritesApi, authToken, testProductData },
    use,
  ) => {
    await use();

    try {
      const favorites = await favoritesApi.getFavorites(authToken);
      const ourFavorite = favorites.find(
        (favorite) => favorite.product_id === testProductData.id,
      );

      if (ourFavorite) {
        await favoritesApi.removeFavorite(ourFavorite.id, authToken);
      }
    } catch (error) {
      console.warn(
        `[fixtures] cleanupAddedFavoriteAfterTest: failed to clean up favorite for product "${testProductData.id}". ` +
          `This may leave stray data on a shared demo account. ` +
          `Error: ${error instanceof Error ? error.message : String(error)}`,
      );
    }
  },
});

export { expect };
