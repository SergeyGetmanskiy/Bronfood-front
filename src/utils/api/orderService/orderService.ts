import { Choice, Meal, Restaurant } from '../restaurantsService/restaurantsService';

export interface OrderedMeal {
    /**
     * Ordered Meal type, representing the details of the meal ordered.
     */
    orderedMeal: Meal;
    /**
     * Number of units of the item ordered.
     */
    quantity: number;
}

export interface OrderState {
    /**
     * id for the user who made the order.
     */
    userId: number;
    /**
     * Unique identifier for the client who made the order.
     */
    id: string;
    /**
     * Total amount of the order in the local currency.
     */
    totalAmount: number;
    /**
     * Confirmation status of the order.
     */
    preparationStatus: 'waiting' | 'confirmed' | 'notConfirmed';
    /**
     * Time required to prepare the order, measured in minutes.
     */
    preparationTime: number;
    /**
     * Payment status of the order.
     */
    paymentStatus: 'paid' | 'notPaid';
    /**
     * Review status of the order.
     */
    reviewStatus: 'waiting' | 'reviewed' | 'skipped';
    /**
     * Time of order cancellation in seconds.
     */
    cancellationTime: number;
    /**
     * Cancellation status of the order.
     */
    cancellationStatus: 'none' | 'requested' | 'confirmed';
    /**
     * Flag indicating whether a cancellation was requested for the order.
     */
    isCancellationRequested: boolean;
    /**
     * Array with details of items in the order.
     */
    orderedMeal: OrderedMeal[];
    /**
     * Provides restaurantId for order feedback
     */
    restaurantId: number;
}

export interface MealChoice {
    choice: Choice;
    is_visible: boolean;
    is_deleted: boolean;
}

export interface UserOrderMeal {
    meal: Meal;
    count: number;
    choices: MealChoice[];
    is_visible: boolean;
    is_deleted: boolean;
}

export interface UserOrder {
    id: number;
    order_code: string | null;
    amount: number;
    currency: string;
    status: string;
    restaurant: Restaurant;
    meals: UserOrderMeal[];
    created_at: string;
    payed_at?: string | null;
    waiting_time: string;
    canceled_at?: string | null;
    cancellation_reason?: string | null;
    issued_at?: string | null;
    rating?: number | null;
    payment_url?: string | null;
}

export interface UserOrdersListPagination {
    count: number;
    next: string | null;
    previous: string | null;
    results: UserOrder[];
}
