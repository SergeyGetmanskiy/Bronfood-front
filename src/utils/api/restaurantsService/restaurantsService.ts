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
     * feature choice belongs to
     */
    feature_name: string;
    /**
     * Is choice chosen by user
     */
    chosen?: boolean;
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
    /**
     * true if feature is container
     */
    is_container: boolean;
    /**
     * true if feature is size
     */
    is_size: boolean;
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
     * Time taken for meal to be prepared in minutes
     */
    waitingTime: number;
    /**
     * If meal has features
     */
    hasFeatures: boolean;
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
    getMeals(restaurantId: number): Promise<{ data: Meal[] }>;
    getFeatures(restaurantId: number, mealId: number): Promise<{ data: Feature[] }>;
}

export const restaurantsService = new RestaurantsServiceReal();
