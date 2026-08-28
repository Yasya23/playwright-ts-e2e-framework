import { Page } from '@playwright/test';
import { HeaderComponent, ToastComponent } from '@/components';

export abstract class BasePage {
  readonly page: Page;
  readonly header: HeaderComponent;
  readonly toast: ToastComponent;

  constructor(page: Page) {
    this.page = page;
    this.header = new HeaderComponent(page);
    this.toast = new ToastComponent(page);
  }

  abstract navigate(...args: any[]): Promise<void>;
}
