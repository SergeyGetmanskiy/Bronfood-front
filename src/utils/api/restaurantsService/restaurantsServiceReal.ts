import { LngLatBounds } from '@yandex/ymaps3-types';
import { handleFetch } from '../../serviceFuncs/handleFetch';
import { Feature, Meal, Restaurant, RestaurantsService, ReviewResponse } from './restaurantsService';

export class RestaurantsServiceReal implements RestaurantsService {
    async getRestaurants(bounds: LngLatBounds): Promise<{ data: Restaurant[] }> {
        const coords = bounds.flat();
        coords.name = 'name';
        const responseData = await handleFetch('api/restaurant/');
        return responseData;
    }

    async getRestaurantById(id: number): Promise<{ data: Restaurant }> {
        return handleFetch(`api/restaurant/${id}/`);
    }

    async getMeals(restaurantId: number): Promise<{ data: Meal[] }> {
        return handleFetch(`api/restaurant/${restaurantId}/meals/`);
    }

    async getFeatures(restaurantId: number, mealId: number): Promise<{ data: Feature[] }> {
        return handleFetch(`api/restaurant/${restaurantId}/meal/${mealId}/features/`);
    }

    async getReviews(restaurantId: number): Promise<{ data: ReviewResponse }> {
        const limit = 100;
        const offset = 0;
        return handleFetch(`api/review/${restaurantId}/?limit=${limit}&offset=${offset}`);
    }
}
