import { Meal } from '../restaurantsService/restaurantsService';

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
    id: number;
    name: string;
}

export interface UserOrderMeal {
    id: number;
    name: string;
    count: number;
    price: number;
    choices: MealChoice[];
    is_available: boolean;
}

export interface UserOrder {
    id: number;
    order_code: string | null;
    amount: number;
    currency: string;
    status: string;
    restaurant: {
        id: number;
        photo: string;
        name: string;
        rating: number;
        address: string;
    };
    meals: UserOrderMeal[];
    created_at: string;
    paid_at?: string | null;
    waiting_time: string;
    canceled_at?: string | null;
    cancellation_reason?: string | null;
    issued_at?: string | null;
    rating?: number | null;
    payment_url?: string | null;
    is_order_repeatable: boolean;
}

export interface UserOrdersListPagination {
    count: number;
    next: string | null;
    previous: string | null;
    results: UserOrder[];
}
