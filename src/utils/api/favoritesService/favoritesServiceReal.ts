import { Restaurant } from '../restaurantsService/restaurantsService';
import { FavoritesService } from './favoritesService';
import { handleFetch } from '../../serviceFuncs/handleFetch';

export type FavoriteRestaurant = {
    id: number;
    restaurant: Restaurant;
};

export class FavoritesServiceReal implements FavoritesService {
    async getFavorites(): Promise<{ data: FavoriteRestaurant[] }> {
        return handleFetch('api/restaurants/favorites/');
    }

    async setFavorites(restaurantId: number): Promise<{ data: string }> {
        return handleFetch(`api/restaurants/favorites/`, { method: 'POST', data: { restaurantId } });
    }

    async deleteFavorites(restaurantId: number): Promise<Response> {
        return handleFetch(`api/restaurants/favorites/${restaurantId}/`, { method: 'DELETE' });
    }
}
