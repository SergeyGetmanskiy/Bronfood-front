/* import { BasketServiceReal } from './basketServiceReal';*/

import { MealInBasket } from '../basketService/basketService';

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
        meals: MealInBasket[];
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
    getAdminOrders: () => Promise<{ data: AdminOrder[] }>;
}

/* export const adminService = new BasketServiceReal();
 */
