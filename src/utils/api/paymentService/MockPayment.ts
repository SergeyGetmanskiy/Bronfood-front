import { PaymentRequest } from './paymentService';

export const mockPayment: PaymentRequest = {
    checkout: {
        test: true,
        transaction_type: 'payment',
        attempts: 1,
        settings: {
            success_url: 'http://localhost:5173/waiting-order',
            fail_url: 'http://localhost:5173/basket',
            button_text: 'Привязать карту',
            button_next_text: 'Вернуться в магазин',
            language: 'ru',
            customer_fields: {
                visible: ['first_name', 'last_name'],
                read_only: ['email'],
            },
            credit_card_fields: {
                holder: 'Rick Astley',
                read_only: ['holder'],
            },
        },
        payment_method: {
            types: ['credit_card', 'bank_transfer'],
            bank_transfer: {
                account: 'DE89370400440532013000',
            },
            excluded_brands: ['visa', 'google_pay'],
        },
        order: {
            currency: 'KZT',
            amount: 4299,
            description: 'Order description',
        },
        customer: {
            address: 'Baker street 221b',
            country: 'GB',
            city: 'London',
            email: 'jake@example.com',
        },
    },
};
