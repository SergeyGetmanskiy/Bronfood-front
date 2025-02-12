import { Restaurant } from '../restaurantsService/restaurantsService';
import { FavoritesService } from './favoritesService';
import { handleFetch } from '../../serviceFuncs/handleFetch';

export class FavoritesServiceReal implements FavoritesService {
    async getFavorites(): Promise<{ status: 'success'; data: Restaurant[] } | { status: 'error'; error_message: string }> {
        return handleFetch('api/favorites/');
    }

    async setFavorites(restaurantId: number): Promise<{ status: 'success'; data: Restaurant[] } | { status: 'error'; error_message: string }> {
        return handleFetch(`api/favorites/`, { method: 'POST', data: { restaurantId } });
    }

    async deleteFavorites(restaurantId: number): Promise<{ status: 'success'; data: Restaurant[] } | { status: 'error'; error_message: string }> {
        return handleFetch(`api/favorites/`, { method: 'DELETE', data: { restaurantId } });
    }
}
