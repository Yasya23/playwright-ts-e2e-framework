import { BaseApi } from '@/utils/api/base.api';
import { API_ROUTES } from '@/constants/api';
import { ProductData } from '@/types/product.type';

export class ProductsApi extends BaseApi {
  async getProducts(): Promise<Array<ProductData>> {
    const response = await this.get(API_ROUTES.PRODUCTS);
    const responseJson = await response.json();
    return responseJson.data;
  }
}
