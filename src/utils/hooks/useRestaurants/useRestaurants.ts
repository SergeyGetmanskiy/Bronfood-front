import { useQuery, skipToken } from '@tanstack/react-query';
import { Restaurant, restaurantsService } from '../../api/restaurantsService/restaurantsService';
import { useEffect, useState } from 'react';
import { LngLatBounds } from '@yandex/ymaps3-types';

export const useRestaurants = (bounds: LngLatBounds) => {
    const [cachedData, setCachedData] = useState<Restaurant[] | never[]>([]);
    const { isLoading, isError, isSuccess, data, refetch } = useQuery({
        queryKey: ['restaurants', bounds],
        queryFn: bounds.length > 0 ? () => restaurantsService.getRestaurants(bounds as LngLatBounds) : skipToken,
    });
    useEffect(() => {
        if (isSuccess) {
            const oldData = JSON.stringify(cachedData);
            const newData = JSON.stringify(data.data);
            if (oldData === newData) {
                setCachedData((prev) => prev);
            } else {
                setCachedData(data.data);
            }
            setCachedData(data.data);
        }
    }, [isSuccess, cachedData, data]);

    return {
        isLoading,
        isError,
        restaurantsOnMap: cachedData,
        refetch,
    };
};
