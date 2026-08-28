import { Page, Locator } from '@playwright/test';
import { BasePage } from '@/pages/base.page';
import { LoginData } from '@/types/auth.type';
import { ROUTES } from '@/constants/routes';

export class LoginPage extends BasePage {
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly submitButton: Locator;

  constructor(page: Page) {
    super(page);
    this.emailInput = page.getByTestId('email');
    this.passwordInput = page.getByTestId('password');
    this.submitButton = page.getByTestId('login-submit');
  }

  async navigate(): Promise<void> {
    await this.page.goto(ROUTES.LOGIN);
  }

  async login({ email, password }: LoginData): Promise<void> {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.submitButton.click();
  }
}
