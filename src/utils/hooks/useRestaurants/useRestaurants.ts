import { useQuery, skipToken } from '@tanstack/react-query';
import { restaurantsService } from '../../api/restaurantsService/restaurantsService';
import { LngLatBounds } from '@yandex/ymaps3-types';

export const useRestaurants = (bounds: LngLatBounds) => {
    const { isLoading, isError, isSuccess, data, refetch } = useQuery({
        queryKey: ['restaurants', bounds],
        queryFn: bounds.length > 0 ? () => restaurantsService.getRestaurants(bounds as LngLatBounds) : skipToken,
    });
    return {
        isLoading,
        isError,
        restaurantsOnMap: isSuccess ? data.data : [],
        refetch,
    };
};
