import { PaymentRequest, PaymentResponse, PaymentService } from './paymentService';

export class PaymentServiceReal implements PaymentService {
    async getPaymentToken(payload: PaymentRequest): Promise<PaymentResponse> {
        const encodedData = window.btoa('26952:c4ec78fcd38cc35fceda03d8dc7fb9c4a570f653f54370938781a6ca35006203');
        const headers: RequestInit['headers'] = {
            Authorization: `Basic ${encodedData}`,
            'Content-Type': 'application/json;charset=utf-8',
            Accept: 'application/json',
            'X-API-Version': '2',
        };
        const options: RequestInit = {
            method: 'POST',
            headers: {
                ...headers,
            },
        };
        options.body = JSON.stringify(payload);
        try {
            const res = await fetch(`https://checkout.paylink.kz/ctp/api/checkouts`, options);
            const result = await res.json();
            if (res.ok) {
                return result;
            } else {
                throw new Error('Error');
            }
        } catch (error) {
            if (error instanceof TypeError) {
                throw new Error('checkYourInternetConnection');
            }
            throw error;
        }
    }
}
