import { BaseApi } from '@/utils/api/base.api';
import { API_ROUTES } from '@/constants/api';
import { ApiProductFavoritesData, ApiAddedProduct } from '@/types/product.type';

export class FavoritesApi extends BaseApi {
  async getFavorites(token: string): Promise<Array<ApiProductFavoritesData>> {
    const response = await this.get(API_ROUTES.FAVORITES, token);
    return response.json();
  }

  async addFavorite(
    productId: string,
    token: string,
  ): Promise<ApiAddedProduct> {
    const response = await this.post(
      API_ROUTES.FAVORITES,
      { product_id: productId },
      token,
    );
    return response.json();
  }

  async removeFavorite(favoriteId: string, token: string): Promise<void> {
    await this.delete(`${API_ROUTES.FAVORITES}/${favoriteId}`, token, 204);
  }

  async clearFavorites(token: string): Promise<void> {
    const favorites = await this.getFavorites(token);

    if (favorites.length === 0) return;

    for (const favorite of favorites) {
      await this.removeFavorite(favorite.id, token);
    }
  }
}
