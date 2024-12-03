import { handleFetch } from '../../serviceFuncs/handleFetch';
import { Feature, Meal, Restaurant, RestaurantsService } from './restaurantsService';

export class RestaurantsServiceReal implements RestaurantsService {
    private _restaurantsCache: Restaurant[] | null = null;

    async getRestaurants(): Promise<{ data: Restaurant[] }> {
        if (this._restaurantsCache !== null) {
            return {
                data: this._restaurantsCache,
            };
        }
        const responseData = await handleFetch('api/restaurant/');
        this._restaurantsCache = responseData.data;
        return responseData;
    }

    async getRestaurantById(id: number): Promise<{ data: Restaurant }> {
        return handleFetch(`api/restaurant/${id}/`);
    }

    async getMeals(restaurantId: number): Promise<{ meals: Meal[] }> {
        return handleFetch(`api/restaurant/${restaurantId}/meals/`);
    }

    async getFeatures(restaurantId: number, mealId: number): Promise<{ features: Feature[] }> {
        return handleFetch(`api/restaurant/${restaurantId}/meal/${mealId}/features`);
    }
}
