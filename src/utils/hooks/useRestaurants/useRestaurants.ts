import { useQuery, skipToken } from '@tanstack/react-query';
import { restaurantsService } from '../../api/restaurantsService/restaurantsService';

export const useRestaurants = (bounds) => {
    const { isLoading, isError, isSuccess, data, refetch } = useQuery({
        queryKey: ['restaurants', bounds],
        queryFn: bounds.length > 0 ? () => restaurantsService.getRestaurants(bounds as LngLatBounds) : skipToken,
        staleTime: 3000,
    });
    return {
        isLoading,
        isError,
        isSuccess,
        data,
        refetch,
    };
};
