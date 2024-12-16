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
    /**
     * Total price of meals in basket
     */
    basket_price: number;
    /**
     * Comission value
     */
    basket_comission: number;
};

export type FeatureInPayload = {
    featureId: number;
    featureName: string;
    choiceId: number;
    choiceName: string;
};

export interface BasketService {
    getBasket: () => Promise<{ data: Basket }>;
    addMeal: (restaurantId: number, mealId: number, features: FeatureInPayload[] | never[]) => Promise<{ data: MealInBasket }>;
    deleteMeal: (restaurantId: number, mealId: number, features: Feature[] | never[]) => Promise<{ data: Basket }>;
    emptyBasket: () => Promise<void>;
}

export const basketService = new BasketServiceReal();
