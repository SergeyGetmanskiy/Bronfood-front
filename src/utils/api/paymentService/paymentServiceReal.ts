import { Payment, PaymentService } from './paymentService';
import { handleFetch } from '../../serviceFuncs/handleFetch';

export class PaymentServiceReal implements PaymentService {
    async getPayment(): Promise<{ data: Payment }> {
        const { data } = await handleFetch(`api/orders/`, { method: 'POST' });
        const payment: Payment = {
            ...data,
            payment_type: 'pay',
            payment_method: 'ecom',
            lang: 'ru',
            payment_gateway_host: 'https://api.paysage.kz/',
            payment_widget_host: 'https://widget.paysage.kz',
            success_url: 'http://localhost:5173/waiting-order',
            failure_url: 'http://localhost:5173/',
        };
        return { data: payment };
    }
}
