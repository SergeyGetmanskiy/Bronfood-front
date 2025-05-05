import { Administrator, Catering } from './cateringService';
import restaurant1 from './MockImages/restaurant1.png';
import restaurant2 from './MockImages/restaurant2.png';
import restaurant3 from './MockImages/restaurant3.png';

export const emptyCaterings: Catering[] = [
    {
        id: 1,
        photo: restaurant1,
        name: 'Jahu',
        description: 'Самые вкусные донеры и кофе',
        rating: 4.7,
        address: 'ул. Березовая 21',
        coordinates: { latitude: 0, longitude: 0 },
        tags: ['vegan', 'organic', 'coffee'],
        workingTime: {
            monday: { open: '08:00', close: '20:00' },
            tuesday: { open: '08:00', close: '20:00' },
            wednesday: { open: '08:00', close: '20:00' },
            thursday: { open: '08:00', close: '22:00' },
            friday: { open: '08:00', close: '22:00' },
            saturday: { open: '10:00', close: '18:00' },
            sunday: { open: null, close: null },
        },
        type: 'fastFood',
        cancellationDeadlineMinutes: 7,
    },
    {
        id: 2,
        photo: restaurant2,
        name: 'Boom',
        description: 'Самые вкусные донеры и кофе',
        rating: 4.8,
        address: 'ул. Березовая 21',
        coordinates: { latitude: 0, longitude: 0 },
        tags: ['vegan', 'organic', 'coffee'],
        workingTime: {
            monday: { open: '08:00', close: '20:00' },
            tuesday: { open: '08:00', close: '20:00' },
            wednesday: { open: '08:00', close: '20:00' },
            thursday: { open: '08:00', close: '22:00' },
            friday: { open: '08:00', close: '22:00' },
            saturday: { open: '10:00', close: '18:00' },
            sunday: { open: null, close: null },
        },
        type: 'fastFood',
        cancellationDeadlineMinutes: 7,
    },
    {
        id: 4,
        photo: restaurant3,
        name: 'Moon',
        description: 'Необычные цветные бургеры и сочная пицца',
        rating: 4.8,
        address: 'ул. Морозова 56/1',
        coordinates: { latitude: 0, longitude: 0 },
        tags: ['vegan', 'organic', 'coffee'],
        workingTime: {
            monday: { open: '08:00', close: '19:00' },
            tuesday: { open: '08:00', close: '20:00' },
            wednesday: { open: '08:00', close: '20:00' },
            thursday: { open: '09:00', close: '21:00' },
            friday: { open: '08:00', close: '22:00' },
            saturday: { open: '10:00', close: '18:00' },
            sunday: { open: null, close: null },
        },
        type: 'fastFood',
        cancellationDeadlineMinutes: 5,
    },
];

export const emptyCatering: Catering = {
    id: 2,
    photo: restaurant3,
    name: 'Boom',
    description: 'Самые вкусные донеры и кофе',
    rating: 4.8,
    address: 'ул. Березовая 21',
    coordinates: { latitude: 0, longitude: 0 },
    tags: ['vegan', 'organic', 'coffee'],
    workingTime: {
        monday: { open: '08:00', close: '20:00' },
        tuesday: { open: '08:00', close: '20:00' },
        wednesday: { open: '08:00', close: '20:00' },
        thursday: { open: '08:00', close: '22:00' },
        friday: { open: '08:00', close: '22:00' },
        saturday: { open: '10:00', close: '18:00' },
        sunday: { open: null, close: null },
    },
    type: 'fastFood',
    cancellationDeadlineMinutes: 7,
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
