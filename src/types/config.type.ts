import { LoginData } from '@/types/auth.type';
export interface Config {
  BASE_API_URL: string;
  BASE_URL: string;
  TEST_USERS_CREDENTIALS: LoginData[];
  REGISTERED_USERS_COUNT: string;
}
