import { BasketService, Basket, MealInBasket, FeatureInPayload } from './basketService';
import { handleFetch } from '../../serviceFuncs/handleFetch';
import { OrderState } from '../orderService/orderService';

export class BasketServiceReal implements BasketService {
    private basketId = null;
    async getBasket(): Promise<{ data: Basket }> {
        const basketData = await handleFetch('api/restaurants/basket/');
        this.basketId = basketData.data.id;
        return basketData;
    }
    async addMeal(restaurantId: number, mealId: number, features: FeatureInPayload[] | never[]): Promise<{ data: MealInBasket }> {
        return handleFetch('api/restaurants/basket/meals/', { method: 'POST', data: { restaurantId, mealId, features } });
    }
    async increment(mealId: number): Promise<void> {
        return handleFetch('api/restaurants/basket/meals/increment/', { method: 'POST', data: { mealId } });
    }
    async decrement(mealId: number): Promise<void> {
        return handleFetch('api/restaurants/basket/meals/decrement/', { method: 'POST', data: { mealId } });
    }
    async emptyBasket(): Promise<void> {
        return handleFetch(`api/restaurants/basket/${this.basketId}/`, { method: 'DELETE' });
    }
    async placeOrder(userId: number, restaurantId: number): Promise<OrderState> {
        return handleFetch('api/restaurants/orders/', { method: 'POST', data: { restaurantId, userId } });
    }
}
