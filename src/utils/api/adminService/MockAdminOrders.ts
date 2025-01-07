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
        summary: {
            userName: 'Ермек',
            orderCode: 'LKJ65',
        },
        details: {
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
        },
        status: 'not accepted',
    },
    {
        id: increment(),
        summary: {
            userName: 'Азамат',
            orderCode: 'LKJ66',
        },
        details: {
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
        },
        status: 'not accepted',
    },
    {
        id: increment(),
        summary: {
            userName: 'Айгуль',
            orderCode: 'LKJ67',
        },
        details: {
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
        },
        status: 'cooking',
    },
    {
        id: increment(),
        summary: {
            userName: 'Айнур',
            orderCode: 'LKJ68',
        },
        details: {
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
            acceptedAt: '',
        },
        status: 'complete',
    },
];
