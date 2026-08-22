import { Page, Locator } from '@playwright/test';
import { BasePage } from '@/pages/base.page';
import { RegisterData } from '@/types/auth.type';
import { ROUTES } from '@/constants/routes';

export class RegisterPage extends BasePage {
  readonly fields: Record<keyof Omit<RegisterData, 'country'>, Locator>;
  readonly countrySelect: Locator;
  readonly submitButton: Locator;

  constructor(page: Page) {
    super(page);

    this.fields = {
      firstName: page.getByTestId('first-name'),
      lastName: page.getByTestId('last-name'),
      dateOfBirth: page.getByTestId('dob'),
      street: page.getByTestId('street'),
      houseNumber: page.getByTestId('house_number'),
      city: page.getByTestId('city'),
      state: page.getByTestId('state'),
      postalCode: page.getByTestId('postal_code'),
      phoneNumber: page.getByTestId('phone'),
      email: page.getByTestId('email'),
      password: page.getByTestId('password'),
    };

    this.countrySelect = page.getByTestId('country');
    this.submitButton = page.getByTestId('register-submit');
  }

  async navigate(): Promise<void> {
    await this.page.goto(ROUTES.REGISTER);
  }

  async register(data: RegisterData): Promise<void> {
    await this.fillForm(data);
    await this.submitButton.click();
  }
  async fillForm(data: RegisterData): Promise<void> {
    for (const [key, locator] of Object.entries(this.fields)) {
      const val = data[key as keyof typeof this.fields];
      if (val) {
        await locator.fill(String(val));
      }
    }
    if (data.country) {
      await this.countrySelect.selectOption(data.country);
    }
  }
}
