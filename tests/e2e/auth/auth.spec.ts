import { test, expect } from '@/fixtures/fixtures';
import { VALID_LOGIN_DATA, VALID_REGISTER_DATA } from '@/data/auth.data';
import { ROUTES } from '@/constants/routes';

test.describe('Feature: User Authentication', () => {
  test('User registers a new account successfully', async ({
    registerPage,
    page,
  }) => {
    await registerPage.navigate();
    await registerPage.register(VALID_REGISTER_DATA);
    await expect(page).toHaveURL(ROUTES.LOGIN);
  });

  test('User logs in with valid credentials', async ({ loginPage, page }) => {
    await loginPage.navigate();
    await loginPage.login(VALID_LOGIN_DATA);
    await expect(page).toHaveURL(ROUTES.ACCOUNT);
  });
});
