import { AdminServiceMock } from './adminServiceMock';
import { MealInBasket } from '../basketService/basketService';
import { Choice, Meal } from '../restaurantsService/restaurantsService';

export type ChoiceInAdminOrder = Omit<Choice, 'price' | 'default' | 'feature_name' | 'chosen'>;
export type MealInAdminOrder = Omit<Meal, 'description' | 'photo' | 'type' | 'hasFeatures'>;
export type MealInOrder = Omit<MealInBasket, 'meal' | 'choices'> & {
    meal: MealInAdminOrder;
    choices: ChoiceInAdminOrder[];
};
export type AdminOrderStatus = 'not accepted' | 'cooking' | 'ready' | 'canceled' | 'archive';
export type AdminOrder = {
    /**
     * order's id
     */
    id: number;
    /**
     * user's name
     */
    userName: string;
    /**
     * order's code
     */
    orderCode: string;
    /**
     * meals in order
     */
    meals: MealInOrder[];
    /**
     * time order was accepted
     */
    acceptedAt: Date | '';
    /**
     * order's status
     */
    status: AdminOrderStatus;
};

export interface AdminService {
    getAdminOrders: () => Promise<{ data: AdminOrder[] }>;
    changeAdminOrderStatus: (id: number, status: AdminOrderStatus) => Promise<void>;
}

export const adminService = new AdminServiceMock();
