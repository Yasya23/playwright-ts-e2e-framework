import { APIRequestContext, APIResponse, expect } from '@playwright/test';
import { CONFIG } from '@/config/config';

export abstract class BaseApi {
  protected readonly baseUrl: string;

  constructor(protected request: APIRequestContext) {
    this.baseUrl = CONFIG.BASE_API_URL;
  }

  protected getHeaders(token?: string) {
    return {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    };
  }

  protected async get(
    endpoint: string,
    token?: string,
    expectedStatus = 200,
  ): Promise<APIResponse> {
    const response = await this.request.get(`${this.baseUrl}${endpoint}`, {
      headers: this.getHeaders(token),
    });
    this.assertStatus(response, expectedStatus, 'GET', endpoint);
    return response;
  }

  protected async post(
    endpoint: string,
    data?: unknown,
    token?: string,
    expectedStatus = 201,
  ): Promise<APIResponse> {
    const response = await this.request.post(`${this.baseUrl}${endpoint}`, {
      data,
      headers: this.getHeaders(token),
    });
    this.assertStatus(response, expectedStatus, 'POST', endpoint);
    return response;
  }

  protected async delete(
    endpoint: string,
    token: string,
    expectedStatus = 200,
  ): Promise<APIResponse> {
    const response = await this.request.delete(`${this.baseUrl}${endpoint}`, {
      headers: this.getHeaders(token),
    });
    this.assertStatus(response, expectedStatus, 'DELETE', endpoint);
    return response;
  }

  private assertStatus(
    response: APIResponse,
    expectedStatus: number,
    method: string,
    endpoint: string,
  ): void {
    expect(
      response.status(),
      `${method} ${endpoint} - expected status ${expectedStatus}`,
    ).toBe(expectedStatus);
  }
}
