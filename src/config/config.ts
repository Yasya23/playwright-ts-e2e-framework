import { getEnv } from '@/utils/getEnv.util';
import { Config } from '@/types/config.type';

export const CONFIG: Config = {
  BASE_API_URL: getEnv('BASE_API_URL'),
  BASE_URL: getEnv('BASE_URL'),
  TEST_USERS_CREDENTIALS: [
    { email: getEnv('USER_EMAIL_1'), password: getEnv('USER_PASSWORD_1') },
    { email: getEnv('USER_EMAIL_2'), password: getEnv('USER_PASSWORD_2') },
    { email: getEnv('USER_EMAIL_3'), password: getEnv('USER_PASSWORD_3') },
  ],
  REGISTERED_USERS_COUNT: getEnv('REGISTERED_USERS_COUNT'),
} as const;
