import { BasketServiceReal } from './basketServiceReal';
import { Feature, Meal, Restaurant, Choice } from '../restaurantsService/restaurantsService';

export type MealInBasket = {
    /**
     * meal's id
     */
    id: number;
    /**
     * meal
     */
    meal: Meal;
    /**
     * quantity of meals
     */
    count: number;
    /**
     * meal's choices
     */
    choices: Choice[] | never[];
    /**
     * meal's price
     */
    price: number;
};

export type Basket = {
    /**
     * Restaurant which meals are in basket
     */
    restaurant: Restaurant | Record<string, never>;
    /**
     * List of meals in basket
     */
    meals: MealInBasket[];
};

export interface BasketService {
    getBasket: () => Promise<{ data: Basket }>;
    addMeal: (restaurantId: number, mealId: number, fetures: Feature[] | never[]) => Promise<{ data: MealInBasket }>;
    deleteMeal: (restaurantId: number, mealId: number, fetures: Feature[] | never[]) => Promise<{ data: Basket }>;
    emptyBasket: () => Promise<{ data: Basket }>;
}

export const basketService = new BasketServiceReal();
