import { useQuery } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import { restaurantsService } from '../../api/restaurantsService/restaurantsService';

export const useRestaurant = (restaurantId: number) => {
    const { t } = useTranslation();
    return useQuery({
        queryKey: ['restaurant', restaurantId],
        queryFn: async () => {
            if (!restaurantId) throw new Error(t('pages.restaurantsContext.noRestaurantIdProvided'));
            const response = await restaurantsService.getRestaurantById(restaurantId);
            return response;
        },
    });
};
