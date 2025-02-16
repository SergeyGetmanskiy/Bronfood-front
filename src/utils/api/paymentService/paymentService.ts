import { PaymentServiceReal } from './paymentServiceReal';

type PaymentItem = {
    merchant_id: string;
    service_id: string;
    merchant_name: string;
    name: string; // Название блюда, например, "Куриный донер"
    quantity: number;
    amount_one_pcs: number;
    amount_sum: number;
};

export type Payment = {
    amount: number; // Положительное число с '.' в качестве разделителя, не более двух разрядов после точки
    currency: 'KZT';
    order_id: string;
    description: string;
    payment_type: 'pay';
    payment_method: 'ecom';
    items: PaymentItem[];
    email: string;
    success_url: 'https://bronfood.vercel.app';
    failure_url: 'https://bronfood.vercel.app';
    payment_lifetime: number; // Время жизни платежа в секундах
    lang: 'ru' | 'kz' | 'en';
    extra_params: Record<never>;
    payment_gateway_host: 'https://api.paysage.kz/';
    payment_widget_host: 'https://widget.paysage.kz';
};

export interface PaymentService {
    getPayment: () => Promise<{ data: Payment }>;
}

export const paymentService = new PaymentServiceReal();
