export interface ProductData {
  id: string;
  name: string;
}

export interface ApiAddedProduct {
  id: string;
  product_id: string;
}

export interface ApiProductFavoritesData {
  id: string;
  product_id: string;
  product: ProductData[];
}
