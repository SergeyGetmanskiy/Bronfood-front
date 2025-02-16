import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { paymentService } from '../../api/paymentService/paymentService';

export const usePaymentMutations = () => {
    const [errorMessage, setErrorMessage] = useState('');
    const getPaymentOptions = useMutation({
        mutationFn: () => paymentService.getPayment(),
        onError: (error) => {
            setErrorMessage(error.message);
        },
    });
    return {
        getPaymentOptions,
        errorMessage,
    };
};
