import { AdminOrder } from './adminService';

const increment = (function (n) {
    return function () {
        n += 1;
        return n;
    };
})(0);

export const mockAdminOrders: AdminOrder[] = [
    {
        id: increment(),
        userName: 'Ермек',
        orderCode: 'LKJ65',
        meals: [
            {
                id: increment(),
                meal: {
                    id: increment(),
                    name: 'Куриный донер',
                    price: 1350,
                    waitingTime: 10,
                },
                count: 1,
                choices: [
                    {
                        id: increment(),
                        name: 'Средний',
                    },
                    {
                        id: increment(),
                        name: 'Оливки',
                    },
                    {
                        id: increment(),
                        name: 'Сырный соус',
                    },
                ],
                price: 1350,
            },
            {
                id: increment(),
                meal: {
                    id: increment(),
                    name: 'Говяжий донер',
                    price: 1250,
                    waitingTime: 15,
                },
                count: 2,
                choices: [],
                price: 1250,
            },
        ],
        acceptedAt: '',
        status: 'not accepted',
    },
    {
        id: increment(),
        userName: 'Азамат',
        orderCode: 'LKJ66',
        meals: [
            {
                id: increment(),
                meal: {
                    id: increment(),
                    name: 'Капуччино',
                    price: 200,
                    waitingTime: 5,
                },
                count: 1,
                choices: [],
                price: 200,
            },
        ],
        acceptedAt: '',
        status: 'not accepted',
    },
    {
        id: increment(),
        userName: 'Айгуль',
        orderCode: 'LKJ67',
        meals: [
            {
                id: increment(),
                meal: {
                    id: increment(),
                    name: 'Куриный донер',
                    price: 1350,
                    waitingTime: 10,
                },
                count: 1,
                choices: [
                    {
                        id: increment(),
                        name: 'Средний',
                    },
                    {
                        id: increment(),
                        name: 'Оливки',
                    },
                    {
                        id: increment(),
                        name: 'Сырный соус',
                    },
                ],
                price: 1350,
            },
            {
                id: increment(),
                meal: {
                    id: increment(),
                    name: 'Говяжий донер',
                    price: 1250,
                    waitingTime: 15,
                },
                count: 2,
                choices: [],
                price: 1250,
            },
        ],
        acceptedAt: new Date(),
        status: 'cooking',
    },
    {
        id: increment(),
        userName: 'Айнур',
        orderCode: 'LKJ68',
        meals: [
            {
                id: increment(),
                meal: {
                    id: increment(),
                    name: 'Пуддинг',
                    price: 350,
                    waitingTime: 10,
                },
                count: 1,
                choices: [],
                price: 350,
            },
        ],
        acceptedAt: new Date('Tue Jan 07 2025 18:32:40 GMT+0300'),
        status: 'archive',
    },
];
