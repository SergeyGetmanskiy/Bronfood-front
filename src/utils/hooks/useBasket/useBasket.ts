import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { basketService, FeatureInPayload } from '../../api/basketService/basketService';
import { useCurrentUser } from '../useCurrentUser/useCurretUser';

export const useGetBasket = () => {
    const { isLogin } = useCurrentUser();
    return useQuery({
        queryKey: ['basket'],
        queryFn: () => basketService.getBasket(),
        enabled: isLogin,
        retry: 0,
    });
};

export const useBasketMutations = () => {
    const [errorMessage, setErrorMessage] = useState('');
    const queryClient = useQueryClient();
    const addMeal = useMutation({
        mutationFn: ({ restaurantId, mealId, features }: { restaurantId: number; mealId: number; features: FeatureInPayload[] | never[] }) => basketService.addMeal(restaurantId, mealId, features),
        onSuccess: (result) => queryClient.setQueryData(['basket'], result),
        onError: (error) => {
            setErrorMessage(error.message);
        },
    });
    const increment = useMutation({
        mutationFn: ({ mealId }: { mealId: number }) => basketService.increment(mealId),
        onSuccess: () =>
            queryClient.refetchQueries({
                queryKey: ['basket'],
                type: 'active',
                exact: true,
            }),
        onError: (error) => {
            setErrorMessage(error.message);
        },
    });
    const decrement = useMutation({
        mutationFn: ({ mealId }: { mealId: number }) => basketService.decrement(mealId),
        onSuccess: () =>
            queryClient.refetchQueries({
                queryKey: ['basket'],
                type: 'active',
                exact: true,
            }),
        onError: (error) => {
            setErrorMessage(error.message);
        },
    });
    const emptyBasket = useMutation({
        mutationFn: () => basketService.emptyBasket(),
        onSuccess: () => queryClient.resetQueries({ queryKey: ['basket'], exact: true }),
        onError: (error) => {
            setErrorMessage(error.message);
        },
    });
    const reset = () => {
        setErrorMessage('');
        addMeal.reset();
        deleteMeal.reset();
        emptyBasket.reset();
    };
    const placeOrder = useMutation({
        mutationFn: ({ userId, restaurantId }: { userId: string; restaurantId: number }) => basketService.placeOrder(userId, restaurantId),
        onSuccess: (result) => {
            queryClient.setQueryData(['basket'], result);
        },
        onError: (error) => {
            setErrorMessage(error.message);
        },
    });
    return {
        addMeal,
        increment,
        decrement,
        emptyBasket,
        errorMessage,
        reset,
        placeOrder,
    };
};
