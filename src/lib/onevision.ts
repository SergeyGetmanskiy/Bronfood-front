import { Payment } from '../utils/api/paymentService/paymentService';

interface PaymentOptions extends Payment {
    api_key: string;
}

export function openPaymentWidgetHandler(options: PaymentOptions, onSuccess) {
    // @ts-expect-error: This function is from OneVision script
    openPaymentWidget(options, onSuccess);
}
