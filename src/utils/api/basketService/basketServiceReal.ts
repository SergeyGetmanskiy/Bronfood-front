import { BasketService, Basket, MealInBasket, FeatureInPayload } from './basketService';
import { handleFetch } from '../../serviceFuncs/handleFetch';
import { OrderState } from '../orderService/orderService';

export class BasketServiceReal implements BasketService {
    async getBasket(): Promise<{ data: Basket }> {
        return handleFetch('api/basket/');
    }
    async addMeal(restaurantId: number, mealId: number, features: FeatureInPayload[] | never[]): Promise<{ data: MealInBasket }> {
        return handleFetch('api/basket/meals/', { method: 'POST', data: { restaurantId, mealId, features } });
    }
    async increment(mealId: number): Promise<void> {
        return handleFetch('api/basket/meals/increment/', { method: 'POST', data: { mealId } });
    }
    async decrement(mealId: number): Promise<void> {
        return handleFetch('api/basket/meals/decrement/', { method: 'POST', data: { mealId } });
    }
    async emptyBasket(): Promise<void> {
        return handleFetch('api/basket/', { method: 'DELETE' });
    }
    async placeOrder(userId: string, restaurantId: number): Promise<OrderState> {
        console.log(userId, restaurantId);
        return handleFetch('api/orders/', { method: 'POST', data: { restaurantId, userId } });
    }
}
