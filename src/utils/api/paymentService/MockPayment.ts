import { Payment } from './paymentService';

export const MockPayment: Payment = {
    amount: 10,
    currency: 'KZT',
    order_id: '',
    description: '',
    payment_type: 'pay',
    payment_method: 'ecom',
    items: [
        {
            merchant_id: import.meta.env.VITE_ONEVISION_MID,
            service_id: import.meta.env.VITE_ONEVISION_SID,
            merchant_name: 'Example',
            name: 'Example',
            quantity: 1,
            amount_one_pcs: 10,
            amount_sum: 10,
        },
    ],
    email: '',
    success_url: 'https://bronfood.vercel.app',
    failure_url: 'https://bronfood.vercel.app',
    payment_lifetime: 0,
    lang: 'ru',
    extra_params: {},
    payment_gateway_host: 'https://api.paysage.kz/',
    payment_widget_host: 'https://widget.paysage.kz',
};
