import { Administrator, Catering, CateringMeal } from './cateringService';
import restaurant1 from './MockImages/restaurant1.png';
import restaurant2 from './MockImages/restaurant2.png';
import restaurant3 from './MockImages/restaurant3.png';
import meal1 from './MockImages/meal1.png';

export const emptyCaterings: Catering[] = [
    {
        id: 1,
        photo: restaurant1,
        name: 'Jahu',
        description: 'Самые вкусные донеры и кофе',
        rating: 4.7,
        address: 'Казахстан, Астана, улица Бухар Жырау, 34/2',
        coordinates: { latitude: 51.09835783805425, longitude: 71.43399606766961 },
        tags: [{ name: 'каппучино' }, { name: 'свежый салат' }, { name: 'бистро' }],
        workingTime: {
            schedule: [
                { weekday: 0, open_time: '08:00', close_time: '23:00' },
                { weekday: 1, open_time: '08:00', close_time: '20:00' },
                { weekday: 2, open_time: '08:00', close_time: '20:00' },
                { weekday: 3, open_time: '08:00', close_time: '20:00' },
                { weekday: 4, open_time: '08:00', close_time: '22:00' },
                { weekday: 5, open_time: '08:00', close_time: '22:00' },
                { weekday: 6, open_time: '10:00', close_time: '18:00' },
            ],
            is24h: false,
        },
        type: 'cafe',
        cancellationTime: 7,
    },
    {
        id: 2,
        photo: restaurant2,
        name: 'Boom',
        description: 'Самые вкусные донеры и кофе',
        rating: 4.8,
        address: 'Казахстан, Астана, ул. Сыгынак, 60/3',
        coordinates: { latitude: 0, longitude: 0 },
        tags: [{ name: 'вкусно' }, { name: 'дешево' }, { name: 'сердито' }],
        workingTime: {
            schedule: [
                { weekday: 0, open_time: '08:00', close_time: '23:00' },
                { weekday: 1, open_time: '08:00', close_time: '20:00' },
                { weekday: 2, open_time: '08:00', close_time: '20:00' },
                { weekday: 3, open_time: '08:00', close_time: '20:00' },
                { weekday: 4, open_time: '08:00', close_time: '22:00' },
                { weekday: 5, open_time: '08:00', close_time: '22:00' },
                { weekday: 6, open_time: null, close_time: null },
            ],
            is24h: false,
        },
        type: 'fastFood',
        cancellationTime: 7,
    },
    {
        id: 4,
        photo: restaurant3,
        name: 'Moon',
        description: 'Необычные цветные бургеры и сочная пицца',
        rating: 4.8,
        address: 'Казахстан, Астана, ул. Акмешит, д 19А',
        coordinates: { latitude: 51.095427, longitude: 71.415832 },
        tags: [{ name: 'сок' }, { name: 'соус' }, { name: 'оладьи' }],
        workingTime: {
            schedule: [
                { weekday: 0, open_time: '07:00', close_time: '23:00' },
                { weekday: 1, open_time: '08:00', close_time: '11:00' },
                { weekday: 2, open_time: '08:00', close_time: '20:00' },
                { weekday: 3, open_time: '08:00', close_time: '20:00' },
                { weekday: 4, open_time: '08:00', close_time: '22:00' },
                { weekday: 5, open_time: '08:00', close_time: '22:00' },
                { weekday: 6, open_time: null, close_time: null },
            ],
            is24h: false,
        },
        type: 'cafeBar',
        cancellationTime: 5,
    },
];

export const emptyCatering: Catering = {
    id: 2,
    photo: restaurant3,
    name: 'Boom',
    description: 'Самые вкусные донеры и кофе',
    rating: 4.8,
    address: 'Казахстан, Астана, улица Бухар Жырау, 34/2',
    coordinates: { latitude: 51.09835783805425, longitude: 71.43399606766961 },
    tags: [{ name: 'веган' }, { name: 'органичное' }, { name: 'кофе' }],
    workingTime: {
        schedule: [
            { weekday: 0, open_time: '08:00', close_time: '23:00' },
            { weekday: 1, open_time: '08:00', close_time: '20:00' },
            { weekday: 2, open_time: '08:00', close_time: '20:00' },
            { weekday: 3, open_time: '08:00', close_time: '20:00' },
            { weekday: 4, open_time: '08:00', close_time: '22:00' },
            { weekday: 5, open_time: '08:00', close_time: '22:00' },
            { weekday: 6, open_time: '10:00', close_time: '18:00' },
        ],
        is24h: false,
    },
    type: 'fastFood',
    cancellationTime: 7,
};

export const mockCateringService: Administrator[] = [
    {
        id: '1',
        login: 'Jahu',
        password: '12345',
        catering: emptyCaterings[0],
    },
    {
        id: '2',
        login: 'Boom',
        password: '67890',
        catering: emptyCaterings[1],
    },
    {
        id: '3',
        login: 'Moon',
        password: '258693',
        catering: emptyCaterings[2],
    },
];

export const emptyMeals: CateringMeal[] = [
    {
        id: 1,
        name: 'Куриный донер',
        description: 'Лаваш, курица, соленый огурец, помидор, капуста, лук, морковь, зелень.',
        photo: meal1,
        price: 1050,
        type: 'food',
        waitingTime: 15,
    },
];
