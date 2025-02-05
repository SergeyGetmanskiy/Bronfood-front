import { LngLatBounds } from '@yandex/ymaps3-types';
import { handleFetch } from '../../serviceFuncs/handleFetch';
import { Feature, Meal, Restaurant, RestaurantsService, ReviewResponse } from './restaurantsService';

export class RestaurantsServiceReal implements RestaurantsService {
    async _wait(ms: number) {
        return new Promise((res) => setTimeout(res, ms));
    }
    async getRestaurants(bounds: LngLatBounds): Promise<{ data: Restaurant[] }> {
        await this._wait(1000);
        const coords = bounds.flat();
        const swlat = `swlat=${coords[1]}`;
        const swlon = `swlon=${coords[0]}`;
        const nelat = `nelat=${coords[3]}`;
        const nelon = `nelon=${coords[2]}`;
        const endpoint = `api/restaurant/?${swlat}&${swlon}&${nelat}&${nelon}`;
        const responseData = await handleFetch(endpoint);
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
