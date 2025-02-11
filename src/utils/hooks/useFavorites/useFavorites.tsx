import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { favoritesService } from '../../api/favoritesService/favoritesService';
import { useCurrentUser } from '../useCurrentUser/useCurretUser';

const useGetFavorites = () => {
    const { currentUser } = useCurrentUser();
    return useQuery({
        queryKey: ['userFavorites'],
        queryFn: () => favoritesService.getFavorites(),
        enabled: !!currentUser,
    });
};

export const useFavoritesMutations = () => {
    const queryClient = useQueryClient();

    const addFavorite = useMutation({
        mutationFn: async (restId: number) => {
            const response = await favoritesService.setFavorites(restId);
            return response;
        },
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ['userFavorites'] }),
    });

    const deleteFavorite = useMutation({
        mutationFn: async (restId: number) => {
            const response = await favoritesService.deleteFavorites(restId);
            return response;
        },
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ['userFavorites'] }),
    });

    return {
        addFavorite,
        deleteFavorite,
    };
};

export default useGetFavorites;
