import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { PaymentRequest, paymentService } from '../../api/paymentService/paymentService';

export const usePaymentMutations = () => {
    const [errorMessage, setErrorMessage] = useState('');
    const getPaymentToken = useMutation({
        mutationFn: (payload: PaymentRequest) => paymentService.getPaymentToken(payload),
        onError: (error) => {
            setErrorMessage(error.message);
        },
    });
    return {
        getPaymentToken,
        errorMessage,
    };
};
