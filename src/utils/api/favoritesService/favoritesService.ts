import { FavoriteRestaurant, FavoritesServiceReal } from './favoritesServiceReal';

export interface FavoritesService {
    getFavorites: (userId: string) => Promise<{ data: FavoriteRestaurant[] }>;
    setFavorites: (restaurantId: number) => Promise<{ data: string }>;
    deleteFavorites: (restaurantId: number) => Promise<Response>;
}

export const favoritesService = new FavoritesServiceReal();
