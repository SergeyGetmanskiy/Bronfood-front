import { FavoriteRestaurant, FavoritesServiceReal } from './favoritesServiceReal';

export interface FavoritesService {
    getFavorites: (userId: number) => Promise<{ data: FavoriteRestaurant[] }>;
    setFavorites: (restaurantId: number) => Promise<Response>;
    deleteFavorites: (restaurantId: number) => Promise<Response>;
}

export const favoritesService = new FavoritesServiceReal();
