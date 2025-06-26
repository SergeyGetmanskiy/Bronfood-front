import { useQuery } from '@tanstack/react-query';
import { restaurantsService } from '../../api/restaurantsService/restaurantsService';

export const useSearchSuggestions = (searchQuery: string) => {
    return useQuery({
        queryKey: ['search suggestions', searchQuery],
        queryFn: () => restaurantsService.getSearchSuggestions(searchQuery),
    });
};
