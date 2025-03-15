import { AdminOrderFromApi } from './adminService';

const increment = (function (n) {
    return function () {
        n += 1;
        return n;
    };
})(0);

export const mockAdminOrders: AdminOrderFromApi[] = [
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
                    waiting_time: 10,
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
                    waiting_time: 15,
                },
                count: 2,
                choices: [],
                price: 1250,
            },
        ],
        acceptedAt: '',
        readyAt: '',
        issuedAt: '',
        cancelledAt: '',
        status: 'paid',
        waiting_time: 1,
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
                    waiting_time: 5,
                },
                count: 1,
                choices: [],
                price: 200,
            },
        ],
        acceptedAt: '',
        readyAt: '',
        issuedAt: '',
        cancelledAt: '',
        status: 'paid',
        waiting_time: 1,
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
                    waiting_time: 10,
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
                    waiting_time: 15,
                },
                count: 2,
                choices: [],
                price: 1250,
            },
        ],
        acceptedAt: '',
        readyAt: '',
        issuedAt: '',
        cancelledAt: '',
        status: 'paid',
        waiting_time: 1,
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
                    waiting_time: 10,
                },
                count: 1,
                choices: [],
                price: 350,
            },
        ],
        acceptedAt: '',
        readyAt: '',
        issuedAt: '',
        cancelledAt: '',
        status: 'paid',
        waiting_time: 10,
    },
];
