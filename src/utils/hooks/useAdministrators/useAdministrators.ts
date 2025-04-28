import { useMutation, useQuery } from '@tanstack/react-query';
import { Administrator, cateringService } from '../../api/cateringService/cateringService';

export const useGetAdministrators = () => {
    return useQuery({
        queryKey: ['administrators'],
        queryFn: () => cateringService.getAdministrators(),
    });
};

export const useGetAdministratorById = (id: string) => {
    return useQuery({
        queryKey: ['administrator', id],
        queryFn: () => cateringService.getAdministratorById(id),
        enabled: !!id,
    });
};

export const useCreateAdministrator = () => {
    return useMutation({
        mutationFn: (data: Omit<Administrator, 'id'>) => cateringService.createAdministrator(data),
    });
};

export const useUpdateAdministrator = () => {
    return useMutation({
        mutationFn: (data: Partial<Administrator> & { id: string }) => cateringService.updateAdministrator(data),
    });
};

export const useDeleteAdministrator = () => {
    return useMutation({
        mutationFn: (id: string) => cateringService.deleteAdministrator(id),
    });
};
