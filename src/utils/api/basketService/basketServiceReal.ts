import { BasketService, Basket, MealInBasket } from './basketService';
import { Feature } from '../restaurantsService/restaurantsService';
import { handleFetch } from '../../serviceFuncs/handleFetch';
import { OrderState } from '../orderService/orderService';

export class BasketServiceReal implements BasketService {
    async getBasket(): Promise<{ data: Basket }> {
        return handleFetch('api/basket/');
    }
    async addMeal(restaurantId: number, mealId: number, features: Feature[] | never[]): Promise<{ data: MealInBasket }> {
        return handleFetch('api/basket/add_meal', { method: 'POST', data: { restaurantId, mealId, features } });
    }
    async deleteMeal(restaurant_id: number, meal_id: number, features: Feature[] | never[]): Promise<{ data: Basket }> {
        return handleFetch('api/basket/delete_meal', { method: 'POST', data: { restaurant_id, meal_id, features } });
    }
    async emptyBasket(): Promise<void> {
        return handleFetch('api/basket/', { method: 'DELETE' });
    }
    async placeOrder(userId: string, restaurantId: number): Promise<OrderState> {
        return handleFetch('api/orders', { method: 'POST', data: { restaurantId, userId } });
    }
}
