import { BaseApi } from '@/utils/api/base.api';
import { API_ROUTES } from '@/constants/api';
import { LoginData, RegisterData } from '@/types/auth.type';

export class AuthApi extends BaseApi {
  async getToken(credentials: LoginData): Promise<string> {
    const response = await this.post(
      API_ROUTES.LOGIN,
      credentials,
      undefined,
      200,
    );
    const body = await response.json();

    if (!body?.access_token) {
      throw new Error(
        `AuthApi.getToken: response did not contain an access_token. Received: ${JSON.stringify(body)}`,
      );
    }

    return body.access_token;
  }

  async register(userData: RegisterData): Promise<void> {
    await this.post(API_ROUTES.REGISTER, userData, undefined, 201);
  }
}
