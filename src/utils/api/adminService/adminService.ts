/* import { BasketServiceReal } from './basketServiceReal';*/

import { MealInBasket } from '../basketService/basketService';
import { Choice, Meal } from '../restaurantsService/restaurantsService';

export type ChoiceInAdminOrder = Omit<Choice, 'price' | 'default' | 'feature_name' | 'chosen'>;
export type MealInAdminOrder = Omit<Meal, 'description' | 'photo' | 'type' | 'hasFeatures'>;
export type MealInOrder = Omit<MealInBasket, 'meal' | 'choices'> & {
    meal: MealInAdminOrder;
    choices: ChoiceInAdminOrder[];
};
export type AdminOrder = {
    summary: {
        /**
         * user's name
         */
        userName: string;
        /**
         * order's code
         */
        orderCode: string;
    };
    details: {
        /**
         * meals in order
         */
        meals: MealInOrder[];
        /**
         * time order was accepted
         */
        acceptedAt: string;
    };
    /**
     * order's type
     */
    type: 'not accepted' | 'cooking' | 'complete';
};

export interface AdminService {
    getAdminOrders: () => Promise<{ status: 'success'; data: AdminOrder[] } | { status: 'error'; error_message: string }>;
}

/* export const adminService = new BasketServiceReal();
 */
