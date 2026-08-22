import { request as playwrightRequest } from '@playwright/test';
import { AuthApi } from '@/utils/api/auth.api';
import { createRegisterApiData } from '@/data/auth.data';

import { test as setup } from '@playwright/test';
import { CONFIG } from '@/config/config';

setup('registrate users', async ({}) => {
  console.log('[Global Setup] Registering dynamic users via AuthApi...');

  const apiContext = await playwrightRequest.newContext();
  const authApi = new AuthApi(apiContext);
  const numberOfUsers = Number(CONFIG.REGISTERED_USERS_COUNT);

  for (let i = 1; i <= numberOfUsers; i++) {
    const userData = createRegisterApiData();

    process.env[`USER_EMAIL_${i}`] = userData.email;
    process.env[`USER_PASSWORD_${i}`] = userData.password;

    try {
      await authApi.register(userData);
      console.log(
        `[Global Setup] Registered USER_EMAIL_${i}: ${userData.email}`,
      );
    } catch (error) {
      console.error(`[Global Setup] Error registering USER_EMAIL_${i}:`, error);
    }
  }

  await apiContext.dispose();
});
