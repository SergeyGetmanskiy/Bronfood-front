import { useMutation, useQuery } from '@tanstack/react-query';
import { Catering, cateringService } from '../../api/cateringService/cateringService';

export const useGetCaterings = () => {
    return useQuery({
        queryKey: ['caterings'],
        queryFn: () => cateringService.getCaterings(),
    });
};

export const useGetCateringById = (id: number) => {
    return useQuery({
        queryKey: ['caterings', id],
        queryFn: () => cateringService.getCateringById(id),
        enabled: !!id,
    });
};

export const useCreateCatering = () => {
    return useMutation({
        mutationFn: (data: Omit<Catering, 'id'>) => cateringService.createCatering(data),
    });
};

export const useDeleteCatering = () => {
    return useMutation({
        mutationFn: (id: number) => cateringService.deleteCatering(id),
    });
};
