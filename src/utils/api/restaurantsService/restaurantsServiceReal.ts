import { LngLatBounds } from '@yandex/ymaps3-types';
import { handleFetch } from '../../serviceFuncs/handleFetch';
import { Feature, Meal, Restaurant, RestaurantsService, ReviewResponse } from './restaurantsService';

type WorkingTime = {
    close_time: string;
    date: string;
    open_time: string;
    source: string;
    weekday: number;
};

type RestaurantFromServer = Omit<Restaurant, 'workingTime'> & { working_times: WorkingTime[] };

export class RestaurantsServiceReal implements RestaurantsService {
    private addWorkingTime(restaurants: RestaurantFromServer[]): Restaurant[] {
        const todaysDate = new Date().toISOString().split('T')[0];
        return restaurants.map((restaurant: RestaurantFromServer) => {
            const todaysWorkingTimes = restaurant.working_times.filter((time) => time.date === todaysDate)[0];
            const open = todaysWorkingTimes.open_time;
            const close = todaysWorkingTimes.close_time;
            const workingTime = `${open}-${close}`;
            const newRestaurant = {
                ...restaurant,
                workingTime,
            };
            Reflect.deleteProperty(newRestaurant, 'working_times');
            return newRestaurant;
        });
    }

    async getRestaurants(bounds: LngLatBounds): Promise<{ data: Restaurant[] }> {
        const coords = bounds.flat();
        const swlat = `swlat=${coords[1]}`;
        const swlon = `swlon=${coords[0]}`;
        const nelat = `nelat=${coords[3]}`;
        const nelon = `nelon=${coords[2]}`;
        const endpoint = `api/restaurants/?${swlat}&${swlon}&${nelat}&${nelon}`;
        const responseData = await handleFetch(endpoint);
        const restaurants = this.addWorkingTime(responseData.data);
        return { data: restaurants };
    }
    async getRestaurantById(id: number): Promise<{ data: Restaurant }> {
        return handleFetch(`api/restaurants/${id}/`);
    }
    async getMeals(restaurantId: number): Promise<{ data: Meal[] }> {
        return handleFetch(`api/restaurants/${restaurantId}/meals/`);
    }
    async getFeatures(restaurantId: number, mealId: number): Promise<{ data: Feature[] }> {
        return handleFetch(`api/restaurants/${restaurantId}/meal/${mealId}/features/`);
    }
    async getReviews(restaurantId: number): Promise<{ data: ReviewResponse }> {
        const limit = 100;
        const offset = 0;
        return handleFetch(`api/restaurants/${restaurantId}/reviews/?limit=${limit}&offset=${offset}`);
    }
}
