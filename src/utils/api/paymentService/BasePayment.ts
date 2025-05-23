import { PaymentRequest } from './paymentService';

export const basePaymentRequest: PaymentRequest = {
    test: true,
    transaction_type: 'payment',
    attempts: 1,
    settings: {
        success_url: 'http://localhost:5173/waiting-order',
        fail_url: 'http://localhost:5173/basket',
        button_text: 'Привязать карту',
        button_next_text: 'Вернуться в магазин',
        language: 'ru',
    },
    order: {
        currency: 'KZT',
        amount: 4299,
        description: 'Order description',
    },
};
