import { useQuery } from '@tanstack/react-query';
import { restaurantsService } from '../../api/restaurantsService/restaurantsService';

export const useReviews = (restaurantId: number) => {
    return useQuery({
        queryKey: ['reviews', restaurantId],
        queryFn: () => restaurantsService.getReviews(restaurantId),
    });
};
