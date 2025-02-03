import { useQuery, skipToken } from '@tanstack/react-query';
import { restaurantsService } from '../../api/restaurantsService/restaurantsService';
import { useEffect, useState } from 'react';

export const useRestaurants = (bounds) => {
    const [cachedData, setCachedData] = useState([]);
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
