import { Restaurant } from '../restaurantsService/restaurantsService';
import { FavoritesServiceReal } from './favoritesServiceReal';

export interface FavoritesService {
    getFavorites: (userId: string) => Promise<{ data: Restaurant[] }>;
    setFavorites: (restaurantId: number) => Promise<{ data: string }>;
    deleteFavorites: (restaurantId: number) => Promise<{ data: string }>;
}

export const favoritesService = new FavoritesServiceReal();
