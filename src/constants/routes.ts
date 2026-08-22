export const ROUTES = {
  HOME: '/',
  LOGIN: '/auth/login',
  REGISTER: '/auth/register',
  ACCOUNT: '/account',
  FAVORITES: '/account/favorites',
  PRODUCT: (id: string) => `/product/${id}`,
} as const;
