import { useMutation, useQuery } from '@tanstack/react-query';
import { CateringMeal, cateringService } from '../../api/cateringService/cateringService';

export const useGetCateringMeals = () => {
    return useQuery({
        queryKey: ['meals'],
        queryFn: () => cateringService.getMeals(),
    });
};

export const useCreateCateringMeals = () => {
    return useMutation({
        mutationFn: (data: Omit<CateringMeal, 'id'>) => cateringService.createMeal(data),
    });
};
