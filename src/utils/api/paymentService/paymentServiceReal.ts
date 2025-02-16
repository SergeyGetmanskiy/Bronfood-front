import { MockPayment } from './MockPayment';
import { Payment, PaymentService } from './paymentService';

export class PaymentServiceReal implements PaymentService {
    async getPayment(): Promise<{ data: Payment }> {
        const payment = MockPayment;
        return { data: payment };
    }
}
