import { useQuery } from '@tanstack/react-query';
import { restaurantsService } from '../../api/restaurantsService/restaurantsService';

export const useFeatures = (restaurantId: number, mealId: number) => {
    return useQuery({
        queryKey: ['features', restaurantId, mealId],
        queryFn: () => restaurantsService.getFeatures(restaurantId, mealId),
    });
};
