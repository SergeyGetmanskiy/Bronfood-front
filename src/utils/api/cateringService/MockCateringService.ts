import { Restaurant } from '../restaurantsService/restaurantsService';
import { Administrator } from './cateringService';

export const emptyRestaurant: Restaurant = {
    id: 0,
    photo: '',
    name: 'Загрузка...',
    rating: 0,
    address: '',
    coordinates: { latitude: 0, longitude: 0 },
    workingTime: '',
    isFavorite: false,
    type: 'fastFood',
};

export const mockCateringService: Administrator[] = [
    {
        id: '1',
        login: 'Иван Иванов',
        password: '12345',
        restaurant: emptyRestaurant,
    },
    {
        id: '2',
        login: 'Иван Иванов',
        password: '67890',
        restaurant: emptyRestaurant,
    },
];
