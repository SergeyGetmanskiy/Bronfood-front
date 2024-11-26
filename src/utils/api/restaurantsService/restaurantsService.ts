import { RestaurantsServiceReal } from './restaurantsServiceReal';

export type Choice = {
    /**
     * Choice's id
     */
    id: number;
    /**
     * Choice's name
     */
    name: string;
    /**
     * Choice's price
     */
    price: number;
    /**
     * Is choice selected by default
     */
    default: boolean;
    /**
     * Is choice selected by user
     */
    chosen: boolean;
};

export type Feature = {
    /**
     * Feature's id
     */
    id: number;
    /**
     * Feature's name
     */
    name: string;
    /**
     * Feature's choices
     */
    choices: Choice[];
};

export type MealType = 'food' | 'drink' | 'dessert';

export type Meal = {
    /**
     * Meal's id
     */
    id: number;
    /**
     * Meal's name
     */
    name: string;
    /**
     * Meal's description
     */
    description: string;
    /**
     * Link to meal's image
     */
    photo: string;
    /**
     * Meal's price
     */
    price: number;
    /**
     * Meal's type
     */
    type: MealType;
    /**
     * Meal's cooking time in minutes
     */
    waitingTime: number;
    /**
     * Meal's additions
     */
    features?: Feature[];
};

export type Restaurant = {
    /**
     * Venue's id
     */
    id: number;
    /**
     * Link to venue's image
     */
    photo: string;
    /**
     * Venue's name
     */
    name: string;
    /**
     * Venue's rating
     */
    rating: number;
    /**
     * Venue's address
     */
    address: string;
    /**
     * Venue's map coordinates
     */
    coordinates: {
        latitude: number;
        longitude: number;
    };
    /**
     * Venue's open hours
     */
    workingTime: string;
    /**
     * User's favorite state
     */
    isLiked: boolean;
    /**
     * Venue's type
     */
    type: 'fastFood' | 'cafe' | 'cafeBar';
};

export interface RestaurantsService {
    getRestaurants: () => Promise<{ data: Restaurant[] }>;
    getRestaurantById(id: number): Promise<{ data: Restaurant }>;
    getMeals(restaurantId: number): Promise<{ meals: Meal[] }>;
}

export const restaurantsService = new RestaurantsServiceReal();
