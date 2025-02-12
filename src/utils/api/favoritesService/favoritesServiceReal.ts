import { Restaurant } from '../restaurantsService/restaurantsService';
import { FavoritesService } from './favoritesService';
import { handleFetch } from '../../serviceFuncs/handleFetch';

export class FavoritesServiceReal implements FavoritesService {
    async getFavorites(): Promise<{ data: Restaurant[] }> {
        return handleFetch('api/favorites/');
    }

    async setFavorites(restaurantId: number): Promise<{ data: string }> {
        return handleFetch(`api/favorites/`, { method: 'POST', data: { restaurantId } });
    }

    async deleteFavorites(restaurantId: number): Promise<{ data: string }> {
        return handleFetch(`api/favorites/`, { method: 'DELETE', data: { restaurantId } });
    }
}
