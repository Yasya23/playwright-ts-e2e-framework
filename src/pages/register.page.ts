import { Page, Locator } from '@playwright/test';
import { BasePage } from '@/pages/base.page';
import { RegisterData } from '@/types/auth.type';
import { ROUTES } from '@/constants/routes';

export class RegisterPage extends BasePage {
  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly dobInput: Locator;
  readonly streetInput: Locator;
  readonly houseNumberInput: Locator;
  readonly cityInput: Locator;
  readonly stateInput: Locator;
  readonly postalCodeInput: Locator;
  readonly phoneInput: Locator;
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly countrySelect: Locator;
  readonly submitButton: Locator;

  constructor(page: Page) {
    super(page);

    this.firstNameInput = page.getByTestId('first-name');
    this.lastNameInput = page.getByTestId('last-name');
    this.dobInput = page.getByTestId('dob');
    this.streetInput = page.getByTestId('street');
    this.houseNumberInput = page.getByTestId('house_number');
    this.cityInput = page.getByTestId('city');
    this.stateInput = page.getByTestId('state');
    this.postalCodeInput = page.getByTestId('postal_code');
    this.phoneInput = page.getByTestId('phone');
    this.emailInput = page.getByTestId('email');
    this.passwordInput = page.getByTestId('password');
    this.countrySelect = page.getByTestId('country');
    this.submitButton = page.getByTestId('register-submit');
  }

  async navigate(): Promise<void> {
    await this.page.goto(ROUTES.REGISTER);
  }

  async fillForm(data: RegisterData): Promise<void> {
    if (data.firstName) await this.firstNameInput.fill(data.firstName);
    if (data.lastName) await this.lastNameInput.fill(data.lastName);
    if (data.dateOfBirth) await this.dobInput.fill(data.dateOfBirth);
    if (data.street) await this.streetInput.fill(data.street);
    if (data.houseNumber)
      await this.houseNumberInput.fill(String(data.houseNumber));
    if (data.city) await this.cityInput.fill(data.city);
    if (data.state) await this.stateInput.fill(data.state);
    if (data.postalCode) await this.postalCodeInput.fill(data.postalCode);
    if (data.phoneNumber) await this.phoneInput.fill(data.phoneNumber);
    if (data.email) await this.emailInput.fill(data.email);
    if (data.password) await this.passwordInput.fill(data.password);
    if (data.country) await this.countrySelect.selectOption(data.country);
  }

  async register(data: RegisterData): Promise<void> {
    await this.fillForm(data);
    await this.submitButton.click();
  }
}
