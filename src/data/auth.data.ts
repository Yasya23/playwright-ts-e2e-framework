import { LoginData, RegisterData, RegisterApiData } from '@/types/auth.type';
import { CONFIG } from '@/config/config';
import {
  generateRandomPassword,
  generateUniqueEmail,
} from '@/utils/auth-generator.util';

export const VALID_LOGIN_DATA: LoginData = CONFIG.TEST_USERS_CREDENTIALS[0];

export const TEST_USERS_POOL: LoginData[] = CONFIG.TEST_USERS_CREDENTIALS;

export const createRegisterApiData = (
  overrides: Partial<RegisterApiData> = {},
): RegisterApiData => ({
  first_name: 'Test',
  last_name: 'User',
  dob: '1994-01-01',
  phone_number: '1234567890',
  email: generateUniqueEmail(),
  password: generateRandomPassword(),
  address: {
    street: 'Test St',
    house_number: '123',
    city: 'Test City',
    state: 'Test State',
    country: 'UA',
    postal_code: '12345',
  },
  ...overrides,
});

export const createRegisterData = (
  overrides: Partial<RegisterData> = {},
): RegisterData => ({
  firstName: 'Test',
  lastName: 'User',
  dateOfBirth: '1994-01-01',
  phoneNumber: '1234567890',
  street: 'Test St',
  houseNumber: '123',
  city: 'Test City',
  state: 'Test State',
  country: 'UA',
  postalCode: '12345',
  email: generateUniqueEmail(),
  password: generateRandomPassword(),
  ...overrides,
});

export const VALID_REGISTER_DATA: RegisterData = createRegisterData();
