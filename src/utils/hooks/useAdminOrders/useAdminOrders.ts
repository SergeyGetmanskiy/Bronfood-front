import { useQuery } from '@tanstack/react-query';
import { adminService } from '../../api/adminService/adminService';

export const useGetAdminOrders = () => {
    return useQuery({
        queryKey: ['adminOrders'],
        queryFn: () => adminService.getAdminOrders(),
    });
};
